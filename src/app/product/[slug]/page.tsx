'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Phone, MessageCircle, ShoppingBag, Ruler, Palette, Layers, Tag, ChevronLeft, ArrowRight, Truck, Wallet, ShieldCheck, CreditCard, Banknote } from 'lucide-react';
import { StoreLayout } from '@/components/site/store-layout';
import { ProductCard } from '@/components/site/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice, calculateDiscount } from '@/lib/format';
import type { Product } from '@/lib/types';

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/products?limit=200`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.products) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const p = data.products.find((prod: Product) => prod.slug === slug);
        if (!p) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        setProduct(p);
        // Get related products from same category
        const relatedProducts = data.products
          .filter((prod: Product) => prod.categoryId === p.categoryId && prod.id !== p.id)
          .slice(0, 4);
        setRelated(relatedProducts);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <StoreLayout>
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid sm:grid-cols-2 gap-8">
              <Skeleton className="aspect-square rounded-3xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </StoreLayout>
    );
  }

  if (notFound || !product) {
    return (
      <StoreLayout>
        <div className="pt-32 pb-16 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-headline font-bold mb-2">Product not found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link href="/catalog" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-gradient text-white font-bold">
              <ChevronLeft className="w-4 h-4" />
              Back to catalog
            </Link>
          </div>
        </div>
      </StoreLayout>
    );
  }

  const discount = calculateDiscount(product.price, product.salePrice);
  const finalPrice = product.salePrice || product.price;

  return (
    <StoreLayout>
      {/* Breadcrumb */}
      <div className="pt-28 sm:pt-32 pb-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <nav className="flex items-center gap-1 text-[12px] font-semibold text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/catalog" className="hover:text-primary">Catalog</Link>
            <span className="opacity-50">/</span>
            {product.category && (
              <>
                <Link href={`/category/${product.category.slug}`} className="hover:text-primary">
                  {product.category.name}
                </Link>
                <span className="opacity-50">/</span>
              </>
            )}
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product detail */}
      <section className="py-8 sm:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-accent/40 shadow-soft-lg">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-9xl text-muted-foreground">
                      {product.name[0]}
                    </span>
                  </div>
                )}
                {discount > 0 && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-brand-gradient text-white text-[12px] font-bold shadow-soft">
                    -{discount}% OFF
                  </span>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        i === activeImage ? 'border-primary scale-105' : 'border-border opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              {product.category && (
                <Link
                  href={`/category/${product.category.slug}`}
                  className="text-eyebrow text-primary mb-3 hover:underline inline-block w-fit"
                >
                  {product.category.name}
                </Link>
              )}
              <h1 className="font-display text-headline text-foreground text-balance">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= Math.round(product.rating || 4.5)
                          ? 'fill-brand-orange-light text-brand-orange-light'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[14px] font-bold">{product.rating || 4.5}</span>
                <span className="text-[14px] text-muted-foreground">({product.reviewCount || 0} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-5">
                <span className="font-display text-4xl font-bold text-foreground">
                  {formatPrice(finalPrice)}
                </span>
                {product.salePrice && (
                  <span className="text-[16px] text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {product.material && <SpecCard icon={Layers} label="Material" value={product.material} />}
                {product.color && <SpecCard icon={Palette} label="Color" value={product.color} />}
                {product.dimensions && <SpecCard icon={Ruler} label="Dimensions" value={product.dimensions} />}
                {product.weight && <SpecCard icon={Tag} label="Weight" value={product.weight} />}
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-accent/60 text-foreground text-[12px] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/923345121727?text=${encodeURIComponent(
                    `Hi Arslan Traders, I'd like to order: ${product.name} (${formatPrice(finalPrice)}). Please confirm COD or pre-payment options.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-brand-gradient text-white text-[14px] font-bold hover:scale-[1.02] transition-transform"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Order Now
                </a>
                <a
                  href="tel:+923345121727"
                  className="flex items-center justify-center gap-2 px-5 py-4 rounded-full border border-border text-foreground text-[14px] font-bold hover:bg-accent/60 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call to Order
                </a>
              </div>

              {/* Payment & Delivery options */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-brand-success/10 border border-brand-success/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Banknote className="w-4 h-4 text-brand-success" />
                    <span className="text-[13px] font-bold text-foreground">Cash on Delivery</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Pay when your order arrives. Available across Rawalpindi & Islamabad.</p>
                </div>
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/30">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <span className="text-[13px] font-bold text-foreground">Pre-Payment</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Bank transfer or mobile wallet. Online payment gateway coming soon.</p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-5 p-4 rounded-2xl bg-accent/40 border border-border">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <Truck className="w-5 h-5 mx-auto text-primary mb-1" />
                    <div className="text-[11px] font-bold text-foreground">Free Delivery</div>
                    <div className="text-[10px] text-muted-foreground">Twin cities</div>
                  </div>
                  <div>
                    <ShieldCheck className="w-5 h-5 mx-auto text-primary mb-1" />
                    <div className="text-[11px] font-bold text-foreground">5-Yr Warranty</div>
                    <div className="text-[10px] text-muted-foreground">On premium items</div>
                  </div>
                  <div>
                    <Wallet className="w-5 h-5 mx-auto text-primary mb-1" />
                    <div className="text-[11px] font-bold text-foreground">Easy Returns</div>
                    <div className="text-[10px] text-muted-foreground">7-day policy</div>
                  </div>
                </div>
                <p className="text-[12px] text-muted-foreground mt-3 text-center">
                  Visit our <Link href="/about" className="text-primary font-semibold hover:underline">Murree Road showroom</Link> to see this item in person.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 sm:py-20 bg-secondary/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
              <div>
                <div className="text-eyebrow text-primary mb-2">You may also like</div>
                <h2 className="font-display text-headline font-bold text-foreground">
                  Related products
                </h2>
              </div>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-[14px] font-bold text-primary hover:gap-3 transition-all"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </StoreLayout>
  );
}

function SpecCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-3 rounded-2xl bg-accent/40 border border-border">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 text-primary" />
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">
          {label}
        </span>
      </div>
      <div className="text-[14px] font-semibold text-foreground">{value}</div>
    </div>
  );
}
