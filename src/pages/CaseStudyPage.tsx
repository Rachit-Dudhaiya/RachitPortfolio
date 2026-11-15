import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { Figure } from '../components/Figure';
import { TextLink } from '../components/TextLink';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const currentIndex = projectsData.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    return <Navigate to="/projects" replace />;
  }

  const project = projectsData[currentIndex];
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  return (
    <article className="pt-8 sm:pt-14 space-y-14 max-w-3xl mx-auto px-4 sm:px-6">
      {/* Back Link */}
      <div>
        <Link to="/projects" className="mono-label text-bone-dim hover:text-orange transition-colors duration-micro">
          ← Back to all projects
        </Link>
      </div>

      {/* Header */}
      <div>
        <span className="mono-label text-orange font-semibold block mb-1">
          {project.category} // ARCHIVE {project.spreadNumber}
        </span>
        <h1 className="font-display font-bold text-[34px] sm:text-[46px] leading-tight text-bone">
          {project.title}
        </h1>
        <p className="mt-3 text-[18px] sm:text-[20px] text-bone-dim leading-snug">
          {project.oneLiner}
        </p>

        {/* 4-Column Meta Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 pb-6 border-b border-rule mt-8 text-[14px]">
          <div className="p-3 bg-char/50 border border-rule">
            <span className="mono-label block mb-1">Role</span>
            <span className="text-bone font-medium">{project.role}</span>
          </div>
          <div className="p-3 bg-char/50 border border-rule">
            <span className="mono-label block mb-1">Year</span>
            <span className="text-bone">{project.year}</span>
          </div>
          <div className="p-3 bg-char/50 border border-rule">
            <span className="mono-label block mb-1">Team</span>
            <span className="text-bone">{project.team}</span>
          </div>
          <div className="p-3 bg-char/50 border border-rule">
            <span className="mono-label block mb-1">Stack</span>
            <span className="text-bone text-xs font-mono">{project.stack.join(', ')}</span>
          </div>
        </div>

        {/* Live & GitHub Links */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex gap-4 pt-4 text-[13px] font-mono">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-orange text-xs py-2 px-4 h-10"
              >
                Visit Live Deployment ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-bone text-xs py-2 px-4 h-10"
              >
                Source Repository ↗
              </a>
            )}
          </div>
        )}
      </div>

      {/* Primary Screenshot Figure */}
      <Figure
        src={project.image}
        alt={`${project.title} interface screenshot`}
        caption={project.imageCaption}
      />

      {/* The Problem */}
      <section className="space-y-4">
        <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-bone">
          The Problem
        </h2>
        {project.problem.map((p, i) => (
          <p key={i} className="text-[16px] sm:text-[17px] leading-relaxed text-bone-dim">
            {p}
          </p>
        ))}
      </section>

      {/* What I Built (Decisions and Reasons) */}
      <section className="space-y-4">
        <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-bone">
          Architectural Decisions
        </h2>
        <ul className="space-y-3.5 pl-0 list-none">
          {project.decisions.map((d, i) => (
            <li key={i} className="text-[16px] leading-relaxed text-bone-dim border-l-2 border-orange pl-4">
              <strong className="font-semibold text-bone block mb-0.5">{d.decision}</strong>{' '}
              <span>{d.reason}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Outcome */}
      <section className="space-y-3 border-t border-rule pt-8">
        <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-bone">
          Production Outcome
        </h2>
        <p className="text-[16px] sm:text-[17px] leading-relaxed text-bone-dim">
          {project.outcome}
        </p>
      </section>

      {/* What I'd Do Differently */}
      <section className="space-y-4 border-t border-rule pt-8">
        <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-bone">
          Retrospective & Tradeoffs
        </h2>
        <ul className="space-y-3 pl-0 list-none">
          {project.retrospective.map((r, i) => (
            <li key={i} className="text-[15px] leading-relaxed text-bone-dim pl-4 border-l-2 border-rule">
              {r}
            </li>
          ))}
        </ul>
      </section>

      {/* Prev / Next Navigation */}
      <nav aria-label="Project Navigation" className="border-t border-rule pt-8 flex items-center justify-between text-[14px] font-mono">
        {prevProject ? (
          <Link to={`/projects/${prevProject.slug}`} className="text-bone hover:text-orange transition-colors">
            ← {prevProject.title}
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link to={`/projects/${nextProject.slug}`} className="text-bone hover:text-orange transition-colors">
            {nextProject.title} →
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
};

export default CaseStudyPage;
