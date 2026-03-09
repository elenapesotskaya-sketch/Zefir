import { put, get } from '@vercel/blob';

const CATALOG_KEY = 'catalog.json';

// Define all catalog items from the static data
const catalogItems = [
  // Bouquets
  {
    id: 'bouquet-1',
    sectionId: 'bouquets',
    name: 'Нежные тюльпаны',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%91%D1%83%D0%BA%D0%B5%D1%82%20%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B-MxylnF6DSfe3oBS85AEuFuoIbDbcQX.png',
  },
  {
    id: 'bouquet-2',
    sectionId: 'bouquets',
    name: 'Большой букет тюльпанов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%91%D1%83%D0%BA%D0%B5%D1%82%20%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B%20big-zxSPae5F1NFzXJ2uOhTXMH6Lu34fDe.png',
  },
  {
    id: 'bouquet-3',
    sectionId: 'bouquets',
    name: 'Пионы нежные',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bouquet_1-t5Uj1hczAL8Kd3R0hV77R1cPugl0QP.png',
  },
  {
    id: 'bouquet-4',
    sectionId: 'bouquets',
    name: 'Букет тюльпанов мятные',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%91%D1%83%D0%BA%D0%B5%D1%82%20%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B-Z98LNlhM4SLcIMYVzwaUX1fbT1jwpq.jpeg',
  },
  {
    id: 'bouquet-5',
    sectionId: 'bouquets',
    name: 'Нежность розовая',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D1%82%D1%8E%D0%BB%D1%8C%D0%BF%D0%B0%D0%BD%D1%8B%20%D0%BD%D0%B5%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D1%8C-CjDAfjN3KjMAgChuN1ja7SnAnnr0M3.jpeg',
  },
  {
    id: 'bouquet-6',
    sectionId: 'bouquets',
    name: 'Букет розовой мечты',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-L66ka4nnCqFF0qGd3lm6BVx6q8690M.png',
  },

  // Boxes
  {
    id: 'box-1',
    sectionId: 'boxes',
    name: 'Коробка розовых пионов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9A%D0%BE%D1%80%D0%BE%D0%B1%D0%BA%D0%B0%201-n46I8yOHyDtjMCSn2HKGad8BmiO4ia.png',
  },
  {
    id: 'box-2',
    sectionId: 'boxes',
    name: 'Коробка микс цветов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9A%D0%BE%D1%80%D0%BE%D0%B1%D0%BA%D0%B0%202-10vUJcg5J9KDxiD6nNPK8d13aD3Gat.png',
  },
  {
    id: 'box-3',
    sectionId: 'boxes',
    name: 'Коробка нежных пионов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%9A%D0%BE%D1%80%D0%BE%D0%B1%D0%BA%D0%B0%203-11ShGHkf5geX1KVAIBbdfujF3HK3PI.png',
  },
  {
    id: 'box-4',
    sectionId: 'boxes',
    name: 'Премиум коробка',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bouquet_2-wRt1lVgCTbxMghp1AD0R90XQnB6n1N.png',
  },
  {
    id: 'box-5',
    sectionId: 'boxes',
    name: 'Коробка с окошком',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bouquet_10-bZ4oEQAb01JQi4yazSAUsQG66WfXZS.png',
  },

  // Baskets
  {
    id: 'basket-1',
    sectionId: 'baskets',
    name: 'Корзинка с пестрыми пионами',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KCBkbQPT9HvEYGYx9Eofgmus4uAbhS.png',
  },
  {
    id: 'basket-2',
    sectionId: 'baskets',
    name: 'Корзинка с фиолетовыми тюльпанами',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tn0x0ebIaTFxBo171vI3CchR5iR9ID.png',
  },
  {
    id: 'basket-3',
    sectionId: 'baskets',
    name: 'Розовая сумочка с букетом',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gFj2mYK3yAfEyPKzw8EFqclymQksWj.png',
  },

  // Sets
  {
    id: 'set-1',
    sectionId: 'sets',
    name: 'Набор фиолетовых тюльпанов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AkTgCBLkxBqcFhtzZKG0Dazyb9RbMO.png',
  },
  {
    id: 'set-2',
    sectionId: 'sets',
    name: 'Набор пастельных цветов',
    description: 'Натуральный зефир ручной работы',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FyH9UsEDdPPzuMEwAxvfqCYyiKLmmF.png',
  },

  // Compliments
  {
    id: 'compliment-1',
    sectionId: 'compliments',
    name: 'Набор из 5 капкейков',
    description: 'Разные цвета',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gSRW40vEgm3wcXCWRK2mzfiIKtOmgs.png',
  },
  {
    id: 'compliment-2',
    sectionId: 'compliments',
    name: 'Один капкейк',
    description: 'С розовым тюльпаном',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hJYMWBBCJuvSSBX8zDDx34fDmBNnEj.png',
  },
  {
    id: 'compliment-3',
    sectionId: 'compliments',
    name: 'Три капкейка',
    description: 'С фиолетовыми тюльпанами',
    price: 50,
    inStock: true,
    imageUrl:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f1g3Pae7jkJNEcxDdW5G10Nr6dQpTK.png',
  },
];

async function initCatalog() {
  console.log('[v0] Initializing catalog...');

  try {
    // Check if catalog already exists
    try {
      const existing = await get(CATALOG_KEY, {
        token: process.env.BLOB_READ_WRITE_TOKEN || '',
      });

      if (existing) {
        console.log('[v0] Catalog already exists');
        return;
      }
    } catch (e) {
      console.log('[v0] Catalog does not exist, creating...');
    }

    // Create new catalog
    const catalogData = {
      items: catalogItems,
      lastUpdated: new Date().toISOString(),
    };

    await put(CATALOG_KEY, JSON.stringify(catalogData), {
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      access: 'private',
    });

    console.log('[v0] Catalog initialized successfully with', catalogItems.length, 'items');
  } catch (error) {
    console.error('[v0] Error initializing catalog:', error);
    throw error;
  }
}

initCatalog();
