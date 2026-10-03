import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, X, Info } from 'lucide-react';

export const Toasts: React.FC = () => {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 rounded-xl border border-neutral-700 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200"
        >
          <CheckCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-white font-display">{toast.title}</h5>
            <p className="mt-0.5 text-xs text-neutral-300 leading-normal">{toast.description}</p>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
