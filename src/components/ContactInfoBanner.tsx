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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-3">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center gap-3 min-h-[48px]">
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity w-full"
                >
                  <item.icon className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: '#A68F59' }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs hidden md:block" style={{ color: '#7A6F66' }}>
                      {item.label}
                    </div>
                    <div className="text-sm sm:text-sm truncate" style={{ color: '#F5F1EB' }}>
                      {item.value}
                    </div>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <item.icon className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: '#A68F59' }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs hidden md:block" style={{ color: '#7A6F66' }}>
                      {item.label}
                    </div>
                    <div className="text-sm sm:text-sm truncate" style={{ color: '#F5F1EB' }}>
                      {item.value}
                    </div>
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