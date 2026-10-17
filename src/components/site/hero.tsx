'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Sparkles, Shield, Truck, ChevronDown, Banknote, CreditCard } from 'lucide-react';
import { Logo } from '@/components/site/logo';

// Hero image carousel - real furniture photos from the catalog
const HERO_IMAGES = [
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9b0dd780d849.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/76ab9ce362b3.png',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/837fccd07ab1.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/49a050f1f7cc.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2825998ac544.jpg',
];

// Working Pexels video URL (verified accessible)
const PEXELS_VIDEO = 'https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4';
const PEXELS_VIDEO_FALLBACK = 'https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4';

export function Hero() {
  const [activeImage, setActiveImage] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-foreground text-white"
    >
      {/* Background: video + image carousel cross-fade */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src={PEXELS_VIDEO} type="video/mp4" />
          <source src={PEXELS_VIDEO_FALLBACK} type="video/mp4" />
        </video>

        <AnimatePresence mode="sync">
          {HERO_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: i === activeImage ? (videoLoaded ? 0.35 : 1) : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
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

        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-32">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Trust pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-dark text-white text-[13px] font-semibold mb-8"
          >
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-brand-primary-light fill-brand-primary-light" />
              ))}
            </div>
            <span className="font-bold text-base">4.7</span>
            <span className="opacity-60">·</span>
            <span className="opacity-80">183 Google Reviews</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-display text-white text-balance"
          >
            Office Furniture
            <br />
            <span className="italic font-light">
              for <span className="text-brand-primary-light font-extrabold not-italic">Pakistan's</span> workspaces
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-xl sm:text-2xl text-white/85 max-w-2xl text-pretty font-light leading-relaxed"
          >
            Shop premium executive chairs, office tables, workstations & more.
            Cash on Delivery across Rawalpindi & Islamabad. Free delivery, 5-year warranty.
          </motion.p>

          {/* Payment hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-wrap items-center gap-3 text-[13px]"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark text-white">
              <Banknote className="w-4 h-4 text-brand-success" />
              <span className="font-semibold">Cash on Delivery</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark text-white">
              <CreditCard className="w-4 h-4 text-brand-primary-light" />
              <span className="font-semibold">Pre-Payment Available</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-start gap-3"
          >
            <Link
              href="/catalog"
              className="btn-shine group inline-flex items-center gap-3 px-8 py-5 rounded-full bg-brand-gradient text-white text-lg font-bold shadow-brand hover:scale-[1.03] active:scale-95 transition-transform"
            >
              <span>Shop the Catalog</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/bulk-orders"
              className="inline-flex items-center gap-2 px-8 py-5 rounded-full glass-dark text-white text-lg font-bold hover:bg-white/10 transition-colors"
            >
              <span>Bulk Orders</span>
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-2xl"
          >
            {[
              { icon: Shield, title: '5-Year Warranty', subtitle: 'On premium items' },
              { icon: Truck, title: 'Free Delivery', subtitle: 'Twin cities + nationwide' },
              { icon: Sparkles, title: '500+ Designs', subtitle: 'In stock & ready' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-2xl glass-dark flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-brand-primary-light" strokeWidth={2.2} />
                </div>
                <div className="text-[15px] sm:text-base font-bold text-white">
                  {item.title}
                </div>
                <div className="text-[12px] sm:text-[13px] text-white/60">
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
        <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Image dots */}
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
