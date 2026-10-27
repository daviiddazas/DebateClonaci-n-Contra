import React, { useState } from 'react';
import { MainMotive, ThemeMode } from '../types';
import {
  ChevronUp,
  ChevronDown,
  Shield,
  Eye,
  Sliders,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface BottomControlDockProps {
  motives: MainMotive[];
  selectedMotiveId: number; // 0 = Central Organization, 1-4 = Main Motives
  selectedSubSlideIndex: number;
  themeMode: ThemeMode;
  isSlideVisible: boolean;
  onSelectMotive: (id: number) => void;
  onSelectSubSlide: (index: number) => void;
  onToggleSlideVisibility: () => void;
}

export const BottomControlDock: React.FC<BottomControlDockProps> = ({
  motives,
  selectedMotiveId,
  selectedSubSlideIndex,
  themeMode,
  isSlideVisible,
  onSelectMotive,
  onSelectSubSlide,
  onToggleSlideVisibility,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const isDark = themeMode === 'dark';

  const currentMotive = motives.find((m) => m.id === selectedMotiveId);

  return (
    <div
      className={`fixed z-30 transition-transform duration-300 ease-out left-1/2 -translate-x-1/2 w-[94vw] max-w-[960px] pointer-events-auto ${
        isCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
      }`}
      style={{ bottom: '16px' }}
    >
      {/* Collapse / Expand Toggle Tab */}
      <div className="flex justify-center mb-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center gap-1.5 px-4 py-1 rounded-t-xl text-xs font-bold border-t border-x shadow-md backdrop-blur-md transition-colors ${
            isDark
              ? 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:bg-slate-850'
              : 'bg-white/95 text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-cyan-500" />
              <span>Mostrar Controles del Debate</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-cyan-500" />
              <span>Ocultar Barra (Modo Libre 3D)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Dock Container */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-colors ${
          isDark
            ? 'bg-slate-900/95 border-slate-750 text-slate-100 shadow-slate-950/70'
            : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-400/40'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Motive & Central Organization Selector Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {/* GLOBO PRINCIPAL: ORGANIZACIÓN OICRV */}
            <button
              onClick={() => onSelectMotive(0)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                selectedMotiveId === 0
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md border-cyan-400 ring-2 ring-cyan-500/30'
                  : isDark
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-cyan-300" />
              <span>Globo Central OICRV</span>
            </button>

            {/* Motivos 1 a 4 */}
            {motives.map((mot) => {
              const isSelected = mot.id === selectedMotiveId;
              return (
                <button
                  key={mot.id}
                  onClick={() => onSelectMotive(mot.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                    isSelected
                      ? 'text-white shadow-md'
                      : isDark
                      ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                  style={{
                    backgroundColor: isSelected ? mot.themeColor : undefined,
                    borderColor: isSelected ? mot.accentColor : undefined,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: isSelected ? '#ffffff' : mot.themeColor }}
                  />
                  <span>M{mot.number}:</span>
                  <span className="hidden sm:inline font-semibold">{mot.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-node Selector & Window Visibility Toggle */}
          <div className="flex items-center justify-between w-full md:w-auto gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-800">
            {selectedMotiveId > 0 && currentMotive ? (
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
                <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 px-1.5 hidden sm:inline">
                  Sub-nodo:
                </span>
                {[1, 2, 3, 4].map((subNum) => {
                  const isActive = selectedSubSlideIndex === subNum;
                  return (
                    <button
                      key={subNum}
                      onClick={() => onSelectSubSlide(subNum)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all ${
                        isActive
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {currentMotive.id}.{subNum}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2 py-1">
                Estructura & Marco Legal OICRV
              </div>
            )}

            {/* Toggle Centered Window Button */}
            <button
              onClick={onToggleSlideVisibility}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors shrink-0 ${
                isSlideVisible
                  ? 'bg-cyan-100 dark:bg-cyan-600/15 text-cyan-900 dark:text-cyan-400 border-cyan-400 dark:border-cyan-500/30 hover:bg-cyan-200 dark:hover:bg-cyan-600/25'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 shadow-xs'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" />
              <span>{isSlideVisible ? 'Ocultar Ventana' : 'Ver Ventana'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
