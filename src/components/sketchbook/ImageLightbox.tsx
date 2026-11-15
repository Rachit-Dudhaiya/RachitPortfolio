import React, { useState, useEffect, useRef } from 'react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  src,
  alt,
  caption,
  onClose,
}) => {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const zoomIn = () => setScale((s) => Math.min(3.0, +(s + 0.35).toFixed(2)));
  const zoomOut = () => {
    setScale((s) => {
      const next = Math.max(1.0, +(s - 0.35).toFixed(2));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const resetZoom = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  // Mouse drag pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image zoom preview"
      className="fixed inset-0 z-100 bg-[#0B0B0A]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 select-none"
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between text-white/90 z-10">
        <div className="font-mono text-xs sm:text-sm">
          <span>{alt}</span>
          <span className="text-[#FF6B35] ml-2 font-bold">{Math.round(scale * 100)}%</span>
        </div>

        {/* Zoom Action Buttons */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={zoomOut}
            disabled={scale <= 1}
            className="w-8 h-8 flex items-center justify-center border border-white/30 hover:border-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Zoom Out (-)"
          >
            -
          </button>
          <button
            onClick={resetZoom}
            className="px-2.5 h-8 flex items-center justify-center border border-white/30 hover:border-white transition-colors"
            title="Reset to 1:1"
          >
            1:1
          </button>
          <button
            onClick={zoomIn}
            disabled={scale >= 3}
            className="w-8 h-8 flex items-center justify-center border border-white/30 hover:border-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Zoom In (+)"
          >
            +
          </button>
          <button
            onClick={onClose}
            className="ml-4 px-4 h-8 flex items-center justify-center bg-[#FF6B35] hover:bg-[#ff7e4d] text-white font-bold transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            CLOSE ✕
          </button>
        </div>
      </div>

      {/* Main Image Viewport with Pan & Zoom */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex-1 flex items-center justify-center overflow-hidden my-4 ${
          scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
        }`}
      >
        <img
          src={src}
          alt={alt}
          onClick={() => {
            if (scale === 1) zoomIn();
          }}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            maxHeight: '82vh',
            maxWidth: '90vw',
          }}
          className="object-contain shadow-2xl border border-white/10 rounded-sm"
          draggable={false}
        />
      </div>

      {/* Bottom Caption */}
      <div className="text-center font-mono text-xs text-[#A8A296] z-10">
        <p>{caption || 'Click to zoom · Drag to pan · Scroll wheel to adjust · Press Esc to exit'}</p>
      </div>
    </div>
  );
};

export default ImageLightbox;

