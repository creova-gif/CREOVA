import { motion } from 'motion/react';
import { Award, Star, Users } from 'lucide-react';

export function TrustSignals() {
  const partners = [
    {
      name: 'Brock University',
      description: 'Creative assets for Black History Month & African Heritage Month',
      logo: 'Brock University',
      year: '2024'
    },
    {
      name: 'Black Student Success Centre',
      description: 'Stock photography partnership',
      logo: 'BSSC',
      year: '2025'
    },
    {
      name: 'Black Students Association',
      description: 'Event coverage & creative collaboration',
      logo: 'BSA',
      year: '2024-2025'
    }
  ];

  const testimonials = [
    {
      quote: "CREOVA's work on our Black History Month campaign was exceptional. They understood our vision and delivered beyond expectations.",
      author: "Human Rights & Equity",
      organization: "Brock University",
      rating: 5
    },
    {
      quote: "Professional, creative, and culturally aware. CREOVA brings authenticity to every project.",
      author: "BSSC Team",
      organization: "Black Student Success Centre",
      rating: 5
    },
    {
      quote: "Their photography captures the essence of our community. CREOVA is our go-to creative partner.",
      author: "BSA Leadership",
      organization: "Black Students Association",
      rating: 5
    }
  ];

  return (
    <section className="py-20" style={{ backgroundColor: '#F5F1EB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)', border: '1px solid rgba(166, 143, 89, 0.2)' }}>
            <Award className="w-4 h-4" style={{ color: '#A68F59' }} />
            <span className="text-sm tracking-wide font-medium" style={{ color: '#A68F59' }}>TRUSTED BY LEADING ORGANIZATIONS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#121212' }}>
            Our Partners
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#4A3E36' }}>
            Proud to serve institutions and organizations across Ontario that champion BIPOC excellence
          </p>
        </motion.div>

        {/* Partner Logos Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E3DCD3' }}
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: '#121212', color: '#A68F59' }}>
                {partner.logo}
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#121212' }}>
                {partner.name}
              </h3>
              <p className="text-sm mb-3" style={{ color: '#7A6F66' }}>
                {partner.description}
              </p>
              <div className="text-xs tracking-wide" style={{ color: '#A68F59' }}>
                Since {partner.year}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(177, 100, 59, 0.1)', border: '1px solid rgba(177, 100, 59, 0.2)' }}>
            <Star className="w-4 h-4" style={{ color: '#B1643B' }} />
            <span className="text-sm tracking-wide font-medium" style={{ color: '#B1643B' }}>CLIENT TESTIMONIALS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#121212' }}>
            What Our Partners Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E3DCD3' }}
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#A68F59' }} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg mb-6 italic leading-relaxed" style={{ color: '#4A3E36' }}>
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t pt-4" style={{ borderColor: '#E3DCD3' }}>
                <p className="font-semibold mb-1" style={{ color: '#121212' }}>
                  {testimonial.author}
                </p>
                <p className="text-sm" style={{ color: '#7A6F66' }}>
                  {testimonial.organization}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-3xl"
          style={{ backgroundColor: '#121212' }}
        >
          {[
            { icon: Users, stat: '20+', label: 'Projects Delivered' },
            { icon: Award, stat: '5+', label: 'Partner Organizations' },
            { icon: Star, stat: '5.0', label: 'Average Rating' },
            { icon: Users, stat: '100%', label: 'Client Satisfaction' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <item.icon className="w-8 h-8 mx-auto mb-3" style={{ color: '#A68F59' }} />
              <div className="text-4xl font-bold mb-2" style={{ color: '#F5F1EB' }}>
                {item.stat}
              </div>
              <div className="text-sm tracking-wide" style={{ color: '#E3DCD3' }}>
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
