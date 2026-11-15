import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsData, contactDetails } from '../data/projectsData';
import { PaperStillLife } from '../components/PaperStillLife';
import { TextLink } from '../components/TextLink';

export const HomePage: React.FC = () => {
  // Roles for dynamic typing animation
  const roles = [
    'Creative Developer',
    'Full-Stack Developer',
    'Flutter Mobile Engineer',
    'Software Developer',
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        setTypingSpeed(75 + Math.random() * 40);
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(45);
      }, 2200);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        setTypingSpeed(35);
      }, typingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setTypingSpeed(100);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  const scrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('featured-projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredProjects = projectsData.slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32 py-6 sm:py-10">
      {/* =========================================================================
          HERO SECTION — Typographic Presence + Dynamic Role + Paper Still-Life
      ========================================================================= */}
      <section className="min-h-[72vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (7 cols): Hero Typography & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Typographic Headline */}
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-pencil block">
                Rajkot, Gujarat · 22.3039° N, 70.8022° E
              </span>
              <h1 className="text-[44px] sm:text-[62px] md:text-[70px] font-semibold leading-[0.98] tracking-tight text-ink">
                RACHIT<span className="text-vermillion">.</span>
              </h1>
              
              {/* Dynamic Role Typing Reveal */}
              <div className="flex items-center text-[22px] sm:text-[28px] md:text-[32px] font-medium text-pencil">
                <span className="text-ink font-semibold">{displayedText}</span>
                <span className="inline-block w-[3px] h-7 bg-vermillion ml-1.5 animate-pulse" />
              </div>
            </div>

            {/* Introduction Statement */}
            <p className="font-serif italic text-[19px] sm:text-[22px] text-pencil leading-relaxed max-w-xl">
              Building dependable web platforms, responsive client applications, and cross-platform mobile software with clean architecture and meticulous attention to craft.
            </p>

            {/* CTAs: Primary, Secondary, Resume Download */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#featured-projects"
                onClick={scrollToWork}
                className="btn-solid text-sm"
              >
                Explore My Work ↓
              </a>

              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 px-5 min-h-[44px] border border-ink bg-transparent text-ink font-medium text-sm hover:bg-paper-deep transition-colors"
              >
                <span>Let's Connect</span>
                <span>→</span>
              </Link>

              <a
                href="/assets/Rachit_Dudhaiya_Resume.pdf"
                download="Rachit_Dudhaiya_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-pencil hover:text-ink underline underline-offset-4 transition-colors px-2 py-2"
                title="Download verified resume PDF"
              >
                <span>Download Resume (PDF)</span>
                <span>↗</span>
              </a>
            </div>

            {/* Location & Status Line */}
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-pencil border-t border-rule">
              <span>B.Tech IT Student (2022–2026)</span>
              <span>·</span>
              <span>R.K. University</span>
              <span>·</span>
              <span>3+ Years Hands-On Development</span>
            </div>
          </div>

          {/* Right Column (5 cols): 3D Tactile Paper Still-Life Scene */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PaperStillLife />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: SHORT INTRODUCTION ABOUT RACHIT (Below the Hero)
      ========================================================================= */}
      <section className="border-t border-rule pt-16 sm:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Framed Portrait Photo */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="relative group max-w-[260px] w-full">
              {/* Paper Washi Tape Strip */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#e8deca] opacity-85 rotate-[-2deg] border border-[#d2c5ae] shadow-xs z-10 pointer-events-none" />
              
              <div className="aspect-[3/4] border-2 border-paper-deep bg-paper p-2.5 shadow-md">
                <div className="w-full h-full overflow-hidden border border-rule bg-paper-deep">
                  <img
                    src="/assets/rachit-profile.jpg"
                    alt="Rachit Dudhaiya in black suit"
                    className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="mt-2 text-center">
                <p className="font-sans font-medium text-xs text-ink">
                  Rachit Dudhaiya
                </p>
                <p className="font-mono text-[10.5px] text-pencil">
                  Rajkot, Gujarat · India
                </p>
              </div>
            </div>
          </div>

          {/* Personal Bio Narrative */}
          <div className="md:col-span-8 space-y-4 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="mono-label text-vermillion font-bold">// 01. INTRODUCTION</span>
            </div>
            
            <h2 className="text-[26px] sm:text-[32px] font-medium leading-tight text-ink">
              Building ideas into reliable software products.
            </h2>

            <p className="text-[17px] leading-relaxed text-ink">
              I am an Information & Technology engineering student at R.K. University with over 3 years of hands-on experience designing and programming production software.
            </p>

            <p className="text-[17px] leading-relaxed text-ink">
              Whether architecting high-converting real estate portals with sub-second filtering, engineering mobile apps for classroom attendance in Flutter, or building client-side e-commerce stores, I focus on performance, maintainable codebases, and seamless user experiences.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link to="/about" className="text-link text-[15px] font-medium">
                Read full journey, education & tech stack →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SELECTED PROJECTS PREVIEW (Featuring Top 3 Projects)
      ========================================================================= */}
      <section id="featured-projects" className="border-t border-rule pt-16 sm:pt-20 scroll-mt-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="mono-label text-vermillion font-bold block mb-1">
              // 02. SELECTED WORK
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-medium text-ink">
              Featured Projects
            </h2>
            <p className="text-pencil text-[15px] mt-1">
              Selected production applications deployed and actively running.
            </p>
          </div>

          <Link
            to="/projects"
            className="btn-solid text-xs py-2 px-4 whitespace-nowrap self-start sm:self-auto"
          >
            <span>Open Sketchbook Journal (5)</span>
            <span>→</span>
          </Link>
        </div>

        {/* 3 Featured Project Editorial Cards */}
        <div className="space-y-12">
          {featuredProjects.map((project, idx) => (
            <article
              key={project.slug}
              className="border border-rule bg-paper p-6 sm:p-8 hover:border-ink transition-colors duration-200 shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left (6 cols): Metadata, Description, Decisions */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-vermillion">
                      0{idx + 1}
                    </span>
                    <span className="text-rule select-none">/</span>
                    <span className="mono-label text-pencil">
                      {project.category}
                    </span>
                    <span className="text-rule select-none">·</span>
                    <span className="mono-label text-pencil">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-[24px] sm:text-[30px] font-semibold text-ink leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-[16px] leading-relaxed text-ink">
                    {project.oneLiner}
                  </p>

                  {/* Highlight sticky note */}
                  <div className="p-3 bg-paper-deep border-l-2 border-vermillion font-sans text-xs text-ink">
                    <span className="font-mono text-[10px] uppercase font-bold text-pencil block mb-0.5">
                      Key Engineering Outcome:
                    </span>
                    {project.highlightPhrase}
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-paper-deep border border-rule font-mono text-[11px] text-ink"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="pt-2 flex items-center gap-4 font-mono text-xs font-bold">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-ink hover:text-vermillion underline decoration-1 underline-offset-4"
                      >
                        <span>Live Demo</span>
                        <span>↗</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-pencil hover:text-ink underline decoration-1 underline-offset-4"
                      >
                        <span>Source Code</span>
                        <span>↗</span>
                      </a>
                    )}
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-1 text-pencil hover:text-ink ml-auto"
                    >
                      <span>In Journal Spread 0{idx + 1}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

                {/* Right (6 cols): Large Mounted Real Screenshot */}
                <div className="lg:col-span-6">
                  <div className="relative group bg-white p-2.5 shadow-sm border border-rule">
                    {/* Washi tape accents */}
                    <div className="absolute -top-2.5 -left-2.5 w-12 h-4 bg-[#e8deca] border border-[#d2c5ae] opacity-80 rotate-[-20deg] shadow-xs pointer-events-none" />
                    <div className="absolute -top-2.5 -right-2.5 w-12 h-4 bg-[#e8deca] border border-[#d2c5ae] opacity-80 rotate-[20deg] shadow-xs pointer-events-none" />
                    
                    <div className="aspect-[16/10] overflow-hidden bg-paper-deep border border-rule">
                      <img
                        src={project.image}
                        alt={`${project.title} interface preview`}
                        className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    <p className="font-hand text-xs sm:text-sm text-pencil mt-2 text-center">
                      {project.imageCaption}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Projects Action Card */}
        <div className="mt-8 p-6 bg-paper-deep border border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-medium text-ink text-base">
              Explore all 5 documented projects in the physical journal
            </p>
            <p className="text-pencil text-xs font-mono mt-0.5">
              Includes School Management ERP & Ripal Design Architecture Portals with page-turn interaction.
            </p>
          </div>
          <Link to="/projects" className="btn-solid text-xs py-2.5 px-4 whitespace-nowrap">
            Open Interactive Sketchbook →
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: TECHNOLOGIES & SKILLS OVERVIEW (Categorized Matrix)
      ========================================================================= */}
      <section className="border-t border-rule pt-16 sm:pt-20">
        <div className="max-w-2xl mb-8">
          <span className="mono-label text-vermillion font-bold block mb-1">
            // 03. TECHNICAL CAPABILITIES
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-medium text-ink">
            Technologies & Stack
          </h2>
          <p className="text-pencil text-[15px] mt-1">
            Tools, languages, and frameworks applied across production repositories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Group 1: Coding Languages */}
          <div className="p-5 bg-paper border border-rule space-y-3">
            <span className="font-mono text-xs uppercase font-bold text-vermillion block">
              Languages
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Python', 'Java', 'JavaScript', 'TypeScript', 'PHP', 'Dart', 'C', 'C++'].map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-1 bg-paper-deep border border-rule font-mono text-xs text-ink font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Group 2: Frontend */}
          <div className="p-5 bg-paper border border-rule space-y-3">
            <span className="font-mono text-xs uppercase font-bold text-vermillion block">
              Frontend
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite', 'Three.js'].map((fe) => (
                <span
                  key={fe}
                  className="px-2 py-1 bg-paper-deep border border-rule font-mono text-xs text-ink font-medium"
                >
                  {fe}
                </span>
              ))}
            </div>
          </div>

          {/* Group 3: Backend & Database */}
          <div className="p-5 bg-paper border border-rule space-y-3">
            <span className="font-mono text-xs uppercase font-bold text-vermillion block">
              Backend & Cloud
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Firebase', 'Supabase', 'MySQL', 'Express.js', 'REST APIs'].map((be) => (
                <span
                  key={be}
                  className="px-2 py-1 bg-paper-deep border border-rule font-mono text-xs text-ink font-medium"
                >
                  {be}
                </span>
              ))}
            </div>
          </div>

          {/* Group 4: Mobile & Tools */}
          <div className="p-5 bg-paper border border-rule space-y-3">
            <span className="font-mono text-xs uppercase font-bold text-vermillion block">
              Mobile & DevOps
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Flutter', 'Android Studio', 'Git', 'GitHub', 'Vercel', 'Figma'].map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-1 bg-paper-deep border border-rule font-mono text-xs text-ink font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DEVELOPMENT PHILOSOPHY (3 Core Pillars)
      ========================================================================= */}
      <section className="border-t border-rule pt-16 sm:pt-20">
        <div className="max-w-2xl mb-10">
          <span className="mono-label text-vermillion font-bold block mb-1">
            // 04. APPROACH & MINDSET
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-medium text-ink">
            Development Philosophy
          </h2>
          <p className="text-pencil text-[15px] mt-1">
            Principles that guide how I design, architect, and ship software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-paper border border-rule space-y-3">
            <span className="font-mono text-xs font-bold text-vermillion block">
              01 / PRACTICAL SOLUTIONS
            </span>
            <h3 className="font-sans font-semibold text-lg text-ink">
              Real Utility over Artificial Complexity
            </h3>
            <p className="text-sm text-pencil leading-relaxed">
              Software must solve authentic problems. I build features that simplify workflows, remove friction, and deliver tangible speed rather than chasing unnecessary bloat.
            </p>
          </div>

          <div className="p-6 bg-paper border border-rule space-y-3">
            <span className="font-mono text-xs font-bold text-vermillion block">
              02 / MAINTAINABLE CODE
            </span>
            <h3 className="font-sans font-semibold text-lg text-ink">
              Clean, Scalable Architecture
            </h3>
            <p className="text-sm text-pencil leading-relaxed">
              Code is read ten times more often than it is written. I structure components cleanly, type strictly with TypeScript, and document architectural decisions directly.
            </p>
          </div>

          <div className="p-6 bg-paper border border-rule space-y-3">
            <span className="font-mono text-xs font-bold text-vermillion block">
              03 / CONTINUOUS REFINEMENT
            </span>
            <h3 className="font-sans font-semibold text-lg text-ink">
              Relentless Learning & Polish
            </h3>
            <p className="text-sm text-pencil leading-relaxed">
              Great software lives in the details: keyboard accessibility, responsive breakpoints, tactile feedback, and sub-second load times that respect user attention.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CONTACT CALL TO ACTION BANNER
      ========================================================================= */}
      <section className="border-t border-rule pt-16 sm:pt-20">
        <div className="p-8 sm:p-12 bg-paper-deep border border-rule relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="mono-label text-vermillion font-bold block">
              // 05. NEXT STEPS
            </span>
            <h2 className="text-[30px] sm:text-[42px] font-semibold text-ink leading-tight">
              Have an idea? Let's build something meaningful together.
            </h2>
            <p className="text-[17px] text-pencil leading-relaxed">
              I am actively available for software developer roles, engineering internships, and select freelance client contracts.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link to="/contact" className="btn-solid text-sm">
                Get in Touch →
              </Link>
              <a
                href={`mailto:${contactDetails.email}`}
                className="text-link text-sm font-medium"
              >
                {contactDetails.email} ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Footer Row */}
      <section className="border-t border-rule pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-pencil">
        <div>
          <span>RAJ_IN // 22.3039° N, 70.8022° E</span>
        </div>
        <div className="flex gap-4">
          <TextLink href={contactDetails.github} external>GitHub ↗</TextLink>
          <TextLink href={contactDetails.linkedin} external>LinkedIn ↗</TextLink>
          <TextLink href={`tel:${contactDetails.phone}`} external>Phone: {contactDetails.phone}</TextLink>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
