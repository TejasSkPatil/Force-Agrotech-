import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface HeroAnimElements {
  section?: HTMLElement | null;
  badge?: HTMLElement | null;
  heading?: HTMLElement | null;
  description?: HTMLElement | null;
  actions?: HTMLElement | null;
  trustBadge?: HTMLElement | null;
  imageContainer?: HTMLElement | null;
  floatingBadge?: HTMLElement | null;
  floatingLeaves?: HTMLElement[] | null;
}

export function initHeroAnimations(elements: HeroAnimElements, reducedMotion = false) {
  if (reducedMotion) return () => {};

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const ctx = gsap.context(() => {
    // 1. Initial Load Stagger Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Step 1: Eyebrow label slides in from the left side
    if (elements.badge) {
      tl.fromTo(
        elements.badge,
        { opacity: 0, x: isMobile ? -35 : -60, y: 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.65, ease: 'power3.out' }
      );
    }

    // Step 2: Hero heading slides in from the left side
    if (elements.heading) {
      tl.fromTo(
        elements.heading,
        { opacity: 0, x: isMobile ? -45 : -80, y: 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.85, ease: 'power3.out' },
        '-=0.4'
      );
    }

    // Step 3: Supporting paragraph slides in from the left side
    if (elements.description) {
      tl.fromTo(
        elements.description,
        { opacity: 0, x: isMobile ? -35 : -60, y: 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.75, ease: 'power3.out' },
        '-=0.5'
      );
    }

    // Step 4: Action buttons ("Explore Our Products") slide in from the left side
    if (elements.actions) {
      const btns = elements.actions.children;
      tl.fromTo(
        btns,
        { opacity: 0, x: isMobile ? -30 : -50, y: 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.65, stagger: isMobile ? 0.08 : 0.12, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // Step 5: Trust badge slides in from the left side
    if (elements.trustBadge) {
      tl.fromTo(
        elements.trustBadge,
        { opacity: 0, x: isMobile ? -25 : -40, y: 0 },
        { opacity: 1, x: 0, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    }

    // Image Container initial entrance
    if (elements.imageContainer) {
      tl.fromTo(
        elements.imageContainer,
        { opacity: 0, scale: 0.96, y: isMobile ? 15 : 25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        0.2
      );

      // Subtle floating movement (vertical only, reduced on mobile)
      gsap.to(elements.imageContainer, {
        y: isMobile ? '-=4' : '-=8',
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ScrollTrigger Parallax: moves slightly slower than surrounding content
      gsap.to(elements.imageContainer, {
        y: isMobile ? 15 : 40,
        ease: 'none',
        scrollTrigger: {
          trigger: elements.section || elements.imageContainer,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }

    // Floating Badge subtle oscillation
    if (elements.floatingBadge) {
      gsap.to(elements.floatingBadge, {
        y: isMobile ? '-=3' : '-=6',
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Floating decorative leaves with distinct speeds (desktop only)
    if (!isMobile && elements.floatingLeaves && elements.floatingLeaves.length > 0) {
      elements.floatingLeaves.forEach((leaf, idx) => {
        gsap.to(leaf, {
          y: idx % 2 === 0 ? '-=10' : '+=12',
          rotation: idx % 2 === 0 ? 5 : -6,
          duration: 3 + idx * 0.7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.25,
        });

        // Parallax speed difference
        gsap.to(leaf, {
          y: (idx + 1) * 20,
          ease: 'none',
          scrollTrigger: {
            trigger: elements.section || leaf,
            start: 'top top',
            end: 'bottom top',
            scrub: 1 + idx * 0.3,
          },
        });
      });
    }
  });

  // Mouse-Follow 3D Tilt on Desktop
  let handlePointerMove: ((e: PointerEvent) => void) | null = null;
  let handlePointerLeave: (() => void) | null = null;

  if (elements.imageContainer && elements.section && typeof window !== 'undefined') {
    const container = elements.imageContainer;

    handlePointerMove = (e: PointerEvent) => {
      // Strictly disable on touch, mobile, or screens under 1024px
      if (e.pointerType === 'touch' || window.innerWidth < 1024) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max rotation 2 to 4 degrees as requested
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      gsap.to(container, {
        rotateX: rotateX.toFixed(2),
        rotateY: rotateY.toFixed(2),
        duration: 0.4,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    };

    handlePointerLeave = () => {
      gsap.to(container, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    elements.section.addEventListener('pointermove', handlePointerMove);
    elements.section.addEventListener('pointerleave', handlePointerLeave);
  }

  return () => {
    if (handlePointerMove && elements.section) {
      elements.section.removeEventListener('pointermove', handlePointerMove);
    }
    if (handlePointerLeave && elements.section) {
      elements.section.removeEventListener('pointerleave', handlePointerLeave);
    }
    ctx.revert();
  };
}
