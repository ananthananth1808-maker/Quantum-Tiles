import { useState, useCallback } from 'react';

export const useImageUpload = (onSuccess = null) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateFile = useCallback((file) => {
    const validFormats = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validFormats.includes(file.type)) {
      setError('Invalid format. Please upload JPG, PNG, or WEBP');
      return false;
    }

    if (file.size > maxSize) {
      setError('File too large. Maximum size is 5MB');
      return false;
    }

    setError('');
    return true;
  }, []);

  const processFile = useCallback(
    (file) => {
      if (!validateFile(file)) return;

      setImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    [validateFile]
  );

  const uploadImage = useCallback(
    async (file) => {
      setIsLoading(true);
      try {
        // In a real app, upload to Supabase or cloud storage
        // const { data, error } = await supabase.storage
        //   .from('product-images')
        //   .upload(`products/${Date.now()}_${file.name}`, file);

        // Simulate upload
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (onSuccess) {
          onSuccess(imagePreview);
        }

        return { success: true, preview: imagePreview };
      } catch (err) {
        setError('Upload failed. Please try again.');
        return { success: false, error: err.message };
      } finally {
        setIsLoading(false);
      }
    },
    [imagePreview, onSuccess]
  );

  const clearImage = useCallback(() => {
    setImage(null);
    setImagePreview(null);
    setError('');
  }, []);

  return {
    image,
    imagePreview,
    isLoading,
    error,
    processFile,
    uploadImage,
    clearImage,
  };
};
