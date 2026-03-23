import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Camera, Video, Palette, TrendingUp, ShoppingBag, Calendar, CheckCircle2, Globe, Users, ArrowRight, Shield, Heart, Award, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CommunityInsights } from '../components/CommunityInsights';
import { TrustSignals } from '../components/TrustSignals';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ErrorBoundaryTest } from '../components/ErrorBoundaryTest';
import { useLanguage } from '../context/LanguageContext';
import heroBackground from '../assets/photo-community-celebration.jpg';
import heroImage1 from '../assets/photo-duo-portrait.jpg';
import heroImage3 from '../assets/photo-duo-bench.jpg';
import teamPhoto from '../assets/photo-team-atrium.jpg';
import communityImage1 from 'figma:asset/03c6badb4ca3300cb50c2776b203004544d11ab3.png';
import communityImage2 from 'figma:asset/cfaeb5454460dc9e5a1c0e3885ebc636b897a0.png';
import communityImage3 from 'figma:asset/46ff4cae0f268156a0e7794e8a387a8d64db55da.png';
import clientImage from '../assets/photo-duo-portrait.jpg';
import photographyImage from 'figma:asset/1897beb0d120d7f8f93a7e51b8bc74e971678137.png';
import brandIdentityImage from 'figma:asset/1253f3bdc503d1419fa74efcfbe871b2538a54b3.png';
import videographyImage from 'figma:asset/9ff6eddef9ca70eee5f510a4e124926ae69f4254.png';
import eventsImage from 'figma:asset/ca956e2128254b147edffd6b45ad64dc6e70ccc0.png';
import socialMediaImage from 'figma:asset/9fa13760753c2875dd7d26a73dd47eccc00a364a.png';
import shopSeenImage from 'figma:asset/aaa4c771f642b9d0ece5cd76547437241dde83d5.png';

