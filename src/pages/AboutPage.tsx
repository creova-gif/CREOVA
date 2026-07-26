import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../i18n/LocaleLink';
import { PageSEO } from '../components/PageSEO';
import { useLanguage } from '../context/LanguageContext';

const SITE_URL = 'https://creova.one';

// Founder's own words. Edit here; the pull-quote is index PULL of the array.
const STORY_EN = [
  'One of the moments that inspired me to build CREOVA came from simply exploring my city.',
  'I visited restaurants, cafés, and local businesses that served incredible food and offered amazing experiences. The quality was there — but their story wasn’t. Their social media was inconsistent, their photography didn’t reflect the experience, and many had little to no marketing presence.',
  'It wasn’t because they lacked passion. Many either couldn’t afford professional creative services or didn’t know how to market themselves effectively in a digital-first world.',
  'I realized there was a gap — not in talent or quality, but in visibility.',
  'Great businesses were being overlooked because they didn’t have access to the branding, content, and promotional tools that larger companies take for granted.',
  'That experience planted the seed for CREOVA.',
  'I wanted to build a company that helps businesses, creators, and communities tell their stories through world-class design, media, technology, and marketing — making high-quality creative work more accessible, not just for those with the biggest budgets, but for everyone with a great idea worth sharing.',
];
const STORY_FR = [
  'L’un des moments qui m’ont inspiré à bâtir CREOVA est venu simplement en explorant ma ville.',
  'J’ai visité des restaurants, des cafés et des commerces locaux qui servaient une nourriture incroyable et offraient des expériences remarquables. La qualité était là — mais pas leur histoire. Leurs réseaux sociaux étaient irréguliers, leur photographie ne reflétait pas l’expérience, et beaucoup n’avaient presque aucune présence marketing.',
  'Ce n’était pas par manque de passion. Beaucoup n’avaient pas les moyens de s’offrir des services créatifs professionnels ou ne savaient pas comment se faire connaître dans un monde d’abord numérique.',
  'J’ai compris qu’il y avait un fossé — non pas de talent ou de qualité, mais de visibilité.',
  'De grandes entreprises passaient inaperçues parce qu’elles n’avaient pas accès aux outils de marque, de contenu et de promotion que les grandes sociétés tiennent pour acquis.',
  'Cette expérience a planté la graine de CREOVA.',
  'Je voulais bâtir une entreprise qui aide les commerces, les créateurs et les communautés à raconter leur histoire grâce à un design, des médias, une technologie et un marketing de classe mondiale — en rendant le travail créatif de haute qualité plus accessible, pas seulement pour ceux qui ont les plus gros budgets, mais pour toute personne ayant une bonne idée à partager.',
];
const PULL = 3; // "I realized there was a gap — not in talent or quality, but in visibility."

