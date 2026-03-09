'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Upload, Check } from 'lucide-react';
import Image from 'next/image';

interface CatalogItem {
  id: string;
  sectionId: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  imageUrl: string;
}

interface CatalogEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  { id: 'bouquets', title: 'Цветы в букете' },
  { id: 'boxes', title: 'Цветы в коробке' },
  { id: 'baskets', title: 'Цветы в корзинке-сумочке' },
  { id: 'sets', title: 'Наборы цветов' },
];

export function CatalogEditor({ isOpen, onClose }: CatalogEditorProps) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [activeSection, setActiveSection] = useState('bouquets');
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCatalog();
    }
  }, [isOpen]);

  const loadCatalog = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/catalog');
      const data = await response.json();
      setItems(data.items || []);
    } catch (err) {
      setError('Failed to load catalog');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-filename': `product-${Date.now()}.jpg`,
        },
        body: arrayBuffer,
      });

      const data = await response.json();
      if (data.success) {
        setUploadedImageUrl(data.url);
        if (editingItem) {
          setEditingItem({ ...editingItem, imageUrl: data.url });
        }
      }
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveItem = async () => {
    if (!editingItem || !editingItem.name.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Generate ID if it's a new item
      const itemToSave = {
        ...editingItem,
        id: editingItem.id || `item-${Date.now()}`,
        imageUrl: uploadedImageUrl || editingItem.imageUrl,
      };

      const response = await fetch('/api/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: '1931',
          action: 'update-item',
          item: itemToSave,
        }),
      });

      if (response.ok) {
        await loadCatalog();
        setEditingItem(null);
        setUploadedImageUrl('');
        setError('');
      } else {
        setError('Failed to save item');
      }
    } catch (err) {
      setError('Error saving item');
    }
  };

  const sectionItems = items.filter((item) => item.sectionId === activeSection);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактор каталога</DialogTitle>
          <DialogDescription>Редактируйте товары в каталоге</DialogDescription>
        </DialogHeader>

        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid flex-1 grid-cols-4">
              {SECTIONS.map((section) => (
                <TabsTrigger key={section.id} value={section.id} className="text-xs sm:text-sm">
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              size="sm"
              onClick={() => {
                setEditingItem({
                  id: '',
                  sectionId: activeSection,
                  name: '',
                  description: '',
                  price: 50,
                  inStock: true,
                  imageUrl: '',
                });
                setUploadedImageUrl('');
              }}
              className="ml-2"
            >
              + Новый товар
            </Button>
          </div>

          {SECTIONS.map((section) => (
            <TabsContent key={section.id} value={section.id} className="space-y-4 mt-0">
              {sectionItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No items in this section</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {sectionItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-border rounded-lg hover:bg-accent/5 cursor-pointer transition-colors"
                      onClick={() => {
                        setEditingItem(item);
                        setUploadedImageUrl(item.imageUrl);
                      }}
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-secondary/20">
                          {item.imageUrl && (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-medium">{item.price} EUR</span>
                            {item.inStock ? (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                                В наличии
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium">
                                Закончилось
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {editingItem && (
          <div className="border-t pt-4 space-y-4">
            <h3 className="font-semibold">Редактирование товара</h3>

            <div>
              <Label>Название</Label>
              <Input
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                placeholder="Product name"
              />
            </div>

            <div>
              <Label>Описание</Label>
              <Textarea
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Product description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Стоимость (EUR)</Label>
                <Input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                  placeholder="50"
                />
              </div>

              <div>
                <Label>Статус</Label>
                <select
                  value={editingItem.inStock ? 'in-stock' : 'out-of-stock'}
                  onChange={(e) => setEditingItem({ ...editingItem, inStock: e.target.value === 'in-stock' })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  <option value="in-stock">В наличии</option>
                  <option value="out-of-stock">Закончилось</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Изображение</Label>
              <div className="space-y-3">
                {(uploadedImageUrl || editingItem.imageUrl) && (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={uploadedImageUrl || editingItem.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                    <div className="px-3 py-2 border border-border rounded-lg hover:bg-accent/5 cursor-pointer transition-colors flex items-center justify-center gap-2 text-sm">
                      <Upload className="w-4 h-4" />
                      {isUploading ? 'Uploading...' : 'Upload Image'}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex gap-2 justify-end pt-4 border-t">
              <Button variant="outline" onClick={() => setEditingItem(null)}>
                Отмена
              </Button>
              <Button onClick={handleSaveItem} className="gap-2">
                <Check className="w-4 h-4" />
                Сохранить
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
