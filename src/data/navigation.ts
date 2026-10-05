export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAVIGATION: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Quality Assurance', href: '/quality-assurance' },
  { label: 'Export Services', href: '/export-services' },
  { label: 'Contact Us', href: '/contact' },
];

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Quality Assurance', href: '/quality-assurance' },
  { label: 'Export Services', href: '/export-services' },
  { label: 'Contact Us', href: '/contact' },
];

export const FOOTER_PRODUCT_LINKS: { label: string; id: string; href: string }[] = [
  { label: 'Wheat', id: 'wheat', href: '/products/wheat' },
  { label: 'Rice', id: 'rice', href: '/products/rice' },
  { label: 'Pulses', id: 'pulses', href: '/products/pulses' },
  { label: 'Cereals', id: 'cereals', href: '/products/cereals' },
  { label: 'Beans', id: 'beans', href: '/products/beans' },
  { label: 'Spices', id: 'spices', href: '/products/spices' },
];

