import { create } from 'zustand';
import type { FilterState, SortOption } from '@/lib/types';

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  search: '',
  minPrice: 0,
  maxPrice: 200000,
  sort: 'newest',
  featuredOnly: false,
};

type StoreState = {
  // UI state
  isCartOpen: boolean;
  isFiltersOpen: boolean;
  isProductModalOpen: boolean;
  selectedProductId: string | null;
  isMobileMenuOpen: boolean;

  // Filter state
  filters: FilterState;

  // Admin panel state
  isAdminOpen: boolean;
  adminView: 'products' | 'add-product' | 'categories' | 'add-category' | 'settings';

  // Actions
  setSelectedProduct: (id: string | null) => void;
  openProductModal: (id: string) => void;
  closeProductModal: () => void;
  setFiltersOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  setAdminOpen: (open: boolean) => void;
  setAdminView: (view: 'products' | 'add-product' | 'categories' | 'add-category' | 'settings') => void;
};

export const useStore = create<StoreState>((set) => ({
  isCartOpen: false,
  isFiltersOpen: false,
  isProductModalOpen: false,
  selectedProductId: null,
  isMobileMenuOpen: false,

  filters: DEFAULT_FILTERS,

  isAdminOpen: false,
  adminView: 'products',

  setSelectedProduct: (id) => set({ selectedProductId: id }),
  openProductModal: (id) => set({ isProductModalOpen: true, selectedProductId: id }),
  closeProductModal: () => set({ isProductModalOpen: false, selectedProductId: null }),
  setFiltersOpen: (open) => set({ isFiltersOpen: open }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
  setAdminOpen: (open) => set({ isAdminOpen: open }),
  setAdminView: (view) => set({ adminView: view }),
}));
