import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '../lib/utils';

const NOTE_STRINGS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

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
  const [isListening, setIsListening] = useState(false);
  const [frequency, setFrequency] = useState<number>(0);
  const [note, setNote] = useState<string>('-');
  const [cents, setCents] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const stopListening = () => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (mediaStreamSourceRef.current) {
      mediaStreamSourceRef.current.disconnect();
      mediaStreamSourceRef.current.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) audioContextRef.current.close();
    
    setIsListening(false);
    setFrequency(0);
    setNote('-');
    setCents(0);
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      
      mediaStreamSourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      mediaStreamSourceRef.current.connect(analyserRef.current);
      
      setIsListening(true);
      updatePitch();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("无法访问麦克风，请检查权限设置。");
    }
  };



  // Autocorrelation algorithm
  const autoCorrelate = (buf: Float32Array, sampleRate: number) => {
    // Implements the McLeod Pitch Method (simplified)
    const SIZE = buf.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let rms = 0;
    let foundGoodCorrelation = false;
    const correlations = new Array(MAX_SAMPLES).fill(0);

    for (let i = 0; i < SIZE; i++) {
      const val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);

    if (rms < 0.01) return -1; // Not enough signal

    let lastCorrelation = 1;
    for (let offset = 0; offset < MAX_SAMPLES; offset++) {
      let correlation = 0;

      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs(buf[i] - buf[i + offset]);
      }
      
      correlation = 1 - (correlation / MAX_SAMPLES);
      correlations[offset] = correlation;

      if ((correlation > 0.9) && (correlation > lastCorrelation)) {
        foundGoodCorrelation = true;
        if (correlation > bestCorrelation) {
          bestCorrelation = correlation;
          bestOffset = offset;
        }
      } else if (foundGoodCorrelation) {
        // Shift exact peak
        const shift = (correlations[bestOffset + 1] - correlations[bestOffset - 1]) / 2;
        return sampleRate / (bestOffset + shift);
      }
      lastCorrelation = correlation;
    }
    
    if (bestCorrelation > 0.01) {
      return sampleRate / bestOffset;
    }
    return -1;
  };

  const updatePitch = () => {
    if (!analyserRef.current || !audioContextRef.current) return;
    
    const buf = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buf);
    
    const ac = autoCorrelate(buf, audioContextRef.current.sampleRate);

    if (ac !== -1) {
      const noteNum = 12 * (Math.log(ac / 440) / Math.log(2)) + 69;
      const noteInt = Math.round(noteNum);
      const noteName = NOTE_STRINGS[noteInt % 12];
      
      // Calculate detune in cents
      const detune = Math.floor(1200 * (Math.log(ac / (440 * Math.pow(2, (noteInt - 69) / 12))) / Math.log(2)));
      
      setFrequency(Math.round(ac));
      setNote(noteName);
      setCents(detune);
    }

    rafIdRef.current = requestAnimationFrame(updatePitch);
  };

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
            开启麦克风
          </>
        )}
      </button>

      <div className="mt-8 w-full">
         <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">标准音高参考</h4>
         <div className="grid grid-cols-6 gap-2">
            {GUITAR_STRINGS.map((s, i) => (
              <div key={i} className="text-center p-2 bg-slate-50 rounded border border-slate-100">
                <div className="font-bold text-slate-700">{s.note}</div>
                <div className="text-[10px] text-slate-400">{s.freq}</div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
