import React, { useState } from 'react';
import { ShoppingBag, SlidersHorizontal, Package, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsOrderHistoryOpen, setIsCompareOpen, orders } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Two-line stacked Brand mark with COMPUTING underneath */}
        <a
          href="/"
          className="flex flex-col items-start leading-none transition-opacity hover:opacity-85 font-display py-1"
          aria-label="VIDAL254 COMPUTING Home"
        >
          <span className="text-lg sm:text-xl font-black tracking-tight text-white">
            VIDAL<span className="text-amber-400">254</span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.28em] text-neutral-400 uppercase font-semibold mt-0.5">
            COMPUTING
          </span>
        </a>

        {/* Zone 2: Desktop clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <a
            href="#laptops"
            onClick={(e) => scrollToSection(e, 'laptops')}
            className="hover:text-white transition-colors"
          >
            Laptops
          </a>
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, 'features')}
            className="hover:text-white transition-colors"
          >
            Architecture
          </a>
          <a
            href="#specs"
            onClick={(e) => scrollToSection(e, 'specs')}
            className="hover:text-white transition-colors"
          >
            Specifications
          </a>
          <button
            onClick={() => setIsCompareOpen(true)}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-amber-400" />
            <span>Compare Models</span>
          </button>
          <a
            href="#craftsmanship"
            onClick={(e) => scrollToSection(e, 'craftsmanship')}
            className="hover:text-white transition-colors"
          >
            Craftsmanship
          </a>
        </nav>

        {/* Zone 3: Primary Actions (Orders, Bag, and Mobile Menu Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {orders.length > 0 && (
            <button
              onClick={() => setIsOrderHistoryOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white px-3 py-2 rounded-lg hover:bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer min-h-[40px]"
              title="View your orders"
            >
              <Package className="h-3.5 w-3.5 text-neutral-400" />
              <span>Orders ({orders.length})</span>
            </button>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3 sm:px-3.5 py-2 text-xs font-semibold text-white border border-neutral-700/80 hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer min-h-[40px]"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="h-4 w-4 text-amber-400" />
            <span className="font-mono tabular-nums">{cartCount > 0 ? `${cartCount} Items` : 'Bag'}</span>
            {cartCount > 0 && (
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors min-h-[40px] min-w-[40px] cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950/98 backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            <a
              href="#laptops"
              onClick={(e) => scrollToSection(e, 'laptops')}
              className="flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:bg-neutral-900 transition-colors"
            >
              <span>Laptops & Notebooks</span>
              <ArrowRight className="h-4 w-4 text-neutral-500" />
            </a>
            <a
              href="#features"
              onClick={(e) => scrollToSection(e, 'features')}
              className="flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:bg-neutral-900 transition-colors"
            >
              <span>Architecture & Features</span>
              <ArrowRight className="h-4 w-4 text-neutral-500" />
            </a>
            <a
              href="#specs"
              onClick={(e) => scrollToSection(e, 'specs')}
              className="flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:bg-neutral-900 transition-colors"
            >
              <span>Technical Specifications</span>
              <ArrowRight className="h-4 w-4 text-neutral-500" />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCompareOpen(true);
              }}
              className="flex items-center justify-between w-full py-3 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:bg-neutral-900 transition-colors text-left cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-amber-400" />
                <span>Compare Models</span>
              </span>
              <ArrowRight className="h-4 w-4 text-neutral-500" />
            </button>
            <a
              href="#craftsmanship"
              onClick={(e) => scrollToSection(e, 'craftsmanship')}
              className="flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:bg-neutral-900 transition-colors"
            >
              <span>Craftsmanship & Philosophy</span>
              <ArrowRight className="h-4 w-4 text-neutral-500" />
            </a>
            {orders.length > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsOrderHistoryOpen(true);
                }}
                className="flex items-center justify-between w-full py-3 px-3 rounded-lg text-sm font-medium text-amber-400 hover:bg-neutral-900 transition-colors text-left cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>My Orders ({orders.length})</span>
                </span>
                <ArrowRight className="h-4 w-4 text-amber-400" />
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

