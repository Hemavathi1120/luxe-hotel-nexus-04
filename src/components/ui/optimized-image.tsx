
import React, { useState } from 'react';
import { buildCloudinaryUrl } from '@/lib/cloudinary';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  quality?: 'auto' | number;
  crop?: 'fill' | 'fit' | 'scale' | 'crop';
  [key: string]: any;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  loading = 'lazy',
  quality = 'auto',
  crop = 'fill',
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getOptimizedUrl = (imageUrl: string) => {
    // Add null/undefined check first
    if (!imageUrl || typeof imageUrl !== 'string') {
      return imageUrl || '';
    }

    // Check if it's a Cloudinary URL
    if (imageUrl.includes('cloudinary.com') && imageUrl.includes('/upload/')) {
      const parts = imageUrl.split('/upload/');
      if (parts.length > 1) {
        const publicIdPart = parts[1];
        const publicId = publicIdPart.includes('/') 
          ? publicIdPart.substring(publicIdPart.indexOf('/') + 1) 
          : publicIdPart;
        
        return buildCloudinaryUrl(publicId, {
          width,
          height,
          crop,
          quality,
          format: 'auto'
        });
      }
    }
    
    return imageUrl;
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Early return if src is invalid
  if (!src || typeof src !== 'string') {
    return (
      <div 
        className={`bg-muted flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-muted-foreground text-sm">No image provided</span>
      </div>
    );
  }

  if (imageError) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-muted-foreground text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div 
          className={`absolute inset-0 bg-muted animate-pulse ${className}`}
          style={{ width, height }}
        />
      )}
      <img
        src={getOptimizedUrl(src)}
        alt={alt}
        className={className}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
