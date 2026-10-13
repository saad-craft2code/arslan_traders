'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Plus, Pencil, Trash2, Package, Tag, LayoutGrid, Image as ImageIcon,
  Upload, ChevronRight, Check, AlertCircle, ArrowLeft, Settings,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatPrice, calculateDiscount } from '@/lib/format';
import type { Product, Category } from '@/lib/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export function AdminPanel() {
  const { isAdminOpen, setAdminOpen, adminView, setAdminView } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        fetch('/api/products?limit=200'),
        fetch('/api/categories'),
      ]);
      const pData = await pRes.json();
      const cData = await cRes.json();
      if (pData.products) setProducts(pData.products);
      if (Array.isArray(cData)) setCategories(cData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminOpen) refresh();
  }, [isAdminOpen]);

  // Lock scroll
  useEffect(() => {
    if (isAdminOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isAdminOpen]);

  return (
    <AnimatePresence>
      {isAdminOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80]"
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-md" onClick={() => setAdminOpen(false)} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-3xl bg-background shadow-soft-lg flex flex-col"
          >
            {/* Header */}
            <header className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                {adminView !== 'products' && adminView !== 'categories' && (
                  <button
                    onClick={() => setAdminView(adminView.startsWith('add') ? (adminView === 'add-product' ? 'products' : 'categories') : 'products')}
                    className="w-9 h-9 rounded-full hover:bg-accent/60 flex items-center justify-center"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">
                    Admin Dashboard
                  </div>
                  <h2 className="font-fraunces text-xl font-semibold leading-tight">
                    {adminView === 'products' && 'Manage Products'}
                    {adminView === 'add-product' && 'Add New Product'}
                    {adminView === 'categories' && 'Manage Categories'}
                    {adminView === 'add-category' && 'Add Category'}
                    {adminView === 'settings' && 'Settings'}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setAdminOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-accent/60 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto scrollbar-elegant">
              {adminView === 'products' && (
                <ProductsList
                  products={products}
                  categories={categories}
                  loading={loading}
                  onRefresh={refresh}
                  onAddNew={() => setAdminView('add-product')}
                />
              )}
              {adminView === 'add-product' && (
                <ProductForm
                  categories={categories}
                  product={null}
                  onSaved={() => { setAdminView('products'); refresh(); }}
                />
              )}
              {adminView === 'categories' && (
                <CategoriesList
                  categories={categories}
                  loading={loading}
                  onRefresh={refresh}
                  onAddNew={() => setAdminView('add-category')}
                />
              )}
              {adminView === 'add-category' && (
                <CategoryForm
                  category={null}
                  onSaved={() => { setAdminView('categories'); refresh(); }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ===== Products List =====
function ProductsList({
  products, categories, loading, onRefresh, onAddNew,
}: {
  products: Product[];
  categories: Category[];
  loading: boolean;
  onRefresh: () => void;
  onAddNew: () => void;
}) {
  const { setAdminView } = useStore();
  const [editing, setEditing] = useState<Product | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Product deleted');
        onRefresh();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (e) {
      toast.error('Failed to delete product');
    }
  };

  if (editing) {
    return (
      <ProductForm
        categories={categories}
        product={editing}
        onSaved={() => { setEditing(null); onRefresh(); }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="text-[14px] text-muted-foreground">
          {loading ? 'Loading...' : `${products.length} product${products.length !== 1 ? 's' : ''} in catalog`}
        </div>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-gradient text-white text-[14px] font-semibold hover:scale-[1.02] transition-transform"
        >
          <Plus className="w-4 h-4" />
          Add product
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-2xl border border-border">
              <Skeleton className="w-20 h-20 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-fraunces text-xl font-semibold">No products yet</h3>
          <p className="text-muted-foreground mt-1 text-[14px]">Add your first product to start building your catalog.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex gap-3 p-3 rounded-2xl border border-border bg-card hover:shadow-soft transition-shadow"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-accent/40 shrink-0">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    {p.category && (
                      <div className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                        {p.category.name}
                      </div>
                    )}
                    <h4 className="font-semibold text-[14px] text-foreground truncate">
                      {p.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[12px] text-muted-foreground">
                      <span>{formatPrice(p.salePrice || p.price)}</span>
                      {p.featured && (
                        <span className="px-1.5 py-0.5 rounded-full bg-brand-gradient text-white text-[9px] font-semibold">
                          FEATURED
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => setEditing(p)}
                      className="w-8 h-8 rounded-full hover:bg-accent/60 flex items-center justify-center"
                      aria-label="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      className="w-8 h-8 rounded-full hover:bg-destructive/15 text-destructive flex items-center justify-center"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== Product Form =====
function ProductForm({
  categories, product, onSaved, onCancel,
}: {
  categories: Category[];
  product: Product | null;
  onSaved: () => void;
  onCancel?: () => void;
}) {
  const isEdit = !!product;
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    salePrice: product?.salePrice?.toString() || '',
    categoryId: product?.categoryId || '',
    material: product?.material || '',
    color: product?.color || '',
    dimensions: product?.dimensions || '',
    weight: product?.weight || '',
    tags: product?.tags?.join(', ') || '',
    featured: product?.featured || false,
    inStock: product?.inStock ?? true,
    stock: product?.stock?.toString() || '1',
    images: product?.images || [] as string[],
  });

  const update = (k: string, v: any) => setForm({ ...form, [k]: v });

  const handleUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (data.url) uploaded.push(data.url);
        else toast.error(`Failed to upload: ${file.name}`);
      }
      update('images', [...form.images, ...uploaded]);
      toast.success(`${uploaded.length} image${uploaded.length !== 1 ? 's' : ''} uploaded`);
    } catch (e) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (idx: number) => {
    update('images', form.images.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price || !form.categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (form.images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }
    setSaving(true);
    try {
      const body = {
        name: form.name,
        description: form.description,
        price: form.price,
        salePrice: form.salePrice || null,
        categoryId: form.categoryId,
        material: form.material || null,
        color: form.color || null,
        dimensions: form.dimensions || null,
        weight: form.weight || null,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        featured: form.featured,
        inStock: form.inStock,
        stock: form.stock,
        images: form.images,
      };
      const res = isEdit
        ? await fetch(`/api/products/${product!.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
        : await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
      if (res.ok) {
        toast.success(isEdit ? 'Product updated' : 'Product created');
        onSaved();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to save product');
      }
    } catch (e) {
      toast.error('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="p-6 text-center py-20">
        <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="font-fraunces text-xl font-semibold">Add a category first</h3>
        <p className="text-muted-foreground mt-1 text-[14px]">You need at least one category before adding products.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      {/* Images */}
      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
          Photos *
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {form.images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-accent/40 group">
              <img src={img} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-brand-gradient text-white text-[9px] font-semibold">
                  COVER
                </span>
              )}
            </div>
          ))}
          <label className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary flex flex-col items-center justify-center cursor-pointer transition-colors bg-accent/30">
            {uploading ? (
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground mt-1">Upload</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleUpload(e.target.files)}
              disabled={uploading}
            />
          </label>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">First image will be used as the cover. You can also paste image URLs below.</p>
        <div className="flex gap-2 mt-2">
          <input
            type="url"
            placeholder="Paste image URL and click Add"
            id="img-url-input"
            className="flex-1 px-3 py-2 rounded-lg bg-card border border-border text-[12px]"
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById('img-url-input') as HTMLInputElement;
              if (input?.value) {
                update('images', [...form.images, input.value]);
                input.value = '';
              }
            }}
            className="px-3 py-2 rounded-lg bg-accent text-foreground text-[12px] font-medium"
          >
            Add URL
          </button>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
          Product Name *
        </label>
        <input
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          required
          placeholder="e.g. Executive High-Back Leather Chair"
          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
          Category *
        </label>
        <select
          value={form.categoryId}
          onChange={(e) => update('categoryId', e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
          Description *
        </label>
        <textarea
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          required
          rows={4}
          placeholder="Describe the product features, materials, and benefits..."
          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40 resize-y"
        />
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
            Price (Rs.) *
          </label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => update('price', e.target.value)}
            required
            min="0"
            placeholder="32000"
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
            Sale Price (optional)
          </label>
          <input
            type="number"
            value={form.salePrice}
            onChange={(e) => update('salePrice', e.target.value)}
            min="0"
            placeholder="28500"
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
            Material
          </label>
          <input
            value={form.material}
            onChange={(e) => update('material', e.target.value)}
            placeholder="Leather, Steel"
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
            Color
          </label>
          <input
            value={form.color}
            onChange={(e) => update('color', e.target.value)}
            placeholder="Black"
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
            Dimensions
          </label>
          <input
            value={form.dimensions}
            onChange={(e) => update('dimensions', e.target.value)}
            placeholder="70 x 70 x 130 cm"
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
            Weight
          </label>
          <input
            value={form.weight}
            onChange={(e) => update('weight', e.target.value)}
            placeholder="22 kg"
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
          Tags (comma-separated)
        </label>
        <input
          value={form.tags}
          onChange={(e) => update('tags', e.target.value)}
          placeholder="executive, leather, ergonomic"
          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>

      {/* Featured & Stock */}
      <div className="flex flex-wrap gap-5">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update('featured', e.target.checked)}
            className="w-4 h-4 accent-[oklch(0.55_0.13_50)]"
          />
          <span className="text-[14px] font-medium text-foreground">Featured product</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={(e) => update('inStock', e.target.checked)}
            className="w-4 h-4 accent-[oklch(0.55_0.13_50)]"
          />
          <span className="text-[14px] font-medium text-foreground">In stock</span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 px-5 py-3.5 rounded-full bg-brand-gradient text-white text-[14px] font-semibold hover:scale-[1.01] transition-transform disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              {isEdit ? 'Save changes' : 'Create product'}
            </>
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3.5 rounded-full border border-border text-foreground text-[14px] font-semibold hover:bg-accent/60"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// ===== Categories List =====
function CategoriesList({
  categories, loading, onRefresh, onAddNew,
}: {
  categories: Category[];
  loading: boolean;
  onRefresh: () => void;
  onAddNew: () => void;
}) {
  const { setAdminView } = useStore();
  const [editing, setEditing] = useState<Category | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? Products in this category will be orphaned.`)) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Category deleted');
        onRefresh();
      } else {
        toast.error('Failed to delete');
      }
    } catch (e) {
      toast.error('Failed to delete');
    }
  };

  if (editing) {
    return (
      <CategoryForm
        category={editing}
        onSaved={() => { setEditing(null); onRefresh(); }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="text-[14px] text-muted-foreground">
          {loading ? 'Loading...' : `${categories.length} categor${categories.length !== 1 ? 'ies' : 'y'}`}
        </div>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-gradient text-white text-[14px] font-semibold hover:scale-[1.02] transition-transform"
        >
          <Plus className="w-4 h-4" />
          Add category
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-card"
            >
              <div className="min-w-0">
                <h4 className="font-semibold text-[14px] text-foreground">{c.name}</h4>
                {c.description && (
                  <p className="text-[12px] text-muted-foreground line-clamp-1 mt-0.5">
                    {c.description}
                  </p>
                )}
                <div className="text-[11px] text-muted-foreground mt-1">
                  {c._count?.products || 0} products
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => setEditing(c)}
                  className="w-8 h-8 rounded-full hover:bg-accent/60 flex items-center justify-center"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(c.id, c.name)}
                  className="w-8 h-8 rounded-full hover:bg-destructive/15 text-destructive flex items-center justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== Category Form =====
function CategoryForm({
  category, onSaved, onCancel,
}: {
  category: Category | null;
  onSaved: () => void;
  onCancel?: () => void;
}) {
  const isEdit = !!category;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    icon: category?.icon || 'chair',
  });

  const ICON_OPTIONS = [
    { value: 'chair', label: 'Chair' },
    { value: 'table', label: 'Table' },
    { value: 'desk', label: 'Desk' },
    { value: 'sofa', label: 'Sofa' },
    { value: 'cabinet', label: 'Cabinet' },
    { value: 'meeting', label: 'Meeting' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      toast.error('Category name is required');
      return;
    }
    setSaving(true);
    try {
      const res = isEdit
        ? await fetch(`/api/categories/${category!.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          })
        : await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          });
      if (res.ok) {
        toast.success(isEdit ? 'Category updated' : 'Category created');
        onSaved();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to save category');
      }
    } catch (e) {
      toast.error('Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
          Category Name *
        </label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          placeholder="e.g. Office Chairs"
          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
          Slug (optional - auto-generated)
        </label>
        <input
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          placeholder="office-chairs"
          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          placeholder="Short description shown on the catalog..."
          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40 resize-y"
        />
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
          Icon
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {ICON_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm({ ...form, icon: opt.value })}
              className={cn(
                'px-3 py-2 rounded-xl text-[12px] font-medium border transition-all',
                form.icon === opt.value
                  ? 'bg-brand-gradient text-white border-transparent'
                  : 'bg-card border-border text-foreground hover:bg-accent/60'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 px-5 py-3.5 rounded-full bg-brand-gradient text-white text-[14px] font-semibold hover:scale-[1.01] transition-transform disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              {isEdit ? 'Save changes' : 'Create category'}
            </>
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3.5 rounded-full border border-border text-foreground text-[14px] font-semibold hover:bg-accent/60"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
