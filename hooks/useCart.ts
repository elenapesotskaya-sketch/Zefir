'use client';

import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const CART_STORAGE_KEY = 'cart-data';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const data: CartState = JSON.parse(stored);
        setCartItems(data.items || []);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  const saveCart = (items: CartItem[]) => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
          items,
          lastUpdated: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  };

  const addItem = (id: string, name: string, price: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      
      let updated: CartItem[];
      if (existingItem) {
        updated = prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prevItems, { id, name, price, quantity: 1 }];
      }
      
      saveCart(updated);
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => {
      const updated = prevItems.filter((item) => item.id !== id);
      saveCart(updated);
      return updated;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        const updated = prevItems.filter((item) => item.id !== id);
        saveCart(updated);
        return updated;
      }

      const updated = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      saveCart(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    items: cartItems,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount,
  };
}
