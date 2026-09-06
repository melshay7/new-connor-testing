import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { Product, OrderData, CartItem } from '../types';
import {
  Heart,
  Sparkles,
  ShoppingBag,
  Gift,
  Calendar,
  Truck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  FileText,
  Printer,
  ChevronRight,
  Info
} from 'lucide-react';

interface OrderSectionProps {
  cartItems: CartItem[];
  onClearCart: () => void;
  onAddToCart: (product: Product, flavor?: string, dietary?: string) => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({
  cartItems,
  onClearCart,
  onAddToCart
}) => {
  // Local form state
  const [selectedItems, setSelectedItems] = useState<
    Array<{
      productId: string;
      productName: string;
      price: number;
      quantity: number;
      amount?: string;
      flavor: string;
      dietary: string;
    }>
  >([]);

  // Gifting & Mama info
  const [isGift, setIsGift] = useState<boolean>(true);
  const [mamaName, setMamaName] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [babyDueDateOrAge, setBabyDueDateOrAge] = useState<string>('');
  const [giftCardMessage, setGiftCardMessage] = useState<string>('');

  // Delivery info
  const [deliveryMethod, setDeliveryMethod] = useState<'local_delivery' | 'pickup' | 'shipping'>('local_delivery');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [preferredDeliveryDate, setPreferredDeliveryDate] = useState<string>('');
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>('');

  // Customer Contact & Payment
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'venmo' | 'zelle' | 'cash_pickup'>('venmo');
  const [promoCode, setPromoCode] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Initialize selected items from pre-existing cart items if present
  useEffect(() => {
    if (cartItems.length > 0 && selectedItems.length === 0) {
      const mapped = cartItems.map((ci) => ({
        productId: ci.productId,
        productName: ci.name,
        price: ci.price,
        quantity: ci.quantity,
        amount: ci.selectedAmount || '',
        flavor: ci.selectedFlavor || '',
        dietary: ci.selectedDietary || '100% Organic (Traditional)'
      }));
      setSelectedItems(mapped);
    }
  }, [cartItems]);

  // If no items selected yet, default to the Signature Postpartum Package
  useEffect(() => {
    if (selectedItems.length === 0 && cartItems.length === 0) {
      const signaturePkg = PRODUCTS.find((p) => p.id === 'postpartum-nurture-box');
      if (signaturePkg) {
        setSelectedItems([
          {
            productId: signaturePkg.id,
            productName: signaturePkg.name,
            price: signaturePkg.price,
            quantity: 1,
            amount: '',
            flavor: signaturePkg.flavors ? signaturePkg.flavors[0] : '',
            dietary: signaturePkg.dietaryOptions ? signaturePkg.dietaryOptions[0] : '100% Organic (Traditional)'
          }
        ]);
      }
    }
  }, []);

  const handleItemQuantityChange = (index: number, delta: number) => {
    setSelectedItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleItemAmountChange = (index: number, amount: string) => {
    setSelectedItems((prev) => {
      const updated = [...prev];
      const currentItem = updated[index];
      const prod = PRODUCTS.find((p) => p.id === currentItem.productId);
      let newPrice = currentItem.price;
      if (prod?.amountOptions) {
        const match = prod.amountOptions.find((a) => a.label === amount);
        if (match) newPrice = match.price;
      }
      updated[index] = {
        ...currentItem,
        amount,
        price: newPrice
      };
      return updated;
    });
  };

  const handleItemFlavorChange = (index: number, flavor: string) => {
    setSelectedItems((prev) => {
      const updated = [...prev];
      updated[index].flavor = flavor;
      return updated;
    });
  };

  const handleItemDietaryChange = (index: number, dietary: string) => {
    setSelectedItems((prev) => {
      const updated = [...prev];
      updated[index].dietary = dietary;
      return updated;
    });
  };

  const handleAddProductToForm = (product: Product) => {
    setSelectedItems((prev) => {
      const defaultAmount = product.amountOptions ? product.amountOptions[0].label : '';
      const defaultPrice = product.amountOptions ? product.amountOptions[0].price : product.price;

      const existingIdx = prev.findIndex((i) => i.productId === product.id && i.amount === defaultAmount);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          price: defaultPrice,
          quantity: 1,
          amount: defaultAmount,
          flavor: product.flavors ? product.flavors[0] : '',
          dietary: product.dietaryOptions ? product.dietaryOptions[0] : '100% Organic (Traditional)'
        }
      ];
    });
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((sum, item) => {
      let itemPrice = item.price;
      // Dietary surcharge calculation if applicable
      if (item.dietary && item.dietary.includes('+ $')) {
        const match = item.dietary.match(/\+\s*\$(\d+(\.\d+)?)/);
        if (match && match[1]) {
          itemPrice += parseFloat(match[1]);
        }
      }
      return sum + itemPrice * item.quantity;
    }, 0);
  };

