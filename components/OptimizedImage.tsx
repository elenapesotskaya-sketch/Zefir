'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getValidImageUrl } from '@/lib/imageUtils';

interface OptimizedImageProps {
  src: string | null | undefined;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  quality?: number;
  className?: string;
  fill?: boolean;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
}

/**
 * Optimized Image component with fallback handling
 * Automatically validates URLs and provides placeholder on error
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes,
  quality = 75,
  className = '',
  fill = false,
  loading = 'lazy',
  onError,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(getValidImageUrl(src));
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc('/images/placeholder.jpg');
      onError?.();
    }
  };

  const commonProps = {
    alt,
    quality,
    loading,
    className,
    onError: handleError,
  };

  if (fill) {
    return (
      <Image
        src={imageSrc}
        fill
        sizes={sizes}
        {...commonProps}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      width={width}
      height={height}
      {...commonProps}
    />
  );
}
