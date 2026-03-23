import { useState } from 'react';
import { Link } from 'react-router';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { CartDrawer } from './CartDrawer';
import { LanguageSwitcher } from './LanguageSwitcher';
import creovaLogo from 'figma:asset/1253f3bdc503d1419fa74efcfbe871b2538a54b3.png';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [pricingDropdownOpen, setPricingDropdownOpen] = useState(false);
  const { totalItems } = useCart();
  const { t } = useLanguage();

  const navLinks = [
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.shop'), path: '/shop' },
    { name: t('nav.digital'), path: '/digital-products' },
    { name: t('nav.experience'), path: '/experience' },
    { name: t('nav.community'), path: '/community' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const pricingCategories = [
    { name: 'All Pricing', path: '/pricing', description: 'View complete pricing guide' },
    { name: 'Family Portraits', path: '/pricing#family', description: 'Mini Memories, Timeless Bonds, Legacy Heirloom' },
    { name: 'Brand Identity', path: '/pricing#brand', description: 'Profile Pro, Workspace Stories, Brand Vision' },
    { name: 'Product Photography', path: '/pricing#commerce', description: 'E-commerce & lifestyle product shots' },
    { name: 'Aerial/Drone', path: '/pricing#aerial', description: 'Cinematic aerial perspectives' },
    { name: 'Event Coverage', path: '/pricing#events', description: 'Photo + video packages' },
    { name: 'Social Media', path: '/pricing#social', description: 'Monthly management plans' },
    { name: 'Graphic Design', path: '/pricing#design', description: 'Branding & visual identity' },
  ];

  return (
    <>
      <nav className="sticky top-[52px] z-50 border-b bg-[#F5F1EB]" style={{ borderColor: '#E3DCD3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group" onClick={() => setIsOpen(false)}>
              <img 
                src={creovaLogo} 
                alt="CREOVA - Creative Stories, Digital Impact" 
                className="h-12 w-auto transition-all duration-300 group-hover:scale-105"
                style={{ filter: 'brightness(1.1) contrast(1.2)' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 transition-colors duration-300 text-sm tracking-wide font-medium"
                  style={{ color: '#4A3E36' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#B1643B'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4A3E36'}
                >
                  {link.name}
                </Link>
              ))}

              {/* Pricing Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setPricingDropdownOpen(true)}
                onMouseLeave={() => setPricingDropdownOpen(false)}
              >
                <button
                  className="px-4 py-2 transition-colors duration-300 text-sm tracking-wide font-medium flex items-center hover:bg-transparent"
                  style={{ color: pricingDropdownOpen ? '#B1643B' : '#4A3E36' }}
                >
                  Pricing
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${pricingDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {pricingDropdownOpen && (
                  <div 
                    className="absolute left-0 mt-0 w-80 rounded-lg shadow-2xl overflow-hidden z-50"
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E3DCD3' }}
                  >
                    {pricingCategories.map((category, index) => (
                      <Link
                        key={category.path}
                        to={category.path}
                        onClick={() => setPricingDropdownOpen(false)}
                        className={`block px-5 py-3 transition-all duration-200 ${index === 0 ? 'border-b-2' : ''}`}
                        style={{ 
                          borderColor: index === 0 ? '#A68F59' : 'transparent',
                          backgroundColor: '#FFFFFF'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#F5F1EB';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                        }}
                      >
                        <div className="text-sm font-medium" style={{ color: '#121212' }}>
                          {category.name}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: '#7A6F66' }}>
                          {category.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Cart & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher - Desktop */}
              <div className="hidden lg:flex">
                <LanguageSwitcher />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCartOpen(true)}
                className="relative hover:bg-transparent"
                style={{ color: '#121212' }}
                aria-label={`Shopping cart with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    style={{ backgroundColor: '#B1643B' }}
                  >
                    {totalItems}
                  </span>
                )}
              </Button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden transition-colors"
                style={{ color: '#121212' }}
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-4 space-y-1 border-t" style={{ borderColor: '#E3DCD3' }}>
              {/* Language Switcher - Mobile */}
              <div className="px-4 py-3 border-b" style={{ borderColor: '#E3DCD3' }}>
                <LanguageSwitcher />
              </div>
              
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 transition-colors text-sm tracking-wide"
                  style={{ color: '#4A3E36' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#B1643B'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#4A3E36'}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Pricing Accordion */}
              <div>
                <button
                  onClick={() => setPricingDropdownOpen(!pricingDropdownOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 transition-colors text-sm tracking-wide"
                  style={{ color: '#4A3E36' }}
                >
                  Pricing
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${pricingDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {pricingDropdownOpen && (
                  <div className="py-2 pl-4 space-y-1" style={{ backgroundColor: '#F5F1EB' }}>
                    {pricingCategories.map((category, index) => (
                      <Link
                        key={category.path}
                        to={category.path}
                        onClick={() => {
                          setIsOpen(false);
                          setPricingDropdownOpen(false);
                        }}
                        className={`block py-2 px-4 transition-colors ${index === 0 ? 'border-b pb-3 mb-2' : ''}`}
                        style={{ 
                          color: '#4A3E36',
                          borderColor: index === 0 ? '#A68F59' : 'transparent'
                        }}
                      >
                        <div className="text-sm">{category.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#7A6F66' }}>
                          {category.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}