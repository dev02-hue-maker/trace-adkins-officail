// context/CartContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('trace-adkins-cart');
      let setItemsRaf: number | null = null;
      let initRaf: number | null = null;

      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          // Schedule setItems after paint to avoid synchronous setState in effect
          setItemsRaf = requestAnimationFrame(() => {
            setItems(parsedCart);
          });
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
        }
      }
      // Use requestAnimationFrame to schedule state update after paint
      initRaf = requestAnimationFrame(() => {
        setIsInitialized(true);
      });
      
      return () => {
        if (setItemsRaf !== null) cancelAnimationFrame(setItemsRaf);
        if (initRaf !== null) cancelAnimationFrame(initRaf);
      };
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('trace-adkins-cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addToCart = (product: Product, quantity: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, cartQuantity: quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.cartQuantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

