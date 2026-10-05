export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  category: string;
  origin: string;
  specs: {
    label: string;
    value: string;
  }[];
  packaging: string[];
  imageUrl: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'wheat',
    name: 'Wheat',
    tagline: 'Quality wheat varieties for food and commercial requirements.',
    description: 'Carefully sorted milling and durum wheat sourced directly from prime agricultural belts of India, offering high protein content, superior gluten strength, and minimal moisture.',
    badge: 'EXPORT INQUIRIES',
    category: 'Grains & Cereals',
    origin: 'Madhya Pradesh & Punjab, India',
    specs: [
      { label: 'Moisture', value: '12% Max' },
      { label: 'Protein', value: '11% - 13.5% Min' },
      { label: 'Foreign Matter', value: '1.5% Max' },
      { label: 'Falling Number', value: '300+ sec' },
    ],
    packaging: ['25kg / 50kg PP Bags', 'Jute Bags', 'Bulk Container Liner'],
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rice',
    name: 'Rice',
    tagline: 'Carefully sourced rice for bulk and export enquiries.',
    description: 'Finest 1121, Traditional Basmati, and premium Non-Basmati (IR64, Sona Masoori) parboiled and raw varieties known for extra-long grain length, aromatic fragrance, and delicate fluffiness.',
    badge: 'EXPORT INQUIRIES',
    category: 'Grains & Rice',
    origin: 'Haryana & Andhra Pradesh, India',
    specs: [
      { label: 'Average Grain Length', value: '7.5mm - 8.35mm' },
      { label: 'Moisture', value: '12.5% Max' },
      { label: 'Broken Grain', value: '1% - 5% (Custom)' },
      { label: 'Purity', value: '95% Min' },
    ],
    packaging: ['5kg, 10kg, 20kg, 25kg Non-Woven / BOPP', '50kg Master Bags'],
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pulses',
    name: 'Pulses',
    tagline: 'A practical range of pulses for diverse market needs.',
    description: 'Wholesome, sortex-cleaned chickpeas (Kabuli & Desi chana), red lentils, yellow split peas, and toor dal packed with vegetable protein and uniform sizing for global kitchens.',
    badge: 'EXPORT INQUIRIES',
    category: 'Legumes & Pulses',
    origin: 'Maharashtra & Rajasthan, India',
    specs: [
      { label: 'Size (Chickpeas)', value: '7mm - 12mm' },
      { label: 'Purity', value: '99% Sortex Cleaned' },
      { label: 'Foreign Matter', value: '0.5% Max' },
      { label: 'Moisture', value: '11% Max' },
    ],
    packaging: ['25kg / 50kg Polypropylene Bags', 'Consumer Packs Available'],
    imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cereals',
    name: 'Cereals',
    tagline: 'Selected cereals sourced for reliable supply.',
    description: 'High-energy yellow maize (corn), pearl millet (bajra), sorghum (jowar), and barley selected for animal feed, starch processing, and food industry requirements.',
    badge: 'EXPORT INQUIRIES',
    category: 'Cereals & Feed',
    origin: 'Karnataka & Gujarat, India',
    specs: [
      { label: 'Aflatoxin', value: '< 20 PPB' },
      { label: 'Moisture', value: '13% Max' },
      { label: 'Admixture', value: '1.5% Max' },
      { label: 'Test Weight', value: '70+ kg/hl' },
    ],
    packaging: ['50kg PP Bags', 'Bulk Vessel / Containerized'],
    imageUrl: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'beans',
    name: 'Beans',
    tagline: 'Versatile bean varieties for wholesale buyers.',
    description: 'Rich selection of dried kidney beans (Rajma), black beans, mung beans, and soybean sourced from verified growers with meticulous grading and pest-free fumigation.',
    badge: 'EXPORT INQUIRIES',
    category: 'Beans & Oilseeds',
    origin: 'Madhya Pradesh & Himachal, India',
    specs: [
      { label: 'Grade', value: 'Machine Cleaned & Sortexed' },
      { label: 'Moisture', value: '12% Max' },
      { label: 'Imperfection', value: '2% Max' },
      { label: 'Foreign Matter', value: '0.5% Max' },
    ],
    packaging: ['25kg / 50kg PP Bags', 'Customized Private Labeling'],
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'spices',
    name: 'Spices',
    tagline: 'Aromatic Indian spices for global food businesses.',
    description: 'Authentic Indian whole and ground spices including high-curcumin turmeric fingers, bold cumin seeds, dry red chillies, coriander seeds, and fenugreek with intense volatile oil potency.',
    badge: 'EXPORT INQUIRIES',
    category: 'Spices & Herbs',
    origin: 'Gujarat & Rajasthan, India',
    specs: [
      { label: 'Curcumin (Turmeric)', value: '3% - 5% Min' },
      { label: 'Purity (Cumin)', value: '99% / 99.5% Singapore Quality' },
      { label: 'Moisture', value: '10% Max' },
      { label: 'Volatile Oil', value: 'Meets ASTA/ESA Standards' },
    ],
    packaging: ['20kg, 25kg, 50kg Jute / Paper Bags', 'Vacuum Packs'],
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
  },
];
