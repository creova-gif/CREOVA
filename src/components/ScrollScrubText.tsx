import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScrollScrubTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollScrubText({ text, className = '', style }: ScrollScrubTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const words = text.split(' ');
  const total = words.length;

  return (
    <div ref={containerRef} className={className} style={style}>
      <p className="flex flex-wrap gap-x-[0.28em] gap-y-1">
        {words.map((word, i) => {
          const start = i / total;
          const end = (i + 1) / total;
          const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
          return (
            <motion.span key={i} style={{ opacity }} className="inline-block">
              {word}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
}
