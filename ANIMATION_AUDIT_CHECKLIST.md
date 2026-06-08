# 🔍 Animation Audit Checklist

Use this checklist to audit existing components and apply animations systematically.

## Component Animation Audit Template

### [ ] Component: ________________

**File Path**: `src/____________`

#### Phase 1: Planning
- [ ] Identify animation triggers (load, scroll, hover, tap)
- [ ] Determine animation type (fade, slide, scale, zoom)
- [ ] Plan stagger effect (if list/grid)
- [ ] Define duration (fast/normal/slow)

#### Phase 2: Implementation Checklist

**Imports**
- [ ] Import Framer Motion: `import { motion } from 'framer-motion'`
- [ ] Import variants: `import { scrollRevealFadeUp, ... } from '...animations/variants'`

**Scroll Entrance Animations**
- [ ] Add `<motion.div>` wrapper
- [ ] Add `variants={scrollRevealFadeUp}`
- [ ] Add `initial="hidden"`
- [ ] Add `whileInView="visible"`
- [ ] Add `viewport={{ once: true, amount: 0.2 }}`

**Stagger Effects (for lists/grids)**
- [ ] Wrap container with `variants={staggerContainer}`
- [ ] Wrap items with `variants={staggerItemFadeUp}`
- [ ] Container: `initial="hidden" animate="visible"`

**Hover Effects**
- [ ] Add `whileHover={{ scale: 1.05 }}`
- [ ] Add `whileTap={{ scale: 0.95 }}` (for buttons)
- [ ] Add `transition={{ duration: 0.3 }}`

**Image Zoom**
- [ ] Use `variants={imageZoom}`
- [ ] Set `initial="initial"`
- [ ] Set `whileHover="whileHover"`

#### Phase 3: Quality Checks
- [ ] Animations work on desktop
- [ ] Animations work on mobile/touch
- [ ] No layout shift issues
- [ ] No console errors
- [ ] Performance: 60fps maintained
- [ ] Accessibility: respects prefers-reduced-motion

---

## Components Status

### ✅ COMPLETED (With Premium Animations)

- [x] **Navbar** - `src/shared/ui/Navbar.jsx`
  - Slide-down on load
  - Staggered link animations

- [x] **HomePage** - `src/pages/HomePage.jsx`
  - Full hero section animations
  - Staggered content
  - Button animations

- [x] **ProductCard** - `src/components/ProductCard.jsx`
  - Scroll reveal fade-in
  - Hover scale effect
  - Image zoom

- [x] **ProductListing** - `src/ProductListing.jsx`
  - Scroll reveals
  - Grid stagger
  - Filter animations

- [x] **Button** - `src/components/ui/button.jsx`
  - Premium hover animations
  - Tap feedback

### ⏳ TODO (Need Animation Enhancement)

These components should be enhanced with animations following the guide:

- [ ] **Card Component** - `src/components/ui/card.jsx`
  - Suggested: Scroll reveal + hover lift

- [ ] **ProductDetails** - `src/ProductDetails.jsx`
  - Suggested: Fade-up on scroll, image zoom

- [ ] **CartPage** - `src/CartPage.jsx`
  - Suggested: Item stagger, animation on add/remove

- [ ] **CheckoutPage** - `src/CheckoutPage.jsx`
  - Suggested: Step-by-step animations

- [ ] **LoginPage** - `src/pages/LoginPage.jsx`
  - Suggested: Form field fade-ins

- [ ] **RegisterPage** - `src/pages/RegisterPage.jsx`
  - Suggested: Progressive form animations

- [ ] **CategoriesPage** - `src/pages/CategoriesPage.jsx`
  - Suggested: Category grid stagger

- [ ] **SearchPage** - `src/pages/SearchPage.jsx`
  - Suggested: Result list animations

- [ ] **WishlistPage** - `src/pages/WishlistPage.jsx`
  - Suggested: Product grid animations

- [ ] **AboutPage** - `src/pages/AboutPage.jsx`
  - Suggested: Section reveals, image zooms

- [ ] **ProfileDropdown** - `src/shared/ui/ProfileDropdown.jsx`
  - Suggested: Slide down animation

- [ ] **MobileDrawer** - `src/shared/ui/MobileDrawer.jsx`
  - Suggested: Slide from side, backdrop fade

- [ ] **Sidebar** - `src/shared/ui/Sidebar.jsx`
  - Suggested: Slide animation, staggered links

- [ ] **Admin Pages** - `src/pages/Admin*.jsx`
  - Suggested: Table animations, chart reveals

- [ ] **SkeletonLoader** - `src/components/SkeletonLoader.jsx`
  - Suggested: Shimmer effect (already in variants)

