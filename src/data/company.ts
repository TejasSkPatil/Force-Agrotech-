export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: 'shield-check' | 'search' | 'users' | 'truck';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'clipboard-check' | 'package' | 'boxes' | 'headphones';
}

export const COMPANY_INFO = {
  name: 'Focus Agrotech Private Limited',
  shortName: 'Focus Agrotech',
  tagline: 'Connecting Global Markets with Quality Agricultural Products',
  location: '1 Symphony Estate, B/H Ingersoll Rand, Naroda GIDC Phase-1, Naroda, Ahmedabad, Gujarat – 382330, India',
  cityRegion: 'Ahmedabad, Gujarat, India',
  phone: '+91 9824964465',
  email: 'info@focusagrotech.com',
  website: 'https://focusagrotech.com',
  summary: 'Focus AgroTech Pvt. Ltd. was established in 2016. We source and supply agricultural products including wheat, rice, pulses, cereals, and beans, supporting global businesses with dependable product sourcing and export assistance from India.',
  copyrightYear: 2024,
};

export const WHY_CHOOSE_US: FeatureItem[] = [
  {
    id: 'quality-assurance',
    title: 'Quality Assurance',
    description: 'A careful approach to product selection and quality review.',
    iconName: 'shield-check',
  },
  {
    id: 'reliable-sourcing',
    title: 'Reliable Sourcing',
    description: 'Sourcing support aligned with your product requirements.',
    iconName: 'search',
  },
  {
    id: 'customer-satisfaction',
    title: 'Customer Satisfaction',
    description: 'Clear communication focused on your business needs.',
    iconName: 'users',
  },
  {
    id: 'export-support',
    title: 'Export Support',
    description: 'Practical assistance for bulk and export enquiries.',
    iconName: 'truck',
  },
];

export const EXPORT_SERVICES: ServiceItem[] = [
  {
    id: 'quality-inspection',
    title: 'Quality Inspection',
    description: 'Product checks before dispatch',
    iconName: 'clipboard-check',
  },
  {
    id: 'packaging',
    title: 'Packaging',
    description: 'Options to suit product needs',
    iconName: 'package',
  },
  {
    id: 'bulk-orders',
    title: 'Bulk Orders',
    description: 'Support for commercial quantities',
    iconName: 'boxes',
  },
  {
    id: 'export-inquiry-support',
    title: 'Export Inquiry Support',
    description: 'Responsive buyer assistance',
    iconName: 'headphones',
  },
];
