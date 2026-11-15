import React, { useState } from 'react';
import { projectsData } from '../data/projectsData';
import { ProjectRow } from '../components/ProjectRow';
import { Sketchbook } from '../components/sketchbook/Sketchbook';
import { ImageLightbox } from '../components/sketchbook/ImageLightbox';

export const ProjectsPage: React.FC = () => {
  const [activeLightbox, setActiveLightbox] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  const projects2024 = projectsData.filter((p) => p.year === '2024');
  const projects2023 = projectsData.filter((p) => p.year === '2023');
  const topProjects = projectsData.slice(0, 3);

  return (
    <div className="pt-8 sm:pt-14 space-y-20 sm:space-y-28 max-w-site mx-auto">
      {/* Lightbox Zoom Modal */}
      {activeLightbox && (
        <ImageLightbox
          src={activeLightbox.src}
          alt={activeLightbox.alt}
          caption={activeLightbox.caption}
          onClose={() => setActiveLightbox(null)}
        />
      )}

      {/* Page Header */}
      <div className="max-w-2xl space-y-3">
        <span className="mono-label text-vermillion font-bold uppercase tracking-wider block">
          // ARCHIVE & WORKING JOURNAL
        </span>
        <h1 className="text-[36px] sm:text-[50px] font-semibold leading-tight text-ink">
          Selected Projects
        </h1>
        <p className="text-[18px] text-pencil leading-relaxed">
          Production applications, client platforms, and mobile software built with deliberate architectural choices and verified real-world deployments.
        </p>
      </div>

      {/* =========================================================================
          PRIMARY SHOWCASE: INTERACTIVE SKETCHBOOK JOURNAL
      ========================================================================= */}
      <section aria-label="Interactive Project Sketchbook" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rule pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-vermillion animate-pulse" />
            <h2 className="text-[20px] sm:text-[22px] font-semibold text-ink">
              Interactive Project Journal
            </h2>
          </div>
          <span className="font-mono text-xs text-pencil">
            5 Documented Spreads · Wire-O Bound · Click pages or use ← / → keys
          </span>
        </div>

        {/* The Digital Sketchbook */}
        <Sketchbook />
      </section>

      {/* =========================================================================
          EDITORIAL DETAIL SHOWCASE — 3 Core Highlighted Projects
      ========================================================================= */}
      <section className="border-t border-rule pt-16 sm:pt-20 space-y-16">
        <div className="max-w-xl">
          <span className="mono-label text-vermillion font-bold block mb-1">
            // DETAILED CASE ARCHIVE
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-semibold text-ink">
            Featured Production Works
          </h2>
          <p className="text-pencil text-sm mt-1">
            In-depth architectural review of core client platforms and mobile applications.
          </p>
        </div>

        <div className="space-y-16">
          {topProjects.map((project, idx) => (
            <article
              key={project.slug}
              className="border border-rule bg-paper p-6 sm:p-10 shadow-xs space-y-8"
            >
              {/* Header row: Number, Category, Title, Date */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-rule pb-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-base font-bold text-vermillion">
                    0{idx + 1}
                  </span>
                  <span className="text-rule select-none">/</span>
                  <h3 className="text-[24px] sm:text-[32px] font-bold text-ink">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-pencil">
                  <span className="px-2 py-0.5 bg-paper-deep border border-rule uppercase">
                    {project.category}
                  </span>
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Asymmetrical 2-Column Presentation */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left (5 cols): Description, Problem & Architectural Solution */}
                <div className="lg:col-span-5 space-y-6">
                  <p className="text-[17px] leading-relaxed text-ink font-serif italic">
                    "{project.oneLiner}"
                  </p>

                  {/* Problem Identified Sticky Note */}
                  <div className="p-4 bg-paper-deep border-l-2 border-vermillion space-y-1 text-sm text-ink">
                    <span className="font-mono text-[10px] uppercase font-bold text-pencil block">
                      Problem Addressed:
                    </span>
                    <p className="leading-relaxed">
                      {project.problem[0]}
                    </p>
                  </div>

                  {/* Architectural Solution Sticky Note */}
                  <div className="p-4 bg-paper-deep border-l-2 border-ink space-y-1 text-sm text-ink">
                    <span className="font-mono text-[10px] uppercase font-bold text-pencil block">
                      Architectural Decision:
                    </span>
                    <p className="leading-relaxed">
                      {project.decisions[0]?.decision}{' '}
                      <span className="text-pencil font-mono text-xs">
                        ({project.decisions[0]?.reason})
                      </span>
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-pencil block mb-2">
                      Technologies Applied:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-paper-deep border border-rule font-mono text-xs text-ink font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-solid text-xs py-2 px-4"
                      >
                        <span>View Live Project</span>
                        <span>↗</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-ink text-ink font-mono text-xs font-bold hover:bg-paper-deep transition-colors"
                      >
                        <span>Source Code</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right (7 cols): Large Mounted Real Screenshot with Lightbox Zoom */}
                <div className="lg:col-span-7">
                  <div
                    onClick={() =>
                      setActiveLightbox({
                        src: project.image,
                        alt: project.title,
                        caption: project.imageCaption,
                      })
                    }
                    className="relative group cursor-zoom-in bg-white p-3 shadow-md border border-rule hover:border-ink transition-colors"
                  >
                    {/* Corner Washi Tape Details */}
                    <div className="absolute -top-3 -left-3 w-16 h-5 bg-[#e8deca] border border-[#d2c5ae] opacity-90 rotate-[-25deg] shadow-xs pointer-events-none" />
                    <div className="absolute -top-3 -right-3 w-16 h-5 bg-[#e8deca] border border-[#d2c5ae] opacity-90 rotate-[25deg] shadow-xs pointer-events-none" />

                    <div className="aspect-[16/10] overflow-hidden bg-paper-deep border border-rule relative">
                      <img
                        src={project.image}
                        alt={`${project.title} live interface`}
                        className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-200"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="bg-ink text-paper font-mono text-xs px-3 py-1.5 shadow-md">
                          CLICK TO ZOOM FULLSCREEN 🔍
                        </span>
                      </div>
                    </div>

                    <p className="font-hand text-sm text-pencil mt-2 text-center">
                      {project.imageCaption}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CHRONOLOGICAL REPOSITORY ARCHIVE
      ========================================================================= */}
      <div className="space-y-12 border-t border-rule pt-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="mono-label text-vermillion font-bold block mb-1">
              // COMPLETE ARCHIVE
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-semibold text-ink">
              All Deployments & Repositories
            </h2>
          </div>
          <span className="font-mono text-xs text-pencil">
            5 Verified Production Deployments
          </span>
        </div>

        {/* 2024 Section */}
        <section>
          <div className="flex items-center gap-4 mb-4">
            <span className="mono-label text-ink font-bold">2024</span>
            <div className="h-px flex-1 bg-rule" />
          </div>
          <div className="divide-y divide-rule border-y border-rule">
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
            <span className="mono-label text-ink font-bold">2023</span>
            <div className="h-px flex-1 bg-rule" />
          </div>
          <div className="divide-y divide-rule border-y border-rule">
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
