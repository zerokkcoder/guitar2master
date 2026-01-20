'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Guitar, Map, Wrench, Home, User, Bell, Music } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

/**
 * 导航栏组件
 * 提供全局页面跳转，并根据当前路径高亮对应项
 * 采用半透明毛玻璃效果和更现代的交互设计
 */
export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '首页', path: '/', icon: Home },
    { name: '探索地图', path: '/courses', icon: Map },
    { name: '曲谱库', path: '/scores', icon: Music },
    { name: '大师工具', path: '/tools', icon: Wrench },
  ];

  return (
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm py-2" 
        : "bg-white border-b border-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo Area */}
          <div className="flex items-center">
            <Link href="/" className="shrink-0 flex items-center gap-3 group">
              <div className="w-10 h-10 bg-linear-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                <Guitar className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-slate-900 leading-none tracking-tight">吉他大师</span>
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mt-0.5">从零到大师</span>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="hidden sm:flex items-center bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'relative flex items-center px-6 py-2 rounded-xl text-sm font-black transition-all duration-300 group',
                    isActive
                      ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/50'
                      : 'text-slate-500 hover:text-slate-900'
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4 mr-2 transition-transform group-hover:scale-110",
                    isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <button className="flex items-center gap-3 pl-1 pr-4 py-1 bg-white border border-slate-200 rounded-full hover:shadow-md transition-all group">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                <User className="w-4 h-4 text-slate-500 group-hover:text-indigo-600" />
              </div>
              <span className="text-sm font-bold text-slate-700">我的进度</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
