import { useState, useEffect } from 'react';

export interface CatalogItem {
  id: string;
  sectionId: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  imageUrl: string;
}

interface CatalogData {
  items: CatalogItem[];
  lastUpdated: string;
}

const STORAGE_KEY = 'catalog-data';

// Default catalog items from init-catalog.js
const DEFAULT_CATALOG_ITEMS: CatalogItem[] = [
  // Bouquets
  {
    id: 'bouquet-1',
    sectionId: 'bouquets',
    name: 'Нежные тюльпаны',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%91%D1%83%D0%BA%D0%B5%D1%82%20%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B-MxylnF6DSfe3oBS85AEuFuoIbDbcQX.png',
  },
  {
    id: 'bouquet-2',
    sectionId: 'bouquets',
    name: 'Большой букет тюльпанов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%91%D1%83%D0%BA%D0%B5%D1%82%20%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B%20big-zxSPae5F1NFzXJ2uOhTXMH6Lu34fDe.png',
  },
  {
    id: 'bouquet-3',
    sectionId: 'bouquets',
    name: 'Пионы нежные',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bouquet_1-t5Uj1hczAL8Kd3R0hV77R1cPugl0QP.png',
  },
  {
    id: 'bouquet-4',
    sectionId: 'bouquets',
    name: 'Букет тюльпанов мятные',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%91%D1%83%D0%BA%D0%B5%D1%82%20%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B-Z98LNlhM4SLcIMYVzwaUX1fbT1jwpq.jpeg',
  },
  {
    id: 'bouquet-5',
    sectionId: 'bouquets',
    name: 'Нежность розовая',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B%20%D0%BD%D0%B5%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D1%8C-CjDAfjN3KjMAgChuN1ja7SnAnnr0M3.jpeg',
  },
  {
    id: 'bouquet-6',
    sectionId: 'bouquets',
    name: 'Букет розовой мечты',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L66ka4nnCqFF0qGd3lm6BVx6q8690M.png',
  },
  // Boxes
  {
    id: 'box-1',
    sectionId: 'boxes',
    name: 'Коробка розовых пионов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9A%D0%BE%D1%80%D0%BE%D0%B1%D0%BA%D0%B0%201-n46I8yOHyDtjMCSn2HKGad8BmiO4ia.png',
  },
  {
    id: 'box-2',
    sectionId: 'boxes',
    name: 'Коробка нежных цветов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9A%D0%BE%D1%80%D0%BE%D0%B1%D0%BA%D0%B0%202-YlLPbVJCPFZA2mMzGVv1xeWUVFqgKF.png',
  },
  {
    id: 'box-3',
    sectionId: 'boxes',
    name: 'Коробка квадратная с цветами',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BA%D0%BE%D1%80%D0%BE%D0%B1%D0%BA%D0%B0%203-e1nWRULKVxOhWX0yPZ8R2QQvTZHvHl.png',
  },
  // Baskets
  {
    id: 'basket-1',
    sectionId: 'baskets',
    name: 'Корзина с розовыми цветами',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%BA%D0%B0%201-LEbNXhHKKvVUlPc6aNzGnfnvF2ViXd.png',
  },
  {
    id: 'basket-2',
    sectionId: 'baskets',
    name: 'Корзина летних цветов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%BA%D0%B0%202-2P4p3m0PvCuKHjCYnhHSXZM2Q3nxAE.png',
  },
  {
    id: 'basket-3',
    sectionId: 'baskets',
    name: 'Корзина нежной весны',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D0%BA%D0%B0%203-hPvnGYl8oClnE2eBmTGHpAv2Z1hVWW.png',
  },
  // Sets
  {
    id: 'set-1',
    sectionId: 'sets',
    name: 'Набор нежных цветов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gfq1xmMKOLkGVFzHrvpKfLjlZLMqBk.png',
  },
  {
    id: 'set-2',
    sectionId: 'sets',
    name: 'Набор пастельных цветов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FyH9UsEDdPPzuMEwAxvfqCYyiKLmmF.png',
  },
  // Compliments
  {
    id: 'compliment-1',
    sectionId: 'compliments',
    name: 'Набор из 5 капкейков',
    description: 'Разные цвета',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gSRW40vEgm3wcXCWRK2mzfiIKtOmgs.png',
  },
  {
    id: 'compliment-2',
    sectionId: 'compliments',
    name: 'Один капкейк',
    description: 'С розовым тюльпаном',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hJYMWBBCJuvSSBX8zDDx34fDmBNnEj.png',
  },
  {
    id: 'compliment-3',
    sectionId: 'compliments',
    name: 'Три капкейка',
    description: 'С фиолетовыми тюльпанами',
    price: 50,
    inStock: true,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f1g3Pae7jkJNEcxDdW5G10Nr6dQpTK.png',
  },
];

export function useCatalog() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load catalog on mount
  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = () => {
    try {
      // Check if we're in browser
      if (typeof window === 'undefined') return;

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: CatalogData = JSON.parse(stored);
        setItems(data.items);
      } else {
        // First time - use default and save to localStorage
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            items: DEFAULT_CATALOG_ITEMS,
            lastUpdated: new Date().toISOString(),
          })
        );
        setItems(DEFAULT_CATALOG_ITEMS);
      }
    } catch (error) {
      console.error('[v0] Error loading catalog:', error);
      setItems(DEFAULT_CATALOG_ITEMS);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = (itemId: string, updates: Partial<CatalogItem>) => {
    try {
      setItems(prevItems => {
        const updated = prevItems.map(item =>
          item.id === itemId ? { ...item, ...updates } : item
        );
        // Persist to localStorage
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            items: updated,
            lastUpdated: new Date().toISOString(),
          })
        );
        return updated;
      });
    } catch (error) {
      console.error('[v0] Error updating catalog:', error);
    }
  };

  const resetCatalog = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items: DEFAULT_CATALOG_ITEMS,
          lastUpdated: new Date().toISOString(),
        })
      );
      setItems(DEFAULT_CATALOG_ITEMS);
    } catch (error) {
      console.error('[v0] Error resetting catalog:', error);
    }
  };

  return {
    items,
    isLoading,
    updateItem,
    resetCatalog,
  };
}
