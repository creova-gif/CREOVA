import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner@2.0.3';
import { Download, Heart, ChevronDown, Gift, Star, FileText, Camera, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { LeadMagnetModal } from '../components/LeadMagnetModal';
import { useState } from 'react';

export function DigitalProductsPage() {
  const { addItem } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [selectedLeadMagnet, setSelectedLeadMagnet] = useState<any>(null);
  const [isLeadMagnetModalOpen, setIsLeadMagnetModalOpen] = useState(false);

  const leadMagnets = [
    {
      id: 'photoshoot-checklist',
      title: 'Ultimate Photoshoot Preparation Checklist',
      description: 'Complete guide to prepare for your professional photoshoot - what to bring, how to pose, and styling tips.',
      fileType: 'PDF',
      value: '$25',
      icon: Camera,
      downloadUrl: '#'
    },
    {
      id: 'camera-ready-tips',
      title: '10 Tips for Looking Camera-Ready',
      description: 'Professional secrets from our photographers on how to look your absolute best on camera.',
      fileType: 'PDF',
      value: '$20',
      icon: Star,
      downloadUrl: '#'
    },
    {
      id: 'brand-color-guide',
      title: 'Brand Color Psychology Guide',
      description: 'Learn which colors resonate with your brand values and how to choose the perfect palette.',
      fileType: 'PDF',
      value: '$30',
      icon: Palette,
      downloadUrl: '#'
    },
    {
      id: 'content-planning-template',
      title: 'Monthly Content Planning Template',
      description: 'Notion template to organize your content strategy, plan posts, and track performance.',
      fileType: 'Template',
      value: '$35',
      icon: FileText,
      downloadUrl: '#'
    }
  ];

  const handleLeadMagnetClick = (magnet: any) => {
    setSelectedLeadMagnet(magnet);
    setIsLeadMagnetModalOpen(true);
    
    // Track lead magnet view
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'view_item', {
        event_category: 'Lead Magnet',
        event_label: magnet.title
      });
    }
  };

  const digitalProducts = [
    {
      id: 'brand-kit-template',
      name: 'BRAND IDENTITY KIT',
      price: 69,
      image: 'https://images.unsplash.com/photo-1727755868081-c25d2b427ce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYnJhbmQlMjBpZGVudGl0eSUyMGRlc2lnbnxlbnwxfHx8fDE3NjMyMzE2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1727755868081-c25d2b427ce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYnJhbmQlMjBpZGVudGl0eSUyMGRlc2lnbnxlbnwxfHx8fDE3NjMyMzE2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Templates',
      description: 'Complete Canva template kit with logo layouts, color palettes, and social media templates',
      includes: '10+ Canva templates, Brand guide, Social kit',
      category: 'branding',
      new: true
    },
    {
      id: 'social-media-templates',
      name: 'SOCIAL MEDIA TEMPLATES',
      price: 42,
      image: 'https://images.unsplash.com/photo-1521572089244-e5aaacacca6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHRlbXBsYXRlJTIwbW9ja3VwfGVufDF8fHx8MTc2MzIyODk0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1521572089244-e5aaacacca6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMHRlbXBsYXRlJTIwbW9ja3VwfGVufDF8fHx8MTc2MzIyODk0MHww&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Templates',
      description: '50+ Instagram, TikTok, and Pinterest templates designed for BIPOC entrepreneurs',
      includes: '50+ templates, Story & post layouts, Reels covers',
      category: 'content',
      new: true
    },
    {
      id: 'content-calendar',
      name: 'CONTENT CALENDAR',
      price: 28,
      image: 'https://images.unsplash.com/photo-1676287567295-135ce512839a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY2FsZW5kYXIlMjBwbGFubmluZ3xlbnwxfHx8fDE3NjMyMjg5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1676287567295-135ce512839a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY2FsZW5kYXIlMjBwbGFubmluZ3xlbnwxfHx8fDE3NjMyMjg5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Planning',
      description: 'Pre-planned social media calendar with prompts, themes, and posting schedules',
      includes: '30-day plan, Caption prompts, Notion template',
      category: 'content'
    },
    {
      id: 'pricing-guide-template',
      name: 'PRICING GUIDE',
      price: 55,
      image: 'https://images.unsplash.com/photo-1623667322051-18662ce6334c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmljaW5nJTIwZ3VpZGUlMjBkb2N1bWVudHxlbnwxfHx8fDE3NjMyMjg5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1623667322051-18662ce6334c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmljaW5nJTIwZ3VpZGUlMjBkb2N1bWVudHxlbnwxfHx8fDE3NjMyMjg5NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Business',
      description: 'Editable pricing guide template for photographers, designers, and creatives',
      includes: 'InDesign + Canva files, 3 layouts, Calculator',
      category: 'business'
    },
    {
      id: 'lightroom-presets',
      name: 'LIGHTROOM PRESETS',
      price: 48,
      image: 'https://images.unsplash.com/photo-1629590100332-6fb96692f3f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90byUyMGVkaXRpbmclMjBsaWdodHJvb218ZW58MXx8fHwxNzYzMjI4OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1629590100332-6fb96692f3f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90byUyMGVkaXRpbmclMjBsaWdodHJvb218ZW58MXx8fHwxNzYzMjI4OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Presets',
      description: 'Professional Lightroom presets for warm, vibrant, culturally rich tones',
      includes: '15 desktop presets, 15 mobile presets, Tutorial',
      category: 'photography',
      new: true
    },
    {
      id: 'video-intro-templates',
      name: 'VIDEO TEMPLATES',
      price: 65,
      image: 'https://images.unsplash.com/photo-1682506457554-b34c9682e985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmclMjB0ZW1wbGF0ZXN8ZW58MXx8fHwxNzYzMjI4OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1682506457554-b34c9682e985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmclMjB0ZW1wbGF0ZXN8ZW58MXx8fHwxNzYzMjI4OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Video',
      description: 'Animated video templates for YouTube, TikTok, and Instagram Reels',
      includes: '5 intro templates, 5 outro templates, Tutorial',
      category: 'video'
    },
    {
      id: 'client-onboarding-kit',
      name: 'CLIENT ONBOARDING KIT',
      price: 82,
      image: 'https://images.unsplash.com/photo-1758519288480-1489c17b1519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnRyYWN0JTIwZG9jdW1lbnRzfGVufDF8fHx8MTc2MzIyODk0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1758519288480-1489c17b1519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnRyYWN0JTIwZG9jdW1lbnRzfGVufDF8fHx8MTc2MzIyODk0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Business',
      description: 'Complete onboarding system with contracts, questionnaires, and workflows',
      includes: 'Contracts, Intake forms, Welcome guide, Emails',
      category: 'business'
    },
    {
      id: 'brand-strategy-workbook',
      name: 'BRAND STRATEGY WORKBOOK',
      price: 35,
      image: 'https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhdGVneSUyMHdvcmtib29rJTIwcGxhbm5pbmd8ZW58MXx8fHwxNjMyMjg5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhdGVneSUyMHdvcmtib29rJTIwcGxhbm5pbmd8ZW58MXx8fHwxNjMyMjg5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Planning',
      description: 'Interactive PDF workbook to define your brand voice, values, and visual identity',
      includes: '40+ pages, Brand exercises, Mood boards',
      category: 'branding'
    },
    {
      id: 'email-marketing-templates',
      name: 'EMAIL MARKETING SUITE',
      price: 52,
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMG1hcmtldGluZyUyMHRlbXBsYXRlfGVufDF8fHx8MTYzMjI4OTQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMG1hcmtldGluZyUyMHRlbXBsYXRlfGVufDF8fHx8MTYzMjI4OTQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      type: 'Marketing',
      description: 'Professional email templates for newsletters, promotions, and client communications',
      includes: '25+ email templates, Welcome sequence, Mailchimp/Klaviyo ready',
      category: 'content',
      new: true
    }
  ];

  const filteredProducts = filter === 'all' 
    ? digitalProducts 
    : digitalProducts.filter(p => p.category === filter);

  const handlePurchase = (product: typeof digitalProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      type: 'digital',
      image: product.image
    });

    toast.success('Added to waitlist!', {
      description: `${product.name} - You'll be notified at launch in April 2026`
    });
  };

  return (
    <div style={{ backgroundColor: '#F5F1EB' }}>
      {/* Hero - Minimal */}
      <section className="relative py-12 border-b" style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DCD3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl tracking-tight mb-3"
              style={{ color: '#121212' }}
            >
              DIGITAL RESOURCES
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm tracking-wider mb-4"
              style={{ color: '#4A3E36' }}
            >
              TEMPLATES / PRESETS / TOOLS FOR CREATIVE ENTREPRENEURS
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ backgroundColor: '#A68F59', color: '#FFFFFF' }}
              >
                <span className="text-xs tracking-widest">AVAILABLE APRIL 2026</span>
              </div>
              <p className="text-[11px] tracking-wide" style={{ color: '#7A6F66' }}>
                Refined, expanded, and built with intention.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-40 py-4 border-b backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#E3DCD3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              {[
                { label: 'ALL', value: 'all' },
                { label: 'BRANDING', value: 'branding' },
                { label: 'CONTENT', value: 'content' },
                { label: 'BUSINESS', value: 'business' },
                { label: 'PHOTOGRAPHY', value: 'photography' },
                { label: 'VIDEO', value: 'video' }
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  className="text-xs tracking-widest transition-colors"
                  style={{ 
                    color: filter === item.value ? '#121212' : '#7A6F66',
                    fontWeight: filter === item.value ? '600' : '400'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1 text-xs tracking-widest" style={{ color: '#4A3E36' }}>
              SORT BY
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid - Zara Style */}
      <section className="py-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] mb-3 overflow-hidden" style={{ backgroundColor: '#F5F1EB' }}>
                  {/* Main Image */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                    style={{ 
                      opacity: hoveredProduct === product.id ? 0.8 : 1,
                      transform: hoveredProduct === product.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  
                  {/* New Badge */}
                  {product.new && (
                    <div 
                      className="absolute top-2 left-2 px-2 py-1 text-[10px] tracking-widest"
                      style={{ backgroundColor: '#121212', color: '#FFFFFF' }}
                    >
                      NEW
                    </div>
                  )}

                  {/* Type Badge */}
                  <div 
                    className="absolute top-2 right-2 px-2 py-1 text-[10px] tracking-widest"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#121212' }}
                  >
                    {product.type.toUpperCase()}
                  </div>

                  {/* Quick Actions on Hover */}
                  <div 
                    className="absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300"
                    style={{ 
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      transform: hoveredProduct === product.id ? 'translateY(0)' : 'translateY(10px)'
                    }}
                  >
                    <Button
                      className="flex-1 h-9 text-xs tracking-wider transition-colors"
                      style={{ 
                        backgroundColor: '#121212', 
                        color: '#FFFFFF',
                        border: 'none'
                      }}
                      onClick={() => handlePurchase(product)}
                    >
                      <Download className="w-3 h-3 mr-2" />
                      PRE-ORDER
                    </Button>
                    <button
                      className="w-9 h-9 flex items-center justify-center transition-colors"
                      style={{ 
                        backgroundColor: '#FFFFFF', 
                        color: '#121212'
                      }}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h3 className="text-xs tracking-wider" style={{ color: '#121212' }}>
                    {product.name}
                  </h3>
                  <p className="text-[10px] tracking-wide" style={{ color: '#7A6F66' }}>
                    {product.includes}
                  </p>
                  <p className="text-[10px] tracking-wide" style={{ color: '#7A6F66' }}>
                    Launching April. Join the waitlist to be part of first access.
                  </p>
                  <p className="text-sm" style={{ color: '#121212' }}>
                    ${product.price} CAD
                  </p>

                  {/* Description on Hover */}
                  {hoveredProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-2"
                    >
                      <p className="text-[11px] leading-relaxed" style={{ color: '#4A3E36' }}>
                        {product.description}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="py-16 border-t" style={{ backgroundColor: '#F5F1EB', borderColor: '#E3DCD3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: 'INSTANT DOWNLOAD',
                desc: 'Access immediately after purchase'
              },
              {
                title: 'COMMERCIAL LICENSE',
                desc: 'Use for client work and business'
              },
              {
                title: 'LIFETIME UPDATES',
                desc: 'Free updates and new versions'
              }
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-xs tracking-widest mb-2" style={{ color: '#121212' }}>
                  {item.title}
                </h3>
                <p className="text-xs" style={{ color: '#4A3E36' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t" style={{ backgroundColor: '#121212', borderColor: '#2C2C2C' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl tracking-tight mb-4" style={{ color: '#F5F1EB' }}>
              NEED CUSTOM TEMPLATES?
            </h2>
            <p className="text-sm tracking-wide mb-8" style={{ color: '#E3DCD3' }}>
              We create custom digital products tailored to your brand and business needs
            </p>
            <Button 
              size="lg"
              className="tracking-wider transition-all"
              style={{ 
                backgroundColor: '#F5F1EB', 
                color: '#121212',
                border: 'none'
              }}
              asChild
            >
              <a href="/contact">REQUEST CUSTOM WORK</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Lead Magnets Section */}
      <section className="py-20 border-t" style={{ backgroundColor: '#F5F1EB', borderColor: '#E3DCD3' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl tracking-tight mb-4" style={{ color: '#121212' }}>
              FREE LEAD MAGNETS
            </h2>
            <p className="text-sm tracking-wide mb-8" style={{ color: '#4A3E36' }}>
              Download our exclusive resources to enhance your brand and content strategy
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {leadMagnets.map((magnet) => (
                <div key={magnet.id} className="border p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4">
                    <magnet.icon className="w-6 h-6" />
                    <div>
                      <h3 className="text-sm tracking-wider" style={{ color: '#121212' }}>
                        {magnet.title}
                      </h3>
                      <p className="text-[10px] tracking-wide" style={{ color: '#7A6F66' }}>
                        {magnet.description}
                      </p>
                      <p className="text-sm" style={{ color: '#121212' }}>
                        {magnet.value}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="mt-4 tracking-wider transition-all"
                    style={{ 
                      backgroundColor: '#A68F59', 
                      color: '#FFFFFF',
                      border: 'none',
                      opacity: 0.6,
                      cursor: 'not-allowed'
                    }}
                    onClick={() => handleLeadMagnetClick(magnet)}
                    disabled
                  >
                    <Gift className="w-3 h-3 mr-2" />
                    NOT YET AVAILABLE
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Magnet Modal */}
      <LeadMagnetModal
        isOpen={isLeadMagnetModalOpen}
        onClose={() => setIsLeadMagnetModalOpen(false)}
        magnet={selectedLeadMagnet}
      />
    </div>
  );
}