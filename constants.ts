import { Product, BlogPost, Brand } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'New Chapter One Daily Every Woman\'s Multivitamin 40+',
    brand: 'New Chapter',
    price: 45.50,
    rating: 4.8,
    reviews: 3240,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    category: 'Multivitamins',
    benefits: ['Hormone support', 'Immune defense', 'Stress support'],
    affiliateLink: 'https://amazon.com',
    description: 'Fermented multivitamin formulated specifically for women over 40. Gentle on the stomach and packed with superfoods.',
    isBestSeller: true,
    isPrime: true
  },
  {
    id: '2',
    name: 'Glucosamine Chondroitin Turmeric & MSM',
    brand: 'MoveFree Pro',
    price: 29.99,
    rating: 4.6,
    reviews: 8100,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400',
    category: 'Joint Health',
    benefits: ['Joint comfort', 'Lubricates joints', 'Supports cartilage'],
    affiliateLink: 'https://amazon.com',
    description: 'Triple strength joint support. Essential for maintaining mobility and flexibility as you age.',
    isBestSeller: true,
    isPrime: true
  },
  {
    id: '3',
    name: 'CoQ10 Ubiquinol 200mg High Absorption',
    brand: 'Qunol',
    price: 34.95,
    rating: 4.7,
    reviews: 12500,
    image: 'https://images.unsplash.com/photo-1626074121650-2f9540026e6d?auto=format&fit=crop&q=80&w=400',
    category: 'Energy & Metabolism',
    benefits: ['Heart health', 'Cellular energy', 'Antioxidant'],
    affiliateLink: 'https://amazon.com',
    description: 'The active form of CoQ10. Critical for energy production in the heart and muscles, especially for those on statins.',
    isPrime: true
  },
  {
    id: '4',
    name: 'Magnesium Glycinate 400mg',
    brand: 'Nature\'s Rest',
    price: 19.99,
    rating: 4.9,
    reviews: 4500,
    image: 'https://images.unsplash.com/photo-1555685812-4b943f3db990?auto=format&fit=crop&q=80&w=400',
    category: 'Sleep & Stress',
    benefits: ['Deep sleep', 'Muscle relaxation', 'Nerve health'],
    affiliateLink: 'https://amazon.com',
    description: 'High absorption magnesium that is gentle on the stomach. Helps calm the nervous system for better sleep.',
    isBestSeller: true
  },
  {
    id: '5',
    name: 'Bone Strength Calcium + K2 + D3',
    brand: 'Garden of Life',
    price: 38.49,
    rating: 4.8,
    reviews: 6200,
    image: 'https://images.unsplash.com/photo-1585237674744-86a347321e16?auto=format&fit=crop&q=80&w=400',
    category: 'Joint Health',
    benefits: ['Bone density', 'Calcium absorption', 'Plant-based'],
    affiliateLink: 'https://amazon.com',
    description: 'Plant-sourced Calcium with Vitamin K2 and D3 for optimal bone absorption. Critical for preventing bone density loss after 50.',
    isPrime: true
  },
  {
    id: '6',
    name: 'Organic Ashwagandha Root 1300mg',
    brand: 'NutriRise',
    price: 18.95,
    rating: 4.5,
    reviews: 15400,
    image: 'https://images.unsplash.com/photo-1611078488966-213c9b218f2d?auto=format&fit=crop&q=80&w=400',
    category: 'Energy & Metabolism',
    benefits: ['Cortisol balance', 'Adrenal health', 'Sustained energy'],
    affiliateLink: 'https://amazon.com',
    description: 'High potency adaptogen to help the body manage stress and boost natural energy levels without the crash.',
    isBestSeller: true
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Fish Oil vs Krill Oil: Best for Seniors?',
    excerpt: 'Understanding the differences in bioavailability and heart benefits for the 50+ demographic.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    date: 'Oct 12, 2023',
    category: 'Comparison',
    content: [
      'When it comes to omega-3 supplements, the choice often comes down to Fish Oil versus Krill Oil. For adults over 50, absorption is key.',
      'Krill oil contains omega-3s in phospholipid form, which some studies suggest is more easily absorbed by the body than the triglyceride form found in fish oil.',
      ' However, fish oil typically has a higher concentration of DHA and EPA per capsule. We recommend looking for high-quality, third-party tested options for both.'
    ]
  },
  {
    id: '2',
    title: 'Why Muscle Mass Matters After 40',
    excerpt: 'Sarcopenia is real, but reversible. Here are 5 ways to keep your strength up.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
    date: 'Oct 08, 2023',
    category: 'Educational',
    content: [
      'After age 30, you begin to lose as much as 3% to 5% per decade. This condition, known as sarcopenia, accelerates after 60.',
      'Resistance training combined with adequate protein intake is the gold standard for prevention.',
      'Supplements like Creatine and Whey Protein can also support muscle retention when combined with exercise.'
    ]
  },
  {
    id: '3',
    title: 'Top 5 Supplements for Joint Pain',
    excerpt: 'Relief is possible. We review Glucosamine, Turmeric, and more.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
    date: 'Sep 25, 2023',
    category: 'Best Of',
    content: [
      'Joint pain shouldn\'t dictate your life. Natural anti-inflammatories can provide significant relief without the side effects of NSAIDs.',
      'Turmeric Curcumin is a powerhouse for lowering inflammation markers. Look for formulations with Black Pepper extract for absorption.',
      'Glucosamine and Chondroitin are the building blocks of cartilage and have been shown to slow joint degradation over time.'
    ]
  }
];

export const MOCK_BRANDS: Brand[] = [
  { id: '1', name: 'LionsMax', logo: '/logo.png' },
  { id: '2', name: 'New Chapter', logo: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&q=80&w=100' },
  { id: '3', name: 'Garden of Life', logo: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&q=80&w=100' },
  { id: '4', name: 'Nordic Naturals', logo: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&q=80&w=100' },
  { id: '5', name: 'Solgar', logo: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&q=80&w=100' },
  { id: '6', name: 'NOW Foods', logo: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?auto=format&fit=crop&q=80&w=100' },
];

export const NAV_LINKS = [
  'Supplements',
  'Vitamins',
  'Health Goals',
  'Bundles',
  'Best Sellers',
  'New',
  'Deals',
  'Brands A–Z',
  'Blog'
];