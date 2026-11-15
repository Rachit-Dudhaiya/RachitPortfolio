import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HamburgerMenu } from './HamburgerMenu';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/projects') {
      return location.pathname.startsWith('/projects');
    }
    return location.pathname === path;
  };

  return (
    <header className="w-full border-b border-rule bg-paper sticky top-0 z-40">
      <div className="max-w-site mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="font-sans font-medium text-[17px] text-ink no-underline hover:text-black transition-colors duration-micro"
        >
          Rachit Dudhaiya
        </Link>

        {/* Desktop Links */}
        <nav aria-label="Main Navigation" className="hidden sm:flex items-center gap-6">
          {navLinks.map((item, idx) => (
            <React.Fragment key={item.href}>
              <Link
                to={item.href}
                className={`text-[15px] font-medium no-underline transition-colors duration-micro ${
                  isActive(item.href)
                    ? 'text-black underline underline-offset-4 decoration-2 font-bold'
                    : 'text-pencil hover:text-black'
                }`}
              >
                {item.label}
              </Link>
              {idx < navLinks.length - 1 && (
                <span className="text-rule select-none">·</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Animated Hamburger Menu Toggle (Compact & Black) */}
        <div className="sm:hidden flex items-center">
          <HamburgerMenu
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            barColor="#111111"
          />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-rule bg-paper-deep px-6 py-5 flex flex-col gap-4 shadow-sm animate-fadeIn">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-[17px] font-medium no-underline py-1 transition-colors duration-micro ${
                isActive(item.href)
                  ? 'text-black underline underline-offset-4 decoration-2 font-bold'
                  : 'text-ink hover:text-black'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
