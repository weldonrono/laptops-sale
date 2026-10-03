import React, { useState, useMemo } from 'react';
import { LAPTOP_CATALOG } from '../data/laptops';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

type CategoryFilter = 'all' | 'creator' | 'ultrabook' | 'gaming' | 'business';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const { setIsCompareOpen, selectedCompareLaptops } = useCart();

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Models' },
    { id: 'creator', label: 'Creator & Studio' },
    { id: 'ultrabook', label: 'Ultrabooks & Travel' },
    { id: 'gaming', label: 'Gaming & AI Workstations' },
    { id: 'business', label: 'Executive & Enterprise' },
  ];

  const filteredLaptops = useMemo(() => {
    return LAPTOP_CATALOG.filter((laptop) => {
      const matchesCategory = selectedCategory === 'all' || laptop.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        laptop.name.toLowerCase().includes(q) ||
        laptop.tagline.toLowerCase().includes(q) ||
        laptop.specs.processor.toLowerCase().includes(q) ||
        laptop.specs.display.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="laptops" className="border-b border-neutral-800/80 bg-neutral-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <span>Catalog & Configurator</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-neutral-400">Precision Lineup</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Select Your Silicon Machine
            </h2>
            <p className="mt-2 text-sm text-neutral-400 max-w-xl">
              From featherweight 1.08kg fanless ultrabooks to liquid-metal 150W studio workstations.
            </p>
          </div>

          {/* Quick Compare trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-medium text-neutral-200 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-amber-400" />
              <span>Compare Models ({selectedCompareLaptops.length})</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Tabs (Segmented Controls) */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 no-scrollbar p-1 bg-neutral-900/60 rounded-xl border border-neutral-800/80">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search silicon, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg bg-neutral-900/90 pl-9 pr-8 py-1.5 text-xs text-white placeholder-neutral-500 border border-neutral-800 focus:border-amber-400 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  title="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg bg-neutral-900/90 px-3 py-1.5 text-xs text-neutral-200 border border-neutral-800 focus:border-amber-400 focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredLaptops.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLaptops.map((laptop) => (
              <ProductCard key={laptop.id} laptop={laptop} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-12 text-center">
            <p className="text-neutral-400 text-sm">No models found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 inline-flex items-center text-xs font-semibold text-amber-400 hover:text-amber-300"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
