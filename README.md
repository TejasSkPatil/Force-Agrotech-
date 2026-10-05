# Focus Agrotech — International Agricultural Export Website

## Phase 0: High-Level Architecture & Technical Specification

### 1. Project Overview
Focus Agrotech Private Limited is a premier Indian agricultural sourcing and export company supplying global markets with grains, pulses, cereals, and spices. This web application redevelops the online presence into an international, award-winning, responsive agricultural export portal faithfully reproducing the reference design with fluid GSAP ScrollTrigger animations, clean typography, modular components, and accessible interaction patterns.

---

### 2. Proposed Component Architecture

```
App
└── Home (Page container, manages global layout rhythm & GSAP context)
    ├── Header (Sticky desktop & mobile bar with scroll shrinkage, blur, nav links & CTA)
    ├── Hero (Dominant agricultural proposition, arched golden visual, floating leaves, badge & play action)
    ├── ProductGrid (Section label, heading, right-aligned link, 6 responsive tilt ProductCards)
    │   └── ProductCard (Export inquiries badge, agricultural imagery, description, arrow CTA, 3D tilt)
    ├── AboutSection (Curved crop field with parallax floating badge, company background, dual checkmarks, CTA)
    ├── WhyChooseUs (4 staggered cards: Quality Assurance, Reliable Sourcing, Customer Satisfaction, Export Support)
    ├── ExportServices (Order-built support, 2x2 service cards: Inspection, Packaging, Bulk Orders, Inquiry Support)
    ├── FinalCTA (Parallax foliage background, conversion headline, Request a Quote trigger)
    └── Footer (Dark forest green footer, corporate wordmark, company summary, social links, navigation columns, contact info)
```

---

### 3. Folder Structure

```
focus-agrotech/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── products/
│   │   ├── about/
│   │   └── backgrounds/
│   └── fonts/
├── reference/
│   └── focus-agrotech-homepage.png
├── src/
│   ├── assets/
│   │   └── logo-1.svg
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── SectionLabel.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   └── ScrollReveal.tsx
│   │   ├── hero/
│   │   │   └── Hero.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductGrid.tsx
│   │   ├── about/
│   │   │   └── AboutSection.tsx
│   │   ├── why-us/
│   │   │   └── WhyChooseUs.tsx
│   │   ├── services/
│   │   │   └── ExportServices.tsx
│   │   └── cta/
│   │       └── FinalCTA.tsx
│   ├── data/
│   │   ├── products.ts
│   │   ├── navigation.ts
│   │   └── company.ts
│   ├── hooks/
│   │   ├── useScrollReveal.ts
│   │   ├── useReducedMotion.ts
│   │   └── useMediaQuery.ts
│   ├── animations/
│   │   ├── heroAnimations.ts
│   │   ├── scrollAnimations.ts
│   │   ├── cardAnimations.ts
│   │   └── parallaxAnimations.ts
│   ├── pages/
│   │   └── Home.tsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── typography.css
│   ├── App.tsx
│   └── main.tsx
├── README.md
└── package.json
```

---

### 4. Design Tokens

#### Color Palette
- **Canvas Neutral**: `#FBFBFA` (Warm off-white background field)
- **Forest Green (Primary)**: `#143D28` / `#16432C` (Main brand color, primary CTAs, headings)
- **Deep Emerald (Dark Surface)**: `#0B2518` / `#0D2818` (Footer, dark hero badges)
- **Sage / Olive Tint**: `#EBF3EE` (Subtle pill backgrounds, badges, input borders)
- **Hairline Border**: `rgba(20, 61, 40, 0.12)` / `#E2EAE5`
- **Text Primary**: `#141C17` (High-contrast charcoal green for primary copy)
- **Text Muted**: `#546359` (Accessible secondary body prose)
- **Golden Wheat Accent**: `#D4A373` / `#E5B869` (Agricultural warmth & highlights)
- **Brand Logo-1 Palette**: Focus Royal Blue (`#005DA6`) and Crosshair Red (`#D62828`) for corporate identity authentication

