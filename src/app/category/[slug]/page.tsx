'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { StoreLayout } from '@/components/site/store-layout';
import { PageHeader } from '@/components/site/page-header';
import { ProductCard } from '@/components/site/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Category, Product } from '@/lib/types';

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch('/api/categories').then((r) => r.json()),
      fetch(`/api/products?category=${slug}&limit=200`).then((r) => r.json()),
    ])
      .then(([cats, prods]) => {
        if (cancelled) return;
        const cat = Array.isArray(cats) ? cats.find((c: Category) => c.slug === slug) : null;
        setCategory(cat || null);
        if (prods.products) setProducts(prods.products);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <StoreLayout>
        <PageHeader
          eyebrow="Loading..."
          title="Loading..."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Categories', href: '/categories' }, { label: '...' }]}
        />
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] rounded-3xl" />
              ))}
            </div>
          </div>
        </section>
      </StoreLayout>
    );
  }

  if (!category) {
    return (
      <StoreLayout>
        <PageHeader
          eyebrow="404"
          title="Category not found"
          subtitle="The category you're looking for doesn't exist or has been moved."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Categories', href: '/categories' }, { label: 'Not found' }]}
        />
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <a href="/categories" className="inline-flex items-center px-5 py-3 rounded-full bg-brand-gradient text-white font-bold">
              ← Back to all categories
            </a>
          </div>
        </section>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <PageHeader
        eyebrow="Category"
        title={category.name}
        subtitle={category.description || undefined}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories', href: '/categories' },
          { label: category.name },
        ]}
      />
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
            <div className="text-[14px] text-muted-foreground">
              {loading ? 'Loading...' : (
                <span><span className="font-bold text-foreground text-lg">{products.length}</span> {products.length === 1 ? 'item' : 'items'} in {category.name}</span>
              )}
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="font-display text-2xl font-bold mb-2">No products yet</h3>
              <p className="text-muted-foreground">We're adding new items to this category. Check back soon!</p>
              <a href="/catalog" className="inline-block mt-6 px-5 py-2.5 rounded-full bg-brand-gradient text-white font-bold">
                Browse all products
              </a>
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
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </StoreLayout>
  );
}
