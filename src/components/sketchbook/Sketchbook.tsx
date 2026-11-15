import React, { useState, useEffect, useRef } from 'react';
import { projectsData } from '../../data/projectsData';
import { SketchbookCover } from './SketchbookCover';
import { ProjectDetails } from './ProjectDetails';
import { ProjectScreenshot } from './ProjectScreenshot';
import { PageNavigation } from './PageNavigation';
import { ProjectIndex } from './ProjectIndex';
import { ImageLightbox } from './ImageLightbox';

export const Sketchbook: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');
  const [activeLightbox, setActiveLightbox] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'book' | 'text'>('book');

  // Mobile sub-page toggle (details vs screenshot)
  const [mobilePage, setMobilePage] = useState<'details' | 'screenshot'>('details');

  const totalSpreads = projectsData.length;
  const activeProject = projectsData[currentSpread];

  // Load view preferences from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('sketchbook-view-mode') as 'book' | 'text' | null;
    if (savedMode) setViewMode(savedMode);
  }, []);

  const toggleViewMode = () => {
    const next = viewMode === 'book' ? 'text' : 'book';
    setViewMode(next);
    localStorage.setItem('sketchbook-view-mode', next);
  };

  const turnToSpread = (index: number) => {
    if (index === currentSpread || isTurning || index < 0 || index >= totalSpreads) return;
    setTurnDirection(index > currentSpread ? 'next' : 'prev');
    setIsTurning(true);
    setMobilePage('details');

    setTimeout(() => {
      setCurrentSpread(index);
      setIsTurning(false);
    }, 550);
  };

  const handleNext = () => {
    if (currentSpread < totalSpreads - 1) {
      turnToSpread(currentSpread + 1);
    }
  };

  const handlePrev = () => {
    if (currentSpread > 0) {
      turnToSpread(currentSpread - 1);
    } else {
      setIsOpen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightbox) return; // Lightbox manages its own keys
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Home') turnToSpread(0);
      if (e.key === 'End') turnToSpread(totalSpreads - 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSpread, isTurning, activeLightbox, isOpen]);

  // Touch swipe support
  const touchStart = useRef({ x: 0, y: 0 });
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) handleNext();
      else handlePrev();
    }
  };

  // Plain Text Mode for full accessibility
  if (viewMode === 'text') {
    return (
      <div className="py-8 max-w-4xl mx-auto space-y-12 bg-[#141412] p-6 border border-[#33312B] select-text">
        <div className="flex items-center justify-between border-b border-[#33312B] pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D7FF64]">
            Semantic Text Mode (Accessible)
          </span>
          <button
            onClick={toggleViewMode}
            className="font-mono text-xs text-[#FF6B35] underline uppercase cursor-pointer"
          >
            Switch to Visual Book View →
          </button>
        </div>

        {projectsData.map((project, idx) => (
          <article key={project.slug} className="space-y-4 border-b border-[#33312B] pb-8">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display font-bold text-2xl text-white">
                0{idx + 1}. {project.title}
              </h2>
              <span className="font-mono text-xs text-[#A8A296]">{project.year}</span>
            </div>
            <p className="font-mono text-xs text-[#FF6B35] uppercase">{project.category}</p>
            <p className="text-[16px] text-[#A8A296] leading-relaxed">{project.oneLiner}</p>
            <p className="text-sm text-white">
              <strong className="text-[#D7FF64]">Tech Stack:</strong> {project.stack.join(', ')}
            </p>
            <div className="flex gap-4 pt-2 font-mono text-xs font-bold">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] underline">
                  Live Site ↗
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white underline">
                  GitHub Code ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full py-6 select-none"
    >
      {/* Lightbox Zoom Modal */}
      {activeLightbox && (
        <ImageLightbox
          src={activeLightbox.src}
          alt={activeLightbox.alt}
          caption={activeLightbox.caption}
          onClose={() => setActiveLightbox(null)}
        />
      )}

      {/* Thumbnail Index Drawer */}
      <ProjectIndex
        projects={projectsData}
        currentSpread={currentSpread}
        isOpen={isIndexOpen}
        onSelect={(idx) => {
          setIsOpen(true);
          turnToSpread(idx);
        }}
        onClose={() => setIsIndexOpen(false)}
      />

      {/* Top Page Navigation Bar */}
      <div className="max-w-[880px] mx-auto">
        <PageNavigation
          currentSpread={currentSpread}
          totalSpreads={totalSpreads}
          onPrev={handlePrev}
          onNext={handleNext}
          onToggleCover={() => setIsOpen(false)}
          onToggleIndex={() => setIsIndexOpen(true)}
          onToggleTextMode={toggleViewMode}
          viewMode={viewMode}
        />
      </div>

      {/* =========================================================================
          MAIN SKETCHBOOK CONTAINER (Compact & Viewport-Friendly)
      ========================================================================= */}
      <div className="relative max-w-[880px] mx-auto mt-2" style={{ perspective: '2000px' }}>
        {/* VIEW 1: CLOSED NOTEBOOK COVER */}
        {!isOpen ? (
          <div className="max-w-[480px] mx-auto">
            <SketchbookCover onOpen={() => setIsOpen(true)} />
          </div>
        ) : (
          /* VIEW 2: OPEN NOTEBOOK SPREAD */
          <div className="relative">
            {/* Right-Edge Numbered Index Tabs (Desktop) */}
            <div className="absolute -right-9 top-6 z-30 hidden md:flex flex-col gap-1.5">
              {projectsData.map((proj, idx) => {
                const isActive = idx === currentSpread;
                return (
                  <button
                    key={proj.slug}
                    onClick={() => turnToSpread(idx)}
                    className={`w-9 py-2 text-center font-mono text-[11px] font-bold border-t border-r border-b transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#FF6B35] text-white border-[#FF6B35] translate-x-1.5 shadow-md'
                        : 'bg-[#1E1D19] text-[#A8A296] border-[#33312B] hover:text-white hover:bg-[#282621]'
                    }`}
                    title={`${proj.title} (Spread 0${idx + 1})`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Desktop Two-Page Spread Layout */}
            <div
              className={`relative w-full aspect-[1.46/1] bg-[#F5F0E6] border border-[#D5CDBC] shadow-2xl overflow-hidden hidden md:flex transition-transform duration-500 ${
                isTurning ? 'scale-[0.985] opacity-95' : 'scale-100 opacity-100'
              }`}
            >
              {/* Left 8% Click Edge to Prev */}
              <div
                onClick={handlePrev}
                title="Turn to previous spread"
                className="absolute left-0 top-0 bottom-0 w-[8%] z-20 cursor-w-resize hover:bg-black/[0.02] transition-colors"
              />

              {/* Right 8% Click Edge to Next */}
              <div
                onClick={handleNext}
                title="Turn to next spread"
                className="absolute right-0 top-0 bottom-0 w-[8%] z-20 cursor-e-resize hover:bg-black/[0.02] transition-colors"
              />

              {/* Left Page: Process & Details */}
              <div className="w-1/2 h-full">
                <ProjectDetails
                  project={activeProject}
                  onPreviewClick={(caption) =>
                    setActiveLightbox({
                      src: activeProject.image,
                      alt: activeProject.title,
                      caption,
                    })
                  }
                />
              </div>

              {/* Wire-O Spiral Binding Spine Center Gutter */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-7 z-30 pointer-events-none flex flex-col justify-between py-4 items-center shadow-lg">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-4.5 h-2 rounded-full border border-black/60 bg-gradient-to-r from-[#202020] via-[#8C8778] to-[#202020] shadow-xs transform -rotate-1"
                  />
                ))}
              </div>

              {/* Right Page: Result & Screenshot */}
              <div className="w-1/2 h-full">
                <ProjectScreenshot
                  project={activeProject}
                  onZoom={() =>
                    setActiveLightbox({
                      src: activeProject.image,
                      alt: activeProject.title,
                      caption: activeProject.imageCaption,
                    })
                  }
                />
              </div>
            </div>

            {/* Mobile / Tablet Responsive Stack View (<768px) */}
            <div className="md:hidden space-y-4">
              {/* Mobile Subpage Toggle: Details vs Screenshot */}
              <div className="flex border border-[#33312B] bg-[#1E1D19] p-1 font-mono text-xs font-bold">
                <button
                  onClick={() => setMobilePage('details')}
                  className={`flex-1 py-2 text-center transition-colors cursor-pointer ${
                    mobilePage === 'details' ? 'bg-[#FF6B35] text-white shadow-xs' : 'text-[#A8A296] hover:text-white'
                  }`}
                >
                  PROCESS & SPECS
                </button>
                <button
                  onClick={() => setMobilePage('screenshot')}
                  className={`flex-1 py-2 text-center transition-colors cursor-pointer ${
                    mobilePage === 'screenshot' ? 'bg-[#FF6B35] text-white shadow-xs' : 'text-[#A8A296] hover:text-white'
                  }`}
                >
                  PRODUCTION SHOT
                </button>
              </div>

              {/* Mobile Notebook Page Card */}
              <div className="bg-[#F5F0E6] border border-[#D5CDBC] rounded-sm shadow-xl min-h-[520px]">
                {mobilePage === 'details' ? (
                  <ProjectDetails
                    project={activeProject}
                    onPreviewClick={(caption) =>
                      setActiveLightbox({
                        src: activeProject.image,
                        alt: activeProject.title,
                        caption,
                      })
                    }
                  />
                ) : (
                  <ProjectScreenshot
                    project={activeProject}
                    onZoom={() =>
                      setActiveLightbox({
                        src: activeProject.image,
                        alt: activeProject.title,
                        caption: activeProject.imageCaption,
                      })
                    }
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sketchbook;

