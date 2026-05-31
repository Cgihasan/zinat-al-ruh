'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** translate-up + fade (mirrors the static build's [data-reveal]). */
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/** blur-in (mirrors [data-blur-in]). */
const blurVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: 'reveal' | 'blur';
  delay?: number;
  /** When true, plays immediately on mount instead of on scroll into view. */
  immediate?: boolean;
}

export function Reveal({
  children,
  as = 'div',
  className,
  variant = 'reveal',
  delay = 0,
  immediate = false,
}: RevealProps) {
  const MotionTag = motion(as as ElementType) as ElementType;
  const variants = variant === 'blur' ? blurVariants : revealVariants;
  const animateProps = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '0px 0px -8% 0px' } };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      variants={variants}
      transition={{ delay }}
      {...animateProps}
    >
      {children}
    </MotionTag>
  );
}

/** Masked single-line slide-up (mirrors .reveal-mask > span[data-reveal-line]). */
export function RevealLine({
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const animateProps = immediate
    ? { animate: { y: '0%' } }
    : { whileInView: { y: '0%' }, viewport: { once: true, margin: '0px 0px -8% 0px' } };
  return (
    <span className="reveal-mask">
      <motion.span
        className={className}
        style={{ display: 'inline-block' }}
        initial={{ y: '110%' }}
        transition={{ duration: 1.2, ease: EASE, delay }}
        {...animateProps}
      >
        {children}
      </motion.span>
    </span>
  );
}