export function HomePage() {
  const { t } = useLanguage();
  const features = [
    {
      icon: Camera,
      title: 'Photography',
      description: 'Brand, family, and professional portraiture',
      link: '/services',
      image: photographyImage
    },
    {
      icon: Video,
      title: 'Videography',
      description: 'Cinematic storytelling and event coverage',
      link: '/services',
      image: videographyImage
    },
    {
      icon: Palette,
      title: 'Brand Identity',
      description: 'Visual systems and strategic design',
      link: '/services',
      image: brandIdentityImage
    },
    {
      icon: TrendingUp,
      title: 'Social Media',
      description: 'Content strategy and digital growth',
      link: '/services',
      image: socialMediaImage
    },
    {
      icon: ShoppingBag,
      title: 'Shop SEEN',
      description: 'CREOVA apparel and accessories',
      link: '/shop',
      image: shopSeenImage
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Workshops and creative gatherings',
      link: '/events',
      image: eventsImage
    }
  ];

  const stats = [
    { number: '15+', label: 'Creative Stories Told', icon: Award },
    { number: '5+', label: 'Brands Elevated', icon: Users },
    { number: '10+', label: 'Communities Reached', icon: Globe }
  ];

  return (
    <div className="overflow-hidden" style={{ backgroundColor: '#F5F1EB' }}>
      {/* Hero Section - Cinematic */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#121212' }}>
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 30% 50%, #A68F59 0%, transparent 50%), 
                             radial-gradient(circle at 70% 70%, #B1643B 0%, transparent 60%)` 
          }}></div>
        </div>

        {/* Hero Image */}
        <div className="absolute inset-0 opacity-30">
          <img
            src={heroBackground}
            alt="CREOVA BIPOC Team - Diverse Creative Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ 
            background: 'linear-gradient(to right, rgba(18, 18, 18, 0.95), rgba(18, 18, 18, 0.7))' 
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(166, 143, 89, 0.15)', border: '1px solid rgba(166, 143, 89, 0.3)' }}
              >
                <Award className="w-4 h-4" style={{ color: '#A68F59' }} />
                <span className="text-sm tracking-wide" style={{ color: '#A68F59' }}>Ontario's BIPOC Creative Agency</span>
              </motion.div>

              <div className="mb-8">
                <motion.h1 
                  className="text-6xl md:text-7xl lg:text-8xl mb-8 tracking-tight" 
                  style={{ color: '#F5F1EB', lineHeight: '1.05' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 1 }}
                >
                  CREOVA
                </motion.h1>
                <motion.p 
                  className="text-2xl md:text-3xl mb-3" 
                  style={{ color: '#A68F59', letterSpacing: '0.05em' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {t('home.hero.creative.stories')}
                </motion.p>
                <motion.p 
                  className="text-2xl md:text-3xl" 
                  style={{ color: '#A68F59', letterSpacing: '0.05em' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {t('home.hero.digital.impact')}
                </motion.p>
              </div>
              
              <motion.p 
                className="text-xl mb-12 leading-relaxed max-w-xl" 
                style={{ color: '#E3DCD3' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                {t('home.hero.description')}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Button 
                  size="lg" 
                  className="group px-8 py-6 rounded-xl text-lg border-2 hover:shadow-2xl transition-all duration-500" 
                  style={{ 
                    backgroundColor: '#F5F1EB', 
                    color: '#121212',
                    borderColor: '#F5F1EB'
                  }} 
                  asChild
                >
                  <Link to="/services" className="flex items-center gap-2">
                    {t('home.cta.our.services')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-6 rounded-xl text-lg border-2 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500"
                  style={{ 
                    borderColor: '#A68F59',
                    color: '#A68F59',
                    backgroundColor: 'rgba(166, 143, 89, 0.05)'
                  }}
                  asChild
                >
                  <Link to="/experience">{t('home.cta.explore.community')}</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="px-8 py-6 rounded-xl text-lg border-2 transition-all duration-500"
                  style={{ 
                    borderColor: '#E3DCD3',
                    color: '#7A6F66',
                    backgroundColor: 'transparent'
                  }}
                  asChild
                >
                  <Link to="/contact">{t('home.cta.get.in.touch')}</Link>
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-wrap gap-6 mt-12 pt-8 border-t"
                style={{ borderColor: 'rgba(227, 220, 211, 0.2)' }}
              >
                {[
                  { icon: Award, text: '20+ Projects' },
                  { icon: Heart, text: 'BIPOC-Led' },
                  { icon: CheckCircle2, text: '5-Star Service' }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <badge.icon className="w-5 h-5" style={{ color: '#A68F59' }} />
                    <span className="text-sm" style={{ color: '#E3DCD3' }}>{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Enhanced Image Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block relative"
            >
              <div className="grid grid-cols-3 gap-6">
                {/* Image 1 - Tall Portrait */}
                <motion.div 
                  className="aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.03, rotateZ: -1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={heroImage1}
                    alt="CREOVA Team - Creative Energy"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Image 2 - Tall Portrait (offset down) */}
                <motion.div 
                  className="aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl mt-16"
                  whileHover={{ scale: 1.03, rotateZ: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={teamPhoto}
                    alt="CREOVA Team - Together We Create"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Image 3 - Tall Portrait */}
                <motion.div 
                  className="aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.03, rotateZ: -1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={heroImage3}
                    alt="CREOVA Team - Creative Community"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2" style={{ borderColor: '#A68F59' }}>
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: '#A68F59' }}></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Bar - Enhanced */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#2C2C2C' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `repeating-linear-gradient(90deg, #A68F59 0px, transparent 2px, transparent 60px)` 
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(166, 143, 89, 0.2)' }}
                >
                  <stat.icon className="w-8 h-8" style={{ color: '#A68F59' }} />
                </motion.div>
                <div className="text-5xl md:text-6xl mb-3 group-hover:scale-110 transition-transform duration-300" style={{ color: '#A68F59' }}>
                  {stat.number}
                </div>
                <div className="text-base tracking-wider uppercase" style={{ color: '#E3DCD3' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEEN Platform Teaser */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#121212' }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, #A68F59 0%, transparent 55%),
                             radial-gradient(circle at 20% 70%, #B1643B 0%, transparent 50%)`
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#A68F59' }}
                />
                <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#A68F59' }}>
                  Upcoming Platform
                </span>
              </div>
              <h2
                className="font-bold leading-none mb-6 tracking-tight"
                style={{
                  fontSize: 'clamp(4rem, 10vw, 7rem)',
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(135deg, #F5F1EB 0%, #A68F59 55%, #B1643B 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                SEEN
              </h2>
              <p className="text-base md:text-lg mb-4 leading-relaxed" style={{ color: '#E3DCD3' }}>
                Canada's culturally-centred storytelling platform — where Indigenous, Black Canadian, francophone, and immigrant voices own their stories.
              </p>
              <p className="text-sm mb-10" style={{ color: '#7A6F66' }}>
                Story worlds · Creator IP ownership · CMF-compliant · Multilingual · Audio-first
              </p>
              <Link
                to="/seen"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-medium tracking-wide transition-all duration-500 hover:shadow-2xl group"
                style={{ backgroundColor: '#F5F1EB', color: '#121212' }}
              >
                Explore SEEN
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Story Worlds', desc: 'Immersive cultural narratives with ambient audio' },
                { label: 'Creator First', desc: '100% IP ownership — always' },
                { label: 'Multilingual', desc: 'EN · FR · ES · Indigenous languages' },
                { label: 'CMF Ready', desc: 'Built for Canadian federal funding' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl"
                  style={{ backgroundColor: 'rgba(166, 143, 89, 0.07)', border: '1px solid rgba(166, 143, 89, 0.15)' }}
                >
                  <div className="w-8 h-1 rounded-full mb-3" style={{ backgroundColor: '#A68F59' }} />
                  <div className="text-sm font-medium mb-1" style={{ color: '#F5F1EB' }}>{item.label}</div>
                  <div className="text-xs leading-relaxed" style={{ color: '#7A6F66' }}>{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced with Images */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl mb-6 tracking-tight" style={{ color: '#121212' }}>
              What We Offer
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#4A3E36' }}>
              Comprehensive creative services for brands, entrepreneurs, and cultural storytellers across Canada
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={feature.link}
                  className="group block h-full overflow-hidden rounded-3xl border-2 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E3DCD3'
                  }}
                >
                  {/* Image Header */}
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <feature.icon className="w-10 h-10 text-white" />
                      <ArrowRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl mb-3 tracking-tight group-hover:text-[#A68F59] transition-colors duration-300" style={{ color: '#121212' }}>
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: '#4A3E36' }}>{feature.description}</p>
                    <div className="mt-6 h-1 w-0 group-hover:w-16 transition-all duration-500" style={{ backgroundColor: '#A68F59' }}></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Insights */}
      <CommunityInsights />

      {/* Upcoming Events Section - Innovation Showcase */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#121212' }}>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full" 
               style={{ backgroundColor: '#A68F59', filter: 'blur(100px)' }}></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full" 
               style={{ backgroundColor: '#B1643B', filter: 'blur(100px)' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" 
                 style={{ backgroundColor: 'rgba(166, 143, 89, 0.15)', border: '1px solid rgba(166, 143, 89, 0.3)' }}>
              <Calendar className="w-4 h-4" style={{ color: '#A68F59' }} />
              <span className="text-sm font-medium" style={{ color: '#A68F59' }}>Upcoming Events</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#F5F1EB' }}>
              Join Us at Our Next Event
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#E3DCD3' }}>
              Connect with innovators, researchers, and creative minds at Brock University
            </p>
          </motion.div>

          {/* Event Card - Innovation Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12">
              {/* FREE EVENT Badge - Top */}
              <div className="flex justify-between items-start mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" 
                     style={{ backgroundColor: '#121212' }}>
                  <span className="text-sm font-bold" style={{ color: '#F5F1EB' }}>FREE EVENT</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" 
                     style={{ backgroundColor: '#F5F1EB' }}>
                  <Award className="w-4 h-4" style={{ color: '#121212' }} />
                  <span className="text-xs font-semibold" style={{ color: '#121212' }}>
                    INNOVATION & RESEARCH
                  </span>
                </div>
              </div>

              {/* Event Title */}
              <h3 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: '#121212' }}>
                Innovation Showcase 2026
              </h3>

              {/* Event Description */}
              <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-3xl" style={{ color: '#7A6F66' }}>
                Brock University's annual celebration of research, entrepreneurship, and innovation. 
                CREOVA will be showcasing alongside researchers, startups from the LINCubator, and 
                community partners.
              </p>

              {/* Event Info Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                       style={{ backgroundColor: 'rgba(177, 100, 59, 0.1)' }}>
                    <Calendar className="w-6 h-6" style={{ color: '#B1643B' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: '#121212' }}>Date & Time</p>
                    <p className="text-base" style={{ color: '#7A6F66' }}>February 24, 2026</p>
                    <p className="text-base" style={{ color: '#7A6F66' }}>3:00 PM - 5:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                       style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)' }}>
                    <Globe className="w-6 h-6" style={{ color: '#A68F59' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: '#121212' }}>Location</p>
                    <p className="text-base" style={{ color: '#7A6F66' }}>Rankin Family Pavilion</p>
                    <p className="text-base" style={{ color: '#7A6F66' }}>Brock University</p>
                  </div>
                </div>
              </div>

              {/* Event Includes */}
              <div className="bg-neutral-50 rounded-2xl p-8 mb-10">
                <p className="text-base font-semibold mb-6" style={{ color: '#121212' }}>
                  What's Included:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {['FREE admission', 'CREOVA showcase booth', 'Networking opportunities', 'Innovation Awards ceremony'].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#A68F59' }} />
                      <span className="text-base" style={{ color: '#7A6F66' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex gap-4">
                <Link to="/experience" className="flex-1">
                  <Button 
                    className="w-full h-14 rounded-xl text-base font-semibold group transition-all duration-300 hover:shadow-xl"
                    style={{ 
                      backgroundColor: '#121212', 
                      color: '#F5F1EB',
                    }}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              to="/experience" 
              className="inline-flex items-center gap-2 text-base font-medium hover:gap-3 transition-all duration-300"
              style={{ color: '#A68F59' }}
            >
              View All Events & Workshops
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why CREOVA Section - Enhanced */}
      <section className="py-32 relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="h-1 w-24 mb-10" style={{ backgroundColor: '#B1643B' }}></div>
            <div className="flex flex-col lg:flex-row gap-12 items-start mb-12">
              {/* Left: Image - Smaller */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-full lg:w-80"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={clientImage}
                    alt="Monique Beauregard - Manager of Black Student Success Centre (BSSC) at Brock University"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Card with Client Info */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-6 bg-white p-6 rounded-2xl shadow-xl border-2"
                  style={{ borderColor: '#E3DCD3' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                         style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)' }}>
                      <Heart className="w-6 h-6" style={{ color: '#A68F59' }} />
                    </div>
                    <div>
                      <div className="mb-2" style={{ color: '#121212' }}>Monique Beauregard</div>
                      <div className="text-xs leading-relaxed" style={{ color: '#7A6F66' }}>Manager of Black Student Success Centre (BSSC) at Brock University</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight" style={{ color: '#121212' }}>
                  Crafted with Intention
                </h2>
                <p className="text-xl mb-10 leading-relaxed" style={{ color: '#4A3E36' }}>
                  Every frame, every brand element, every story we tell is designed with purpose, 
                  cultural authenticity, and strategic thinking.
                </p>
                <div className="space-y-5">
                  {[
                    {
                      icon: Globe,
                      title: 'Culturally Rooted',
                      desc: 'We honor heritage and tradition in every visual story we tell'
                    },
                    {
                      icon: TrendingUp,
                      title: 'Strategically Driven',
                      desc: 'Beautiful work designed to achieve measurable impact'
                    },
                    {
                      icon: Users,
                      title: 'Client-Centered',
                      desc: 'Collaborative partnerships built on trust and transparency'
                    },
                    {
                      icon: Award,
                      title: 'Quality Craftsmanship',
                      desc: 'Professional-grade production with meticulous attention to detail'
                    }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group flex gap-4 p-5 rounded-2xl hover:shadow-lg transition-all duration-300"
                      style={{ backgroundColor: '#F5F1EB' }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                           style={{ backgroundColor: 'rgba(177, 100, 59, 0.1)' }}>
                        <item.icon className="w-6 h-6" style={{ color: '#B1643B' }} />
                      </div>
                      <div>
                        <h3 className="text-lg mb-2 group-hover:text-[#A68F59] transition-colors" style={{ color: '#121212' }}>
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: '#4A3E36' }}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-10">
                  <Button 
                    size="lg"
                    className="group px-8 py-6 rounded-xl text-base border-2 hover:shadow-xl hover:scale-105 transition-all duration-300" 
                    style={{ 
                      backgroundColor: '#121212',
                      color: '#F5F1EB',
                      borderColor: '#121212'
                    }} 
                    asChild
                  >
                    <Link to="/community" className="flex items-center gap-2">
                      Learn Our Story
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals & Partners */}
      <TrustSignals />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Error Boundary Test Component - REMOVE BEFORE PRODUCTION */}
      <section className="py-16" style={{ backgroundColor: '#F5F1EB' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" 
                 style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)' }}>
              <span className="text-sm font-semibold" style={{ color: '#DC2626' }}>⚠️ TESTING ONLY - REMOVE BEFORE PRODUCTION</span>
            </div>
            <h2 className="text-3xl mb-4" style={{ color: '#121212' }}>
              Error Boundary Testing
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: '#7A6F66' }}>
              Click the button below to test our enterprise-grade error handling. 
              The app won't crash - instead, you'll see a beautiful recovery screen.
            </p>
          </div>
          <ErrorBoundaryTest />
        </div>
      </section>

      {/* Social Proof / Share Section */}
      <section className="py-20" style={{ backgroundColor: '#F5F1EB' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-white rounded-3xl p-12 border-2 shadow-xl"
            style={{ borderColor: '#E3DCD3' }}
          >
            <Share2 className="w-12 h-12 mx-auto mb-6" style={{ color: '#A68F59' }} />
            <h3 className="text-3xl mb-4" style={{ color: '#121212' }}>
              Love What You See?
            </h3>
            <p className="text-lg mb-8" style={{ color: '#7A6F66' }}>
              Share CREOVA with your network and help us grow the community of creative excellence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                variant="outline"
                className="px-6 py-3 rounded-xl border-2 hover:scale-105 transition-all duration-300"
                style={{ borderColor: '#A68F59', color: '#A68F59' }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'CREOVA - Creative Agency',
                      text: 'Check out this amazing creative agency!',
                      url: window.location.href
                    });
                  }
                }}
              >
                Share This Site
              </Button>
              <Button 
                className="px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: '#121212' }}
                asChild
              >
                <Link to="/contact">Work With Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: '#121212' }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 70% 30%, #A68F59 0%, transparent 50%), 
                             radial-gradient(circle at 30% 70%, #B1643B 0%, transparent 50%)` 
          }}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="h-1 w-24 mx-auto mb-10" style={{ backgroundColor: '#A68F59' }}></div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl mb-8 tracking-tight" style={{ color: '#F5F1EB', lineHeight: '1.1' }}>
              Ready to Create<br />Something Extraordinary?
            </h2>
            <p className="text-xl mb-12 leading-relaxed max-w-3xl mx-auto" style={{ color: '#E3DCD3' }}>
              From brand identity to milestone moments, we bring vision to life with precision and purpose. 
              Let's collaborate to create something that resonates and inspires.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Button 
                size="lg" 
                className="group px-10 py-7 rounded-xl text-xl border-2 hover:shadow-2xl hover:scale-105 transition-all duration-500" 
                style={{ 
                  backgroundColor: '#F5F1EB', 
                  color: '#121212',
                  borderColor: '#F5F1EB'
                }} 
                asChild
              >
                <Link to="/pricing" className="flex items-center gap-2">
                  View Pricing
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-10 py-7 rounded-xl text-xl border-2 backdrop-blur-sm hover:backdrop-blur-md hover:scale-105 transition-all duration-500"
                style={{ 
                  borderColor: '#A68F59',
                  color: '#A68F59',
                  backgroundColor: 'rgba(166, 143, 89, 0.1)'
                }}
                asChild
              >
                <Link to="/contact">Start a Project</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-8 justify-center mt-16 pt-12 border-t"
              style={{ borderColor: 'rgba(227, 220, 211, 0.2)' }}
            >
              {[
                { icon: Users, text: 'BIPOC-Owned' },
                { icon: CheckCircle2, text: '5-Star Reviews' },
                { icon: Globe, text: 'Canada-Wide' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon className="w-6 h-6" style={{ color: '#A68F59' }} />
                  <span className="text-sm tracking-wide" style={{ color: '#E3DCD3' }}>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}