import React, { useState, useEffect } from 'react';
import { Speaker } from '../types';
import {
  ArrowLeft,
  ShieldCheck,
  Building2,
  CheckCircle,
  Maximize2,
  X
} from 'lucide-react';
import { formatMediaUrl } from '../utils/mediaUtils';

interface CredentialLightboxProps {
  speaker: Speaker | null;
  onClose: () => void;
  isDarkMode: boolean;
}

export const CredentialLightbox: React.FC<CredentialLightboxProps> = ({
  speaker,
  onClose,
  isDarkMode,
}) => {
  const [isPhotoExpanded, setIsPhotoExpanded] = useState<boolean>(false);

  useEffect(() => {
    setIsPhotoExpanded(false);
  }, [speaker]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isPhotoExpanded) {
          setIsPhotoExpanded(false);
        } else {
          onClose();
        }
      }
    };
    if (speaker) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [speaker, isPhotoExpanded, onClose]);

  if (!speaker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-slate-950/92 backdrop-blur-md"
        onClick={() => {
          if (isPhotoExpanded) setIsPhotoExpanded(false);
          else onClose();
        }}
      />

      {/* Main Credential Modal Card */}
      <div
        className={`relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
          isDarkMode
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-300 text-slate-900'
        }`}
      >
        {/* Header with single requested 'Volver a la principal' button */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-slate-900/95' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
            <img
              src="/assets/aistudio/logo_3abde976.png"
              alt="OICRV Seal"
              className="w-6 h-6 rounded object-contain bg-slate-950 p-0.5 border border-cyan-500/30"
            />
            <span>Credencial Oficial Acreditada OICRV</span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la principal</span>
          </button>
        </div>

        {/* Credential Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed relative overflow-hidden ${
            isDarkMode
              ? 'bg-gradient-to-b from-slate-800/80 to-slate-900/90 border-cyan-500/30'
              : 'bg-gradient-to-b from-slate-50 to-white border-cyan-600/40 shadow-inner'
          }`}>
            {/* Top Certificate Header with OICRV Logo */}
            <div className="text-center pb-5 border-b border-slate-300 dark:border-slate-700/40 flex flex-col items-center">
              <img
                src="/assets/aistudio/logo_3abde976.png"
                alt="Logo OICRV"
                className="w-14 h-14 rounded-2xl object-contain bg-slate-950 p-1 border border-cyan-500/40 shadow-md mb-2.5"
              />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-black bg-cyan-100 dark:bg-cyan-500/10 text-cyan-900 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-500/20 mb-2">
                REGISTRO ACADÉMICO: {speaker.credentialId}
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                CERTIFICACIÓN DE DELEGACIÓN ACADÉMICA
              </h2>
              <p className="text-xs text-slate-700 dark:text-slate-400 font-bold mt-1">
                Organización Internacional de Ciencia Responsable por la Vida · "Ciencia con Conciencia"
              </p>
            </div>

            {/* Member Details + DEDICATED IMAGE SPACE */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* IMAGE / PHOTO / DIPLOMA CONTAINER */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div
                  onClick={() => setIsPhotoExpanded(true)}
                  className="relative group cursor-pointer w-44 h-52 sm:w-48 sm:h-56 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-xl bg-slate-950/60 flex items-center justify-center transition-all hover:scale-102 hover:border-cyan-400"
                >
                  {speaker.photoUrl ? (
                    <img
                      src={formatMediaUrl(speaker.photoUrl)}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-tr ${speaker.avatarColor} flex flex-col items-center justify-center text-white p-4 text-center`}>
                      <span className="text-4xl font-black mb-2">{speaker.name.charAt(0)}</span>
                      <span className="text-xs font-bold">{speaker.name}</span>
                    </div>
                  )}

                  {/* Hover expand hint */}
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1 p-2 text-center">
                    <Maximize2 className="w-5 h-5 text-cyan-400" />
                    <span className="text-[11px] font-bold">Clic para ampliar imagen</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-700 dark:text-slate-400 mt-2.5 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Acreditación Oficial OICRV</span>
                </p>
              </div>

              {/* Speaker Credentials Text Info */}
              <div className="md:col-span-7 space-y-2 text-center md:text-left">
                <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-widest block">
                  Miembro Titular OICRV
                </span>
                <h3 className="text-2xl sm:text-3xl font-black leading-tight text-slate-950 dark:text-white">{speaker.name}</h3>
                <p className="text-sm font-extrabold text-cyan-800 dark:text-cyan-400">{speaker.title}</p>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-center md:justify-start gap-1.5 pt-1">
                  <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{speaker.university}</span>
                </p>

                <div className={`mt-3 p-4 rounded-xl border text-xs leading-relaxed text-left ${
                  isDarkMode ? 'bg-slate-900/60 border-slate-700/60' : 'bg-white border-slate-300 shadow-xs'
                }`}>
                  <div className="flex items-center gap-2 font-black mb-1.5 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Dictamen y Especialidad Asignada:</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-[13px] leading-relaxed font-medium">
                    {speaker.diplomaText}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/40 flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-700 dark:text-slate-400 font-mono">
                    <span>Cargo: <strong className="text-slate-900 dark:text-white">{speaker.role}</strong></span>
                    <span className="text-cyan-800 dark:text-cyan-400 font-black">{speaker.institutionRole}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Area */}
            <div className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-700/40 flex items-center justify-between">
              <div>
                <p className="font-serif italic text-xs sm:text-sm text-slate-700 dark:text-slate-400">Consejo General OICRV</p>
                <p className="text-[10px] font-mono uppercase text-slate-600 dark:text-slate-500 font-bold">Acreditación Verificada</p>
              </div>
              <div className="text-right">
                <div className="w-24 h-5 border-b border-cyan-500/50 mb-1" />
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-300">{speaker.signatureTitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with return button */}
        <div className={`px-6 py-3.5 border-t flex items-center justify-end ${
          isDarkMode ? 'border-slate-800 bg-slate-900/95' : 'border-slate-200 bg-slate-50'
        }`}>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la principal</span>
          </button>
        </div>
      </div>

      {/* FULLSCREEN ZOOM OF CREDENTIAL IMAGE (if clicked) */}
      {isPhotoExpanded && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in">
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center">
            <button
              onClick={() => setIsPhotoExpanded(false)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700"
            >
              <X className="w-4 h-4" />
              <span>Cerrar foto</span>
            </button>
            <img
              src={formatMediaUrl(speaker.photoUrl) || ''}
              alt={speaker.name}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl border-2 border-cyan-500/40"
            />
            <p className="text-xs text-slate-300 font-bold mt-3 text-center">
              Fotografía oficial / Credencial de {speaker.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
