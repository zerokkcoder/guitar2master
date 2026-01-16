import { useRef } from 'react';

interface ChordProps {
  name: string;
  frets: number[]; // Array of 6 numbers: -1 (mute), 0 (open), >0 (fret)
                   // Order: Low E (6th string) to High E (1st string)
}

export function ChordChart({ name, frets }: ChordProps) {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playString = (stringIndex: number, fret: number) => {
    if (fret === -1) return; // Muted

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Standard tuning frequencies (E2, A2, D3, G3, B3, E4)
    const baseFreqs = [82.41, 110.00, 146.83, 196.00, 246.94, 329.63];
    // Calculate frequency based on fret
    const freq = baseFreqs[stringIndex] * Math.pow(2, fret / 12);

    osc.frequency.value = freq;
    osc.type = 'triangle'; // Softer sound

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.5);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="relative w-40 h-48 select-none">
        <svg viewBox="0 0 100 120" className="w-full h-full">
          {/* Frets (horizontal lines) */}
          <line x1="10" y1="20" x2="90" y2="20" stroke="black" strokeWidth="2" /> {/* Nut */}
          {[1, 2, 3, 4].map(i => (
            <line key={i} x1="10" y1={20 + i * 20} x2="90" y2={20 + i * 20} stroke="gray" strokeWidth="1" />
          ))}

          {/* Strings (vertical lines) */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line 
              key={i} 
              x1={10 + i * 16} 
              y1="20" 
              x2={10 + i * 16} 
              y2="100" 
              stroke="black" 
              strokeWidth={i > 2 ? 1 : 1.5} // Thicker for lower strings (visually reversed here, actually low E is usually left but let's standard)
                                            // Actually standard chord charts: Low E is left.
            />
          ))}

          {/* Dots and Markers */}
          {frets.map((fret, stringIndex) => {
            const x = 10 + stringIndex * 16;
            if (fret === -1) {
              // X mark
              return (
                <text key={stringIndex} x={x} y="15" textAnchor="middle" fontSize="10">X</text>
              );
            }
            if (fret === 0) {
              // Open circle
              return (
                <circle key={stringIndex} cx={x} cy="12" r="3" fill="none" stroke="black" />
              );
            }
            // Fret dot
            return (
              <circle 
                key={stringIndex} 
                cx={x} 
                cy={20 + (fret - 0.5) * 20} 
                r="6" 
                fill="black" 
                onClick={() => playString(stringIndex, fret)}
                className="cursor-pointer hover:fill-indigo-600"
              />
            );
          })}
        </svg>
      </div>
      <p className="text-xs text-slate-500 mt-2">点击黑点试听</p>
    </div>
  );
}
