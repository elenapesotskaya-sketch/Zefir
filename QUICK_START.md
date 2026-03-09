# Catalog Editor - Quick Start Guide

## What Was Added

A complete catalog editing system with:
- ✅ Password-protected editor (Password: **1931**)
- ✅ Price display (50 EUR for all items)
- ✅ Availability status ("✓ В наличии" / "Закончилось")
- ✅ Edit product name, description, price, and status
- ✅ Upload new product images
- ✅ Create new products
- ✅ Manage 4 catalog sections (Букеты, Коробки, Корзинки, Наборы)

## Getting Started

### 1. Start the Development Server
```bash
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:3000`

### 2. Initialize the Catalog (First Time Only)
The catalog is stored in Vercel Blob. To populate it with initial products, run:
```bash
node scripts/init-catalog.js
```

This creates a `catalog.json` file in your Blob storage with all products.

### 3. Access the Editor
1. **Scroll to the bottom** of the website
2. **Click "Редактировать каталог"** (Edit Catalog) button
3. **Enter password**: `1931`
4. Start editing!

## Key Features

### Edit Existing Products
- Click any product in the section to edit
- Modify name, description, price, and status
- Upload a new image
- Click "Сохранить" (Save)

### Create New Products
- Click **"+ Новый товар"** button
- Fill in all fields
- Upload an image
- Click "Сохранить" (Save)

### Organization
Products are organized in 4 sections with dedicated tabs:
- **Букеты** - Bouquets
- **Коробки** - Boxes  
- **Корзинки** - Baskets
- **Наборы** - Flower Sets

## Default Prices
All products default to **50 EUR** unless edited.

## Availability Status
- ✅ Green badge = "В наличии" (In Stock)
- ✗ Gray badge = "Закончилось" (Out of Stock)

## Files Created/Modified

### New Components
- `components/PasswordModal.tsx` - Password authentication
- `components/CatalogEditor.tsx` - Main editor interface
- `components/CatalogDisplay.tsx` - Dynamic product display

### New API Routes
- `/api/verify-password` - Password verification
- `/api/catalog` - Read/update catalog
- `/api/upload` - Image uploads

### Scripts
- `scripts/init-catalog.js` - Initialize catalog data

### Documentation
- `CATALOG_EDITOR_SETUP.md` - Detailed setup guide
- `QUICK_START.md` - This file

## Troubleshooting

### "Catalog not found" error
Run the initialization script:
```bash
node scripts/init-catalog.js
```

### Password doesn't work
Make sure you entered exactly: `1931`

### Images won't upload
- Check that the image file isn't too large
- Ensure your Vercel Blob token is properly set
- Check browser console for error messages

### Changes not appearing
- Refresh the page
- Check that the save completed (look for success feedback)
- Verify the password was correct during editing

## Next Steps

1. ✅ Initialize the catalog (`node scripts/init-catalog.js`)
2. ✅ Start the development server (`npm run dev`)
3. ✅ Test the editor by scrolling to the bottom
4. ✅ Try editing a product to see changes
5. ✅ Deploy to Vercel when ready

## Support

For issues or questions about the catalog editor system, refer to `CATALOG_EDITOR_SETUP.md` for detailed technical documentation.
