import React from 'react';
import { SPEAKERS } from '../data/debateData';
import { X, UserCheck, Award, Briefcase, BookmarkCheck, ArrowRight } from 'lucide-react';

interface SpeakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onSelectMotive: (id: number) => void;
}

export const SpeakerModal: React.FC<SpeakerModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onSelectMotive,
}) => {
  if (!isOpen) return null;

  const speakersList = [
    { ...SPEAKERS.david, motiveId: 1, motiveTitle: 'Motivo 1: Riesgos para la Salud Humana' },
    { ...SPEAKERS.laura, motiveId: 2, motiveTitle: 'Motivo 2: Dilemas Éticos con Embriones' },
    { ...SPEAKERS.fabian, motiveId: 3, motiveTitle: 'Motivo 3: Dignidad y Autonomía Personal' },
    { ...SPEAKERS.consejo, motiveId: 4, motiveTitle: 'Motivo 4: Responsabilidad Científica y Social' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${
        isDarkMode ? 'bg-slate-900 border-slate-750 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50'
        }`}>
          <div>
            <h3 className="text-lg font-black tracking-tight">
              Consejo Científico y Delegación Académica OICRV
            </h3>
            <p className="text-xs text-slate-400">
              Especialistas en genética, biomedicina, bioética y regulación de tecnologías reproductivas
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {speakersList.map((spk) => (
            <div
              key={spk.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isDarkMode
                  ? 'bg-slate-800/50 border-slate-700/70 hover:border-cyan-500/50'
                  : 'bg-slate-50 border-slate-200 hover:border-cyan-500/50 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${spk.avatarColor} flex items-center justify-center text-white font-extrabold text-lg shadow-md`}>
                    {spk.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold leading-tight">{spk.name}</h4>
                    <p className="text-xs font-semibold text-cyan-500">{spk.title}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs mb-4">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Especialidad:</span>
                      <span className="text-slate-200 dark:text-slate-200">{spk.specialty}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Cargo Institucional:</span>
                      <span className="text-slate-300 dark:text-slate-300">{spk.role}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <BookmarkCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-400 block text-[10px] uppercase">Materia a Sustentar:</span>
                      <span className="font-bold text-cyan-400">{spk.motiveTitle}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectMotive(spk.motiveId);
                  onClose();
                }}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-cyan-600/15 hover:bg-cyan-600/25 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Ir al Motivo {spk.motiveId}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`px-6 py-3 border-t text-xs text-slate-400 flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50'
        }`}>
          <span>Organización Internacional de Ciencia Responsable por la Vida</span>
          <button onClick={onClose} className="font-semibold text-cyan-500 hover:underline">
            Cerrar panel
          </button>
        </div>
      </div>
    </div>
  );
};
