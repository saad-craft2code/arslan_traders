'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Pencil, Trash2, Package, Tag, Inbox, ArrowLeft, Check,
  Image as ImageIcon, Upload, AlertCircle, ExternalLink, Phone, Mail, Building,
  Clock, TrendingUp, X,
} from 'lucide-react';
import Link from 'next/link';
import { formatPrice, calculateDiscount } from '@/lib/format';
import type { Product, Category } from '@/lib/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type AdminView = 'overview' | 'products' | 'add-product' | 'edit-product' | 'categories' | 'add-category' | 'edit-category' | 'orders';

type BulkOrderType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  city?: string | null;
  productType?: string | null;
  quantity: number;
  budget?: string | null;
  message: string;
  status: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [view, setView] = useState<AdminView>('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<BulkOrderType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const [pRes, cRes, oRes] = await Promise.all([
        fetch('/api/products?limit=200'),
        fetch('/api/categories'),
        fetch('/api/bulk-order'),
      ]);
      const pData = await pRes.json();
      const cData = await cRes.json();
      const oData = await oRes.json();
      if (pData.products) setProducts(pData.products);
      if (Array.isArray(cData)) setCategories(cData);
      if (oData.orders) setOrders(oData.orders);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const pendingOrders = orders.filter((o) => o.status === 'new');
  const totalRevenue = products.reduce((sum, p) => sum + (p.salePrice || p.price), 0);
  const avgPrice = products.length ? Math.round(totalRevenue / products.length) : 0;

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to site</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-foreground flex items-center justify-center">
                <span className="font-display text-xl font-extrabold italic text-brand-orange">A</span>
              </div>
              <div>
                <div className="font-display text-base font-bold leading-tight">Arslan Traders</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                  Admin Dashboard
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-[12px] font-semibold hover:bg-accent/60 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View site</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 flex-1 grid lg:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-none pb-2 lg:pb-0">
            <NavButton icon={TrendingUp} label="Overview" active={view === 'overview'} onClick={() => setView('overview')} />
            <NavButton icon={Package} label="Products" count={products.length} active={view === 'products'} onClick={() => setView('products')} />
            <NavButton icon={Inbox} label="Bulk Orders" count={pendingOrders.length} badge={pendingOrders.length > 0} active={view === 'orders'} onClick={() => setView('orders')} />
            <NavButton icon={Tag} label="Categories" count={categories.length} active={view === 'categories'} onClick={() => setView('categories')} />
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0">
          {view === 'overview' && (
            <Overview
              products={products}
              orders={orders}
              categories={categories}
              pendingOrders={pendingOrders.length}
              totalRevenue={totalRevenue}
              avgPrice={avgPrice}
              onNavigate={setView}
            />
          )}
          {view === 'products' && (
            <ProductsManager
              products={products}
              categories={categories}
              loading={loading}
              onRefresh={refresh}
              onAddNew={() => setView('add-product')}
              onEdit={(p) => { setEditingProduct(p); setView('edit-product'); }}
            />
          )}
          {view === 'add-product' && (
            <ProductFormWrapper
              categories={categories}
              product={null}
              onSaved={() => { setView('products'); refresh(); }}
              onCancel={() => setView('products')}
            />
          )}
          {view === 'edit-product' && editingProduct && (
            <ProductFormWrapper
              categories={categories}
              product={editingProduct}
              onSaved={() => { setView('products'); refresh(); }}
              onCancel={() => setView('products')}
            />
          )}
          {view === 'categories' && (
            <CategoriesManager
              categories={categories}
              loading={loading}
              onRefresh={refresh}
              onAddNew={() => setView('add-category')}
              onEdit={(c) => { setEditingCategory(c); setView('edit-category'); }}
            />
          )}
          {view === 'add-category' && (
            <CategoryFormWrapper
              category={null}
              onSaved={() => { setView('categories'); refresh(); }}
              onCancel={() => setView('categories')}
            />
          )}
          {view === 'edit-category' && editingCategory && (
            <CategoryFormWrapper
              category={editingCategory}
              onSaved={() => { setView('categories'); refresh(); }}
              onCancel={() => setView('categories')}
            />
          )}
          {view === 'orders' && (
            <OrdersManager orders={orders} loading={loading} onRefresh={refresh} />
          )}
        </main>
      </div>
    </div>
  );
}

