import React, { useState, useEffect } from 'react';
import { SubSlide, MainMotive, Speaker } from '../types';
import { EvidenceGraphics } from './EvidenceGraphics';
import { INITIAL_MOTIVES } from '../data/debateData';
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Edit3,
  Save,
  Check,
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  Eye,
  Lock,
  CheckCircle,
} from 'lucide-react';

import { formatMediaUrl, isYoutubeUrl, isDirectVideoUrl, getYoutubeEmbedUrl } from '../utils/mediaUtils';

interface SlideViewerProps {
  currentMotive: MainMotive;
  currentSlide: SubSlide;
  currentSpeaker: Speaker;
  isDarkMode: boolean;
  onSelectSubSlide: (index: number) => void;
  onOpenLightbox: () => void;
  onClosePanel?: () => void;
  onUpdateSlide?: (motiveId: number, subIndex: number, updatedFields: Partial<SubSlide>) => void;
  isEditingAllowed?: boolean;
  onCompileAndLock?: () => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  currentMotive,
  currentSlide,
  currentSpeaker,
  isDarkMode,
  onSelectSubSlide,
  onOpenLightbox,
  onClosePanel,
  onUpdateSlide,
  isEditingAllowed = true,
  onCompileAndLock,
}) => {
  // Editing state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState(currentSlide.title);
  const [thesis, setThesis] = useState(currentSlide.thesis);
  const [keySupportPoint, setKeySupportPoint] = useState(currentSlide.keySupportPoint);
  const [mediaUrl, setMediaUrl] = useState(currentSlide.mediaUrl || '');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Sync state whenever the selected slide or motive changes
  useEffect(() => {
    setTitle(currentSlide.title);
    setThesis(currentSlide.thesis);
    setKeySupportPoint(currentSlide.keySupportPoint);
    setMediaUrl(currentSlide.mediaUrl || '');
    setSaveSuccess(false);
  }, [currentSlide.id, currentSlide.subIndex, currentMotive.id, currentSlide.title, currentSlide.thesis, currentSlide.keySupportPoint, currentSlide.mediaUrl]);

  const handleSave = () => {
    if (onUpdateSlide) {
      onUpdateSlide(currentMotive.id, currentSlide.subIndex, {
        title: title.trim(),
        thesis: thesis.trim(),
        keySupportPoint: keySupportPoint.trim(),
        mediaUrl: mediaUrl.trim() || undefined,
      });
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2600);
  };

  const handleResetOriginal = () => {
    const origMotive = INITIAL_MOTIVES.find((m) => m.id === currentMotive.id);
    const origSlide = origMotive?.subSlides.find((s) => s.subIndex === currentSlide.subIndex);
    if (origSlide) {
      setTitle(origSlide.title);
      setThesis(origSlide.thesis);
      setKeySupportPoint(origSlide.keySupportPoint);
      setMediaUrl(origSlide.mediaUrl || '');
      if (onUpdateSlide) {
        onUpdateSlide(currentMotive.id, currentSlide.subIndex, {
          title: origSlide.title,
          thesis: origSlide.thesis,
          keySupportPoint: origSlide.keySupportPoint,
          mediaUrl: origSlide.mediaUrl,
        });
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handleSwitchSubSlide = (newIndex: number) => {
    // If currently editing, auto-save pending changes before switching
    if (isEditing && onUpdateSlide) {
      onUpdateSlide(currentMotive.id, currentSlide.subIndex, {
        title: title.trim(),
        thesis: thesis.trim(),
        keySupportPoint: keySupportPoint.trim(),
        mediaUrl: mediaUrl.trim() || undefined,
      });
    }
    onSelectSubSlide(newIndex);
  };

  const isYoutube = (url?: string) => isYoutubeUrl(url);
  const isDirectVideo = (url?: string) => isDirectVideoUrl(url);
  const getYoutubeEmbed = (url: string) => getYoutubeEmbedUrl(url, false);

  const rawMedia = isEditing ? mediaUrl : currentSlide.mediaUrl;
  const formattedMedia = formatMediaUrl(rawMedia);
  const hasMedia = Boolean(formattedMedia && formattedMedia.trim().length > 0);

  const cardBg = isDarkMode
    ? 'bg-slate-900/95 border-slate-700 text-slate-100 shadow-2xl'
    : 'bg-white/95 border-slate-300 text-slate-900 shadow-2xl';

  return (
    <div className={`w-full rounded-2xl border transition-colors ${cardBg} p-5 sm:p-7 flex flex-col gap-4 max-h-[88vh] overflow-y-auto`}>
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2.5">
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
                  onClick={() => handleSwitchSubSlide(subNum)}
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

        {/* Right Action Bar: Edit, Save, Reset & Close */}
        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-3 py-1.5 rounded-xl border border-emerald-500/40 shadow-xs animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>¡Guardado!</span>
            </span>
          )}

          {!isEditingAllowed ? (
            <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 shadow-xs">
              <Lock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Contenido Fijo y Compilado</span>
            </span>
          ) : isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
                title="Guardar y fijar cambios en esta diapositiva"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar</span>
              </button>

              {onCompileAndLock && (
                <button
                  onClick={onCompileAndLock}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
                  title="Compilar permanentemente en el código y bloquear modificaciones"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Compilar y Bloquear</span>
                </button>
              )}

              <button
                onClick={handleResetOriginal}
                className="p-1.5 rounded-xl text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                title="Restablecer textos originales de esta diapositiva"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs transition-colors"
                title="Ver vista previa de la presentación"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Vista Previa</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                title="Habilitar edición de textos, tesis y títulos"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Textos</span>
              </button>

              {onCompileAndLock && (
                <button
                  onClick={onCompileAndLock}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                  title="Compilar datos en el código fuente y fijar presentación"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Compilar en Código</span>
                </button>
              )}
            </div>
          )}

          {/* Close Button */}
          {onClosePanel && (
            <button
              onClick={onClosePanel}
              title="Cerrar ventana para explorar libremente"
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Editing active banner notification */}
      {isEditing && (
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-900 dark:text-cyan-200 animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
            <span className="font-semibold">
              <strong>Modo Edición activo:</strong> Modifica el título, la tesis o la evidencia a tu gusto. Pulsa <strong>Guardar Cambios</strong> para fijar cada diapositiva.
            </span>
          </div>
          <button
            onClick={handleSave}
            className="text-[11px] font-black underline uppercase text-cyan-700 dark:text-cyan-300 hover:text-cyan-950 dark:hover:text-white shrink-0"
          >
            Fijar ahora
          </button>
        </div>
      )}

      {/* TWO-COLUMN SLIDE PRESENTATION LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ================= COLUMN 1: LEFT (Thesis & Arguments) ================= */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-3">
          <div className="space-y-3.5">
            {isEditing ? (
              /* EDIT MODE: EDITABLE TEXT INPUTS */
              <div className="space-y-3">
                {/* Editable Title */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase tracking-wider text-cyan-800 dark:text-cyan-400">
                      Título de la Diapositiva
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">{title.length} car.</span>
                  </div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Escribe el título de la diapositiva..."
                    className="w-full px-3.5 py-2 rounded-xl border border-cyan-500/50 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-lg sm:text-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none shadow-xs"
                  />
                </div>

                {/* Editable Thesis Statement */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase tracking-wider text-cyan-800 dark:text-cyan-400">
                      Tesis Central (Directa y Concisa)
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">{thesis.length} car.</span>
                  </div>
                  <textarea
                    rows={3}
                    value={thesis}
                    onChange={(e) => setThesis(e.target.value)}
                    placeholder="Escribe la tesis central de sustentación..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-cyan-500/50 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm leading-relaxed focus:ring-2 focus:ring-cyan-500 focus:outline-none shadow-xs resize-y"
                  />
                </div>

                {/* Editable Key Support Point */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase tracking-wider text-cyan-800 dark:text-cyan-400">
                      Evidencia Científica y Sustentación
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono">{keySupportPoint.length} car.</span>
                  </div>
                  <textarea
                    rows={4}
                    value={keySupportPoint}
                    onChange={(e) => setKeySupportPoint(e.target.value)}
                    placeholder="Detalla los datos científicos, estudios, leyes o citas de apoyo..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-cyan-500 focus:outline-none shadow-xs resize-y"
                  />
                </div>

                {/* Bottom Quick Save Row */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={handleResetOriginal}
                    className="text-[11px] text-amber-700 dark:text-amber-400 hover:underline font-bold"
                  >
                    Restablecer texto original
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Fijar Diapositiva</span>
                  </button>
                </div>
              </div>
            ) : (
              /* VIEW MODE: PRISTINE PRESENTATION TYPOGRAPHY */
              <>
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
              </>
            )}
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
          {/* Editable media input when in edit mode */}
          {isEditing && (
            <div className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 space-y-1.5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black uppercase tracking-wider text-cyan-800 dark:text-cyan-400 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5" />
                  Enlace Multimedia (Imagen o Video YouTube)
                </label>
                {mediaUrl && (
                  <button
                    onClick={() => setMediaUrl('')}
                    className="text-[10px] text-rose-600 dark:text-rose-400 hover:underline font-bold"
                  >
                    Borrar enlace
                  </button>
                )}
              </div>
              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="Pega enlace público de imagen o video de YouTube..."
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          )}

          {/* Media Display Space (Embedded YouTube, Direct Video, Image or Scientific Graphic) */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700/60 bg-black/40 min-h-[260px] flex items-center justify-center flex-1">
            {hasMedia ? (
              isYoutube(formattedMedia) ? (
                /* EMBEDDED YOUTUBE VIDEO PLAYER */
                <div className="w-full h-full relative aspect-video min-h-[260px]">
                  <iframe
                    src={getYoutubeEmbed(formattedMedia)}
                    title={title}
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
              ) : isDirectVideo(formattedMedia) ? (
                /* DIRECT VIDEO */
                <div className="w-full relative">
                  <video
                    src={formattedMedia}
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
                    src={formattedMedia}
                    alt={title}
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
                handleSwitchSubSlide(prev);
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
                handleSwitchSubSlide(next);
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
