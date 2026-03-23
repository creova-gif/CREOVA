import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import { Captcha } from '../components/Captcha';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Calendar, Star, Award, Globe, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useLanguage } from '../context/LanguageContext';
import { logger } from '../utils/logger';

export function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    budget: '',
    timeline: ''
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
    if (window.location.hostname === 'creova.ca') {
      toast.error('Security Verification Issue', {
        description: error || 'Unable to verify. Please refresh and try again.'
      });
    }
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
        `https://${projectId}.supabase.co/functions/v1/make-server-feacf0d8/submit-contact`,
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
        // Send admin notification email
        try {
          await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-feacf0d8/send-contact-notification`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`
              },
              body: JSON.stringify(formData)
            }
          );
        } catch (emailError) {
          // Don't block success message if email notification fails
          console.error('Admin notification failed:', emailError);
        }

        toast.success(t('contact.form.success.title'), {
          description: t('contact.form.success.description')
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          budget: '',
          timeline: ''
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error(t('contact.form.error.title'), {
        description: t('contact.form.error.description')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#F5F1EB' }}>
      {/* Hero Section — Editorial */}
      <section className="relative overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 55% 80% at 20% 50%, rgba(166,143,89,0.09) 0%, transparent 60%),
                       radial-gradient(ellipse 40% 60% at 80% 60%, rgba(177,100,59,0.07) 0%, transparent 55%)`
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(166,143,89,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute bottom-0 left-0 right-0" style={{ height: '1px', backgroundColor: 'rgba(166,143,89,0.3)' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-center gap-5 mb-10">
              <div style={{ height: '1px', width: '50px', backgroundColor: 'rgba(166,143,89,0.5)' }} />
              <p className="text-xs tracking-[0.55em] uppercase" style={{ color: '#A68F59' }}>Get In Touch</p>
              <div style={{ height: '1px', width: '50px', backgroundColor: 'rgba(166,143,89,0.5)' }} />
            </div>
            <h1
              className="font-light tracking-tight mb-8"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)', color: '#F5F1EB', lineHeight: 1.1 }}
            >
              {t('contact.hero.title')}
            </h1>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: '#7A6F66', maxWidth: '500px', margin: '0 auto 40px' }}>
              {t('contact.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-6 justify-center items-center">
              {['Book Services', 'Collaborate', 'General Inquiries'].map((tag, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="text-sm tracking-wider" style={{ color: '#A68F59' }}>{tag}</span>
                  {i < 2 && <span style={{ width: '1px', height: '14px', backgroundColor: 'rgba(166,143,89,0.3)', display: 'inline-block' }} />}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16" style={{ backgroundColor: '#F5F1EB' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Booking Callout — dark card */}
            <div className="rounded-2xl p-6 mb-8 overflow-hidden" style={{ backgroundColor: '#121212', border: '1px solid rgba(166,143,89,0.25)' }}>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg mb-1 tracking-tight" style={{ color: '#F5F1EB' }}>
                    Ready to book a session?
                  </h3>
                  <p className="text-sm mb-4" style={{ color: '#7A6F66' }}>
                    Skip the inquiry form and book directly — we'll confirm your session within 4 business hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      style={{ backgroundColor: '#A68F59', color: '#121212' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F1EB'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#A68F59'; }}
                      asChild
                    >
                      <Link to="/booking">Book Session Now</Link>
                    </Button>
                    <Button
                      variant="outline"
                      style={{ borderColor: 'rgba(166,143,89,0.4)', color: '#A68F59', backgroundColor: 'transparent' }}
                      onClick={() => {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                      }}
                    >
                      Chat with Sankofa First
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(18,18,18,0.1)' }} />
              <p className="text-xs tracking-widest uppercase" style={{ color: '#7A6F66' }}>or send a general inquiry</p>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(18,18,18,0.1)' }} />
            </div>

            <div className="rounded-2xl p-8 md:p-12" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(18,18,18,0.1)' }}>
              <h2 className="text-2xl mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <Label htmlFor="service">Service Interested In *</Label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full border border-neutral-300 rounded-md px-3 py-2"
                  >
                    <option value="">Select a service</option>
                    <option value="family-photography">Family Photography</option>
                    <option value="brand-photography">Brand Photography</option>
                    <option value="product-photography">Product Photography</option>
                    <option value="event-coverage">Event Coverage (Photo/Video)</option>
                    <option value="drone-aerial">Drone & Aerial Photography</option>
                    <option value="social-media">Social Media Management</option>
                    <option value="brand-management">Brand Management</option>
                    <option value="collaboration">Collaboration Opportunity</option>
                    <option value="other">Other/Not Sure</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="e.g., $500-$1000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeline">Timeline/Event Date</Label>
                    <Input
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      placeholder="e.g., June 2026"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project, event, or what you're looking for..."
                    rows={6}
                  />
                </div>

                {/* CAPTCHA Verification */}
                <div className="border-t pt-6" style={{ borderColor: '#E3DCD3' }}>
                  <h3 className="text-lg mb-2" style={{ color: '#121212' }}>Security Verification</h3>
                  <p className="text-xs mb-4" style={{ color: '#7A6F66' }}>
                    {t('contact.captcha.security')}
                  </p>
                  <Captcha 
                    onVerify={handleCaptchaVerify} 
                    onExpire={handleCaptchaExpire} 
                    onError={handleCaptchaError} 
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                <p className="text-sm text-neutral-500 text-center">
                  By submitting this form, you agree to be contacted by CREOVA regarding your inquiry
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#121212' }}>
        <div className="absolute top-0 left-0 right-0" style={{ height: '1px', backgroundColor: 'rgba(166,143,89,0.3)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(166,143,89,0.06) 0%, transparent 65%)'
        }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-5 mb-3">
              <div style={{ height: '1px', width: '40px', backgroundColor: 'rgba(166,143,89,0.5)' }} />
              <p className="text-xs tracking-[0.5em] uppercase" style={{ color: '#A68F59' }}>Quick Answers</p>
            </div>
            <h2 className="text-4xl font-light tracking-tight" style={{ color: '#F5F1EB' }}>Frequently Asked Questions</h2>
          </div>
          
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-3"
            onValueChange={(value) => {
              if (value) {
                const faqSection = document.getElementById('faq-section');
                if (faqSection) {
                  const offset = 100;
                  const elementPosition = faqSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }
            }}
          >
            {[
              { q: 'How far in advance should I book?', a: 'For events and weddings, we recommend booking 3-6 months in advance. For brand photography and other services, 2-4 weeks notice is typically sufficient, but we can sometimes accommodate rush requests.' },
              { q: 'Do you travel outside of Niagara?', a: 'Yes! We serve clients across Ontario and Canada-wide. Travel fees may apply for locations outside Niagara city limits and will be quoted based on distance.' },
              { q: "What's your cancellation policy?", a: 'We require a deposit to secure your booking. Cancellations made 14+ days before your session receive a 50% refund. Cancellations within 14 days forfeit the deposit. We can discuss rescheduling options for weather or emergencies.' },
              { q: 'How long until I receive my photos/videos?', a: 'Standard turnaround is 2-3 weeks for photography and 3-4 weeks for video projects. Expedited delivery (48-72 hours) is available for an additional fee.' },
              { q: 'Do you offer payment plans?', a: 'Yes, we offer payment plans for packages over $1,000. Typically, this includes a 50% deposit to book and the remaining balance due before or on the day of service.' },
              { q: 'What equipment do you use?', a: 'We use professional-grade Canon and Sony cameras, professional lighting equipment, DJI drones (licensed and insured), and industry-standard editing software including Adobe Creative Suite and Final Cut Pro.' }
            ].map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i + 1}`}
                className="px-6 rounded-xl"
                style={{ border: '1px solid rgba(166,143,89,0.18)', backgroundColor: 'rgba(166,143,89,0.04)' }}
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <span className="text-base text-left" style={{ color: '#F5F1EB' }}>{item.q}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-relaxed pb-4 text-sm" style={{ color: '#7A6F66' }}>{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}