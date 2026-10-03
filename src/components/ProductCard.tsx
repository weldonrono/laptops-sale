import React from 'react';
import { Laptop } from '../types/laptop';
import { useCart } from '../context/CartContext';
import { Sliders, ShoppingBag, Check, Star } from 'lucide-react';

interface ProductCardProps {
  laptop: Laptop;
}

export const ProductCard: React.FC<ProductCardProps> = ({ laptop }) => {
  const { addToCart, setActiveConfigLaptop, toggleCompareLaptop, selectedCompareLaptops } = useCart();
  const isCompared = selectedCompareLaptops.includes(laptop.id);

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-700 hover:shadow-xl hover:shadow-black/40">
      <div>
        {/* Top line metadata: Category & Status */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
          <span className="font-mono uppercase tracking-wider text-[11px] text-neutral-400">
            {laptop.categoryLabel}
          </span>
          {laptop.badge ? (
            <span className="text-[11px] font-medium text-amber-400/90">{laptop.badge}</span>
          ) : (
            <span className="text-[11px] text-neutral-500">{laptop.leadTime}</span>
          )}
        </div>

        {/* Product Image Stage (65-75% visual dominance with solid neutral backdrop) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-950/80 border border-neutral-900/60 p-2 flex items-center justify-center">
          <img
            src={laptop.image}
            alt={laptop.name}
            className="h-full w-full object-cover rounded transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Quick specs pill-free hover overlay */}
          <div className="absolute inset-x-2 bottom-2 rounded bg-neutral-950/90 p-2 text-[11px] font-mono text-neutral-300 opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 border border-neutral-800 flex items-center justify-between">
            <span>{laptop.specs.memory}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{laptop.specs.weight}</span>
          </div>
        </div>

        {/* Product Title & Tagline */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-white font-display group-hover:text-amber-400 transition-colors">
            {laptop.name}
          </h3>
          <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {laptop.tagline}
          </p>
        </div>

        {/* Clean Spec Line without Pill Badges */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-neutral-400 font-mono">
          <span>{laptop.specs.display.split('(')[0]}</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>{laptop.options.ram[0].value} Base</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>{laptop.options.storage[0].value}</span>
        </div>

        {/* Available Colorway Swatches */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-[11px] text-neutral-500 mr-1">Finishes:</span>
          {laptop.options.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className={`h-3.5 w-3.5 rounded-full border border-neutral-700/80 ${c.previewClass}`}
            />
          ))}
        </div>
      </div>

      {/* Card Footer: Price & Primary CTAs */}
      <div className="mt-6 border-t border-neutral-800/80 pt-4">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-xs text-neutral-500">Starting at</span>
            <div className="text-xl font-bold font-mono text-white tabular-nums">
              ${laptop.basePrice.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-400 font-mono">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{laptop.rating}</span>
            <span className="text-neutral-500">({laptop.reviewCount})</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveConfigLaptop(laptop)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-neutral-800 px-3 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors cursor-pointer border border-neutral-700/60"
          >
            <Sliders className="h-3.5 w-3.5 text-amber-400" />
            <span>Configure</span>
          </button>

          <button
            onClick={() => addToCart(laptop)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 px-3 py-2 text-xs font-semibold text-neutral-950 hover:bg-amber-300 transition-colors shadow-sm cursor-pointer"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>

        <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-500">
          <button
            onClick={() => toggleCompareLaptop(laptop.id)}
            className={`transition-colors cursor-pointer flex items-center gap-1 ${
              isCompared ? 'text-amber-400 font-medium' : 'hover:text-neutral-300'
            }`}
          >
            {isCompared ? <Check className="h-3 w-3" /> : <span>+</span>}
            <span>{isCompared ? 'In Compare List' : 'Compare Specs'}</span>
          </button>

          <span>Ships worldwide</span>
        </div>
      </div>
    </div>
  );
};
