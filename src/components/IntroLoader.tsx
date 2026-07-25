import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoWhite from '../assets/logo-mark-white.png';

const SESSION_KEY = 'creova-intro-shown';

/**
 * Plays once per browser tab session, on the very first page load — not on
 * client-side route changes (those are keyed off history, this is keyed off
 * sessionStorage). Server render and the pre-hydration client render both
 * return null, so there's no hydration mismatch; the decision is made in an
 * effect, which only runs in the browser.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle');

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (alreadyShown || reduceMotion) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setPhase('done');
      return;
    }

    setPhase('playing');
    sessionStorage.setItem(SESSION_KEY, '1');
    const timer = setTimeout(() => setPhase('done'), 1450);
    return () => clearTimeout(timer);
  }, []);

  if (phase !== 'playing') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none"
        style={{ backgroundColor: '#121212' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 } }}
      >
        <motion.img
          src={logoWhite}
          alt=""
          aria-hidden="true"
          className="h-16 sm:h-20 w-auto"
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.7, 1, 1, 1.06],
            rotate: [-8, 0, 0, 0],
          }}
          transition={{ duration: 1.3, times: [0, 0.4, 0.75, 1], ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
