import { useState } from 'react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'sonner@2.0.3';
import { Heart, ChevronDown, Eye, Calendar, Package } from 'lucide-react';
import { motion } from 'motion/react';
import { ProductQuickView } from '../components/ProductQuickView';
import { SizeGuide } from '../components/SizeGuide';
import { AddToCartDialog } from '../components/AddToCartDialog';

export function ShopPage() {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, { name: string; hex: string }>>({});
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addToCartDialogOpen, setAddToCartDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // CREOVA Color Palette - Age-Inclusive (5-90 Years)
  const colorPalette = {
    'Jet Black': '#000000',
    'Stone White': '#F5F5F5',
    'Charcoal Gray': '#3C3C3C',
    'Olive Green': '#6B8E23',
    'Sahara Beige': '#D8CAB8',
    'Burnt Sienna': '#E97451',
    'Dusty Rose': '#C48C8C',
    'Ocean Blue': '#1E5F74',
    'Mustard Gold': '#D4A02F',
    'Mocha Brown': '#7B5E57',
    'Earth Clay': '#B1643B',
    'Olive Gold': '#A68F59'
  };

  const products = [
    // GRAPHIC TEES
    {
      id: 'graphic-tee-soft-power',
      name: 'SOFT POWER GRAPHIC TEE',
      price: 55,
      image: 'https://images.unsplash.com/photo-1610502778270-c5c6f4c7d575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRzaGlydCUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMTkyNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1722926628555-252c1c0258bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwdHNoaXJ0JTIwbWluaW1hbHxlbnwxfHx8fDE3NjMyNTIyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      colors: ['Jet Black', 'Stone White', 'Charcoal Gray', 'Burnt Sienna', 'Olive Green'],
      category: 'tees',
      badge: 'NEW SEASON',
      description: 'Premium cotton graphic tee from the SEEN collection'
    },
    {
      id: 'graphic-tee-visibility',
      name: 'VISIBILITY GRAPHIC TEE',
      price: 55,
      image: 'https://images.unsplash.com/photo-1722310752951-4d459d28c678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHdoaXRlJTIwdHNoaXJ0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyMzI3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1716541425103-fcfd4bf88c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGJsYWNrJTIwdHNoaXJ0JTIwZmxhdHxlbnwxfHx8fDE3NjMyNTA0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      colors: ['Stone White', 'Jet Black', 'Sahara Beige', 'Dusty Rose'],
      category: 'tees',
      badge: 'NEW SEASON',
      description: 'Bold visibility statement on premium cotton'
    },
    {
      id: 'graphic-tee-resistance',
      name: 'RESISTANCE GRAPHIC TEE',
      price: 55,
      image: 'https://images.unsplash.com/photo-1693443688057-85f57b872a3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGdyYXklMjBzaGlydCUyMG1pbmltYWx8ZW58MXx8fHwxNzYzMjUwNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1716541425103-fcfd4bf88c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGJsYWNrJTIwdHNoaXJ0JTIwZmxhdHxlbnwxfHx8fDE3NjMyNTA0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      colors: ['Jet Black', 'Burnt Sienna', 'Olive Green', 'Charcoal Gray'],
      category: 'tees',
      description: 'Soft resistance messaging with bold graphic'
    },
    {
      id: 'graphic-tee-diaspora',
      name: 'DIASPORA ROOTS GRAPHIC TEE',
      price: 55,
      image: 'https://images.unsplash.com/photo-1731267776886-90f90af75eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGJlaWdlJTIwdHNoaXJ0fGVufDF8fHx8MTc2MzI1MDQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1716541425103-fcfd4bf88c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGJsYWNrJTIwdHNoaXJ0JTIwZmxhdHxlbnwxfHx8fDE3NjMyNTA0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      colors: ['Earth Clay', 'Jet Black', 'Mocha Brown', 'Burnt Sienna'],
      category: 'tees',
      badge: 'LIMITED',
      description: 'Celebrating African diaspora heritage'
    },
    {
      id: 'graphic-tee-archive',
      name: 'WEARABLE ARCHIVE GRAPHIC TEE',
      price: 58,
      image: 'https://images.unsplash.com/photo-1722310752951-4d459d28c678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHdoaXRlJTIwdHNoaXJ0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyMzI3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1731267776886-90f90af75eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGJlaWdlJTIwdHNoaXJ0fGVufDF8fHx8MTc2MzI1MDQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      colors: ['Stone White', 'Sahara Beige', 'Charcoal Gray', 'Dusty Rose'],
      category: 'tees',
      badge: 'PREMIUM',
      description: 'Museum-quality print on heavyweight cotton'
    },
    {
      id: 'graphic-tee-community',
      name: 'COMMUNITY POWER GRAPHIC TEE',
      price: 55,
      image: 'https://images.unsplash.com/photo-1693443688057-85f57b872a3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGdyYXklMjBzaGlydCUyMG1pbmltYWx8ZW58MXx8fHwxNzYzMjUwNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1722310752951-4d459d28c678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHdoaXRlJTIwdHNoaXJ0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyMzI3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      colors: ['Jet Black', 'Olive Green', 'Ocean Blue', 'Mustard Gold'],
      category: 'tees',
      description: 'Collective strength and unity graphic'
    },

    // LONG-SLEEVES
    {
      id: 'longsleeve-archive',
      name: 'ARCHIVE LONG-SLEEVE',
      price: 60,
      image: 'https://images.unsplash.com/photo-1666358085449-a10a39f33942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25nc2xlZXZlJTIwc2hpcnQlMjBmbGF0fGVufDF8fHx8MTc2MzI1MDQ2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1731267776886-90f90af75eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGJlaWdlJTIwdHNoaXJ0fGVufDF8fHx8MTc2MzI1MDQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      colors: ['Stone White', 'Sahara Beige', 'Charcoal Gray', 'Mocha Brown'],
      category: 'tees',
      description: 'Wearable archive with embroidered storytelling'
    },
    {
      id: 'longsleeve-heritage',
      name: 'HERITAGE LONG-SLEEVE',
      price: 60,
      image: 'https://images.unsplash.com/photo-1666358085449-a10a39f33942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25nc2xlZXZlJTIwc2hpcnQlMjBmbGF0fGVufDF8fHx8MTc2MzI1MDQ2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1693443688057-85f57b872a3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGdyYXklMjBzaGlydCUyMG1pbmltYWx8ZW58MXx8fHwxNzYzMjUwNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      colors: ['Jet Black', 'Earth Clay', 'Olive Green', 'Burnt Sienna'],
      category: 'tees',
      badge: 'LIMITED',
      description: 'Long-sleeve celebrating cultural heritage'
    },

    // HOODIES & CREWNECKS
    {
      id: 'oversized-hoodie-earth',
      name: 'AFRO-MINIMAL HOODIE',
      price: 85,
      image: 'https://images.unsplash.com/photo-1647768617268-06697e8a91d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMGZsYXQlMjBsYXl8ZW58MXx8fHwxNzYzMjUwNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1761891873744-eb181eb1334a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHN3ZWF0c2hpcnQlMjBwcm9kdWN0fGVufDF8fHx8MTc2MzI1MDQ2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['Earth Clay', 'Jet Black', 'Ocean Blue', 'Olive Green', 'Mocha Brown'],
      category: 'hoodies',
      badge: 'LIMITED',
      description: 'Heavyweight oversized hoodie with poetic utility'
    },
    {
      id: 'crewneck-visibility',
      name: 'VISIBILITY CREWNECK',
      price: 78,
      image: 'https://images.unsplash.com/photo-1724296532350-4b8d63cd6559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmV3bmVjayUyMHN3ZWF0c2hpcnQlMjBwcm9kdWN0fGVufDF8fHx8MTc2MzI1MDQ2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1761891873744-eb181eb1334a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHN3ZWF0c2hpcnQlMjBwcm9kdWN0fGVufDF8fHx8MTc2MzI1MDQ2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['Jet Black', 'Charcoal Gray', 'Dusty Rose', 'Sahara Beige'],
      category: 'hoodies',
      description: 'Contemporary crewneck with story patch detail'
    },
    {
      id: 'hoodie-soft-power',
      name: 'SOFT POWER HOODIE',
      price: 85,
      image: 'https://images.unsplash.com/photo-1647768617268-06697e8a91d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMGZsYXQlMjBsYXl8ZW58MXx8fHwxNzYzMjUwNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1761891873744-eb181eb1334a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHN3ZWF0c2hpcnQlMjBwcm9kdWN0fGVufDF8fHx8MTc2MzI1MDQ2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['Jet Black', 'Olive Gold', 'Ocean Blue', 'Charcoal Gray'],
      category: 'hoodies',
      badge: 'NEW SEASON',
      description: 'Signature hoodie from SEEN collection'
    },
    {
      id: 'crewneck-archive',
      name: 'ARCHIVE CREWNECK',
      price: 78,
      image: 'https://images.unsplash.com/photo-1724296532350-4b8d63cd6559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmV3bmVjayUyMHN3ZWF0c2hpcnQlMjBwcm9kdWN0fGVufDF8fHx8MTc2MzI1MDQ2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1647768617268-06697e8a91d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMGZsYXQlMjBsYXl8ZW58MXx8fHwxNzYzMjUwNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['Stone White', 'Sahara Beige', 'Mocha Brown', 'Charcoal Gray'],
      category: 'hoodies',
      description: 'Clean crewneck with minimalist branding'
    },

    // JACKETS
    {
      id: 'varsity-jacket-premium',
      name: 'HERITAGE VARSITY JACKET',
      price: 175,
      image: 'https://images.unsplash.com/photo-1592878849122-facb97520f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YXJzaXR5JTIwamFja2V0JTIwbWluaW1hbHxlbnwxfHx8fDE3NjMyNTA0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1565117868311-e539525508ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwamFja2V0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyNTA0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Olive Gold', 'Jet Black', 'Charcoal Gray', 'Ocean Blue'],
      category: 'jackets',
      badge: 'PREMIUM',
      description: 'Numbered small-batch varsity jacket with embroidered patches'
    },
    {
      id: 'windbreaker-light',
      name: 'SOFT POWER WINDBREAKER',
      price: 120,
      image: 'https://images.unsplash.com/photo-1624548139462-89b5a73ffdd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kYnJlYWtlciUyMGphY2tldCUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMjUwNDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1565117868311-e539525508ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwamFja2V0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyNTA0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['Sahara Beige', 'Olive Green', 'Ocean Blue', 'Burnt Sienna'],
      category: 'jackets',
      badge: 'NEW SEASON',
      description: 'Eco-conscious windbreaker with QR-linked experience'
    },
    {
      id: 'bomber-jacket',
      name: 'VISIBILITY BOMBER JACKET',
      price: 165,
      image: 'https://images.unsplash.com/photo-1583401915223-1a3ee3b57299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib21iZXIlMjBqYWNrZXQlMjBtaW5pbWFsfGVufDF8fHx8MTc2MzI1MDQ3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1565117868311-e539525508ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwamFja2V0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyNTA0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Jet Black', 'Olive Gold', 'Earth Clay', 'Ocean Blue'],
      category: 'jackets',
      badge: 'LIMITED',
      description: 'Classic bomber with heritage details'
    },

    // PANTS
    {
      id: 'cargo-pants-utility',
      name: 'UTILITY CARGO PANTS',
      price: 95,
      image: 'https://images.unsplash.com/photo-1719473448126-eb1159ec5242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHBhbnRzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyNTA0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1758520705584-3554caf304eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGpvZ2dlcnMlMjBwcm9kdWN0fGVufDF8fHx8MTc2MzIzMjc1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['28', '30', '32', '34', '36', '38'],
      colors: ['Olive Green', 'Jet Black', 'Charcoal Gray', 'Mocha Brown', 'Sahara Beige'],
      category: 'pants',
      description: 'Design-forward cargo pants with functional pockets'
    },
    {
      id: 'jogger-pants-comfort',
      name: 'ESSENTIAL JOGGERS',
      price: 85,
      image: 'https://images.unsplash.com/photo-1758520705584-3554caf304eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMGpvZ2dlcnMlMjBwcm9kdWN0fGVufDF8fHx8MTc2MzIzMjc1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1719473448126-eb1159ec5242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHBhbnRzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyNTA0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['Jet Black', 'Charcoal Gray', 'Ocean Blue', 'Mocha Brown'],
      category: 'pants',
      description: 'Comfort-first joggers for everyday wear'
    },

    // SETS
    {
      id: 'tracksuit-set-archive',
      name: 'ARCHIVE TRACKSUIT SET',
      price: 135,
      image: 'https://images.unsplash.com/photo-1648962492951-f53233989f81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFja3N1aXQlMjBwcm9kdWN0JTIwcGhvdG98ZW58MXx8fHwxNzYzMjMyMzUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1749413067075-d3d4efa2959a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2xvdGhpbmclMjBmbGF0bGF5fGVufDF8fHx8MTc2MzIzMjM0OHww&ixlib=rb-4.1.0&q=80&w=1080',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['Earth Clay', 'Jet Black', 'Olive Green', 'Charcoal Gray', 'Dusty Rose'],
      category: 'sets',
      badge: 'LIMITED',
      description: 'Complete tracksuit set with coordinated storytelling'
    },
    {
      id: 'tracksuit-set-heritage',
      name: 'HERITAGE TRACKSUIT SET',
      price: 145,
      image: 'https://images.unsplash.com/photo-1749413067075-d3d4efa2959a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2xvdGhpbmclMjBmbGF0bGF5fGVufDF8fHx8MTc2MzIzMjM0OHww&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1648962492951-f53233989f81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFja3N1aXQlMjBwcm9kdWN0JTIwcGhvdG98ZW58MXx8fHwxNzYzMjMyMzUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: ['Ocean Blue', 'Mocha Brown', 'Olive Gold', 'Burnt Sienna'],
      category: 'sets',
      badge: 'PREMIUM',
      description: 'Premium tracksuit with embroidered heritage details'
    },

    // ACCESSORIES
    {
      id: 'bucket-hat-seen',
      name: 'SEEN BUCKET HAT',
      price: 38,
      image: 'https://images.unsplash.com/photo-1581688307440-8bb9ad534fd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWNrZXQlMjBoYXQlMjBwcm9kdWN0JTIwZmxhdHxlbnwxfHx8fDE3NjMyNTI2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1581688307440-8bb9ad534fd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWNrZXQlMjBoYXQlMjBwcm9kdWN0JTIwZmxhdHxlbnwxfHx8fDE3NjMyNTI2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      sizes: ['One Size'],
      colors: ['Jet Black', 'Sahara Beige', 'Olive Green', 'Burnt Sienna', 'Earth Clay'],
      category: 'accessories',
      badge: 'NEW SEASON',
      description: 'Bucket hat from the SEEN collection'
    },
    {
      id: 'dad-hat-logo',
      name: 'CREOVA LOGO DAD HAT',
      price: 32,
      image: 'https://images.unsplash.com/photo-1587493681629-6b4c02555fee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMGNhcCUyMHByb2R1Y3QlMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2MzI1MjY2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1587493681629-6b4c02555fee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMGNhcCUyMHByb2R1Y3QlMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2MzI1MjY2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      sizes: ['One Size'],
      colors: ['Olive Gold', 'Jet Black', 'Charcoal Gray', 'Burnt Sienna', 'Mocha Brown'],
      category: 'accessories',
      description: 'Adjustable dad hat with embroidered logo'
    },
    {
      id: 'beanie-winter',
      name: 'ARCHIVE BEANIE',
      price: 28,
      image: 'https://images.unsplash.com/photo-1664289321749-07316ab5e374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFuaWUlMjBrbml0JTIwaGF0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyNTI2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1664289321749-07316ab5e374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFuaWUlMjBrbml0JTIwaGF0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjMyNTI2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      sizes: ['One Size'],
      colors: ['Jet Black', 'Charcoal Gray', 'Earth Clay', 'Olive Green', 'Mocha Brown', 'Burnt Sienna'],
      category: 'accessories',
      description: 'Classic cuffed beanie with woven label'
    },
    {
      id: 'canvas-tote-archive',
      name: 'ARCHIVE CANVAS TOTE',
      price: 45,
      image: 'https://images.unsplash.com/photo-1618249807726-2f381c277de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3RlJTIwYmFnJTIwbWluaW1hbCUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMjMyMzUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      hoverImage: 'https://images.unsplash.com/photo-1618249807726-2f381c277de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3RlJTIwYmFnJTIwbWluaW1hbCUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMjMyMzUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      sizes: ['One Size'],
      colors: ['Stone White', 'Sahara Beige', 'Jet Black', 'Earth Clay'],
      category: 'accessories',
      description: 'Heavy-duty canvas tote with recycled packaging'
    },
    {
      id: 'fanny-pack-utility',
      name: 'UTILITY FANNY PACK',
      price: 48,
      image: 'https://images.unsplash.com/photo-1577302464152-e020135e0230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW5ueSUyMHBhY2slMjB3YWlzdCUyMGJhZ3xlbnwxfHx8fDE3NjMyNDk4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1577302464152-e020135e0230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW5ueSUyMHBhY2slMjB3YWlzdCUyMGJhZ3xlbnwxfHx8fDE3NjMyNDk4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['One Size'],
      colors: ['Jet Black', 'Olive Green', 'Earth Clay', 'Charcoal Gray', 'Sahara Beige'],
      category: 'accessories',
      badge: 'NEW SEASON',
      description: 'Minimalist fanny pack with adjustable strap'
    },
    {
      id: 'crew-socks-archive',
      name: 'ARCHIVE CREW SOCKS',
      price: 18,
      image: 'https://images.unsplash.com/photo-1694690127800-68314991ee83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBzb2NrcyUyMHByb2R1Y3QlMjBmbGF0fGVufDF8fHx8MTc2MzI0OTgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1694690127800-68314991ee83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBzb2NrcyUyMHByb2R1Y3QlMjBmbGF0fGVufDF8fHx8MTc2MzI0OTgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['One Size'],
      colors: ['Jet Black', 'Stone White', 'Charcoal Gray', 'Earth Clay', 'Olive Green'],
      category: 'accessories',
      description: 'Premium cotton crew socks with CREOVA branding'
    },
    {
      id: 'ankle-socks-essential',
      name: 'ESSENTIAL ANKLE SOCKS',
      price: 15,
      image: 'https://images.unsplash.com/photo-1694690127800-68314991ee83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBzb2NrcyUyMHByb2R1Y3QlMjBmbGF0fGVufDF8fHx8MTc2MzI0OTgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1694690127800-68314991ee83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBzb2NrcyUyMHByb2R1Y3QlMjBmbGF0fGVufDF8fHx8MTc2MzI0OTgyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['One Size'],
      colors: ['Jet Black', 'Stone White', 'Charcoal Gray'],
      category: 'accessories',
      description: 'Low-profile ankle socks for everyday wear'
    },
    {
      id: 'phone-case-leather',
      name: 'LEATHER PHONE CASE',
      price: 35,
      image: 'https://images.unsplash.com/photo-1709123895403-9034c5676d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHBob25lJTIwY2FzZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMjQ5ODIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1709123895403-9034c5676d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHBob25lJTIwY2FzZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMjQ5ODIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['One Size'],
      colors: ['Jet Black', 'Mocha Brown', 'Earth Clay', 'Sahara Beige'],
      category: 'accessories',
      badge: 'PREMIUM',
      description: 'Premium leather phone case with CREOVA embossing'
    },
    {
      id: 'ipad-case-sleeve',
      name: 'IPAD SLEEVE CASE',
      price: 52,
      image: 'https://images.unsplash.com/photo-1611461527944-1a718332613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBzbGVldmUlMjBjYXNlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjMyNDk4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1611461527944-1a718332613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBzbGVldmUlMjBjYXNlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjMyNDk4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['One Size'],
      colors: ['Jet Black', 'Charcoal Gray', 'Sahara Beige', 'Mocha Brown'],
      category: 'accessories',
      description: 'Protective iPad sleeve with soft interior lining'
    },
    {
      id: 'laptop-sleeve-13',
      name: 'LAPTOP SLEEVE 13"',
      price: 65,
      image: 'https://images.unsplash.com/photo-1611461527944-1a718332613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBzbGVldmUlMjBjYXNlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjMyNDk4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1611461527944-1a718332613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBzbGVldmUlMjBjYXNlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjMyNDk4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['One Size'],
      colors: ['Jet Black', 'Charcoal Gray', 'Sahara Beige', 'Mocha Brown', 'Olive Green'],
      category: 'accessories',
      badge: 'PREMIUM',
      description: 'Padded laptop sleeve for 13" devices'
    },
    {
      id: 'laptop-sleeve-15',
      name: 'LAPTOP SLEEVE 15"',
      price: 72,
      image: 'https://images.unsplash.com/photo-1611461527944-1a718332613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBzbGVldmUlMjBjYXNlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjMyNDk4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1611461527944-1a718332613b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBzbGVldmUlMjBjYXNlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjMyNDk4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['One Size'],
      colors: ['Jet Black', 'Charcoal Gray', 'Sahara Beige', 'Mocha Brown', 'Olive Green'],
      category: 'accessories',
      badge: 'PREMIUM',
      description: 'Padded laptop sleeve for 15" devices'
    },
    {
      id: 'keychain-metal',
      name: 'ARCHIVE KEYCHAIN',
      price: 22,
      image: 'https://images.unsplash.com/photo-1633176640669-44bd6adaa662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXljaGFpbiUyMGVuYW1lbCUyMHBpbiUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMjQ5ODI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1633176640669-44bd6adaa662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXljaGFpbiUyMGVuYW1lbCUyMHBpbiUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMjQ5ODI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['One Size'],
      colors: ['Jet Black', 'Olive Gold', 'Earth Clay'],
      category: 'accessories',
      badge: 'LIMITED',
      description: 'Metal keychain with engraved CREOVA logo'
    },
    {
      id: 'keychain-leather',
      name: 'LEATHER KEY HOLDER',
      price: 28,
      image: 'https://images.unsplash.com/photo-1633176640669-44bd6adaa662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXljaGFpbiUyMGVuYW1lbCUyMHBpbiUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMjQ5ODI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      hoverImage: 'https://images.unsplash.com/photo-1633176640669-44bd6adaa662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXljaGFpbiUyMGVuYW1lbCUyMHBpbiUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzMjQ5ODI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      sizes: ['One Size'],
      colors: ['Jet Black', 'Mocha Brown', 'Earth Clay', 'Sahara Beige'],
      category: 'accessories',
      description: 'Premium leather key holder with snap closure'
    }
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  const handleAddToCart = (product: typeof products[0]) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const color = selectedColors[product.id] || { name: product.colors[0], hex: colorPalette[product.colors[0]] };
    
    addItem({
      id: `${product.id}-${size}-${color.name}`,
      name: `${product.name} - ${size} - ${color.name}`,
      price: product.price,
      type: 'clothing',
      image: product.image
    });

    toast.success('Added to bag', {
      description: `${product.name} (${size}, ${color.name})`
    });
  };

  return (
    <div style={{ backgroundColor: '#F5F1EB' }}>
      {/* Pre-Order Banner - Winter Edition */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-4" 
        style={{ backgroundColor: '#A68F59' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-center flex-wrap">
            <Calendar className="w-4 h-4" style={{ color: '#FFFFFF' }} />
            <p className="text-xs md:text-sm tracking-wider" style={{ color: '#FFFFFF' }}>
              <strong>PRE-ORDER NOW</strong> — Launching Summer 2026
            </p>
            <Package className="w-4 h-4" style={{ color: '#FFFFFF' }} />
          </div>
        </div>
      </motion.section>

      {/* Hero - Minimal */}
      <section className="relative py-16 border-b" style={{ backgroundColor: '#FFFFFF', borderColor: '#E3DCD3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-3"
            >
              <div className="inline-block px-4 py-1 mb-4 text-[10px] tracking-widest" style={{ backgroundColor: '#121212', color: '#F5F1EB' }}>
                LAUNCHING SUMMER 2026 — PRE-ORDER NOW
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl tracking-tight mb-4"
              style={{ color: '#121212' }}
            >
              SEEN
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg tracking-wide mb-2"
              style={{ color: '#4A3E36' }}
            >
              A SEASON OF SOFT POWER
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs tracking-wider max-w-2xl mx-auto mb-4"
              style={{ color: '#999999' }}
            >
              ARTIST COLLABORATIONS • CREATIVE PARTNERSHIPS • CURATED BY CREOVA
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full" 
              style={{ backgroundColor: 'rgba(166, 143, 89, 0.1)', border: '1px solid rgba(166, 143, 89, 0.3)' }}
            >
              <Calendar className="w-4 h-4" style={{ color: '#A68F59' }} />
              <span className="text-xs tracking-wide" style={{ color: '#A68F59' }}>
                Pre-Order • Ships Summer 2026
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-40 py-4 border-b backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#E3DCD3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-6 overflow-x-auto">
              {[
                { label: 'ALL', value: 'all' },
                { label: 'TEES', value: 'tees' },
                { label: 'HOODIES', value: 'hoodies' },
                { label: 'JACKETS', value: 'jackets' },
                { label: 'PANTS', value: 'pants' },
                { label: 'SETS', value: 'sets' },
                { label: 'ACCESSORIES', value: 'accessories' }
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  className="text-xs tracking-widest transition-colors whitespace-nowrap"
                  style={{ 
                    color: filter === item.value ? '#121212' : '#999999',
                    fontWeight: filter === item.value ? '600' : '400'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button className="hidden md:flex items-center gap-1 text-xs tracking-widest" style={{ color: '#4A3E36' }}>
              SORT BY
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid - Zara Style */}
      <section className="py-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] mb-3 overflow-hidden" style={{ backgroundColor: '#F5F1EB' }}>
                  {/* Main Image */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    style={{ 
                      opacity: hoveredProduct === product.id ? 0 : 1,
                      filter: 'blur(8px)'
                    }}
                  />
                  {/* Hover Image */}
                  <img 
                    src={product.hoverImage} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    style={{ 
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      filter: 'blur(8px)'
                    }}
                  />
                  
                  {/* Coming Soon Overlay for ALL clothing - Coming Summer 2026 */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(18, 18, 18, 0.75)' }}>
                    <div className="px-6 py-3 text-xs tracking-widest text-center" style={{ backgroundColor: '#A68F59', color: '#FFFFFF' }}>
                      COMING SUMMER 2026
                    </div>
                    <div className="mt-3 text-xs tracking-wide text-center" style={{ color: '#F5F1EB' }}>
                      Pre-Order Available Soon
                    </div>
                  </div>
                  
                  {/* Badge */}
                  {product.badge && (
                    <div 
                      className="absolute top-2 left-2 px-2 py-1 text-[9px] tracking-widest"
                      style={{ 
                        backgroundColor: product.badge === 'PREMIUM' ? '#A68F59' : '#121212', 
                        color: '#FFFFFF' 
                      }}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Quick Actions on Hover - DISABLED: All items coming Summer 2026 */}
                  {false && (
                    <div 
                      className="absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300"
                      style={{ 
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        transform: hoveredProduct === product.id ? 'translateY(0)' : 'translateY(10px)'
                      }}
                    >
                      <Button
                        className="flex-1 h-9 text-xs tracking-wider transition-colors"
                        style={{ 
                          backgroundColor: '#121212', 
                          color: '#FFFFFF',
                          border: 'none'
                        }}
                        onClick={() => {
                          setSelectedProduct(product);
                          setAddToCartDialogOpen(true);
                        }}
                      >
                        ADD TO BAG
                      </Button>
                      <button
                        className="w-9 h-9 flex items-center justify-center transition-colors"
                        style={{ 
                          backgroundColor: '#FFFFFF', 
                          color: '#121212'
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <button
                        className="w-9 h-9 flex items-center justify-center transition-colors"
                        style={{ 
                          backgroundColor: '#FFFFFF', 
                          color: '#121212'
                        }}
                        onClick={() => setQuickViewProduct(product)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h3 className="text-xs tracking-wider" style={{ color: '#121212' }}>
                    {product.name}
                  </h3>
                  <p className="text-sm" style={{ color: '#121212' }}>
                    ${product.price} CAD
                  </p>

                  {/* Size Selection on Hover */}
                  {hoveredProduct === product.id && product.sizes.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-2"
                    >
                      <p className="text-[10px] tracking-wider mb-1" style={{ color: '#999999' }}>
                        SELECT SIZE
                      </p>
                      <div className="flex gap-1 flex-wrap">
                        {product.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: size }))}
                            className="px-2 py-1 text-[10px] tracking-wider border transition-colors"
                            style={{
                              borderColor: selectedSizes[product.id] === size ? '#121212' : '#E3DCD3',
                              backgroundColor: selectedSizes[product.id] === size ? '#121212' : '#FFFFFF',
                              color: selectedSizes[product.id] === size ? '#FFFFFF' : '#121212'
                            }}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Color Selection on Hover */}
                  {hoveredProduct === product.id && product.colors.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-2"
                    >
                      <p className="text-[10px] tracking-wider mb-1" style={{ color: '#999999' }}>
                        COLORS
                      </p>
                      <div className="flex gap-1 flex-wrap">
                        {product.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => setSelectedColors(prev => ({ ...prev, [product.id]: { name: color, hex: colorPalette[color] } }))}
                            className="w-5 h-5 rounded-full border-2 transition-all"
                            style={{
                              backgroundColor: colorPalette[color],
                              borderColor: selectedColors[product.id]?.name === color ? '#121212' : '#E3DCD3',
                              transform: selectedColors[product.id]?.name === color ? 'scale(1.1)' : 'scale(1)'
                            }}
                            title={color}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-16 border-t" style={{ backgroundColor: '#121212', borderColor: '#3C3C3C' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm md:text-base tracking-wide leading-relaxed mb-6" style={{ color: '#E3DCD3' }}>
              "We design for visibility, softness, and resistance.<br />
              This is not just fashion — it's archive."
            </p>
            <div className="h-px w-16 mx-auto mb-6" style={{ backgroundColor: '#A68F59' }}></div>
            <p className="text-xs tracking-widest" style={{ color: '#A68F59' }}>
              CREOVA / NIAGARA, CANADA
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="py-16 border-t" style={{ backgroundColor: '#F5F1EB', borderColor: '#E3DCD3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
            {[
              {
                title: 'ECO-CONSCIOUS',
                desc: 'Recycled packaging & sustainable fabrics'
              },
              {
                title: 'NUMBERED EDITIONS',
                desc: 'Limited small-batch drops (50-100 pieces)'
              },
              {
                title: 'BIPOC-LED',
                desc: 'Black-led studio serving global community'
              }
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-xs tracking-widest mb-2" style={{ color: '#121212' }}>
                  {item.title}
                </h3>
                <p className="text-xs" style={{ color: '#4A3E36' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Color Palette Note */}
          <div className="text-center">
            <p className="text-xs tracking-wide mb-8" style={{ color: '#4A3E36' }}>
              All pieces are available in multiple colorways from our signature age-inclusive palette (5-90 years)
            </p>
            <p className="text-[10px] tracking-widest" style={{ color: '#999999' }}>
              TIMELESS, UNISEX, AND VERSATILE — DESIGNED TO WORK ACROSS ALL SKIN TONES
            </p>
          </div>
        </div>
      </section>

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Size Guide Modal */}
      <SizeGuide
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      {/* Add to Cart Dialog */}
      {selectedProduct && (
        <AddToCartDialog
          open={addToCartDialogOpen}
          onOpenChange={setAddToCartDialogOpen}
          product={selectedProduct}
          colorPalette={colorPalette}
          onAddToCart={(productId, size, color) => {
            addItem({
              id: `${productId}-${size}-${color.name}`,
              name: `${selectedProduct.name} - ${size} - ${color.name}`,
              price: selectedProduct.price,
              type: 'clothing',
              image: selectedProduct.image
            });

            toast.success('Added to bag', {
              description: `${selectedProduct.name} (${size}, ${color.name})`
            });
          }}
        />
      )}
    </div>
  );
}