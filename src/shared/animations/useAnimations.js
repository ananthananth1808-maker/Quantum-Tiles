import { useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Hook for smooth mouse following effect
 */
export function useMouseFollower() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return { x, y };
}

/**
 * Hook for scroll-based animations
 */
export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollY(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

/**
 * Common animation configurations
 */
export const animationConfig = {
  fast: { duration: 0.2 },
  normal: { duration: 0.3 },
  slow: { duration: 0.6 },
  easing: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};

/**
 * Generate stagger delay
 */
export const getStaggerDelay = (index, delayPerItem = 0.1) => index * delayPerItem;

/**
 * Combine multiple animation variants
 */
export const combineVariants = (...variants) => {
  return variants.reduce((acc, variant) => ({ ...acc, ...variant }), {});
};
