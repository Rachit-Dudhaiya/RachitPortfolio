import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData, contactDetails } from '../data/projectsData';
import { ProjectRow } from '../components/ProjectRow';
import { TextLink } from '../components/TextLink';
import { PaperStillLife } from '../components/PaperStillLife';
import { Sketchbook } from '../components/Sketchbook';

export const HomePage: React.FC = () => {
  const selectedProjects = projectsData.slice(0, 3);

  const scrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('sketchbook-preview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* S1: Hero Section — Min-height 55vh, text left, 3D still-life right */}
      <section className="min-h-[55vh] flex flex-col justify-center pt-8 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 55% Column: Typography & Actions */}
          <div className="lg:col-span-7">
            <span className="mono-label text-vermillion font-semibold uppercase tracking-wider block mb-2">
              Full-Stack & Mobile Developer
            </span>
            <h1 className="text-[34px] sm:text-[46px] md:text-[52px] font-medium leading-[1.08] tracking-tight text-ink">
              Rachit Dudhaiya — building web & mobile software in Rajkot, India.
            </h1>

            <p className="font-serif italic text-[20px] sm:text-[23px] text-pencil mt-5 leading-snug">
              Motivated developer with 3+ years hands-on experience building fast web platforms, responsive client applications, and cross-platform mobile solutions.
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-8">
              <a href="#sketchbook-preview" onClick={scrollToWork} className="btn-solid">
                Open the sketchbook ↓
              </a>
              <a
                href={`mailto:${contactDetails.email}`}
                className="text-link text-[16px] font-medium"
              >
                {contactDetails.email} →
              </a>
            </div>

            <p className="mono-label mt-8 text-pencil">
              {contactDetails.status}
            </p>
          </div>

          {/* Right 45% Column: 3D Paper Still-Life Scene */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PaperStillLife />
          </div>
        </div>
      </section>

      {/* S2: Signature Sketchbook Preview */}
      <section id="sketchbook-preview" className="scroll-mt-8">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-vermillion" />
            <h2 className="text-[21px] sm:text-[24px] font-medium text-ink">
              The working sketchbook
            </h2>
          </div>
          <Link to="/projects" className="mono-label text-pencil hover:text-ink transition-colors duration-micro">
            All projects (5) →
          </Link>
        </div>
        <p className="text-xs text-pencil mb-4">
          Evidence of architectural decisions, process notes, and verified links. Turn pages with arrow keys, click edges, or drag.
        </p>

        <Sketchbook />
      </section>

      {/* Selected Projects Text Rows */}
      <section id="selected-projects" className="border-t border-rule pt-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-[21px] sm:text-[24px] font-medium text-ink">
            Project index
          </h2>
          <Link to="/projects" className="mono-label text-pencil hover:text-ink transition-colors duration-micro">
            Full repository archive →
          </Link>
        </div>

        <div>
          {selectedProjects.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              isLast={index === selectedProjects.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Short About Teaser with Real Photo */}
      <section className="border-t border-rule pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <div className="relative group max-w-[240px]">
              {/* Paper photo frame with subtle tape accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#e8deca] opacity-80 rotate-[-2deg] border border-[#d2c5ae] shadow-xs z-10 pointer-events-none" />
              <div className="aspect-[3/4] border-2 border-paper-deep bg-paper shadow-md overflow-hidden p-2">
                <img
                  src="/assets/rachit-profile.jpg"
                  alt="Portrait photo of Rachit Dudhaiya"
                  className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="mt-2 text-center">
                <span className="font-mono text-[11px] text-pencil uppercase tracking-wider">
                  Rachit Dudhaiya · Rajkot
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4 max-w-xl">
            <h2 className="text-[21px] sm:text-[24px] font-medium text-ink">
              About Rachit
            </h2>
            <p className="text-[17px] leading-relaxed text-ink">
              I am an Information & Technology engineering student at R.K. University with 3+ years of hands-on experience developing web applications, mobile platforms, and client-side solutions.
            </p>
            <p className="text-[17px] leading-relaxed text-ink">
              My technical expertise spans Python, Flutter, JavaScript, HTML/CSS, Firebase, Supabase, and MySQL. I enjoy solving real-world challenges through clean software architecture, whether crafting high-converting real estate portals or building responsive mobile utilities.
            </p>
            <div className="pt-2">
              <Link to="/about" className="text-link text-[15px] font-medium">
                View qualifications, resume details & tech stack →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Elsewhere Section */}
      <section className="border-t border-rule pt-12">
        <h2 className="mono-label mb-4">Elsewhere & Connect</h2>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          <TextLink href={contactDetails.github} external>GitHub ↗</TextLink>
          <TextLink href={contactDetails.linkedin} external>LinkedIn ↗</TextLink>
          <TextLink href={`mailto:${contactDetails.email}`} external>Email: {contactDetails.email}</TextLink>
          <TextLink href={`tel:${contactDetails.phone}`} external>Phone: {contactDetails.phone}</TextLink>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
