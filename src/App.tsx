/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MainMotive, SubSlide, ThemeMode, Speaker } from './types';
import { INITIAL_MOTIVES, SPEAKERS } from './data/debateData';
import { ThreeCanvas } from './components/ThreeCanvas';
import { SlideViewer } from './components/SlideViewer';
import { OrganizationPanel } from './components/OrganizationPanel';
import { EvidenceLightbox } from './components/EvidenceLightbox';
import { CredentialLightbox } from './components/CredentialLightbox';
import { DebateHeader } from './components/DebateHeader';
import { ReferenceModal } from './components/ReferenceModal';
import { BottomControlDock } from './components/BottomControlDock';
import { Eye } from 'lucide-react';

export default function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('oicrv_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('oicrv_theme', themeMode);
  }, [themeMode]);

  const handleToggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Compiled authoritative database directly sourced from debateData.ts
  // This guarantees permanent persistence of all texts, arguments, and public media across all devices and shared links
  const motives: MainMotive[] = INITIAL_MOTIVES;
  const speakersData: Record<string, Speaker> = SPEAKERS;

  useEffect(() => {
    try {
      localStorage.removeItem('oicrv_motives_data');
      localStorage.removeItem('oicrv_speakers_data');
    } catch {}
  }, []);

  // selectedMotiveId: 0 = Central Organization Globe, 1 to 4 = Main Motives
  const [selectedMotiveId, setSelectedMotiveId] = useState<number>(0);
  const [selectedSubSlideIndex, setSelectedSubSlideIndex] = useState<number>(1);

  // Centered Window visibility (starts closed on initial entry until interaction)
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);

  // Modals state
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [selectedCredentialSpeaker, setSelectedCredentialSpeaker] = useState<Speaker | null>(null);
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState<boolean>(false);

  const currentMotive = motives.find((m) => m.id === selectedMotiveId) || motives[0];
  const currentSlide = currentMotive?.subSlides.find((s) => s.subIndex === selectedSubSlideIndex) || currentMotive?.subSlides[0];
  const currentSpeaker = speakersData[currentMotive?.speakerId] || speakersData.david;

  const handleSelectMotive = (id: number) => {
    setSelectedMotiveId(id);
    setSelectedSubSlideIndex(1);
    setIsWindowOpen(true);
  };

  const handleSelectSubSlide = (index: number) => {
    setSelectedSubSlideIndex(index);
    setIsWindowOpen(true);
  };

  // Close centered window when clicking on the 3D space backdrop
  const handleCanvasClickEmpty = () => {
    setIsWindowOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      themeMode === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Institutional Header */}
      <DebateHeader
        themeMode={themeMode}
        onToggleTheme={handleToggleTheme}
        onOpenReferences={() => setIsReferenceModalOpen(true)}
        onOpenSpeakerCredential={(speaker) => setSelectedCredentialSpeaker(speaker)}
        speakers={Object.values(speakersData)}
      />

      {/* Main 3D Viewport with 100% full height and width */}
      <main className="flex-1 relative w-full h-[calc(100vh-105px)] overflow-hidden bg-slate-950">
        {/* Full-bleed 3D Simulation with Central Organization Globe */}
        <div className="absolute inset-0 w-full h-full">
          <ThreeCanvas
            motives={motives}
            selectedMotiveId={selectedMotiveId}
            selectedSubSlideIndex={selectedSubSlideIndex}
            themeMode={themeMode}
            onSelectMotive={handleSelectMotive}
            onSelectSubSlide={handleSelectSubSlide}
            onCanvasClickEmpty={handleCanvasClickEmpty}
          />
        </div>

        {/* ========================================================================= */}
        {/* CENTERED 3/4 WINDOW (enlarged by ~7%): Centered with space on sides       */}
        {/* ========================================================================= */}
        {isWindowOpen && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[94vw] lg:w-[81vw] max-w-6xl z-20 pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
            {selectedMotiveId === 0 ? (
              /* GLOBO PRINCIPAL: ORGANIZACIÓN OICRV (Estructura y Marco Legal) */
              <OrganizationPanel
                isDarkMode={themeMode === 'dark'}
                onClose={() => setIsWindowOpen(false)}
                onSelectSpeakerCredential={(speaker) => setSelectedCredentialSpeaker(speaker)}
                onNavigateToMotive={handleSelectMotive}
                speakers={speakersData}
              />
            ) : (
              /* DIAPOSITIVA DE MOTIVO 1 A 4 EN MODO PRESENTACIÓN FINAL (SIN BOTONES DE EDICIÓN) */
              <SlideViewer
                currentMotive={currentMotive}
                currentSlide={currentSlide}
                currentSpeaker={currentSpeaker}
                isDarkMode={themeMode === 'dark'}
                onSelectSubSlide={handleSelectSubSlide}
                onOpenLightbox={() => setIsLightboxOpen(true)}
                onClosePanel={() => setIsWindowOpen(false)}
              />
            )}
          </div>
        )}

        {/* Re-open pill when Centered Window is minimized */}
        {!isWindowOpen && (
          <button
            onClick={() => setIsWindowOpen(true)}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <Eye className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>
              {selectedMotiveId === 0
                ? 'Abrir Ventana: Organización OICRV'
                : `Abrir Ventana: Motivo ${selectedMotiveId}.${selectedSubSlideIndex}`}
            </span>
          </button>
        )}

        {/* Unified Bottom Control Dock */}
        <BottomControlDock
          motives={motives}
          selectedMotiveId={selectedMotiveId}
          selectedSubSlideIndex={selectedSubSlideIndex}
          themeMode={themeMode}
          isSlideVisible={isWindowOpen}
          onSelectMotive={handleSelectMotive}
          onSelectSubSlide={handleSelectSubSlide}
          onToggleSlideVisibility={() => setIsWindowOpen(!isWindowOpen)}
        />
      </main>

      {/* Fullscreen Lightbox Modal for Scientific Evidence / Embedded Media */}
      <EvidenceLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        slide={currentSlide}
        motive={currentMotive}
        isDarkMode={themeMode === 'dark'}
      />

      {/* Member Credential Lightbox Modal with single Return button */}
      <CredentialLightbox
        speaker={selectedCredentialSpeaker}
        onClose={() => setSelectedCredentialSpeaker(null)}
        isDarkMode={themeMode === 'dark'}
      />

      {/* Modal: Verified Academic Bibliography from PDF */}
      <ReferenceModal
        isOpen={isReferenceModalOpen}
        onClose={() => setIsReferenceModalOpen(false)}
        isDarkMode={themeMode === 'dark'}
      />
    </div>
  );
}
