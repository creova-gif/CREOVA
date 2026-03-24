import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { CartItem } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type ShopPageProps = {
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
};

export function ShopPage({ addToCart }: ShopPageProps) {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const products = [
    {
      id: 'tshirt-black',
      name: 'CREOVA Signature Tee - Black',
      price: 35,
      category: 'Apparel',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Premium cotton tee with embroidered logo'
    },
    {
      id: 'tshirt-white',
      name: 'CREOVA Signature Tee - White',
      price: 35,
      category: 'Apparel',
      image: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Classic white tee with black embroidered logo'
    },
    {
      id: 'hoodie-black',
      name: 'CREOVA Hoodie - Black',
      price: 65,
      category: 'Apparel',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Heavyweight fleece hoodie with front logo'
    },
    {
      id: 'cap-black',
      name: 'CREOVA Baseball Cap',
      price: 30,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500',
      sizes: ['One Size'],
      description: 'Adjustable snapback with embroidered logo'
    },
    {
      id: 'tote-bag',
      name: 'CREOVA Canvas Tote',
      price: 25,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1590498603385-17ffb3a7f29f?w=500',
      sizes: ['One Size'],
      description: 'Heavy-duty canvas tote for all your gear'
    },
    {
      id: 'sweatshirt',
      name: 'CREOVA Crewneck - Beige',
      price: 55,
      category: 'Apparel',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Cozy crewneck with screen-printed logo'
    },
    {
      id: 'beanie',
      name: 'CREOVA Beanie',
      price: 20,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500',
      sizes: ['One Size'],
      description: 'Warm knit beanie with woven label'
    },
    {
      id: 'jacket',
      name: 'CREOVA Windbreaker',
      price: 85,
      category: 'Apparel',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Water-resistant jacket with zip pockets'
    }
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      type: 'clothing',
      image: product.image,
      size: size
    });
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Official Merchandise</Badge>
          <h1 className="text-4xl md:text-5xl mb-4">CREOVA Shop</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wear your creativity. Rep the brand. Quality apparel and accessories for creators and culture-makers.
          </p>
          
          {/* Coming Soon Notice */}
          <div className="mt-8 bg-black text-white rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl mb-2">Launching Summer 2026</h3>
            <p className="text-gray-300 mb-4">
              Our CREOVA merchandise collection launches in <strong>Summer 2026</strong>. 
              Be the first to rep the brand.
            </p>
            <Badge variant="secondary" style={{ backgroundColor: '#A68F59', color: '#121212' }}>
              Pre-orders opening soon
            </Badge>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow relative">
              {/* Coming Soon Overlay */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-black text-white text-center py-2">
                <Badge style={{ backgroundColor: '#A68F59', color: '#121212' }}>
                  Launching Summer 2026
                </Badge>
              </div>
              
              <div className="aspect-square bg-gray-100 mt-10">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                <h3 className="mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl">${product.price}</span>
                </div>
                
                {/* Size Selector */}
                <div className="mb-3">
                  <Select
                    value={selectedSizes[product.id] || product.sizes[0]}
                    onValueChange={(value) => setSelectedSizes(prev => ({ ...prev, [product.id]: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                  disabled
                  style={{ opacity: 0.6 }}
                >
                  Coming Summer 2026
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $75 within Canada</p>
            </div>
            <div>
              <h3 className="mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium materials, ethically sourced</p>
            </div>
            <div>
              <h3 className="mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy on all items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}