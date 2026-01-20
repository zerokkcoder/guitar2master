import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Heart, Guitar } from "lucide-react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "吉他大师 - 从零到大师",
  description: "致力于打造最科学、最有趣的吉他自学平台。通过关卡制教学，带你从零基础成长为吉他大师。",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-white flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        
        <main className="grow relative">
          {/* 全局背景装饰 */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-full h-[500px] bg-indigo-50/30 blur-[100px] rounded-full -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-full h-[500px] bg-violet-50/30 blur-[100px] rounded-full translate-y-1/2" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            {children}
          </div>
        </main>

        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-slate-800">
              {/* Brand Section */}
              <div className="md:col-span-2 space-y-6">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <Guitar className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-black text-xl text-white tracking-tight">吉他大师</span>
                </Link>
                <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                  致力于打造最科学、最有趣的吉他自学平台。通过关卡制教学，带你从零基础成长为吉他大师。
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-white font-black text-sm uppercase tracking-widest">学习路径</h4>
                <ul className="space-y-4 text-sm font-medium">
                  <li><Link href="/courses" className="hover:text-indigo-400 transition-colors">探索地图</Link></li>
                  <li><Link href="/tools" className="hover:text-indigo-400 transition-colors">大师工具</Link></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">基础乐理</a></li>
                  <li><Link href="/scores" className="hover:text-indigo-400 transition-colors">曲谱库</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500 font-medium">
                © {new Date().getFullYear()} 吉他大师。版权所有。
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                用 <Heart className="w-3 h-3 text-rose-500 fill-rose-500 mx-1" /> 为全球吉他爱好者打造
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
