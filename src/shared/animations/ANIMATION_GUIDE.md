# Quantum Tiles Premium Animation Guide

## Overview
This guide provides comprehensive documentation for using Framer Motion animations throughout the Quantum Tiles project. All animations are production-ready, performant, and mobile-responsive.

## Core Animation Variants

### Navbar Animations
- **`navbarSlideDown`** - Slides navbar from top on page load
  - Duration: 0.6s
  - Used in: `Navbar.jsx`

### Hero Section Animations
- **`heroHeading`** - Fades and lifts main heading
- **`heroSubheading`** - Fades and lifts subheading with 0.2s delay
- **`heroImageScale`** - Scales image in smoothly with 0.3s delay
- **`heroButtonStagger`** - Staggered button animations with individual delays

Usage in HomePage:
```jsx
<motion.h1 variants={heroHeading} initial="hidden" animate="visible">
  Your heading
</motion.h1>
```

### Scroll Reveal Animations
Automatically trigger when elements enter viewport:
- **`scrollRevealFadeUp`** - Fades up from bottom (60px offset)
- **`scrollRevealFadeLeft`** - Fades from left side
- **`scrollRevealFadeRight`** - Fades from right side

```jsx
<motion.div
  variants={scrollRevealFadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  Content automatically animates on scroll
</motion.div>
```

### Product Card Animations
- **`productCardFadeIn`** - Fades in when scrolling into view
- **`productCardHover`** - Scales 1.05 and moves up 10px on hover
- **`productCardShadow`** - Enhanced shadow on hover

```jsx
<motion.article
  variants={productCardFadeIn}
  whileHover={productCardHover.whileHover}
  whileTap={productCardHover.whileTap}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  Card content
</motion.article>
```

### Image Hover Effects
- **`imageZoom`** - Scales image 1.1x on hover (0.4s duration)
- **`imageSmoothZoom`** - Combines fade-in with hover zoom effect

```jsx
<motion.img
  variants={imageZoom}
  whileHover="whileHover"
  className="overflow-hidden rounded-lg"
/>
```

### Button Animations
- **`premiumButtonHover`** - Scales 1.05 with glow shadow
- **`ghostButtonHover`** - Subtle scale and background change
- **`buttonHover`** (legacy) - Basic hover/tap animations

```jsx
<motion.button
  variants={premiumButtonHover}
  whileHover="whileHover"
  whileTap="whileTap">
  Click me
</motion.button>
```

### Container & Stagger Animations
- **`staggerContainer`** - Container for staggered children
- **`staggerItem`** - Individual items for stagger effect
- **`staggerItemFadeUp`** - Fade-up variant for stagger
- **`productGridStagger`** - Optimized for product grids
- **`containerWithStagger(delayChildren, staggerChildren)`** - Configurable stagger container

```jsx
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItemFadeUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Reusable Components

### ScrollReveal Component
Automatically animates content when scrolling into view:

```jsx
import { ScrollReveal } from '../shared/components/ScrollReveal';
import { scrollRevealFadeUp } from '../shared/animations/variants';

<ScrollReveal variants={scrollRevealFadeUp} once={true}>
  <h2>This animates on scroll</h2>
</ScrollReveal>
```

### ScrollRevealWithStagger Component
For lists that need stagger effect on scroll:

```jsx
<ScrollRevealWithStagger
  itemVariants={staggerItemFadeUp}
  containerVariants={staggerContainer}
>
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</ScrollRevealWithStagger>
```

## Animation Hooks

### useMouseFollower()
Creates smooth mouse-following effect:
```jsx
import { useMouseFollower } from '../shared/animations/useAnimations';

const { x, y } = useMouseFollower();

<motion.div style={{ x, y }}>
  Follows mouse
</motion.div>
```

## Animation Config Constants

Access reusable animation configurations:
```jsx
import { animationConfig } from '../shared/animations/useAnimations';

// Durations
animationConfig.fast       // 0.2s
animationConfig.normal     // 0.3s
animationConfig.slow       // 0.6s

// Easing functions
animationConfig.easing.smooth    // cubic-bezier(0.4, 0, 0.2, 1)
animationConfig.easing.bounce    // cubic-bezier(0.68, -0.55, 0.265, 1.55)
animationConfig.easing.elastic   // cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

## Best Practices

### 1. Performance
- Use `once={true}` in scroll animations to prevent re-triggering
- Avoid animating too many elements simultaneously
- Use `transform` and `opacity` for better GPU performance
- Disable animations on very low-end devices if needed

### 2. Mobile Responsiveness
- All animations are mobile-responsive
- Reduced motion respects `prefers-reduced-motion` preference
- Touch interactions use `whileTap` for tactile feedback

### 3. Timing
- Use consistent durations: 0.2s (fast), 0.3s (normal), 0.6s (slow)
- Add delays to create visual hierarchy
- Stagger delays should be 0.1s or less between items

### 4. Viewport Triggers
```jsx
// Always use viewport for scroll-triggered animations
whileInView="visible"
viewport={{ once: true, amount: 0.2 }}
```

### 5. Transition Types
- `ease: 'easeOut'` - Most animations
- `type: 'spring'` - Bounce/elastic effects
- `type: 'tween'` - Linear or custom easing

## Common Patterns

### Animated Section with Title
```jsx
<motion.section
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <motion.h2 variants={scrollRevealFadeUp}>Section Title</motion.h2>
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItemFadeUp}>
      {item.content}
    </motion.div>
  ))}
</motion.section>
```

### Product Grid with Hover
```jsx
<motion.div
  variants={productGridStagger}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
>
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</motion.div>
```

### Hover Lift Effect
```jsx
<motion.div
  whileHover={{ y: -8, transition: { duration: 0.3 } }}
  className="rounded-lg shadow-card"
>
  Hovers upward
</motion.div>
```

## Updated Components

The following components have been enhanced with premium animations:
- ✅ `Navbar.jsx` - Slide-down animation
- ✅ `HomePage.jsx` - Full hero animations with stagger
- ✅ `ProductCard.jsx` - Fade-in, hover scale, image zoom
- ✅ `ProductListing.jsx` - Scroll reveal, grid stagger
- ✅ `Button.jsx` - Premium hover/tap animations

## Troubleshooting

### Animation not triggering on scroll
- Ensure `whileInView="visible"` is set
- Check that `viewport={{ once: true }}` is configured
- Verify the element is in view before testing

### Animation feels jerky
- Use `transform` instead of `left`/`top`/`width`
- Check for conflicting CSS transitions
- Reduce number of animating elements

### Performance issues
- Use `motion.div` instead of `motion.button` for better performance
- Reduce stagger delay or remove unnecessary animations
- Profile with Chrome DevTools Performance tab

## File Structure

```
src/shared/
├── animations/
│   ├── variants.js           # All animation variants
│   ├── useAnimations.js      # Animation hooks & utilities
│   └── ScrollReveal.jsx      # Reusable scroll-reveal components
├── ui/
│   ├── Navbar.jsx            # Enhanced navbar
│   └── ...
└── components/
    └── ScrollReveal.jsx      # (Duplicated - can refactor)

src/pages/
├── HomePage.jsx              # Hero animations
└── ...

src/components/
├── ProductCard.jsx           # Card animations
├── ui/
│   └── button.jsx           # Button animations
└── ...
```

## Future Enhancements

- Add parallax scrolling effects for hero sections
- Create animated backgrounds with Three.js
- Add page transition animations
- Implement animated number counters
- Add gesture-based animations for mobile
