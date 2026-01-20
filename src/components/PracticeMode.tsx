'use client';

/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { Mic, MicOff, CheckCircle2, ArrowUp, ArrowDown, RefreshCcw } from 'lucide-react';
import { usePitchDetector } from '../hooks/usePitchDetector';
import type { PracticeExercise } from '../lib/data';
import { useProgress } from '../hooks/useProgress';

interface PracticeModeProps {
  exercise: PracticeExercise;
  courseId: number;
  levelId: string;
  xpReward: number;
}

export function PracticeMode({ exercise, courseId, levelId, xpReward }: PracticeModeProps) {
  const { isListening, startListening, stopListening, midiNote, cents } = usePitchDetector();
  const { completeLevel } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState<'waiting' | 'perfect' | 'flat' | 'sharp'>('waiting');
  const [consecutiveMatches, setConsecutiveMatches] = useState(0);
  
  const currentNote = exercise.notes[currentIndex];
  const REQUIRED_MATCHES = 15; // Requires ~250ms of stable pitch (at 60fps)

  // Check pitch logic
  useEffect(() => {
    if (!isListening || isCompleted || !currentNote) return;

    if (midiNote === null) {
      setFeedback('waiting');
      setConsecutiveMatches(0);
      return;
    }

    const targetMidi = currentNote.midi;
    const diff = midiNote - targetMidi;

    // Check if correct note (octave matters)
    if (diff === 0) {
      // Check if fine-tuned (within 25 cents)
      if (Math.abs(cents) < 25) {
        setFeedback('perfect');
        setConsecutiveMatches(prev => prev + 1);
      } else {
        setFeedback(cents < 0 ? 'flat' : 'sharp');
        // Still count as match if note is correct but slightly out of tune? 
        // Let's be strict: must be in tune.
        setConsecutiveMatches(0); 
      }
    } else {
      // Wrong note
      setFeedback(diff < 0 ? 'flat' : 'sharp');
      setConsecutiveMatches(0);
    }
  }, [midiNote, cents, isListening, isCompleted, currentNote]);

  // Handle completion of a note
  useEffect(() => {
    if (consecutiveMatches >= REQUIRED_MATCHES) {
      // Note completed!
      if (currentIndex < exercise.notes.length - 1) {
        // Move to next note
        setCurrentIndex(prev => prev + 1);
        setConsecutiveMatches(0);
        setFeedback('waiting');
      } else {
        // All notes completed
        setIsCompleted(true);
        stopListening();
        // 记录完成进度并增加 XP
        completeLevel(courseId, levelId, xpReward);
      }
    }
  }, [consecutiveMatches, currentIndex, exercise.notes.length, stopListening]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
    setConsecutiveMatches(0);
    setFeedback('waiting');
    startListening();
  };

  const progress = ((currentIndex) / exercise.notes.length) * 100;

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden text-white shadow-xl">
      {/* Header */}
      <div className="bg-slate-800 px-6 py-4 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{exercise.title}</h3>
          <p className="text-slate-400 text-sm">{exercise.description}</p>
        </div>
        <div className="text-sm font-medium bg-slate-700 px-3 py-1 rounded-full">
          {currentIndex + 1} / {exercise.notes.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-slate-800 w-full">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300 ease-out"
          style={{ width: `${isCompleted ? 100 : progress}%` }}
        />
      </div>

      <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
        {isCompleted ? (
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">练习完成！</h2>
            <p className="text-slate-400 mb-8">你已经成功完成了所有音符的跟练。</p>
            <button
              onClick={handleRestart}
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              再次练习
            </button>
          </div>
        ) : !isListening ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mic className="w-10 h-10 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">准备好了吗？</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              点击下方按钮开始练习。请确保麦克风权限已开启，并在安静的环境下进行。
            </p>
            <button
              onClick={startListening}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors shadow-lg shadow-indigo-600/20"
            >
              开始跟练
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md text-center">
            {/* Current Target */}
            <div className="mb-12 relative">
              <div className="text-slate-400 text-sm uppercase tracking-wider mb-2">当前目标</div>
              <div className="text-8xl font-black text-white mb-2 tracking-tighter">
                {currentNote.note}
              </div>
              <div className="text-indigo-400 font-medium text-lg">
                {currentNote.hint}
              </div>
              
              {/* Visual Feedback Ring */}
              {feedback === 'perfect' && (
                <div className="absolute inset-0 -m-8 border-4 border-green-500 rounded-full animate-ping opacity-20"></div>
              )}
            </div>

            {/* Real-time Feedback */}
            <div className="h-16 flex items-center justify-center">
              {feedback === 'waiting' && (
                <span className="text-slate-500 animate-pulse">聆听中...</span>
              )}
              {feedback === 'perfect' && (
                <div className="flex items-center text-green-400 font-bold text-xl animate-bounce">
                  <CheckCircle2 className="w-6 h-6 mr-2" />
                  完美！保持住...
                </div>
              )}
              {feedback === 'flat' && (
                <div className="flex items-center text-red-400 font-bold text-lg">
                  <ArrowUp className="w-6 h-6 mr-2" />
                  音偏低了
                </div>
              )}
              {feedback === 'sharp' && (
                <div className="flex items-center text-red-400 font-bold text-lg">
                  <ArrowDown className="w-6 h-6 mr-2" />
                  音偏高了
                </div>
              )}
            </div>

            <button
              onClick={stopListening}
              className="mt-8 text-slate-500 hover:text-white text-sm flex items-center justify-center w-full transition-colors"
            >
              <MicOff className="w-4 h-4 mr-1" />
              暂停练习
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
