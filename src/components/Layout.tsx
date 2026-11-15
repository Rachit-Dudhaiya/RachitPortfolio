import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-paper text-ink">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 w-full max-w-site mx-auto px-6 sm:px-10">
        {children}
      </main>

      <Footer />
    </div>
  );
};

