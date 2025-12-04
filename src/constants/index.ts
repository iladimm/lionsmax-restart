import { Product, BlogPost } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NMN, 175 mg, 60 Veggie Capsules',
    brand: 'California Gold Nutrition',
    price: 36.00,
    rating: 4.5,
    reviews: 1240,
    image: 'https://s3.images-iherb.com/cgn/cgn01986/l/1.jpg', // Placeholder or use a generic supplement image
    category: 'Anti-Aging',
    benefits: ['Cellular Energy', 'Healthy Aging', 'NAD+ Support'],
    affiliateLink: 'https://amazon.com',
    description: 'Nicotinamide Mononucleotide (NMN) is a precursor to NAD+, essential for cellular energy and repair.',
    isBestSeller: true,
    isPrime: true
  },
  {
    id: '2',
    name: 'Omega-3 Premium Fish Oil, 180 EPA / 120 DHA',
    brand: 'California Gold Nutrition',
    price: 7.00,
    rating: 4.8,
    reviews: 245000,
    image: 'https://s3.images-iherb.com/cgn/cgn00931/l/34.jpg',
    category: 'Heart Health',
    benefits: ['Heart Health', 'Brain Support', 'Immune Support'],
    affiliateLink: 'https://amazon.com',
    description: 'Molecularly distilled, supercritical extraction. Preferred triglyceride form.',
    isBestSeller: true,
    isPrime: true
  },
  {
    id: '3',
    name: 'CollagenUP, Hydrolyzed Marine Collagen Peptides',
    brand: 'California Gold Nutrition',
    price: 17.00,
    rating: 4.7,
    reviews: 156000,
    image: 'https://s3.images-iherb.com/cgn/cgn01033/l/28.jpg',
    category: 'Skin, Hair & Nails',
    benefits: ['Skin Health', 'Joint Support', 'Hair & Nail Strength'],
    affiliateLink: 'https://amazon.com',
    description: 'Marine Sourced Collagen Peptides + Hyaluronic Acid + Vitamin C.',
    isBestSeller: true,
    isPrime: true
  },
  {
    id: '4',
    name: 'Magnesium Glycinate, 180 Tablets',
    brand: 'NOW Foods',
    price: 16.36,
    rating: 4.8,
    reviews: 45000,
    image: 'https://s3.images-iherb.com/now/now01290/l/24.jpg',
    category: 'Minerals',
    benefits: ['Nerve Health', 'Muscle Relaxation', 'Bone Support'],
    affiliateLink: 'https://amazon.com',
    description: 'Highly absorbable form of magnesium. Supports nervous system and muscle function.',
    isBestSeller: true,
    isPrime: true
  },
  {
    id: '5',
    name: 'Acne Foaming Wash, Benzoyl Peroxide 10%',
    brand: 'PanOxyl',
    price: 11.43,
    rating: 4.6,
    reviews: 32000,
    image: 'https://s3.images-iherb.com/pnx/pnx00003/l/10.jpg',
    category: 'Personal Care',
    benefits: ['Acne Treatment', 'Deep Cleaning', 'Antibacterial'],
    affiliateLink: 'https://amazon.com',
    description: 'Maximum strength foaming wash. Kills acne-causing bacteria fast.',
    isBestSeller: true,
    isPrime: true
  },
  {
    id: '6',
    name: 'Vitamin D3 & K2, 120 Veg Capsules',
    brand: 'NOW Foods',
    price: 8.56,
    rating: 4.8,
    reviews: 18000,
    image: 'https://s3.images-iherb.com/now/now00372/l/22.jpg',
    category: 'Vitamins',
    benefits: ['Bone Health', 'Cardiovascular Support', 'Immune System'],
    affiliateLink: 'https://amazon.com',
    description: 'Combines two nutrients extensively researched for their contribution to the health of bones, teeth and the cardiovascular system.',
    isBestSeller: true,
    isPrime: true
  },
  {
    id: '7',
    name: 'Creatine Monohydrate, Unflavored',
    brand: 'Muscletech',
    price: 24.99,
    rating: 4.7,
    reviews: 12000,
    image: 'https://s3.images-iherb.com/msc/msc70298/l/12.jpg',
    category: 'Sports Nutrition',
    benefits: ['Muscle Strength', 'Recovery', 'Performance'],
    affiliateLink: 'https://amazon.com',
    description: 'Platinum 100% Creatine provides your muscles with the world\'s highest quality and most clinically researched form of micronized creatine.',
    isBestSeller: true,
    isPrime: true
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '4',
    title: '5 Best Supplements for Women Over 50',
    excerpt: 'Expert-backed choices for energy, hormonal balance, and bone density.',
    image: 'https://images.unsplash.com/photo-1544367563-12123d896889?auto=format&fit=crop&q=80&w=800',
    date: 'Oct 15, 2023',
    category: 'Best Of',
    isFeatured: true,
    content: [
      'Entering your 50s brings new health priorities. Hormone changes, bone density concerns, and energy levels all require specific nutritional support.',
      '1. Calcium & Vitamin D3: Essential for maintaining bone strength as estrogen levels drop.',
      '2. Magnesium: Helps with sleep, muscle cramps, and stress management.',
      '3. Omega-3 Fatty Acids: Critical for heart health and cognitive function.',
      'We have curated a list of the top-rated supplements in each category to help you navigate this new chapter with vitality.'
    ]
  },
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