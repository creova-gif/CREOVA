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
    toast.error('Security Verification Issue', {
      description: error || 'Unable to verify. Please refresh and try again.'
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
    <div>
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
              {t('contact.hero.title')}
            </h1>
            <p className="text-xl mb-6 leading-relaxed" style={{ color: '#E3DCD3' }}>
              {t('contact.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-3 justify-center items-center text-sm" style={{ color: '#A68F59' }}>
              <span>Book Services</span>
              <span>•</span>
              <span>Collaborate</span>
              <span>•</span>
              <span>General Inquiries</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Booking Callout */}
            <div className="bg-white rounded-2xl p-6 mb-8 border-2" style={{ borderColor: '#A68F59' }}>
              <h3 className="text-xl mb-2" style={{ color: '#121212' }}>
                Ready to book a session?
              </h3>
              <p className="text-sm mb-4" style={{ color: '#7A6F66' }}>
                Skip the inquiry form and book directly — we'll confirm your session within 4 business hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  style={{ backgroundColor: '#121212', color: '#F5F1EB' }}
                  asChild
                >
                  <Link to="/booking">Book Session Now</Link>
                </Button>
                <Button
                  variant="outline"
                  style={{ borderColor: '#A68F59', color: '#A68F59' }}
                  onClick={() => {
                    // Scroll to Sankofa widget or trigger chat
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }}
                >
                  Chat with Sankofa First
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="text-center mb-8">
              <p className="text-sm" style={{ color: '#7A6F66' }}>
                Or, send us a general inquiry below:
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
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
      <section id="faq-section" className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12">Frequently Asked Questions</h2>
          
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
            onValueChange={(value) => {
              // Scroll to top of accordion when opening
              if (value) {
                const faqSection = document.getElementById('faq-section');
                if (faqSection) {
                  const offset = 100;
                  const elementPosition = faqSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }
            }}
          >
            <AccordionItem value="item-1" className="bg-white px-6 rounded-lg border" style={{ borderColor: '#E3DCD3' }}>
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg" style={{ color: '#121212' }}>How far in advance should I book?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600 leading-relaxed">
                  For events and weddings, we recommend booking 3-6 months in advance. For brand photography 
                  and other services, 2-4 weeks notice is typically sufficient, but we can sometimes accommodate 
                  rush requests.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white px-6 rounded-lg border" style={{ borderColor: '#E3DCD3' }}>
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg" style={{ color: '#121212' }}>Do you travel outside of Niagara?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600 leading-relaxed">
                  Yes! We serve clients across Ontario and Canada-wide. Travel fees may apply for locations 
                  outside Niagara city limits and will be quoted based on distance.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white px-6 rounded-lg border" style={{ borderColor: '#E3DCD3' }}>
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg" style={{ color: '#121212' }}>What's your cancellation policy?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600 leading-relaxed">
                  We require a deposit to secure your booking. Cancellations made 14+ days before your session 
                  receive a 50% refund. Cancellations within 14 days forfeit the deposit. We can discuss 
                  rescheduling options for weather or emergencies.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white px-6 rounded-lg border" style={{ borderColor: '#E3DCD3' }}>
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg" style={{ color: '#121212' }}>How long until I receive my photos/videos?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600 leading-relaxed">
                  Standard turnaround is 2-3 weeks for photography and 3-4 weeks for video projects. 
                  Expedited delivery (48-72 hours) is available for an additional fee.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white px-6 rounded-lg border" style={{ borderColor: '#E3DCD3' }}>
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg" style={{ color: '#121212' }}>Do you offer payment plans?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600 leading-relaxed">
                  Yes, we offer payment plans for packages over $1,000. Typically, this includes a 50% deposit 
                  to book and the remaining balance due before or on the day of service.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white px-6 rounded-lg border" style={{ borderColor: '#E3DCD3' }}>
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg" style={{ color: '#121212' }}>What equipment do you use?</span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-600 leading-relaxed">
                  We use professional-grade Canon and Sony cameras, professional lighting equipment, DJI drones 
                  (licensed and insured), and industry-standard editing software including Adobe Creative Suite 
                  and Final Cut Pro.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}