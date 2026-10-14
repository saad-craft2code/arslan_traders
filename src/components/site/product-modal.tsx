'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Phone, MapPin, ShoppingBag, Ruler, Palette, Layers, Tag, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatPrice, calculateDiscount } from '@/lib/format';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductModal() {
  const { isProductModalOpen, selectedProductId, closeProductModal } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!selectedProductId) {
      return;
    }
    let cancelled = false;
    const id = selectedProductId;
    // Defer state updates to after fetch starts
    Promise.resolve().then(() => {
      if (cancelled) return;
      setLoading(true);
      setActiveImage(0);
    });
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data.id) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedProductId]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isProductModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isProductModalOpen]);

  return (
    <AnimatePresence>
      {isProductModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-6"
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-md"
            onClick={closeProductModal}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-card w-full sm:max-w-5xl h-full sm:h-[85vh] sm:rounded-3xl overflow-hidden shadow-soft-lg flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={closeProductModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {loading || !product ? (
              <div className="grid sm:grid-cols-2 gap-0 h-full">
                <Skeleton className="aspect-square sm:h-full" />
                <div className="p-6 sm:p-8 space-y-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-0 h-full overflow-y-auto scrollbar-elegant">
                {/* Image gallery */}
                <div className="relative bg-accent/40 h-72 sm:h-auto sm:min-h-[500px]">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[activeImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-fraunces text-7xl text-muted-foreground">
                        {product.name[0]}
                      </span>
                    </div>
                  )}

                  {/* Thumbnails */}
                  {product.images && product.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                            i === activeImage
                              ? 'border-white scale-105'
                              : 'border-white/30 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 flex flex-col overflow-y-auto scrollbar-elegant">
                  {product.category && (
                    <div className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-2">
                      {product.category.name}
                    </div>
                  )}
                  <h2 className="font-fraunces text-3xl sm:text-4xl font-semibold leading-tight text-foreground text-balance">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i <= Math.round(product.rating || 4.5)
                              ? 'fill-brand-gold text-brand-gold'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[13px] font-semibold text-foreground">
                      {product.rating || 4.5}
                    </span>
                    <span className="text-[13px] text-muted-foreground">
                      ({product.reviewCount || 0} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mt-5">
                    <span className="font-fraunces text-3xl font-semibold text-foreground">
                      {formatPrice(product.salePrice || product.price)}
                    </span>
                    {product.salePrice && (
                      <>
                        <span className="text-[15px] text-muted-foreground line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-brand-gradient text-white text-[11px] font-semibold">
                          -{calculateDiscount(product.price, product.salePrice)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-[14px] text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {product.material && (
                      <SpecCard icon={Layers} label="Material" value={product.material} />
                    )}
                    {product.color && (
                      <SpecCard icon={Palette} label="Color" value={product.color} />
                    )}
                    {product.dimensions && (
                      <SpecCard icon={Ruler} label="Dimensions" value={product.dimensions} />
                    )}
                    {product.weight && (
                      <SpecCard icon={Tag} label="Weight" value={product.weight} />
                    )}
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-accent/60 text-foreground text-[11px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
                    <a
                      href={`https://wa.me/923345121727?text=${encodeURIComponent(
                        `Hi, I'm interested in: ${product.name} (${formatPrice(product.salePrice || product.price)})`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-brand-gradient text-white text-[14px] font-semibold hover:scale-[1.02] transition-transform"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Order via WhatsApp
                    </a>
                    <a
                      href="tel:+923345121727"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-border text-foreground text-[14px] font-semibold hover:bg-accent/60 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </a>
                  </div>

                  {/* Visit showroom */}
                  <a
                    href="#contact"
                    onClick={closeProductModal}
                    className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Visit our Murree Road showroom to see this in person</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SpecCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-3 rounded-2xl bg-accent/40 border border-border">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 text-primary" />
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
          {label}
        </span>
      </div>
      <div className="text-[13px] font-medium text-foreground">{value}</div>
    </div>
  );
}
