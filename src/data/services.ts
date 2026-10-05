export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: 'clipboard-check' | 'package' | 'boxes' | 'headphones' | 'shield-check' | 'file-text';
  highlights: string[];
  deliverables: {
    title: string;
    description: string;
  }[];
}

export const DETAILED_SERVICES: ServiceDetail[] = [
  {
    id: 'quality-inspection',
    slug: 'quality-inspection',
    title: 'Quality Inspection & Lab Testing',
    shortDescription: 'Comprehensive quality review and sortex analysis before dispatch.',
    detailedDescription: 'Every agricultural consignment undergoes rigorous multi-tier testing before vessel loading. We verify moisture content, sortex grain grading, admixture levels, foreign matter, and microbiological benchmarks in certified partner laboratories.',
    iconName: 'clipboard-check',
    highlights: [
      'Pre-shipment batch sampling & analysis',
      'Third-party inspection support (SGS, Bureau Veritas on request)',
      'Government phytosanitary certification compliance',
      'Non-GMO and pesticide residue analysis protocols',
    ],
    deliverables: [
      {
        title: 'Sortex Optical Grading',
        description: 'High-precision optical sortex cleaning to remove discolored, broken, and foreign kernels.',
      },
      {
        title: 'Moisture & Purity Testing',
        description: 'Certified moisture meters ensuring optimal preservation throughout extended oceanic transit.',
      },
      {
        title: 'Fumigation & Pest Control',
        description: 'Government-approved aluminum phosphide / methyl bromide fumigation with gas clearance certificates.',
      },
    ],
  },
  {
    id: 'packaging',
    slug: 'packaging',
    title: 'Custom Packaging & Private Labeling',
    shortDescription: 'Flexible export-grade packaging options to suit buyer distribution needs.',
    detailedDescription: 'From high-density PP woven bags to premium consumer pouches with buyer branding, our automated bagging facilities preserve product integrity and shelf life during transit.',
    iconName: 'package',
    highlights: [
      'Multi-size range: 1kg consumer packs up to 50kg bulk master bags',
      'BOPP laminated full-color printing for retail brands',
      'Non-woven breathable fabric and traditional jute bags',
      'Moisture-barrier vacuum packaging for sensitive spices',
    ],
    deliverables: [
      {
        title: 'Bulk Export Bags',
        description: '25kg and 50kg PP/HDPE woven sacks with inner liner and high tensile stitching.',
      },
      {
        title: 'Retail & Supermarket Packaging',
        description: '1kg, 2kg, 5kg and 10kg stand-up zipper pouches and BOPP bags with customized buyer artwork.',
      },
      {
        title: 'Palletization & Container Stuffing',
        description: 'Standard wooden/plastic heat-treated pallets (ISPM 15) with stretch wrapping and desiccant strips.',
      },
    ],
  },
  {
    id: 'bulk-orders',
    slug: 'bulk-orders',
    title: 'Bulk Container Orders & Vessel Freight',
    shortDescription: 'Reliable containerized and breakbulk logistics management for commercial scale.',
    detailedDescription: 'We specialize in Full Container Load (FCL) shipments via India’s premier western ports (Mundra, Kandla, Nhava Sheva). We provide structured shipping contracts, vessel bookings, and predictable dispatch calendars.',
    iconName: 'boxes',
    highlights: [
      'Direct rail and road connectivity to major western Indian ports',
      'Container stuffing under strict supervision with photo/video proof',
      'FOB, CIF, CFR and DAP Incoterms contract execution',
      'Minimum order flexibility from single 20ft container (24 MT) to multiple vessel loads',
    ],
    deliverables: [
      {
        title: 'Container Stuffing Supervision',
        description: 'Dry container pre-inspection, craft paper lining, desiccant placement, and tamper-evident container seals.',
      },
      {
        title: 'Global Port Coverage',
        description: 'Frequent sailings to Middle East (Jebel Ali, Dammam), Southeast Asia, Africa, Europe, and Mediterranean ports.',
      },
      {
        title: 'Real-Time Tracking & Updates',
        description: 'Regular status reports from mandi aggregation to container gate-in and vessel departure.',
      },
    ],
  },
  {
    id: 'export-inquiry-support',
    slug: 'export-inquiry-support',
    title: 'Export Inquiry & Documentation Support',
    shortDescription: 'Dedicated commercial guidance, regulatory compliance, and seamless paper trail.',
    detailedDescription: 'Navigating international import-export compliance requires precision. Our experienced export documentation desk handles all customs documentation, chamber certificates of origin, and consular legalization smoothly.',
    iconName: 'headphones',
    highlights: [
      'Complete international export documentation suite',
      'Letter of Credit (L/C) compliance and banking presentation',
      'Dedicated single point-of-contact for commercial queries',
      'Fast turnaround for proforma invoices, FOB/CIF freight calculations, and sample dispatches',
    ],
    deliverables: [
      {
        title: 'Regulatory Documentation',
        description: 'Bill of Lading, Commercial Invoice, Packing List, Certificate of Origin, and Certificate of Analysis.',
      },
      {
        title: 'Trade Sample Dispatch',
        description: 'DHL/FedEx express courier sample dispatches with lab analysis sheets for prospective buyers.',
      },
      {
        title: 'Transparent Communication',
        description: 'Direct response via email, phone, and WhatsApp with English and multi-lingual documentation assistance.',
      },
    ],
  },
];
