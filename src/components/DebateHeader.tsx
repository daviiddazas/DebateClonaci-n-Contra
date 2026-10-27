import React, { useState, useEffect } from 'react';
import { ThemeMode, ViewLayout, Speaker } from '../types';
import { SPEAKERS } from '../data/debateData';
import {
  Sun,
  Moon,
  Shield,
  Clock,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  FileText,
  Award,
  ChevronRight
} from 'lucide-react';

interface DebateHeaderProps {
  themeMode: ThemeMode;
  onToggleTheme: () => void;
  onOpenReferences: () => void;
  onOpenSpeakerCredential: (speaker: Speaker) => void;
  speakers?: Speaker[];
}

export const DebateHeader: React.FC<DebateHeaderProps> = ({
  themeMode,
  onToggleTheme,
  onOpenReferences,
  onOpenSpeakerCredential,
  speakers,
}) => {
  const [timerSeconds, setTimerSeconds] = useState<number>(180);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isDark = themeMode === 'dark';

  const speakersArray = speakers || [SPEAKERS.david, SPEAKERS.laura, SPEAKERS.fabian, SPEAKERS.consejo];

  return (
    <header className={`w-full border-b transition-colors ${
      isDark
        ? 'bg-slate-900/95 border-slate-800 text-slate-100'
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Top brand and controls bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand with Official Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/logo_3abde976.png"
            alt="Logo OICRV"
            className="w-11 h-11 rounded-xl object-contain shadow-md border border-cyan-500/30 shrink-0 bg-slate-950 p-0.5"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-sm tracking-widest text-cyan-700 dark:text-cyan-400">OICRV</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-100 dark:bg-rose-500/15 text-rose-800 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30 shadow-xs">
                Postura Oficial: En Contra
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-100">
              Organización Internacional de Ciencia Responsable por la Vida
            </h1>
            <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 italic">
              "Ciencia con Conciencia · Por la Dignidad y la Vida Humana"
            </p>
          </div>
        </div>

        {/* Right side controls: Timer, References, and Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Debate Timer */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${
            isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-300'
          }`}>
            <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className={`font-mono text-xs sm:text-sm font-bold ${
              timerSeconds <= 30 ? 'text-rose-600 dark:text-rose-500 animate-pulse' : 'text-slate-900 dark:text-slate-100'
            }`}>
              {formatTimer(timerSeconds)}
            </span>
            <div className="flex items-center gap-1 border-l pl-2 border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                title={isTimerRunning ? 'Pausar' : 'Iniciar'}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(180);
                }}
                title="Reiniciar a 3 min"
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* References */}
          <button
            onClick={onOpenReferences}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Bibliografía</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Alternar modo claro u oscuro"
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-xs'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* CREDENTIALS SECTION AT THE START OF THE ORGANIZATION */}
      <div className={`px-4 sm:px-6 py-2 border-t flex items-center justify-between overflow-x-auto scrollbar-none gap-2 text-xs ${
        isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-100/80 border-slate-200'
      }`}>
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold shrink-0">
          <Award className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span className="text-[11px] uppercase tracking-wider">Credenciales de Integrantes:</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {speakersArray.map((speaker) => (
            <button
              key={speaker.id}
              onClick={() => onOpenSpeakerCredential(speaker)}
              className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                isDark
                  ? 'bg-slate-900 border-slate-700/80 hover:border-cyan-500 text-slate-200'
                  : 'bg-white border-slate-300 hover:border-cyan-600 text-slate-900 shadow-xs'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-gradient-to-tr ${speaker.avatarColor} flex items-center justify-center text-white text-[10px] font-bold`}>
                {speaker.name.charAt(0)}
              </div>
              <span className="font-bold text-[11px]">{speaker.name}</span>
              <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold hidden md:inline">({speaker.title.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
