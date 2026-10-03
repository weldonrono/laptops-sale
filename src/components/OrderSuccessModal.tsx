import React from 'react';
import { useCart } from '../context/CartContext';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  X,
  ExternalLink,
  ShieldCheck,
  Calendar,
  MapPin,
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder, setIsOrderHistoryOpen } = useCart();

  if (!lastPlacedOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setLastPlacedOrder(null)}
          className="absolute right-5 top-5 rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
          aria-label="Close confirmation"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Success Header */}
        <div className="text-center pb-6 border-b border-neutral-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Silicon Order Authorized
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white font-display">
            Order #{lastPlacedOrder.orderId}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            A confirmation receipt has been sent to{' '}
            <span className="text-white font-medium">{lastPlacedOrder.shippingAddress.email}</span>.
            Your machine is being staged at our VIDAL254 silicon laboratory.
          </p>
        </div>

        {/* Order Logistics Status Bar */}
        <div className="mt-6 rounded-xl bg-neutral-900/60 p-5 border border-neutral-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <Calendar className="h-4 w-4 text-amber-400" />
              <span>
                Estimated Arrival:{' '}
                <strong className="text-white font-mono">{lastPlacedOrder.estimatedDelivery}</strong>
              </span>
            </div>
            <div className="font-mono text-neutral-400">
              Tracking: <span className="text-amber-400">{lastPlacedOrder.trackingNumber}</span>
            </div>
          </div>

          {/* Logistics Stepper */}
          <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[11px] font-mono">
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-emerald-400" />
              <div className="text-emerald-400 font-semibold">Authorized</div>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-amber-400 animate-pulse" />
              <div className="text-amber-400 font-semibold">Silicon Staged</div>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-neutral-800" />
              <div className="text-neutral-500">Acoustic QA</div>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-neutral-800" />
              <div className="text-neutral-500">Air Express</div>
            </div>
          </div>
        </div>

        {/* Itemized Hardware Breakdown */}
        <div className="mt-6 space-y-3">
          <div className="text-xs font-semibold text-neutral-300 font-mono uppercase tracking-wider">
            Hardware Manifest
          </div>
          <div className="divide-y divide-neutral-900 rounded-xl border border-neutral-800 bg-neutral-900/30 p-4">
            {lastPlacedOrder.items.map((item) => (
              <div key={item.cartItemId} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.laptop.image}
                    alt={item.laptop.name}
                    className="h-12 w-12 rounded object-cover bg-neutral-950 border border-neutral-800 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate font-display">
                      {item.laptop.name}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">
                      {item.config.ram} · {item.config.storage} · {item.config.color}
                    </div>
                    <div className="text-[10px] text-neutral-500">Qty: {item.quantity}</div>
                  </div>
                </div>

                <div className="text-xs font-mono font-bold text-white tabular-nums shrink-0">
                  ${(item.itemPrice * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address & Payment Info */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4">
            <div className="font-semibold text-white mb-2 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-400" />
              <span>Delivery Destination</span>
            </div>
            <div className="text-neutral-400 space-y-0.5">
              <p className="text-white font-medium">{lastPlacedOrder.shippingAddress.fullName}</p>
              <p>{lastPlacedOrder.shippingAddress.street}</p>
              {lastPlacedOrder.shippingAddress.apartment && (
                <p>{lastPlacedOrder.shippingAddress.apartment}</p>
              )}
              <p>
                {lastPlacedOrder.shippingAddress.city}, {lastPlacedOrder.shippingAddress.postalCode}
              </p>
              <p>{lastPlacedOrder.shippingAddress.country}</p>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-4 flex flex-col justify-between">
            <div>
              <div className="font-semibold text-white mb-2">Payment Summary</div>
              <div className="text-neutral-400 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="text-white uppercase">{lastPlacedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white">${lastPlacedOrder.subtotal.toLocaleString()}</span>
                </div>
                {lastPlacedOrder.discount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Discount:</span>
                    <span>-${lastPlacedOrder.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span className="text-white">${lastPlacedOrder.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-emerald-400">
                    {lastPlacedOrder.shippingCost === 0 ? 'FREE' : `$${lastPlacedOrder.shippingCost}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-neutral-800 pt-2 flex justify-between font-mono font-bold text-sm text-white">
              <span>Paid Total:</span>
              <span className="text-amber-400">${lastPlacedOrder.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 border-t border-neutral-900 pt-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-medium text-neutral-300 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Invoice</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setLastPlacedOrder(null);
                setIsOrderHistoryOpen(true);
              }}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-200 border border-neutral-800 hover:text-white transition-colors cursor-pointer"
            >
              <span>View In Orders</span>
            </button>
            <button
              onClick={() => setLastPlacedOrder(null)}
              className="rounded-lg bg-amber-400 px-5 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors shadow-sm cursor-pointer"
            >
              <span>Back to Store</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
