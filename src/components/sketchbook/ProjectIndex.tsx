import React from 'react';
import { ProjectSpreadData } from '../../data/projectsData';

interface ProjectIndexProps {
  projects: ProjectSpreadData[];
  currentSpread: number;
  isOpen: boolean;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export const ProjectIndex: React.FC<ProjectIndexProps> = ({
  projects,
  currentSpread,
  isOpen,
  onSelect,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Project thumbnail index"
      className="fixed inset-0 z-80 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-[#1A1916] border border-[#33312B] p-6 sm:p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#33312B] pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B35]">
              Quick Navigation
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Project Index
            </h3>
          </div>

          <button
            onClick={onClose}
            className="font-mono text-xs text-[#A8A296] hover:text-white border border-[#33312B] px-3 py-1.5 transition-colors cursor-pointer"
          >
            CLOSE ✕
          </button>
        </div>

        {/* Thumbnail Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project, idx) => {
            const isCurrent = idx === currentSpread;
            return (
              <button
                key={project.slug}
                onClick={() => {
                  onSelect(idx);
                  onClose();
                }}
                className={`text-left p-3 border transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'border-[#FF6B35] bg-[#24221D] shadow-md scale-[1.02]'
                    : 'border-[#33312B] bg-[#141412] hover:border-[#6E6B61] hover:bg-[#1E1D19]'
                }`}
              >
                <div className="aspect-[16/10] bg-black/40 overflow-hidden border border-[#33312B] mb-2.5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-baseline justify-between text-xs font-mono text-[#A8A296] mb-1">
                  <span className="text-[#FF6B35] font-bold">0{idx + 1}</span>
                  <span>{project.year}</span>
                </div>
                <p className="font-display font-bold text-sm text-white truncate">
                  {project.title}
                </p>
                <p className="font-mono text-[11px] text-[#A8A296] truncate">
                  {project.category}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectIndex;