#### Typography
- **Display Headings**: `Playfair Display`, serif, with italic styling for high-character phrases like *"Agricultural Products"*
- **Interface & Body**: `Plus Jakarta Sans`, -apple-system, sans-serif, 400 regular, 500 medium, 600 semibold, 700 bold
- **Monospace / Numerical**: `JetBrains Mono` / tabular numerals for tracking and counts

#### Shadows & Elevation
- **Card Subtle**: `0 1px 3px rgba(0,0,0,0.05), 0 8px 24px -4px rgba(20,61,40,0.06)`
- **Hover Lift**: `0 20px 35px -8px rgba(20,61,40,0.14)`
- **Header Scrim**: `backdrop-blur-md bg-[#FBFBFA]/90 border-b border-[#E2EAE5]`

---

### 5. Animation Architecture (GSAP & ScrollTrigger)

1. **Header Scroll Effect**:
   - Transitions between transparent un-docked state to compact blurred frosted bar with subtle border.
2. **Hero Stagger & Float**:
   - Fade-up stagger for kicker label, split headline, description, CTA buttons, and bottom trust badge.
   - Continuous gentle 3D floating keyframes on the arched wheat visual and orbiting organic leaf elements.
3. **Product Card 3D Hover Tilt**:
   - Mouse-driven dynamic tilt angle (`perspective: 1000px`, `rotateX`, `rotateY`, `scale: 1.02`) with smooth CSS spring reset.
4. **ScrollReveal & Parallax**:
   - ScrollTrigger scrub parallax for the About section rounded image and background foliage layers.
   - Staggered entrance for the 4 Why Choose Us cards (`stagger: 0.12s`, `y: 40`, `opacity: 0`).
   - Slide-up entrance for the Export Services 2x2 feature matrix.
5. **Reduced Motion**:
   - Respects `prefers-reduced-motion` across all GSAP timelines and CSS transitions.

---

### 6. Responsive Breakpoints

- **Mobile** (`< 640px`): Single column flow, hamburger drawer navigation, stacked hero visual, optimized touch targets $\ge 44\text{px}$.
- **Tablet** (`640px - 1024px`): 2-column product grid, balanced hero split, compact header links.
- **Desktop** (`1024px - 1440px`): Full 3-column product matrix, arched hero visual with floating badges, 4-column Why Us grid.
- **Ultrawide** (`> 1440px`): Maximum container width `1280px` / `1440px` centered with optical margins.

---

### 7. Reusable Component Specifications

| Component | Props | Purpose |
| :--- | :--- | :--- |
| `Header` | `activeSection?: string`, `onOpenQuoteModal?: () => void` | Sticky navigation bar with scroll state |
| `Footer` | `onProductClick?: (slug: string) => void` | Deep green corporate footer with quick links |
| `Container` | `className?: string`, `size?: 'sm' \| 'md' \| 'lg' \| 'full'` | Unified responsive max-width wrapper |
| `Button` | `variant: 'primary' \| 'secondary' \| 'outline' \| 'ghost'`, `size`, `icon`, `onClick` | Accessible single-line interactive button |
| `SectionLabel` | `label: string`, `icon?: LucideIcon`, `light?: boolean` | Clean editorial kicker tag with icon |
| `SectionHeading` | `title: string`, `highlight?: string`, `subtitle?: string`, `align?: 'left' \| 'center'` | Editorial title with serif italic emphasis |
| `ScrollReveal` | `animation?: 'fade-up' \| 'fade-in' \| 'slide-left'`, `delay?: number` | GSAP / Intersection Observer wrapper |
| `ProductCard` | `product: Product`, `onSelect?: (p: Product) => void` | 3D-tiltable export product card |
| `ProductGrid` | `products: Product[]`, `onInquire?: (p: Product) => void` | Responsive 3-column showcase |
| `AboutSection` | `onLearnMore?: () => void` | Company background with crop field parallax |
| `WhyChooseUs` | `items: FeatureItem[]` | 4-card staggered value proposition grid |
| `ExportServices` | `services: ServiceItem[]`, `onStartEnquiry?: () => void` | Order support matrix with CTA |
| `FinalCTA` | `onRequestQuote?: () => void` | High-conversion agricultural banner |
