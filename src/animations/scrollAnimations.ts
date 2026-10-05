import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function initStaggerReveal(
  container: HTMLElement,
  childSelector: string,
  stagger = 0.12,
  reducedMotion = false
) {
  if (reducedMotion) return () => {};

  const ctx = gsap.context(() => {
    const items = container.querySelectorAll(childSelector);
    if (!items.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
      }
    );
  }, container);

  return () => ctx.revert();
}

export function initSlideUpReveal(element: HTMLElement, delay = 0, reducedMotion = false) {
  if (reducedMotion) return () => {};

  const ctx = gsap.context(() => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, element);

  return () => ctx.revert();
}
