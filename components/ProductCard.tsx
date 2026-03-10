'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Loader2 } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  imageUrl: string;
  isEditing: boolean;
  onSave: (data: {
    name: string;
    description: string;
    price: number;
    inStock: boolean;
    imageUrl: string;
  }) => Promise<void>;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  inStock,
  imageUrl,
  isEditing,
  onSave,
}: ProductCardProps) {
  const [editData, setEditData] = useState({
    name,
    description,
    price,
    inStock,
    imageUrl,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync props to local state when props change (after save)
  useEffect(() => {
    setEditData({
      name,
      description,
      price,
      inStock,
      imageUrl,
    });
    setHasChanges(false);
  }, [name, description, price, inStock, imageUrl]);

  const handleFieldChange = (field: string, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        cache: 'no-store',
      });

      const data = await response.json();
      if (data.url) {
        handleFieldChange('imageUrl', data.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editData);
      setHasChanges(false);
      // Force re-sync with props after save
      setTimeout(() => {
        setEditData(editData);
      }, 500);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isEditing) {
    // View mode
    return (
      <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all hover:border-primary/40 group">
        <div className="h-64 relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-6">
          <h5 className="font-semibold text-lg">{name}</h5>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
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
  }

  // Edit mode
  return (
    <div className="bg-card rounded-2xl border border-primary/40 overflow-hidden shadow-md">
      <div className="relative">
        <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <Image
            src={editData.imageUrl}
            alt={editData.name}
            fill
            className="object-cover"
          />
        </div>
        <label className="absolute bottom-2 right-2 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="hidden"
          />
          <div className="p-2 bg-primary text-primary-foreground rounded-lg hover:shadow-md transition-all flex items-center justify-center">
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
          </div>
        </label>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Название</label>
          <input
            type="text"
            value={editData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground">Описание</label>
          <textarea
            value={editData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            rows={2}
            className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground">Цена (EUR)</label>
            <input
              type="number"
              value={editData.price}
              onChange={(e) => handleFieldChange('price', parseFloat(e.target.value) || 0)}
              className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground">Статус</label>
            <select
              value={editData.inStock ? 'available' : 'sold-out'}
              onChange={(e) => handleFieldChange('inStock', e.target.value === 'available')}
              className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="available">В наличии</option>
              <option value="sold-out">Закончилось</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          className="w-full px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            'Сохранить'
          )}
        </button>
      </div>
    </div>
  );
}
