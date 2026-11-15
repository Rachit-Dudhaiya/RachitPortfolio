import React from 'react';
import { Link } from 'react-router-dom';

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export const TextLink: React.FC<TextLinkProps> = ({
  href,
  children,
  external = false,
  className = '',
}) => {
  const isExternal = external || href.startsWith('http') || href.startsWith('mailto:');

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noreferrer noopener'}
        className={`text-link ${className}`}
      >
        {children}
        {!href.startsWith('mailto:') && <span>&nbsp;↗</span>}
      </a>
    );
  }

  return (
    <Link to={href} className={`text-link ${className}`}>
      {children}
    </Link>
  );
};
