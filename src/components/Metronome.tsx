import { useState, useEffect, useRef } from 'react';
import { Play, Square, Minus, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

export function Metronome() {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef(0);
  const timerIDRef = useRef<number | null>(null);
  const lookahead = 25.0; // milliseconds
  const scheduleAheadTime = 0.1; // seconds

  useEffect(() => {
    // Initialize AudioContext on user interaction if needed, but here we do it on mount (might be blocked)
    // Better to init on first play
    return () => {
      if (timerIDRef.current) {
        window.clearTimeout(timerIDRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const nextNote = () => {
    const secondsPerBeat = 60.0 / bpm;
    nextNoteTimeRef.current += secondsPerBeat;
  };

  const scheduleNote = (time: number) => {
    if (!audioContextRef.current) return;
    const osc = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();

    osc.frequency.value = 1000;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc.connect(envelope);
    envelope.connect(audioContextRef.current.destination);

    osc.start(time);
    osc.stop(time + 0.03);
  };

  const scheduler = () => {
    if (!audioContextRef.current) return;
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + scheduleAheadTime) {
      scheduleNote(nextNoteTimeRef.current);
      nextNote();
    }
    timerIDRef.current = window.setTimeout(scheduler, lookahead);
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (timerIDRef.current) window.clearTimeout(timerIDRef.current);
      setIsPlaying(false);
    } else {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.05;
      scheduler();
      setIsPlaying(true);
    }
  };

  const changeBpm = (delta: number) => {
    setBpm((prev) => Math.max(30, Math.min(300, prev + delta)));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 max-w-sm mx-auto text-center">
      <h3 className="text-xl font-bold text-slate-900 mb-6">节拍器</h3>
      
      <div className="mb-8">
        <div className="text-6xl font-black text-indigo-600 tabular-nums">{bpm}</div>
        <div className="text-slate-500 text-sm mt-2">BPM</div>
      </div>

      <div className="flex items-center justify-center gap-6 mb-8">
        <button
          onClick={() => changeBpm(-5)}
          className="p-3 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Decrease BPM"
        >
          <Minus className="w-6 h-6" />
        </button>
        
        <button
          onClick={togglePlay}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg",
            isPlaying 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          )}
        >
          {isPlaying ? <Square className="w-6 h-6 fill-current" /> : <Play className="w-8 h-8 ml-1 fill-current" />}
        </button>

        <button
          onClick={() => changeBpm(5)}
          className="p-3 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Increase BPM"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      
      <input
        type="range"
        min="30"
        max="300"
        value={bpm}
        onChange={(e) => setBpm(parseInt(e.target.value))}
        className="w-full accent-indigo-600"
      />
    </div>
  );
}
