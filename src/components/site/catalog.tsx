'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Search, X, ArrowUpDown, Star } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatPrice, formatPriceShort, calculateDiscount } from '@/lib/format';
import type { Product, Category, SortOption } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'popular';

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Popular', value: 'popular' },
];

export function Catalog() {
  const { filters, setFilter, resetFilters, openProductModal } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceBounds, setPriceBounds] = useState<[number, number]>([0, 200000]);
  const [sortOpen, setSortOpen] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => {});
  }, []);

  // Fetch products whenever filters change (debounced for search)
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const t = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        if (filters.category && filters.category !== 'all') params.set('category', filters.category);
        if (filters.search) params.set('search', filters.search);
        if (filters.featuredOnly) params.set('featured', 'true');
        params.set('minPrice', String(filters.minPrice));
        params.set('maxPrice', String(filters.maxPrice));
        params.set('sort', filters.sort);
        params.set('limit', '200');

        const res = await fetch(`/api/products?${params}`, { signal: controller.signal });
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
        }
      } catch (e: any) {
        if (e.name !== 'AbortError') console.error(e);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [filters]);

  const totalFound = products.length;

  const handleReset = () => {
    resetFilters();
    setShowMobileFilters(false);
  };

  return (
    <section id="catalog" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 mb-10"
        >
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[12px] uppercase tracking-[0.18em] text-primary font-semibold mb-2">
                The Collection
              </div>
              <h2 className="font-fraunces text-hero text-foreground text-balance">
                Browse our furniture catalog
              </h2>
              <p className="text-muted-foreground mt-2 text-base">
                Hand-picked office furniture for every workspace — chairs, tables, workstations, and more.
              </p>
            </div>
            <div className="text-[14px] text-muted-foreground">
              {loading ? 'Loading...' : (
                <span><span className="font-semibold text-foreground">{totalFound}</span> {totalFound === 1 ? 'item' : 'items'} found</span>
              )}
            </div>
          </div>

          {/* Search + sort bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
                placeholder="Search chairs, tables, materials..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-card border border-border text-[14px] font-medium text-foreground hover:bg-accent/60 transition-colors w-full sm:w-auto justify-center"
              >
                <ArrowUpDown className="w-4 h-4" />
                <span>{SORT_OPTIONS.find((o) => o.value === filters.sort)?.label || 'Sort'}</span>
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 z-20 w-56 glass rounded-2xl p-1.5 shadow-soft-lg"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setFilter('sort', opt.value);
                            setSortOpen(false);
                          }}
                          className={cn(
                            'w-full text-left px-3 py-2 rounded-xl text-[13px] font-medium transition-colors',
                            filters.sort === opt.value
                              ? 'bg-brand-gradient text-white'
                              : 'text-foreground hover:bg-accent/60'
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="sm:hidden flex items-center gap-2 px-5 py-3 rounded-full bg-card border border-border text-[14px] font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop sidebar filters */}
          <aside className="hidden sm:block w-64 shrink-0">
            <FilterPanel
              categories={categories}
              onReset={handleReset}
            />
          </aside>

          {/* Mobile filters drawer */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 sm:hidden"
              >
                <div
                  className="absolute inset-0 bg-background/80 backdrop-blur-xl"
                  onClick={() => setShowMobileFilters(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] glass p-6 overflow-y-auto scrollbar-elegant"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-fraunces text-xl font-semibold">Filters</h3>
                    <button onClick={() => setShowMobileFilters(false)} className="p-2 rounded-full hover:bg-accent/60">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterPanel categories={categories} onReset={handleReset} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-3xl overflow-hidden bg-card border border-border">
                    <Skeleton className="aspect-[4/3] w-full" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-10 w-full rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20 px-6">
                <div className="w-20 h-20 rounded-full bg-accent/60 flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-fraunces text-2xl font-semibold text-foreground">
                  No products found
                </h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Try adjusting your filters or search to find what you're looking for.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-5 py-2.5 rounded-full bg-brand-gradient text-white text-[14px] font-semibold"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {products.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductCard
                      product={p}
                      onClick={() => openProductModal(p.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterPanel({
  categories,
  onReset,
}: {
  categories: Category[];
  onReset: () => void;
}) {
  const { filters, setFilter } = useStore();

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-3">
          Categories
        </h4>
        <div className="space-y-1">
          <CategoryButton
            active={filters.category === 'all'}
            onClick={() => setFilter('category', 'all')}
            label="All Furniture"
            count={categories.reduce((sum, c) => sum + (c._count?.products || 0), 0)}
          />
          {categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              active={filters.category === cat.slug}
              onClick={() => setFilter('category', cat.slug)}
              label={cat.name}
              count={cat._count?.products || 0}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-3">
          Price Range
        </h4>
        <div className="flex items-center justify-between mb-2 text-[13px]">
          <span className="font-medium text-foreground">
            {formatPriceShort(filters.minPrice)}
          </span>
          <span className="font-medium text-foreground">
            {formatPriceShort(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={200000}
          step={5000}
          value={filters.maxPrice}
          onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
          className="w-full h-2 bg-accent rounded-full appearance-none cursor-pointer accent-[oklch(0.55_0.13_50)]"
        />
        <div className="flex gap-2 mt-3">
          <div className="flex-1">
            <label className="text-[11px] text-muted-foreground">Min</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilter('minPrice', Number(e.target.value))}
              className="w-full px-2.5 py-1.5 rounded-lg bg-card border border-border text-[12px]"
            />
          </div>
          <div className="flex-1">
            <label className="text-[11px] text-muted-foreground">Max</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
              className="w-full px-2.5 py-1.5 rounded-lg bg-card border border-border text-[12px]"
            />
          </div>
        </div>
      </div>

      {/* Featured Only */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.featuredOnly}
            onChange={(e) => setFilter('featuredOnly', e.target.checked)}
            className="w-4 h-4 accent-[oklch(0.55_0.13_50)]"
          />
          <span className="text-[14px] font-medium text-foreground">Featured only</span>
        </label>
      </div>

      <button
        onClick={onReset}
        className="w-full px-4 py-2.5 rounded-full border border-border text-[13px] font-medium text-foreground hover:bg-accent/60 transition-colors"
      >
        Reset filters
      </button>
    </div>
  );
}

function CategoryButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-all',
        active
          ? 'bg-brand-gradient text-white shadow-soft'
          : 'text-foreground hover:bg-accent/60'
      )}
    >
      <span>{label}</span>
      <span className={cn('text-[11px]', active ? 'text-white/80' : 'text-muted-foreground')}>
        {count}
      </span>
    </button>
  );
}
