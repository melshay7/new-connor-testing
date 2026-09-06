/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { OfferingsSection } from './OfferingsSection';
import { PostpartumGuideSection } from './PostpartumGuideSection';
import { OrderSection } from './OrderSection';
import { FaqSection } from './FaqSection';
import { CartDrawer } from './CartDrawer';
import { Footer } from './Footer';
import { Product, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (
    product: Product,
    flavor?: string,
    dietary?: string,
    amount?: string,
    overridePrice?: number
  ) => {
    const itemPrice = overridePrice !== undefined ? overridePrice : product.price;
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedFlavor === (flavor || '') &&
          item.selectedDietary === (dietary || '') &&
          item.selectedAmount === (amount || '')
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        productId: product.id,
        name: product.name,
        category: product.category,
        price: itemPrice,
        quantity: 1,
        selectedAmount: amount,
        selectedFlavor: flavor,
        selectedDietary: dietary,
        image: product.image
      };

      return [...prev, newItem];
    });

    setToastMessage(`Added "${product.name.split('(')[0].trim()}" to your care basket!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((i) => i.id !== id);
      }
      return prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i));
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickOrderProduct = (product: Product) => {
    handleAddToCart(product);
    handleNavigate('order');
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] font-sans selection:bg-[#E2DDD5] selection:text-[#3B4A3F]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C3B30] text-[#FAF7F2] px-5 py-3 rounded-2xl shadow-xl border border-[#485C4E] flex items-center gap-3 text-xs sm:text-sm animate-in slide-in-from-bottom-5 duration-300">
          <span className="text-lg">🌸</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        onStartOrder={() => handleNavigate('order')}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <HeroSection
          onExploreMenu={() => handleNavigate('offerings')}
          onStartOrder={() => handleNavigate('order')}
          onReadStory={() => handleNavigate('about')}
        />

        <AboutSection />

        <OfferingsSection
          onAddToCart={handleAddToCart}
          onQuickOrderProduct={handleQuickOrderProduct}
        />

        <PostpartumGuideSection />

        <OrderSection
          cartItems={cartItems}
          onClearCart={handleClearCart}
          onAddToCart={handleAddToCart}
        />

        <FaqSection />
      </main>

      {/* Cart Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          handleNavigate('order');
        }}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
      />
    </div>
  );
}
