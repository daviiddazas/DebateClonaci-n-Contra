import React from 'react';
import { SubSlide, MainMotive, Speaker } from '../types';
import { EvidenceGraphics } from './EvidenceGraphics';
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface SlideViewerProps {
  currentMotive: MainMotive;
  currentSlide: SubSlide;
  currentSpeaker: Speaker;
  isDarkMode: boolean;
  onSelectSubSlide: (index: number) => void;
  onOpenLightbox: () => void;
  onClosePanel?: () => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  currentMotive,
  currentSlide,
  currentSpeaker,
  isDarkMode,
  onSelectSubSlide,
  onOpenLightbox,
  onClosePanel,
}) => {
  // Helper to parse YouTube embeds
  const isYoutube = (url?: string) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const isDirectVideo = (url?: string) => {
    if (!url) return false;
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov') || url.includes('vimeo.com');
  };

  const getYoutubeEmbed = (url: string) => {
    try {
      if (url.includes('youtube.com/watch?v=')) {
        const id = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${id}?rel=0`;
      }
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}?rel=0`;
      }
      if (url.includes('youtube.com/shorts/')) {
        const id = url.split('shorts/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}?rel=0`;
      }
      if (url.includes('youtube.com/embed/')) {
        return url;
      }
    } catch (e) {
      return url;
    }
    return url;
  };

  const hasMedia = Boolean(currentSlide.mediaUrl && currentSlide.mediaUrl.trim().length > 0);

  const cardBg = isDarkMode
    ? 'bg-slate-900/95 border-slate-700 text-slate-100 shadow-2xl'
    : 'bg-white/95 border-slate-300 text-slate-900 shadow-2xl';

  return (
    <div className={`w-full rounded-2xl border transition-colors ${cardBg} p-5 sm:p-7 flex flex-col gap-4 max-h-[88vh] overflow-y-auto`}>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          {/* Official OICRV Stamp */}
          <img
            src="/assets/aistudio/logo_3abde976.png"
            alt="OICRV"
            className="w-8 h-8 rounded-lg object-contain bg-slate-950 p-0.5 border border-cyan-500/30 hidden sm:inline-block shadow-xs"
          />

          {/* Sub-node step pills */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
            {[1, 2, 3, 4].map((subNum) => {
              const active = currentSlide.subIndex === subNum;
              return (
                <button
                  key={subNum}
                  onClick={() => onSelectSubSlide(subNum)}
                  className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all ${
                    active
                      ? 'text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  style={{
                    backgroundColor: active ? currentMotive.themeColor : 'transparent',
                  }}
                >
                  {currentMotive.id}.{subNum}
                </button>
              );
            })}
          </div>

          <span
            className="text-[11px] font-black px-2.5 py-1 rounded-md uppercase text-white hidden md:inline-block shadow-xs"
            style={{ backgroundColor: currentMotive.themeColor }}
          >
            Motivo {currentMotive.number}
          </span>
        </div>

        {/* Close Button */}
        {onClosePanel && (
          <button
            onClick={onClosePanel}
            title="Cerrar ventana para explorar libremente"
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* TWO-COLUMN SLIDE PRESENTATION LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ================= COLUMN 1: LEFT (Thesis & Arguments) ================= */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-3">
          <div className="space-y-3.5">
            {/* Slide Title */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-slate-900 dark:text-white">
                {currentSlide.title}
              </h3>
            </div>

            {/* Direct Thesis Statement */}
            <div className="p-4 rounded-xl border border-cyan-500/40 bg-cyan-50/70 dark:bg-cyan-500/5 shadow-xs">
              <p className="text-sm sm:text-base font-bold leading-relaxed text-slate-900 dark:text-slate-100">
                "{currentSlide.thesis}"
              </p>
            </div>

            {/* Key Support Point */}
            <div className={`p-4 rounded-xl border text-xs sm:text-sm ${
              isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-100/90 border-slate-300'
            }`}>
              <span className="font-black text-cyan-800 dark:text-cyan-400 uppercase tracking-wider block mb-1.5 text-[10px] sm:text-[11px]">
                Evidencia Científica y Sustentación:
              </span>
              <p className="text-slate-900 dark:text-slate-200 leading-relaxed font-semibold">
                {currentSlide.keySupportPoint}
              </p>
            </div>
          </div>

          {/* Speaker Bio Bar */}
          <div className={`p-3 rounded-xl border flex items-center justify-between text-xs mt-2 ${
            isDarkMode ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-100 border-slate-300'
          }`}>
            <div className="flex items-center gap-3">
              {currentSpeaker.photoUrl ? (
                <img
                  src={currentSpeaker.photoUrl}
                  alt={currentSpeaker.name}
                  className="w-10 h-10 rounded-full object-cover border border-cyan-500/40 shadow-xs shrink-0"
                />
              ) : (
                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${currentSpeaker.avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                  {currentSpeaker.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">{currentSpeaker.name}</p>
                <p className="text-xs font-bold text-cyan-800 dark:text-cyan-400">{currentSpeaker.title}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-bold text-slate-900 dark:text-slate-200">
              {currentSpeaker.role.split(' ')[0]} {currentSpeaker.role.split(' ')[1]}
            </span>
          </div>
        </div>

        {/* ================= COLUMN 2: RIGHT (Dedicated Media Space for Image / Embedded YouTube) ================= */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-3">
          {/* Media Display Space (Embedded YouTube, Direct Video, Image or Scientific Graphic) */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700/60 bg-black/40 min-h-[260px] flex items-center justify-center flex-1">
            {hasMedia ? (
              isYoutube(currentSlide.mediaUrl) ? (
                /* EMBEDDED YOUTUBE VIDEO PLAYER */
                <div className="w-full h-full relative aspect-video min-h-[260px]">
                  <iframe
                    src={getYoutubeEmbed(currentSlide.mediaUrl!)}
                    title={currentSlide.title}
                    className="w-full h-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {/* Floating Expand button to go fullscreen */}
                  <button
                    onClick={onOpenLightbox}
                    className="absolute top-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xl border border-slate-700 transition-all hover:scale-105"
                    title="Expandir video a pantalla completa"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Expandir</span>
                  </button>
                </div>
              ) : isDirectVideo(currentSlide.mediaUrl) ? (
                /* DIRECT VIDEO */
                <div className="w-full relative">
                  <video
                    src={currentSlide.mediaUrl}
                    controls
                    className="w-full max-h-64 rounded-xl object-contain"
                  />
                  <button
                    onClick={onOpenLightbox}
                    className="absolute top-2.5 right-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xl border border-slate-700"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Expandir</span>
                  </button>
                </div>
              ) : (
                /* IMAGE DISPLAY WITH CLICK TO FULLSCREEN */
                <div
                  onClick={onOpenLightbox}
                  className="w-full h-full relative group cursor-pointer flex items-center justify-center"
                >
                  <img
                    src={currentSlide.mediaUrl}
                    alt={currentSlide.title}
                    className="w-full h-64 sm:h-72 object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <span className="px-3.5 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 shadow-2xl backdrop-blur-md">
                      <Maximize2 className="w-4 h-4 text-cyan-400" />
                      <span>Ver imagen a pantalla completa</span>
                    </span>
                  </div>
                </div>
              )
            ) : (
              /* DEFAULT HIGH RESOLUTION EVIDENCE GRAPHIC */
              <div
                onClick={onOpenLightbox}
                className="w-full h-full p-2 cursor-pointer group relative flex items-center justify-center"
              >
                <EvidenceGraphics
                  type={currentSlide.evidenceGraphicType}
                  data={currentSlide.evidenceData}
                  isDarkMode={isDarkMode}
                  isCompact={true}
                />
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                  <span className="px-3.5 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 shadow-2xl backdrop-blur-md">
                    <Maximize2 className="w-4 h-4 text-cyan-400" />
                    <span>Expandir gráfico a pantalla completa</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Sub-slide navigation footer */}
          <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                const prev = currentSlide.subIndex > 1 ? currentSlide.subIndex - 1 : 4;
                onSelectSubSlide(prev);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 font-extrabold text-slate-900 dark:text-slate-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="font-mono text-slate-800 dark:text-slate-200 font-extrabold text-xs">
              Sub-nodo {currentMotive.id}.{currentSlide.subIndex} de 4
            </span>

            <button
              onClick={() => {
                const next = currentSlide.subIndex < 4 ? currentSlide.subIndex + 1 : 1;
                onSelectSubSlide(next);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 font-extrabold text-slate-900 dark:text-slate-100 transition-colors"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
