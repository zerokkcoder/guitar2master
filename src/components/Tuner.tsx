'use client';

import { Mic, MicOff } from 'lucide-react';
import { cn } from '../lib/utils';
import { usePitchDetector } from '../hooks/usePitchDetector';

// Standard Guitar Tuning frequencies for reference
// E2=82.41, A2=110.00, D3=146.83, G3=196.00, B3=246.94, E4=329.63
const GUITAR_STRINGS = [
  { note: 'E', octave: 2, freq: 82.41 },
  { note: 'A', octave: 2, freq: 110.00 },
  { note: 'D', octave: 3, freq: 146.83 },
  { note: 'G', octave: 3, freq: 196.00 },
  { note: 'B', octave: 3, freq: 246.94 },
  { note: 'E', octave: 4, freq: 329.63 },
];

export function Tuner() {
  const { isListening, startListening, stopListening, frequency, note, cents } = usePitchDetector();

  const getTunerStatus = (cents: number) => {
    if (Math.abs(cents) < 5) return 'tuned';
    if (cents < 0) return 'flat';
    return 'sharp';
  };

  const status = getTunerStatus(cents);

  return (
    <div className="flex flex-col items-center py-6 h-full">
      <div className="relative w-full aspect-square max-w-[280px] mb-10 flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner overflow-hidden group/tuner">
        {/* Decorative Background for Tuner Display */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-100/50" />
        
        {!isListening ? (
          <div className="relative z-10 text-center px-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover/tuner:scale-110 transition-transform">
              <Mic className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="text-slate-400 font-bold text-sm leading-relaxed">准备就绪</p>
            <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest mt-2">拨动琴弦</p>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center">
            <div className={cn(
              "text-8xl font-black mb-4 transition-all duration-300 tracking-tighter",
              status === 'tuned' ? "text-green-500 scale-110" : "text-slate-800"
            )}>
              {note}
            </div>
            
            <div className="flex flex-col items-center gap-2">
               <div className="flex items-center gap-3">
                 <span className={cn(
                   "text-[10px] font-black uppercase tracking-widest transition-opacity",
                   status === 'flat' ? "text-rose-500 opacity-100" : "text-slate-300"
                 )}>偏低</span>
                 <div className="h-1 w-20 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-100 ease-out",
                        status === 'tuned' ? "bg-green-500" : "bg-rose-500"
                      )}
                      style={{ 
                        width: '4px',
                        transform: `translateX(${Math.max(0, Math.min(80, (cents + 50) * 0.8))}px)`
                      }}
                    />
                 </div>
                 <span className={cn(
                   "text-[10px] font-black uppercase tracking-widest transition-opacity",
                   status === 'sharp' ? "text-rose-500 opacity-100" : "text-slate-300"
                 )}>偏高</span>
               </div>
               <span className="tabular-nums text-xs font-bold text-slate-400 mt-2">{frequency} Hz</span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={isListening ? stopListening : startListening}
        className={cn(
          "flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95",
          isListening 
            ? "bg-rose-500 text-white shadow-rose-200/50 hover:bg-rose-600" 
            : "bg-slate-900 text-white shadow-slate-200/50 hover:bg-slate-800"
        )}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4" />
            停止调音
          </>
        ) : (
          <>
            <Mic className="w-4 h-4" />
            开始调音
          </>
        )}
      </button>

      <div className="mt-12 w-full">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">标准调音 (EADGBE)</h4>
          <div className="h-px grow bg-slate-100 ml-4"></div>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {GUITAR_STRINGS.map((string, index) => (
            <div key={index} className="group/string flex flex-col items-center p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white transition-all cursor-default">
              <span className="text-sm font-black text-slate-600 group-hover/string:text-indigo-600">{string.note}</span>
              <span className="text-[9px] font-bold text-slate-300 group-hover/string:text-indigo-300">{string.octave}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
