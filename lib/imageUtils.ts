const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';
const BLOB_STORAGE_DOMAIN = 'hebbkx1anhila5yf.public.blob.vercel-storage.com';

/**
 * Validates if an image URL is accessible
 * Handles external Blob storage URLs and local paths
 */
export function getValidImageUrl(imageUrl: string | null | undefined): string {
  // If no URL provided, use placeholder
  if (!imageUrl) {
    return PLACEHOLDER_IMAGE;
  }

  // Local images (starting with /)
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }

  // External Blob storage URLs - they are valid
  if (imageUrl.includes(BLOB_STORAGE_DOMAIN) || imageUrl.includes('blob.vercel-storage')) {
    return imageUrl;
  }

  // HTTPS URLs - assume valid
  if (imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Default to placeholder for invalid URLs
  return PLACEHOLDER_IMAGE;
}

/**
 * Image configuration for Next.js Image component
 */
export const IMAGE_SIZES = {
  product: {
    width: 500,
    height: 500,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  hero: {
    width: 1200,
    height: 600,
  },
};

/**
 * Responsive sizes configuration for Next.js Image component
 */
export const RESPONSIVE_SIZES = {
  product: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  thumbnail: '(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw',
};

/**
 * Image quality settings for different use cases
 */
export const IMAGE_QUALITY = {
  high: 90,
  medium: 75,
  low: 60,
};
