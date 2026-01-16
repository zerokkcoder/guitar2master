import { Metronome } from '../components/Metronome';
import { ChordChart } from '../components/ChordChart';
import { Tuner } from '../components/Tuner';

const COMMON_CHORDS = [
  { name: "C Major", frets: [-1, 3, 2, 0, 1, 0] },
  { name: "G Major", frets: [3, 2, 0, 0, 0, 3] },
  { name: "D Major", frets: [-1, -1, 0, 2, 3, 2] },
  { name: "A Major", frets: [-1, 0, 2, 2, 2, 0] },
  { name: "E Major", frets: [0, 2, 2, 1, 0, 0] },
  { name: "Am", frets: [-1, 0, 2, 2, 1, 0] },
  { name: "Em", frets: [0, 2, 2, 0, 0, 0] },
  { name: "Dm", frets: [-1, -1, 0, 2, 3, 1] },
  { name: "F (Simplified)", frets: [-1, -1, 3, 2, 1, 1] },
  { name: "F Major", frets: [1, 3, 3, 2, 1, 1] }, // Barre chord visualization might be tricky but points work
];

export function Tools() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">练习工具</h1>
        <p className="mt-2 text-slate-600">工欲善其事，必先利其器。使用这些工具辅助你的日常练习。</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Metronome />
        <Tuner />
      </div>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">常用和弦库</h3>
            <p className="text-slate-500 text-sm">点击和弦图上的黑点可以试听单音，点击底部文字试听扫弦。</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {COMMON_CHORDS.map((chord) => (
              <ChordChart key={chord.name} name={chord.name} frets={chord.frets} />
            ))}
          </div>
      </div>
    </div>
  );
}