export function AboutPage() {
  const fr = useLanguage().language === 'fr';
  const story = fr ? STORY_FR : STORY_EN;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });

  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'AboutPage', name: fr ? 'À propos de CREOVA' : 'About CREOVA', url: `${SITE_URL}/about` },
    {
      '@context': 'https://schema.org', '@type': 'Person', name: 'Justin Mafie', jobTitle: fr ? 'Fondateur' : 'Founder',
      worksFor: { '@type': 'Organization', name: 'CREOVA', url: SITE_URL }, image: `${SITE_URL}/card-justin-panel.jpg`,
    },
  ];

  return (
    <div style={{ backgroundColor: '#121212' }}>
      <PageSEO
        title={fr ? 'À propos — L’histoire de CREOVA' : 'About — The CREOVA Story'}
        description={fr
          ? 'L’histoire derrière CREOVA, par son fondateur Justin Mafie — pourquoi il a bâti une agence créative pour rendre le travail de qualité accessible à tous.'
          : 'The story behind CREOVA, by founder Justin Mafie — why he built a creative agency to make world-class creative work accessible to everyone with a story worth telling.'}
        path="/about"
        ogImage={`${SITE_URL}/card-justin-panel.jpg`}
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 20% 0%, rgba(212,168,67,0.10) 0%, transparent 55%)',
        }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 lg:pt-32">
          <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#D4A843' }}>{fr ? 'L’histoire' : 'The Story'}</span>
          <h1 className="tracking-tight mt-5" style={{ color: '#F8F9FA', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 7vw, 4.8rem)', lineHeight: 1.02 }}>
            {fr ? 'Pourquoi j’ai bâti CREOVA' : 'Why I built CREOVA'}
          </h1>
        </div>
      </section>

      {/* Portrait */}
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl"
          style={{ aspectRatio: '16/9', border: '1px solid rgba(212,168,67,0.15)' }}
        >
          <img src="/card-justin-panel.jpg" alt="Justin Mafie, founder of CREOVA, at the Brock LINC Innovation Showcase" className="w-full h-full object-cover" style={{ objectPosition: 'center 28%' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,18,18,0.5) 0%, transparent 50%)' }} />
          <div className="absolute bottom-5 left-6">
            <p className="text-lg" style={{ color: '#F8F9FA', fontFamily: 'var(--font-display)' }}>Justin Mafie</p>
            <p className="text-xs tracking-[0.2em] uppercase" style={{ color: '#D4A843' }}>{fr ? 'Fondateur — CREOVA' : 'Founder — CREOVA'}</p>
          </div>
        </motion.div>
      </div>

      {/* Story */}
      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="space-y-6">
          {story.map((para, i) =>
            i === PULL ? (
              <blockquote key={i} className="py-3 my-2 pl-6" style={{ borderLeft: '2px solid #B1643B' }}>
                <p className="italic" style={{ color: '#F8F9FA', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.4vw, 2.1rem)', lineHeight: 1.28 }}>{para}</p>
              </blockquote>
            ) : (
              <p key={i} className="leading-relaxed" style={{ color: '#E0E0E0', fontSize: '1.1rem' }}>{para}</p>
            )
          )}
        </div>
        <p className="mt-10 text-sm tracking-[0.2em] uppercase" style={{ color: '#8C7B75' }}>— Justin Mafie, {fr ? 'Fondateur' : 'Founder'}</p>
      </article>

      {/* One company, many brands */}
      <section className="relative py-16 lg:py-24" style={{ backgroundColor: '#0E0E0E' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="tracking-tight mb-6" style={{ color: '#F8F9FA', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            {fr ? 'CREOVA aujourd’hui' : 'CREOVA today'}
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: '#E0E0E0' }}>
            {fr
              ? 'CREOVA est une agence créative et une marque lifestyle. Le studio livre photographie, vidéo, image de marque et design — et a donné naissance à ses propres produits. Une entreprise, mille façons de raconter une histoire.'
              : 'CREOVA is a creative agency and lifestyle brand. The studio delivers photography, videography, brand and design work — and it has grown into products of its own. One company, many ways to tell a story.'}
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: 'CREOVA', tag: fr ? 'L’agence créative' : 'The creative agency', to: '/services' },
              { name: 'VERSE', tag: fr ? 'La marque lifestyle' : 'The lifestyle label', to: '/shop' },
              { name: 'SEEN', tag: fr ? 'Le produit numérique' : 'The digital product', to: '/seen' },
            ].map((b) => (
              <Link key={b.name} to={b.to} className="group block rounded-xl p-5 transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: '#151515', border: '1px solid rgba(212,168,67,0.15)' }}>
                <p className="tracking-tight mb-1 transition-colors group-hover:text-[#D4A843]" style={{ color: '#F8F9FA', fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>{b.name}</p>
                <p className="text-xs" style={{ color: '#8C7B75' }}>{b.tag}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28 text-center" style={{ backgroundColor: '#121212' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="tracking-tight mb-6" style={{ color: '#F8F9FA', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.06 }}>
            {fr ? 'Une bonne idée à partager ?' : 'Have a story worth telling?'}
          </h2>
          <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold tracking-wide transition-all duration-300 hover:-translate-y-px hover:shadow-xl" style={{ backgroundColor: '#B1643B', color: '#F8F9FA' }}>
            {fr ? 'Travaillons ensemble' : 'Let’s work together'}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
