import React from 'react';
import { X, BookOpen, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

interface ReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ReferenceModal: React.FC<ReferenceModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
}) => {
  if (!isOpen) return null;

  const references = [
    {
      authors: 'Liao, Z., Zhang, J., Sun, S., Li, Y., Xu, Y., Li, C., Cao, J., Nie, Y., Niu, Z., Liu, J., Lu, F., Liu, Z., & Sun, Q.',
      year: '2024',
      title: 'Reprogramming mechanism dissection and trophoblast replacement application in monkey somatic cell nuclear transfer',
      journal: 'Nature Communications, 15, artículo 5',
      doi: 'https://doi.org/10.1038/s41467-023-43985-7',
      relevance: 'Evidencia clave en macacos rhesus: 484 embriones iniciales produjeron una cría que murió en <23h; tras sustitución trofoblástica se logró 1 nacido vivo de 113 embriones (0.88% de éxito).',
    },
    {
      authors: 'Tachibana, M., Amato, P., Sparman, M., Marti Gutierrez, N., Tippner-Hedges, R., Ma, H., Kang, E., Fulati, A., Lee, H.-S., Sritanaudomchai, H., Masterson, K., Larson, J., Eaton, D., Sadler-Fredd, K., Battaglia, D., Lee, D., Wu, D., Jensen, J., Patton, P., ... & Mitalipov, S.',
      year: '2013',
      title: 'Human embryonic stem cells derived by somatic cell nuclear transfer',
      journal: 'Cell, 153(6), 1228–1238',
      doi: 'https://doi.org/10.1016/j.cell.2013.05.006',
      relevance: 'Demostración de que la obtención de hESC por SCNT implica el desarrollo y destrucción deliberada de blastocistos humanos.',
    },
    {
      authors: 'Aznar, J.',
      year: '2013, 24 de mayo',
      title: 'Clonación, ciencia y ética',
      journal: 'El País',
      doi: 'https://elpais.com/ccaa/2013/05/24/valencia/1369395630_699132.html',
      relevance: 'Análisis bioético sobre la instrumentalización del embrión humano como medio utilitario de laboratorio.',
    },
    {
      authors: 'Congreso de Colombia',
      year: '2000, 24 de julio',
      title: 'Ley 599 de 2000, por la cual se expide el Código Penal (Artículo 133: Repetibilidad del ser humano)',
      journal: 'Diario Oficial / Función Pública',
      doi: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=6388',
      relevance: 'Tipificación penal expresa: prisión de 32 a 108 meses a quien genere seres humanos idénticos mediante clonación.',
    },
    {
      authors: 'International Society for Stem Cell Research (ISSCR)',
      year: '2025',
      title: 'Guidelines for stem cell research and clinical translation (versión 1.2)',
      journal: 'ISSCR Official Guidelines',
      doi: 'https://www.isscr.org/resources/guidelines-for-stem-cell-research',
      relevance: 'Clasificación de la implantación de embriones humanos procedentes de reprogramación nuclear en la Categoría 3B (Actividades Prohibidas).',
    },
    {
      authors: 'Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura (UNESCO)',
      year: '1997',
      title: 'Declaración Universal sobre el Genoma Humano y los Derechos Humanos (Artículos 2, 3, 11 y 13)',
      journal: 'UNESCO Legal Affairs',
      doi: 'https://www.unesco.org/es/legal-affairs/universal-declaration-human-genome-and-human-rights',
      relevance: 'Proclamación de la dignidad humana irreductible a los genes y condena expresa de la clonación reproductiva (Art. 11).',
    },
    {
      authors: 'Nobel Assembly at Karolinska Institutet',
      year: '2012',
      title: 'The 2012 Nobel Prize in Physiology or Medicine: Advanced information (Shinya Yamanaka & John Gurdon)',
      journal: 'Nobel Prize Official Information',
      doi: 'https://www.nobelprize.org/prizes/medicine/2012/advanced-information/',
      relevance: 'Solución bioética: Reprogramación de células adultas en células madre pluripotentes inducidas (iPSC) sin destruir embriones.',
    },
    {
      authors: 'National Research Council (NRC)',
      year: '2002',
      title: 'Scientific and medical aspects of human reproductive cloning',
      journal: 'National Academies Press',
      doi: 'https://doi.org/10.17226/10285',
      relevance: 'Dictamen de la Academia Nacional de Ciencias de EE.UU. sobre riesgos placentarios, fetales y letales para la mujer gestante.',
    },
    {
      authors: 'Instituto Nacional de Investigación del Genoma Humano (NHGRI)',
      year: 's. f.',
      title: 'Clonación: Conceptos y variabilidad fenotípica (Caso oveja Dolly y gata Cc)',
      journal: 'National Institutes of Health (NIH)',
      doi: 'https://www.genome.gov/es/about-genomics/fact-sheets/Clonaci%C3%B3n',
      relevance: 'Datos de la baja eficiencia de Dolly (0.36%) y demostración de disparidad fenotípica por inactivación del cromosoma X en la gata Cc.',
    },
    {
      authors: 'Olsson, P. O., Jeong, Y. W., et al.',
      year: '2022',
      title: 'Insights from one thousand cloned dogs',
      journal: 'Scientific Reports, 12, artículo 11209',
      doi: 'https://doi.org/10.1038/s41598-022-15097-7',
      relevance: 'Estudio de más de 1000 caninos clonados: eficiencia ~2% y variaciones fenotípicas sustanciales entre clones y donantes.',
    },
    {
      authors: 'Organización Mundial de la Salud (OMS)',
      year: '2025, 28 de noviembre',
      title: 'Infertility Fact Sheet: Prevalencia mundial y barreras económicas de acceso',
      journal: 'WHO Newsroom',
      doi: 'https://www.who.int/news-room/fact-sheets/detail/infertility',
      relevance: 'Datos de 1 de cada 6 personas infértiles y disparidad extrema de costos (FIV hasta el doble del ingreso familiar anual).',
    },
    {
      authors: 'Parent, K., & Vandelac, L. (Directores)',
      year: '2006',
      title: 'Clone Inc. [Documental]',
      journal: 'National Film Board of Canada',
      doi: 'https://www.nfb.ca',
      relevance: 'Crítica a la mercantilización de la biotecnología reproductiva, patentes de material biológico y riesgos de eugenesia comercial.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${
        isDarkMode ? 'bg-slate-900 border-slate-750 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header with Official Logo */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/logo_3abde976.png"
              alt="OICRV"
              className="w-10 h-10 rounded-xl object-contain bg-slate-950 p-1 border border-cyan-500/30 shadow-md shrink-0"
            />
            <div>
              <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                Corpus Bibliográfico y Evidencia Científica Oficial
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Documentación indexada en Nature, Cell, Scientific Reports, UNESCO, OMS y Código Penal Colombiano
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/25 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-900 dark:text-cyan-400">
              <FileText className="w-4 h-4" />
              <span>Citas Bibliográficas Revisadas por Pares y Documentación Legal</span>
            </div>
            <span className="text-xs font-mono text-cyan-800 dark:text-cyan-400 font-black">12 Fuentes Indexadas</span>
          </div>

          <div className="space-y-3">
            {references.map((ref, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border text-xs transition-all ${
                  isDarkMode
                    ? 'bg-slate-800/40 border-slate-700/70 hover:border-slate-600'
                    : 'bg-white border-slate-300 hover:border-slate-400 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="font-mono text-[11px] font-black text-cyan-800 dark:text-cyan-400">
                    [{idx + 1}] {ref.authors} ({ref.year})
                  </div>
                  <a
                    href={ref.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 inline-flex items-center gap-1 shrink-0 font-bold"
                  >
                    <span>Fuente</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h5 className="font-black text-sm leading-snug mb-1 text-slate-950 dark:text-slate-100">
                  {ref.title}
                </h5>
                <p className="font-serif italic text-slate-700 dark:text-slate-400 mb-2 font-medium">
                  {ref.journal}
                </p>

                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-300 dark:border-emerald-500/20 text-slate-800 dark:text-slate-200">
                  <span className="font-black text-emerald-800 dark:text-emerald-400">Aporte argumental: </span>
                  <span className="font-medium">{ref.relevance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-3 border-t text-xs text-slate-700 dark:text-slate-400 flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
        }`}>
          <span className="font-medium">12 fuentes científicas y jurídicas revisadas por pares</span>
          <button onClick={onClose} className="font-bold text-cyan-700 dark:text-cyan-400 hover:underline">
            Cerrar referencias
          </button>
        </div>
      </div>
    </div>
  );
};
