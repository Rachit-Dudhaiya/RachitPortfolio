import React, { useState } from 'react';
import { contactDetails } from '../data/projectsData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Application',
    budgetRange: 'Flexible',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const projectTypes = [
    'Web Application',
    'Mobile App (Flutter)',
    'Real Estate Portal',
    'Full-Stack System',
    'Technical Consultation',
  ];

  const budgetRanges = [
    'Flexible',
    '< ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000+',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactDetails.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in your name, email, and project description.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);

      const subject = encodeURIComponent(
        `[${formData.projectType}] Project Inquiry from ${formData.name}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget Range: ${formData.budgetRange}\n\nProject Scope:\n${formData.message}\n\n---\nSent via Rachit's Portfolio Contact Form`
      );

      // Open mail client with pre-filled content
      window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`;
    }, 700);
  };

  return (
    <div className="pt-8 sm:pt-14 space-y-16 max-w-site mx-auto pb-16">
      {/* Header Section */}
      <div className="max-w-2xl space-y-3">
        <span className="mono-label text-vermillion font-bold uppercase tracking-wider block">
          // INQUIRIES & COLLABORATION
        </span>
        <h1 className="text-[36px] sm:text-[50px] font-semibold leading-tight text-ink">
          Have an idea? Let's build something meaningful.
        </h1>
        <p className="text-[18px] text-pencil leading-relaxed">
          Whether you need a custom web platform, a cross-platform mobile application, or a full-time software developer, my inbox is always open.
        </p>
      </div>

      {/* =========================================================================
          MAIN CONTACT SPLIT LAYOUT (Left: Coordinates, Right: Interactive Form)
      ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-rule pt-12">
        {/* LEFT COLUMN (5 cols): Coordinates, Email Copy & Status */}
        <div className="lg:col-span-5 space-y-8">
          {/* Availability Status Card */}
          <div className="p-6 bg-paper-deep border border-rule space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-vermillion animate-pulse" />
              <span className="font-mono text-xs uppercase font-bold text-ink">
                CURRENT AVAILABILITY
              </span>
            </div>
            <p className="text-sm text-ink leading-relaxed font-medium">
              Actively available for Software Developer roles, client contracts, and engineering projects.
            </p>
            <p className="font-mono text-[11px] text-pencil">
              Typical response time: <strong className="text-ink font-semibold">Under 24 hours</strong>
            </p>
          </div>

          {/* Primary Email with One-Click Copy */}
          <div className="space-y-2">
            <span className="mono-label text-pencil text-xs uppercase block">
              Direct Email (Primary)
            </span>
            <div className="flex items-center justify-between p-3.5 bg-paper border border-rule group hover:border-ink transition-colors">
              <a
                href={`mailto:${contactDetails.email}`}
                className="text-base sm:text-lg font-mono font-medium text-ink hover:text-vermillion transition-colors truncate"
              >
                {contactDetails.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="ml-3 px-2.5 py-1 text-xs font-mono font-bold border border-rule hover:border-ink hover:bg-paper-deep text-ink transition-colors cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {copiedEmail ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Secondary Contact Coordinates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-paper border border-rule space-y-1">
              <span className="mono-label text-pencil text-[11px] uppercase block">
                Direct Phone / WhatsApp
              </span>
              <a
                href={`tel:${contactDetails.phone}`}
                className="font-mono text-sm font-semibold text-ink hover:text-vermillion transition-colors block"
              >
                {contactDetails.phone}
              </a>
            </div>

            <div className="p-4 bg-paper border border-rule space-y-1">
              <span className="mono-label text-pencil text-[11px] uppercase block">
                Base Location
              </span>
              <p className="font-mono text-sm font-semibold text-ink">
                Rajkot, Gujarat · India
              </p>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="space-y-2">
            <span className="mono-label text-pencil text-xs uppercase block">
              Profiles & Code
            </span>
            <div className="flex flex-col gap-2 font-mono text-xs">
              <a
                href={contactDetails.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-paper border border-rule hover:border-ink hover:bg-paper-deep transition-all text-ink font-semibold"
              >
                <span>GitHub · Rachit-Dudhaiya</span>
                <span>↗</span>
              </a>

              <a
                href={contactDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-paper border border-rule hover:border-ink hover:bg-paper-deep transition-all text-ink font-semibold"
              >
                <span>LinkedIn · Rachit Dudhaiya</span>
                <span>↗</span>
              </a>

              <a
                href="/assets/Rachit_Dudhaiya_Resume.pdf"
                download="Rachit_Dudhaiya_Resume.pdf"
                className="flex items-center justify-between p-3 bg-paper border border-rule hover:border-ink hover:bg-paper-deep transition-all text-ink font-semibold"
              >
                <span>Download Resume (PDF)</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (7 cols): Professional Project Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 bg-paper border border-rule shadow-sm space-y-6">
            <div>
              <span className="mono-label text-vermillion font-bold block mb-1">
                // PROJECT INQUIRY FORM
              </span>
              <h2 className="text-2xl font-semibold text-ink">
                Send a Direct Message
              </h2>
              <p className="text-pencil text-xs font-mono mt-1">
                Fill out the project scope below. It will dispatch directly to Rachit's verified inbox.
              </p>
            </div>

            {submitted ? (
              /* Success confirmation state */
              <div className="p-8 bg-paper-deep border-2 border-vermillion text-center space-y-4 animate-fadeIn">
                <span className="ink-stamp">MESSAGE READY TO DISPATCH</span>
                <h3 className="text-2xl font-bold text-ink">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-sm text-pencil max-w-md mx-auto leading-relaxed">
                  Your project scope for <strong className="text-ink">{formData.projectType}</strong> has been prepared. Your email client will open with all details populated for <strong>{contactDetails.email}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-solid text-xs py-2 px-4"
                  >
                    Send Another Note ←
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-[#FFF1F0] border border-[#FFA39E] text-xs font-mono text-[#CF1322]">
                    {error}
                  </div>
                )}

                {/* Field 1: Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="mono-label block text-ink font-medium">
                    Your Full Name <span className="text-vermillion">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Sharma"
                    className="form-input"
                  />
                </div>

                {/* Field 2: Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="mono-label block text-ink font-medium">
                    Your Email Address <span className="text-vermillion">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="form-input"
                  />
                </div>

                {/* Field 3: Project Type (Interactive Pills) */}
                <div className="space-y-2">
                  <label className="mono-label block text-ink font-medium">
                    Project Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => {
                      const isSelected = formData.projectType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`px-3 py-1.5 font-mono text-xs border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-ink text-paper border-ink font-bold shadow-xs'
                              : 'bg-paper-deep text-pencil border-rule hover:text-ink hover:border-ink'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 4: Budget Range (Interactive Pills) */}
                <div className="space-y-2">
                  <label className="mono-label block text-ink font-medium">
                    Budget Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((range) => {
                      const isSelected = formData.budgetRange === range;
                      return (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetRange: range })}
                          className={`px-3 py-1.5 font-mono text-xs border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-ink text-paper border-ink font-bold shadow-xs'
                              : 'bg-paper-deep text-pencil border-rule hover:text-ink hover:border-ink'
                          }`}
                        >
                          {range}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 5: Project Description */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="mono-label block text-ink font-medium">
                    Project Scope & Details <span className="text-vermillion">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, goals, key requirements, or the role you are looking to fill..."
                    className="form-input resize-y"
                  />
                </div>

                {/* Submit Button with Loading State */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-solid w-full text-sm font-semibold tracking-wide disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? 'Preparing Dispatch...' : 'Dispatch Message →'}
                  </button>
                  <p className="font-mono text-[11px] text-pencil text-center mt-2">
                    No spam. Messages land directly in Rachit's verified inbox.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
