'use client';

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className="flex flex-col items-center justify-center py-8">
      <div className="mb-10">
        <div className="text-8xl font-black text-indigo-600 tabular-nums tracking-tighter leading-none">{bpm}</div>
        <div className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] mt-4">每分钟节拍 (BPM)</div>
      </div>

      <div className="flex items-center justify-center gap-8 mb-10">
        <button
          onClick={() => changeBpm(-5)}
          className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-90"
          aria-label="减小 BPM"
        >
          <Minus className="w-6 h-6" />
        </button>
        
        <button
          onClick={togglePlay}
          className={cn(
            "w-20 h-20 rounded-3xl flex items-center justify-center transition-all shadow-2xl shadow-indigo-200/50",
            isPlaying 
              ? "bg-rose-500 hover:bg-rose-600 text-white" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          )}
        >
          {isPlaying ? <Square className="w-8 h-8 fill-current" /> : <Play className="w-10 h-10 ml-1 fill-current" />}
        </button>

        <button
          onClick={() => changeBpm(5)}
          className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-90"
          aria-label="增加 BPM"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      
      <div className="w-full max-w-xs px-4">
        <input
          type="range"
          min="30"
          max="300"
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value))}
          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>30 bpm</span>
          <span>300 bpm</span>
        </div>
      </div>
    </div>
  );
}
