import Link from 'next/link';
import { ArrowRight, Sparkles, Trophy, Map, Play, BookOpen, Mic2 } from 'lucide-react';

/**
 * 首页组件
 * 展示项目的核心价值、游戏化特色和快速入口
 */
export default function Home() {
  return (
    <div className="space-y-32 py-12">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 blur-[120px] rounded-full -z-10 animate-pulse delay-700" />
        
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-50/50 backdrop-blur-sm text-indigo-700 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-indigo-100 mb-10 animate-fade-in shadow-sm">
          <Sparkles className="w-4 h-4" />
          开启你的音乐冒险之旅
        </div>
        
        <h1 className="text-6xl sm:text-8xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8">
          掌握吉他，<br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
            从零到大师
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-slate-500 leading-relaxed mb-12 font-medium">
          科学设计的游戏化关卡，配合实时音频识别技术，<br className="hidden sm:block" />
          让每一次练习都像是在完成一场史诗级的挑战。
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4 w-full max-w-lg mx-auto">
          <Link
            href="/courses"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-slate-900 text-white text-xl font-black rounded-2xl shadow-2xl shadow-slate-300 hover:bg-indigo-600 hover:-translate-y-1 transition-all active:scale-95 group"
          >
            探索世界地图
            <Map className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
          </Link>
          <Link
            href="/tools"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-white text-slate-700 text-xl font-black rounded-2xl border-2 border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 hover:-translate-y-1 transition-all active:scale-95 shadow-sm"
          >
            进入工具箱
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 sm:gap-16 pt-20">
          {[
            { label: '探索世界', value: '6+', icon: Map },
            { label: '挑战关卡', value: '18+', icon: Play },
            { label: '成就经验', value: '5000+', icon: Trophy }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="mb-2 p-2 rounded-lg bg-slate-50 group-hover:bg-indigo-50 transition-colors">
                <stat.icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-slate-900 mb-1 tracking-tight">{stat.value}</span>
              <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards with Glassmorphism */}
      <section className="relative px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900">为什么选择我们？</h2>
            <p className="text-xl text-slate-500 font-medium">将传统的枯燥练习转化为极致的感官体验</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: '游戏化进程',
                desc: '不再是枯燥的重复。通过精心设计的关卡地图，在解锁新技能的同时累积 XP，见证从菜鸟到大师的每一步成长。',
                icon: Trophy,
                color: 'amber',
                bg: 'bg-amber-500'
              },
              {
                title: '科学训练体系',
                desc: '融合神经科学与现代乐理，每一关都针对性地训练手指力量、协调性与音乐感知，科学高效地构建音乐基石。',
                icon: BookOpen,
                color: 'indigo',
                bg: 'bg-indigo-600'
              },
              {
                title: '实时互动引擎',
                desc: '内置高精度音频识别算法，实时监测你的每一个音符与节奏。即时反馈让你少走弯路，如同私人导师贴身指导。',
                icon: Mic2,
                color: 'emerald',
                bg: 'bg-emerald-500'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group relative bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bg}/5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700`} />
                
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500 bg-${feature.color}-50 text-${feature.color}-600`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA with Dynamic Glow */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[4rem] p-12 sm:p-24 text-center relative overflow-hidden shadow-3xl group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] -mr-64 -mt-64 rounded-full group-hover:bg-indigo-500/30 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/20 blur-[120px] -ml-64 -mb-64 rounded-full group-hover:bg-fuchsia-500/30 transition-colors duration-700" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-5xl sm:text-7xl font-black text-white leading-[1.1]">准备好书写你的<br />音乐传奇了吗？</h2>
              <p className="text-indigo-200 text-xl sm:text-2xl font-medium opacity-80 leading-relaxed">
                现在加入，从“第一世界：觉醒之初”开启你的征程。大师之路，就在脚下。
              </p>
              
              <div className="pt-6">
                <Link
                  href="/courses"
                  className="inline-flex items-center px-12 py-6 bg-white text-slate-900 text-2xl font-black rounded-3xl hover:bg-indigo-50 hover:scale-105 transition-all active:scale-95 shadow-2xl"
                >
                  开启挑战
                  <ArrowRight className="ml-3 h-8 w-8 animate-bounce-x" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
