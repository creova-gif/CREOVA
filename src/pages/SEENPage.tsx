import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, Play, Globe, Shield, Mic, BookOpen, Heart, Star, ChevronDown, Lock, Layers, Award } from 'lucide-react';

const storyWorlds = [
  {
    title: "Black Atlantic Canada",
    description: "Oral histories, music, and resistance from the oldest Black communities in North America.",
    lang: "EN / FR",
  },
  {
    title: "Montreal's Jazz Scene",
    description: "The underground sounds and hidden stories of a city that shaped Canadian music forever.",
    lang: "EN / FR",
  },
  {
    title: "Langues Autochtones",
    description: "Indigenous language revitalization through story — Cree, Ojibwe, Michif, and more.",
    lang: "FR / Indigenous",
  },
  {
    title: "First Generation",
    description: "Immigrant stories of arrival, belonging, and becoming Canadian — in every language.",
    lang: "EN / FR / ES",
  }
];

const pillars = [
  {
    icon: BookOpen,
    title: "Story Worlds",
    description: "Not just content — immersive experiences combining narration, ambient audio, and text that transport you into a cultural moment.",
  },
  {
    icon: Lock,
    title: "Creator Ownership",
    description: "You keep full IP rights. Always. SEEN makes no claims on your work. Publish, earn, and own your narrative.",
  },
  {
    icon: Shield,
    title: "Cultural Moderation",
    description: "Content flagging that includes \"cultural appropriation\" as a category, with escalation to cultural advisors — not just automated bans.",
  },
  {
    icon: Globe,
    title: "CMF Compliant",
    description: "Designed to qualify for Canada Media Fund support — tracking Canadian content hours, equity-deserving creator demographics, and multilingual content.",
  },
  {
    icon: Mic,
    title: "Multilingual First",
    description: "English, French, Spanish, and Indigenous languages. Accessibility customization built into onboarding from day one.",
  },
  {
    icon: Layers,
    title: "Audio-First Design",
    description: "Cinematic soundscapes and narration carry the story. SEEN is built for listening as much as reading.",
  }
];

