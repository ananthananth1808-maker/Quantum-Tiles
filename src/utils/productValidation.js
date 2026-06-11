// Validation utilities for product uploads
export const validateProductForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Product name is required';
  } else if (formData.name.length < 3) {
    errors.name = 'Product name must be at least 3 characters';
  }

  if (!formData.category) {
    errors.category = 'Category is required';
  }

  if (!formData.price) {
    errors.price = 'Price is required';
  } else if (isNaN(formData.price) || formData.price <= 0) {
    errors.price = 'Price must be a valid positive number';
  }

  if (formData.stock && (isNaN(formData.stock) || formData.stock < 0)) {
    errors.stock = 'Stock must be a valid positive number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Format price for display
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

// Generate product thumbnail from image
export const generateThumbnail = (imageData, width = 200, height = 200) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageData;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // Calculate aspect ratio
      const ratio = Math.max(width / img.width, height / img.height);
      const x = (width - img.width * ratio) / 2;
      const y = (height - img.height * ratio) / 2;

      ctx.drawImage(img, x, y, img.width * ratio, img.height * ratio);
      resolve(canvas.toDataURL('image/webp', 0.8));
    };
  });
};

// Format file size for display
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
