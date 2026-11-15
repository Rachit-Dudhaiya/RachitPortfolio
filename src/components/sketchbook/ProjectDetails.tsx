import React from 'react';
import { ProjectSpreadData } from '../../data/projectsData';
import { HandwrittenAnnotation } from './HandwrittenAnnotation';

interface ProjectDetailsProps {
  project: ProjectSpreadData;
  onPreviewClick: (caption: string) => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  onPreviewClick,
}) => {
  return (
    <div className="relative w-full h-full p-4 sm:p-6 md:p-7 flex flex-col justify-between bg-[#F5F0E6] text-[#202020] border-r border-[#D5CDBC] overflow-hidden select-none">
      {/* Top Header: Stamped Date & Project Number */}
      <div>
        <div className="flex items-center justify-between mb-2 border-b border-[#D5CDBC] pb-1.5">
          <span className="inline-block border-2 border-[#C8452D] text-[#C8452D] font-mono text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rotate-[-3deg] shadow-xs">
            {project.stampedDate}
          </span>
          <span className="font-mono text-[11px] font-bold text-[#6E6B61]">
            {project.spreadNumber}
          </span>
        </div>

        {/* Category & Title */}
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF6B35] font-bold block mb-0.5">
          {project.category}
        </span>
        <h2 className="font-display font-bold text-lg sm:text-xl md:text-[22px] leading-tight text-[#1B1A16]">
          {project.title}
        </h2>

        {/* Handwritten Description in Caveat font */}
        <p className="mt-1 font-hand text-base sm:text-lg text-[#3A3832] leading-snug line-clamp-2">
          "{project.oneLiner}"
        </p>
      </div>

      {/* Middle: Problem & Solution Notes + Process Sketches */}
      <div className="space-y-2.5 my-auto py-1.5">
        {/* Sticky Note: The Problem */}
        <div className="p-2.5 bg-[#FFFDE8] border border-[#E8E1A0] shadow-xs transform rotate-[-1deg] space-y-0.5">
          <span className="font-mono text-[9px] uppercase font-bold text-[#8C7A00] tracking-wider block">
            // Problem Identified:
          </span>
          <p className="font-sans text-[12px] leading-relaxed text-[#2C2B24] line-clamp-2">
            {project.problem[0]}
          </p>
        </div>

        {/* Solution & Architectural Decision Note */}
        <div className="p-2.5 bg-[#F0F4FF] border border-[#CCD7FE] shadow-xs transform rotate-[1deg] space-y-0.5">
          <span className="font-mono text-[9px] uppercase font-bold text-[#315BFF] tracking-wider block">
            // Architectural Solution:
          </span>
          <p className="font-sans text-[12px] leading-relaxed text-[#1F2744] line-clamp-2">
            {project.decisions[0]?.decision} <span className="text-[#5B6B9E]">({project.decisions[0]?.reason})</span>
          </p>
        </div>

        {/* Marginalia Annotations with Hand-drawn SVG Arrows */}
        <div className="pt-0.5 flex flex-wrap items-center gap-2">
          {project.processNotes.slice(0, 2).map((note, i) => (
            <HandwrittenAnnotation
              key={i}
              text={note.text}
              arrowDirection={note.arrowDirection}
              color={i === 0 ? 'orange' : 'pencil'}
            />
          ))}
        </div>
      </div>

      {/* Bottom: Technology Tags & Translucent Marker Highlight */}
      <div className="space-y-2 pt-2 border-t border-[#D5CDBC]">
        {/* Adhesive Technology Stickers */}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#6E6B61] block mb-1">
            Stack & Tools:
          </span>
          <div className="flex flex-wrap gap-1">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 bg-[#E8E1D2] border border-[#C5BBA7] text-[#1B1A16] font-mono text-[10px] font-medium shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Highlight Phrase */}
        <p className="font-sans text-[11px] text-[#202020] pt-0.5">
          <span className="bg-[#FFE58F] px-1 py-0.5 rounded-xs font-medium">
            {project.highlightPhrase}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProjectDetails;

