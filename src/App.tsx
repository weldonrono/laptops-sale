import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureShowcase } from './components/FeatureShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { SpecsOverview } from './components/SpecsOverview';
import { Craftsmanship } from './components/Craftsmanship';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ConfiguratorModal } from './components/ConfiguratorModal';
import { CompareModal } from './components/CompareModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { Toasts } from './components/Toasts';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Banner with Flagship focal point */}
          <Hero />

          {/* Interactive "Scroll to See Features" Layer Showcase */}
          <FeatureShowcase />

          {/* Product Catalog & Laptop Sales Grid with Add-to-Cart */}
          <ProductCatalog />

          {/* Technical Specifications Overview */}
          <SpecsOverview />

          {/* Craftsmanship & Silicon Philosophy */}
          <Craftsmanship />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <ConfiguratorModal />
        <CompareModal />
        <CheckoutModal />
        <OrderSuccessModal />
        <OrderHistoryModal />
        <Toasts />
      </div>
    </CartProvider>
  );
}
