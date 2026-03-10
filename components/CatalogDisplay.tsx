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
  const { items: dynamicItems, updateItem } = useCatalog();

  // Always use dynamicItems from localStorage as the source of truth
  const itemsBySection = dynamicItems.reduce(
    (acc, item) => {
      if (!acc[item.sectionId]) {
        acc[item.sectionId] = [];
      }
      acc[item.sectionId].push(item);
      return acc;
    },
    {} as Record<string, typeof dynamicItems>
  );

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
        // Get items from cached state (single source of truth)
        const sectionItems = itemsBySection[section.id] || [];

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
                {sectionItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    inStock={item.inStock}
                    imageUrl={item.imageUrl}
                    isEditing={isEditing}
                    onSave={(data) => handleSaveItem(item.id, data)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
