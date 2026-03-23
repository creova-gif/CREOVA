import { Link } from 'react-router';
import { Instagram, Mail, MapPin, Linkedin } from 'lucide-react';
import creovaLogo from '../assets/creova-logo.png';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer style={{ backgroundColor: '#121212', color: '#E3DCD3' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src={creovaLogo} 
              alt="CREOVA - Creative Stories, Digital Impact" 
              className="h-10 w-auto"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 tracking-wide" style={{ color: '#A68F59' }}>{t('footer.section.services')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="hover:opacity-70 transition-opacity" style={{ color: '#E3DCD3' }}>
                  {t('services.photo.title')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:opacity-70 transition-opacity" style={{ color: '#E3DCD3' }}>
                  {t('services.video.title')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:opacity-70 transition-opacity" style={{ color: '#E3DCD3' }}>
                  {t('services.brand.title')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:opacity-70 transition-opacity" style={{ color: '#E3DCD3' }}>
                  {t('services.social.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 tracking-wide" style={{ color: '#A68F59' }}>{t('nav.shop')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:opacity-70 transition-opacity" style={{ color: '#E3DCD3' }}>
                  Merchandise
                </Link>
              </li>
              <li>
                <Link to="/digital-products" className="hover:opacity-70 transition-opacity" style={{ color: '#E3DCD3' }}>
                  Digital Products
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:opacity-70 transition-opacity" style={{ color: '#E3DCD3' }}>
                  Events & Workshops
                </Link>
              </li>
              <li>
                <Link to="/events#contact-form" className="hover:opacity-70 transition-opacity" style={{ color: '#E3DCD3' }}>
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 tracking-wide" style={{ color: '#A68F59' }}>Connect</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5" style={{ color: '#A68F59' }} />
                <span style={{ color: '#E3DCD3' }}>Ontario, Canada</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-0.5" style={{ color: '#A68F59' }} />
                <a 
                  href="mailto:support@creova.ca" 
                  className="hover:opacity-70 transition-opacity break-all"
                  style={{ color: '#E3DCD3' }}
                >
                  support@creova.ca
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Instagram className="w-4 h-4 mt-0.5" style={{ color: '#A68F59' }} />
                <a 
                  href="https://instagram.com/creativeinnovation__" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity text-sm"
                  style={{ color: '#E3DCD3' }}
                >
                  @creativeinnovation__
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Linkedin className="w-4 h-4 mt-0.5" style={{ color: '#A68F59' }} />
                <a 
                  href="https://www.linkedin.com/company/creovaspace/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity text-sm"
                  style={{ color: '#E3DCD3' }}
                >
                  CREOVA
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-sm text-center" style={{ borderColor: '#2C2C2C' }}>
          <p className="text-xs mb-4" style={{ color: '#7A6F66' }}>
            * All prices displayed in Canadian Dollars (CAD). 13% GST/HST (Ontario) applies to all services, products, and memberships.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <Link 
              to="/terms-of-service" 
              className="hover:opacity-70 transition-opacity" 
              style={{ color: '#A68F59' }}
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy-policy" 
              className="hover:opacity-70 transition-opacity" 
              style={{ color: '#A68F59' }}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/contact" 
              className="hover:opacity-70 transition-opacity" 
              style={{ color: '#A68F59' }}
            >
              Contact Us
            </Link>
          </div>
          <p style={{ color: '#A68F59' }}>© {new Date().getFullYear()} CREOVA. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}