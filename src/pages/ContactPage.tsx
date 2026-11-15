import React, { useState } from 'react';
import { contactDetails } from '../data/projectsData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all three fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);

    const subject = encodeURIComponent(`Project inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${contactDetails.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-8 sm:pt-14 space-y-12 max-w-xl">
      {/* Page Header */}
      <div>
        <span className="mono-label text-vermillion font-semibold uppercase tracking-wider block mb-1">
          Get in Touch
        </span>
        <h1 className="text-[34px] sm:text-[44px] font-medium leading-tight text-ink">
          Contact Rachit
        </h1>
        <p className="mt-2 text-[16px] text-pencil">
          Available for software developer positions, client projects, and technical collaborations.
        </p>
      </div>

      {/* Direct Contact Coordinates */}
      <section className="space-y-4 p-6 bg-paper-deep border border-rule">
        <div>
          <span className="mono-label text-pencil text-xs uppercase block mb-1">Email (Primary)</span>
          <a
            href={`mailto:${contactDetails.email}`}
            className="text-[20px] sm:text-[24px] font-medium text-ink hover:text-vermillion underline underline-offset-4 decoration-1 transition-colors duration-micro block"
          >
            {contactDetails.email}
          </a>
        </div>

        <div className="pt-2 border-t border-rule grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="mono-label text-pencil text-xs uppercase block mb-0.5">Phone / WhatsApp</span>
            <a href={`tel:${contactDetails.phone}`} className="text-ink font-medium hover:text-vermillion">
              {contactDetails.phone}
            </a>
          </div>
          <div>
            <span className="mono-label text-pencil text-xs uppercase block mb-0.5">Location</span>
            <span className="text-ink font-medium">
              Rajkot 360-004, Gujarat
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-rule flex gap-4 text-xs font-mono">
          <a
            href={contactDetails.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink hover:text-vermillion transition-colors underline"
          >
            GitHub (Rachit-Dudhaiya) ↗
          </a>
          <span>·</span>
          <a
            href={contactDetails.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink hover:text-vermillion transition-colors underline"
          >
            LinkedIn Profile ↗
          </a>
        </div>
      </section>

      {/* 3-Field Form with Stamped "SENT" feedback */}
      <section className="border-t border-rule pt-8">
        <h2 className="text-[19px] font-medium text-ink mb-4">
          Send a direct message
        </h2>

        {submitted ? (
          <div className="relative p-8 bg-paper border border-rule shadow-sm space-y-3 text-center">
            {/* The Stamped SENT Mark */}
            <div className="inline-block border-2 border-vermillion text-vermillion px-4 py-1 font-mono text-sm uppercase tracking-widest font-bold rotate-[-8deg] shadow-xs">
              [ STAMP: SENT // DISPATCHED ]
            </div>
            <p className="text-[16px] text-ink font-medium pt-2">
              Thank you, {formData.name}. Opening your email client to verify delivery.
            </p>
            <p className="text-xs text-pencil">
              A copy is pre-filled in your mail application to reach {contactDetails.email} directly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-[14px] text-vermillion">
                {error}
              </p>
            )}

            <div>
              <label htmlFor="name" className="block text-[14px] font-medium text-ink mb-1.5">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="e.g. Rahul Mehta"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[14px] font-medium text-ink mb-1.5">
                Your Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                placeholder="e.g. rahul@company.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[14px] font-medium text-ink mb-1.5">
                Message / Role Details
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="form-input resize-y"
                placeholder="Tell me about your project, team, or opportunity..."
              />
            </div>

            <button type="submit" className="btn-solid">
              Dispatch message →
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ContactPage;
