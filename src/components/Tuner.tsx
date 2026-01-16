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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
      <h3 className="text-xl font-bold text-slate-900 mb-6">吉他调音器</h3>
      
      <div className="relative w-64 h-32 mb-8 flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
        {!isListening ? (
          <p className="text-slate-500">点击麦克风开始调音</p>
        ) : (
          <>
            <div className={cn(
              "text-6xl font-black mb-2 transition-colors duration-200",
              status === 'tuned' ? "text-green-500" : "text-slate-800"
            )}>
              {note}
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
               <span className={cn(status === 'flat' ? "text-red-500 opacity-100" : "opacity-20")}>♭ 偏低</span>
               <span className="tabular-nums w-16 text-center text-slate-400">{frequency} Hz</span>
               <span className={cn(status === 'sharp' ? "text-red-500 opacity-100" : "opacity-20")}>♯ 偏高</span>
            </div>
            
            {/* Needle UI */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 rounded-full overflow-hidden">
               <div 
                 className={cn(
                   "h-full transition-all duration-100 ease-out w-1",
                   Math.abs(cents) < 5 ? "bg-green-500" : "bg-red-500"
                 )}
                 style={{ 
                   transform: `translateX(${Math.max(-100, Math.min(100, cents * 2))}px)`,
                   margin: '0 auto' 
                 }}
               />
            </div>
          </>
        )}
      </div>

      <button
        onClick={isListening ? stopListening : startListening}
        className={cn(
          "flex items-center px-6 py-3 rounded-full font-medium transition-all shadow-sm",
          isListening 
            ? "bg-red-100 text-red-700 hover:bg-red-200" 
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        )}
      >
        {isListening ? (
          <>
            <MicOff className="w-5 h-5 mr-2" />
            停止调音
          </>
        ) : (
          <>
            <Mic className="w-5 h-5 mr-2" />
            开始调音
          </>
        )}
      </button>

      <div className="mt-6 w-full">
        <h4 className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wider">标准音参考</h4>
        <div className="grid grid-cols-6 gap-2">
          {GUITAR_STRINGS.map((string, index) => (
            <div key={index} className="flex flex-col items-center p-2 rounded bg-slate-50 border border-slate-100">
              <span className="text-lg font-bold text-slate-700">{string.note}</span>
              <span className="text-xs text-slate-400">{string.octave}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
