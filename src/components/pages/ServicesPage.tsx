import { Camera, Video, Users, Package, Plane, TrendingUp, Palette } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CartItem } from '../../App';

type ServicesPageProps = {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
};

export function ServicesPage({ addToCart }: ServicesPageProps) {
  const services = [
    {
      category: 'Family Photography',
      icon: Users,
      packages: [
        {
          name: 'Mini Memories',
          price: 450,
          duration: '45 minutes',
          details: ['10 professionally edited photos', 'Up to 5 family members', '1 location', 'Online gallery delivery']
        },
        {
          name: 'Timeless Bonds',
          price: 650,
          duration: '1.5 hours',
          details: ['25 edited photos', 'Up to 10 family members', '1-2 locations', 'Group + individual portraits', 'Online gallery + print release']
        },
        {
          name: 'Legacy Heirloom',
          price: 950,
          duration: '2 hours',
          details: ['40+ edited photos', 'Up to 15 people', 'Posed + candid moments', '2 locations + outfit change', 'Optional print options']
        }
      ]
    },
    {
      category: 'Brand Photography',
      icon: Camera,
      packages: [
        {
          name: 'Profile Pro',
          price: 600,
          duration: '1-1.5 hours',
          details: ['Up to 10 team members', '1 outfit per person', 'Branded background options', '1 retouched headshot per person', 'Perfect for LinkedIn & websites']
        },
        {
          name: 'Workspace Stories',
          price: 850,
          duration: '2 hours',
          details: ['Group headshots + candid moments', 'Up to 15 team members', '20+ edited images', 'Ideal for startups & agencies']
        },
        {
          name: 'Brand Vision Suite',
          price: 1250,
          duration: '3-4 hours',
          details: ['Full creative direction', 'Team + workspace + culture shots', '50+ curated photos', 'Optional 1-min video (+$250)', 'Great for campaigns & press kits']
        }
      ]
    },
    {
      category: 'Product Photography',
      icon: Package,
      packages: [
        {
          name: 'Product Spotlight',
          price: 750,
          duration: 'Half day',
          details: ['10 styled product photos', '1-minute product video', 'Flat-lays or lifestyle scenes', 'Commercial use license', 'Styling consultation included']
        }
      ]
    },
    {
      category: 'Event Coverage',
      icon: Video,
      packages: [
        {
          name: 'Essence Package',
          price: 750,
          duration: '3 hours',
          details: ['50+ edited images or 2-3 min video', '1 location', 'Online delivery', 'Ideal for intimate gatherings']
        },
        {
          name: 'Signature Story',
          price: 1350,
          duration: '6 hours',
          details: ['Photo + video coverage', '100+ edited images', '3-5 min highlight film', '2-person creative team', 'Pre-event planning session']
        },
        {
          name: 'Heritage Experience',
          price: 2550,
          duration: '8-10 hours',
          details: ['200+ curated images', '5-7 min cinematic film', 'Drone footage included', 'Custom USB + online gallery', 'Full-day wedding coverage']
        }
      ]
    },
    {
      category: 'Aerial & Drone',
      icon: Plane,
      packages: [
        {
          name: 'Aerial Vision Session',
          price: 500,
          duration: '1 hour',
          details: ['20+ aerial photos', '30-60 sec cinematic video', 'Licensed & insured operator', 'Travel included (Niagara)', 'Perfect for real estate & tourism']
        }
      ]
    },
    {
      category: 'Social Media Management',
      icon: TrendingUp,
      packages: [
        {
          name: 'Starter Plan',
          price: 950,
          duration: 'per month',
          details: ['12 curated posts', 'Captions & hashtags', '1 strategy call/month', '1 platform (IG or TikTok)']
        },
        {
          name: 'Growth Plan',
          price: 1500,
          duration: 'per month',
          details: ['20+ posts/month', 'Community engagement', 'Monthly analytics', '1-2 platforms']
        },
        {
          name: 'Creator+ Plan',
          price: 2500,
          duration: 'per month',
          details: ['Cross-platform growth', 'Influencer outreach', 'Paid ad setup', 'Full content production']
        }
      ]
    },
    {
      category: 'Brand Management',
      icon: Palette,
      packages: [
        {
          name: 'Brand Essentials Kit',
          price: 600,
          duration: '1 week',
          details: ['3 branded templates', 'Color palette + fonts', 'Light brand guide', 'Canva-based files']
        },
        {
          name: 'Visual Starter Identity',
          price: 1200,
          duration: '2 weeks',
          details: ['Primary + alternate logo', 'Moodboard & direction', 'Brand guide', '5 branded visuals', 'Print-ready files']
        },
        {
          name: 'Signature Identity Suite',
          price: 3000,
          duration: '4 weeks',
          details: ['Full logo suite', 'Typography + color system', 'Visual language guide', 'Asset kit & mockups', 'All file formats']
        }
      ]
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Professional Creative Services</Badge>
          <h1 className="text-4xl md:text-5xl mb-4">CREOVA Services & Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent pricing. Real value. Designed for impact. Each package includes professional equipment, 
            editing, and online delivery.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={index}>
              <div className="flex items-center gap-3 mb-6">
                <service.icon className="h-8 w-8" />
                <h2 className="text-3xl">{service.category}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.packages.map((pkg, pkgIndex) => (
                  <Card key={pkgIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>{pkg.name}</span>
                        <Badge variant="secondary">${pkg.price}</Badge>
                      </CardTitle>
                      <p className="text-gray-600">{pkg.duration}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {pkg.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        onClick={() => addToCart({
                          id: `service-${index}-${pkgIndex}`,
                          name: `${service.category} - ${pkg.name}`,
                          price: pkg.price,
                          type: 'service'
                        })}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Special Rates */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl mb-6 text-center">Special Discounts</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">15%</div>
              <p className="text-gray-600">Returning Clients</p>
            </div>
            <div>
              <div className="text-3xl mb-2">10%</div>
              <p className="text-gray-600">Photo + Video Bundle</p>
            </div>
            <div>
              <div className="text-3xl mb-2">$25</div>
              <p className="text-gray-600">Referral Credit</p>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6">
            Community rates available for students, nonprofits, and grassroots organizations
          </p>
        </div>
      </div>
    </div>
  );
}