import React from 'react';
import { useCart } from '../context/CartContext';
import { LAPTOP_CATALOG } from '../data/laptops';
import { X, Check, ShoppingBag, Plus } from 'lucide-react';

export const CompareModal: React.FC = () => {
  const {
    isCompareOpen,
    setIsCompareOpen,
    selectedCompareLaptops,
    toggleCompareLaptop,
    addToCart,
    setActiveConfigLaptop,
  } = useCart();

  if (!isCompareOpen) return null;

  const comparedLaptops = LAPTOP_CATALOG.filter((l) => selectedCompareLaptops.includes(l.id));

  const specRows = [
    { label: 'Base Price', key: 'price', format: (l: (typeof LAPTOP_CATALOG)[0]) => `$${l.basePrice.toLocaleString()}` },
    { label: 'Category', key: 'cat', format: (l: (typeof LAPTOP_CATALOG)[0]) => l.categoryLabel },
    { label: 'Silicon Architecture', key: 'proc', format: (l: (typeof LAPTOP_CATALOG)[0]) => l.specs.processor },
    { label: 'Graphics & GPU Engine', key: 'gpu', format: (l: (typeof LAPTOP_CATALOG)[0]) => l.specs.graphics },
    { label: 'Display Panel & Nits', key: 'disp', format: (l: (typeof LAPTOP_CATALOG)[0]) => l.specs.display },
    { label: 'Memory Limits', key: 'ram', format: (l: (typeof LAPTOP_CATALOG)[0]) => `Up to ${l.options.ram[l.options.ram.length - 1].value}` },
    { label: 'Storage Limits', key: 'ssd', format: (l: (typeof LAPTOP_CATALOG)[0]) => `Up to ${l.options.storage[l.options.storage.length - 1].value}` },
    { label: 'Battery Capacity', key: 'bat', format: (l: (typeof LAPTOP_CATALOG)[0]) => l.specs.battery },
    { label: 'Chassis Weight', key: 'wt', format: (l: (typeof LAPTOP_CATALOG)[0]) => l.specs.weight },
    { label: 'I/O Ports Matrix', key: 'ports', format: (l: (typeof LAPTOP_CATALOG)[0]) => l.specs.ports.join(', ') },
    { label: 'Wireless Standard', key: 'wifi', format: (l: (typeof LAPTOP_CATALOG)[0]) => l.specs.wireless },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setIsCompareOpen(false)}
          className="absolute right-5 top-5 rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
          aria-label="Close compare modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="pb-6 border-b border-neutral-900">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
            Side-By-Side Technical Audit
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Compare VIDAL254 Specifications
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Select up to 3 models to analyze thermal ceilings, silicon bandwidth, and display calibration.
          </p>

          {/* Model selection pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {LAPTOP_CATALOG.map((laptop) => {
              const isSelected = selectedCompareLaptops.includes(laptop.id);
              return (
                <button
                  key={laptop.id}
                  onClick={() => toggleCompareLaptop(laptop.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-neutral-800 border-amber-400 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {isSelected ? <Check className="h-3 w-3 text-amber-400" /> : <Plus className="h-3 w-3" />}
                  <span>{laptop.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="py-4 pr-4 font-mono uppercase text-[11px] w-1/4">Specification</th>
                {comparedLaptops.map((laptop) => (
                  <th key={laptop.id} className="py-4 px-4 w-1/3">
                    <div className="flex flex-col">
                      <div className="aspect-[4/3] w-24 overflow-hidden rounded bg-neutral-900 mb-2">
                        <img
                          src={laptop.image}
                          alt={laptop.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-bold text-sm text-white font-display">{laptop.name}</span>
                      <span className="text-[11px] text-amber-400 font-mono mt-0.5">
                        From ${laptop.basePrice.toLocaleString()}
                      </span>
                      <div className="mt-2 flex gap-1.5">
                        <button
                          onClick={() => {
                            addToCart(laptop);
                            setIsCompareOpen(false);
                          }}
                          className="px-2.5 py-1 rounded bg-amber-400 text-neutral-950 font-semibold text-[11px] hover:bg-amber-300 transition-colors cursor-pointer"
                        >
                          Add to Bag
                        </button>
                        <button
                          onClick={() => {
                            setActiveConfigLaptop(laptop);
                            setIsCompareOpen(false);
                          }}
                          className="px-2 py-1 rounded bg-neutral-800 text-neutral-200 text-[11px] hover:bg-neutral-700 transition-colors cursor-pointer"
                        >
                          Custom
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 font-mono">
              {specRows.map((row) => (
                <tr key={row.key} className="hover:bg-neutral-900/30">
                  <td className="py-3.5 pr-4 text-neutral-400 font-sans font-medium text-xs">
                    {row.label}
                  </td>
                  {comparedLaptops.map((laptop) => (
                    <td key={laptop.id} className="py-3.5 px-4 text-neutral-200 leading-relaxed tabular-nums">
                      {row.format(laptop)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
