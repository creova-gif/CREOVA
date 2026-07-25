import { motion } from 'motion/react';
import logoNavy from '../assets/logo-mark-navy.png';
import logoWhite from '../assets/logo-mark-white.png';
import logoRed from '../assets/logo-mark-red.png';
import logoBlue from '../assets/logo-mark-blue.png';

const MARKS = {
  navy: logoNavy,
  white: logoWhite,
  red: logoRed,
  blue: logoBlue,
} as const;

interface LogoProps {
  variant?: keyof typeof MARKS;
  className?: string;
  /** Plays the entrance animation once on mount instead of just sitting in resting state. */
  animateIn?: boolean;
  /** Adds a subtle hover tilt + scale, meant for interactive contexts like nav links. */
  interactive?: boolean;
}

export function Logo({ variant = 'navy', className = 'h-12 w-auto', animateIn = false, interactive = true }: LogoProps) {
  return (
    <motion.img
      src={MARKS[variant]}
      alt="CREOVA"
      className={className}
      style={{ aspectRatio: '2048 / 1593' }}
      initial={animateIn ? { opacity: 0, scale: 0.85, rotate: -6 } : false}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={interactive ? { scale: 1.06, rotate: -3 } : undefined}
      whileTap={interactive ? { scale: 0.96 } : undefined}
    />
  );
}