// ====== Nav Button ======
function NavButton({ icon: Icon, label, count, badge, active, onClick }: {
  icon: any; label: string; count?: number; badge?: boolean; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[14px] font-semibold whitespace-nowrap transition-all',
        active ? 'bg-brand-gradient text-white shadow-soft' : 'text-foreground hover:bg-accent/60'
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {count !== undefined && (
        <span className={cn(
          'ml-auto text-[11px] px-1.5 py-0.5 rounded-full',
          active ? 'bg-white/20' : 'bg-accent'
        )}>
          {count}
        </span>
      )}
      {badge && badge && !count && (
        <span className="ml-auto w-2 h-2 rounded-full bg-primary pulse-glow" />
      )}
    </button>
  );
}

// ====== Overview ======
function Overview({ products, orders, categories, pendingOrders, totalRevenue, avgPrice, onNavigate }: any) {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-headline font-bold mb-1">Dashboard Overview</h1>
        <p className="text-muted-foreground text-[14px]">Welcome back. Here's what's happening with your store.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Products" value={products.length} color="bg-foreground" />
        <StatCard icon={Tag} label="Categories" value={categories.length} color="bg-brand-orange" />
        <StatCard icon={Inbox} label="Pending Orders" value={pendingOrders} color="bg-brand-orange-deep" highlight={pendingOrders > 0} />
        <StatCard icon={TrendingUp} label="Catalog Value" value={`Rs. ${(totalRevenue / 1000).toFixed(0)}k`} color="bg-brand-ink" />
      </div>

      {/* Recent orders */}
      <div className="bg-card border border-border rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold">Recent Bulk Order Requests</h2>
          <button
            onClick={() => onNavigate('orders')}
            className="text-[13px] font-semibold text-primary hover:underline"
          >
            View all →
          </button>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-muted-foreground text-[14px] py-8 text-center">No bulk orders yet.</p>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((o: BulkOrderType) => (
              <div key={o.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-accent/40">
                <div className="min-w-0">
                  <div className="font-semibold text-[14px]">{o.name}</div>
                  <div className="text-[12px] text-muted-foreground">
                    {o.productType || 'General'} · {o.quantity} items
                  </div>
                </div>
                <div className="text-[11px] text-muted-foreground shrink-0">
                  {new Date(o.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-3">
        <QuickAction icon={Plus} label="Add Product" desc="List a new furniture item" onClick={() => onNavigate('add-product')} />
        <QuickAction icon={Tag} label="Add Category" desc="Create a new product category" onClick={() => onNavigate('add-category')} />
        <QuickAction icon={Inbox} label="View Orders" desc={`${pendingOrders} pending requests`} onClick={() => onNavigate('orders')} highlight={pendingOrders > 0} />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, highlight }: any) {
  return (
    <div className={cn(
      'bg-card border rounded-3xl p-5 transition-all',
      highlight ? 'border-primary shadow-brand' : 'border-border'
    )}>
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', color)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="font-display text-2xl font-bold leading-none">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">
        {label}
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, desc, onClick, highlight }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-start gap-3 p-5 rounded-2xl border text-left transition-all hover:shadow-soft',
        highlight ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-accent/40'
      )}
    >
      <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="min-w-0">
        <div className="font-bold text-[14px]">{label}</div>
        <div className="text-[12px] text-muted-foreground">{desc}</div>
      </div>
    </button>
  );
}

