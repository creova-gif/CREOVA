import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { Camera, Users, Package, PartyPopper, Plane, TrendingUp, Palette, Video, Settings, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

type ServiceCategory = 'photography' | 'video' | 'brand' | 'social' | 'events' | 'rental' | 'all';

export function ServicesPage() {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('all');
  const navigate = useNavigate();

  const tabs = [
    { id: 'all' as ServiceCategory, label: 'All Services', icon: Settings },
    { id: 'photography' as ServiceCategory, label: 'Photography', icon: Camera },
    { id: 'video' as ServiceCategory, label: 'Video & Drone', icon: Video },
    { id: 'brand' as ServiceCategory, label: 'Branding & Design', icon: Palette },
    { id: 'social' as ServiceCategory, label: 'Social Media', icon: TrendingUp },
    { id: 'events' as ServiceCategory, label: 'Events', icon: PartyPopper },
    { id: 'rental' as ServiceCategory, label: 'Equipment Rental', icon: Package }
  ];

  const services = [
    {
      category: 'photography' as ServiceCategory,
      icon: Users,
      title: 'Family Portrait Photography',
      description: 'Capture your family\'s legacy with culturally informed, beautifully crafted portraits.',
      packages: [
        { name: 'Mini Memories', price: '$450', features: ['45-minute session', '10 edited photos', 'Up to 5 family members', 'Online gallery delivery'] },
        { name: 'Timeless Bonds', price: '$650', features: ['1.5-hour session', '25 edited photos', 'Up to 10 family members', 'Print release included'] },
        { name: 'Legacy Heirloom', price: '$950', features: ['2-hour session', '40+ edited photos', 'Up to 15 family members', 'Custom album option'] }
      ]
    },
    {
      category: 'photography' as ServiceCategory,
      icon: Camera,
      title: 'Brand Photography & Headshots',
      description: 'Professional headshots and brand photography for entrepreneurs and teams.',
      packages: [
        { name: 'Profile Pro', price: '$750', features: ['1-1.5 hour session', 'Up to 10 team members', '1 retouched headshot each', 'Neutral or branded backgrounds'] },
        { name: 'Workspace Stories', price: '$1,100', features: ['2-hour session', 'Up to 15 team members', '20+ edited images', 'Candid + posed shots'] },
        { name: 'Brand Vision Suite', price: '$1,600', features: ['3-4 hours coverage', '50+ curated photos', 'Team + culture shots', 'Optional 1-min video (+$300)'] }
      ]
    },
    {
      category: 'photography' as ServiceCategory,
      icon: Package,
      title: 'Product Photography',
      description: 'Strategic content that helps your product sell and speak for itself.',
      packages: [
        { name: 'E-commerce Essentials', price: '$600', features: ['15 styled product photos', 'White background + lifestyle', 'Basic retouching & color correction', 'Web-optimized files', 'Commercial license included'] },
        { name: 'Product Pro Kit', price: '$950', features: ['25 styled product photos', '1-minute product video', 'Studio + lifestyle shots', 'Advanced retouching', 'Commercial license included', 'Social media formats'] },
        { name: 'Lifestyle Collection', price: '$1,400', features: ['40+ product photos', '2-3 minute product video', 'Multiple lifestyle settings', 'Premium retouching', 'Full commercial rights', 'Rush delivery available'] }
      ]
    },
    {
      category: 'video' as ServiceCategory,
      icon: Plane,
      title: 'Aerial & Drone Photography',
      description: 'Cinematic perspectives that elevate your brand from above.',
      packages: [
        { name: 'Aerial Vision Session', price: 'From $500', features: ['1-hour drone session', '20+ aerial photos', '30-60 sec cinematic video', 'Basic colour grading', 'Licensed & insured'] },
        { name: 'Aerial Cinematic Experience', price: 'From $900', features: ['2-hour advanced session', '40+ premium photos', '1-2 min cinematic reel', 'Sound design included', 'Advanced colour grading', 'Licensed & insured'] }
      ]
    },
    {
      category: 'video' as ServiceCategory,
      icon: Video,
      title: 'Videography & Content Creation',
      description: 'Professional video production for brands, events, and marketing campaigns.',
      packages: [
        { name: 'Starter', price: '$500', features: ['2 hours shoot time', '1-2 short-form videos', 'Basic editing', 'Social media ready'] },
        { name: 'Creator', price: '$850', features: ['4 hours shoot time', '3-5 short-form videos', 'Social media optimization', 'Music & captions included'] },
        { name: 'Pro', price: 'From $1,500', features: ['8 hours shoot time', '1 long-form video (2-3 min)', '5-7 short-form clips', 'Professional color grading'] },
        { name: 'Campaign', price: 'From $3,000', features: ['2+ days production', 'Multi-video campaign', 'Storyboarding & scripting', 'Unlimited revisions'] }
      ],
      addOns: [
        { name: 'Extra location', price: '$150-$250' },
        { name: 'Extra videos', price: '$100/video' }
      ]
    },
    {
      category: 'events' as ServiceCategory,
      icon: PartyPopper,
      title: 'Event Coverage',
      description: 'Weddings, cultural events, ceremonies, and celebrations captured beautifully.',
      packages: [
        { name: 'Essence Package', price: '$750', features: ['3 hours coverage', '50+ images or 2-3 min video', '1 location', 'Online gallery'] },
        { name: 'Signature Story', price: '$1,350', features: ['6 hours hybrid coverage', '100+ images', '3-5 min highlight film', 'Multi-location'] },
        { name: 'Heritage Experience', price: '$2,550', features: ['8-10 hours coverage', '200+ images', '5-7 min cinematic film', 'Drone footage included'] }
      ]
    },
    {
      category: 'social' as ServiceCategory,
      icon: TrendingUp,
      title: 'Social Media Management',
      description: 'Strategic, creative, and consistent social media for cultural brands.',
      packages: [
        { name: 'Starter Plan', price: '$950/mo', features: ['12 curated posts', '1 platform', '1 strategy call/month', 'Basic analytics'] },
        { name: 'Growth Plan', price: '$1,500/mo', features: ['20+ posts', '1-2 platforms', 'Engagement management', 'Weekly analytics reports'] },
        { name: 'Creator+ Plan', price: 'From $2,500/mo', features: ['Cross-platform growth', 'Full content production', 'Paid ad setup & management', 'Dedicated account manager'] }
      ]
    },
    {
      category: 'brand' as ServiceCategory,
      icon: Palette,
      title: 'Brand Design & Identity',
      description: 'Bold, strategic identities for creators and cultural brands who lead with vision.',
      packages: [
        { name: 'Brand Essentials Kit', price: '$600', features: ['3 custom templates', 'Color palette + fonts', 'Mini style guide', 'Social media kit'] },
        { name: 'Visual Starter Identity', price: '$1,200', features: ['Logo wordmark/symbol', 'Starter brand guide', '5 branded visuals', 'Business card design'] },
        { name: 'Signature Identity Suite', price: 'From $3,000', features: ['Full logo suite', 'Comprehensive brand guide', 'Complete asset kit', '3 months support'] }
      ]
    },
    {
      category: 'brand' as ServiceCategory,
      icon: Calendar,
      title: 'Event & Conference Design',
      description: 'Specialized design services for organizers, institutions, universities, and corporate events.',
      packages: [
        { name: 'Event Essentials Package', price: '$600', features: ['1 Event Poster / Main Key Visual', '6 Social Media Graphics', '1 Digital Flyer (PNG + PDF)', '1 Event Banner/Header', 'Up to 3 revisions', 'Delivery: 5–7 days', 'Best for small events & workshops'] },
        { name: 'Standard Event Branding', price: '$1,200', features: ['Full Event Key Visual', '12 Social Media Graphics', '3 Posters or Flyers', 'Digital Promo Kit for Speakers', 'Event Schedule / Program (2–3 pages)', 'Web Banner Package', 'Up to 5 revisions', 'Delivery: 7–10 days'] },
        { name: 'Full Event Identity Suite', price: '$2,500', features: ['Event Branding Consultation', 'Custom Hero Key Visual', '20 Social Media Graphics', 'Event Program Booklet (6–10 pages)', 'Stage Graphics (4–6 slides)', 'Web Banner Set', 'Up to 7 revisions', 'Delivery: 2–3 weeks'] }
      ]
    },
    {
      category: 'brand' as ServiceCategory,
      icon: Calendar,
      title: 'Event Design Retainer',
      description: 'Monthly design support for universities, organizations & companies with ongoing events.',
      packages: [
        { name: 'Starter', price: '$450/mo', features: ['6 graphics/month', '1 poster/flyer', '48–72h turnaround', 'Perfect for small organizations'] },
        { name: 'Growth', price: '$850/mo', features: ['12 graphics/month', '2 posters/flyers', 'Monthly strategy session', 'Priority delivery', 'For mid-size organizations'] },
        { name: 'Premium', price: '$1,600/mo', features: ['Unlimited event design requests', '1 active project at a time', 'Creative direction support', 'Weekly check-ins', 'For large institutions'] }
      ]
    },
    {
      category: 'rental' as ServiceCategory,
      icon: Package,
      title: 'Equipment Rental',
      description: 'Professional camera, lighting, and audio equipment for your creative projects.',
      packages: [
        { 
          name: 'DJI Osmo Creator Kit', 
          price: '$175/day', 
          deposit: '$400',
          features: ['DJI Osmo Pocket 3 or Action 5 Pro', 'Wireless Mic System (2x transmitters)', 'Extension Rod & Tripod', 'Extra Batteries & Storage', 'Protective Carry Case'] 
        },
        { 
          name: 'Photography Kit', 
          price: '$150/day', 
          deposit: '$300',
          features: ['DSLR or Mirrorless Camera', '2-3 Lenses (24-70mm, 50mm)', 'SD Cards & Batteries', 'Camera Bag'] 
        },
        { 
          name: 'Videography Kit', 
          price: '$250/day', 
          deposit: '$500',
          features: ['Cinema Camera or DSLR', 'Gimbal Stabilizer', 'Shotgun Microphone', 'LED Light Panel', 'Tripod & Accessories'] 
        },
        { 
          name: 'Lighting Package', 
          price: '$100/day', 
          deposit: '$200',
          features: ['2x LED Panels or Strobes', 'Light Stands', 'Softboxes/Modifiers', 'Power cables & accessories'] 
        },
        { 
          name: 'Audio Package', 
          price: '$75/day', 
          deposit: '$150',
          features: ['Wireless Lavalier Mic', 'Shotgun Microphone', 'Audio Recorder', 'Boom Pole & Accessories'] 
        }
      ]
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <div style={{ backgroundColor: '#F5F1EB' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#121212' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 30% 50%, #A68F59 0%, transparent 50%), 
                             radial-gradient(circle at 70% 70%, #B1643B 0%, transparent 50%)` 
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
              Full-Service<br />Creative Solutions
            </h1>
            <p className="text-xl mb-6 leading-relaxed" style={{ color: '#E3DCD3' }}>
              For BIPOC brands, entrepreneurs, and cultural storytellers<br className="hidden md:block" /> across Ontario and Canada
            </p>
            <div className="flex flex-wrap gap-3 justify-center items-center text-sm" style={{ color: '#A68F59' }}>
              <span>Photography</span>
              <span>•</span>
              <span>Videography</span>
              <span>•</span>
              <span>Brand Design</span>
              <span>•</span>
              <span>Social Media</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Category Tabs */}
      <section id="services-tabs" className="sticky top-16 z-40 bg-white border-b-2" style={{ borderColor: '#E3DCD3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Scroll to top of services list when tab changes
                  const servicesSection = document.querySelector('#services-list');
                  if (servicesSection) {
                    const offset = 150; // Account for sticky header
                    const elementPosition = servicesSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 border-2"
                style={{
                  backgroundColor: activeTab === tab.id ? '#121212' : 'transparent',
                  color: activeTab === tab.id ? '#F5F1EB' : '#121212',
                  borderColor: activeTab === tab.id ? '#121212' : '#E3DCD3'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.borderColor = '#A68F59';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.borderColor = '#E3DCD3';
                  }
                }}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section id="services-list" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {filteredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 border-2"
                style={{ borderColor: '#E3DCD3' }}
              >
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                       style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)' }}>
                    <service.icon className="w-7 h-7" style={{ color: '#A68F59' }} />
                  </div>
                  <div>
                    <h2 className="text-3xl mb-3" style={{ color: '#121212' }}>{service.title}</h2>
                    <p className="text-lg" style={{ color: '#7A6F66' }}>{service.description}</p>
                  </div>
                </div>

                <div className={`grid ${service.packages.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
                  {service.packages.map((pkg, pkgIndex) => (
                    <div 
                      key={pkgIndex} 
                      className="border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
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
                      <h3 className="text-xl mb-2" style={{ color: '#121212' }}>{pkg.name}</h3>
                      <p className="text-3xl mb-2" style={{ color: '#A68F59' }}>{pkg.price}</p>
                      
                      {/* Deposit Fee for Rentals */}
                      {('deposit' in pkg) && (
                        <div className="flex items-center gap-2 mb-4 p-2 rounded-lg" 
                             style={{ backgroundColor: 'rgba(177, 100, 59, 0.1)' }}>
                          <AlertCircle className="w-4 h-4" style={{ color: '#B1643B' }} />
                          <span className="text-sm" style={{ color: '#B1643B' }}>
                            Deposit: {(pkg as any).deposit}
                          </span>
                        </div>
                      )}

                      <ul className="space-y-2 text-sm mb-6" style={{ color: '#7A6F66' }}>
                        {pkg.features.map((feature, featIndex) => (
                          <li key={featIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#A68F59' }} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        className="w-full group" 
                        style={{ 
                          backgroundColor: '#121212',
                          color: '#F5F1EB'
                        }}
                        onClick={() => navigate(service.category === 'rental' ? '/rental' : '/booking')}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#A68F59';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#121212';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        {service.category === 'rental' ? 'Reserve Equipment' : 'Book Session'}
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add-Ons for Video */}
                {service.addOns && (
                  <div className="mt-6">
                    <h4 className="text-xl mb-2" style={{ color: '#121212' }}>Add-Ons</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.addOns.map((addOn, addOnIndex) => (
                        <div
                          key={addOnIndex}
                          className="border-2 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
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
                          <h5 className="text-sm mb-1" style={{ color: '#121212' }}>{addOn.name}</h5>
                          <p className="text-sm" style={{ color: '#A68F59' }}>{addOn.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons & Extras */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4" style={{ color: '#121212' }}>Add-Ons & Extras</h2>
            <p className="text-xl" style={{ color: '#7A6F66' }}>Enhance any service package</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Extra Hour (photo/video)', price: '$100-$150' },
              { name: 'Drone Footage Add-On', price: '$200' },
              { name: '360 Booth Camera (Events)', price: '$650' },
              { name: 'Raw Unedited Footage', price: '$150' },
              { name: 'Expedited Delivery (72 hrs)', price: '$250' },
              { name: 'Custom Album (Print-Ready)', price: 'From $175' },
              { name: 'Monthly Design Support', price: 'From $300/mo' }
            ].map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex justify-between items-center p-6 bg-white border-2 rounded-2xl hover:shadow-lg transition-all duration-300"
                style={{ borderColor: '#E3DCD3' }}
              >
                <span style={{ color: '#121212' }}>{addon.name}</span>
                <span className="text-lg" style={{ color: '#A68F59' }}>{addon.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Rental Terms */}
      {(activeTab === 'rental' || activeTab === 'all') && (
        <section className="py-20" style={{ backgroundColor: '#F5F1EB' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border-2"
              style={{ borderColor: '#E3DCD3' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                     style={{ backgroundColor: 'rgba(177, 100, 59, 0.1)' }}>
                  <AlertCircle className="w-6 h-6" style={{ color: '#B1643B' }} />
                </div>
                <h3 className="text-2xl" style={{ color: '#121212' }}>Equipment Rental Terms</h3>
              </div>

              <div className="space-y-4" style={{ color: '#7A6F66' }}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#A68F59' }} />
                  <p><strong style={{ color: '#121212' }}>Deposit Required:</strong> Refundable security deposit due upon pickup. Returned within 5 business days after equipment is returned in good condition.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#A68F59' }} />
                  <p><strong style={{ color: '#121212' }}>Rental Period:</strong> 24-hour day (e.g., pickup 9am Monday, return by 9am Tuesday). Multi-day discounts available.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#A68F59' }} />
                  <p><strong style={{ color: '#121212' }}>Pickup/Return:</strong> Equipment must be picked up and returned at our Ontario location. Delivery available for additional fee.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#A68F59' }} />
                  <p><strong style={{ color: '#121212' }}>Damage Policy:</strong> Renter is responsible for equipment damage or loss. Insurance options available.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#A68F59' }} />
                  <p><strong style={{ color: '#121212' }}>Reservation:</strong> Book at least 48 hours in advance. Valid ID and signed rental agreement required.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Community & Loyalty Discounts */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="h-1 w-20 mx-auto mb-6" style={{ backgroundColor: '#A68F59' }}></div>
            <h2 className="text-4xl mb-4" style={{ color: '#121212' }}>Community & Loyalty Discounts</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Students & Nonprofits', desc: 'Community pricing available', discount: '15% OFF' },
              { title: 'Returning Clients', desc: '15% off all services', discount: '15% OFF' },
              { title: 'Referral Bonus', desc: '$25 credit for you & referral', discount: '$25' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white border-2 rounded-2xl text-center hover:shadow-xl transition-all duration-300"
                style={{ borderColor: '#E3DCD3' }}
              >
                <div className="text-3xl mb-3" style={{ color: '#A68F59' }}>{item.discount}</div>
                <h3 className="text-xl mb-2" style={{ color: '#121212' }}>{item.title}</h3>
                <p style={{ color: '#7A6F66' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="px-8 py-6 rounded-xl text-lg transition-all duration-300"
              style={{ backgroundColor: '#121212' }}
              onClick={() => navigate('/contact')}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#A68F59';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#121212';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}