  const calculateDeliveryFee = () => {
    if (deliveryMethod === 'pickup') return 0;
    if (deliveryMethod === 'local_delivery') return 8; // Local delivery $8 or free over $75
    if (deliveryMethod === 'shipping') return 12; // USPS Priority Express
    return 0;
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal >= 75 && deliveryMethod === 'local_delivery' ? 0 : calculateDeliveryFee();
  const total = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (selectedItems.length === 0) {
      setFormError('Please select at least one care package, cookie box, or herbal bath pouch to order.');
      return;
    }

    if (!mamaName.trim()) {
      setFormError("Please enter the Mama's Name so we can personalize the order & packaging.");
      return;
    }

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      setFormError('Please provide your name, email address, and phone number for order verification.');
      return;
    }

    if (deliveryMethod !== 'pickup' && !deliveryAddress.trim()) {
      setFormError('Please provide the delivery / shipping address for the care package.');
      return;
    }

    setIsSubmitting(true);

    const orderData: OrderData = {
      orderId: `MM-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: selectedItems.map((item, idx) => ({
        id: `ord-item-${idx}`,
        productId: item.productId,
        name: item.productName,
        category: 'packages',
        price: item.price,
        quantity: item.quantity,
        selectedFlavor: item.flavor,
        selectedDietary: item.dietary,
        image: ''
      })),
      subtotal,
      deliveryFee,
      total,
      isGift,
      mamaName,
      senderName: isGift ? senderName : undefined,
      giftCardMessage: isGift ? giftCardMessage : undefined,
      babyDueDateOrAge,
      customerName,
      customerEmail,
      customerPhone,
      deliveryMethod,
      deliveryAddress,
      preferredDeliveryDate,
      deliveryInstructions: deliveryInstructions || specialRequests,
      paymentMethod,
      paymentStatus: 'pending_confirmation'
    };

    // Dispatch notification to milkandmarigoldorganic@gmail.com
    const emailPayload = {
      _subject: `🌸 New Milk & Marigold Order: Care Package for Mama ${mamaName}`,
      _replyto: customerEmail,
      "Mama's Name": mamaName,
      "Baby Due Date / Age": babyDueDateOrAge || 'Not specified',
      "Is this a Gift?": isGift ? `Yes (from ${senderName || customerName})` : 'No',
      "Handwritten Card Note": giftCardMessage || 'None',
      "Customer Name": customerName,
      "Customer Email": customerEmail,
      "Customer Phone": customerPhone,
      "Fulfillment Method": deliveryMethod.toUpperCase(),
      "Delivery / Shipping Address": deliveryAddress || 'Studio Pickup',
      "Preferred Delivery Date": preferredDeliveryDate || 'As soon as fresh',
      "Delivery / Special Instructions": deliveryInstructions || specialRequests || 'None',
      "Payment Preference": paymentMethod.toUpperCase(),
      "Ordered Items": selectedItems
        .map(
          (i) =>
            `${i.quantity}x ${i.productName} ${i.flavor ? `(${i.flavor})` : ''} ${i.dietary ? `[${i.dietary}]` : ''} - $${(i.price * i.quantity).toFixed(2)}`
        )
        .join('\n'),
      "Subtotal": `$${subtotal.toFixed(2)}`,
      "Delivery Fee": deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`,
      "Total Amount": `$${total.toFixed(2)}`,
      "Order Timestamp": orderData.createdAt
    };

