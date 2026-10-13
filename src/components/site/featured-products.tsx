'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatPrice, calculateDiscount } from '@/lib/format';
import { useStore } from '@/lib/store';
import { Skeleton } from '@/components/ui/skeleton';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { openProductModal } = useStore();

  useEffect(() => {
    fetch('/api/products?featured=true&limit=4&sort=popular')
      .then((r) => r.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between gap-4 mb-10"
        >
          <div>
            <div className="text-[12px] uppercase tracking-[0.18em] text-primary font-semibold mb-2">
              Handpicked for you
            </div>
            <h2 className="font-fraunces text-hero text-foreground text-balance">
              Featured pieces
            </h2>
          </div>
          <a
            href="#catalog"
            className="hidden sm:flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:gap-2.5 transition-all"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-3xl overflow-hidden bg-card border border-border">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              </div>
            ))
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No featured products yet.
            </div>
          ) : (
            products.map((p, i) => {
              const discount = calculateDiscount(p.price, p.salePrice);
              const finalPrice = p.salePrice || p.price;
              return (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => openProductModal(p.id)}
                  className="group relative rounded-3xl overflow-hidden bg-card border border-border text-left card-lift"
                >
                  <div className="relative aspect-square overflow-hidden bg-accent/40">
                    {p.images?.[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="eager"
                      />
                    ) : null}
                    {discount > 0 && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-gradient text-white text-[11px] font-semibold shadow-soft">
                        -{discount}%
                      </span>
                    )}
                    <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-medium">
                      <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                      {p.rating || '4.5'}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    {p.category && (
                      <div className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                        {p.category.name}
                      </div>
                    )}
                    <h3 className="font-fraunces text-[15px] font-semibold leading-snug line-clamp-2">
                      {p.name}
                    </h3>
                    <div className="font-fraunces text-lg font-semibold text-foreground pt-1">
                      {formatPrice(finalPrice)}
                    </div>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>

        <div className="mt-10 sm:hidden text-center">
          <a
            href="#catalog"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-gradient text-white text-[14px] font-semibold"
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
