'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { setFilter } = useStore();

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const handleClick = (slug: string) => {
    setFilter('category', slug);
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-20 sm:py-28 bg-secondary/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="text-[12px] uppercase tracking-[0.18em] text-primary font-semibold mb-3">
            Explore by Category
          </div>
          <h2 className="font-fraunces text-hero text-foreground text-balance">
            Everything your office needs
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-2xl mx-auto">
            Six curated collections covering every workspace scenario — from executive suites to staff workstations.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {categories.map((cat, i) => {
            const Icon = ICONS[cat.icon || 'chair'] || Armchair;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleClick(cat.slug)}
                className="group relative overflow-hidden rounded-3xl p-5 sm:p-7 bg-card border border-border text-left card-lift"
              >
                <div className="absolute inset-0 bg-brand-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-brand mb-4">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="font-fraunces text-lg sm:text-xl font-semibold text-foreground">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="mt-1 text-[12px] sm:text-[13px] text-muted-foreground line-clamp-2">
                      {cat.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {cat._count?.products || 0} items
                    </span>
                    <div className="w-8 h-8 rounded-full bg-accent/60 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