// ====== Products Manager ======
function ProductsManager({ products, categories, loading, onRefresh, onAddNew, onEdit }: any) {
  const [search, setSearch] = useState('');

  const filtered = products.filter((p: Product) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Product deleted');
        onRefresh();
      } else toast.error('Failed to delete');
    } catch (e) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-headline font-bold mb-1">Products</h1>
          <p className="text-muted-foreground text-[14px]">Manage your furniture catalog.</p>
        </div>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-brand-gradient text-white text-[14px] font-bold hover:scale-[1.02] transition-transform"
        >
          <Plus className="w-4 h-4" />
          Add product
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
      />

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-display text-xl font-bold">No products found</h3>
          <p className="text-muted-foreground mt-1 text-[14px]">
            {search ? 'Try a different search.' : 'Add your first product to start building your catalog.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p: Product) => (
            <div key={p.id} className="flex gap-3 p-3 rounded-2xl border border-border bg-card hover:shadow-soft transition-shadow">
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
                      <div className="text-[10px] uppercase tracking-wider text-primary font-bold">
                        {p.category.name}
                      </div>
                    )}
                    <h4 className="font-bold text-[14px] text-foreground truncate">{p.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[12px] text-muted-foreground">
                      <span>{formatPrice(p.salePrice || p.price)}</span>
                      {p.featured && (
                        <span className="px-1.5 py-0.5 rounded-full bg-brand-gradient text-white text-[9px] font-bold">
                          FEATURED
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => onEdit(p)} className="w-8 h-8 rounded-full hover:bg-accent/60 flex items-center justify-center">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(p.id, p.name)} className="w-8 h-8 rounded-full hover:bg-destructive/15 text-destructive flex items-center justify-center">
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

// ====== Product Form Wrapper ======
function ProductFormWrapper({ categories, product, onSaved, onCancel }: any) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="font-display text-xl font-bold">Add a category first</h3>
        <p className="text-muted-foreground mt-1 text-[14px]">You need at least one category before adding products.</p>
      </div>
    );
  }
  return <ProductForm categories={categories} product={product} onSaved={onSaved} onCancel={onCancel} />;
}

