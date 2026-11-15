import React from 'react';
import { Link } from 'react-router-dom';
import { contactDetails } from '../data/projectsData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-rule mt-20 sm:mt-28 py-12 bg-paper text-pencil">
      <div className="max-w-site mx-auto px-6 sm:px-10 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-[14px] leading-relaxed">
          {/* Column 1: Name, Role and Location */}
          <div className="space-y-1">
            <p className="font-semibold text-ink text-[16px]">{contactDetails.name}</p>
            <p className="text-pencil text-sm">
              Creative Developer & Full-Stack Engineer based in Rajkot, Gujarat.
            </p>
            <p className="mono-label text-vermillion pt-1">
              {contactDetails.status}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-2 sm:items-center">
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="text-ink hover:text-black font-medium transition-colors">
                Home
              </Link>
              <Link to="/projects" className="text-ink hover:text-black font-medium transition-colors">
                Projects Journal
              </Link>
              <Link to="/about" className="text-ink hover:text-black font-medium transition-colors">
                About & Journey
              </Link>
              <Link to="/contact" className="text-ink hover:text-black font-medium transition-colors">
                Contact & Hire
              </Link>
            </div>
          </div>

          {/* Column 3: Contact & Links */}
          <div className="sm:text-right space-y-1.5 text-sm">
            <a
              href={`mailto:${contactDetails.email}`}
              className="text-ink font-semibold hover:text-black underline underline-offset-2 transition-colors block"
            >
              {contactDetails.email}
            </a>
            <a
              href={`tel:${contactDetails.phone}`}
              className="text-pencil hover:text-ink transition-colors block text-[13px] font-mono"
            >
              {contactDetails.phone}
            </a>
            <div className="pt-2 flex sm:justify-end gap-3 text-xs font-mono font-bold">
              <a
                href={contactDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-black underline transition-colors"
              >
                GitHub ↗
              </a>
              <span>·</span>
              <a
                href={contactDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-black underline transition-colors"
              >
                LinkedIn ↗
              </a>
              <span>·</span>
              <a
                href="/assets/Rachit_Dudhaiya_Resume.pdf"
                download="Rachit_Dudhaiya_Resume.pdf"
                className="text-ink hover:text-black underline transition-colors"
              >
                Resume ↓
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Coordinates */}
        <div className="pt-6 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-pencil">
          <div>
            © {new Date().getFullYear()} Rachit Dudhaiya. All rights reserved.
          </div>
          <div>
            Crafted with React, TypeScript & Tailwind CSS · Rajkot, India
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
