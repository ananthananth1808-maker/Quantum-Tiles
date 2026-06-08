import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * ScrollReveal Component
 * Animates elements when they enter the viewport
 *
 * @param {React.ReactNode} children - Content to animate
 * @param {Object} variants - Framer Motion variants (must have 'hidden' and 'visible' states)
 * @param {number} delay - Initial delay before animation starts (default: 0)
 * @param {string} className - Additional CSS classes
 * @param {Object} containerVariants - Variants for the container (optional)
 * @param {boolean} once - If true, animation triggers only once (default: true)
 */
export function ScrollReveal({
  children,
  variants,
  delay = 0,
  className = '',
  containerVariants = null,
  once = true,
}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: once,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants || variants}
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollRevealWithStagger Component
 * Animates a list of children with stagger effect
 */
export function ScrollRevealWithStagger({
  children,
  itemVariants,
  containerVariants,
  delay = 0,
  className = '',
  once = true,
}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: once,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
