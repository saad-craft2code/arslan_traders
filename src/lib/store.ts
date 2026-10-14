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
  isFiltersOpen: boolean;
  isProductModalOpen: boolean;
  selectedProductId: string | null;
  isMobileMenuOpen: boolean;

  // Filter state
  filters: FilterState;

  // Actions
  setSelectedProduct: (id: string | null) => void;
  openProductModal: (id: string) => void;
  closeProductModal: () => void;
  setFiltersOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
};

export const useStore = create<StoreState>((set) => ({
  isFiltersOpen: false,
  isProductModalOpen: false,
  selectedProductId: null,
  isMobileMenuOpen: false,

  filters: DEFAULT_FILTERS,

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
}));
