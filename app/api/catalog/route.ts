import { put, get } from '@vercel/blob';

const CATALOG_KEY = 'catalog.json';
const PASSWORD = '1931';

export interface CatalogItem {
  id: string;
  sectionId: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  imageUrl: string;
}

export interface CatalogData {
  items: CatalogItem[];
  lastUpdated: string;
}

// Get catalog
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const blob = await get(CATALOG_KEY, {
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    });

    if (!blob) {
      return Response.json({ error: 'Catalog not found' }, { status: 404 });
    }

    const catalogData = JSON.parse(await blob.text()) as CatalogData;
    return Response.json(catalogData);
  } catch (error) {
    console.error('Error reading catalog:', error);
    return Response.json(
      { error: 'Failed to read catalog', items: [], lastUpdated: new Date().toISOString() },
      { status: 200 }
    );
  }
}

// Update catalog
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, action, item, items } = body;

    // Verify password
    if (password !== PASSWORD) {
      return Response.json({ error: 'Invalid password' }, { status: 401 });
    }

    let catalogData: CatalogData;

    if (action === 'update-item') {
      // Get existing catalog
      try {
        const blob = await get(CATALOG_KEY, {
          token: process.env.BLOB_READ_WRITE_TOKEN || '',
        });
        catalogData = blob ? JSON.parse(await blob.text()) : { items: [], lastUpdated: new Date().toISOString() };
      } catch {
        catalogData = { items: [], lastUpdated: new Date().toISOString() };
      }

      // Update or add item
      const existingIndex = catalogData.items.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        catalogData.items[existingIndex] = item;
      } else {
        catalogData.items.push(item);
      }
    } else if (action === 'bulk-update') {
      catalogData = {
        items,
        lastUpdated: new Date().toISOString(),
      };
    } else {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Save to blob
    catalogData.lastUpdated = new Date().toISOString();
    await put(CATALOG_KEY, JSON.stringify(catalogData), {
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      access: 'private',
    });

    return Response.json({ success: true, data: catalogData });
  } catch (error) {
    console.error('Error updating catalog:', error);
    return Response.json({ error: 'Failed to update catalog' }, { status: 500 });
  }
}
