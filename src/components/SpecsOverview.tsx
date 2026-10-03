import React from 'react';
import { LAPTOP_CATALOG } from '../data/laptops';
import { useCart } from '../context/CartContext';
import { Sliders, ShoppingBag, ArrowRight } from 'lucide-react';

export const SpecsOverview: React.FC = () => {
  const { setActiveConfigLaptop, addToCart } = useCart();

  return (
    <section id="specs" className="border-b border-neutral-800/80 bg-neutral-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <span>Engineering Directory</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-neutral-400">At a Glance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Technical Lineup Specifications
            </h2>
            <p className="mt-2 text-sm text-neutral-400 max-w-xl">
              Compare processor architectures, thermal limits, weight profiles, and price points.
            </p>
          </div>
          <div className="md:hidden text-[11px] font-mono text-neutral-500">
            Scroll horizontally to view full matrix →
          </div>
        </div>

        {/* Dense Technical Table */}
        <div className="mt-8 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/30 touch-pan-x">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/60 text-neutral-400 font-sans uppercase text-[11px]">
                <th className="py-4 px-5">Model</th>
                <th className="py-4 px-5">Silicon / Processor</th>
                <th className="py-4 px-5">Display</th>
                <th className="py-4 px-5">Weight</th>
                <th className="py-4 px-5">Battery</th>
                <th className="py-4 px-5">Base Price</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {LAPTOP_CATALOG.map((laptop) => (
                <tr key={laptop.id} className="hover:bg-neutral-900/50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-white font-sans text-sm">{laptop.name}</div>
                    <div className="text-[11px] text-neutral-500 font-sans">{laptop.categoryLabel}</div>
                  </td>
                  <td className="py-4 px-5 text-neutral-300 max-w-xs truncate">
                    {laptop.specs.processor}
                  </td>
                  <td className="py-4 px-5 text-neutral-300">
                    {laptop.specs.display.split('(')[0]}
                  </td>
                  <td className="py-4 px-5 text-neutral-300 tabular-nums">
                    {laptop.specs.weight}
                  </td>
                  <td className="py-4 px-5 text-neutral-300">
                    {laptop.specs.battery}
                  </td>
                  <td className="py-4 px-5 font-bold text-amber-400 tabular-nums text-sm">
                    ${laptop.basePrice.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => setActiveConfigLaptop(laptop)}
                        className="rounded bg-neutral-800 px-2.5 py-1.5 text-[11px] font-sans font-medium text-neutral-200 hover:bg-neutral-700 transition-colors cursor-pointer"
                      >
                        Config
                      </button>
                      <button
                        onClick={() => addToCart(laptop)}
                        className="rounded bg-amber-400 px-3 py-1.5 text-[11px] font-sans font-bold text-neutral-950 hover:bg-amber-300 transition-colors cursor-pointer"
                      >
                        Order
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
