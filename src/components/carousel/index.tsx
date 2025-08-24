import {createSimpleComponent} from '../../lib/create-simple-component';
import './style.css';

export const Carousel = createSimpleComponent('carousel', 'div', {}, (el: HTMLElement) => {
  const scrollToSlide = (index: number) => {
    const slideWidth = el.clientWidth;
    el.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth'
    });
  };

  const getCurrentSlide = () => {
    const slideWidth = el.clientWidth;
    return Math.round(el.scrollLeft / slideWidth);
  };

  // Auto-play functionality
  const autoPlayDelay = parseInt(el.getAttribute('data-autoplay') || '0');
  let currentSlide = 0;
  let interval: ReturnType<typeof setInterval>;

  if (autoPlayDelay > 0) {
    const advance = () => {
      const slides = el.children.length;
      currentSlide = (currentSlide + 1) % slides;
      scrollToSlide(currentSlide);
    };

    interval = setInterval(advance, autoPlayDelay);

    const pauseAutoPlay = () => clearInterval(interval);
    const resumeAutoPlay = () => {
      clearInterval(interval);
      interval = setInterval(advance, autoPlayDelay);
    };

    el.addEventListener('mouseenter', pauseAutoPlay);
    el.addEventListener('mouseleave', resumeAutoPlay);
  }

  // Navigation buttons
  const prevBtn = el.querySelector('[direction="prev"]') as HTMLButtonElement;
  const nextBtn = el.querySelector('[direction="next"]') as HTMLButtonElement;

  const handlePrev = () => {
    const slides = el.children.length;
    currentSlide = currentSlide === 0 ? slides - 1 : currentSlide - 1;
    scrollToSlide(currentSlide);
  };

  const handleNext = () => {
    const slides = el.children.length;
    currentSlide = currentSlide === slides - 1 ? 0 : currentSlide + 1;
    scrollToSlide(currentSlide);
  };

  prevBtn?.addEventListener('click', handlePrev);
  nextBtn?.addEventListener('click', handleNext);

  // Indicator dots
  const indicators = el.querySelectorAll('[p="carousel-indicator"]');
  indicators.forEach((indicator, index) => {
    const btn = indicator as HTMLButtonElement;
    btn.addEventListener('click', () => {
      currentSlide = index;
      scrollToSlide(index);
    });
  });

  // Update indicators on scroll
  const updateIndicators = () => {
    const current = getCurrentSlide();
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === current);
    });
  };

  el.addEventListener('scroll', updateIndicators);

  // Cleanup
  return () => {
    if (interval) clearInterval(interval);
    el.removeEventListener('scroll', updateIndicators);
    if (autoPlayDelay > 0) {
      el.removeEventListener('mouseenter', pauseAutoPlay);
      el.removeEventListener('mouseleave', resumeAutoPlay);
    }
    prevBtn?.removeEventListener('click', handlePrev);
    nextBtn?.removeEventListener('click', handleNext);
    indicators.forEach((indicator, index) => {
      indicator.removeEventListener('click', () => {
        currentSlide = index;
        scrollToSlide(index);
      });
    });
  };
});

export const CarouselItem = createSimpleComponent('carousel-item', 'div');
export const CarouselNav = createSimpleComponent('carousel-nav', 'button');
export const CarouselIndicators = createSimpleComponent('carousel-indicators', 'div');
export const CarouselIndicator = createSimpleComponent('carousel-indicator', 'button');