    // 1. Send to FormSubmit email dispatcher for milkandmarigoldorganic@gmail.com
    fetch('https://formsubmit.co/ajax/milkandmarigoldorganic@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(emailPayload)
    }).catch((err) => {
      console.debug('Email notification dispatch notice:', err);
    });

    // 2. Also log on server
    fetch('/api/send-order-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderData, emailPayload })
    }).catch(() => {});

    setTimeout(() => {
      setCompletedOrder(orderData);
      setIsSubmitting(false);
      onClearCart();
    }, 700);
  };

  const copyReceiptToClipboard = () => {
    if (!completedOrder) return;
    const text = `🌸 MILK & MARIGOLD - ORDER DETAILS
Mama: ${completedOrder.mamaName}
Date: ${completedOrder.createdAt}
Fulfillment: ${completedOrder.deliveryMethod.toUpperCase()}
Recipient Address: ${completedOrder.deliveryAddress || 'Studio Pickup'}

ITEMS:
${completedOrder.items
  .map(
    (i) =>
      `• ${i.quantity}x ${i.name} ${i.selectedFlavor ? `(${i.selectedFlavor})` : ''} ${i.selectedDietary ? `[${i.selectedDietary}]` : ''}`
  )
  .join('\n')}

Subtotal: $${completedOrder.subtotal.toFixed(2)}
Delivery/Shipping: ${completedOrder.deliveryFee === 0 ? 'FREE' : `$${completedOrder.deliveryFee.toFixed(2)}`}
Total: $${completedOrder.total.toFixed(2)}

Payment Preference: ${completedOrder.paymentMethod.toUpperCase()}
Note to Mama: "${completedOrder.giftCardMessage || 'None'}"

Thank you for supporting Milk & Marigold!
Questions? Email milkandmarigoldorganic@gmail.com`;

    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2500);
  };

  return (
    <section id="order" className="py-20 bg-[#F4EFE6] border-t border-[#E5DEC8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF2EC] text-[#445749] text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-[#D99B4B]" />
            <span>Direct Online Order Form</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#27362C] font-normal tracking-tight">
            Order Your Postpartum Care
          </h2>
          <p className="text-base sm:text-lg text-[#55675A] font-light">
            Build your personalized package, select custom dietary options, and schedule delivery. 
            All orders are freshly baked and blended with 100% organic botanicals.
          </p>
        </div>

        {/* Order Form Container */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form Fields */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E6DEC9] shadow-sm">
            
            {/* Step 1: Menu Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#556B5B] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#28382D] font-semibold">Select Menu Items & Flavors</h3>
                </div>
                <span className="text-xs text-[#718274]">Baked Fresh to Order</span>
              </div>

              {/* List of currently selected items in order */}
              <div className="space-y-3">
                {selectedItems.map((item, idx) => {
                  const productObj = PRODUCTS.find((p) => p.id === item.productId);
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC9] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-sm sm:text-base text-[#28382D]">{item.productName}</h4>
                          <span className="text-xs font-serif font-bold text-[#556B5B]">${item.price} each</span>
                        </div>
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#D8CFC0] rounded-xl bg-white overflow-hidden shadow-xs">
                          <button
                            type="button"
                            onClick={() => handleItemQuantityChange(idx, -1)}
                            className="px-2.5 py-1 text-sm font-bold text-[#556B5B] hover:bg-[#F4EFE6]"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-bold text-[#27362C]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleItemQuantityChange(idx, 1)}
                            className="px-2.5 py-1 text-sm font-bold text-[#556B5B] hover:bg-[#F4EFE6]"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Amount selection if product has amountOptions (e.g. cookies) */}
                      {productObj?.amountOptions && productObj.amountOptions.length > 0 && (
                        <div>
                          <label className="block text-[11px] font-semibold text-[#526356] uppercase mb-1">
                            Choose Amount:
                          </label>
                          <select
                            value={item.amount || productObj.amountOptions[0].label}
                            onChange={(e) => handleItemAmountChange(idx, e.target.value)}
                            className="w-full text-xs bg-white border border-[#DCD1C0] rounded-xl px-3 py-2 text-[#2A3B30] font-medium focus:ring-1 focus:ring-[#556B5B]"
                          >
                            {productObj.amountOptions.map((opt, aIdx) => (
                              <option key={aIdx} value={opt.label}>
                                {opt.label} (${opt.price})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Flavor selection if product has flavors */}
                      {productObj?.flavors && (
                        <div>
                          <label className="block text-[11px] font-semibold text-[#526356] uppercase mb-1">
                            Flavor Option:
                          </label>
                          <select
                            value={item.flavor}
                            onChange={(e) => handleItemFlavorChange(idx, e.target.value)}
                            className="w-full text-xs bg-white border border-[#DCD1C0] rounded-xl px-3 py-2 text-[#2A3B30] focus:ring-1 focus:ring-[#556B5B]"
                          >
                            {productObj.flavors.map((flv, fIdx) => (
                              <option key={fIdx} value={flv}>{flv}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Dietary selection */}
                      {productObj?.dietaryOptions && (
                        <div>
                          <label className="block text-[11px] font-semibold text-[#526356] uppercase mb-1">
                            Dietary Recipe:
                          </label>
                          <select
                            value={item.dietary}
                            onChange={(e) => handleItemDietaryChange(idx, e.target.value)}
                            className="w-full text-xs bg-white border border-[#DCD1C0] rounded-xl px-3 py-2 text-[#2A3B30] focus:ring-1 focus:ring-[#556B5B]"
                          >
                            {productObj.dietaryOptions.map((opt, oIdx) => (
                              <option key={oIdx} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick Add other items button grid */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-[#667768] uppercase tracking-wider mb-2">
                  + Add another item to this order:
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRODUCTS.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleAddProductToForm(prod)}
                      className="text-xs bg-[#F4EFE6] hover:bg-[#EAE2D2] border border-[#DDD3C2] text-[#344538] px-3 py-1.5 rounded-xl font-medium transition-colors flex items-center gap-1"
                    >
                      <span>+ {prod.name.split('(')[0]} (${prod.price})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Mama & Gifting Information */}
            <div className="space-y-4 pt-4 border-t border-[#EFE8DC]">
              <div className="flex items-center gap-2.5 border-b border-[#EFE8DC] pb-3">
                <span className="w-7 h-7 rounded-full bg-[#556B5B] text-white text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#28382D] font-semibold">Mama & Gift Details</h3>
              </div>

              {/* Is this a gift toggle */}
              <div className="flex items-center gap-4 bg-[#FAF7F2] p-3 rounded-2xl border border-[#EAE0D1]">
                <label className="text-xs sm:text-sm font-medium text-[#38493D] flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="orderType"
                    checked={isGift}
                    onChange={() => setIsGift(true)}
                    className="accent-[#556B5B] w-4 h-4"
                  />
                  <span>🎁 This is a gift for an expectant or postpartum mama</span>
                </label>
                <label className="text-xs sm:text-sm font-medium text-[#38493D] flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="orderType"
                    checked={!isGift}
                    onChange={() => setIsGift(false)}
                    className="accent-[#556B5B] w-4 h-4"
                  />
                  <span>🤍 For myself (Mama care)</span>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-1">
                    Mama's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Miller"
                    value={mamaName}
                    onChange={(e) => setMamaName(e.target.value)}
                    className="w-full text-sm bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl px-3.5 py-2.5 text-[#2B3B2F] focus:ring-1 focus:ring-[#556B5B] focus:bg-white"
                  />
                </div>
              </div>

              {isGift && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-1">
                      Gift Sender Name(s)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aunt Sarah & Uncle David"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full text-sm bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl px-3.5 py-2.5 text-[#2B3B2F] focus:ring-1 focus:ring-[#556B5B] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-1">
                      Personal Message for Handwritten Gift Card
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write your sweet words of love, encouragement, and congratulations here. We handwrite this on our botanical card!"
                      value={giftCardMessage}
                      onChange={(e) => setGiftCardMessage(e.target.value)}
                      className="w-full text-sm bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl p-3 text-[#2B3B2F] focus:ring-1 focus:ring-[#556B5B] focus:bg-white"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Step 3: Fulfillment & Scheduling */}
            <div className="space-y-4 pt-4 border-t border-[#EFE8DC]">
              <div className="flex items-center gap-2.5 border-b border-[#EFE8DC] pb-3">
                <span className="w-7 h-7 rounded-full bg-[#556B5B] text-white text-xs font-bold flex items-center justify-center">3</span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#28382D] font-semibold">Delivery & Fulfillment</h3>
              </div>

              {/* Delivery method options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  onClick={() => setDeliveryMethod('local_delivery')}
                  className={`p-3.5 rounded-2xl border cursor-pointer text-left transition-all ${
                    deliveryMethod === 'local_delivery'
                      ? 'border-[#556B5B] bg-[#EBF2EC] shadow-xs'
                      : 'border-[#E2D8C7] bg-[#FAF7F2] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'local_delivery'}
                    onChange={() => setDeliveryMethod('local_delivery')}
                    className="sr-only"
                  />
                  <span className="text-xs font-bold text-[#2A3A2F] block">🏡 Porch Delivery</span>
                  <span className="text-[11px] text-[#5D6F61] block mt-0.5">Local drop-off within 20 minutes of 80206 ($8 • Free over $75)</span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('shipping')}
                  className={`p-3.5 rounded-2xl border cursor-pointer text-left transition-all ${
                    deliveryMethod === 'shipping'
                      ? 'border-[#556B5B] bg-[#EBF2EC] shadow-xs'
                      : 'border-[#E2D8C7] bg-[#FAF7F2] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'shipping'}
                    onChange={() => setDeliveryMethod('shipping')}
                    className="sr-only"
                  />
                  <span className="text-xs font-bold text-[#2A3A2F] block">📦 USPS Priority</span>
                  <span className="text-[11px] text-[#5D6F61] block mt-0.5">Nationwide 2-3 Day ($12)</span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-3.5 rounded-2xl border cursor-pointer text-left transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#556B5B] bg-[#EBF2EC] shadow-xs'
                      : 'border-[#E2D8C7] bg-[#FAF7F2] hover:bg-[#F2ECE0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => setDeliveryMethod('pickup')}
                    className="sr-only"
                  />
                  <span className="text-xs font-bold text-[#2A3A2F] block">🧺 Studio Pickup</span>
                  <span className="text-[11px] text-[#5D6F61] block mt-0.5">Free local pickup</span>
                </label>
              </div>

              {deliveryMethod !== 'pickup' && (
                <div>
                  <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-1">
                    Delivery / Shipping Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Street address, Apt/Suite, City, State, ZIP code"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full text-sm bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl px-3.5 py-2.5 text-[#2B3B2F] focus:ring-1 focus:ring-[#556B5B] focus:bg-white"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-1">
                    Preferred Delivery / Arrival Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next Tuesday or As soon as baby arrives"
                    value={preferredDeliveryDate}
                    onChange={(e) => setPreferredDeliveryDate(e.target.value)}
                    className="w-full text-sm bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl px-3.5 py-2.5 text-[#2B3B2F] focus:ring-1 focus:ring-[#556B5B] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-1">
                    Porch / Gate Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ring doorbell, leave on front porch chair"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    className="w-full text-sm bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl px-3.5 py-2.5 text-[#2B3B2F] focus:ring-1 focus:ring-[#556B5B] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Contact & Payment Selection */}
            <div className="space-y-4 pt-4 border-t border-[#EFE8DC]">
              <div className="flex items-center gap-2.5 border-b border-[#EFE8DC] pb-3">
                <span className="w-7 h-7 rounded-full bg-[#556B5B] text-white text-xs font-bold flex items-center justify-center">4</span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#28382D] font-semibold">Your Contact & Payment</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-sm bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl px-3.5 py-2.5 text-[#2B3B2F] focus:ring-1 focus:ring-[#556B5B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full text-sm bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl px-3.5 py-2.5 text-[#2B3B2F] focus:ring-1 focus:ring-[#556B5B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-sm bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl px-3.5 py-2.5 text-[#2B3B2F] focus:ring-1 focus:ring-[#556B5B] focus:bg-white"
                  />
                </div>
              </div>

              {/* Payment preference */}
              <div>
                <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-2">
                  Payment Method Preference:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'venmo', label: 'Venmo (@milkandmarigold)' },
                    { id: 'zelle', label: 'Zelle Bank Transfer' },
                    { id: 'cash_pickup', label: 'Cash on Pickup' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        paymentMethod === p.id
                          ? 'border-[#556B5B] bg-[#556B5B] text-white shadow-xs'
                          : 'border-[#DDD3C2] bg-[#FAF7F2] text-[#38493D] hover:bg-[#EAE0D1]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Promotion Code Section */}
              <div>
                <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-1">
                  Promotion Code
                </label>
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full text-sm bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl px-3.5 py-2.5 text-[#2B3B2F] focus:ring-1 focus:ring-[#556B5B] focus:bg-white placeholder:text-[#91A194]"
                />
              </div>

              {/* Dietary notes & Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-[#445648] uppercase tracking-wider mb-1">
                  Allergies, Dietary Restrictions, or Special Requests:
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Severe nut allergy in household, please wrap extra carefully, or request extra lavender in bath pouch."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full text-sm bg-[#FAF7F2] border border-[#DDD3C2] rounded-xl p-3 text-[#2B3B2F] focus:ring-1 focus:ring-[#556B5B] focus:bg-white"
                />
              </div>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="p-3.5 bg-[#FDEEE9] border border-[#E9BEB2] text-[#8C3A27] rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="submit-order-form-btn"
                disabled={isSubmitting}
                className="w-full bg-[#556B5B] hover:bg-[#435649] text-white py-4 rounded-2xl font-serif text-lg tracking-wide font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Preparing Your Order...</span>
                ) : (
                  <>
                    <Heart className="w-5 h-5 text-[#F5C78E]" />
                    <span>Submit & Place Care Order (${total.toFixed(2)})</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-[#718274] text-center mt-2">
                No immediate payment required now. We confirm your order details and send payment invoice via email.
              </p>
            </div>

          </div>

          {/* Right Column: Real-time Order Summary Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E6DEC9] shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-3">
                <div className="flex items-center gap-2 text-[#28382D]">
                  <ShoppingBag className="w-5 h-5 text-[#556B5B]" />
                  <h3 className="font-serif text-xl font-semibold">Order Summary</h3>
                </div>
                <span className="text-xs bg-[#EBF2EC] text-[#556B5B] font-bold px-2.5 py-0.5 rounded-full">
                  {selectedItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {selectedItems.length === 0 ? (
                  <p className="text-xs text-[#809183] italic py-4 text-center">
                    Your order list is empty. Select items from the menu on the left.
                  </p>
                ) : (
                  selectedItems.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between text-xs py-1.5 border-b border-[#F4EFE6]">
                      <div className="space-y-0.5">
                        <span className="font-medium text-[#2A3B30] block">
                          {item.quantity}x {item.productName}
                        </span>
                        {item.flavor && (
                          <span className="text-[11px] text-[#697B6E] block italic">
                            Flavor: {item.flavor}
                          </span>
                        )}
                        {item.dietary && (
                          <span className="text-[10px] text-[#866D94] block">
                            {item.dietary}
                          </span>
                        )}
                      </div>
                      <span className="font-serif font-bold text-[#2A3A2E]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2 pt-3 border-t border-[#EFE8DC] text-xs">
                <div className="flex justify-between text-[#5C6E61]">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#5C6E61]">
                  <span>
                    Fulfillment ({deliveryMethod === 'local_delivery' ? 'Local Porch Drop-off' : deliveryMethod === 'shipping' ? 'USPS Priority Shipping' : 'Studio Pickup'}):
                  </span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                {deliveryMethod === 'local_delivery' && subtotal < 75 && (
                  <p className="text-[10px] text-[#8A7550] bg-[#FAF3E6] p-2 rounded-lg">
                    ✨ Tip: Add ${(75 - subtotal).toFixed(2)} more for <strong>FREE</strong> local porch delivery!
                  </p>
                )}
                <div className="flex justify-between text-base font-serif font-bold text-[#26362B] pt-2 border-t border-[#EAE1D2]">
                  <span>Estimated Total:</span>
                  <span className="text-xl text-[#556B5B]">${total.toFixed(2)}</span>
                </div>
              </div>

            </div>
          </div>

        </form>

      </div>

      {/* Order Confirmation Modal */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#E2DAD0] shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#EBF2EC] text-[#556B5B] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-[#556B5B]" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#D99B4B] font-bold">Order Received with Love</span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#27362C] font-semibold">
                Thank you, {completedOrder.customerName}!
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6E60]">
                Your order for <strong>{completedOrder.mamaName}</strong> has been received by Milk & Marigold!
              </p>
            </div>

            {/* Itemized summary */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6DEC9] space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#F0EAE0] pb-2 text-[#6D7F72]">
                <span className="font-medium text-[#485B4E]">Order Summary</span>
                <span>{completedOrder.createdAt}</span>
              </div>

              <div className="space-y-1.5 py-1">
                {completedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {it.quantity}x {it.name} {it.selectedFlavor ? `(${it.selectedFlavor})` : ''}
                    </span>
                    <span className="font-semibold">${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F0EAE0] pt-2 space-y-1 text-[#55675A]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${completedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery ({completedOrder.deliveryMethod}):</span>
                  <span>{completedOrder.deliveryFee === 0 ? 'FREE' : `$${completedOrder.deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-serif text-sm font-bold text-[#27362C] pt-1 border-t border-[#EAE0D0]">
                  <span>Total Due:</span>
                  <span className="text-[#556B5B] text-base">${completedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {completedOrder.giftCardMessage && (
                <div className="mt-2 p-3 bg-[#FAF7F2] rounded-xl border border-[#EFE5D7]">
                  <span className="text-[10px] font-bold uppercase text-[#738376] block mb-1">Handwritten Card Note:</span>
                  <p className="text-[11px] italic text-[#394B3F]">"{completedOrder.giftCardMessage}"</p>
                </div>
              )}
            </div>

            {/* Next Steps / Payment Instructions */}
            <div className="p-4 rounded-2xl bg-[#EBF2EC] border border-[#C7D7CB] space-y-2 text-xs text-[#3E5143]">
              <h4 className="font-semibold text-[#25362A] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D99B4B]" />
                What Happens Next:
              </h4>
              <p className="leading-relaxed">
                We have received your order details! Our founder reviews every order and will personally reach out to you directly to confirm your order specifications and provide payment instructions.
              </p>
              <div className="pt-1 text-[11px]">
                <span>Payment preference: <strong>{completedOrder.paymentMethod.toUpperCase()}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={copyReceiptToClipboard}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-white hover:bg-[#F4EFE6] border border-[#DDD3C2] text-[#35483A] py-3 rounded-xl text-xs font-semibold transition-colors"
              >
                {copiedReceipt ? (
                  <>
                    <Check className="w-4 h-4 text-[#556B5B]" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Order Receipt</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setCompletedOrder(null)}
                className="w-full sm:w-1/2 bg-[#556B5B] hover:bg-[#435649] text-white py-3 rounded-xl text-xs font-semibold transition-all shadow-sm"
              >
                Back to Website
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
