import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const init = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const controller = new AbortController();
  const context = gsap.context(() => {
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .from('.hero-wordmark', { y: 52, scale: 0.9, opacity: 0, duration: 1.15, ease: 'expo.out' })
      .from('.hero-tagline', { y: 36, opacity: 0, duration: 0.8 }, '-=0.62')
      .from('.hero-subline, .hero-description', { y: 20, opacity: 0, stagger: 0.08, duration: 0.62 }, '-=0.46')
      .from('.hero-actions, .hero-scene-hint', { y: 16, opacity: 0, stagger: 0.08, duration: 0.55 }, '-=0.38')
      .from('.hero-kicker', { opacity: 0, duration: 0.7 }, 0);

    gsap.utils.toArray<HTMLElement>('.service-tile, .button-primary').forEach((element) => {
      const lift = gsap.quickTo(element, 'y', { duration: 0.22, ease: 'power2.out' });
      element.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'mouse') lift(element.matches('.button') ? -2 : -4);
      }, { signal: controller.signal });
      element.addEventListener('pointerleave', () => lift(0), { signal: controller.signal });
    });

    if (window.matchMedia('(pointer: fine)').matches) {
      gsap.utils.toArray<HTMLElement>('.discipline-card, .path-card').forEach((card) => {
        const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.32, ease: 'power2.out' });
        const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.32, ease: 'power2.out' });
        gsap.set(card, { transformPerspective: 900, transformOrigin: 'center' });
        card.addEventListener('pointermove', (event) => {
          const bounds = card.getBoundingClientRect();
          rotateX((0.5 - (event.clientY - bounds.top) / bounds.height) * 5);
          rotateY(((event.clientX - bounds.left) / bounds.width - 0.5) * 6);
        }, { signal: controller.signal });
        card.addEventListener('pointerleave', () => {
          rotateX(0);
          rotateY(0);
        }, { signal: controller.signal });
      });
    }
  });

  const revealHeadings = gsap.utils.toArray<HTMLElement>(
    '.section-heading, .method-intro, .service-line-heading, .contact-form-heading, .blog-index-top, .blog-category-title, .contact-bottom > .eyebrow',
  );
  revealHeadings.forEach((heading) => {
    gsap.from(heading, {
      y: 42,
      opacity: 0,
      duration: 0.82,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: heading,
        start: 'top 88%',
        once: true,
      },
    });
  });

  const groupedSections = [
    '.discipline-grid',
    '.services-grid',
    '.path-grid',
    '.method-steps',
    '.home-price-grid',
    '.pricing-grid',
    '.local-price-grid',
    '.outcome-grid',
    '.process-grid',
    '.principles-grid',
    '.blog-grid',
    '.deliverables-list',
    '.faq-list',
    '.project-form',
    '.category-pills',
    '.price-jump-links',
  ];

  groupedSections.forEach((selector) => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((group) => {
      const items = gsap.utils.toArray<HTMLElement>(':scope > *', group);
      if (!items.length) return;

      gsap.from(items, {
        y: 62,
        opacity: 0,
        scale: 0.975,
        rotationX: 3,
        transformOrigin: '50% 100%',
        transformPerspective: 1000,
        duration: 0.86,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: group,
          start: 'top 84%',
          once: true,
        },
      });
    });
  });

  const revealContainers = [
    '.project-teaser',
    '.price-teaser',
    '.contact-band',
    '.audit-strip',
    '.service-note',
    '.protocol-band',
    '.studio-manifesto',
    '.case-promise',
    '.contact-form-section',
    '.local-explainer',
    '.terms-section',
    '.blog-prompt',
    '.projects-empty',
    '.article-cover',
    '.article-content',
    '.article-end',
    '.service-chooser',
    '.pricing-explainer',
    '.table-scroll',
    '.contact-bottom',
    '.directory-hero',
    '.service-hero',
    '.blog-index-hero',
    '.contact-page-grid',
    '.article-header',
    '.footer-top',
    '.footer-bottom',
  ];

  revealContainers.forEach((selector) => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((container) => {
      const items = Array.from(container.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement && !child.matches('.contact-spark, .prompt-doodle'),
      );
      if (!items.length) return;

      gsap.from(items, {
        y: 48,
        opacity: 0,
        duration: 0.78,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: container,
          start: 'top 84%',
          once: true,
        },
      });
    });
  });

  gsap.utils.toArray<HTMLElement>('.ai-disclaimer, .local-price-note').forEach((element) => {
    gsap.from(element, {
      y: 26,
      opacity: 0,
      duration: 0.68,
      ease: 'power2.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        once: true,
      },
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });

  window.addEventListener('pagehide', () => {
    controller.abort();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    context.revert();
  }, { once: true });
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
