import { useState, useRef, useEffect, useCallback } from 'react';

const NOTE_STRINGS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export interface PitchData {
  frequency: number;
  note: string;
  midiNote: number | null;
  cents: number;
  isListening: boolean;
  startListening: () => Promise<void>;
  stopListening: () => void;
}

export function usePitchDetector(): PitchData {
  const [isListening, setIsListening] = useState(false);
  const [frequency, setFrequency] = useState<number>(0);
  const [note, setNote] = useState<string>('-');
  const [midiNote, setMidiNote] = useState<number | null>(null);
  const [cents, setCents] = useState<number>(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Autocorrelation algorithm
  const autoCorrelate = useCallback((buf: Float32Array, sampleRate: number) => {
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
  }, []);

  const updatePitchRef = useRef<() => void>(() => {});

  useEffect(() => {
    updatePitchRef.current = () => {
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
        setMidiNote(noteInt);
        setCents(detune);
      }

      rafIdRef.current = requestAnimationFrame(updatePitchRef.current);
    };
  }, [autoCorrelate]);

  const stopListening = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (mediaStreamSourceRef.current) {
      mediaStreamSourceRef.current.disconnect();
      mediaStreamSourceRef.current.mediaStream.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) audioContextRef.current.close();
    
    setIsListening(false);
    setFrequency(0);
    setNote('-');
    setMidiNote(null);
    setCents(0);
    
    audioContextRef.current = null;
    analyserRef.current = null;
    mediaStreamSourceRef.current = null;
    rafIdRef.current = null;
  }, []);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      
      mediaStreamSourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      mediaStreamSourceRef.current.connect(analyserRef.current);
      
      setIsListening(true);
      updatePitchRef.current();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("无法访问麦克风，请检查权限设置。");
    }
  }, []);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    frequency,
    note,
    midiNote,
    cents,
    isListening,
    startListening,
    stopListening
  };
}
