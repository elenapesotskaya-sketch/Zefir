# Catalog Persistence System

## Overview

The catalog now uses **localStorage** to persist edits. When you edit a product (name, description, price, or status), the changes are saved locally and persist across page refreshes.

## How It Works

### 1. Initial Load (App Mount)
- App loads `page.tsx` which uses the `useCatalog()` hook
- Hook checks localStorage for key `"catalog-data"`
- If exists: loads persisted catalog
- If not exists: loads default items from `DEFAULT_CATALOG_ITEMS` and saves to localStorage

### 2. Building Sections
- `buildCatalogSections()` transforms flat catalog items array into grouped sections
- Used by CatalogDisplay to render products organized by type
- Always reads from the current catalog state in localStorage

### 3. Editing Products
When you click "Редактировать" → Enter password `1931`:
- ProductCard enters edit mode for each product
- Edit → Change name/price/status → Click "Сохранить"
- ProductCard calls `handleSaveItem(itemId, updatedData)`
- CatalogDisplay calls `updateItem()` from useCatalog hook
- Hook updates state AND saves to localStorage immediately

### 4. Persistence on Refresh
- Page refreshes → useCatalog hook loads from localStorage
- Shows the last saved state
- No need to load from init-catalog.js anymore

## Files Involved

### New Files
- **`hooks/useCatalog.ts`** - React hook managing catalog state and localStorage
- **`lib/catalogUtils.ts`** - Utility to transform items array into sections structure

### Modified Files
- **`app/page.tsx`** - Uses useCatalog hook, builds sections dynamically
- **`components/CatalogDisplay.tsx`** - Uses useCatalog instead of API calls

## Data Structure

### localStorage Key
```
"catalog-data" → CatalogData object
```

### CatalogData Format
```json
{
  "items": [
    {
      "id": "bouquet-1",
      "sectionId": "bouquets",
      "name": "Product name",
      "description": "Product description",
      "price": 50,
      "inStock": true,
      "imageUrl": "https://..."
    }
  ],
  "lastUpdated": "2024-01-20T10:30:00.000Z"
}
```

## Testing Persistence

1. Open the site
2. Click "Редактировать каталог"
3. Enter password: `1931`
4. Edit a product:
   - Change name to "Test Product"
   - Change price to 75
   - Click "Сохранить"
5. Click "Выход из редактирования"
6. **Refresh the page** (Ctrl+R or F5)
7. Verify the changes persist - you should see "Test Product" with price 75

## Resetting Catalog

If you want to reset to defaults:
```javascript
// In browser console
localStorage.removeItem('catalog-data')
// Then refresh the page
```

Or use the `resetCatalog()` function from the useCatalog hook (if exposed).

## API Integration

The old API routes (`/api/catalog`, `/api/upload`) are still there but **no longer used for catalog data persistence**. They can be removed or kept for future use.

The localStorage approach is:
- Faster (no network calls)
- Works offline
- Simpler persistence model
- Better for browser-based editing
