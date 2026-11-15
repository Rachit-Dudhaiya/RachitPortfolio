import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const LegacyWorkRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/projects/${slug}` : '/projects'} replace />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
          <Route path="/work" element={<Navigate to="/projects" replace />} />
          <Route path="/work/:slug" element={<LegacyWorkRedirect />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
