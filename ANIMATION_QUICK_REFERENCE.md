# 🎬 Animation Quick Reference Card

## Copy-Paste Ready Code Snippets

### 1️⃣ Scroll Reveal - Fade Up
```jsx
import { scrollRevealFadeUp } from '../shared/animations/variants';

<motion.div
  variants={scrollRevealFadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  Your content here
</motion.div>
```

### 2️⃣ Scroll Reveal - Fade Left
```jsx
import { scrollRevealFadeLeft } from '../shared/animations/variants';

<motion.div
  variants={scrollRevealFadeLeft}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  Sidebar content
</motion.div>
```

### 3️⃣ Staggered List
```jsx
import { staggerContainer, staggerItemFadeUp } from '../shared/animations/variants';

<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItemFadeUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### 4️⃣ Staggered List (On Scroll)
```jsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItemFadeUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### 5️⃣ Product Card with Hover
```jsx
import { productCardFadeIn, productCardHover, imageZoom } from '../shared/animations/variants';

<motion.article
  variants={productCardFadeIn}
  whileHover={productCardHover.whileHover}
  whileTap={productCardHover.whileTap}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  className="rounded-2xl overflow-hidden shadow-card"
>
  <div className="relative overflow-hidden h-64 bg-gray-100">
    <motion.img
      src={imageUrl}
      alt="Product"
      variants={imageZoom}
      initial="initial"
      whileHover="whileHover"
    />
  </div>
  <div className="p-6">
    <h3 className="text-xl font-bold">Product Name</h3>
    <p className="text-primary font-semibold text-lg">₹2,499</p>
  </div>
</motion.article>
```

### 6️⃣ Image Zoom on Hover
```jsx
import { imageZoom } from '../shared/animations/variants';

<div className="relative overflow-hidden rounded-lg h-96">
  <motion.img
    src={imageUrl}
    alt="Description"
    variants={imageZoom}
    initial="initial"
    whileHover="whileHover"
    className="w-full h-full object-cover"
  />
</div>
```

### 7️⃣ Premium Button Hover
```jsx
import { premiumButtonHover } from '../shared/animations/variants';

<motion.button
  variants={premiumButtonHover}
  whileHover="whileHover"
  whileTap="whileTap"
  className="px-8 py-3 bg-primary text-white rounded-full font-semibold"
>
  Click me
</motion.button>
```

### 8️⃣ Simple Button Hover
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 bg-primary text-white rounded-full"
>
  Click me
</motion.button>
```

### 9️⃣ Hero Section - Full Setup
```jsx
import {
  heroHeading,
  heroSubheading,
  heroImageScale,
  heroButtonStagger,
  staggerContainer,
} from '../shared/animations/variants';

<motion.section
  initial="hidden"
  animate="visible"
  variants={staggerContainer}
>
  {/* Heading */}
  <motion.h1 variants={heroHeading}>
    Your Main Heading
  </motion.h1>

  {/* Subheading */}
  <motion.p variants={heroSubheading}>
    Your subheading text here
  </motion.p>

  {/* Buttons with Stagger */}
  <motion.div
    initial="hidden"
    animate="visible"
    variants={staggerContainer}
  >
    <motion.div custom={0} variants={heroButtonStagger}>
      <button>Button 1</button>
    </motion.div>
    <motion.div custom={1} variants={heroButtonStagger}>
      <button>Button 2</button>
    </motion.div>
  </motion.div>

  {/* Image */}
  <motion.div
    className="rounded-lg overflow-hidden"
    variants={heroImageScale}
  >
    <motion.img src={heroImage} />
  </motion.div>
</motion.section>
```

### 🔟 Custom Stagger with Dynamic Delay
```jsx
import { featureCardStagger } from '../shared/animations/variants';

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {features.map((feature, index) => (
    <motion.div key={index} variants={featureCardStagger(index)}>
      {feature.content}
    </motion.div>
  ))}
</motion.div>
```

---

## Animation Timing Quick Reference

| Duration | Use Case |
|----------|----------|
| **0.2s** | Button hovers, quick interactions |
| **0.3s** | Icon changes, small transitions |
| **0.4s** | Image zoom, medium transitions |
| **0.6s** | Section reveals, hero animations |
| **0.8s** | Large section reveals |

## Common Viewport Settings

```jsx
// For hero sections
viewport={{ once: true, amount: 0.3 }}

// For product cards  
viewport={{ once: true, amount: 0.2 }}

// For grid items
viewport={{ once: true, amount: 0.1 }}

// For text content
viewport={{ once: true, amount: 0.5 }}
```

## Easing Functions

```jsx
// Smooth ease-out (most common)
ease: 'easeOut'

// Bounce effect
type: 'spring'
stiffness: 100
damping: 15

// Linear
ease: 'linear'
```

## Common Hover Patterns

```jsx
// Simple scale
whileHover={{ scale: 1.05 }}

// Scale + Color
whileHover={{ scale: 1.05, backgroundColor: '#f3f4f6' }}

// Scale + Y Move
whileHover={{ scale: 1.05, y: -8 }}

// Scale + Shadow
whileHover={{
  scale: 1.05,
  boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
}}

// Rotate + Scale
whileHover={{ scale: 1.1, rotate: 5 }}
```

## Mobile Responsive Animation

```jsx
// Reduce animations on mobile
initial="hidden"
animate={isMobile ? "visible" : "hidden"}
whileInView={isMobile ? undefined : "visible"}
```

## Debugging Tips

```jsx
// Test if element is in view
console.log('Element in view:', inView);

// Check animation state
initial={{ opacity: 0 }}  // Before entering view
animate="visible"         // When entering view
viewport={{ once: true }} // Trigger only once
```

---

## 📊 Performance Best Practices

✅ **DO:**
- Use `transform` and `opacity` for animations
- Use `once: true` to prevent re-animation
- Limit number of animating elements
- Use `whileInView` for scroll animations

❌ **DON'T:**
- Animate `width`, `height`, `left`, `top`
- Remove `once: true` unless necessary
- Animate too many elements simultaneously
- Use `animate` for continuous animations without `initial`

---

## Files to Reference

- 📖 **ANIMATION_GUIDE.md** - Full documentation
- 🎬 **AnimationShowcase.jsx** - Visual examples
- ⚙️ **useAnimations.js** - Utilities & hooks
- 📋 **variants.js** - All animation variants

---

**Pro Tip**: Copy these snippets and customize the class names and content to match your design!
