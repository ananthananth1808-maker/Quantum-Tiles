# Admin Product Upload Integration Guide

## Overview

The `AdminProductUpload` component is a premium, glassmorphic admin dashboard component designed for uploading and managing tile products. It includes drag-and-drop functionality, image preview, form validation, and smooth Framer Motion animations.

## Component Features

✨ **Design Features:**
- Dark glassmorphism aesthetic
- Blue/cyan gradient theme
- Rounded 30px corners
- Floating particle animations
- Neon border highlights
- Hover glow effects

🎯 **Functional Features:**
- Drag-and-drop image upload
- Image preview
- Form validation
- Loading states
- Error handling
- Success confirmation
- Responsive design (mobile & desktop)

## Installation

### Prerequisites
- React 18.3+
- Framer Motion 11.18+
- Tailwind CSS 3.4+
- Lucide React 1.17+

All dependencies are already installed in the project.

## Basic Usage

### Simple Implementation

```jsx
import AdminProductUpload from './components/AdminProductUpload';

function MyPage() {
  const handleProductSubmit = async (formData) => {
    console.log('Product data:', formData);
    // Handle upload to backend
  };

  return (
    <AdminProductUpload onSubmit={handleProductSubmit} />
  );
}
```

### Integration with AdminProductsPage

Replace the modal in `AdminProductsPage.jsx` with the new component:

```jsx
import { useState } from 'react';
import AdminProductUpload from '../../components/AdminProductUpload';
import { supabase } from '../../lib/supabase';

export default function AdminProductsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleProductUpload = async (formData) => {
    try {
      // Process file upload if needed
      let imageUrl = null;
      if (formData.image) {
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(
            `products/${Date.now()}_${formData.image.name}`,
            formData.image
          );

        if (error) throw error;
        imageUrl = data.path;
      }

      // Save product to database
      const { error } = await supabase.from('products').insert([
        {
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
          description: formData.description,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;

      setShowUploadModal(false);
      // Refresh products list
      window.location.reload();
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Failed to upload product');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-950">
      {/* Header with Add Product Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Product Management</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-6 py-3 bg-cyan-500 text-white rounded-xl font-bold hover:bg-cyan-400 transition-all"
        >
          + Add Product
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-white z-60"
            >
              ✕
            </button>
            <AdminProductUpload onSubmit={handleProductUpload} />
          </div>
        </div>
      )}

      {/* Rest of your admin page content */}
    </div>
  );
}
```

## Component Props

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(formData) => Promise<void>` | `null` | Callback function when product is submitted |

### FormData Object Structure

```js
{
  name: string,           // Product name
  category: string,       // Selected category
  price: string,          // Product price
  stock: string,          // Stock quantity
  description: string,    // Product description
  image: File,           // Image file object
}
```

## Customization

### Change Color Theme

Edit the Tailwind classes in `AdminProductUpload.jsx`:

```jsx
// Primary colors
from-cyan-400 to-blue-400     // Change these
border-cyan-500/30            // And these

// Alternative themes:
// Purple/Pink: from-purple-400 to-pink-400
// Emerald: from-emerald-400 to-teal-400
// Orange: from-orange-400 to-red-400
```

### Modify Form Fields

Add or remove fields in the form grid section:

```jsx
// Add new field
<div>
  <label className="block text-sm font-semibold text-cyan-300 mb-3">
    New Field *
  </label>
  <input
    type="text"
    name="newField"
    value={formData.newField}
    onChange={handleInputChange}
    className="w-full bg-slate-700/40 border border-cyan-500/30 rounded-xl px-4 py-3 text-white..."
  />
</div>
```

### Adjust Animation Speed

Modify the `transition` values:

```jsx
// Slower animations
transition={{ duration: 1.0, delay: 0.5 }}

// Faster animations
transition={{ duration: 0.3, delay: 0.1 }}
```

## Custom Hooks

### useImageUpload Hook

Utility hook for standalone image upload management:

```jsx
import { useImageUpload } from './hooks/useImageUpload';

function MyComponent() {
  const {
    image,
    imagePreview,
    isLoading,
    error,
    processFile,
    uploadImage,
    clearImage,
  } = useImageUpload(onUploadSuccess);

  return (
    <div>
      {/* Your custom upload UI */}
    </div>
  );
}
```

### Available Methods

- `processFile(file)` - Validate and process a file
- `uploadImage(file)` - Upload image and get preview
- `clearImage()` - Reset image state
- `validateFile(file)` - Check file format and size

## Utility Functions

### Product Validation

```jsx
import { validateProductForm } from './utils/productValidation';

const { isValid, errors } = validateProductForm(formData);
if (!isValid) {
  console.log('Validation errors:', errors);
}
```

### Format Price

```jsx
import { formatPrice } from './utils/productValidation';

const displayPrice = formatPrice(2499); // ₹2,499
```

### File Size Formatting

```jsx
import { formatFileSize } from './utils/productValidation';

const size = formatFileSize(1024000); // "1000 KB"
```

## Responsive Breakpoints

The component is fully responsive:

- **Mobile:** `sm:` (640px and up)
- **Tablet:** `md:` (768px and up)
- **Desktop:** `lg:` (1024px and up)

## Browser Compatibility

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

### Image Optimization
- Automatic thumbnail generation
- WebP format support
- File size validation (5MB max)

### Animation Performance
- GPU-accelerated transforms
- Memoized components
- Controlled particle count (8 particles max)

## Accessibility

- Proper label associations
- Keyboard navigation support
- ARIA attributes for icons
- Clear error messages
- Focus states for inputs

## Troubleshooting

### Images not loading
- Check file format (JPG, PNG, WEBP only)
- Verify file size is under 5MB
- Clear browser cache

### Animations lagging
- Check browser hardware acceleration
- Reduce particle count in the component
- Profile with Chrome DevTools

### Form submission issues
- Validate all required fields are filled
- Check browser console for errors
- Verify Supabase connection

## Advanced Usage

### Full Page Upload Experience

```jsx
import AdminProductUpload from './components/AdminProductUpload';

function FullPageUpload() {
  const handleSubmit = async (formData) => {
    // Your upload logic
  };

  return (
    <div className="h-screen">
      <AdminProductUpload onSubmit={handleSubmit} />
    </div>
  );
}
```

### Batch Upload

```jsx
// Extend the component to handle multiple uploads
const [products, setProducts] = useState([]);

const handleMultipleUploads = async (formDataList) => {
  for (const formData of formDataList) {
    await handleProductUpload(formData);
  }
};
```

## Support & Documentation

For more details about animations, see: [Framer Motion Docs](https://www.framer.com/motion/)
For Tailwind CSS utilities: [Tailwind CSS Docs](https://tailwindcss.com/)
For Lucide icons: [Lucide React](https://lucide.dev/)
