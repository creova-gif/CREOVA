import { useRef } from 'react';
import { motion, useInView, type Variants } from 'motion/react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type SplitTextTag = 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3';

interface SplitTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  mode?: 'words' | 'chars';
  once?: boolean;
  tag?: SplitTextTag;
}

export function SplitText({
  text,
  className = '',
  style,
  delay = 0,
  stagger = 0.04,
  mode = 'words',
  once = true,
  tag: Tag = 'span',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: '-10% 0px' });
  const prefersReduced = usePrefersReducedMotion();

  const units = mode === 'chars' ? text.split('') : text.split(' ');

  // Reduced-motion variants carry zero-duration, zero-stagger transitions
  // rather than just skipping straight to the visible state — if the
  // preference flips on after mount but before the text scrolls into view,
  // `animate` still transitions from hidden->visible, and without this it
  // would do so using the full staggered timing below.
  const containerVariants: Variants = prefersReduced
    ? { hidden: {}, visible: { transition: { staggerChildren: 0, delayChildren: 0 } } }
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      };

  const unitVariants: Variants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0 } },
      }
    : {
        hidden: {
          opacity: 0,
          y: mode === 'chars' ? 20 : 18,
          rotateX: mode === 'chars' ? 20 : 0,
        },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={{ ...style, display: 'block' }}
    >
      <span className="sr-only">{text}</span>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.22em]"
        style={{ perspective: '800px' }}
        variants={containerVariants}
        initial={prefersReduced ? 'visible' : 'hidden'}
        animate={prefersReduced ? 'visible' : (isInView ? 'visible' : 'hidden')}
        aria-hidden="true"
      >
        {units.map((unit, i) => (
          <motion.span
            key={i}
            variants={unitVariants}
            className="inline-block"
            style={{ transformOrigin: 'bottom center' }}
            aria-hidden="true"
          >
            {unit === '' ? ' ' : unit}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
