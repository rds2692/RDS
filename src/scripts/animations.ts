import { gsap } from 'gsap';

const init = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const controller = new AbortController();
  const context = gsap.context(() => {
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
  const observers: IntersectionObserver[] = [];

  const observeReveal = (
    targets: HTMLElement[],
    onReveal: (target: HTMLElement) => void,
    threshold = 0.08,
  ) => {
    if (!targets.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        onReveal(target);
        observer.unobserve(target);
      });
    }, { threshold, rootMargin: '0px 0px -4% 0px' });
    targets.forEach((target) => observer.observe(target));
    observers.push(observer);
  };

  observeReveal(revealHeadings, (heading) => {
    gsap.from(heading, {
      y: 38,
      duration: 0.78,
      ease: 'power3.out',
      clearProps: 'transform',
    });
  }, 0.1);

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

      observeReveal([group], () => {
        gsap.from(items, {
          y: 54,
          scale: 0.985,
          rotationX: 2.5,
          transformOrigin: '50% 100%',
          transformPerspective: 1000,
          duration: 0.8,
          stagger: 0.075,
          ease: 'power3.out',
          clearProps: 'transform',
        });
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
    '.footer-top',
    '.footer-bottom',
  ];

  revealContainers.forEach((selector) => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((container) => {
      const items = Array.from(container.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement && !child.matches('.contact-spark, .prompt-doodle'),
      );
      if (!items.length) return;

      observeReveal([container], () => {
        gsap.from(items, {
          y: 42,
          duration: 0.72,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
        });
      });
    });
  });

  observeReveal(gsap.utils.toArray<HTMLElement>('.ai-disclaimer, .local-price-note'), (element) => {
    gsap.from(element, {
      y: 24,
      duration: 0.65,
      ease: 'power2.out',
      clearProps: 'transform',
    });
  });

  window.addEventListener('pagehide', () => {
    controller.abort();
    observers.forEach((observer) => observer.disconnect());
    context.revert();
  }, { once: true });
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
