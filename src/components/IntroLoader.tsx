import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoRed from '../assets/logo-mark-red.png';
import logoBlue from '../assets/logo-mark-blue.png';
import logoWhite from '../assets/logo-mark-white.png';

const SESSION_KEY = 'creova-intro-shown';

// The mark flashes through its brand-colour identities, then locks on the
// white variant. Navy is left out on purpose — it's near-invisible on the
// #121212 backdrop. The last entry is the resting colour.
const CYCLE = [
  { src: logoRed, glow: 'rgba(192,57,43,0.35)' },
  { src: logoBlue, glow: 'rgba(46,64,87,0.45)' },
  { src: logoWhite, glow: 'rgba(212,168,67,0.30)' },
];
const STEP_MS = 300;

/**
 * Plays once per browser tab session, on the very first page load — not on
 * client-side route changes (those are keyed off history, this is keyed off
 * sessionStorage). Server render and the pre-hydration client render both
 * return null, so there's no hydration mismatch; the decision is made in an
 * effect, which only runs in the browser.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle');
  const [step, setStep] = useState(0);

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

    // Advance through the colour cycle, then hold on the final (white) frame.
    const stepper = setInterval(() => {
      setStep((s) => {
        if (s >= CYCLE.length - 1) {
          clearInterval(stepper);
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);

    const hold = STEP_MS * (CYCLE.length - 1) + 550; // reach white, then linger
    const timer = setTimeout(() => setPhase('done'), hold + 500);

    return () => {
      clearInterval(stepper);
      clearTimeout(timer);
    };
  }, []);

  if (phase !== 'playing') return null;

  const current = CYCLE[step];
  const isFinal = step === CYCLE.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ backgroundColor: '#121212' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 } }}
      >
        {/* Colour-matched glow pulse behind the mark */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 520, height: 520, background: `radial-gradient(circle, ${current.glow} 0%, transparent 65%)` }}
          animate={{ scale: isFinal ? [1, 1.15] : 1, opacity: isFinal ? [0.8, 0.4] : 1 }}
          transition={{ duration: isFinal ? 0.7 : 0.3, ease: 'easeOut' }}
        />

        <AnimatePresence mode="popLayout">
          <motion.img
            key={step}
            src={current.src}
            alt=""
            aria-hidden="true"
            className="relative h-16 sm:h-20 w-auto"
            initial={{ opacity: 0, scale: 0.82, rotate: -6 }}
            animate={{
              opacity: 1,
              scale: isFinal ? [1, 1.06, 1] : 1,
              rotate: 0,
            }}
            exit={{ opacity: 0, scale: 1.12, transition: { duration: 0.18 } }}
            transition={{ duration: isFinal ? 0.6 : 0.26, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
