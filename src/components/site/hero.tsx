'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, MapPin, Sparkles, Shield, Truck } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-hero-gradient">
      {/* Decorative blobs */}
      <div className="absolute top-20 -right-20 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none float-slow" />
      <div className="absolute top-40 -left-32 w-96 h-96 rounded-full bg-brand-bronze/10 blur-3xl pointer-events-none float-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Trust pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass shadow-soft text-[13px] font-medium text-foreground mb-8"
          >
            <div className="flex items-center -space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
              ))}
            </div>
            <span className="font-semibold">4.7</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">183 Google Reviews</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-fraunces text-display text-balance text-foreground"
          >
            Office Furniture
            <br />
            <span className="text-gradient-bronze">Built to Inspire.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-lg sm:text-xl text-muted-foreground max-w-2xl text-pretty"
          >
            From executive chairs to conference tables — discover premium office
            furniture at honest prices. Serving Rawalpindi & Islamabad with free
            delivery and expert installation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3"
          >
            <a
              href="#catalog"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-brand-gradient text-white text-[15px] font-semibold shadow-brand hover:scale-[1.03] active:scale-95 transition-transform"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass text-foreground text-[15px] font-semibold hover:bg-accent/60 transition-colors shadow-soft"
            >
              <MapPin className="w-4 h-4" />
              <span>Visit Our Showroom</span>
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-2xl"
          >
            {[
              { icon: Shield, title: '5-Year Warranty', subtitle: 'On premium items' },
              { icon: Truck, title: 'Free Delivery', subtitle: 'In twin cities' },
              { icon: Sparkles, title: '500+ Designs', subtitle: 'In stock & ready' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-accent/80 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-primary" strokeWidth={2.2} />
                </div>
                <div className="text-[13px] sm:text-[14px] font-semibold text-foreground">
                  {item.title}
                </div>
                <div className="text-[11px] sm:text-[12px] text-muted-foreground">
                  {item.subtitle}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
    </section>
  );
}
