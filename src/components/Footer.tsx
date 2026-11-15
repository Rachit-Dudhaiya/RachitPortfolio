import React from 'react';
import { Link } from 'react-router-dom';
import { contactDetails } from '../data/projectsData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-rule mt-20 sm:mt-28 py-12 bg-paper text-pencil">
      <div className="max-w-site mx-auto px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-[14px] leading-relaxed">
        {/* Column 1: Name, Role and Location */}
        <div>
          <p className="font-medium text-ink text-[16px]">{contactDetails.name}</p>
          <p className="mt-1 text-pencil">
            Full-Stack & Mobile Developer based in Rajkot, Gujarat.
          </p>
          <p className="mt-2 mono-label text-vermillion">
            {contactDetails.status}
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col gap-2 sm:items-center">
          <div className="flex flex-col gap-2">
            <Link to="/projects" className="text-ink hover:text-vermillion transition-colors duration-micro">
              Projects
            </Link>
            <Link to="/about" className="text-ink hover:text-vermillion transition-colors duration-micro">
              About & Experience
            </Link>
            <Link to="/contact" className="text-ink hover:text-vermillion transition-colors duration-micro">
              Contact
            </Link>
          </div>
        </div>

        {/* Column 3: Contact & Links */}
        <div className="sm:text-right space-y-1.5">
          <a
            href={`mailto:${contactDetails.email}`}
            className="text-ink font-medium hover:text-vermillion underline underline-offset-2 transition-colors duration-micro block"
          >
            {contactDetails.email}
          </a>
          <a
            href={`tel:${contactDetails.phone}`}
            className="text-pencil hover:text-ink transition-colors duration-micro block text-[13px]"
          >
            {contactDetails.phone}
          </a>
          <div className="pt-2 flex sm:justify-end gap-3 text-xs font-mono">
            <a
              href={contactDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-vermillion transition-colors"
            >
              GitHub ↗
            </a>
            <span>·</span>
            <a
              href={contactDetails.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-vermillion transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
