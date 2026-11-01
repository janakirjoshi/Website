import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'pill' | 'text';
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  target,
  rel,
}) => {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * 0.22;
    const deltaY = (clientY - centerY) * 0.22;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#E8590C] text-[#1B2A4A] font-semibold hover:bg-[#d44f08] shadow-sm';
      case 'secondary':
        return 'bg-[#F7F1E6] text-[#1B2A4A] border border-[#1B2A4A]/20 hover:border-[#1B2A4A]/50';
      case 'pill':
        return 'bg-[#1B2A4A] text-[#F7F1E6] hover:bg-[#15213b]';
      case 'text':
        return 'text-[#1B2A4A] hover:text-[#E8590C] underline-offset-4';
      default:
        return 'bg-[#E8590C] text-[#1B2A4A]';
    }
  };

  const baseClasses = `inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base transition-colors duration-200 select-none whitespace-nowrap shrink-0 ${getVariantStyles()} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={baseClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={prefersReducedMotion ? {} : { x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.2 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={prefersReducedMotion ? {} : { x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.2 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};
