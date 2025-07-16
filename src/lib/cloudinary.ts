
// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  cloudName: 'dobktsnix',
  uploadPreset: 'hotel website',
  // Note: API key/secret not needed for frontend uploads using upload preset
};

// Cloudinary URL builder with enhanced options
export const buildCloudinaryUrl = (
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb' | 'limit' | 'mfit' | 'pad';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif';
    gravity?: 'face' | 'center' | 'north' | 'south' | 'east' | 'west' | 'auto';
    fetchFormat?: 'auto';
    dpr?: 'auto' | number;
  }
) => {
  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}`;
  
  if (!transformations) {
    return `${baseUrl}/image/upload/${publicId}`;
  }

  const transformParams = [];
  
  if (transformations.width) transformParams.push(`w_${transformations.width}`);
  if (transformations.height) transformParams.push(`h_${transformations.height}`);
  if (transformations.crop) transformParams.push(`c_${transformations.crop}`);
  if (transformations.quality) transformParams.push(`q_${transformations.quality}`);
  if (transformations.format) transformParams.push(`f_${transformations.format}`);
  if (transformations.gravity) transformParams.push(`g_${transformations.gravity}`);
  if (transformations.fetchFormat) transformParams.push(`f_${transformations.fetchFormat}`);
  if (transformations.dpr) transformParams.push(`dpr_${transformations.dpr}`);

  const transformString = transformParams.join(',');
  return `${baseUrl}/image/upload/${transformString}/${publicId}`;
};

// Upload image to Cloudinary with progress tracking
export const uploadToCloudinary = async (
  file: File, 
  options?: {
    onProgress?: (progress: number) => void;
    folder?: string;
    tags?: string[];
  }
): Promise<{ url: string; publicId: string; width: number; height: number }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);
  
  if (options?.folder) {
    formData.append('folder', options.folder);
  }
  
  if (options?.tags) {
    formData.append('tags', options.tags.join(','));
  }

  try {
    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && options?.onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100);
          options.onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve({
            url: data.secure_url,
            publicId: data.public_id,
            width: data.width,
            height: data.height
          });
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`);
      xhr.send(formData);
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

// Generate responsive image URLs for different screen sizes
export const generateResponsiveImageUrls = (publicId: string) => {
  return {
    mobile: buildCloudinaryUrl(publicId, {
      width: 400,
      height: 300,
      crop: 'fill',
      quality: 'auto',
      format: 'auto',
      dpr: 'auto'
    }),
    tablet: buildCloudinaryUrl(publicId, {
      width: 800,
      height: 600,
      crop: 'fill',
      quality: 'auto',
      format: 'auto',
      dpr: 'auto'
    }),
    desktop: buildCloudinaryUrl(publicId, {
      width: 1200,
      height: 900,
      crop: 'fill',
      quality: 'auto',
      format: 'auto',
      dpr: 'auto'
    })
  };
};

// Extract public ID from Cloudinary URL
export const extractPublicIdFromUrl = (url: string): string | null => {
  if (!url.includes('cloudinary.com') || !url.includes('/upload/')) {
    return null;
  }
  
  const parts = url.split('/upload/');
  if (parts.length < 2) return null;
  
  const pathPart = parts[1];
  const publicIdPart = pathPart.includes('/') 
    ? pathPart.substring(pathPart.indexOf('/') + 1) 
    : pathPart;
    
  // Remove file extension if present
  return publicIdPart.replace(/\.[^/.]+$/, '');
};

// Sample luxury hotel images for demo purposes
export const SAMPLE_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
  rooms: {
    deluxe: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    suite: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    presidential: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  amenities: {
    spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    pool: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
};
