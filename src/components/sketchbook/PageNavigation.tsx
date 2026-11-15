import React from 'react';

interface PageNavigationProps {
  currentSpread: number;
  totalSpreads: number;
  onPrev: () => void;
  onNext: () => void;
  onToggleCover: () => void;
  onToggleIndex: () => void;
  onToggleTextMode: () => void;
  viewMode: 'book' | 'text';
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  currentSpread,
  totalSpreads,
  onPrev,
  onNext,
  onToggleCover,
  onToggleIndex,
  onToggleTextMode,
  viewMode,
}) => {
  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-4 py-4 px-2 text-xs font-mono select-none">
      {/* Left: Cover & Index Toggles */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleCover}
          className="text-[#A8A296] hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
        >
          [View Cover]
        </button>
        <span className="text-[#33312B]">·</span>
        <button
          onClick={onToggleIndex}
          className="text-[#A8A296] hover:text-[#FF6B35] underline underline-offset-4 transition-colors cursor-pointer"
        >
          [Thumbnail Index]
        </button>
        <span className="text-[#33312B]">·</span>
        <button
          onClick={onToggleTextMode}
          className="text-[#A8A296] hover:text-[#D7FF64] underline underline-offset-4 transition-colors cursor-pointer"
        >
          [{viewMode === 'book' ? 'Text Mode' : 'Book Mode'}]
        </button>
      </div>

      {/* Center: Flip Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={onPrev}
          disabled={currentSpread === 0}
          className="px-3.5 py-2 border border-[#33312B] hover:border-white disabled:opacity-30 disabled:pointer-events-none text-white font-bold transition-colors cursor-pointer"
        >
          ← PREV PAGE
        </button>

        <span className="text-white font-bold tabular-nums">
          0{currentSpread + 1} / 0{totalSpreads}
        </span>

        <button
          onClick={onNext}
          disabled={currentSpread === totalSpreads - 1}
          className="px-3.5 py-2 border border-[#33312B] hover:border-white disabled:opacity-30 disabled:pointer-events-none text-white font-bold transition-colors cursor-pointer"
        >
          NEXT PAGE →
        </button>
      </div>

      {/* Right: Keyboard Shortcut Cue */}
      <div className="hidden lg:block text-[#6E6B61]">
        Use <kbd className="px-1.5 py-0.5 bg-[#1E1D19] border border-[#33312B] text-white">←</kbd> and{' '}
        <kbd className="px-1.5 py-0.5 bg-[#1E1D19] border border-[#33312B] text-white">→</kbd> to turn pages
      </div>
    </div>
  );
};

export default PageNavigation;

