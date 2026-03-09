# Catalog Editor Setup

## Overview

The catalog editing system allows managers to edit product information without modifying code. All data is stored in Vercel Blob storage.

## Features

✅ **Edit Product Information**
- Название товара (Product name)
- Описание (Description)
- Стоимость (Price) - now editable
- Статус (Status) - "В наличии" (In Stock) or "Закончилось" (Out of Stock)
- Изображение (Image) - upload new product images

✅ **Manage Four Catalog Sections**
- Цветы в букете (Bouquets)
- Цветы в коробке (Boxes)
- Цветы в корзинке-сумочке (Baskets)
- Наборы цветов (Flower Sets)

✅ **Security**
- Password-protected editor (Password: 1931)
- Only authenticated users can edit the catalog

✅ **Visual Updates**
- Green "✓ В наличии" badge for available products
- Gray "Закончилось" badge for out-of-stock products
- Prices displayed on all product cards

## Setup Instructions

### 1. Environment Variables
The project uses Vercel Blob for storage. The required environment variable should already be set:
- `BLOB_READ_WRITE_TOKEN` - automatically configured by Vercel

### 2. Initialize Catalog (First Time Only)
Run the initialization script to populate the catalog with existing products:
```bash
node scripts/init-catalog.js
```

This creates a `catalog.json` file in Vercel Blob storage with all current products.

## How to Use

### For Users
1. Scroll to the bottom of the website
2. Click the "Редактировать каталог" (Edit Catalog) button
3. Enter password: `1931`
4. Select a section (Букеты, Коробки, Корзинки, Наборы)
5. Click on a product to edit or click "+ Новый товар" to add new products

### Editor Features

**Edit Existing Product:**
1. Click on any product in the list
2. Modify the fields:
   - Название (Name)
   - Описание (Description)
   - Стоимость EUR (Price)
   - Статус (Status dropdown)
3. Upload a new image if needed
4. Click "Сохранить" (Save)

**Add New Product:**
1. Click "+ Новый товар" button
2. Fill in all required fields
3. Upload an image
4. Click "Сохранить" (Save)

## Database Schema

Each product has the following fields:
```typescript
interface CatalogItem {
  id: string;              // Unique identifier
  sectionId: string;       // bouquets | boxes | baskets | sets
  name: string;            // Product name
  description: string;     // Product description
  price: number;           // Price in EUR
  inStock: boolean;        // Availability status
  imageUrl: string;        // URL to product image
}
```

## API Routes

- `POST /api/verify-password` - Verify password
- `GET /api/catalog` - Get all products
- `POST /api/catalog` - Update/save products
- `POST /api/upload` - Upload product images

## Component Structure

- **PasswordModal** (`components/PasswordModal.tsx`) - Password verification dialog
- **CatalogEditor** (`components/CatalogEditor.tsx`) - Main editing interface with tabs
- **CatalogDisplay** (`components/CatalogDisplay.tsx`) - Displays products with dynamic updates

## Notes

- All product data is stored in Vercel Blob storage
- Images are uploaded to Vercel Blob and referenced by URL
- The password is hardcoded as "1931" (for production, consider using environment variables)
- Products display with 50 EUR price by default in the product cards
- Green status badge shows "В наличии" (In Stock) for available products
