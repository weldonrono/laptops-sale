import React from 'react';
import { ArrowRight, Sparkles, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { LAPTOP_CATALOG } from '../data/laptops';
import { useCart } from '../context/CartContext';
import heroImage from '../assets/images/hero_laptop_flagship_1790936310411.jpg';

export const Hero: React.FC = () => {
  const { setActiveConfigLaptop, addToCart } = useCart();
  const flagship = LAPTOP_CATALOG[0];

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-neutral-800/80 bg-neutral-950 pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background ambient lighting subtle gradient */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Subtle lead-in editorial meta */}
          <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-400/90 mb-4">
            <span>Next-Generation Architecture</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Available Globally</span>
          </div>

          {/* Headline with text-wrap balance to avoid single trailing words */}
          <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            Engineering Without Compromise.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed">
            Custom 3nm neural silicon, factory-calibrated 1,600-nit Mini-LED displays, and
            aerospace-grade CNC aluminum unibodies. Built specifically for developers, creators, and power users.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0">
            <button
              onClick={() => setActiveConfigLaptop(flagship)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-neutral-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer min-h-[44px]"
            >
              <span>Configure VIDAL 254 Pro 16</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={scrollToFeatures}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-200 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Scroll Feature Tour</span>
            </button>
          </div>

          {/* Clean unboxed proof points without pills */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-neutral-400 px-2">
            <span>From $2,499</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Up to 128GB Unified Memory</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>21-Hour Flight Battery</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Free Express Worldwide Delivery</span>
          </div>

          {/* Focal Image Container with clean elevation and styled fallback */}
          <div className="relative mt-10 sm:mt-12 w-full max-w-5xl rounded-2xl border border-neutral-800/80 bg-neutral-900/60 p-2 sm:p-4 shadow-2xl backdrop-blur-sm">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-950">
              <img
                src={heroImage}
                alt="VIDAL 254 Pro 16 Flagship Laptop on obsidian studio desk"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
              {/* Subtle film grain & gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent pointer-events-none" />

              {/* In-hero specs strip */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-3 rounded-xl bg-neutral-950/90 p-2.5 sm:p-4 backdrop-blur-md border border-neutral-800/80 text-left">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400">
                    <Cpu className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400">Processor Matrix</div>
                    <div className="text-xs sm:text-sm font-semibold text-white truncate max-w-[180px] sm:max-w-none">
                      VIDAL X2 Ultra (16 CPU / 40 GPU)
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-400/10 border border-blue-400/20 text-blue-400">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-neutral-400">Display Luminance</div>
                    <div className="text-sm font-semibold text-white">1,600 Nits Liquid Mini-LED</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => addToCart(flagship)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-100 px-3.5 py-2 text-xs font-bold text-neutral-950 hover:bg-white transition-colors cursor-pointer min-h-[36px]"
                  >
                    <span>Instant Bag Add</span>
                    <span className="font-mono tabular-nums text-neutral-700">$2,499</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
