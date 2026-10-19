'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Truck, ChevronDown, Banknote, CreditCard } from 'lucide-react';

// 3 verified premium office furniture images (VLM-checked)
const HERO_IMAGES = [
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7cf1a767cf6d.jpg', // executive desk
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bc0106bc473c.jpg', // home office setup
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4375833d65fd.jpg', // modern office interior
];

export function Hero() {
  const [activeImage, setActiveImage] = useState(0);

  // Single, slow cross-fade (8s per image) — feels like a single evolving hero, not a chaotic carousel
  useEffect(() => {
    const t = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-foreground text-white"
    >
      {/* Background: single Ken Burns image with slow cross-fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          {HERO_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: i === activeImage ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={img}
                alt={`Office furniture Rawalpindi Islamabad Pakistan ${i + 1}`}
                className="w-full h-full object-cover ken-burns"
                loading="eager"
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Clean layered overlay - subtle for trust + readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-32">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Trust pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-dark text-white text-[13px] font-medium mb-8"
          >
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 text-brand-primary-light fill-brand-primary-light" />
              ))}
            </div>
            <span className="font-bold">4.7</span>
            <span className="opacity-60">·</span>
            <span className="opacity-85">183 Google Reviews</span>
          </motion.div>

          {/* Headline - modern, premium */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-display text-white text-balance"
          >
            Office Furniture
            <br />
            <span className="text-brand-primary-light">Built to Inspire.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-lg sm:text-xl text-white/85 max-w-2xl text-pretty font-light leading-relaxed"
          >
            Premium executive chairs, office tables, workstations & storage.
            Cash on Delivery across Rawalpindi & Islamabad. Free delivery, 5-year warranty.
          </motion.p>

          {/* Payment hint pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-wrap items-center gap-2 text-[13px]"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark text-white">
              <Banknote className="w-3.5 h-3.5 text-brand-success" />
              <span className="font-medium">Cash on Delivery</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark text-white">
              <CreditCard className="w-3.5 h-3.5 text-brand-primary-light" />
              <span className="font-medium">Pre-Payment</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col sm:flex-row items-start gap-3"
          >
            <Link
              href="/catalog"
              className="btn-shine group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-brand-gradient text-white text-[15px] font-semibold shadow-brand hover:scale-[1.02] active:scale-95 transition-transform"
            >
              <span>Shop the Catalog</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/bulk-orders"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass-dark text-white text-[15px] font-semibold hover:bg-white/10 transition-colors"
            >
              Bulk Orders
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-2xl"
          >
            {[
              { icon: Shield, title: '5-Year Warranty', subtitle: 'On premium items' },
              { icon: Truck, title: 'Free Delivery', subtitle: 'Twin cities + nationwide' },
              { icon: Banknote, title: 'COD Available', subtitle: 'Pay on arrival' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-start">
                <div className="w-10 h-10 rounded-xl glass-dark flex items-center justify-center mb-2">
                  <item.icon className="w-4 h-4 text-brand-primary-light" strokeWidth={2.1} />
                </div>
                <div className="text-[14px] sm:text-[15px] font-semibold text-white">
                  {item.title}
                </div>
                <div className="text-[11px] sm:text-[12px] text-white/60">
                  {item.subtitle}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Image dots indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden sm:flex items-center gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === activeImage ? 'w-8 bg-brand-primary-light' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
