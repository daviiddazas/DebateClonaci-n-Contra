import React from 'react';
import { Speaker, MainMotive } from '../types';
import { SPEAKERS } from '../data/debateData';
import {
  Shield,
  Award,
  BookOpen,
  Scale,
  FileText,
  Users,
  Lock,
  ArrowRight,
  X,
  GraduationCap
} from 'lucide-react';
import { formatMediaUrl } from '../utils/mediaUtils';

interface OrganizationPanelProps {
  isDarkMode: boolean;
  onClose: () => void;
  onSelectSpeakerCredential: (speaker: Speaker) => void;
  onNavigateToMotive: (motiveId: number) => void;
  speakers?: Record<string, Speaker>;
}

export const OrganizationPanel: React.FC<OrganizationPanelProps> = ({
  isDarkMode,
  onClose,
  onSelectSpeakerCredential,
  onNavigateToMotive,
  speakers,
}) => {
  const cardBg = isDarkMode
    ? 'bg-slate-900/95 border-slate-700 text-slate-100 shadow-2xl'
    : 'bg-white/95 border-slate-200 text-slate-900 shadow-2xl';

  const baseSpeakers = speakers || SPEAKERS;
  const speakersList = [
    { ...baseSpeakers.david, motiveId: 1, motiveLabel: 'Motivo 1: Riesgos para la Salud Humana' },
    { ...baseSpeakers.laura, motiveId: 2, motiveLabel: 'Motivo 2: Dilemas Éticos con Embriones' },
    { ...baseSpeakers.fabian, motiveId: 3, motiveLabel: 'Motivo 3: Dignidad y Autonomía Personal' },
    { ...baseSpeakers.consejo, motiveId: 4, motiveLabel: 'Motivo 4: Responsabilidad Científica y Social' },
  ];

  return (
    <div className={`w-full rounded-2xl border transition-colors ${cardBg} p-5 sm:p-7 flex flex-col gap-6 max-h-[88vh] overflow-y-auto`}>
      {/* Top Banner with Official Logo */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <img
            src="/assets/aistudio/logo_3abde976.png"
            alt="Logo Oficial OICRV"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-contain shadow-lg border border-cyan-500/40 bg-slate-950 p-1 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-xs tracking-widest text-cyan-700 dark:text-cyan-400">ORGANIZACIÓN MATRIZ</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-100 dark:bg-rose-500/15 text-rose-800 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30">
                Postura Oficial: En Contra
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight leading-snug text-slate-900 dark:text-white">
              Organización Internacional de Ciencia Responsable por la Vida
            </h2>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 italic">
              "Ciencia con Conciencia · Por la Dignidad y la Vida Humana"
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors shrink-0"
          title="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Institutional Mission Statement */}
      <div className={`p-4 rounded-xl border ${
        isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-100/90 border-slate-300'
      }`}>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
          Esta organización reúne a especialistas en genética, biomedicina, bioética y derechos humanos que asesoran a organismos internacionales sobre los riesgos biológicos, las implicaciones éticas y la regulación vinculante de las tecnologías reproductivas. Nuestra postura se fundamenta en el principio de no maleficencia, la salvaguarda de la dignidad humana y el rigor científico experimental.
        </p>
      </div>

      {/* SECTION 1: ESTRUCTURA DE PROFESIONALES */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Estructura de Profesionales y Delegaciones</span>
          </h3>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">Clic para ver credencial oficial</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {speakersList.map((spk) => (
            <div
              key={spk.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                isDarkMode
                  ? 'bg-slate-800/40 border-slate-700/80 hover:border-cyan-500/50'
                  : 'bg-white border-slate-300 hover:border-cyan-600 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  {spk.photoUrl ? (
                    <img
                      src={formatMediaUrl(spk.photoUrl)}
                      alt={spk.name}
                      className="w-12 h-12 rounded-xl object-cover shadow-md shrink-0 border border-cyan-500/40"
                    />
                  ) : (
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${spk.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0`}>
                      {spk.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base leading-tight text-slate-900 dark:text-white">{spk.name}</h4>
                    <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400">{spk.title}</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs mb-3">
                  <p className="text-slate-800 dark:text-slate-200 font-semibold line-clamp-1">
                    {spk.role}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium line-clamp-1">
                    {spk.specialty}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2.5 border-t border-slate-200 dark:border-slate-700/60">
                <button
                  onClick={() => onSelectSpeakerCredential(spk)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border ${
                    isDarkMode
                      ? 'bg-cyan-600/15 hover:bg-cyan-600/25 text-cyan-400 border-cyan-500/30'
                      : 'bg-cyan-50 hover:bg-cyan-100 text-cyan-900 border-cyan-300'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Ver Credencial</span>
                </button>
                <button
                  onClick={() => onNavigateToMotive(spk.motiveId)}
                  className="py-1.5 px-3 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 flex items-center gap-1 transition-colors"
                  title="Ir a sus diapositivas"
                >
                  <span>M{spk.motiveId}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: INFORMACIÓN LEGAL Y NORMATIVA VINCULANTE */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-2">
            <Scale className="w-4 h-4" />
            <span>Marco Jurídico y Normativo Vinculante</span>
          </h3>
          <span className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold">Tratados y Códigos Penales</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Ley 599 de 2000 */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-rose-500/10 border-rose-500/25 text-slate-200' : 'bg-rose-50/80 border-rose-300 text-slate-900 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-1.5 font-black text-rose-800 dark:text-rose-400">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Código Penal Colombia (Ley 599/2000)</span>
              </span>
              <span className="font-mono text-[11px] font-bold">Art. 133</span>
            </div>
            <p className="text-[11px] sm:text-xs leading-relaxed mb-2 text-slate-800 dark:text-slate-200 font-medium">
              <strong className="text-slate-900 dark:text-white">Delito de Repetibilidad del ser humano:</strong> Pena de prisión de <strong>32 a 108 meses</strong> para quien genere seres humanos idénticos mediante clonación u otro procedimiento.
            </p>
            <span className="text-[10px] text-rose-800 dark:text-rose-300 font-mono font-bold">Tipificación penal estricta</span>
          </div>

          {/* UNESCO 1997 */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-purple-500/10 border-purple-500/25 text-slate-200' : 'bg-purple-50/80 border-purple-300 text-slate-900 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-1.5 font-black text-purple-800 dark:text-purple-400">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>UNESCO (1997) Genoma y DD.HH.</span>
              </span>
              <span className="font-mono text-[11px] font-bold">Arts. 2, 3, 11</span>
            </div>
            <p className="text-[11px] sm:text-xs leading-relaxed mb-2 text-slate-800 dark:text-slate-200 font-medium">
              El Art. 11 califica la clonación reproductiva como <strong className="text-slate-900 dark:text-white">práctica contraria a la dignidad humana</strong>. Los Arts. 2 y 3 mandan no reducir al ser humano a sus características genéticas.
            </p>
            <span className="text-[10px] text-purple-800 dark:text-purple-300 font-mono font-bold">Consenso multilateral universal</span>
          </div>

          {/* ISSCR 2025 */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-amber-500/10 border-amber-500/25 text-slate-200' : 'bg-amber-50/80 border-amber-300 text-slate-900 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-1.5 font-black text-amber-800 dark:text-amber-400">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>ISSCR Guidelines 2025 (v1.2)</span>
              </span>
              <span className="font-mono text-[11px] font-bold">Categoría 3B</span>
            </div>
            <p className="text-[11px] sm:text-xs leading-relaxed mb-2 text-slate-800 dark:text-slate-200 font-medium">
              La máxima sociedad de investigación con células madre clasifica la implantación de embriones clonados en <strong className="text-slate-900 dark:text-white">Categoría 3B: Actividades Prohibidas</strong> sin excepción clínica.
            </p>
            <span className="text-[10px] text-amber-800 dark:text-amber-300 font-mono font-bold">Autorregulación científica global</span>
          </div>

          {/* OMS 2025 & Clone Inc */}
          <div className={`p-4 rounded-xl border ${
            isDarkMode ? 'bg-cyan-500/10 border-cyan-500/25 text-slate-200' : 'bg-cyan-50/80 border-cyan-300 text-slate-900 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-1.5 font-black text-cyan-800 dark:text-cyan-400">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>OMS (2025) & Clone Inc. (2006)</span>
              </span>
              <span className="font-mono text-[11px] font-bold">Equidad Sanitaria</span>
            </div>
            <p className="text-[11px] sm:text-xs leading-relaxed mb-2 text-slate-800 dark:text-slate-200 font-medium">
              1 de cada 6 adultos sufre infertilidad; la clonación comercial desataría monopolios corporativos, eugenesia selectiva y patentes privadas sobre el linaje humano.
            </p>
            <span className="text-[10px] text-cyan-800 dark:text-cyan-300 font-mono font-bold">Alerta bioética socioeconómica</span>
          </div>
        </div>
      </div>

      {/* Footer Navigation: Quick Jump to 4 Motives */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-700/50 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700 dark:text-slate-300">Explorar Sustentaciones Específicas:</span>
        <div className="flex items-center gap-2 flex-wrap">
          {[1, 2, 3, 4].map((mId) => (
            <button
              key={mId}
              onClick={() => onNavigateToMotive(mId)}
              className="px-3.5 py-1.5 rounded-xl font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              Motivo {mId}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
