import { Link } from 'react-router-dom';
import { ArrowRight, Music, Star, Zap } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
          掌握吉他，<span className="text-indigo-600">从零到大师</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600">
          最互动的在线吉他学习平台。实时反馈、个性化练习计划，让你的音乐之旅不再孤单。
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/courses"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            开始学习
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/tools"
            className="inline-flex items-center px-6 py-3 border border-slate-300 shadow-sm text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50"
          >
            使用工具
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Music className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">系统化课程</h3>
          <p className="text-slate-600">从持琴姿势到复杂乐理，循序渐进的课程设计，适合所有水平。</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">互动练习工具</h3>
          <p className="text-slate-600">内置节拍器、调音器和和弦查询，让练习更高效有趣。</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Star className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">实时反馈</h3>
          <p className="text-slate-600">通过浏览器麦克风分析你的演奏，即时获得反馈（开发中）。</p>
        </div>
      </section>
    </div>
  );
}
