import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    tax,
    shippingCost,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const ok = applyCoupon(couponInput);
    if (!ok) {
      setCouponError('Invalid code. Try "VIDAL254" for 10% off or "FREESHIP".');
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-neutral-800 bg-neutral-950 p-6 shadow-2xl flex flex-col justify-between">
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white font-display">
                  Shopping Bag ({cartCount})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
                aria-label="Close bag"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free shipping progress notification */}
            <div className="mt-4 rounded-lg bg-neutral-900/60 p-3 text-xs text-neutral-300 border border-neutral-800/80 flex items-center justify-between">
              <span>Free Express Worldwide Courier</span>
              <span className="font-mono text-emerald-400 font-semibold">Unlocked</span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="my-4 flex-1 overflow-y-auto pr-1 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingBag className="h-12 w-12 text-neutral-600 mb-3" />
                <p className="text-sm font-medium text-white">Your bag is currently empty</p>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                  Configure a custom laptop or choose a pre-tuned silicon build from the catalog.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-200 border border-neutral-800 hover:text-white"
                >
                  Explore Models
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-3.5 relative"
                >
                  {/* Thumbnail */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-950 border border-neutral-800 p-1 flex items-center justify-center">
                    <img
                      src={item.laptop.image}
                      alt={item.laptop.name}
                      className="h-full w-full object-cover rounded"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white font-display truncate">
                        {item.laptop.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-neutral-500 hover:text-red-400 transition-colors cursor-pointer p-1"
                        title="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Configuration Specs breakdown */}
                    <div className="mt-1 text-[11px] text-neutral-400 font-mono space-y-0.5">
                      <div>{item.config.ram} Unified · {item.config.storage} NVMe</div>
                      <div className="flex items-center gap-1.5 text-neutral-400">
                        <span
                          className="inline-block h-2.5 w-2.5 rounded-full border border-neutral-700"
                          style={{ backgroundColor: item.config.colorHex }}
                        />
                        <span>{item.config.color}</span>
                        {item.config.displayUpgrade && <span>· Nano-Texture</span>}
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-neutral-800 bg-neutral-950">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="text-sm font-mono font-bold text-white tabular-nums">
                        ${(item.itemPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Financials & Checkout CTA */}
          {cart.length > 0 && (
            <div className="border-t border-neutral-900 pt-4 space-y-4">
              {/* Promo Code Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between rounded-lg bg-amber-400/10 border border-amber-400/30 p-2.5 text-xs">
                    <div className="flex items-center gap-1.5 text-amber-300 font-mono">
                      <Tag className="h-3.5 w-3.5" />
                      <span>Coupon "{appliedCoupon}" applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-neutral-400 hover:text-white text-[11px] underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (VIDAL254)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs text-white placeholder-neutral-500 border border-neutral-800 focus:border-amber-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-400 mt-1">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Discount</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated Tax (6.5%)</span>
                  <span className="text-white">${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Worldwide Shipping</span>
                  <span className="text-emerald-400">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-neutral-800 pt-2 text-sm font-bold text-white">
                  <span>Total</span>
                  <span className="text-amber-400">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-400 py-3 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 text-center">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>256-Bit Encrypted · 30-Day Return Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
