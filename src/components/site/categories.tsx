'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Armchair, Table, LayoutGrid, Sofa, Archive, Presentation, ArrowRight } from 'lucide-react';
import type { Category } from '@/lib/types';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const ICONS: Record<string, any> = {
  chair: Armchair,
  table: Table,
  desk: LayoutGrid,
  sofa: Sofa,
  cabinet: Archive,
  meeting: Presentation,
};

export function Categories({ limit, compact = false }: { limit?: number; compact?: boolean }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { setFilter } = useStore();

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const cats = limit ? categories.slice(0, limit) : categories;

  if (compact) {
    // Compact version for home page - simple pills/cards
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {cats.map((cat, i) => {
          const Icon = ICONS[cat.icon || 'chair'] || Armchair;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/category/${cat.slug}`}
                className="group relative block overflow-hidden rounded-3xl p-5 sm:p-7 bg-card border border-border text-left card-lift"
              >
                <div className="absolute inset-0 bg-brand-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-brand mb-4">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="mt-1 text-[12px] sm:text-[13px] text-muted-foreground line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground font-semibold">
                      {cat._count?.products || 0} items
                    </span>
                    <div className="w-8 h-8 rounded-full bg-accent/60 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Full version (for /categories page)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cats.map((cat, i) => {
        const Icon = ICONS[cat.icon || 'chair'] || Armchair;
        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/category/${cat.slug}`}
              className="group relative block overflow-hidden rounded-3xl p-6 sm:p-7 bg-card border border-border text-left card-lift"
            >
              <div className="absolute inset-0 bg-brand-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-brand mb-5">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="mt-2 text-[13px] sm:text-[14px] text-muted-foreground line-clamp-2">
                    {cat.description}
                  </p>
                )}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[12px] text-muted-foreground font-semibold">
                    {cat._count?.products || 0} items
                  </span>
                  <div className="w-9 h-9 rounded-full bg-accent/60 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
