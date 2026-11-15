import React from 'react';

interface SketchbookCoverProps {
  onOpen: () => void;
}

export const SketchbookCover: React.FC<SketchbookCoverProps> = ({ onOpen }) => {
  return (
    <div className="relative w-full aspect-[1.36/1] bg-[#1E1D19] border-2 border-[#33312B] shadow-2xl rounded-r-lg overflow-hidden flex select-none transform transition-all duration-500">
      {/* Left Spiral Binding Spine Gutter */}
      <div className="w-10 sm:w-12 h-full bg-[#151411] border-r-2 border-[#2A2823] flex flex-col justify-between py-4 sm:py-5 items-center z-20 shadow-inner">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="w-6 sm:w-8 h-2.5 rounded-full border border-black/80 bg-gradient-to-r from-[#4A473E] via-[#8C8778] to-[#2E2C26] shadow-md transform -rotate-3"
          />
        ))}
      </div>

      {/* Main Cover Canvas */}
      <div className="flex-1 h-full p-6 sm:p-9 flex flex-col justify-between relative overflow-hidden bg-[radial-gradient(#2A2822_1px,transparent_1px)] bg-[size:16px_16px]">
        {/* Hand-drawn sketchy border overlay */}
        <div className="absolute inset-3 sm:inset-4 border-2 border-dashed border-[#575347] pointer-events-none opacity-80" />

        {/* Top Header & Sticker */}
        <div className="flex items-start justify-between z-10">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#D7FF64] block mb-0.5">
              PHYSICAL ARTIFACT // 2024–2026
            </span>
            <p className="font-mono text-[10px] text-[#8C8778]">
              RAJ_IN // 22.3039° N, 70.8022° E
            </p>
          </div>

          {/* "PERSONAL ARCHIVE" Sticker */}
          <div className="transform rotate-[-5deg] bg-[#FF6B35] text-white px-3 py-1 font-mono text-[10px] sm:text-xs uppercase font-extrabold tracking-widest shadow-md border-2 border-dashed border-white/60">
            PERSONAL ARCHIVE
          </div>
        </div>

        {/* Center: Title & Tech Doodles */}
        <div className="my-auto z-10 space-y-3">
          <div className="space-y-1">
            <h1 className="font-display font-black text-[22px] sm:text-[34px] md:text-[38px] leading-[0.98] tracking-tight text-[#F5F0E6] uppercase">
              RACHIT'S PROJECT JOURNAL
            </h1>
            <p className="font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#FF6B35] font-bold">
              VOL. 01 — DIGITAL EXPERIMENTS
            </p>
          </div>

          {/* Doodles: Terminal Brackets, Circuit Paths, Chip */}
          <div className="flex items-center gap-4 py-1 text-[#8C8778] opacity-75">
            <svg width="48" height="22" viewBox="0 0 60 28" fill="none" className="stroke-current">
              <path d="M 4 8 L 14 14 L 4 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="20" y1="20" x2="32" y2="20" strokeWidth="2" strokeLinecap="round" />
              <circle cx="48" cy="14" r="5" strokeWidth="1.5" />
            </svg>
            <span className="font-mono text-[10.5px] text-[#A8A296] hidden sm:inline-block">
              &lt;code&gt; · react · flutter · systems &lt;/code&gt;
            </span>
          </div>

          {/* Handwritten Note in Caveat */}
          <div className="pt-1">
            <p className="font-hand text-xl sm:text-2xl text-[#E8E1D2] -rotate-2">
              "Ideas become real things."
            </p>
          </div>
        </div>

        {/* Bottom CTA: Open Notebook */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#3A3831] z-10">
          <p className="font-mono text-[10px] text-[#8C8778]">
            5 DOCUMENTED SPREADS · FULL PROTOTYPES
          </p>

          <button
            onClick={onOpen}
            className="group inline-flex items-center gap-2.5 bg-[#FF6B35] hover:bg-[#ff7e4d] text-white font-mono text-xs font-bold tracking-widest uppercase px-5 py-2.5 shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <span>OPEN NOTEBOOK</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SketchbookCover;

