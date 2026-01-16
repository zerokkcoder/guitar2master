import { useRef } from 'react';

interface ChordProps {
  name: string;
  frets: number[]; // Array of 6 numbers: -1 (mute), 0 (open), >0 (fret)
                   // Order: Low E (6th string) to High E (1st string)
}

export function ChordChart({ name, frets }: ChordProps) {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playString = (stringIndex: number, fret: number, timeOffset: number = 0) => {
    if (fret === -1) return; // Muted

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;
    
    // Standard tuning frequencies (E2, A2, D3, G3, B3, E4)
    const baseFreqs = [82.41, 110.00, 146.83, 196.00, 246.94, 329.63];
    const freq = baseFreqs[stringIndex] * Math.pow(2, fret / 12);
    
    // Karplus-Strong Algorithm Implementation
    const duration = 2.0; // Seconds
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    
    // 1. Create a noise burst (excitation)
    // The period (N) corresponds to the wavelength of the fundamental frequency
    const period = Math.round(sampleRate / freq);
    for (let i = 0; i < period; i++) {
      // White noise burst
      data[i] = (Math.random() * 2 - 1);
    }
    
    // 2. Apply feedback loop (decay)
    // y[n] = 0.5 * (y[n-N] + y[n-N-1]) * decayFactor
    // To make it sound more like acoustic guitar (brighter start, metallic fade), 
    // we can use a slightly higher decay factor.
    // Low E string decays slower than High E.
    let decay = 0.99;
    // Adjust decay based on string thickness/frequency (lower strings sustain longer)
    if (stringIndex < 3) decay = 0.996; 
    
    for (let i = period; i < length; i++) {
      // Simple averaging filter (Lowpass)
      const prevSample = data[i - period];
      const prevPrevSample = data[i - period - 1] || 0; // Handle boundary case to avoid NaN
      const val = 0.5 * (prevSample + prevPrevSample);
      data[i] = val * decay;
    }
    
    // 3. Play the buffer
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    
    // Connect to a gain node to control overall volume and prevent clipping
    const gain = ctx.createGain();
    gain.gain.value = 0.5; // Master volume for this note
    
    // Optional: Add a simple Highpass filter to remove muddy low frequencies (body resonance simulation)
    const bodyFilter = ctx.createBiquadFilter();
    bodyFilter.type = 'highpass';
    bodyFilter.frequency.value = 100;

    source.connect(bodyFilter);
    bodyFilter.connect(gain);
    gain.connect(ctx.destination);
    
    source.start(ctx.currentTime + timeOffset);
  };

  const playChord = () => {
    // Initialize context first to ensure we have a valid currentTime base
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    let delay = 0;
    // Strum from Low E (index 0) to High E (index 5)
    frets.forEach((fret, index) => {
      if (fret !== -1) {
        playString(index, fret, delay);
        delay += 0.05; // 50ms strumming interval
      }
    });
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
                <circle 
                  key={stringIndex} 
                  cx={x} 
                  cy="12" 
                  r="3" 
                  fill="none" 
                  stroke="black"
                  onClick={() => playString(stringIndex, 0)}
                  className="cursor-pointer hover:stroke-indigo-600 hover:stroke-2" 
                />
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
      <p 
        className="text-xs text-slate-500 mt-2 cursor-pointer hover:text-indigo-600 transition-colors"
        onClick={playChord}
      >
        点击此处试听扫弦
      </p>
    </div>
  );
}
