import React from 'react';
import { experienceData, techStackCategories, certificationsData, contactDetails } from '../data/projectsData';
import { TextLink } from '../components/TextLink';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-8 sm:pt-14 space-y-16 max-w-3xl">
      {/* Page Heading */}
      <div>
        <span className="mono-label text-vermillion font-semibold uppercase tracking-wider block mb-1">
          Curriculum Vitae & Background
        </span>
        <h1 className="text-[34px] sm:text-[46px] font-medium leading-tight text-ink">
          About Rachit Dudhaiya
        </h1>
        <p className="mt-2 text-[17px] text-pencil">
          Full-Stack & Mobile Developer · B.Tech (IT) at R.K. University · Rajkot, India
        </p>
      </div>

      {/* Portrait & Profile Bio */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
          {/* Framed Photo with Tactile Background */}
          <div className="sm:col-span-5">
            <div className="relative group max-w-[280px]">
              {/* Decorative washi tape */}
              <div className="absolute -top-3 left-8 w-24 h-6 bg-[#ecdcc6] border border-[#d2bf9f] opacity-85 rotate-[-3deg] shadow-xs z-10 pointer-events-none" />
              
              <div className="border-2 border-paper-deep bg-[#fcfaf5] p-3 shadow-md space-y-3">
                <div className="aspect-[3/4] overflow-hidden border border-rule bg-paper-deep">
                  <img
                    src="/assets/rachit-profile.jpg"
                    alt="Rachit Dudhaiya in black formal suit and glasses"
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                
                <div className="text-center pt-1 border-t border-rule">
                  <p className="font-sans font-medium text-ink text-sm">
                    {contactDetails.name}
                  </p>
                  <p className="font-mono text-[11px] text-pencil">
                    {contactDetails.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Statement */}
          <div className="sm:col-span-7 space-y-4 text-[16px] leading-relaxed text-ink">
            <div className="border-l-2 border-vermillion pl-4 py-1 italic font-serif text-[18px] text-ink leading-snug">
              "Passionate about building innovative, user-friendly, and scalable software solutions that solve real-world problems."
            </div>

            <p>
              I am a motivated and detail-oriented developer with 3+ years of hands-on experience in web and mobile application development. Seeking a Software Developer role to leverage technical skills, learn modern frameworks, and deliver impactful software.
            </p>

            <p>
              My background covers building responsive client-side portals (React, HTML/CSS, JavaScript), robust backend systems (Firebase, Supabase, MySQL, Express.js), and cross-platform mobile apps (Flutter & Dart).
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-sm font-mono">
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
                className="btn-outline text-xs py-2 px-3"
              >
                LinkedIn Profile ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Quick Info Card */}
      <section className="p-6 bg-paper-deep border border-rule rounded-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="mono-label block mb-1">Direct Email</span>
          <a href={`mailto:${contactDetails.email}`} className="text-ink font-medium hover:text-vermillion underline decoration-1">
            {contactDetails.email}
          </a>
        </div>
        <div>
          <span className="mono-label block mb-1">Direct Phone</span>
          <a href={`tel:${contactDetails.phone}`} className="text-ink font-medium hover:text-vermillion">
            {contactDetails.phone}
          </a>
        </div>
        <div>
          <span className="mono-label block mb-1">Location</span>
          <span className="text-ink font-medium">
            Rajkot 360-004, Gujarat
          </span>
        </div>
      </section>

      {/* Technical Stack (Exact user stack categorized) */}
      <section className="space-y-6 border-t border-rule pt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[22px] font-medium text-ink">
            Technical Stack & Tooling
          </h2>
          <span className="mono-label text-pencil">Categorized Inventory</span>
        </div>

        <div className="space-y-4 text-[15px] leading-relaxed">
          <div className="p-4 bg-paper border border-rule">
            <span className="mono-label text-vermillion block mb-1.5 font-bold">Coding Languages</span>
            <p className="text-ink font-medium">
              {techStackCategories.codingLanguages.join(' · ')}
            </p>
          </div>

          <div className="p-4 bg-paper border border-rule">
            <span className="mono-label text-blueprint block mb-1.5 font-bold">Backend & Databases</span>
            <p className="text-ink font-medium">
              {techStackCategories.backend.join(' · ')}
            </p>
          </div>

          <div className="p-4 bg-paper border border-rule">
            <span className="mono-label text-ink block mb-1.5 font-bold">Frameworks & Libraries</span>
            <p className="text-ink font-medium">
              {techStackCategories.frameworksAndLibraries.join(' · ')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-paper border border-rule">
              <span className="mono-label text-pencil block mb-1.5 font-bold">Hosting & Platforms</span>
              <p className="text-ink font-medium">
                {techStackCategories.hostingAndDevOps.join(' · ')}
              </p>
            </div>

            <div className="p-4 bg-paper border border-rule">
              <span className="mono-label text-pencil block mb-1.5 font-bold">Tools & Environments</span>
              <p className="text-ink font-medium">
                {techStackCategories.toolsAndIDEs.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="space-y-6 border-t border-rule pt-12">
        <h2 className="text-[22px] font-medium text-ink">
          Education
        </h2>

        <div className="space-y-6 border-l-2 border-rule pl-6 ml-2">
          {/* B.Tech */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-vermillion border-2 border-paper" />
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3 className="text-[18px] font-medium text-ink">
                B.Tech in Information & Technology
              </h3>
              <span className="mono-label text-vermillion font-bold">2022 — 2026 (Expected)</span>
            </div>
            <p className="text-pencil text-[15px] mt-0.5">
              R.K. University, Rajkot · <strong>CGPA: 8.10 / 10.0</strong>
            </p>
            <p className="text-sm text-ink-soft mt-1">
              Core study in Object-Oriented Software Design, Data Structures, Mobile App Development, Relational Databases, and Network Architecture.
            </p>
          </div>

          {/* 12th GSHSEB */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-pencil border-2 border-paper" />
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3 className="text-[17px] font-medium text-ink">
                12th GSHSEB (Higher Secondary Science)
              </h3>
              <span className="mono-label text-pencil">March 2024</span>
            </div>
            <p className="text-pencil text-[15px] mt-0.5">
              Tapovan School, Rajkot · <strong>Score: 61.69%</strong>
            </p>
          </div>

          {/* 10th GSHSEB */}
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-pencil border-2 border-paper" />
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3 className="text-[17px] font-medium text-ink">
                10th GSHSEB (Secondary School)
              </h3>
              <span className="mono-label text-pencil">March 2022</span>
            </div>
            <p className="text-pencil text-[15px] mt-0.5">
              Tapovan School, Rajkot · <strong>Score: 71.16%</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Certifications & Qualifications */}
      <section className="space-y-4 border-t border-rule pt-12">
        <h2 className="text-[22px] font-medium text-ink">
          Certifications & Qualifications
        </h2>

        <div className="border border-rule divide-y divide-rule bg-paper text-[15px]">
          {certificationsData.map((cert, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-medium text-ink">{cert.title}</p>
                <p className="text-xs font-mono text-pencil">{cert.issuer}</p>
              </div>
              <span className="inline-block border border-rule px-2.5 py-1 text-xs font-mono text-pencil rounded-xs self-start sm:self-auto">
                {cert.type}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Soft Skills */}
      <section className="space-y-4 border-t border-rule pt-12">
        <h2 className="text-[22px] font-medium text-ink">
          Soft Skills & Core Strengths
        </h2>
        <div className="flex flex-wrap gap-2 text-[14px]">
          {['Teamwork & Collaboration', 'Time Management', 'Leadership', 'Effective Communication', 'Creative Problem Solver', 'Quick Adapter to New Frameworks'].map((skill, i) => (
            <span key={i} className="px-3 py-1.5 bg-paper border border-rule text-ink rounded-xs font-medium">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Academic References */}
      <section className="space-y-4 border-t border-rule pt-12">
        <h2 className="text-[22px] font-medium text-ink">
          Academic References
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
          <div className="p-4 bg-paper border border-rule">
            <p className="font-semibold text-ink">Dr. Vishal Doshi</p>
            <p className="text-pencil text-xs font-mono">Associate Professor · R.K. University</p>
            <p className="mt-2 text-ink">Email: <a href="mailto:po@rku.ac.in" className="underline">po@rku.ac.in</a></p>
            <p className="text-ink">Phone: +91 93289 03508</p>
          </div>

          <div className="p-4 bg-paper border border-rule">
            <p className="font-semibold text-ink">Osho Shah</p>
            <p className="text-pencil text-xs font-mono">Associate Professor · R.K. University</p>
            <p className="mt-2 text-ink">Email: <a href="mailto:tpo2@rku.ac.in" className="underline">tpo2@rku.ac.in</a></p>
            <p className="text-ink">Phone: +91 94092 74800</p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-rule pt-8 text-[15px]">
        <p className="text-pencil">
          Interested in discussing a software development role, internship, or collaborative project?{' '}
          <TextLink href={`mailto:${contactDetails.email}`} external>
            Send an email to {contactDetails.email}
          </TextLink>
          .
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
