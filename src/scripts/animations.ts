import { gsap } from 'gsap';

const init = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (reduceMotion || !elements.length) return;

  const controller = new AbortController();
  const context = gsap.context(() => {
    gsap.from(elements, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      clearProps: 'all',
    });

    gsap.utils.toArray<HTMLElement>('.service-tile, .button-primary').forEach((element) => {
      const lift = gsap.quickTo(element, 'y', { duration: 0.22, ease: 'power2.out' });
      element.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'mouse') lift(element.matches('.button') ? -2 : -4);
      }, { signal: controller.signal });
      element.addEventListener('pointerleave', () => lift(0), { signal: controller.signal });
    });
  });

  window.addEventListener('pagehide', () => {
    controller.abort();
    context.revert();
  }, { once: true });
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
