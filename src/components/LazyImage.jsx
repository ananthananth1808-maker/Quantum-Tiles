import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ImageSkeleton({ className = 'h-80 w-full rounded-2xl' }) {
  return (
    <motion.div
      className={`${className} bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100`}
      animate={{
        backgroundPosition: ['0% 0%', '200% 0%', '0% 0%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 100%',
      }}
    />
  );
}

export function LazyImage({ src, alt, className = 'w-full h-full object-cover', onLoad, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      setIsLoaded(true);
    };
  }, [src, onLoad]);

  return (
    <div className="relative overflow-hidden bg-gray-100">
      {!isLoaded && <ImageSkeleton className={className} />}
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
}
