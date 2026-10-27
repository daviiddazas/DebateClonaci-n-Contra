import React from 'react';
import { EvidenceChartData } from '../types';
import { AlertTriangle, ShieldAlert, Award, FileText, Scale, TrendingDown, Dna, Activity, Lock, Users, Sparkles } from 'lucide-react';

interface EvidenceGraphicsProps {
  type: string;
  data: EvidenceChartData;
  isDarkMode: boolean;
  isCompact?: boolean;
}

export const EvidenceGraphics: React.FC<EvidenceGraphicsProps> = ({
  type,
  data,
  isDarkMode,
  isCompact = false,
}) => {
  const bgCard = isDarkMode ? 'bg-slate-900/80 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm';
  const textPrimary = isDarkMode ? 'text-slate-100' : 'text-slate-900';
  const textSecondary = isDarkMode ? 'text-slate-400' : 'text-slate-600';

  // 1.1 Dolly 1996 Efficiency
  if (type === 'dolly_efficiency') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
              <TrendingDown className="w-3.5 h-3.5" /> 99.64% Letalidad / Fracaso
            </span>
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">NHGRI / Wilmut (1996)</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-4`}>{data.subtitle}</p>

          <div className="space-y-3 my-3">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-rose-600 dark:text-rose-400">Embriones fallidos, reabsorbidos o letales</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">276 (99.64%)</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-4 rounded-full overflow-hidden flex">
                <div className="bg-rose-500 h-full" style={{ width: '99.64%' }} />
                <div className="bg-cyan-500 h-full animate-pulse" style={{ width: '0.36%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Único nacimiento vivo: Oveja Dolly</span>
                <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">1 (0.36%)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className={`${textPrimary} font-medium`}>Eficiencia global de clonación:</span>
                  <span className="font-bold text-sky-500 font-mono text-sm ml-auto">0.36%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-rose-500">Conclusión técnica:</span> En humanos, una tasa de fallo del 99.6% implicaría exponer a cientos de mujeres a pérdidas gestacionales y malformaciones inaceptables.
        </div>
      </div>
    );
  }

  // 1.2 Liao et al. 2024 Primate Study
  if (type === 'liao_primate_study') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30">
              <Activity className="w-3.5 h-3.5" /> Nature Communications 2024
            </span>
            <span className="text-xs font-mono text-amber-500">Macacos Rhesus SCNT</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-4`}>{data.subtitle}</p>

          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Protocolo Inicial SCNT</span>
              <p className="text-xl font-black text-rose-500 font-mono mt-0.5">484 <span className="text-xs font-normal">embriones</span></p>
              <p className="text-[11px] text-rose-600/90 dark:text-rose-300/90 mt-1">96 macacas receptoras. Solo 1 cría viva que murió en &lt;23 horas.</p>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Reemplazo Trofoblasto</span>
              <p className="text-xl font-black text-emerald-500 font-mono mt-0.5">0.88% <span className="text-xs font-normal">éxito</span></p>
              <p className="text-[11px] text-emerald-600/90 dark:text-emerald-300/90 mt-1">113 embriones activados: 1 solo nacimiento viable sobreviviente.</p>
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-emerald-500">Liao et al. (2024):</span> Incluso con el protocolo puntero más sofisticado de sustitución de placenta, se requirieron 113 embriones de primate para lograr un solo superviviente.
        </div>
      </div>
    );
  }

  // 1.3 Maternal Fetal Risk
  if (type === 'maternal_fetal_risk') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-3.5 h-3.5" /> National Research Council (2002)
            </span>
            <span className="text-xs font-mono text-slate-400">Riesgos Clínicos</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="space-y-2">
            {data.dataPoints.map((pt, idx) => (
              <div key={idx} className={`p-2 rounded-lg border text-xs flex items-center justify-between ${pt.highlighted ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 font-medium' : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${pt.highlighted ? 'bg-rose-500' : 'bg-slate-400'}`} />
                  <span className={`font-semibold ${textPrimary}`}>{pt.label}</span>
                </div>
                <span className={`text-[11px] text-right ${pt.highlighted ? 'text-rose-600 dark:text-rose-400 font-bold' : textSecondary}`}>{pt.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-rose-500">NRC (2002) & Olsson (2022):</span> Las alteraciones trofoblásticas y del genoma inducen graves riesgos de toxemia e hipertensión maligna en las gestantes receptoras.
        </div>
      </div>
    );
  }

  // 2.1 Blastocyst Destruction (Tachibana 2013)
  if (type === 'blastocyst_destruction') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <Dna className="w-3.5 h-3.5" /> Tachibana et al. (Cell, 2013)
            </span>
            <span className="text-xs font-mono text-slate-400">SCNT Humano</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="grid grid-cols-4 gap-1.5 my-3">
            {['Ovocito Enucleado', 'Inyección Somática', 'Blastocisto 5-6d', 'Lisis y Destrucción'].map((step, idx) => (
              <div key={idx} className={`p-2 rounded-lg text-center border ${idx === 3 ? 'bg-rose-500/15 border-rose-500/40 text-rose-500' : 'bg-slate-100 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'}`}>
                <span className="text-[10px] font-mono block opacity-75">Fase 0{idx + 1}</span>
                <span className="text-[11px] font-bold leading-tight block mt-0.5">{step}</span>
              </div>
            ))}
          </div>
          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs">
            <p className="text-rose-600 dark:text-rose-400 font-semibold mb-0.5">Destrucción obligada del embrión:</p>
            <p className={textSecondary}>Para aislar las células madre hESC de la masa celular interna (ICM), el blastocisto humano en desarrollo debe ser sacrificado e incinerado.</p>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-emerald-500">Implicación ética:</span> ¿Es lícito concebir embriones humanos con el propósito predeterminado de aniquilarlos para extraer material genético?
        </div>
      </div>
    );
  }

  // 2.2 Moral Status Debate (Aznar 2013)
  if (type === 'moral_status_debate') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <Scale className="w-3.5 h-3.5" /> Bioética: Justo Aznar (2013)
            </span>
            <span className="text-xs font-mono text-slate-400">Estatuto Moral</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="grid grid-cols-2 gap-3 my-3">
            <div className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
              <span className="text-xs font-bold text-slate-500 block mb-1">Enfoque Utilitarista</span>
              <p className={`text-xs ${textSecondary}`}>El embrión se considera un conglomerado celular biológico sin estatus moral, disponible para ser manipulado según el interés científico.</p>
            </div>
            <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Postura OICRV / Aznar</span>
              <p className={`text-xs ${textPrimary} font-medium`}>El embrión es una vida humana individual en génesis. No puede reducirse a herramienta o insumo transitorio desechable.</p>
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-emerald-500">Aznar (2013, El País):</span> El fin biomédico encomiable no convalida moralmente medios que impliquen la muerte planificada de vidas humanas iniciales.
        </div>
      </div>
    );
  }

  // 2.3 Yamanaka iPSC Nobel
  if (type === 'yamanaka_ipsc') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              <Award className="w-3.5 h-3.5" /> Premio Nobel de Medicina 2012
            </span>
            <span className="text-xs font-mono text-emerald-500 font-bold">iPSC Shinya Yamanaka</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Los 4 Factores de Yamanaka:</span>
              <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-300">Oct3/4 · Sox2 · Klf4 · c-Myc</span>
            </div>
            <p className={`text-xs ${textPrimary}`}>
              Permite convertir células adultas de la piel en células pluripotentes (iPS) idénticas en plasticidad a las embrionarias, <strong className="text-emerald-500">sin destruir ningún embrión humano</strong> ni necesitar donantes de óvulos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-rose-500/10 border border-rose-500/20 text-rose-500 font-medium">
              SCNT Embrionaria: Destruye embriones
            </div>
            <div className="p-2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold">
              iPSC: 100% Ética y Segura
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-cyan-500">Vía científica superior:</span> Con las iPSC premiadas por el Nobel, la clonación terapéutica embrionaria ha quedado obsoleta técnica y éticamente.
        </div>
      </div>
    );
  }

  // 3.1 Epigenetic Diversity (Cc Gata Clonada)
  if (type === 'epigenetic_diversity') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Caso Histórico: Gata "Cc" (Copy Cat)
            </span>
            <span className="text-xs font-mono text-slate-400">NHGRI Epigenética</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div className="p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
              <span className="text-xs font-bold text-slate-500 block">Genoma Nuclear Donante</span>
              <p className="text-sm font-black text-amber-500 font-mono mt-0.5">100% Idéntico</p>
              <p className={`text-[11px] ${textSecondary} mt-1`}>La información del ADN codificante era exactamente la misma que la gata original (Rainbow).</p>
            </div>
            <div className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">Fenotipo y Conducta</span>
              <p className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono mt-0.5">Totalmente Distinta</p>
              <p className={`text-[11px] ${textPrimary} mt-1`}>Pelaje disímil por inactivación del cromosoma X, temperamento y desarrollo corporal independientes.</p>
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-amber-500">Principio biológico:</span> Somos mucho más que nuestros genes. La ilusión de "clonar a un ser querido" para recuperar su presencia es una falacia biológica y psicológica.
        </div>
      </div>
    );
  }

  // 3.2 Autonomy Violation
  if (type === 'autonomy_violation') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-3.5 h-3.5" /> Bioética y Psicoanálisis
            </span>
            <span className="text-xs font-mono text-slate-400">Derecho a Futuro Abierto</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="space-y-2 mb-3">
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400 block mb-0.5">Carga del Modelo Preconcebido:</span>
              <p className={textSecondary}>El clon vive bajo la sombra de un doble que ya existió, juzgado continuamente contra las habilidades, virtudes o destinos de su progenitor genético.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
              <span className={`font-bold ${textPrimary} block mb-0.5`}>Cosificación Procreativa:</span>
              <p className={textSecondary}>Se viola el imperativo kantiano: tratar al ser humano como un fin en sí mismo y jamás como un sustituto o remedio emocional de terceros.</p>
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-rose-500">Violación ontológica:</span> Nadie debe nacer condenado a ser la sombra o la fotocopia existencial de otra persona.
        </div>
      </div>
    );
  }

  // 3.3 UNESCO Charter
  if (type === 'unesco_charter') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              <FileText className="w-3.5 h-3.5" /> UNESCO (1997)
            </span>
            <span className="text-xs font-mono text-slate-400">Declaración Universal</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="space-y-2 mb-3 text-xs">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="font-bold text-amber-600 dark:text-amber-400">Artículo 2:</span>
              <p className={`${textPrimary} mt-0.5`}>Cada individuo tiene derecho al respeto incondicional de su dignidad; no es admisible reducirlo a sus características genéticas.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className={`font-bold ${textPrimary}`}>Artículo 3:</span>
              <p className={`${textSecondary} mt-0.5`}>El genoma de cada ser humano se manifiesta de forma irrepetible bajo condiciones naturales y sociales.</p>
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-amber-500">UNESCO 1997:</span> La singularidad del ser humano es el pilar de los derechos fundamentales reconocidos en el concierto internacional.
        </div>
      </div>
    );
  }

  // 4.1 Legal Sanction (Colombia Ley 599 Art 133)
  if (type === 'legal_sanction') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
              <Lock className="w-3.5 h-3.5" /> Código Penal de Colombia
            </span>
            <span className="text-xs font-mono text-rose-500 font-bold">Ley 599 de 2000, Art. 133</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 mb-3 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-rose-600 dark:text-rose-400">Delito: "Repetibilidad del ser humano"</span>
              <span className="font-mono font-bold text-rose-500">Prisión: 32 - 108 meses</span>
            </div>
            <p className={textPrimary}>
              El legislador penal castiga a quien "genere seres humanos idénticos mediante clonación u otro procedimiento", considerando la clonación como un atentado contra la integridad y dignidad social.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs">
            <span className="font-bold text-purple-600 dark:text-purple-400">UNESCO Art. 11 & 13:</span>
            <p className={`${textSecondary} mt-0.5`}>Condena universal que califica a la clonación humana de "práctica contraria a la dignidad humana" con responsabilidades punitivas directas para los científicos.</p>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-purple-500">Imperativo penal:</span> No hay vacío legal. Quien intente clonar seres humanos en Colombia y la mayor parte del mundo comete un delito tipificado con pena de prisión.
        </div>
      </div>
    );
  }

  // 4.2 ISSCR Classification 2025
  if (type === 'isscr_classification') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-3.5 h-3.5" /> ISSCR Guidelines 2025 (v1.2)
            </span>
            <span className="text-xs font-mono text-rose-500 font-bold">Categoría 3B</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="space-y-1.5 mb-3 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="font-mono text-slate-400">Cat. 1 & 2</span>
              <span className={textSecondary}>Cultivos in vitro y células madre pluripotentes</span>
              <span className="text-emerald-500 font-bold">Permitido</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-amber-500/10 border border-amber-500/20">
              <span className="font-mono text-amber-500 font-bold">Cat. 3A</span>
              <span className={textSecondary}>Modelos complejos no permisibles sin revisión</span>
              <span className="text-amber-500 font-bold">Restringido</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-rose-500/20 border border-rose-500/40 text-rose-500 font-bold">
              <span className="font-mono">Cat. 3B</span>
              <span className="text-rose-600 dark:text-rose-300">Implantación / gestación de embriones clonados</span>
              <span className="px-2 py-0.5 rounded bg-rose-500 text-white text-[10px] uppercase">PROHIBIDO</span>
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-rose-500">Consenso de la comunidad científica:</span> La propia sociedad rectora internacional de células madre prohíbe categóricamente la implantación de clones.
        </div>
      </div>
    );
  }

  // 4.3 WHO & Market Inequality (Clone Inc.)
  // 4.3 WHO & Market Inequality (Clone Inc.)
  if (type === 'who_market_inequality') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
              <Users className="w-3.5 h-3.5" /> OMS 2025 & Clone Inc.
            </span>
            <span className="text-xs font-mono text-slate-400">Inequidad Sanitaria</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="grid grid-cols-2 gap-2.5 mb-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase">OMS (2025)</span>
              <p className="text-lg font-black text-purple-500 font-mono mt-0.5">1 de cada 6</p>
              <p className={`${textSecondary} text-[11px]`}>Adultos sufre infertilidad. Un ciclo de FIV ya cuesta hasta 2 veces el ingreso familiar anual promedio.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-[10px] font-bold text-rose-400 uppercase">Clone Inc. (2006)</span>
              <p className="text-lg font-black text-rose-500 font-mono mt-0.5">Mercantilización</p>
              <p className={`${textPrimary} text-[11px]`}>Riesgo de privatizar líneas genéticas mediante patentes, creando una aristocracia biológica excluyente.</p>
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-purple-500">Justicia distributiva:</span> Desviar fondos a la clonación intensificaría desigualdades abismales y crearía un mercado corporativo de humanos a la carta.
        </div>
      </div>
    );
  }

  // 1.4 Injustificación Clínica del Traslado a Humanos
  if (type === 'clinical_unjustified') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
              <AlertTriangle className="w-3.5 h-3.5" /> Dictamen OICRV (2026)
            </span>
            <span className="text-xs font-mono text-cyan-500">Bioética Clínica</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="space-y-2 mb-3 text-xs">
            <div className="p-2.5 rounded-lg border border-rose-500/30 bg-rose-500/10">
              <span className="font-bold text-rose-600 dark:text-rose-400 block mb-0.5">Mortalidad y Riesgo Fetal Inaceptable:</span>
              <p className={textSecondary}>Más del 99% de los embriones animales clonados perecen o presentan anomalías epigenéticas incompatibles con la vida sana.</p>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
              <span className={`font-bold ${textPrimary} block mb-0.5`}>Principio de No Maleficencia:</span>
              <p className={textSecondary}>Inexistencia absoluta de indicación terapéutica que justifique exponer a mujeres gestantes y futuros niños a fallos multiorgánicos.</p>
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-rose-500">Dictamen clínico:</span> El traslado de la clonación reproductiva a la especie humana carece por completo de justificación médica y científica.
        </div>
      </div>
    );
  }

  // 2.4 Evaluación de Medios y Fines (Laura Villanueva)
  if (type === 'means_ends_ethics') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <Scale className="w-3.5 h-3.5" /> Bioética de la Investigación
            </span>
            <span className="text-xs font-mono text-emerald-500">Medios vs Fines</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="grid grid-cols-2 gap-2.5 mb-3 text-xs">
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-[10px] font-bold text-rose-500 uppercase">Medios Inadmisibles</span>
              <p className={`text-[11px] ${textPrimary} mt-1`}>Crear embriones humanos in vitro con el propósito deliberado de sacrificarlos para extracción de hESC.</p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-500 uppercase">Medios Éticos Válidos</span>
              <p className={`text-[11px] ${textPrimary} mt-1`}>Reprogramación somática directa (células iPS) y cultivos de organoides sin involucrar vidas embrionarias.</p>
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-emerald-500">Imperativo deontológico:</span> Los beneficios potenciales jamás convalidan métodos que degraden la vida incipiente a material descartable.
        </div>
      </div>
    );
  }

  // 3.4 Prohibición de Cosificación por Deseos Ajenos (Fabián Galvis)
  if (type === 'non_commodification_identity') {
    return (
      <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              <Users className="w-3.5 h-3.5" /> Autonomía Ontológica
            </span>
            <span className="text-xs font-mono text-amber-500">No Cosificación</span>
          </div>

          <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
          <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 mb-3 text-xs">
            <p className={`${textPrimary} font-medium leading-relaxed`}>
              "Resulta bioéticamente ilegítimo concebir a una persona como un objeto destinado a cumplir los deseos, nostalgias o metas frustradas de terceros."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-400 block text-[10px] uppercase">Alteridad Real:</span>
              <span className={textSecondary}>Sujeto de derechos irrepetible con libre desarrollo.</span>
            </div>
            <div className="p-2 rounded bg-rose-500/10 border border-rose-500/25">
              <span className="font-bold text-rose-500 block text-[10px] uppercase">Riesgo Clonación:</span>
              <span className="text-rose-600 dark:text-rose-300">Cosificación como réplica o sustituto filial.</span>
            </div>
          </div>
        </div>

        <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
          <span className="font-semibold text-amber-500">Filosofía de los DD.HH.:</span> La dignidad exige que cada nuevo ser humano nazca para sí mismo, no como instrumento de otros.
        </div>
      </div>
    );
  }

  // 4.4 Primacía de los DD.HH. sobre la Técnica (Consejo OICRV)
  return (
    <div className={`p-4 rounded-xl border ${bgCard} flex flex-col justify-between h-full`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
            <ShieldAlert className="w-3.5 h-3.5" /> Estado de Derecho
          </span>
          <span className="text-xs font-mono text-purple-400">Límites al Poder Técnico</span>
        </div>

        <h4 className={`text-base font-bold ${textPrimary} mb-1`}>{data.title}</h4>
        <p className={`text-xs ${textSecondary} mb-3`}>{data.subtitle}</p>

        <div className="space-y-2 mb-3 text-xs">
          <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <span className="font-bold text-purple-600 dark:text-purple-400 block mb-0.5">El 'Poder Hacer' no es 'Deber Hacer':</span>
            <p className={textSecondary}>La posibilidad biotecnológica de clonar no otorga licencia moral ni jurídica para ejecutarla sobre la especie humana.</p>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className={`font-bold ${textPrimary} block mb-0.5`}>Gobernanza Científica Multilateral:</span>
            <p className={textSecondary}>Evaluación independiente internacional que anteponga los tratados de derechos humanos a intereses corporativos o individuales.</p>
          </div>
        </div>
      </div>

      <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'} text-[11px]`}>
        <span className="font-semibold text-purple-500">Conclusión OICRV:</span> La ciencia alcanza su más alto valor cuando se autoimpone límites éticos para proteger la vida humana.
      </div>
    </div>
  );
};