- [ ] **AnimatedBackground** - `src/components/AnimatedBackground.jsx`
  - Suggested: Floating/floating-up animations

### 🎯 Priority Order

**HIGH PRIORITY** (Common user interactions):
1. ProductDetails - High traffic component
2. CartPage - Key conversion page
3. CheckoutPage - Critical user flow
4. LoginPage - Entry point
5. Card Component - Used everywhere

**MEDIUM PRIORITY** (Secondary pages):
6. CategoriesPage
7. SearchPage
8. WishlistPage
9. AboutPage

**LOW PRIORITY** (Admin/less frequent):
10. Admin Dashboard pages
11. ProfileDropdown
12. MobileDrawer

---

## Quick Start for New Component Animations

### Step 1: Add Basic Scroll Reveal
```jsx
import { scrollRevealFadeUp } from '../shared/animations/variants';

<motion.div
  variants={scrollRevealFadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  Your component content
</motion.div>
```

### Step 2: Add Hover Effects
```jsx
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
transition={{ duration: 0.3 }}
```

### Step 3: Add Stagger to Lists
```jsx
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItemFadeUp}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Step 4: Test & Verify
- [ ] Run `npm run dev`
- [ ] Test in browser
- [ ] Check Performance tab for 60fps
- [ ] Test on mobile device
- [ ] Check console for errors

---

## Common Issues & Fixes

### ❌ Animation not showing on scroll

**Problem**: Element doesn't animate when scrolling into view

**Solution**:
```jsx
// Add whileInView
whileInView="visible"
// Add viewport config
viewport={{ once: true, amount: 0.2 }}
// Make sure variants has 'hidden' and 'visible' states
variants={scrollRevealFadeUp}
```

### ❌ Jerky or stuttering animation

**Problem**: Animation feels choppy

**Solutions**:
- Use `transform` instead of positioning properties
- Reduce number of animated elements
- Check DevTools Performance tab
- Remove conflicting CSS transitions

### ❌ Animation triggers multiple times

**Problem**: Animation replays when scrolling

**Solution**:
```jsx
viewport={{ 
  once: true,  // ← This prevents re-triggering
  amount: 0.2 
}}
```

### ❌ Layout shift when animating

**Problem**: Content jumps around

**Solutions**:
- Use `transform` instead of margin/padding changes
- Set fixed dimensions
- Use `will-change` CSS property if needed

---

## Performance Monitoring

### Check Animation Performance
1. Open DevTools (F12)
2. Go to Performance tab
3. Record page interaction
4. Look for 60fps (smooth) vs drops
5. Check for layout recalculations

### Optimization Tips
- Limit animated elements per viewport
- Use `position: absolute` for floating elements
- Cache `inView` state
- Reduce blur/filter effects
- Use hardware acceleration: `transform: translateZ(0)`

---

## Testing Checklist

### Desktop Testing
- [ ] Animations smooth at 60fps
- [ ] Hover effects work smoothly
- [ ] Scroll reveals trigger correctly
- [ ] No console errors or warnings

### Mobile Testing
- [ ] Touch events (tap) work correctly
- [ ] Animations don't cause layout shift
- [ ] Performance acceptable on slower devices
- [ ] Respects reduced motion preference

### Accessibility
- [ ] No animation blocks content
- [ ] Can still interact with animated elements
- [ ] Works with screen readers
- [ ] Respects `prefers-reduced-motion`

---

## Documentation Updates

When adding animations to a component:

1. [ ] Update component's JSDoc comments with animation info
2. [ ] Add example usage in comment block
3. [ ] Link to relevant animation variant
4. [ ] Document any custom animation logic
5. [ ] Update this checklist

---

## Batch Processing Guide

### Updating Multiple Related Components

Example: Update all admin pages

```jsx
// 1. Identify all admin pages
src/pages/Admin*.jsx (8 files)

// 2. Apply scroll reveals to main sections
variants={scrollRevealFadeUp}

// 3. Apply stagger to tables/lists
variants={staggerContainer} with staggerItemFadeUp

// 4. Test each one
npm run dev → test page → fix issues

// 5. Document changes
Update this checklist
```

---

## Sign-Off Checklist

- [ ] All listed components reviewed
- [ ] Completed components have animations
- [ ] Performance verified (60fps)
- [ ] Mobile tested
- [ ] Accessibility checked
- [ ] No console errors
- [ ] Documentation updated
- [ ] Code reviewed

---

**Last Updated**: 2026-06-08
**Animation Framework**: Framer Motion v10+
**Status**: In Progress ⏳

Use this checklist as you enhance more components!
