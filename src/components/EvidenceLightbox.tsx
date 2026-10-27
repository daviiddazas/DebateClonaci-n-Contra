import React, { useEffect } from 'react';
import { SubSlide, MainMotive } from '../types';
import { EvidenceGraphics } from './EvidenceGraphics';
import { ArrowLeft, Maximize2 } from 'lucide-react';

interface EvidenceLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  slide: SubSlide;
  motive: MainMotive;
  isDarkMode: boolean;
}

export const EvidenceLightbox: React.FC<EvidenceLightboxProps> = ({
  isOpen,
  onClose,
  slide,
  motive,
  isDarkMode,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isVideoUrl = (url?: string) => {
    if (!url) return false;
    return (
      url.includes('youtube.com') ||
      url.includes('youtu.be') ||
      url.includes('vimeo.com') ||
      url.endsWith('.mp4') ||
      url.endsWith('.webm') ||
      url.endsWith('.mov')
    );
  };

  const getYoutubeEmbed = (url: string) => {
    try {
      if (url.includes('youtube.com/watch?v=')) {
        const id = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
      if (url.includes('youtube.com/shorts/')) {
        const id = url.split('shorts/')[1]?.split('?')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
      if (url.includes('youtube.com/embed/')) {
        return `${url}?autoplay=1&rel=0`;
      }
    } catch (e) {
      return url;
    }
    return url;
  };

  const hasCustomMedia = Boolean(slide.mediaUrl && slide.mediaUrl.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Darkened backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/92 backdrop-blur-lg transition-opacity"
        onClick={onClose}
      />

      {/* Fullscreen Frame */}
      <div
        className={`relative z-10 w-full max-w-6xl max-h-[95vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${
          isDarkMode
            ? 'bg-slate-900 border-slate-700 text-slate-100 shadow-cyan-950/50'
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-400/50'
        }`}
      >
        {/* Top Header Bar with prominent 'Regresar a la diapositiva' button */}
        <div className={`px-5 py-3.5 border-b flex items-center justify-between gap-4 ${
          isDarkMode ? 'border-slate-800 bg-slate-900/95' : 'border-slate-100 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shrink-0"
              style={{ backgroundColor: motive.themeColor }}
            >
              Diapositiva {motive.id}.{slide.subIndex}
            </span>
            <h3 className="text-sm sm:text-base font-black leading-tight line-clamp-1">
              {slide.title}
            </h3>
          </div>

          {/* THE REQUESTED EXPLICIT BUTTON TO RETURN TO CURRENT SLIDE */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Regresar a la diapositiva {motive.id}.{slide.subIndex}</span>
          </button>
        </div>

        {/* Content Body: Media Expanded */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          {hasCustomMedia ? (
            <div className="w-full flex items-center justify-center rounded-2xl overflow-hidden bg-black/60 min-h-[380px]">
              {isVideoUrl(slide.mediaUrl) ? (
                slide.mediaUrl?.includes('youtube') || slide.mediaUrl?.includes('youtu.be') ? (
                  <iframe
                    src={getYoutubeEmbed(slide.mediaUrl!)}
                    className="w-full aspect-video max-h-[75vh] rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={slide.title}
                  />
                ) : (
                  <video
                    src={slide.mediaUrl}
                    controls
                    autoPlay
                    className="w-full max-h-[75vh] rounded-xl"
                  />
                )
              ) : (
                <img
                  src={slide.mediaUrl}
                  alt={slide.title}
                  className="w-full max-h-[75vh] object-contain rounded-xl"
                />
              )}
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-700/50 shadow-inner p-2">
                <EvidenceGraphics
                  type={slide.evidenceGraphicType}
                  data={slide.evidenceData}
                  isDarkMode={isDarkMode}
                  isCompact={false}
                />
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className={`p-4 rounded-xl border ${
                  isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-100 border-slate-300'
                }`}>
                  <h4 className="text-xs font-black text-cyan-800 dark:text-cyan-400 uppercase tracking-wider mb-2">
                    Tesis Científica OICRV
                  </h4>
                  <p className="text-sm font-bold leading-relaxed text-slate-900 dark:text-slate-100">
                    "{slide.thesis}"
                  </p>
                </div>

                <div className={`p-3.5 rounded-xl border text-xs ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-100 border-slate-300'
                }`}>
                  <span className="font-bold text-slate-700 dark:text-slate-400 block mb-1">Referencia Bibliográfica:</span>
                  <p className="font-mono text-slate-900 dark:text-slate-200 font-semibold">{slide.scientificReference}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className={`px-6 py-3 border-t flex items-center justify-between text-xs text-slate-700 dark:text-slate-400 ${
          isDarkMode ? 'border-slate-800 bg-slate-900/95' : 'border-slate-200 bg-slate-50'
        }`}>
          <span className="font-medium">Soporte Oficial · Debate Académico Clonación Humana</span>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Regresar a la diapositiva {motive.id}.{slide.subIndex}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
