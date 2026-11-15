import React from 'react';
import { ProjectSpreadData } from '../../data/projectsData';
import { ProjectDetails } from './ProjectDetails';
import { ProjectScreenshot } from './ProjectScreenshot';

interface NotebookPageProps {
  project: ProjectSpreadData;
  pageType: 'details' | 'screenshot' | 'spread';
  onZoom: () => void;
}

export const NotebookPage: React.FC<NotebookPageProps> = ({
  project,
  pageType,
  onZoom,
}) => {
  if (pageType === 'details') {
    return (
      <div className="w-full h-full bg-[#F5F0E6] rounded-sm overflow-hidden shadow-md">
        <ProjectDetails
          project={project}
          onPreviewClick={() => onZoom()}
        />
      </div>
    );
  }

  if (pageType === 'screenshot') {
    return (
      <div className="w-full h-full bg-[#F5F0E6] rounded-sm overflow-hidden shadow-md">
        <ProjectScreenshot
          project={project}
          onZoom={onZoom}
        />
      </div>
    );
  }

  // Full Two-Page Spread for Desktop
  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#F5F0E6] overflow-hidden">
      <div className="w-full md:w-1/2 h-full">
        <ProjectDetails
          project={project}
          onPreviewClick={() => onZoom()}
        />
      </div>
      <div className="w-full md:w-1/2 h-full border-t md:border-t-0 md:border-l border-[#D5CDBC]">
        <ProjectScreenshot
          project={project}
          onZoom={onZoom}
        />
      </div>
    </div>
  );
};

export default NotebookPage;

