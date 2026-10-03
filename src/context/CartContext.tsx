import React, { createContext, useContext, useState, useEffect } from 'react';
import { Laptop, CartItem, LaptopConfig, Order, ShippingAddress, PaymentMethodType } from '../types/laptop';
import { LAPTOP_CATALOG } from '../data/laptops';

interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info';
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  couponCode: string;
  appliedCoupon: string | null;
  tax: number;
  shippingCost: number;
  total: number;
  orders: Order[];
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
  toasts: ToastMessage[];
  
  // UI drawer/modal toggles
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  
  // Active selected laptops
  activeConfigLaptop: Laptop | null;
  setActiveConfigLaptop: (laptop: Laptop | null) => void;
  selectedCompareLaptops: string[];
  toggleCompareLaptop: (laptopId: string) => void;
  clearCompare: () => void;

  // Actions
  addToCart: (laptop: Laptop, customConfig?: LaptopConfig, quantity?: number) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  placeOrder: (address: ShippingAddress, method: 'standard' | 'express', payment: PaymentMethodType) => Order;
  dismissToast: (id: string) => void;
  showToast: (title: string, description: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vidal254_laptop_cart_v1';
const ORDERS_STORAGE_KEY = 'vidal254_laptop_orders_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse cart from localStorage', e);
    }
    // Default cart with 1 flagship laptop so user can immediately experience cart/checkout!
    const defaultLaptop = LAPTOP_CATALOG[0];
    const defaultConfig: LaptopConfig = {
      ram: defaultLaptop.options.ram[0].value,
      ramPrice: defaultLaptop.options.ram[0].price,
      storage: defaultLaptop.options.storage[0].value,
      storagePrice: defaultLaptop.options.storage[0].price,
      color: defaultLaptop.options.colors[0].name,
      colorHex: defaultLaptop.options.colors[0].hex,
    };
    return [
      {
        cartItemId: `${defaultLaptop.id}-${defaultConfig.ram}-${defaultConfig.storage}-${defaultConfig.color}`,
        laptop: defaultLaptop,
        config: defaultConfig,
        quantity: 1,
        itemPrice: defaultLaptop.basePrice,
      },
    ];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse orders from localStorage', e);
    }
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [activeConfigLaptop, setActiveConfigLaptop] = useState<Laptop | null>(null);
  const [selectedCompareLaptops, setSelectedCompareLaptops] = useState<string[]>([
    'aura-pro-16',
    'aura-air-14',
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const showToast = (title: string, description: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type: 'success' }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);

  const discountRate = (appliedCoupon === 'VIDAL254' || appliedCoupon === 'AURASPEED') ? 0.1 : appliedCoupon === 'FREESHIP' ? 0 : 0;
  const discount = Math.round(subtotal * discountRate);

  const tax = Math.round((subtotal - discount) * 0.065); // 6.5% standard tech sales tax
  const shippingCost = appliedCoupon === 'FREESHIP' || subtotal > 1000 ? 0 : 35;
  const total = subtotal - discount + tax + shippingCost;

  const addToCart = (laptop: Laptop, customConfig?: LaptopConfig, quantity: number = 1) => {
    const config: LaptopConfig = customConfig || {
      ram: laptop.options.ram[0].value,
      ramPrice: laptop.options.ram[0].price,
      storage: laptop.options.storage[0].value,
      storagePrice: laptop.options.storage[0].price,
      displayUpgrade: laptop.options.display ? laptop.options.display[0].value : undefined,
      displayPrice: laptop.options.display ? laptop.options.display[0].price : 0,
      color: laptop.options.colors[0].name,
      colorHex: laptop.options.colors[0].hex,
    };

    const extraPrice = (config.ramPrice || 0) + (config.storagePrice || 0) + (config.displayPrice || 0);
    const itemPrice = laptop.basePrice + extraPrice;
    const cartItemId = `${laptop.id}-${config.ram}-${config.storage}-${config.color}-${config.displayUpgrade || 'std'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            laptop,
            config,
            quantity,
            itemPrice,
          },
        ];
      }
    });

    showToast(
      'Added to Bag',
      `${laptop.name} (${config.ram} / ${config.storage} / ${config.color}) added.`
    );
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item Removed', 'Laptop configuration removed from your shopping bag.');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'VIDAL254' || trimmed === 'AURASPEED') {
      setAppliedCoupon('VIDAL254');
      setCouponCode('VIDAL254');
      showToast('10% Discount Applied', 'Promo code VIDAL254 granted 10% off your purchase.');
      return true;
    } else if (trimmed === 'FREESHIP') {
      setAppliedCoupon('FREESHIP');
      setCouponCode('FREESHIP');
      showToast('Express Delivery Free', 'Promo code FREESHIP applied to order.');
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const placeOrder = (
    address: ShippingAddress,
    method: 'standard' | 'express',
    payment: PaymentMethodType
  ): Order => {
    const randDigits = Math.floor(10000 + Math.random() * 90000);
    const orderId = `VID-${randDigits}`;
    const trackingDigits = Math.floor(100000000 + Math.random() * 900000000);
    const trackingNumber = `TRK-${trackingDigits}`;

    const deliveryDays = method === 'express' ? 2 : 4;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const finalShippingCost = method === 'express' ? 29 : shippingCost;
    const finalTotal = subtotal - discount + tax + finalShippingCost;

    const newOrder: Order = {
      orderId,
      createdAt: new Date().toISOString(),
      items: [...cart],
      shippingAddress: address,
      shippingMethod: method,
      shippingCost: finalShippingCost,
      subtotal,
      discount,
      tax,
      total: finalTotal,
      paymentMethod: payment,
      status: 'confirmed',
      trackingNumber,
      estimatedDelivery,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setCart([]); // Clear cart after successful checkout
    setIsCheckoutOpen(false);
    showToast('Order Confirmed!', `Order #${orderId} is being prepared at our VIDAL254 silicon lab.`);
    return newOrder;
  };

  const toggleCompareLaptop = (laptopId: string) => {
    setSelectedCompareLaptops((prev) => {
      if (prev.includes(laptopId)) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter((id) => id !== laptopId);
      } else {
        if (prev.length >= 3) {
          return [prev[1], prev[2], laptopId];
        }
        return [...prev, laptopId];
      }
    });
  };

  const clearCompare = () => {
    setSelectedCompareLaptops(['aura-pro-16', 'aura-air-14']);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        discount,
        couponCode,
        appliedCoupon,
        tax,
        shippingCost,
        total,
        orders,
        lastPlacedOrder,
        setLastPlacedOrder,
        toasts,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        isCompareOpen,
        setIsCompareOpen,
        activeConfigLaptop,
        setActiveConfigLaptop,
        selectedCompareLaptops,
        toggleCompareLaptop,
        clearCompare,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        placeOrder,
        dismissToast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
