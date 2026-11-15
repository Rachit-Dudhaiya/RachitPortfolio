import React, { useEffect, useState } from 'react';

interface SketchbookZoomModalProps {
  src: string;
  alt: string;
  caption?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SketchbookZoomModal: React.FC<SketchbookZoomModalProps> = ({
  src,
  alt,
  caption,
  isOpen,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image zoom preview"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/75 p-4 sm:p-8 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col max-w-[90vw] max-h-[88vh] bg-paper border border-rule shadow-2xl p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="flex items-center justify-between border-b border-rule pb-3 mb-3 text-[13px]">
          <span className="mono-label text-ink font-medium">Zoom: {(zoom * 100).toFixed(0)}%</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
              disabled={zoom <= 1}
              className="px-2 py-0.5 border border-rule bg-paper-raised text-ink text-xs disabled:opacity-40"
            >
              −
            </button>
            <button
              onClick={() => setZoom(1)}
              className="px-2 py-0.5 border border-rule bg-paper-raised text-ink text-xs"
            >
              1:1
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(3, z + 0.5))}
              disabled={zoom >= 3}
              className="px-2 py-0.5 border border-rule bg-paper-raised text-ink text-xs disabled:opacity-40"
            >
              +
            </button>
            <div className="h-3 w-px bg-rule mx-1" />
            <button
              onClick={onClose}
              className="px-2 py-0.5 border border-rule bg-paper-raised text-ink hover:text-vermillion text-xs font-mono"
            >
              Esc [×]
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 overflow-auto flex items-center justify-center max-h-[70vh]">
          <img
            src={src}
            alt={alt}
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
            className="max-h-[66vh] max-w-full object-contain transition-transform duration-120"
          />
        </div>

        {/* Caption */}
        {caption && (
          <p className="mt-3 pt-2 border-t border-rule text-xs text-pencil font-sans">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
};

