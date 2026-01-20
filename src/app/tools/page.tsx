'use client';

/**
 * 练习工具页面组件
 * 提供节拍器、调音器和常用和弦库
 * 采用现代化的网格卡片设计
 */

import { Metronome } from '@/components/Metronome';
import { ChordChart } from '@/components/ChordChart';
import { Tuner } from '@/components/Tuner';
import { Wrench, Music, Library, Sparkles, Mic2 } from 'lucide-react';

const COMMON_CHORDS = [
  { name: "C 大三和弦", frets: [-1, 3, 2, 0, 1, 0] },
  { name: "G 大三和弦", frets: [3, 2, 0, 0, 0, 3] },
  { name: "D 大三和弦", frets: [-1, -1, 0, 2, 3, 2] },
  { name: "A 大三和弦", frets: [-1, 0, 2, 2, 2, 0] },
  { name: "E 大三和弦", frets: [0, 2, 2, 1, 0, 0] },
  { name: "Am 和弦", frets: [-1, 0, 2, 2, 1, 0] },
  { name: "Em 和弦", frets: [0, 2, 2, 0, 0, 0] },
  { name: "Dm 和弦", frets: [-1, -1, 0, 2, 3, 1] },
  { name: "F 和弦 (简化版)", frets: [-1, -1, 3, 2, 1, 1] },
  { name: "F 大三和弦", frets: [1, 3, 3, 2, 1, 1] },
];

export default function ToolsPage() {
  return (
    <div className="relative min-h-screen pb-24">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[35%] bg-violet-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-12 space-y-16">
        {/* Header Area */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100">
            <Wrench className="w-3.5 h-3.5" />
            吉他手工具箱
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
            练习<span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">工具</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl">
            工欲善其事，必先利其器。我们为你准备了最专业的辅助工具，助你高效攻克每一个难关。
          </p>
        </div>

        {/* Core Tools Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          <div className="relative group flex flex-col h-full">
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-violet-500 rounded-4xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative flex flex-col h-full bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 overflow-hidden">
               <div className="p-8 pb-4 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                     <Music className="w-6 h-6 text-indigo-600" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-black text-slate-900">精准节拍器</h3>
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">节奏同步</p>
                   </div>
                 </div>
                 <div className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">稳定版</div>
               </div>
               <div className="grow flex flex-col justify-center px-8 pb-8">
                 <Metronome />
               </div>
            </div>
          </div>

          <div className="relative group flex flex-col h-full">
            <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-4xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative flex flex-col h-full bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 overflow-hidden">
               <div className="p-8 pb-4 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                     <Mic2 className="w-6 h-6 text-emerald-600" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-black text-slate-900">智能调音器</h3>
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">高精度识别</p>
                   </div>
                 </div>
                 <div className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">实时</div>
               </div>
               <div className="grow flex flex-col justify-center px-8 pb-8">
                 <Tuner />
               </div>
            </div>
          </div>
        </div>
        
        {/* Chord Library Section */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-slate-200 to-slate-100 rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-slate-200/30 border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">
                    <Library className="w-3 h-3" />
                    和弦字典
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight">常用和弦库</h3>
                  <p className="text-slate-500 font-medium max-w-md">
                    点击和弦图上的黑点可以试听单音，点击底部文字试听扫弦。掌握这些基础，开启你的伴奏之旅。
                  </p>
                </div>
                <div className="hidden md:block">
                   <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">已收录</p>
                      <p className="text-2xl font-black text-slate-900">{COMMON_CHORDS.length} <span className="text-sm font-bold text-slate-400 ml-1">个和弦</span></p>
                   </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16">
                {COMMON_CHORDS.map((chord) => (
                  <div key={chord.name} className="group/chord flex flex-col items-center">
                    <div className="w-full aspect-square bg-slate-50 rounded-3xl p-6 border border-slate-100 group-hover/chord:bg-white group-hover/chord:shadow-xl group-hover/chord:shadow-indigo-50 group-hover/chord:border-indigo-100 transition-all duration-500">
                      <ChordChart name={chord.name} frets={chord.frets} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="mt-20 p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100/50 flex flex-col md:flex-row items-center gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md shrink-0">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm">练习小贴士</h4>
                  <p className="text-slate-500 text-sm mt-1 font-medium">每天花 5 分钟复习这些和弦的转换，能显著提升你的手指灵活性和肌肉记忆。</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
