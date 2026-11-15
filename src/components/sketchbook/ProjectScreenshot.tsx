import React from 'react';
import { ProjectSpreadData } from '../../data/projectsData';
import { HandwrittenAnnotation } from './HandwrittenAnnotation';

interface ProjectScreenshotProps {
  project: ProjectSpreadData;
  onZoom: () => void;
}

export const ProjectScreenshot: React.FC<ProjectScreenshotProps> = ({
  project,
  onZoom,
}) => {
  return (
    <div className="relative w-full h-full p-4 sm:p-6 md:p-7 flex flex-col justify-between bg-[#F5F0E6] text-[#202020] overflow-hidden select-none">
      {/* Top Meta Indicator */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#6E6B61] border-b border-[#D5CDBC] pb-1.5">
        <span className="uppercase tracking-wider">Mounted Live Screenshot</span>
        <span>Click image to zoom 🔍</span>
      </div>

      {/* Center: Mounted Photograph / Screenshot with Masking Tape */}
      <div className="my-auto py-1">
        <div
          onClick={onZoom}
          className="relative group cursor-zoom-in bg-white p-2 sm:p-2.5 shadow-md border border-[#D5CDBC] transform hover:scale-[1.01] transition-transform duration-200"
        >
          {/* Top-Left Masking Tape Strip */}
          <div className="absolute -top-2.5 -left-2.5 w-12 h-4 bg-[#E8DECA] border border-[#D2C5AE] opacity-90 rotate-[-25deg] shadow-xs z-10 pointer-events-none" />

          {/* Top-Right Masking Tape Strip */}
          <div className="absolute -top-2.5 -right-2.5 w-12 h-4 bg-[#E8DECA] border border-[#D2C5AE] opacity-90 rotate-[25deg] shadow-xs z-10 pointer-events-none" />

          {/* Screenshot Container */}
          <div className="aspect-[16/10] bg-[#161512] overflow-hidden border border-[#D5CDBC] relative">
            <img
              src={project.image}
              alt={`${project.title} live interface`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            {/* Hover Magnifying Glass Badge */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="bg-[#1B1A16]/90 text-white font-mono text-[10px] sm:text-xs px-2.5 py-1 rounded-xs shadow-md">
                CLICK TO ZOOM ↗
              </span>
            </div>
          </div>

          {/* Pencil Caption Below Screenshot */}
          <p className="font-hand text-xs sm:text-sm text-[#5A574E] mt-1.5 text-center leading-tight line-clamp-1">
            {project.imageCaption}
          </p>
        </div>

        {/* Marginalia Annotation */}
        <div className="pt-2 flex justify-end">
          <HandwrittenAnnotation
            text="verified live deploy"
            arrowDirection="left"
            color="orange"
          />
        </div>
      </div>

      {/* Bottom Action Bar: Live Project & Source Code Links */}
      <div className="pt-2 border-t border-[#D5CDBC] flex flex-wrap items-center justify-between gap-2">
        {/* Role & Team Note */}
        <div className="font-mono text-[10px] text-[#6E6B61]">
          <span>{project.role}</span>
          <span className="mx-1">·</span>
          <span>{project.year}</span>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-[#FF6B35] hover:bg-[#ff7e4d] text-white px-2.5 py-1.5 uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>VIEW LIVE</span>
              <span>↗</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-[#1B1A16] hover:bg-[#1B1A16] hover:text-[#F5F0E6] text-[#1B1A16] px-2.5 py-1.5 uppercase tracking-wider transition-colors"
            >
              <span>CODE</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectScreenshot;

