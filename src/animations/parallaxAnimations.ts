import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function initParallaxImage(
  triggerElement: HTMLElement,
  targetImage: HTMLElement,
  distance = 60,
  reducedMotion = false
) {
  if (reducedMotion) return () => {};

  const ctx = gsap.context(() => {
    gsap.fromTo(
      targetImage,
      { y: -distance / 2 },
      {
        y: distance / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      }
    );
  }, triggerElement);

  return () => ctx.revert();
}

export function initFloatingBadge(
  badgeElement: HTMLElement,
  reducedMotion = false
) {
  if (reducedMotion) return () => {};

  const ctx = gsap.context(() => {
    gsap.to(badgeElement, {
      y: '-=10',
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, badgeElement);

  return () => ctx.revert();
}
