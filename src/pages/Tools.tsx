import { Metronome } from '../components/Metronome';
import { ChordChart } from '../components/ChordChart';
import { Tuner } from '../components/Tuner';

export function Tools() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">练习工具</h1>
        <p className="mt-2 text-slate-600">工欲善其事，必先利其器。使用这些工具辅助你的日常练习。</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Metronome />
          <Tuner />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
           <h3 className="text-xl font-bold text-slate-900 mb-4">常用和弦</h3>
           <p className="text-slate-500 mb-6 text-sm">点击和弦图上的黑点可以试听单音。</p>
           
           <div className="flex flex-wrap justify-center gap-8">
             <ChordChart name="C Major" frets={[-1, 3, 2, 0, 1, 0]} />
             <ChordChart name="G Major" frets={[3, 2, 0, 0, 0, 3]} />
             <ChordChart name="Am" frets={[-1, 0, 2, 2, 1, 0]} />
             <ChordChart name="F Major (Simplified)" frets={[-1, -1, 3, 2, 1, 1]} />
           </div>
        </div>
      </div>
    </div>
  );
}
