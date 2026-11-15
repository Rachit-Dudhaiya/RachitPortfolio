import React from 'react';

interface HandwrittenAnnotationProps {
  text: string;
  arrowDirection?: 'up-right' | 'down-right' | 'left' | 'none';
  color?: 'pencil' | 'orange' | 'cobalt';
  className?: string;
}

export const HandwrittenAnnotation: React.FC<HandwrittenAnnotationProps> = ({
  text,
  arrowDirection = 'none',
  color = 'pencil',
  className = '',
}) => {
  const colorMap = {
    pencil: 'text-[#5A574E]',
    orange: 'text-[#FF6B35]',
    cobalt: 'text-[#315BFF]',
  };

  return (
    <div className={`inline-flex items-center gap-2 font-hand text-lg select-none ${colorMap[color]} ${className}`}>
      {arrowDirection === 'left' && (
        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" className="stroke-current flex-shrink-0">
          <path d="M 20 7 Q 10 7 2 7 M 6 2 L 2 7 L 6 12" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      <span>✎ {text}</span>

      {arrowDirection === 'up-right' && (
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" className="stroke-current flex-shrink-0">
          <path d="M 2 16 Q 10 14 18 2 M 10 2 L 18 2 L 18 10" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      {arrowDirection === 'down-right' && (
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" className="stroke-current flex-shrink-0">
          <path d="M 2 2 Q 10 4 18 16 M 10 16 L 18 16 L 18 8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
};

export default HandwrittenAnnotation;

