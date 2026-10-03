import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { LaptopConfig } from '../types/laptop';
import { X, Check, ShieldCheck, Truck, RefreshCw, ShoppingBag, ArrowRight } from 'lucide-react';

export const ConfiguratorModal: React.FC = () => {
  const { activeConfigLaptop, setActiveConfigLaptop, addToCart, setIsCheckoutOpen } = useCart();

  const [selectedRam, setSelectedRam] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [selectedDisplay, setSelectedDisplay] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    if (activeConfigLaptop) {
      setSelectedRam(activeConfigLaptop.options.ram[0].value);
      setSelectedStorage(activeConfigLaptop.options.storage[0].value);
      if (activeConfigLaptop.options.display && activeConfigLaptop.options.display.length > 0) {
        setSelectedDisplay(activeConfigLaptop.options.display[0].value);
      } else {
        setSelectedDisplay(undefined);
      }
      setSelectedColor(activeConfigLaptop.options.colors[0].name);
    }
  }, [activeConfigLaptop]);

  if (!activeConfigLaptop) return null;

  const currentRamOption = activeConfigLaptop.options.ram.find((r) => r.value === selectedRam);
  const currentStorageOption = activeConfigLaptop.options.storage.find((s) => s.value === selectedStorage);
  const currentDisplayOption = activeConfigLaptop.options.display?.find((d) => d.value === selectedDisplay);
  const currentColorOption = activeConfigLaptop.options.colors.find((c) => c.name === selectedColor);

  const ramUpgradePrice = currentRamOption?.price || 0;
  const storageUpgradePrice = currentStorageOption?.price || 0;
  const displayUpgradePrice = currentDisplayOption?.price || 0;

  const calculatedTotal =
    activeConfigLaptop.basePrice + ramUpgradePrice + storageUpgradePrice + displayUpgradePrice;

  const handleAddToCart = () => {
    const customConfig: LaptopConfig = {
      ram: selectedRam,
      ramPrice: ramUpgradePrice,
      storage: selectedStorage,
      storagePrice: storageUpgradePrice,
      displayUpgrade: selectedDisplay,
      displayPrice: displayUpgradePrice,
      color: selectedColor,
      colorHex: currentColorOption?.hex || '#000',
    };

    addToCart(activeConfigLaptop, customConfig);
    setActiveConfigLaptop(null);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setActiveConfigLaptop(null)}
          className="absolute right-5 top-5 rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-6 border-b border-neutral-900">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
            Custom Specification Workshop
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Configure {activeConfigLaptop.name}
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Tailor unified silicon, storage bandwidth, and precision finish to your workflow.
          </p>
        </div>

        {/* Modal Body */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual & Live Summary */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-900/60 border border-neutral-800 p-3 flex items-center justify-center">
              <img
                src={activeConfigLaptop.image}
                alt={activeConfigLaptop.name}
                className="h-full w-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 rounded bg-neutral-950/80 px-2 py-1 text-[11px] font-mono text-neutral-300 border border-neutral-800">
                {selectedColor}
              </div>
            </div>

            {/* Selected Spec Breakdown */}
            <div className="rounded-xl bg-neutral-900/40 p-4 border border-neutral-800/80 text-xs space-y-2.5">
              <div className="font-semibold text-white">Your Custom Architecture:</div>
              <div className="flex justify-between text-neutral-400">
                <span>Processor:</span>
                <span className="text-white text-right font-mono truncate max-w-[180px]">
                  {activeConfigLaptop.specs.processor.split('(')[0]}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Memory:</span>
                <span className="text-white font-mono">{selectedRam}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Fast Storage:</span>
                <span className="text-white font-mono">{selectedStorage}</span>
              </div>
              {selectedDisplay && (
                <div className="flex justify-between text-neutral-400">
                  <span>Display Glass:</span>
                  <span className="text-white font-mono capitalize">{selectedDisplay}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Chassis Finish:</span>
                <span className="text-white">{selectedColor}</span>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-2 gap-3 text-[11px] text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>Express courier</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>3-Year Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>30-Day Return</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Hand-Calibrated</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Configurator Selectors */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Color Finish Picker */}
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-2.5">
                Exterior Finish: <span className="text-amber-400 font-normal">{selectedColor}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {activeConfigLaptop.options.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs transition-colors cursor-pointer text-left ${
                      selectedColor === c.name
                        ? 'border-amber-400 bg-neutral-900 text-white'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className={`h-4 w-4 rounded-full border border-neutral-700 ${c.previewClass}`} />
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* RAM Picker */}
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-2.5">
                Memory Architecture:
              </label>
              <div className="space-y-2">
                {activeConfigLaptop.options.ram.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setSelectedRam(r.value)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                      selectedRam === r.value
                        ? 'border-amber-400 bg-neutral-900 text-white'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${selectedRam === r.value ? 'bg-amber-400' : 'bg-neutral-700'}`} />
                      <span className="font-semibold">{r.label}</span>
                    </div>
                    <span className="font-mono text-neutral-400 tabular-nums">
                      {r.price === 0 ? 'Included' : `+$${r.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Picker */}
            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-2.5">
                High-Speed NVMe Storage:
              </label>
              <div className="space-y-2">
                {activeConfigLaptop.options.storage.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedStorage(s.value)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                      selectedStorage === s.value
                        ? 'border-amber-400 bg-neutral-900 text-white'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${selectedStorage === s.value ? 'bg-amber-400' : 'bg-neutral-700'}`} />
                      <span className="font-semibold">{s.label}</span>
                    </div>
                    <span className="font-mono text-neutral-400 tabular-nums">
                      {s.price === 0 ? 'Included' : `+$${s.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Display Coating Picker */}
            {activeConfigLaptop.options.display && (
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-2.5">
                  Display Glass Formulation:
                </label>
                <div className="space-y-2">
                  {activeConfigLaptop.options.display.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDisplay(d.value)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                        selectedDisplay === d.value
                          ? 'border-amber-400 bg-neutral-900 text-white'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${selectedDisplay === d.value ? 'bg-amber-400' : 'bg-neutral-700'}`} />
                        <span className="font-semibold">{d.label}</span>
                      </div>
                      <span className="font-mono text-neutral-400 tabular-nums">
                        {d.price === 0 ? 'Included' : `+$${d.price}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer / Price & Purchase Bar */}
        <div className="mt-8 border-t border-neutral-900 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-neutral-500">Configured Total Price</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              ${calculatedTotal.toLocaleString()}
            </div>
            <div className="text-[11px] text-neutral-400">
              Tax calculated at checkout · Free Worldwide Express Delivery
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-xs font-semibold text-neutral-200 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Shopping Bag</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              <span>Instant Buy</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
