'use client';

import { useState } from 'react';
import { X, Plus, Minus, Loader2 } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [phone, setPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate minimum delivery date (today + 3 days)
  const getMinDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toISOString().split('T')[0];
  };

  const minDate = getMinDeliveryDate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (items.length === 0) {
      newErrors.cart = 'Корзина пуста';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Телефон обязателен';
    }
    if (!deliveryDate) {
      newErrors.deliveryDate = 'Дата доставки обязательна';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderNumber = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0].replace(/-/g, '');
    const time = now.toTimeString().slice(0, 5).replace(':', '');
    const random = Math.floor(Math.random() * 1000);
    return `${date}-${time}-${random}`;
  };

  const formatOrderMessage = () => {
    const orderNumber = generateOrderNumber();
    const totalPrice = getTotalPrice();
    const itemsList = items
      .map((item) => `• ${item.name} x${item.quantity} = ${item.price * item.quantity} EUR`)
      .join('\n');

    return encodeURIComponent(
      `Заказ #${orderNumber}\n\nТовары:\n${itemsList}\n\nИтого: ${totalPrice} EUR\n\nДата доставки: ${deliveryDate}\nТелефон: ${phone}\n${comment ? `Комментарий: ${comment}` : ''}`
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const message = formatOrderMessage();
    const whatsappUrl = `https://wa.me/4917684135318?text=${message}`;

    try {
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Clear cart after successful submission
      setTimeout(() => {
        clearCart();
        setPhone('');
        setDeliveryDate('');
        setComment('');
        onClose();
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Error submitting order:', error);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Корзина</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Error messages */}
          {errors.cart && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {errors.cart}
            </div>
          )}

          {/* Cart Items */}
          {items.length > 0 ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground">Товары</h3>
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.price} EUR</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-accent rounded transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-accent rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-red-50 text-red-600 rounded transition-colors ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Total */}
              <div className="border-t border-border pt-4 flex items-center justify-between font-semibold">
                <span>Итого:</span>
                <span className="text-lg text-primary">{getTotalPrice()} EUR</span>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
          )}

          {/* Order Form */}
          {items.length > 0 && (
            <div className="space-y-4 border-t border-border pt-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Телефон
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="+49 123 456789"
                  className={`w-full px-3 py-2 border rounded-lg bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.phone ? 'border-red-500' : 'border-border'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Delivery Date */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Дата доставки
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => {
                    setDeliveryDate(e.target.value);
                    if (errors.deliveryDate) setErrors({ ...errors, deliveryDate: '' });
                  }}
                  min={minDate}
                  className={`w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.deliveryDate ? 'border-red-500' : 'border-border'
                  }`}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Доставка возможна не ранее чем через 3 дня
                </p>
                {errors.deliveryDate && (
                  <p className="text-red-600 text-sm mt-1">{errors.deliveryDate}</p>
                )}
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Комментарий к заказу
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ваш комментарий или пожелания..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Переходим в WhatsApp для отправки заказа
                  </>
                ) : (
                  'Отправить заказ'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
