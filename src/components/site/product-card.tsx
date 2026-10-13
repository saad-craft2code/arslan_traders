'use client';

import { Star, Heart, Eye } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatPrice, calculateDiscount } from '@/lib/format';
import { cn } from '@/lib/utils';

export function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) {
  const discount = calculateDiscount(product.price, product.salePrice);
  const finalPrice = product.salePrice || product.price;
  const hasImage = product.images && product.images.length > 0;

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left rounded-3xl overflow-hidden bg-card border border-border card-lift"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-accent/40">
        {hasImage ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent to-secondary">
            <span className="font-fraunces text-4xl text-muted-foreground">
              {product.name[0]}
            </span>
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-brand-gradient text-white text-[11px] font-semibold shadow-soft">
                -{discount}%
              </span>
            )}
            {product.featured && (
              <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-medium">
                Featured
              </span>
            )}
          </div>
          <div className="flex gap-1.5">
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-medium"
            >
              <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
              {product.rating || '4.5'}
            </span>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-foreground text-[12px] font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            Quick view
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-2">
        {product.category && (
          <div className="text-[11px] uppercase tracking-[0.12em] text-primary font-semibold">
            {product.category.name}
          </div>
        )}
        <h3 className="font-fraunces text-[17px] font-semibold leading-snug text-foreground line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-1.5">
          <span className="font-fraunces text-xl font-semibold text-foreground">
            {formatPrice(finalPrice)}
          </span>
          {product.salePrice && (
            <span className="text-[13px] text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
