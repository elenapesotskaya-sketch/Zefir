interface CatalogItem {
  id: string;
  sectionId: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  imageUrl: string;
}

interface CatalogSection {
  id: string;
  title: string;
  description: string;
  items: Array<{
    img: string;
    name: string;
  }>;
}

const SECTION_CONFIG = {
  bouquets: {
    title: 'Цветы в букете',
    description: 'Букеты в нежной упаковке с лентой',
  },
  boxes: {
    title: 'Цветы в коробке',
    description: 'Круглые и квадратные коробочки для особых подарков',
  },
  baskets: {
    title: 'Цветы в корзинке-сумочке',
    description: 'Корзинки-сумочки с цветами для особых подарков',
  },
  sets: {
    title: 'Наборы цветов',
    description: 'Наборы для украшения десертов и букетов',
  },
};

export function buildCatalogSections(items: CatalogItem[]): CatalogSection[] {
  const sections: CatalogSection[] = [];
  const sectionMap = new Map<string, CatalogItem[]>();

  // Group items by section
  for (const item of items) {
    if (!sectionMap.has(item.sectionId)) {
      sectionMap.set(item.sectionId, []);
    }
    sectionMap.get(item.sectionId)!.push(item);
  }

  // Build sections in order
  const sectionOrder = ['bouquets', 'boxes', 'baskets', 'sets'];
  for (const sectionId of sectionOrder) {
    if (sectionMap.has(sectionId)) {
      const config = SECTION_CONFIG[sectionId as keyof typeof SECTION_CONFIG];
      const sectionItems = sectionMap.get(sectionId) || [];

      sections.push({
        id: sectionId,
        title: config.title,
        description: config.description,
        items: sectionItems.map(item => ({
          img: item.imageUrl,
          name: item.name,
        })),
      });
    }
  }

  return sections;
}
