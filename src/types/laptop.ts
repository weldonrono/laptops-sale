export interface LaptopConfig {
  ram: string;
  ramPrice: number;
  storage: string;
  storagePrice: number;
  displayUpgrade?: string;
  displayPrice?: number;
  color: string;
  colorHex: string;
}

export interface FeatureDeepDive {
  id: string;
  title: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string }[];
  highlight: string;
  visualTag: string;
}

export interface Laptop {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  category: 'creator' | 'ultrabook' | 'gaming' | 'business';
  categoryLabel: string;
  basePrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  inStock: boolean;
  leadTime: string;
  specs: {
    processor: string;
    graphics: string;
    display: string;
    memory: string;
    storage: string;
    battery: string;
    weight: string;
    ports: string[];
    wireless: string;
  };
  options: {
    ram: { label: string; value: string; price: number }[];
    storage: { label: string; value: string; price: number }[];
    display?: { label: string; value: string; price: number }[];
    colors: { name: string; hex: string; previewClass: string }[];
  };
  features: FeatureDeepDive[];
}

export interface CartItem {
  cartItemId: string; // unique combo of laptopId + config
  laptop: Laptop;
  config: LaptopConfig;
  quantity: number;
  itemPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type PaymentMethodType = 'card' | 'mpesa' | 'apple_pay' | 'paypal' | 'cod';

export interface Order {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: 'standard' | 'express';
  shippingCost: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethodType;
  status: 'confirmed' | 'configuring' | 'shipped' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}
