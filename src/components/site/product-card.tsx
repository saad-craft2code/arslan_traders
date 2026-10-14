'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatPrice, calculateDiscount } from '@/lib/format';
import { cn } from '@/lib/utils';

export function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick?: () => void;
}) {
  const discount = calculateDiscount(product.price, product.salePrice);
  const finalPrice = product.salePrice || product.price;
  const hasImage = product.images && product.images.length > 0;

  const card = (
    <div className="group relative w-full text-left rounded-3xl overflow-hidden bg-card border border-border card-lift">
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
            <span className="font-display text-4xl text-muted-foreground">
              {product.name[0]}
            </span>
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-brand-gradient text-white text-[11px] font-bold shadow-soft">
                -{discount}%
              </span>
            )}
            {product.featured && (
              <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-semibold">
                Featured
              </span>
            )}
          </div>
          <div className="flex gap-1.5">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-medium">
              <Star className="w-3 h-3 fill-brand-orange-light text-brand-orange-light" />
              {product.rating || '4.5'}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-2">
        {product.category && (
          <div className="text-[11px] uppercase tracking-[0.12em] text-primary font-bold">
            {product.category.name}
          </div>
        )}
        <h3 className="font-display text-[18px] font-bold leading-snug text-foreground line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-1.5">
          <span className="font-display text-xl font-bold text-foreground">
            {formatPrice(finalPrice)}
          </span>
          {product.salePrice && (
            <span className="text-[13px] text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full">
        {card}
      </button>
    );
  }

  return (
    <Link href={`/product/${product.slug}`} className="block">
      {card}
    </Link>
  );
}
