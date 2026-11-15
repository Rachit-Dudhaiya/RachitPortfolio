import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectRowProps {
  project: Project;
  isLast?: boolean;
}

export const ProjectRow: React.FC<ProjectRowProps> = ({ project, isLast = false }) => {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group grid grid-cols-[56px_1fr_24px] sm:grid-cols-[72px_1fr_32px] gap-4 sm:gap-6 py-5 px-3 sm:px-4 -mx-3 sm:-mx-4 border-t border-rule transition-colors duration-micro hover:bg-char/50 text-inherit no-underline ${
        isLast ? 'border-b' : ''
      }`}
    >
      {/* Year */}
      <span className="mono-label pt-1 text-bone-dim select-none">
        {project.year}
      </span>

      {/* Title & One-Liner */}
      <div>
        <h3 className="font-display text-[17px] sm:text-[19px] font-semibold text-bone group-hover:text-orange transition-colors duration-micro">
          {project.title}
        </h3>
        <p className="mt-1 text-[14px] sm:text-[15px] text-bone-dim leading-relaxed max-w-2xl">
          {project.oneLiner}
        </p>
      </div>

      {/* Arrow */}
      <span className="text-bone-dim group-hover:text-orange font-sans text-lg self-center text-right transition-transform duration-micro group-hover:translate-x-1 select-none">
        →
      </span>
    </Link>
  );
};

export default ProjectRow;
