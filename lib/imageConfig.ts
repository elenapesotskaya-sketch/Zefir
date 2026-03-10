/**
 * Image optimization configuration for Next.js Image component
 * Ensures responsive sizing, lazy loading, and performance optimization
 */

export const IMAGE_SIZES = {
  // Product card display sizes
  productCard: {
    sm: '100vw',
    md: '50vw',
    lg: '33vw',
    full: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  },
  // Edit mode sizes
  editMode: {
    sm: '100vw',
    md: '50vw',
    full: '(max-width: 768px) 100vw, 50vw',
  },
  // Hero section
  hero: {
    full: '100vw',
  },
};

export const IMAGE_CONFIG = {
  // Default quality (0-100)
  // 75 is a good balance between quality and file size
  quality: 75,
  
  // Lazy loading enabled by default
  lazy: true,

  // Format preferences (WebP when supported)
  formats: ['image/webp', 'image/jpeg'],
};

/**
 * Get responsive image sizes for a component type
 */
export function getImageSizes(type: 'productCard' | 'editMode' | 'hero') {
  return IMAGE_SIZES[type];
}

/**
 * Image props for Next.js Image component
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  className?: string;
}
