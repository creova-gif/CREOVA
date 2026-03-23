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
import photoEvent1 from '../assets/photo-event-market.jpg';
import photoEvent2 from '../assets/photo-event-networking.jpg';
import photoCommunity1 from '../assets/photo-community-convo.jpg';
import photoCommunity2 from '../assets/photo-community-chess.jpg';
import photoWelcome from '../assets/photo-welcome-bash.jpg';
import photoMonique from '../assets/photo-monique.jpg';
import photoServicePhotography from '../assets/photo-carnival-portrait.jpg';
import photoSocialLaptop from '../assets/photo-social-laptop.jpg';
import photoServiceEvents from '../assets/photo-service-events.jpg';
import photoServiceVideography from '../assets/photo-service-videography.jpg';
import photoCollage1 from '../assets/photo-collage-1.jpg';
import photoCollage2 from '../assets/photo-collage-2.jpg';
import photoCollage3 from '../assets/photo-collage-3.jpg';
import photoCollage4 from '../assets/photo-collage-4.jpg';

export function HomePage() {
  const { t } = useLanguage();
  const features = [
    {
      icon: Camera,
      title: 'Photography',
      description: 'Brand, family, and professional portraiture',
      link: '/services',
      image: photoServicePhotography,
      objectPosition: 'center 25%',
      accent: '#A68F59'
    },
    {
      icon: Video,
      title: 'Videography',
      description: 'Cinematic storytelling and event coverage',
      link: '/services',
      image: photoServiceVideography,
      objectPosition: 'center top',
      accent: '#B1643B'
    },
    {
      icon: Palette,
      title: 'Brand Identity',
      description: 'Visual systems and strategic design',
      link: '/services',
      image: photoCommunity2,
      objectPosition: 'center 20%',
      accent: '#A68F59'
    },
    {
      icon: TrendingUp,
      title: 'Social Media',
      description: 'Content strategy and digital growth',
      link: '/services',
      image: photoSocialLaptop,
      objectPosition: 'center top',
      accent: '#B1643B'
    },
    {
      icon: ShoppingBag,
      title: 'Shop SEEN',
      description: 'CREOVA apparel and accessories',
      link: '/shop',
      image: photoEvent1,
      objectPosition: 'center top',
      accent: '#A68F59'
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Workshops and creative gatherings',
      link: '/experience',
      image: photoServiceEvents,
      objectPosition: 'center 40%',
      accent: '#B1643B'
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

      {/* Services Section — Cinematic */}
      <section className="py-32 relative" style={{ backgroundColor: '#121212' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full" style={{
            backgroundImage: `repeating-linear-gradient(90deg, #A68F59 0px, transparent 1px, transparent 80px)`
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px" style={{ backgroundColor: '#A68F59' }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#A68F59' }}>Our Services</span>
            </div>
            <h2 className="text-5xl md:text-6xl tracking-tight leading-tight" style={{ color: '#F5F1EB' }}>
              What We Offer
            </h2>
            <p className="text-xl mt-6 max-w-2xl leading-relaxed" style={{ color: '#7A6F66' }}>
              Comprehensive creative services for brands, entrepreneurs, and cultural storytellers across Canada
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Link
                  to={feature.link}
                  className="group relative block overflow-hidden rounded-3xl transition-all duration-700 hover:shadow-2xl hover:scale-[1.02]"
                  style={{ height: '380px' }}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ objectPosition: feature.objectPosition || 'center center' }}
                  />
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0.5) 50%, rgba(18,18,18,0.1) 100%)'
                  }} />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: 'rgba(166, 143, 89, 0.15)', border: `1px solid rgba(166,143,89,0.3)` }}
                    >
                      <feature.icon className="w-5 h-5" style={{ color: feature.accent }} />
                    </div>
                    <h3 className="text-2xl mb-2 tracking-tight" style={{ color: '#F5F1EB' }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#E3DCD3' }}>
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
                      style={{ color: feature.accent }}>
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="h-px mt-3 w-0 group-hover:w-full transition-all duration-700" style={{ backgroundColor: feature.accent }} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Insights */}
      <CommunityInsights />

      {/* Fall 2026 Community Season */}
      <section className="py-28 relative overflow-hidden" style={{ backgroundColor: '#F5F1EB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Photo collage */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                  <img src={heroImage1} alt="CREOVA community portrait" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,18,18,0.4) 0%, transparent 60%)' }} />
                </div>
                <div className="relative overflow-hidden rounded-3xl aspect-square">
                  <img src={photoEvent2} alt="CREOVA community networking event" className="w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative overflow-hidden rounded-3xl aspect-square">
                  <img src={photoCollage2} alt="CREOVA community members" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,18,18,0.3) 0%, transparent 70%)' }} />
                </div>
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                  <img src={teamPhoto} alt="CREOVA team in atrium" className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px" style={{ backgroundColor: '#B1643B' }} />
                <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#B1643B' }}>Fall 2026 Season</span>
              </div>
              <h2 className="text-4xl md:text-5xl mb-6 tracking-tight leading-tight" style={{ color: '#121212' }}>
                This fall, we bring the community together.
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#4A3E36' }}>
                From brand photography workshops to networking mixers, CREOVA's Fall 2026 season is built for BIPOC creatives and entrepreneurs across Ontario. Real skills, real connections, real impact.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { label: 'September', desc: 'Brand Photography & Social Media Workshops' },
                  { label: 'October', desc: 'Networking Mixers & Vineyard Brand Shoots' },
                  { label: 'November', desc: 'Fall Showcase & Golden Hour Portraits' },
                  { label: 'December', desc: 'CREOVA Holiday Showcase — Greater Niagara' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-2xl"
                    style={{ backgroundColor: 'rgba(166,143,89,0.06)', border: '1px solid rgba(166,143,89,0.12)' }}
                  >
                    <div className="text-sm font-medium w-24 flex-shrink-0 pt-0.5" style={{ color: '#A68F59' }}>{item.label}</div>
                    <div className="text-sm" style={{ color: '#4A3E36' }}>{item.desc}</div>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/experience"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-medium tracking-wide transition-all duration-500 hover:shadow-xl group"
                style={{ backgroundColor: '#121212', color: '#F5F1EB' }}
              >
                View All Fall Events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cinematic Full-Width Photo Strip */}
      <div className="relative overflow-hidden" style={{ height: '340px' }}>
        <img
          src="/community-photo.jpg"
          alt="CREOVA creative community"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(18,18,18,0.55) 0%, rgba(18,18,18,0.2) 40%, rgba(18,18,18,0.2) 60%, rgba(18,18,18,0.55) 100%)'
        }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-sm tracking-[0.5em] uppercase mb-3" style={{ color: '#A68F59' }}>Creative Community</p>
            <p className="text-2xl md:text-3xl font-light italic" style={{ color: '#F5F1EB' }}>
              "Every story deserves to be told beautifully."
            </p>
          </div>
        </div>
      </div>

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
                    src={photoMonique}
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