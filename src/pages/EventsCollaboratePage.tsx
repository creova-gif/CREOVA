import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Calendar, MapPin, Users, Clock, Lightbulb, Handshake, Star, ArrowRight, Award, FileText, ExternalLink, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Captcha } from '../components/Captcha';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { logger } from '../utils/logger';
import bsscImage from 'figma:asset/3fbc46d04b02165989d148069378d1cc20779417.png';
import blsaImage from 'figma:asset/28224c9e999f1dac33e62c4b101cb36d5714b2be.png';
import busuClubsImage from 'figma:asset/7ced599f4d655b3c3d798c5d031d02646d11bfc3.png';
import fbfImage from 'figma:asset/b1f026e5b06da2564ae90baa5031d7c2c5ecfde1.png';

export function EventsCollaboratePage() {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    collaborationType: '',
    projectDescription: '',
    timeline: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    logger.log('CAPTCHA verified successfully');
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
    logger.log('CAPTCHA expired, please verify again');
    toast.error('Security verification expired. Please verify again.');
  };

  const handleCaptchaError = (error: string) => {
    setCaptchaToken(null);
    console.error('CAPTCHA error:', error);
    toast.error('Security Verification Issue', {
      description: error || 'Unable to verify. Please refresh and try again.'
    });
  };

  const upcomingEvents = [
    {
      id: 'winter-brand-photography',
      name: 'Brand Photography Workshop for Entrepreneurs',
      date: 'March 10, 2026',
      time: '2:00 PM - 5:00 PM EST',
      location: 'St. Catharines, ON (In-Person)',
      capacity: '15 spots',
      price: 125,
      image: 'https://images.unsplash.com/photo-1698663371785-677d13f21570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBzdHVkaW8lMjBzZXR1cHxlbnwxfHx8fDE3Njc4MzY1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Learn how to create stunning brand photos for your business. Hands-on workshop covering lighting, composition, and editing.',
      includes: ['3-hour workshop', 'Workbook & templates', 'Light refreshments', 'Certificate of completion']
    },
    {
      id: 'social-media-masterclass',
      name: 'Social Media Content Creation Masterclass',
      date: 'March 24, 2026',
      time: '6:00 PM - 8:30 PM EST',
      location: 'Virtual (Zoom)',
      capacity: '50 spots',
      price: 75,
      image: 'https://images.unsplash.com/photo-1602177281687-c8900253495b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMHdvbWFuJTIwc29jaWFsJTIwbWVkaWElMjBwaG9uZXxlbnwxfHx8fDE3NjMyNTU1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Master the art of creating scroll-stopping content for Instagram, TikTok, and Pinterest. Includes content planning and strategy.',
      includes: ['2.5-hour virtual class', 'Content calendar template', 'Q&A session', 'Recording access for 30 days']
    },
    {
      id: 'bipoc-creatives-winter-mixer',
      name: 'BIPOC Creatives Winter Networking Mixer',
      date: 'April 7, 2026',
      time: '7:00 PM - 10:00 PM EST',
      location: 'Niagara Falls, ON (In-Person)',
      capacity: '40 spots',
      price: 35,
      image: 'https://images.unsplash.com/photo-1714978444599-6f9159ebdee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMGZyaWVuZHMlMjBuZXR3b3JraW5nJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzYzMjU1NTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Connect with fellow BIPOC photographers, designers, videographers, and entrepreneurs in Greater Niagara.',
      includes: ['Networking event', 'Food & beverages', 'Portfolio reviews', 'Swag bag']
    },
    {
      id: 'lightroom-editing-workshop',
      name: 'Lightroom Editing for Photographers',
      date: 'April 21, 2026',
      time: '1:00 PM - 4:00 PM EST',
      location: 'Virtual (Zoom)',
      capacity: '30 spots',
      price: 95,
      image: 'https://images.unsplash.com/photo-1648421829913-b0c2b117b297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMG1hbiUyMGVkaXRpbmclMjBwaG90b3MlMjBpUGFkJTIwdGFibGV0fGVufDF8fHx8MTc2NTU2NTQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Deep dive into Adobe Lightroom. Learn professional editing workflows, color grading, and how to create your signature style.',
      includes: ['3-hour live class', 'RAW practice files', 'Preset pack', 'Lifetime recording access']
    },
    {
      id: 'pricing-strategies-workshop',
      name: 'Pricing Your Creative Services Workshop',
      date: 'May 5, 2026',
      time: '10:00 AM - 12:00 PM EST',
      location: 'Virtual (Zoom)',
      capacity: '25 spots',
      price: 65,
      image: 'https://images.unsplash.com/photo-1610251064409-8d94b0939629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMGVudHJlcHJlbmV1ciUyMGJ1c2luZXNzJTIwcGxhbm5pbmd8ZW58MXx8fHwxNzYzMjU1NTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Stop undercharging! Learn how to price your photography, design, and creative services for profitability and value.',
      includes: ['2-hour workshop', 'Pricing calculator template', 'Pricing guide template', 'Q&A session']
    },
    {
      id: 'spring-creative-showcase',
      name: 'CREOVA Spring Creative Showcase',
      date: 'May 19, 2026',
      time: '6:00 PM - 10:00 PM EST',
      location: 'St. Catharines, ON (In-Person)',
      capacity: '100 spots',
      price: 45,
      image: 'https://images.unsplash.com/photo-1552793084-49132af00ff1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMGFydGlzdHMlMjBleGhpYml0aW9uJTIwZ2FsbGVyeXxlbnwxfHx8fDE3NjMyNTU1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Celebrate BIPOC creativity! Exhibition featuring local photographers, artists, and designers. Live music, art, food, and networking.',
      includes: ['Gallery access', 'Live performances', 'Food & drinks', 'Vendor marketplace']
    },
    {
      id: 'summer-kickoff-niagara',
      name: 'Summer Kickoff: Niagara Waterfront Photo Walk',
      date: 'June 2, 2026',
      time: '2:00 PM - 5:00 PM EST',
      location: 'Niagara-on-the-Lake, ON (In-Person)',
      capacity: '20 spots',
      price: 45,
      image: 'https://images.unsplash.com/photo-1536747582722-23aec5cf28d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMHlvdXRoJTIwZ3JvdXAlMjBwaG90b2dyYXBoeSUyMHdvcmtzaG9wJTIwQ2Fub24lMjBjYW1lcmFzfGVufDF8fHx8MTc2NTU2NTU1OXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Capture the beauty of Niagara in summer! Guided photo walk along the waterfront with tips on landscape and portrait photography.',
      includes: ['3-hour guided walk', 'Photography tips', 'Light refreshments', 'Group photo critique']
    },
    {
      id: 'sunset-sessions-grimsby',
      name: 'Sunset Sessions: Portrait Photography at the Beach',
      date: 'June 16, 2026',
      time: '6:00 PM - 9:00 PM EST',
      location: 'Grimsby Beach, ON (In-Person)',
      capacity: '15 spots',
      price: 85,
      image: 'https://images.unsplash.com/photo-1601945447479-33e8d220a935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMHdvbWFuJTIwYmVhY2glMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njc4MzYxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Master golden hour portrait photography at stunning Grimsby Beach. Learn natural light techniques and posing for summer shoots.',
      includes: ['3-hour sunset workshop', 'Beach photo session', 'Editing guide', 'Certificate of completion']
    },
    {
      id: 'outdoor-videography-summer',
      name: 'Outdoor Videography: Summer in Niagara Falls',
      date: 'June 30, 2026',
      time: '10:00 AM - 1:00 PM EST',
      location: 'Niagara Falls, ON (In-Person)',
      capacity: '18 spots',
      price: 95,
      image: 'https://images.unsplash.com/photo-1660066895592-35b7b1039b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMHZpZGVvZ3JhcGhlciUyMG91dGRvb3IlMjBuYXR1cmUlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzY1NTY1NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Learn to shoot cinematic outdoor video content in summer. Includes filming techniques, stabilization, and audio tips for outdoor shoots.',
      includes: ['3-hour workshop', 'Equipment demos', 'Footage review', 'Editing cheat sheet']
    },
    {
      id: 'vineyard-brand-shoot',
      name: 'Brand Photography: Summer Vineyard Edition',
      date: 'July 14, 2026',
      time: '1:00 PM - 4:00 PM EST',
      location: 'Niagara Wine Country, ON (In-Person)',
      capacity: '12 spots',
      price: 145,
      image: 'https://images.unsplash.com/photo-1603400901809-428fc7789849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMHdvbWFuJTIwd2luZSUyMHZpbmV5YXJkJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjMyNTU1MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Create stunning summer brand content at a picturesque Niagara vineyard. Perfect for entrepreneurs and small business owners.',
      includes: ['3-hour vineyard session', 'Location access included', 'Editing workshop', 'Wine tasting']
    },
    {
      id: 'bipoc-summer-social',
      name: 'BIPOC Creatives Summer Waterfront Social',
      date: 'July 28, 2026',
      time: '5:00 PM - 8:00 PM EST',
      location: 'St. Catharines Waterfront, ON (In-Person)',
      capacity: '35 spots',
      price: 40,
      image: 'https://images.unsplash.com/photo-1748457306123-045e754fce74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbGFjayUyMHBlb3BsZSUyMGJlYWNoJTIwTWlhbWklMjBzdW1tZXIlMjBmdW58ZW58MXx8fHwxNzY1NTY1MDc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Connect with fellow BIPOC creatives at a stunning waterfront summer social. Networking, collaboration, and summer celebrations!',
      includes: ['Waterfront networking', 'BBQ & refreshments', 'Portfolio reviews', 'Swag bag']
    },
    {
      id: 'summer-showcase-niagara',
      name: 'CREOVA Summer Showcase: Greater Niagara Edition',
      date: 'August 11, 2026',
      time: '4:00 PM - 9:00 PM EST',
      location: 'Niagara Falls, ON (In-Person)',
      capacity: '100 spots',
      price: 50,
      image: 'https://images.unsplash.com/photo-1759807859616-54237daa894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYXJpYmJlYW4lMjBjYXJuaXZhbCUyMGZlc3RpdmFsJTIwcGFyYWRlfGVufDF8fHx8MTc2NzgzNjc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Celebrate summer and BIPOC creativity! Outdoor art exhibition, live performances, food vendors, and networking at Niagara Falls.',
      includes: ['Outdoor gallery access', 'Live music & performances', 'Food trucks & drinks', 'Vendor marketplace']
    }
  ];

  const collaborationTypes = [
    {
      icon: Users,
      title: 'Brand Partnerships',
      description: 'Partner with CREOVA for co-branded content, campaigns, or creative activations',
      examples: ['Co-branded photo series', 'Social media campaigns', 'Product launches', 'Fashion capsule collaborations']
    },
    {
      icon: Lightbulb,
      title: 'Creative Projects',
      description: 'Collaborate on artistic projects, exhibitions, or cultural initiatives',
      examples: ['Photography exhibitions', 'Documentary projects', 'Art installations', 'Community storytelling initiatives']
    },
    {
      icon: Handshake,
      title: 'Community Initiatives',
      description: 'Work together on workshops, events, or programs that support BIPOC creatives',
      examples: ['Free storytelling workshops', 'Skill-building panels', 'Mentorship programs', 'Cultural celebration events']
    },
    {
      icon: Star,
      title: 'Custom Collaborations',
      description: 'Have a unique idea? Let\'s explore how we can work together',
      examples: ['Podcast features', 'Educational content', 'Research projects', 'Creative retreats', 'Sponsored content']
    }
  ];

  const previousCollaborations = [
    {
      title: 'Black Student Success Centre',
      partner: 'Brock University',
      image: bsscImage,
      description: 'Stock photography for the BSSC - February 2025',
      date: 'February 2025',
      social: {
        instagram: 'https://www.instagram.com/brockbssc/',
        website: 'https://brocku.ca/student-life-success/equity-diversity-inclusion/black-student-success-centre/'
      }
    },
    {
      title: 'Black Students Association',
      partner: 'Brock University - BLSA',
      image: blsaImage,
      description: 'New executive team photos for 2025/26 school year at Cairn Complex',
      date: 'September 2025',
      social: {
        instagram: 'https://www.instagram.com/brockblsa/',
        website: 'https://brocku.ca/'
      }
    },
    {
      title: 'Black BUSU Clubs',
      partner: 'Brock University',
      image: busuClubsImage,
      description: 'Welcome Bash event photography - welcoming new Black students to Brock campus',
      date: '2025',
      social: {
        instagram: 'https://www.instagram.com/brocku/',
        website: 'https://busu.net/'
      }
    },
    {
      title: 'Future Black Female',
      partner: 'NGO - Niagara',
      image: fbfImage,
      description: 'Stock photography for upcoming podcast launch and research initiatives',
      date: 'October 2025',
      social: {
        instagram: 'https://www.instagram.com/futureblackfemale_/',
        website: 'https://www.futureblackfemale.com/'
      }
    }
  ];

  const handleBuyTicket = (event: typeof upcomingEvents[0]) => {
    // Special handling for Innovation Showcase 2026 - external registration
    if (event.id === 'innovation-showcase-2026') {
      window.open('https://brocku.ca/linc/innovation-showcase/', '_blank');
      return;
    }

    addItem({
      id: event.id,
      name: event.name,
      price: event.price,
      type: 'event',
      image: event.image
    });

    toast.success('Ticket added to cart!', {
      description: event.price > 0 
        ? `${event.name} - $${event.price} CAD (plus 13% HST at checkout)`
        : `${event.name} - FREE`
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // CAPTCHA validation
    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA verification');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-feacf0d8/submit-collaboration`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ ...formData, captchaToken })
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success('Collaboration request submitted!', {
          description: 'We\'ll review your proposal and get back to you within 2-3 business days.'
        });
        setFormData({
          name: '',
          email: '',
          organization: '',
          collaborationType: '',
          projectDescription: '',
          timeline: '',
          budget: ''
        });
      } else {
        throw new Error(data.error || 'Failed to submit collaboration request');
      }
    } catch (error) {
      console.error('Error submitting collaboration form:', error);
      toast.error('Failed to submit request', {
        description: 'Please try again or email us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offset = 100; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#F5F1EB' }}>
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#121212' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 20% 50%, #A68F59 0%, transparent 50%), 
                             radial-gradient(circle at 80% 80%, #B1643B 0%, transparent 50%)` 
          }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-1 w-20 mx-auto mb-8" style={{ backgroundColor: '#A68F59' }}></div>
            <h1 className="text-5xl md:text-6xl mb-6 tracking-tight" style={{ color: '#F5F1EB', lineHeight: '1.1' }}>
              Events, Workshops &<br />Creative Collaborations
            </h1>
            <p className="text-xl mb-6 leading-relaxed" style={{ color: '#E3DCD3' }}>
              Join CREOVA's creative community through professional workshops, networking events,<br className="hidden md:block" /> and meaningful partnerships across Ontario
            </p>
            <div className="flex flex-wrap gap-3 justify-center items-center text-sm" style={{ color: '#A68F59' }}>
              <span>Photography Workshops</span>
              <span>•</span>
              <span>BIPOC Creative Events</span>
              <span>•</span>
              <span>Brand Partnerships</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Navigation Cards - Seamless Design */}
      <section className="py-20 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px" style={{ 
          background: 'linear-gradient(90deg, transparent, #E3DCD3, transparent)' 
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl mb-3" style={{ color: '#121212' }}>
              Explore Our Offerings
            </h2>
            <p className="text-lg" style={{ color: '#7A6F66' }}>
              Choose your path to creative growth and collaboration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Workshops */}
            <motion.button
              onClick={() => scrollToSection('#workshops')}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="group relative bg-white rounded-2xl p-8 border-2 overflow-hidden text-left transition-all duration-500 hover:shadow-2xl"
              style={{ borderColor: '#E3DCD3' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#121212';
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E3DCD3';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                   style={{ background: 'linear-gradient(135deg, #121212 0%, #A68F59 100%)' }}></div>
              
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" 
                     style={{ backgroundColor: '#121212' }}>
                  <Calendar className="w-7 h-7" style={{ color: '#F5F1EB' }} />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: '#121212' }}>
                  Upcoming Workshops
                </h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: '#7A6F66' }}>
                  Professional photography & content creation workshops across Ontario
                </p>
                <div className="flex items-center text-sm group-hover:translate-x-2 transition-all duration-300" style={{ color: '#A68F59' }}>
                  <span className="mr-2">Explore Events</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.button>

            {/* Card 2: Partnerships */}
            <motion.button
              onClick={() => scrollToSection('#collaboration')}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="group relative bg-white rounded-2xl p-8 border-2 overflow-hidden text-left transition-all duration-500 hover:shadow-2xl"
              style={{ borderColor: '#E3DCD3' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#B1643B';
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E3DCD3';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                   style={{ background: 'linear-gradient(135deg, #B1643B 0%, #A68F59 100%)' }}></div>
              
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" 
                     style={{ backgroundColor: '#B1643B' }}>
                  <Handshake className="w-7 h-7" style={{ color: '#F5F1EB' }} />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: '#121212' }}>
                  Partnership Opportunities
                </h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: '#7A6F66' }}>
                  Collaborate on brand campaigns, creative projects & community initiatives
                </p>
                <div className="flex items-center text-sm group-hover:translate-x-2 transition-all duration-300" style={{ color: '#B1643B' }}>
                  <span className="mr-2">View Opportunities</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.button>

            {/* Card 3: Previous Work */}
            <motion.button
              onClick={() => scrollToSection('#past-work')}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="group relative bg-white rounded-2xl p-8 border-2 overflow-hidden text-left transition-all duration-500 hover:shadow-2xl"
              style={{ borderColor: '#E3DCD3' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#A68F59';
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E3DCD3';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
                   style={{ background: 'linear-gradient(135deg, #A68F59 0%, #121212 100%)' }}></div>
              
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" 
                     style={{ backgroundColor: '#A68F59' }}>
                  <Award className="w-7 h-7" style={{ color: '#F5F1EB' }} />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: '#121212' }}>
                  Previous Collaborations
                </h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: '#7A6F66' }}>
                  Trusted partnerships with universities, NGOs & community organizations
                </p>
                <div className="flex items-center text-sm group-hover:translate-x-2 transition-all duration-300" style={{ color: '#A68F59' }}>
                  <span className="mr-2">See Our Work</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.button>

            {/* Card 4: Submit Proposal - Special Design */}
            <motion.button
              onClick={() => scrollToSection('#contact-form')}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="group relative rounded-2xl p-8 border-2 overflow-hidden text-left transition-all duration-500 hover:shadow-2xl"
              style={{ 
                backgroundColor: '#121212',
                borderColor: '#121212'
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                   style={{ background: 'linear-gradient(135deg, #A68F59 0%, #B1643B 100%)' }}></div>
              
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" 
                     style={{ backgroundColor: 'rgba(245, 241, 235, 0.1)' }}>
                  <FileText className="w-7 h-7" style={{ color: '#F5F1EB' }} />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: '#F5F1EB' }}>
                  Submit Proposal
                </h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: '#E3DCD3' }}>
                  Have an idea? Tell us about your project or partnership vision
                </p>
                <div className="flex items-center text-sm group-hover:translate-x-2 transition-all duration-300" style={{ color: '#A68F59' }}>
                  <span className="mr-2">Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Upcoming Workshops - Enhanced Cards */}
      <section id="workshops" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="h-1 w-20 mx-auto mb-6" style={{ backgroundColor: '#A68F59' }}></div>
            <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#121212' }}>
              Upcoming Workshops & Events
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#7A6F66' }}>
              Professional photography workshops, content creation masterclasses, and networking events for BIPOC creatives in Toronto, Hamilton, Niagara Falls, and St. Catharines
            </p>
          </motion.div>

          <div className="space-y-8">
            {upcomingEvents.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-white border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                style={{ borderColor: '#E3DCD3' }}
              >
                <div className="md:flex">
                  <div className="md:w-2/5 relative overflow-hidden bg-neutral-100">
                    <ImageWithFallback 
                      src={event.image} 
                      alt={`${event.name} - CREOVA Workshop in Ontario`}
                      className="w-full h-full object-cover aspect-[4/3] md:aspect-auto group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="md:w-3/5 p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center text-xs px-3 py-1.5 rounded-full" 
                            style={{ backgroundColor: '#121212', color: '#F5F1EB' }}>
                        {event.location.includes('Virtual') ? 'Virtual Workshop' : 'In-Person Event'}
                      </span>
                      <span className="inline-flex items-center text-xs px-3 py-1.5 rounded-full" 
                            style={{ backgroundColor: '#F5F1EB', color: '#121212' }}>
                        {event.capacity}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl mb-4" style={{ color: '#121212' }}>
                      {event.name}
                    </h3>
                    <p className="mb-6 leading-relaxed" style={{ color: '#7A6F66' }}>
                      {event.description}
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" 
                             style={{ backgroundColor: '#F5F1EB' }}>
                          <Calendar className="w-5 h-5" style={{ color: '#121212' }} />
                        </div>
                        <div>
                          <div className="text-xs mb-0.5" style={{ color: '#A68F59' }}>Date</div>
                          <div className="text-sm" style={{ color: '#121212' }}>{event.date}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" 
                             style={{ backgroundColor: '#F5F1EB' }}>
                          <Clock className="w-5 h-5" style={{ color: '#121212' }} />
                        </div>
                        <div>
                          <div className="text-xs mb-0.5" style={{ color: '#A68F59' }}>Time</div>
                          <div className="text-sm" style={{ color: '#121212' }}>{event.time}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" 
                             style={{ backgroundColor: '#F5F1EB' }}>
                          <MapPin className="w-5 h-5" style={{ color: '#121212' }} />
                        </div>
                        <div>
                          <div className="text-xs mb-0.5" style={{ color: '#A68F59' }}>Location</div>
                          <div className="text-sm" style={{ color: '#121212' }}>{event.location}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" 
                             style={{ backgroundColor: '#F5F1EB' }}>
                          <Users className="w-5 h-5" style={{ color: '#121212' }} />
                        </div>
                        <div>
                          <div className="text-xs mb-0.5" style={{ color: '#A68F59' }}>Capacity</div>
                          <div className="text-sm" style={{ color: '#121212' }}>{event.capacity}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: '#F5F1EB' }}>
                      <p className="text-sm mb-3" style={{ color: '#121212' }}>What's Included:</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {event.includes.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#A68F59' }} />
                            <span className="text-sm" style={{ color: '#7A6F66' }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t" 
                         style={{ borderColor: '#E3DCD3' }}>
                      <div>
                        <div className="text-4xl mb-1" style={{ color: '#121212' }}>
                          ${event.price}
                        </div>
                        <div className="text-sm" style={{ color: '#7A6F66' }}>
                          {event.price === 0 ? 'FREE event' : 'CAD per person + 13% HST'}
                        </div>
                      </div>
                      <Button 
                        size="lg" 
                        onClick={() => handleBuyTicket(event)}
                        className="group/btn px-8 py-6 rounded-xl transition-all duration-300"
                        style={{ backgroundColor: '#121212' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#A68F59';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#121212';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <span className="flex items-center gap-2">
                          Register Now
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section - Enhanced */}
      <section className="py-20" style={{ backgroundColor: '#F5F1EB' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl mb-4" style={{ color: '#121212' }}>
              Why Join CREOVA's Creative Community?
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'BIPOC Creative Network',
                description: 'Connect with photographers, designers, and entrepreneurs building meaningful careers in the creative industry'
              },
              {
                icon: Calendar,
                title: 'Expert-Led Workshops',
                description: 'Learn from working professionals with real industry experience in photography, branding, and content creation'
              },
              {
                icon: MapPin,
                title: 'Accessible Locations',
                description: 'Virtual and in-person events across Ontario including Toronto, Hamilton, Niagara Falls, and St. Catharines'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" 
                     style={{ backgroundColor: '#121212' }}>
                  <item.icon className="w-8 h-8" style={{ color: '#F5F1EB' }} />
                </div>
                <h3 className="text-xl mb-3" style={{ color: '#121212' }}>
                  {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#7A6F66' }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Opportunities - Enhanced */}
      <section id="collaboration" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="h-1 w-20 mx-auto mb-6" style={{ backgroundColor: '#B1643B' }}></div>
            <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#121212' }}>
              Partner with CREOVA
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#7A6F66' }}>
              From brand partnerships to community initiatives, we collaborate with organizations, businesses, and creatives who share our commitment to amplifying BIPOC voices and cultural storytelling
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {collaborationTypes.map((type, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-white border-2 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500"
                style={{ borderColor: '#E3DCD3' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#B1643B';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E3DCD3';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500" 
                     style={{ backgroundColor: 'rgba(177, 100, 59, 0.1)' }}>
                  <type.icon className="w-7 h-7" style={{ color: '#B1643B' }} />
                </div>
                <h3 className="text-2xl mb-4" style={{ color: '#121212' }}>
                  {type.title}
                </h3>
                <p className="mb-6 leading-relaxed" style={{ color: '#7A6F66' }}>
                  {type.description}
                </p>
                <div>
                  <p className="text-sm mb-3" style={{ color: '#A68F59' }}>Examples:</p>
                  <div className="space-y-2">
                    {type.examples.map((example, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#A68F59' }}></div>
                        <span className="text-sm" style={{ color: '#7A6F66' }}>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Collaborations - Enhanced */}
      <section id="past-work" className="py-24" style={{ backgroundColor: '#F5F1EB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="h-1 w-20 mx-auto mb-6" style={{ backgroundColor: '#A68F59' }}></div>
            <h2 className="text-4xl md:text-5xl mb-4" style={{ color: '#121212' }}>
              Trusted by Community and Organizations
            </h2>
            <p className="text-xl" style={{ color: '#7A6F66' }}>
              CREOVA has partnered with universities, NGOs, and community organizations across Ontario
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {previousCollaborations.map((collab, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-video bg-neutral-100 overflow-hidden">
                  <img 
                    src={collab.image} 
                    alt={`${collab.title} - CREOVA Collaboration`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-6">
                  <time className="text-xs mb-2 block" style={{ color: '#A68F59' }}>
                    {collab.date}
                  </time>
                  <h3 className="text-xl mb-2" style={{ color: '#121212' }}>
                    {collab.title}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: '#B1643B' }}>
                    {collab.partner}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#7A6F66' }}>
                    {collab.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Process - Enhanced */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4" style={{ color: '#121212' }}>
              Our Collaboration Process
            </h2>
            <p className="text-xl" style={{ color: '#7A6F66' }}>
              A simple, transparent approach to working together
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Initial Review & Assessment',
                description: 'We review your proposal within 2-3 business days and assess alignment with our values, mission, and current capacity'
              },
              {
                step: '2',
                title: 'Discovery Call',
                description: 'If it\'s a strong fit, we\'ll schedule a video call to discuss your vision, goals, timeline, and budget in detail'
              },
              {
                step: '3',
                title: 'Custom Proposal & Agreement',
                description: 'We create a tailored proposal outlining project scope, deliverables, timeline, and pricing with a professional service agreement'
              },
              {
                step: '4',
                title: 'Collaboration Launch',
                description: 'We begin the project with clear communication, regular check-ins, and milestone-based delivery to ensure quality results'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex gap-6 p-6 rounded-2xl hover:shadow-lg transition-all duration-500"
                style={{ backgroundColor: '#F5F1EB' }}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" 
                     style={{ backgroundColor: '#121212', color: '#F5F1EB' }}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-2" style={{ color: '#121212' }}>
                    {item.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: '#7A6F66' }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Form - Enhanced */}
      <section id="contact-form" className="py-24" style={{ backgroundColor: '#F5F1EB' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="h-1 w-20 mx-auto mb-6" style={{ backgroundColor: '#121212' }}></div>
            <h2 className="text-4xl mb-4" style={{ color: '#121212' }}>
              Submit a Collaboration Proposal
            </h2>
            <p className="text-xl" style={{ color: '#7A6F66' }}>
              Tell us about your project, partnership idea, or event concept and let's explore how we can work together
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-xl"
          >
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-sm mb-2 block" style={{ color: '#121212' }}>
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="rounded-xl border-2 focus:border-[#A68F59] transition-colors"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm mb-2 block" style={{ color: '#121212' }}>
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="rounded-xl border-2 focus:border-[#A68F59] transition-colors"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="organization" className="text-sm mb-2 block" style={{ color: '#121212' }}>
                  Organization/Brand Name
                </Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Your organization, company, or personal brand"
                  className="rounded-xl border-2 focus:border-[#A68F59] transition-colors"
                />
              </div>

              <div>
                <Label htmlFor="collaborationType" className="text-sm mb-2 block" style={{ color: '#121212' }}>
                  Type of Collaboration *
                </Label>
                <select
                  id="collaborationType"
                  required
                  value={formData.collaborationType}
                  onChange={(e) => setFormData({ ...formData, collaborationType: e.target.value })}
                  className="w-full border-2 rounded-xl px-4 py-3 focus:border-[#A68F59] focus:outline-none transition-colors"
                  style={{ color: '#121212' }}
                >
                  <option value="">Select collaboration type</option>
                  <option value="brand-partnership">Brand Partnership</option>
                  <option value="creative-project">Creative Project</option>
                  <option value="community-initiative">Community Initiative</option>
                  <option value="event-workshop">Event or Workshop</option>
                  <option value="custom">Custom Collaboration</option>
                </select>
              </div>

              <div>
                <Label htmlFor="projectDescription" className="text-sm mb-2 block" style={{ color: '#121212' }}>
                  Project Description *
                </Label>
                <Textarea
                  id="projectDescription"
                  required
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Describe your collaboration idea, goals, what you envision, and how CREOVA can contribute..."
                  rows={6}
                  className="rounded-xl border-2 focus:border-[#A68F59] transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="timeline" className="text-sm mb-2 block" style={{ color: '#121212' }}>
                    Preferred Timeline
                  </Label>
                  <Input
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="e.g., Q1 2026, 3 months, ASAP"
                    className="rounded-xl border-2 focus:border-[#A68F59] transition-colors"
                  />
                </div>

                <div>
                  <Label htmlFor="budget" className="text-sm mb-2 block" style={{ color: '#121212' }}>
                    Budget Range (CAD)
                  </Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g., $2,000-$5,000"
                    className="rounded-xl border-2 focus:border-[#A68F59] transition-colors"
                  />
                </div>
              </div>

              {/* CAPTCHA Verification */}
              <div className="border-t pt-8" style={{ borderColor: '#E3DCD3' }}>
                <h3 className="text-lg mb-4" style={{ color: '#121212' }}>Security Verification</h3>
                <Captcha 
                  onVerify={handleCaptchaVerify} 
                  onExpire={handleCaptchaExpire} 
                  onError={handleCaptchaError} 
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full py-6 rounded-xl text-lg transition-all duration-300"
                style={{ backgroundColor: '#121212' }}
                disabled={isSubmitting}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#A68F59';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#121212';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? 'Submitting...' : 'Submit Collaboration Proposal'}
                  {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </span>
              </Button>

              <p className="text-sm text-center" style={{ color: '#7A6F66' }}>
                We review all proposals within 2-3 business days and respond to all inquiries
              </p>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Final CTA - Enhanced */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#121212' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 80% 20%, #A68F59 0%, transparent 50%), 
                             radial-gradient(circle at 20% 80%, #B1643B 0%, transparent 50%)` 
          }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6" style={{ color: '#F5F1EB' }}>
              Ready to Create Something Meaningful?
            </h2>
            <p className="text-xl mb-10" style={{ color: '#E3DCD3' }}>
              Whether you're booking a workshop ticket or exploring a partnership opportunity,<br className="hidden md:block" /> we're here to collaborate
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('#workshops')}
                className="px-8 py-6 rounded-xl text-lg transition-all duration-300"
                style={{ backgroundColor: '#F5F1EB', color: '#121212' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#A68F59';
                  e.currentTarget.style.color = '#F5F1EB';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F1EB';
                  e.currentTarget.style.color = '#121212';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View Workshops
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('#contact-form')}
                className="px-8 py-6 rounded-xl text-lg border-2 transition-all duration-300"
                style={{ 
                  backgroundColor: 'transparent',
                  borderColor: '#F5F1EB',
                  color: '#F5F1EB'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F1EB';
                  e.currentTarget.style.color = '#121212';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#F5F1EB';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Submit Proposal
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}