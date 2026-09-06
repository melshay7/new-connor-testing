export type ProductCategory = 'packages' | 'cookies' | 'bath-pouches';

export interface ProductOption {
  name: string;
  priceDelta?: number;
}

export interface ProductAmountOption {
  label: string;
  count: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subtitle: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  amountOptions?: ProductAmountOption[];
  flavors?: string[];
  dietaryOptions?: string[];
  servingNote?: string;
  isBestseller?: boolean;
  isPopularGift?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category: ProductCategory;
  price: number;
  quantity: number;
  selectedAmount?: string;
  selectedFlavor?: string;
  selectedDietary?: string;
  customNotes?: string;
  image: string;
}

export interface OrderData {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  
  // Recipient info
  isGift: boolean;
  mamaName: string;
  senderName?: string;
  giftCardMessage?: string;
  babyDueDateOrAge?: string;
  
  // Delivery & Customer info
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryMethod: 'local_delivery' | 'pickup' | 'shipping';
  deliveryAddress?: string;
  preferredDeliveryDate?: string;
  deliveryInstructions?: string;
  
  // Payment info
  paymentMethod: 'venmo' | 'zelle' | 'cash_pickup';
  paymentStatus: 'pending_confirmation';
  promoCode?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  product: string;
  avatarText?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'cookies' | 'bath' | 'ordering' | 'ingredients';
}
