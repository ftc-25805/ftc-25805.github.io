/**
 * Scroll Animation Hook
 * Provides scroll-triggered animations with Intersection Observer
 */

import { useState, useEffect, useRef, RefObject } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  animationType?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn';
}

interface ScrollAnimationReturn {
  ref: RefObject<HTMLElement>;
  isVisible: boolean;
  hasTriggered: boolean;
}

// Hook for individual element animation
export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  delay = 0,
  animationType = 'fadeIn'
}: ScrollAnimationOptions = {}): ScrollAnimationReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                setIsVisible(true);
                if (triggerOnce) {
                  setHasTriggered(true);
                }
              }, delay);
            } else {
              setIsVisible(true);
              if (triggerOnce) {
                setHasTriggered(true);
              }
            }
            
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return {
    ref: elementRef,
    isVisible,
    hasTriggered,
  };
};

// Hook for staggered animations (multiple elements)
export const useStaggeredAnimation = (
  count: number,
  staggerDelay: number = 100,
  options: ScrollAnimationOptions = {}
) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false));
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisibleItems(new Array(count).fill(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger staggered animation
            for (let i = 0; i < count; i++) {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newItems = [...prev];
                  newItems[i] = true;
                  return newItems;
                });
              }, i * staggerDelay + (options.delay || 0));
            }
            
            if (options.triggerOnce !== false) {
              observer.unobserve(entry.target);
            }
          } else if (options.triggerOnce === false) {
            setVisibleItems(new Array(count).fill(false));
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [count, staggerDelay, options]);

  return {
    containerRef,
    visibleItems,
  };
};

// Hook for scroll progress tracking
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / documentHeight;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return scrollProgress;
};

// Hook for parallax effect
export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const updateParallax = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      // Only apply parallax when element is in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', updateParallax);
    updateParallax();

    return () => {
      window.removeEventListener('scroll', updateParallax);
    };
  }, [speed]);

  return {
    ref: elementRef,
    offset,
  };
};

// Animation CSS classes generator
export const getAnimationClasses = (
  animationType: string,
  isVisible: boolean,
  className: string = ''
): string => {
  const baseClass = 'ftc-scroll-animation';
  const typeClass = `ftc-animation-${animationType}`;
  const stateClass = isVisible ? 'ftc-animation-visible' : 'ftc-animation-hidden';
  
  return [baseClass, typeClass, stateClass, className].filter(Boolean).join(' ');
};

// Preset animation configurations
export const ANIMATION_PRESETS = {
  fadeIn: {
    animationType: 'fadeIn' as const,
    threshold: 0.1,
    delay: 0,
  },
  slideUp: {
    animationType: 'slideUp' as const,
    threshold: 0.2,
    delay: 0,
  },
  slideLeft: {
    animationType: 'slideLeft' as const,
    threshold: 0.15,
    delay: 100,
  },
  slideRight: {
    animationType: 'slideRight' as const,
    threshold: 0.15,
    delay: 100,
  },
  scaleIn: {
    animationType: 'scaleIn' as const,
    threshold: 0.3,
    delay: 200,
  },
  staggeredCards: {
    animationType: 'slideUp' as const,
    threshold: 0.1,
    delay: 0,
    staggerDelay: 150,
  },
} as const;