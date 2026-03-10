# Caching Configuration

## Overview
The catalog page is configured for dynamic rendering with caching disabled to ensure edits persist correctly and the page always serves fresh data.

## Configuration

### Page-Level Dynamic Rendering
In `/app/page.tsx`:
```typescript
export const dynamic = 'force-dynamic';
```

This ensures Next.js:
- Never caches the page
- Always runs the page on every request
- Serves the latest version to users

### API Fetch Requests
All fetch calls include `cache: 'no-store'`:

1. **ProductCard.tsx** - Image upload:
   ```typescript
   const response = await fetch('/api/upload', {
     method: 'POST',
     body: formData,
     cache: 'no-store',
   });
   ```

2. **PasswordModal.tsx** - Password verification:
   ```typescript
   const response = await fetch('/api/verify-password', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ password }),
     cache: 'no-store',
   });
   ```

3. **Data Storage** - Uses localStorage instead of fetch:
   - `useCatalog.ts` hook loads from localStorage
   - No API calls for catalog data
   - All changes saved to localStorage immediately

## Benefits

- ✅ Edits persist across page refreshes
- ✅ No stale data served from cache
- ✅ Changes appear immediately in UI
- ✅ localStorage ensures offline capability
- ✅ Fast reload time (no server round trips for catalog)

## Testing

1. Edit a product (name, price, or status)
2. Click "Save"
3. Exit edit mode
4. **Hard refresh the page** (Ctrl+Shift+R or Cmd+Shift+R)
5. Changes persist - verification successful!

## Architecture

The catalog system now works as follows:
1. Page loads with `force-dynamic` → always fresh render
2. `useCatalog()` hook checks localStorage
3. If data exists in localStorage → loads it
4. If not → initializes with defaults and saves to localStorage
5. All edits save to localStorage immediately
6. Page re-renders with updated data

No network requests needed for catalog data - everything is localStorage-based!
