# Image Handling and Optimization Guide

## Overview

The catalog system implements a robust image handling system with automatic fallback, validation, and optimization.

## Key Components

### 1. OptimizedImage Component (`/components/OptimizedImage.tsx`)

A wrapper around Next.js Image component that adds:
- **Automatic URL validation** - Validates all image URLs before rendering
- **Fallback handling** - Automatically uses placeholder if image fails to load
- **Error handling** - Logs errors and gracefully degrades
- **Responsive sizing** - Supports fill layout with responsive sizes
- **Quality optimization** - Configurable quality levels (default 75)

```tsx
<OptimizedImage
  src={imageUrl}
  alt="Product name"
  width={500}
  height={500}
  sizes="(max-width: 768px) 100vw, 33vw"
  loading="lazy"
/>
```

### 2. Image Utils (`/lib/imageUtils.ts`)

Utility functions and constants:

- **getValidImageUrl()** - Validates URLs and returns fallback if invalid
- **IMAGE_SIZES** - Predefined dimensions for different image types
- **RESPONSIVE_SIZES** - Responsive size breakpoints
- **IMAGE_QUALITY** - Quality presets (high: 90, medium: 75, low: 60)

### 3. Placeholder Image (`/public/images/placeholder.jpg`)

Default fallback image displayed when:
- Product image URL is invalid or missing
- Image fails to load due to network error
- Image URL points to non-existent resource

## Image Sources

### External Blob Storage (Primary)

Most product images are stored in Vercel Blob Storage:
```
https://hebbkx1anhila5yf.public.blob.vercel-storage.com/...
```

These URLs are validated and work reliably.

### Local Images (/public/images/)

Support for local images in the public directory:
```
/images/product-name.jpg
/images/placeholder.jpg
```

## Image Format Comparison

| Source | URL Format | Validation | Cache | Speed |
|--------|-----------|------------|-------|-------|
| Blob Storage | https://hebbkx1anhila5yf.public.blob.vercel-storage.com/... | Valid | CDN | Fast |
| Local Images | /images/name.jpg | Filesystem | Browser | Very Fast |
| External URLs | https://example.com/... | Must validate | Site rules | Variable |

## Catalog Data Structure

Each product has an `imageUrl` field that supports any valid image source:

```ts
interface CatalogItem {
  id: string;
  sectionId: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  imageUrl: string; // Can be Blob URL, local path, or external URL
}
```

## Performance Optimizations

### Lazy Loading
Images load only when entering viewport using `loading="lazy"`

### Responsive Images
- Mobile (< 768px): `100vw` - full viewport width
- Tablet (768-1024px): `50vw` - half viewport width
- Desktop (> 1024px): `33vw` - one-third viewport width

### Quality Settings
- Default: `quality={75}` - balances file size and quality
- Can be adjusted per component: `quality={90}` for high-quality or `quality={60}` for fast loading

### Image Sizing

View Mode (Grid Display):
- Width: 500px, Height: 500px
- Container: h-64 (16rem)
- Aspect: Square

Edit Mode:
- Width: 500px, Height: 300px
- Container: h-48 (12rem)
- Aspect: 5:3

## Adding New Product Images

### Option 1: Use Blob Storage (Recommended)

Upload image to Vercel Blob Storage and use the returned URL:
```ts
{
  imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/product-name-xyz.jpg'
}
```

### Option 2: Add Local Image

Place image in `/public/images/` and reference:
```ts
{
  imageUrl: '/images/product-name.jpg'
}
```

### Option 3: Use External URL

Link to any valid HTTPS image:
```ts
{
  imageUrl: 'https://example.com/product.jpg'
}
```

## Troubleshooting

### Images Not Showing

1. Check browser console for errors
2. Verify URL is accessible (test in new tab)
3. Ensure proper CORS headers for external URLs
4. Check that image file exists for local images

### Broken Images

1. OptimizedImage will automatically fall back to placeholder
2. Check image URL validity in admin panel
3. Re-upload image to Blob Storage if corrupted

### Slow Loading

1. Reduce `quality` parameter (default 75 is usually optimal)
2. Ensure `loading="lazy"` is set for non-critical images
3. Check network conditions in DevTools

## Future Improvements

- [ ] Image caching strategy optimization
- [ ] WebP format support with fallback
- [ ] Image compression on upload
- [ ] Progressive image loading with blur-up effect
- [ ] Image resizing service integration
