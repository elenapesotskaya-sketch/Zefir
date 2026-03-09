'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

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

interface CatalogDisplayProps {
  catalogSections: CatalogSection[];
  expandedCatalog: string | null;
  onToggleSection: (sectionId: string) => void;
}

export function CatalogDisplay({
  catalogSections,
  expandedCatalog,
  onToggleSection,
}: CatalogDisplayProps) {
  const [dynamicItems, setDynamicItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    try {
      const response = await fetch('/api/catalog');
      const data = await response.json();
      if (data.items) {
        setDynamicItems(data.items);
      }
    } catch (error) {
      console.error('Failed to load catalog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {catalogSections.map((section) => {
        // Get items from database for this section
        const dbItems = dynamicItems.filter((item) => item.sectionId === section.id);
        
        // Use database items if available, otherwise use static items
        const displayItems = dbItems.length > 0 ? dbItems : section.items;

        return (
          <div key={section.id} className="space-y-4">
            <button
              onClick={() => onToggleSection(expandedCatalog === section.id ? '' : section.id)}
              className="w-full bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-colors flex items-center justify-between"
            >
              <div className="text-left">
                <h4 className="text-xl font-semibold text-primary mb-1">{section.title}</h4>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-primary transition-transform ${
                  expandedCatalog === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedCatalog === section.id && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {displayItems.map((item, idx) => {
                  const dbItem = dbItems.find((i) => i.name === item.name);
                  const price = dbItem?.price || 50;
                  const inStock = dbItem?.inStock !== false;
                  const imageUrl = dbItem?.imageUrl || item.img;

                  return (
                    <div
                      key={idx}
                      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:border-primary/40 group"
                    >
                      <div className="h-64 relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background">
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-6">
                        <h5 className="font-semibold text-lg">{item.name}</h5>
                        <p className="text-sm text-muted-foreground mt-2">
                          Натуральный зефир ручной работы
                        </p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                          <span className="font-semibold text-lg">{price} EUR</span>
                          {inStock ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                              ✓ В наличии
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                              Закончилось
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
