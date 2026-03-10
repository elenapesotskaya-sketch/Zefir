'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { useCatalog } from '@/hooks/useCatalog';

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
  isEditing?: boolean;
}

export function CatalogDisplay({
  catalogSections,
  expandedCatalog,
  onToggleSection,
  isEditing = false,
}: CatalogDisplayProps) {
  const { items: dynamicItems, isLoading, updateItem } = useCatalog();

  const handleSaveItem = (itemId: string, itemData: any) => {
    try {
      // Update in localStorage immediately
      updateItem(itemId, itemData);
    } catch (error) {
      console.error('Failed to save item:', error);
      throw error;
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
                  const itemId = dbItem?.id || item.name;
                  const price = dbItem?.price || 50;
                  const inStock = dbItem?.inStock !== false;
                  const imageUrl = dbItem?.imageUrl || item.img;
                  const description = dbItem?.description || 'Натуральный зефир ручной работы';

                  return (
                    <ProductCard
                      key={idx}
                      id={itemId}
                      name={item.name}
                      description={description}
                      price={price}
                      inStock={inStock}
                      imageUrl={imageUrl}
                      isEditing={isEditing}
                      onSave={(data) => handleSaveItem(itemId, data)}
                    />
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