// ====== Product Form ======
function ProductForm({ categories, product, onSaved, onCancel }: any) {
  const isEdit = !!product;
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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
  const [urlInput, setUrlInput] = useState('');

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
    }
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
        ? await fetch(`/api/products/${product!.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        : await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
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

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-headline font-bold mb-1">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
        <p className="text-muted-foreground text-[14px]">
          {isEdit ? 'Update product details below.' : 'Fill in the details to add a new furniture item.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-card border border-border rounded-3xl p-6">
        {/* Images */}
        <FormSection title="Photos *">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {form.images.map((img: string, i: number) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-accent/40 group">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => update('images', form.images.filter((_: any, idx: number) => idx !== i))}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-brand-gradient text-white text-[9px] font-bold">
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
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleUpload(e.target.files)}
                disabled={uploading}
              />
            </label>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">First image will be used as the cover.</p>
          <div className="flex gap-2 mt-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste image URL and click Add"
              className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-[12px]"
            />
            <button
              type="button"
              onClick={() => {
                if (urlInput) {
                  update('images', [...form.images, urlInput]);
                  setUrlInput('');
                }
              }}
              className="px-3 py-2 rounded-lg bg-accent text-foreground text-[12px] font-medium"
            >
              Add URL
            </button>
          </div>
        </FormSection>

        <FormSection title="Product Name *">
          <input
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            required
            placeholder="e.g. Executive High-Back Leather Chair"
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </FormSection>

        <FormSection title="Category *">
          <select
            value={form.categoryId}
            onChange={(e) => update('categoryId', e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
          >
            <option value="">Select a category</option>
            {categories.map((c: Category) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </FormSection>

        <FormSection title="Description *">
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            required
            rows={4}
            placeholder="Describe the product features, materials, and benefits..."
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40 resize-y"
          />
        </FormSection>

        <div className="grid grid-cols-2 gap-4">
          <FormSection title="Price (Rs.) *">
            <input type="number" value={form.price} onChange={(e) => update('price', e.target.value)} required min="0" placeholder="32000" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40" />
          </FormSection>
          <FormSection title="Sale Price (optional)">
            <input type="number" value={form.salePrice} onChange={(e) => update('salePrice', e.target.value)} min="0" placeholder="28500" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40" />
          </FormSection>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormSection title="Material">
            <input value={form.material} onChange={(e) => update('material', e.target.value)} placeholder="Leather, Steel" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40" />
          </FormSection>
          <FormSection title="Color">
            <input value={form.color} onChange={(e) => update('color', e.target.value)} placeholder="Black" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40" />
          </FormSection>
          <FormSection title="Dimensions">
            <input value={form.dimensions} onChange={(e) => update('dimensions', e.target.value)} placeholder="70 x 70 x 130 cm" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40" />
          </FormSection>
          <FormSection title="Weight">
            <input value={form.weight} onChange={(e) => update('weight', e.target.value)} placeholder="22 kg" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40" />
          </FormSection>
        </div>

        <FormSection title="Tags (comma-separated)">
          <input value={form.tags} onChange={(e) => update('tags', e.target.value)} placeholder="executive, leather, ergonomic" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40" />
        </FormSection>

        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} className="w-4 h-4 accent-[oklch(0.55_0.165_38)]" />
            <span className="text-[14px] font-semibold">Featured product</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.inStock} onChange={(e) => update('inStock', e.target.checked)} className="w-4 h-4 accent-[oklch(0.55_0.165_38)]" />
            <span className="text-[14px] font-semibold">In stock</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="flex-1 px-5 py-3.5 rounded-full bg-brand-gradient text-white text-[14px] font-bold hover:scale-[1.01] transition-transform disabled:opacity-60 flex items-center justify-center gap-2">
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
          <button type="button" onClick={onCancel} className="px-5 py-3.5 rounded-full border border-border text-[14px] font-bold hover:bg-accent/60">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.16em] font-bold text-muted-foreground mb-1.5">
        {title}
      </label>
      {children}
    </div>
  );
}

// ====== Categories Manager ======
function CategoriesManager({ categories, loading, onRefresh, onAddNew, onEdit }: any) {
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (res.ok) { toast.success('Category deleted'); onRefresh(); }
      else toast.error('Failed to delete');
    } catch (e) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-headline font-bold mb-1">Categories</h1>
          <p className="text-muted-foreground text-[14px]">Organize your products into collections.</p>
        </div>
        <button onClick={onAddNew} className="flex items-center gap-2 px-5 py-3 rounded-full bg-brand-gradient text-white text-[14px] font-bold hover:scale-[1.02] transition-transform">
          <Plus className="w-4 h-4" />
          Add category
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-2xl" />)}</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16">
          <Tag className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-display text-xl font-bold">No categories yet</h3>
          <p className="text-muted-foreground mt-1 text-[14px]">Add your first category.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {categories.map((c: Category) => (
            <div key={c.id} className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-border bg-card">
              <div className="min-w-0">
                <h4 className="font-bold text-[14px]">{c.name}</h4>
                {c.description && <p className="text-[12px] text-muted-foreground line-clamp-1 mt-0.5">{c.description}</p>}
                <div className="text-[11px] text-muted-foreground mt-1">{c._count?.products || 0} products</div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => onEdit(c)} className="w-8 h-8 rounded-full hover:bg-accent/60 flex items-center justify-center">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(c.id, c.name)} className="w-8 h-8 rounded-full hover:bg-destructive/15 text-destructive flex items-center justify-center">
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

// ====== Category Form ======
function CategoryFormWrapper({ category, onSaved, onCancel }: any) {
  return <CategoryForm category={category} onSaved={onSaved} onCancel={onCancel} />;
}

function CategoryForm({ category, onSaved, onCancel }: any) {
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
    if (!form.name) { toast.error('Category name is required'); return; }
    setSaving(true);
    try {
      const res = isEdit
        ? await fetch(`/api/categories/${category!.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        : await fetch('/api/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
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
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-headline font-bold mb-1">
          {isEdit ? 'Edit Category' : 'Add New Category'}
        </h1>
        <p className="text-muted-foreground text-[14px]">Create a collection for your products.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-card border border-border rounded-3xl p-6">
        <FormSection title="Category Name *">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="e.g. Office Chairs" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40" />
        </FormSection>
        <FormSection title="Slug (optional - auto-generated)">
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="office-chairs" className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40" />
        </FormSection>
        <FormSection title="Description">
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Short description..." className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40 resize-y" />
        </FormSection>
        <FormSection title="Icon">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {ICON_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setForm({ ...form, icon: opt.value })}
                className={cn(
                  'px-3 py-2 rounded-xl text-[12px] font-semibold border transition-all',
                  form.icon === opt.value ? 'bg-brand-gradient text-white border-transparent' : 'bg-background border-border text-foreground hover:bg-accent/60'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FormSection>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="flex-1 px-5 py-3.5 rounded-full bg-brand-gradient text-white text-[14px] font-bold hover:scale-[1.01] transition-transform disabled:opacity-60 flex items-center justify-center gap-2">
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
          <button type="button" onClick={onCancel} className="px-5 py-3.5 rounded-full border border-border text-[14px] font-bold hover:bg-accent/60">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// ====== Orders Manager ======
function OrdersManager({ orders, loading, onRefresh }: any) {
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'completed'>('all');

  const filtered = filter === 'all' ? orders : orders.filter((o: BulkOrderType) => o.status === filter);

  const handleStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bulk-order/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success(`Marked as ${status}`);
        onRefresh();
      } else toast.error('Failed to update');
    } catch (e) {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this order request?')) return;
    try {
      const res = await fetch(`/api/bulk-order/${id}`, { method: 'DELETE' });
      if (res.ok) { toast.success('Order deleted'); onRefresh(); }
      else toast.error('Failed to delete');
    } catch (e) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-headline font-bold mb-1">Bulk Order Requests</h1>
        <p className="text-muted-foreground text-[14px]">Quotes requested via the bulk orders section.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'new', 'contacted', 'completed'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              'px-4 py-2 rounded-full text-[13px] font-semibold capitalize transition-all',
              filter === s ? 'bg-brand-gradient text-white' : 'bg-card border border-border hover:bg-accent/60'
            )}
          >
            {s} {s !== 'all' && `(${orders.filter((o: BulkOrderType) => o.status === s).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-display text-xl font-bold">No orders found</h3>
          <p className="text-muted-foreground mt-1 text-[14px]">
            {filter === 'all' ? 'No bulk order requests yet.' : `No ${filter} orders.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((o: BulkOrderType) => (
            <div key={o.id} className={cn(
              'bg-card border rounded-3xl p-5',
              o.status === 'new' ? 'border-primary shadow-soft' : 'border-border'
            )}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display text-lg font-bold">{o.name}</h3>
                    <span className={cn(
                      'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                      o.status === 'new' ? 'bg-brand-gradient text-white' :
                      o.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    )}>
                      {o.status}
                    </span>
                  </div>
                  {o.company && (
                    <div className="text-[13px] text-muted-foreground mt-1 flex items-center gap-1">
                      <Building className="w-3 h-3" /> {o.company}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] mt-2">
                    <a href={`mailto:${o.email}`} className="flex items-center gap-1 text-foreground hover:text-primary">
                      <Mail className="w-3 h-3" /> {o.email}
                    </a>
                    <a href={`tel:${o.phone}`} className="flex items-center gap-1 text-foreground hover:text-primary">
                      <Phone className="w-3 h-3" /> {o.phone}
                    </a>
                    {o.city && <span className="flex items-center gap-1 text-muted-foreground">
                      <Building className="w-3 h-3" /> {o.city}
                    </span>}
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" /> {new Date(o.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 mt-3 text-[13px]">
                    {o.productType && <div><span className="text-muted-foreground">Product:</span> <span className="font-semibold">{o.productType}</span></div>}
                    <div><span className="text-muted-foreground">Quantity:</span> <span className="font-semibold">{o.quantity}</span></div>
                    {o.budget && <div><span className="text-muted-foreground">Budget:</span> <span className="font-semibold">{o.budget}</span></div>}
                  </div>
                  {o.message && (
                    <div className="mt-3 p-3 rounded-xl bg-accent/40 text-[13px] text-foreground/90">
                      "{o.message}"
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  {o.status !== 'contacted' && (
                    <button onClick={() => handleStatus(o.id, 'contacted')} className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-card border border-border hover:bg-accent/60">
                      Mark as contacted
                    </button>
                  )}
                  {o.status !== 'completed' && (
                    <button onClick={() => handleStatus(o.id, 'completed')} className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-brand-gradient text-white">
                      Mark as completed
                    </button>
                  )}
                  <a
                    href={`https://wa.me/${o.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-full text-[12px] font-semibold text-center bg-[#25D366] text-white"
                  >
                    WhatsApp
                  </a>
                  <button onClick={() => handleDelete(o.id)} className="px-3 py-1.5 rounded-full text-[12px] font-semibold text-destructive hover:bg-destructive/10">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
