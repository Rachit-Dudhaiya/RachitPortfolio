import React from 'react';
import { projectsData } from '../data/projectsData';
import { ProjectRow } from '../components/ProjectRow';
import { Sketchbook } from '../components/sketchbook/Sketchbook';

export const ProjectsPage: React.FC = () => {
  const projects2024 = projectsData.filter((p) => p.year === '2024');
  const projects2023 = projectsData.filter((p) => p.year === '2023');

  return (
    <div className="pt-6 sm:pt-10 space-y-16 max-w-site mx-auto px-4 sm:px-8">
      {/* Page Header */}
      <div className="max-w-2xl">
        <span className="mono-label text-orange font-semibold tracking-wider uppercase block mb-1">
          Working Journal & Archive
        </span>
        <h1 className="font-display font-bold text-[36px] sm:text-[48px] leading-tight text-bone">
          Projects
        </h1>
        <p className="mt-3 text-[17px] text-bone-dim leading-relaxed">
          Interactive sketchbook spreads documenting production web platforms, client-side e-commerce applications, and cross-platform mobile tools.
        </p>
      </div>

      {/* Primary Sketchbook Experience */}
      <section aria-label="Interactive Project Sketchbook" className="pt-2">
        <div className="flex items-center justify-between mb-3 border-b border-rule pb-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange animate-pulse" />
            <h2 className="font-display text-[18px] sm:text-[20px] font-bold text-bone">
              Interactive Project Sketchbook
            </h2>
          </div>
          <span className="text-xs font-mono text-bone-dim hidden sm:inline-block">
            5 Spreads · Click tabs or use ← / → keys
          </span>
        </div>

        {/* The Digital Sketchbook */}
        <Sketchbook />
      </section>

      {/* Chronological Archive */}
      <div className="space-y-12 border-t border-rule pt-14">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display font-bold text-[24px] sm:text-[28px] text-bone">
            Project Index & Repositories
          </h2>
          <span className="mono-label text-bone-dim">
            5 Verified Production Deployments
          </span>
        </div>

        {/* 2024 Section */}
        <section>
          <div className="flex items-center gap-4 mb-4">
            <span className="mono-label text-bone font-semibold">2024</span>
            <div className="h-px flex-1 bg-rule" />
          </div>
          <div>
            {projects2024.map((project, idx) => (
              <ProjectRow
                key={project.slug}
                project={project}
                isLast={idx === projects2024.length - 1}
              />
            ))}
          </div>
        </section>

        {/* 2023 Section */}
        <section>
          <div className="flex items-center gap-4 mb-4">
            <span className="mono-label text-bone font-semibold">2023</span>
            <div className="h-px flex-1 bg-rule" />
          </div>
          <div>
            {projects2023.map((project, idx) => (
              <ProjectRow
                key={project.slug}
                project={project}
                isLast={idx === projects2023.length - 1}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectsPage;
