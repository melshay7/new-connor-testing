import React from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Trash2, ArrowRight, Heart, Sparkles, Plus, Minus } from 'lucide-react';
import { getStoredImage } from '../utils/imageStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E2DAD0] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E8DEC9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#EBF2EC] text-[#556B5B] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#28382D]">Your Care Basket</h3>
                <span className="text-[11px] text-[#697B6E]">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#7A8A7D] hover:text-[#28382D] rounded-full hover:bg-[#F2ECE1]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4EFE6] text-[#A2B1A5] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm text-[#5B6D5F] font-light">Your basket is currently empty.</p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#556B5B] hover:underline"
                >
                  <span>Explore Menu & Pricing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-[#E8DEC9] shadow-xs flex items-start gap-3.5"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F4EFE6] shrink-0 border border-[#E2DAD0]">
                    {item.image ? (
                      <img
                        src={getStoredImage(`product_${item.productId}`, item.image)}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#556B5B]">
                        🌸
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-medium text-xs sm:text-sm text-[#27372C] leading-snug truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#9DAEA1] hover:text-[#8C3A27] p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedAmount && (
                      <p className="text-[11px] font-medium text-[#465A4C] truncate">
                        Amount: {item.selectedAmount}
                      </p>
                    )}

                    {item.selectedFlavor && (
                      <p className="text-[11px] text-[#607164] italic truncate">
                        Flavor: {item.selectedFlavor}
                      </p>
                    )}

                    {item.selectedDietary && (
                      <p className="text-[10px] text-[#866D94] truncate">
                        {item.selectedDietary}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-serif text-sm font-bold text-[#556B5B]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#DCD3C4] rounded-lg overflow-hidden bg-[#FAF7F2]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-[#EAE1D2] text-[#4A5C4E]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#2A3A2F]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-[#EAE1D2] text-[#4A5C4E]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8DEC9] bg-white space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#596B5D]">
                  <span>Subtotal</span>
                  <span className="font-serif text-sm font-semibold text-[#28382D]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#596B5D]">
                  <span>Local Delivery / Shipping</span>
                  <span className="text-[11px] text-[#718274]">Calculated in Order Form</span>
                </div>
                <div className="flex justify-between font-serif text-base font-bold text-[#27362C] pt-2 border-t border-[#F2ECE1]">
                  <span>Estimated Total</span>
                  <span className="text-[#556B5B] text-lg">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                id="cart-proceed-checkout-btn"
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full bg-[#556B5B] hover:bg-[#435649] text-white py-3.5 rounded-2xl font-serif text-base font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-[#F5C78E]" />
                <span>Complete Order & Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
