import React from 'react';
import { experienceData, contactDetails } from '../data/projectsData';

export const AboutPage: React.FC = () => {
  const whatIDo = [
    {
      title: 'Frontend Development',
      description: 'Building responsive, accessible, and tactile web interfaces with modern React, TypeScript, and Tailwind CSS. Obsessed with sub-second performance, layout stability, and fluid touch interactions.',
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3']
    },
    {
      title: 'Web Application Development',
      description: 'Engineering full-stack web applications featuring end-to-end data pipelines, real-time database synchronisation, authenticated user sessions, and automated cloud deployments.',
      tools: ['Next.js / React', 'Firebase', 'Supabase', 'REST APIs', 'Vercel']
    },
    {
      title: 'Mobile Application Development',
      description: 'Developing high-performance cross-platform mobile applications for Android and iOS using Flutter and Dart, with offline persistence and reactive state management.',
      tools: ['Flutter', 'Dart', 'Android Studio', 'Firebase Mobile', 'Provider']
    },
    {
      title: 'Backend & Database Integration',
      description: 'Designing relational MySQL schemas, NoSQL document collections, secure role-based access rules, serverless cloud functions, and transactional endpoints.',
      tools: ['MySQL', 'Firebase Firestore', 'Supabase PostgreSQL', 'Express.js']
    },
    {
      title: 'UI/UX Implementation',
      description: 'Bridging design and code by translating Figma component systems into pixel-perfect production software with thoughtful micro-interactions, responsive grids, and design tokens.',
      tools: ['Figma', 'Design Systems', 'CSS Grid', 'Micro-interactions']
    }
  ];

  const techGroups = [
    {
      category: 'Languages',
      items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'PHP', 'Dart', 'C', 'C++']
    },
    {
      category: 'Frontend',
      items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite', 'Three.js']
    },
    {
      category: 'Backend & Database',
      items: ['Firebase', 'MySQL', 'Supabase', 'Express.js', 'PostgreSQL']
    },
    {
      category: 'Mobile',
      items: ['Flutter', 'Android SDK', 'Dart', 'Mobile UI Components']
    },
    {
      category: 'Tools & Platforms',
      items: ['Git', 'GitHub', 'Vercel', 'Figma', 'VS Code', 'Android Studio']
    }
  ];

  const philosophyPillars = [
    {
      number: '01',
      title: 'Building Practical Solutions',
      text: 'Software is a tool to solve human challenges. I focus on creating real utility—such as eliminating paper registers with a dedicated mobile attendance app, or helping homebuyers filter properties with zero latency.'
    },
    {
      number: '02',
      title: 'Writing Maintainable Code',
      text: 'Long-term maintainability beats short-term shortcuts. I believe in modular code, clear TypeScript typing, deterministic state management, and leaving every repository cleaner than I found it.'
    },
    {
      number: '03',
      title: 'Continuous Learning',
      text: 'Technology evolves rapidly. I maintain a daily habit of building, testing modern frameworks, understanding systems fundamentals, and exploring software architecture from first principles.'
    },
    {
      number: '04',
      title: 'Solving Real-World Problems',
      text: 'The best projects emerge from genuine needs. I build for small businesses, schools, and clients with deep respect for accessibility, performance over slow networks, and intuitive usability.'
    }
  ];

  return (
    <div className="pt-8 sm:pt-14 space-y-24 sm:space-y-32 max-w-4xl mx-auto">
      {/* =========================================================================
          MAIN INTRODUCTION & HEADLINE
      ========================================================================= */}
      <section className="space-y-4 max-w-3xl">
        <span className="mono-label text-vermillion font-bold uppercase tracking-wider block">
          // BACKGROUND & PHILOSOPHY
        </span>
        <h1 className="text-[36px] sm:text-[50px] font-semibold leading-tight text-ink">
          Building ideas into meaningful digital experiences.
        </h1>
        <p className="font-serif italic text-[20px] sm:text-[23px] text-pencil leading-relaxed">
          I am a developer interested in web development, application engineering, system design, and cloud technologies—based in Rajkot, Gujarat.
        </p>
      </section>

      {/* =========================================================================
          CHAPTER 01: WHO I AM (Personal Snapshot & Framed Portrait)
      ========================================================================= */}
      <section className="border-t border-rule pt-16 sm:pt-20 space-y-8">
        <div className="flex items-center gap-2">
          <span className="mono-label text-vermillion font-bold">// 01. WHO I AM</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Framed Portrait with Washi Tape */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative group max-w-[280px] w-full">
              {/* Washi tape accent */}
              <div className="absolute -top-3 left-6 w-28 h-6 bg-[#ecdcc6] border border-[#d2bf9f] opacity-85 rotate-[-2.5deg] shadow-xs z-10 pointer-events-none" />
              
              <div className="border-2 border-paper-deep bg-paper p-3 shadow-md space-y-3">
                <div className="aspect-[3/4] overflow-hidden border border-rule bg-paper-deep">
                  <img
                    src="/assets/rachit-profile.jpg"
                    alt="Rachit Dudhaiya"
                    className="w-full h-full object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                
                <div className="text-center pt-1 border-t border-rule font-mono text-xs">
                  <p className="font-sans font-semibold text-ink text-sm">
                    {contactDetails.name}
                  </p>
                  <p className="text-pencil text-[11px] mt-0.5">
                    {contactDetails.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="md:col-span-7 space-y-4 text-[17px] leading-relaxed text-ink">
            <p>
              Hello! I'm <strong>Rachit Dudhaiya</strong>, a developer currently pursuing my B.Tech in Information Technology at R.K. University in Rajkot, Gujarat (CGPA: 8.10 / 10.0).
            </p>
            <p>
              Over the last 3+ years, I have built real-world software products ranging from end-to-end real estate portals and student information systems to cross-platform Flutter applications.
            </p>
            <p>
              My approach balances aesthetic design with rigorous engineering: fast initial loads, clear database models, accessible markup, and smooth interactive details that make software pleasant and dependable to use.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
              <a
                href={contactDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid text-xs py-2 px-3"
              >
                GitHub Profile ↗
              </a>
              <a
                href={contactDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-ink text-ink hover:bg-paper-deep transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href="/assets/Rachit_Dudhaiya_Resume.pdf"
                download="Rachit_Dudhaiya_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-rule text-pencil hover:text-ink hover:border-ink transition-colors"
              >
                Download Resume (PDF) ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 02: MY JOURNEY (Visual Milestone Timeline)
      ========================================================================= */}
      <section className="border-t border-rule pt-16 sm:pt-20 space-y-8">
        <div>
          <span className="mono-label text-vermillion font-bold block mb-1">
            // 02. MY JOURNEY
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-semibold text-ink">
            Milestones & Experience Timeline
          </h2>
          <p className="text-pencil text-sm mt-1">
            Education and independent engineering milestones that shaped my skills.
          </p>
        </div>

        <div className="relative border-l-2 border-rule ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
          {experienceData.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-paper border-2 border-vermillion group-hover:scale-125 transition-transform" />

              <div className="p-5 sm:p-6 bg-paper border border-rule hover:border-ink transition-colors space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="font-sans font-semibold text-lg text-ink">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs font-bold text-vermillion">
                    {exp.years}
                  </span>
                </div>

                <p className="font-mono text-xs text-pencil">
                  {exp.company}
                </p>

                {exp.details && (
                  <p className="text-sm text-ink leading-relaxed pt-1">
                    {exp.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 03: WHAT I DO (5 Core Capabilities)
      ========================================================================= */}
      <section className="border-t border-rule pt-16 sm:pt-20 space-y-8">
        <div>
          <span className="mono-label text-vermillion font-bold block mb-1">
            // 03. CORE CAPABILITIES
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-semibold text-ink">
            What I Do
          </h2>
          <p className="text-pencil text-sm mt-1">
            Specialized engineering services I provide across the development lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whatIDo.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 bg-paper border border-rule hover:border-ink transition-colors space-y-3 ${
                idx === whatIDo.length - 1 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-vermillion">
                  0{idx + 1}
                </span>
                <span className="font-mono text-[10px] uppercase text-pencil">
                  CAPABILITY
                </span>
              </div>

              <h3 className="font-sans font-semibold text-xl text-ink">
                {item.title}
              </h3>

              <p className="text-sm text-ink leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {item.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 bg-paper-deep border border-rule font-mono text-[11px] text-pencil"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 04: MY TECH STACK (Categorized Without Fake Percentages)
      ========================================================================= */}
      <section className="border-t border-rule pt-16 sm:pt-20 space-y-8">
        <div>
          <span className="mono-label text-vermillion font-bold block mb-1">
            // 04. TECHNICAL SKILLS
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-semibold text-ink">
            My Tech Stack
          </h2>
          <p className="text-pencil text-sm mt-1">
            Verified technologies, languages, and tools actively used in project repositories.
          </p>
        </div>

        <div className="space-y-6">
          {techGroups.map((group, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 bg-paper border border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="sm:w-1/3">
                <span className="font-mono text-xs font-bold text-vermillion block mb-0.5">
                  GROUP 0{idx + 1}
                </span>
                <h3 className="font-sans font-semibold text-lg text-ink">
                  {group.category}
                </h3>
              </div>

              <div className="sm:w-2/3 flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-paper-deep border border-rule text-ink font-mono text-xs font-medium hover:border-ink transition-colors shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 05: MY PHILOSOPHY
      ========================================================================= */}
      <section className="border-t border-rule pt-16 sm:pt-20 space-y-8">
        <div>
          <span className="mono-label text-vermillion font-bold block mb-1">
            // 05. PRINCIPLES & VALUES
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-semibold text-ink">
            My Development Philosophy
          </h2>
          <p className="text-pencil text-sm mt-1">
            Four core values that define my everyday craft and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {philosophyPillars.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 bg-paper border border-rule space-y-2 hover:border-ink transition-colors"
            >
              <span className="font-mono text-xs font-bold text-vermillion">
                {pillar.number}
              </span>
              <h3 className="font-sans font-semibold text-lg text-ink">
                {pillar.title}
              </h3>
              <p className="text-sm text-pencil leading-relaxed pt-1">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Invitation CTA */}
      <section className="border-t border-rule pt-16 sm:pt-20">
        <div className="p-8 sm:p-10 bg-paper-deep border border-rule text-center space-y-4">
          <h2 className="text-[26px] sm:text-[32px] font-semibold text-ink">
            Interested in working together or reviewing my code?
          </h2>
          <p className="text-pencil text-sm max-w-xl mx-auto">
            I am always open to discussing new opportunities, full-stack projects, or developer roles.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <a
              href="/contact"
              className="btn-solid text-xs py-2.5 px-5"
            >
              Send an Inquiry →
            </a>
            <a
              href={contactDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-ink text-ink font-mono text-xs font-bold hover:bg-paper transition-colors"
            >
              Inspect GitHub Repositories ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
