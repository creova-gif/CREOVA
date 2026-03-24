import { Download, FileText, Image, Video, Palette, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CartItem } from '../../App';

type DigitalProductsPageProps = {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
};

export function DigitalProductsPage({ addToCart }: DigitalProductsPageProps) {
  const products = [
    {
      id: 'preset-pack-1',
      name: 'CREOVA Lightroom Preset Pack - Urban Edition',
      price: 29,
      category: 'Presets',
      icon: Image,
      description: 'Professional Lightroom presets for urban photography',
      includes: ['15 Lightroom presets', 'Mobile & desktop compatible', 'Installation guide', 'Before/after examples'],
      preview: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500'
    },
    {
      id: 'preset-pack-2',
      name: 'CREOVA Preset Pack - Portrait Glow',
      price: 29,
      category: 'Presets',
      icon: Image,
      description: 'Warm, glowing presets perfect for portraits and lifestyle',
      includes: ['12 Lightroom presets', 'Skin tone optimized', 'Mobile & desktop', 'Tutorial video'],
      preview: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500'
    },
    {
      id: 'brand-template',
      name: 'Social Media Brand Template Kit',
      price: 49,
      category: 'Templates',
      icon: Palette,
      description: 'Complete Canva template pack for consistent branding',
      includes: ['50+ templates (IG, TikTok, FB)', 'Stories, posts, reels', 'Fully customizable', 'Font & color guide'],
      preview: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500'
    },
    {
      id: 'lut-pack',
      name: 'Cinematic LUT Pack for Video',
      price: 39,
      category: 'Video',
      icon: Video,
      description: 'Professional color grading LUTs for filmmakers',
      includes: ['20 cinematic LUTs', 'Compatible with Premiere, Final Cut, DaVinci', 'Tutorial included', 'Instant download'],
      preview: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500'
    },
    {
      id: 'branding-guide',
      name: 'DIY Brand Identity Workbook',
      price: 19,
      category: 'Guides',
      icon: FileText,
      description: 'Step-by-step guide to building your brand identity',
      includes: ['40-page PDF workbook', 'Exercises & templates', 'Color theory guide', 'Logo design basics'],
      preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500'
    },
    {
      id: 'photo-guide',
      name: 'Product Photography Guide for Entrepreneurs',
      price: 24,
      category: 'Guides',
      icon: FileText,
      description: 'Master product photography with DIY lighting setups',
      includes: ['Comprehensive PDF guide', 'Equipment recommendations', 'Lighting diagrams', 'Editing tips'],
      preview: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=500'
    },
    {
      id: 'email-templates',
      name: 'Client Communication Email Templates',
      price: 15,
      category: 'Templates',
      icon: FileText,
      description: 'Professional email templates for creatives',
      includes: ['15 email templates', 'Booking confirmations', 'Invoice & reminder emails', 'Customizable docs'],
      preview: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=500'
    },
    {
      id: 'contract-pack',
      name: 'Photography Contract & Forms Bundle',
      price: 35,
      category: 'Legal',
      icon: FileText,
      description: 'Protect your business with professional contracts',
      includes: ['Photography contract template', 'Model release forms', 'Invoice template', 'Terms & conditions'],
      preview: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500'
    }
  ];

  const categories = ['All', 'Presets', 'Templates', 'Video', 'Guides', 'Legal'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Instant Download</Badge>
          <h1 className="text-4xl md:text-5xl mb-4">Digital Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Presets, templates, guides, and tools to level up your creative workflow. 
            All products are instantly downloadable after purchase.
          </p>
          
          {/* Coming Soon Notice */}
          <div className="mt-8 bg-black text-white rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl mb-2">🚀 Launching Summer 2026</h3>
            <p className="text-gray-300 mb-4">
              Our digital products collection launches in <strong>Summer 2026</strong>! 
              Professional tools and resources to elevate your creative work.
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Refined, expanded, and built with intention.
            </p>
            <Badge variant="secondary" style={{ backgroundColor: '#A68F59', color: '#121212' }}>
              Available for purchase Summer 2026
            </Badge>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow relative">
              <div className="aspect-video bg-gray-100 relative">
                <img src={product.preview} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge>{product.category}</Badge>
                </div>
                {/* Coming Soon Badge */}
                <div className="absolute top-4 left-4">
                  <Badge style={{ backgroundColor: '#A68F59', color: '#121212' }}>
                    Summer 2026
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <product.icon className="h-6 w-6 mt-1 flex-shrink-0" />
                    <span>{product.name}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="mb-4">
                  <p className="mb-2">Includes:</p>
                  <ul className="space-y-1">
                    {product.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl">${product.price}</span>
                  <Button
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      type: 'digital'
                    })}
                    disabled
                    style={{ opacity: 0.6 }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Join Waitlist
                  </Button>
                </div>
                
                {/* Waitlist micro-copy */}
                <p className="text-[10px] tracking-wide mt-2" style={{ color: '#7A6F66' }}>
                  Launching April. Join the waitlist to be part of first access.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Download className="h-8 w-8 mx-auto mb-3" />
              <h3 className="mb-2">Instant Access</h3>
              <p className="text-gray-600">Download immediately after purchase</p>
            </div>
            <div>
              <FileText className="h-8 w-8 mx-auto mb-3" />
              <h3 className="mb-2">Lifetime Updates</h3>
              <p className="text-gray-600">Get free updates as we improve our products</p>
            </div>
            <div>
              <Users className="h-8 w-8 mx-auto mb-3" />
              <h3 className="mb-2">Community Support</h3>
              <p className="text-gray-600">Join our Discord for tips and help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function useState(initialValue: string): [string, (value: string) => void] {
  const [state, setState] = (window as any).React?.useState(initialValue) || [initialValue, () => {}];
  return [state, setState];
}