import React from 'react';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export const Figure: React.FC<FigureProps> = ({
  src,
  alt,
  caption,
  className = '',
}) => {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-rule bg-paper shadow-figure">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[13px] text-pencil leading-normal font-sans">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
