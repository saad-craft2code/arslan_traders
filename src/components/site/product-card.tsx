'use client';

import Link from 'next/link';
import { Star, Truck, Wallet } from 'lucide-react';
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
    <div className="group relative w-full text-left rounded-2xl overflow-hidden bg-card border border-border card-lift flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-accent/40">
        {hasImage ? (
          <img
            src={product.images[0]}
            alt={`${product.name} - Office furniture Rawalpindi Islamabad`}
            className="w-full h-full object-cover img-zoom"
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
                Save {discount}%
              </span>
            )}
            {product.featured && (
              <span className="px-2.5 py-1 rounded-full bg-foreground text-white text-[11px] font-semibold">
                Top Seller
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-foreground/85 backdrop-blur-md text-white text-[11px] font-semibold">
            <Star className="w-3 h-3 fill-brand-primary-light text-brand-primary-light" />
            {product.rating || '4.5'}
          </span>
        </div>

        {/* COD badge bottom-left */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-brand-success/95 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-soft">
            <Truck className="w-3 h-3" />
            COD Available
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {product.category && (
          <div className="text-[10px] uppercase tracking-[0.14em] text-primary font-bold mb-1">
            {product.category.name}
          </div>
        )}
        <h3 className="font-display text-[17px] font-bold leading-snug text-foreground line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price + payment hint */}
        <div className="pt-3 mt-2 border-t border-border/60">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold text-foreground">
              {formatPrice(finalPrice)}
            </span>
            {product.salePrice && (
              <span className="text-[13px] text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
            <Wallet className="w-3 h-3" />
            <span>COD or pre-pay · Free delivery</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full h-full text-left">
        {card}
      </button>
    );
  }

  return (
    <Link href={`/product/${product.slug}`} className="block h-full">
      {card}
    </Link>
  );
}
