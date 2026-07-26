import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../i18n/LocaleLink';
import { useLanguage } from '../context/LanguageContext';

/**
 * Founder feature — investors fund people and clients trust faces. Built from
 * verifiable facts only (name on the booth badge, the Brock LINC Innovation
 * Showcase, the Niagara Region, the real "Creative Stories, Digital Impact"
 * tagline). Refine the narrative copy with the founder's own words.
 */
export function FounderSection() {
  const fr = useLanguage().language === 'fr';
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#121212' }}>
      {/* ambient warm glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 60% at 78% 30%, rgba(212,168,67,0.08) 0%, transparent 60%), radial-gradient(ellipse 45% 50% at 10% 90%, rgba(177,100,59,0.06) 0%, transparent 60%)',
      }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-none"
          >
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '4/3', border: '1px solid rgba(212,168,67,0.15)' }}>
              <img
                src="/card-justin-panel.jpg"
                alt="Justin Mafie, founder of CREOVA, at the Brock LINC Innovation Showcase"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 30%' }}
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,18,18,0.55) 0%, transparent 45%)' }} />
              <div className="absolute bottom-4 left-5">
                <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#D4A843', fontFamily: 'var(--font-display)' }}>
                  {fr ? 'Vitrine d’innovation Brock LINC' : 'Brock LINC Innovation Showcase'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px" style={{ backgroundColor: '#D4A843' }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#D4A843' }}>
                {fr ? 'Le fondateur' : 'The Founder'}
              </span>
            </div>

            <h2 className="tracking-tight mb-1" style={{ color: '#F8F9FA', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', lineHeight: 1.05 }}>
              Justin Mafie
            </h2>
            <p className="text-sm tracking-[0.2em] uppercase mb-7" style={{ color: '#8C7B75' }}>
              {fr ? 'Fondateur — CREOVA' : 'Founder — CREOVA'}
            </p>

            <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: '#E0E0E0', maxWidth: '54ch' }}>
              {fr
                ? "CREOVA est née d’une conviction : les organisations, artistes et communautés dirigés par des personnes BIPOC méritent une narration visuelle du calibre que les plus grandes marques tiennent pour acquis. De la Vitrine d’innovation Brock LINC aux événements culturels à travers la région de Niagara, Justin a fait de CREOVA un studio qui documente la culture en temps réel — et lui donne le soin qu’elle mérite."
                : "CREOVA began with one conviction: BIPOC-led organizations, artists and communities deserve visual storytelling at the level the biggest brands take for granted. From the Brock LINC Innovation Showcase to cultural events and campaigns across the Niagara Region, Justin has grown CREOVA into a studio that documents culture as it happens — and gives it the craft it’s owed."}
            </p>

            <blockquote className="pl-5 mb-9" style={{ borderLeft: '2px solid #B1643B' }}>
              <p className="italic" style={{ color: '#F8F9FA', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 2.6vw, 1.7rem)', lineHeight: 1.3 }}>
                {fr ? '« Des histoires créatives. Un impact numérique. »' : '“Creative stories. Digital impact.”'}
              </p>
            </blockquote>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-px hover:shadow-lg"
              style={{ backgroundColor: '#B1643B', color: '#F8F9FA' }}
            >
              {fr ? 'Travaillez avec nous' : 'Work with us'}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