export function SEENPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  const faqs = [
    {
      q: "When does SEEN launch?",
      a: "SEEN is currently in development. We're aiming for a 2025 beta with select creators, followed by a broader Canadian launch. Join the waitlist to be first."
    },
    {
      q: "Can I publish my own stories on SEEN?",
      a: "Yes — SEEN is built for creators first. You retain full IP rights. During our early access phase, we're onboarding a curated cohort of Canadian storytellers."
    },
    {
      q: "What languages does SEEN support?",
      a: "We're building multilingual from the ground up: English, French, Spanish, and select Indigenous languages. Accessibility customization is core to the onboarding experience."
    },
    {
      q: "Is SEEN free for listeners?",
      a: "We're exploring multiple access models. Our priority is ensuring underrepresented communities can access authentic cultural narratives without barriers."
    },
    {
      q: "How is SEEN different from Spotify or Netflix?",
      a: "Those platforms optimize for mass engagement. SEEN is optimized for cultural depth, community ownership, and Canadian representation — backed by CMF-compliant infrastructure."
    }
  ];

  return (
    <div className="overflow-hidden" style={{ backgroundColor: '#121212' }}>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #A68F59 0%, transparent 50%),
                             radial-gradient(circle at 70% 70%, #B1643B 0%, transparent 60%)`
          }} />
        </div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(90deg, #A68F59 0px, transparent 2px, transparent 80px),
                           repeating-linear-gradient(0deg, #A68F59 0px, transparent 2px, transparent 80px)`
        }} />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 mb-10"
          >
            <div className="w-8 h-px" style={{ backgroundColor: '#A68F59' }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#A68F59' }}>
              A CREOVA ORIGINAL PLATFORM
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: '#A68F59' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <h1
              className="font-bold tracking-tight leading-none select-none"
              style={{
                fontSize: 'clamp(6rem, 22vw, 18rem)',
                color: 'transparent',
                backgroundImage: 'linear-gradient(135deg, #F5F1EB 0%, #A68F59 55%, #B1643B 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              SEEN
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl mb-4 tracking-wide"
            style={{ color: '#E3DCD3' }}
          >
            Canada's Cultural Storytelling Platform
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: '#7A6F66' }}
          >
            Where Indigenous, Black Canadian, francophone, and immigrant voices own their stories — and audiences find the authentic Canada that mainstream platforms miss.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase"
              style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)', border: '1px solid rgba(166, 143, 89, 0.3)', color: '#A68F59' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#A68F59' }} />
              In Development
            </span>
            <span className="text-xs" style={{ color: '#4A3E36' }}>
              Beta launching 2025 · Canada-wide 2026
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            {submitted ? (
              <div
                className="py-4 px-6 rounded-2xl text-center"
                style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)', border: '1px solid rgba(166, 143, 89, 0.3)' }}
              >
                <Star className="w-6 h-6 mx-auto mb-2" style={{ color: '#A68F59' }} />
                <p className="text-sm" style={{ color: '#A68F59' }}>You're on the list. We'll reach out first.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    backgroundColor: 'rgba(245, 241, 235, 0.07)',
                    border: '1px solid rgba(227, 220, 211, 0.2)',
                    color: '#F5F1EB',
                    caretColor: '#A68F59'
                  }}
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: '#F5F1EB', color: '#121212' }}
                >
                  Join Waitlist
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-xs mt-3" style={{ color: '#4A3E36' }}>
              No spam. Early access for creators &amp; cultural communities.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2" style={{ borderColor: '#A68F59' }}>
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: '#A68F59' }} />
          </div>
        </motion.div>
      </section>

      {/* The Problem */}
      <section className="py-28 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: '#B1643B' }}>The Gap</p>
            <h2 className="text-3xl md:text-5xl mb-8 leading-tight" style={{ color: '#F5F1EB' }}>
              Canada is one of the world's most multicultural countries.{' '}
              <span style={{ color: '#4A3E36' }}>
                Yet its streaming platforms tell one story.
              </span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#7A6F66' }}>
              Indigenous, Black Canadian, francophone, immigrant, and other equity-deserving communities are chronically underrepresented in the stories Canadians can access. Cultural knowledge — oral histories, community narratives, multilingual stories — gets lost in algorithm-driven platforms optimized for mass engagement.
            </p>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#7A6F66' }}>
              Canadian creators from these communities have no dedicated, safe space to publish and own their work. Many lose IP rights to larger platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Worlds Preview */}
      <section className="py-24 px-4" style={{ backgroundColor: '#121212' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#A68F59' }}>Story Worlds</p>
            <h2 className="text-3xl md:text-5xl" style={{ color: '#F5F1EB' }}>
              Enter the narrative.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {storyWorlds.map((world, i) => (
              <motion.div
                key={world.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative p-6 rounded-3xl overflow-hidden cursor-pointer"
                style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(166, 143, 89, 0.15)' }}
              >
                <div
                  className="absolute inset-0 opacity-10 rounded-3xl"
                  style={{ background: `radial-gradient(circle at 70% 20%, #A68F59, transparent 60%)` }}
                />
                <div className="relative z-10">
                  <div
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] tracking-widest mb-4"
                    style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)', color: '#A68F59', border: '1px solid rgba(166, 143, 89, 0.25)' }}
                  >
                    <Play className="w-2.5 h-2.5" />
                    {world.lang}
                  </div>
                  <h3 className="text-lg font-medium mb-3" style={{ color: '#F5F1EB' }}>{world.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#7A6F66' }}>{world.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs mt-8 tracking-wider" style={{ color: '#4A3E36' }}>
            + MORE WORLDS IN DEVELOPMENT
          </p>
        </div>
      </section>

      {/* 6 Pillars */}
      <section className="py-28 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#B1643B' }}>What SEEN Provides</p>
            <h2 className="text-3xl md:text-5xl" style={{ color: '#F5F1EB' }}>
              Built different. By design.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl"
                style={{ backgroundColor: '#121212', border: '1px solid rgba(166, 143, 89, 0.1)' }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)' }}
                >
                  <pillar.icon className="w-5 h-5" style={{ color: '#A68F59' }} />
                </div>
                <h3 className="text-lg font-medium mb-3" style={{ color: '#F5F1EB' }}>{pillar.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7A6F66' }}>{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-16 px-4" style={{ borderTop: '1px solid rgba(166, 143, 89, 0.15)', borderBottom: '1px solid rgba(166, 143, 89, 0.15)', backgroundColor: '#121212' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: 'CMF', label: 'Canada Media Fund Compliant' },
              { stat: '3+', label: 'Languages at Launch' },
              { stat: '100%', label: 'Creator IP Ownership' },
              { stat: 'BIPOC', label: 'Led & Community-First' }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#A68F59' }}>{item.stat}</div>
                <div className="text-xs tracking-wide" style={{ color: '#7A6F66' }}>{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#A68F59' }}>Questions</p>
            <h2 className="text-3xl md:text-4xl" style={{ color: '#F5F1EB' }}>Common questions about SEEN</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(166, 143, 89, 0.15)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors"
                  style={{ backgroundColor: openFaq === i ? 'rgba(166, 143, 89, 0.06)' : '#121212' }}
                >
                  <span className="text-sm md:text-base font-medium pr-4" style={{ color: '#F5F1EB' }}>{faq.q}</span>
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                    style={{ color: '#A68F59', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6" style={{ backgroundColor: '#121212' }}>
                    <p className="text-sm leading-relaxed" style={{ color: '#7A6F66' }}>{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 text-center relative overflow-hidden" style={{ backgroundColor: '#121212' }}>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #A68F59 0%, transparent 60%)`
          }} />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div
              className="w-16 h-16 mx-auto mb-8 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)' }}
            >
              <Heart className="w-8 h-8" style={{ color: '#A68F59' }} />
            </div>
            <h2 className="text-3xl md:text-5xl mb-6" style={{ color: '#F5F1EB' }}>
              Your story deserves to be seen.
            </h2>
            <p className="text-base mb-10" style={{ color: '#7A6F66' }}>
              Join thousands of Canadians waiting for a platform built for them.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
              {[
                { icon: Award, text: 'Beta 2025' },
                { icon: Globe, text: 'Canada-Wide 2026' },
                { icon: Shield, text: 'CMF Backed' }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <badge.icon className="w-4 h-4" style={{ color: '#A68F59' }} />
                  <span className="text-sm" style={{ color: '#E3DCD3' }}>{badge.text}</span>
                </div>
              ))}
            </div>

            {submitted ? (
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl"
                style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)', border: '1px solid rgba(166, 143, 89, 0.3)', color: '#A68F59' }}
              >
                <Star className="w-4 h-4" />
                You're on the list
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    backgroundColor: 'rgba(245, 241, 235, 0.07)',
                    border: '1px solid rgba(227, 220, 211, 0.15)',
                    color: '#F5F1EB',
                  }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: '#F5F1EB', color: '#121212' }}
                >
                  Get Early Access
                </button>
              </form>
            )}

            <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(166, 143, 89, 0.15)' }}>
              <p className="text-xs mb-3" style={{ color: '#4A3E36' }}>A platform by</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm tracking-widest transition-opacity hover:opacity-70"
                style={{ color: '#E3DCD3' }}
              >
                CREOVA
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
