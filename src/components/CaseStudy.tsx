import { motion } from 'motion/react';
import { ArrowRight, Camera, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router';

export function CaseStudy() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-px" style={{ backgroundColor: '#B1643B' }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#B1643B' }}>Client Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl tracking-tight" style={{ color: '#121212' }}>
            Work that moves the needle
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Case Study */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl group"
            style={{ backgroundColor: '#121212', minHeight: '480px' }}
          >
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-700"
              style={{
                backgroundImage: 'url(https://picsum.photos/seed/bipoc-brand-shoot/800/600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(30%) contrast(1.1)',
              }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, rgba(18,18,18,0.98) 0%, rgba(18,18,18,0.6) 50%, rgba(18,18,18,0.3) 100%)',
            }} />

            <div className="relative h-full p-10 flex flex-col justify-end" style={{ minHeight: '480px' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 w-fit"
                style={{ backgroundColor: 'rgba(166,143,89,0.15)', border: '1px solid rgba(166,143,89,0.3)' }}>
                <Camera className="w-3.5 h-3.5" style={{ color: '#A68F59' }} />
                <span className="text-xs tracking-wide" style={{ color: '#A68F59' }}>Brand Photography</span>
              </div>

              <h3 className="text-2xl md:text-3xl mb-3 tracking-tight" style={{ color: '#F5F1EB' }}>
                Niagara Boutique Rebrand
              </h3>
              <p className="text-base mb-8 leading-relaxed" style={{ color: '#E3DCD3', maxWidth: '400px' }}>
                A Niagara-based BIPOC fashion brand needed visuals that matched their premium positioning.
                We delivered a full brand shoot — product, editorial, and lifestyle — in a single half-day session.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t" style={{ borderColor: 'rgba(166,143,89,0.2)' }}>
                {[
                  { value: '1 day', label: 'turnaround' },
                  { value: '80+', label: 'final images' },
                  { value: '3×', label: 'engagement lift' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-light mb-1" style={{ color: '#A68F59' }}>{item.value}</div>
                    <div className="text-xs uppercase tracking-wider" style={{ color: '#7A6F66' }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <blockquote className="text-sm italic mb-6 leading-relaxed" style={{ color: '#E3DCD3' }}>
                "They shot 80+ usable images in 4 hours. My online store sold out within two weeks of the rebrand launch."
              </blockquote>
              <p className="text-xs tracking-widest uppercase mb-6" style={{ color: '#A68F59' }}>
                — Founder, Niagara Fashion Boutique
              </p>
            </div>
          </motion.div>

          {/* Stats + Second Story */}
          <div className="flex flex-col gap-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, value: '3×', label: 'avg. engagement increase after brand shoot', color: '#A68F59' },
                { icon: Star, value: '5.0', label: 'average Google rating across all delivered projects', color: '#B1643B' },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl"
                  style={{ backgroundColor: '#F5F1EB', border: '1px solid rgba(0,0,0,0.06)' }}
                >
                  <card.icon className="w-6 h-6 mb-4" style={{ color: card.color }} />
                  <div className="text-4xl font-light mb-2 tracking-tight" style={{ color: '#121212' }}>
                    {card.value}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#7A6F66' }}>{card.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Second Mini Case Study */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-1 rounded-3xl p-8"
              style={{ backgroundColor: '#F5F1EB', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 w-fit"
                style={{ backgroundColor: 'rgba(177,100,59,0.08)', border: '1px solid rgba(177,100,59,0.2)' }}>
                <span className="text-xs tracking-wide" style={{ color: '#B1643B' }}>Social Media + Strategy</span>
              </div>
              <h3 className="text-xl mb-3 tracking-tight" style={{ color: '#121212' }}>
                Hamilton Entrepreneur — Brand Launch
              </h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#4A3E36' }}>
                Monthly content strategy, caption writing, and bi-weekly photo sessions built a consistent Instagram
                presence from 200 to 1,400 followers in 6 months — organically.
              </p>
              <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <div>
                  <div className="text-2xl font-light" style={{ color: '#B1643B' }}>7×</div>
                  <div className="text-xs uppercase tracking-wider mt-1" style={{ color: '#7A6F66' }}>follower growth · 6 months</div>
                </div>
                <div className="mx-4 h-12 w-px" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }} />
                <div>
                  <div className="text-2xl font-light" style={{ color: '#B1643B' }}>100%</div>
                  <div className="text-xs uppercase tracking-wider mt-1" style={{ color: '#7A6F66' }}>organic — no paid ads</div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-500 hover:shadow-xl hover:scale-[1.02]"
                style={{ backgroundColor: '#121212', color: '#F5F1EB' }}
              >
                Start your project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="mt-3 text-xs" style={{ color: '#7A6F66' }}>
                Free 20-minute discovery call · No obligation
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
