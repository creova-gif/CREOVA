import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function ContactInfoBanner() {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Call Us',
      value: '+1 (289) 241-3136',
      href: 'tel:+12892413136'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'support@creova.ca',
      href: 'mailto:support@creova.ca'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Niagara Region, Ontario, Canada',
      href: 'https://maps.google.com/?q=Niagara+Region+Ontario+Canada'
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Fri: 9AM-6PM EST',
      href: null
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-[60] border-b"
      style={{ backgroundColor: '#121212', borderColor: '#2A2A2A' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: show only phone + email in a single compact row */}
        <div className="flex md:hidden items-center justify-between py-2 gap-4">
          <a href="tel:+12892413136" className="flex items-center gap-2 hover:opacity-80 transition-opacity min-w-0">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#A68F59' }} />
            <span className="text-xs truncate" style={{ color: '#F5F1EB' }}>+1 (289) 241-3136</span>
          </a>
          <a href="mailto:support@creova.ca" className="flex items-center gap-2 hover:opacity-80 transition-opacity min-w-0">
            <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#A68F59' }} />
            <span className="text-xs truncate" style={{ color: '#F5F1EB' }}>support@creova.ca</span>
          </a>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 py-3">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity w-full"
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: '#A68F59' }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs" style={{ color: '#7A6F66' }}>{item.label}</div>
                    <div className="text-sm truncate" style={{ color: '#F5F1EB' }}>{item.value}</div>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: '#A68F59' }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs" style={{ color: '#7A6F66' }}>{item.label}</div>
                    <div className="text-sm truncate" style={{ color: '#F5F1EB' }}>{item.value}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}