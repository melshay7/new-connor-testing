import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Heart, Menu as MenuIcon, X, Phone, Mail } from 'lucide-react';
import { MarigoldLogo } from './MarigoldLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  onStartOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  onStartOrder
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Menu & Pricing', id: 'offerings' },
    { label: 'Fourth Trimester Care', id: 'rituals' },
    { label: 'Order', id: 'order' },
    { label: 'FAQ', id: 'faq' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DEC8]/60 transition-all">
      {/* Top announcement bar */}
      <div className="bg-[#556B5B] text-[#FAF7F2] text-xs sm:text-sm py-1.5 px-4 text-center tracking-wide flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 font-medium">
        <Sparkles className="w-3.5 h-3.5 text-[#E6AF65] shrink-0" />
        <span>Local Pick-up and Delivery in Denver, CO</span>
        <Sparkles className="w-3.5 h-3.5 text-[#E6AF65] shrink-0" />
        <span>Nationwide Shipping</span>
        <Sparkles className="w-3.5 h-3.5 text-[#E6AF65] shrink-0" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FAF4EA] border border-[#E0D3BE] flex items-center justify-center p-0.5 shadow-sm transition-transform group-hover:scale-105">
              <MarigoldLogo className="w-full h-full" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#2B3A30] font-semibold block leading-tight">
                Milk & Marigold
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[#7B8C80] font-sans font-medium block">
                Organic Postpartum Care
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className="text-sm font-medium text-[#4A5D50] hover:text-[#28382E] transition-colors relative py-1 hover:border-b-2 hover:border-[#D99B4B]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Cart Button */}
            <button
              id="cart-toggle-btn"
              onClick={onOpenCart}
              aria-label="View Shopping Cart"
              className="relative p-2.5 text-[#3F5144] hover:text-[#253229] hover:bg-[#EAE4D9]/60 rounded-full transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D99B4B] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order CTA Button */}
            <button
              id="header-order-btn"
              onClick={onStartOrder}
              className="hidden md:inline-flex items-center gap-2 bg-[#556B5B] hover:bg-[#435548] text-[#FAF7F2] text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#F3C58B]" />
              <span>Order Now</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A5D50] hover:text-[#28382E] rounded-md cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E6DEC8] px-5 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="block w-full text-left py-2.5 px-3 rounded-lg text-base font-medium text-[#3A4B3F] hover:bg-[#EAE4D9]/70 hover:text-[#222E26] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#E6DEC8] space-y-2">
            <button
              onClick={() => {
                onStartOrder();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#556B5B] text-white py-3 rounded-xl font-medium shadow-sm text-base cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#F3C58B]" />
              <span>Order Care Package</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
