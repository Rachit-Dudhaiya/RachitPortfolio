import React from 'react';
import styled from 'styled-components';

export interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  barColor?: string;
  className?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onToggle,
  barColor = '#111111',
  className = '',
}) => {
  return (
    <StyledWrapper $barColor={barColor} className={className}>
      <div>
        <input
          id="hamburger-checkbox"
          type="checkbox"
          checked={isOpen}
          onChange={onToggle}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        />
        <label className="toggle" htmlFor="hamburger-checkbox">
          <div id="bar1" className="bars" />
          <div id="bar2" className="bars" />
          <div id="bar3" className="bars" />
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $barColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  #hamburger-checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 28px;
    height: 28px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6.5px;
    transition-duration: 0.3s;
    user-select: none;
  }

  .bars {
    width: 100%;
    height: 2.5px;
    background-color: ${(props) => props.$barColor || '#111111'};
    border-radius: 4px;
    transition-duration: 0.3s;
  }

  .toggle:hover .bars {
    background-color: #000000;
  }

  #hamburger-checkbox:checked + .toggle .bars {
    background-color: #000000;
  }

  #hamburger-checkbox:checked + .toggle #bar2 {
    transform: translateY(9px) rotate(60deg);
    margin-left: 0;
    transform-origin: right;
    transition-duration: 0.3s;
    z-index: 2;
  }

  #hamburger-checkbox:checked + .toggle #bar1 {
    transform: translateY(18px) rotate(-60deg);
    transition-duration: 0.3s;
    transform-origin: left;
    z-index: 1;
  }

  #hamburger-checkbox:checked + .toggle {
    transform: rotate(-90deg);
  }
`;

export default HamburgerMenu;
