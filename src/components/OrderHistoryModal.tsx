import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Package, Calendar, MapPin, Truck, ChevronRight } from 'lucide-react';

export const OrderHistoryModal: React.FC = () => {
  const { isOrderHistoryOpen, setIsOrderHistoryOpen, orders, setLastPlacedOrder } = useCart();

  if (!isOrderHistoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setIsOrderHistoryOpen(false)}
          className="absolute right-5 top-5 rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
          aria-label="Close order history"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-6 border-b border-neutral-900">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
            <Package className="h-3.5 w-3.5" />
            <span>Silicon Dispatch Records</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            My Orders & Tracking
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Real-time status of your custom laptops and shipping consignments.
          </p>
        </div>

        {/* Orders List */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto pr-1 space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center">
              <Package className="h-12 w-12 text-neutral-600 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white">No Previous Orders Found</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Configure any VIDAL254 laptop from our catalog to place your first silicon order.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderId}
                className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-5 space-y-4 hover:border-neutral-700 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800/60">
                  <div>
                    <span className="text-sm font-bold text-white font-mono">
                      Order #{order.orderId}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                      <Calendar className="h-3 w-3 text-neutral-500" />
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-amber-400">{order.trackingNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-white tabular-nums">
                      ${order.total.toLocaleString()}
                    </span>
                    <button
                      onClick={() => {
                        setLastPlacedOrder(order);
                        setIsOrderHistoryOpen(false);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                    >
                      <span>View Receipt</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.laptop.image}
                          alt={item.laptop.name}
                          className="h-8 w-8 rounded object-cover bg-neutral-900 border border-neutral-800"
                        />
                        <div>
                          <span className="font-semibold text-neutral-200">{item.laptop.name}</span>
                          <span className="text-neutral-500 text-[11px] font-mono ml-2">
                            ({item.config.ram} / {item.config.storage})
                          </span>
                        </div>
                      </div>
                      <div className="font-mono text-neutral-400">
                        Qty {item.quantity} · ${(item.itemPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-3 w-3 text-emerald-400" />
                    <span>Estimated arrival: {order.estimatedDelivery}</span>
                  </span>
                  <span>Destination: {order.shippingAddress.city}, {order.shippingAddress.country}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
