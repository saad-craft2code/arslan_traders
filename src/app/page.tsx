'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Package, Store, MapPin, Phone, Star, Shield, Truck, Sparkles,
  MessageCircle, Banknote, CreditCard, ShoppingBag, MousePointerClick, ClipboardCheck,
  Boxes, Clock,
} from 'lucide-react';
import { StoreLayout } from '@/components/site/store-layout';
import { Hero } from '@/components/site/hero';
import { FeaturedProducts } from '@/components/site/featured-products';
import { Categories } from '@/components/site/categories';

export default function Home() {
  return (
    <StoreLayout>
      {/* Hero with video */}
      <Hero />

      {/* Trust bar */}
      <section className="bg-foreground text-white py-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Star, value: '4.7★', label: 'Google Rating' },
              { icon: Truck, value: 'Free', label: 'Delivery in Twin Cities' },
              { icon: Banknote, value: 'COD', label: 'Cash on Delivery' },
              { icon: Boxes, value: '500+', label: 'Designs in Stock' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2">
                <item.icon className="w-5 h-5 text-brand-primary-light shrink-0" />
                <div className="text-left">
                  <div className="font-display text-base font-bold leading-none">{item.value}</div>
                  <div className="text-[11px] text-white/70 uppercase tracking-wider mt-0.5">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <FeaturedProducts />

      {/* Categories preview */}
      <section className="py-20 sm:py-28 bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <div className="text-eyebrow text-primary mb-3">
              Shop by Category
            </div>
            <h2 className="font-display text-hero text-foreground text-balance">
              Find the right furniture
              <span className="italic font-light"> for your space</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              From executive chairs to conference tables — explore our six collections covering every workspace need.
            </p>
          </motion.div>

          <Categories limit={6} compact />

          <div className="text-center mt-10">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card text-[14px] font-bold text-foreground hover:bg-accent/60 transition-colors"
            >
              View all categories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How to Order - business clarity */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14 max-w-3xl mx-auto"
          >
            <div className="text-eyebrow text-primary mb-3">
              How to Order
            </div>
            <h2 className="font-display text-hero text-foreground text-balance">
              Simple ordering,
              <span className="italic font-light"> your way</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg">
              Three easy steps to furnish your workspace. Choose Cash on Delivery or pre-pay — your call.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                num: '01',
                icon: MousePointerClick,
                title: 'Browse & Select',
                desc: 'Pick your furniture from our catalog of 500+ designs — chairs, tables, workstations, sofas, and more.',
              },
              {
                num: '02',
                icon: ClipboardCheck,
                title: 'Place Your Order',
                desc: 'Message us on WhatsApp or call 0334 5121727. Choose Cash on Delivery or pre-payment via bank transfer.',
              },
              {
                num: '03',
                icon: Truck,
                title: 'Free Delivery & Setup',
                desc: 'We deliver free across Rawalpindi & Islamabad, with professional installation included. Pay cash on arrival.',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-6 sm:p-8 rounded-3xl bg-card border border-border card-lift"
              >
                <div className="absolute top-6 right-6 font-display text-5xl font-bold text-accent/80 select-none">
                  {step.num}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-brand mb-5">
                  <step.icon className="w-6 h-6 text-white" strokeWidth={2.1} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Payment options banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid sm:grid-cols-2 gap-4"
          >
            <div className="p-5 rounded-2xl bg-brand-success/10 border border-brand-success/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-success flex items-center justify-center shrink-0">
                <Banknote className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-foreground mb-1">Cash on Delivery (COD)</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Available across Rawalpindi & Islamabad. Inspect your order before paying. No advance required.
                </p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-primary/10 border border-primary/30 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-foreground mb-1">Pre-Payment</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Bank transfer or mobile wallet (Easypaisa/JazzCash). Online payment gateway coming soon.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-20 sm:py-28 bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <div className="text-eyebrow text-primary mb-3">
              Why Choose Arslan Traders
            </div>
            <h2 className="font-display text-hero text-foreground text-balance">
              Pakistan's trusted
              <span className="italic font-light"> furniture partner</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Serving Rawalpindi, Islamabad, and all of Pakistan for over a decade with quality furniture and honest service.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: '5-Year Warranty', desc: 'On all premium furniture items' },
              { icon: Truck, title: 'Free Delivery', desc: 'Across Rawalpindi & Islamabad' },
              { icon: Sparkles, title: '500+ Designs', desc: 'In stock and ready to ship' },
              { icon: Clock, title: '10+ Years', desc: 'Trusted by 1000+ customers' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-3xl bg-card border border-border"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-brand mb-4">
                  <item.icon className="w-6 h-6 text-white" strokeWidth={2.1} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-[14px] text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk orders teaser */}
      <section className="py-20 sm:py-28 bg-foreground text-white relative overflow-hidden">
        <div className="absolute top-0 -right-32 w-96 h-96 rounded-full bg-brand-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-brand-primary-light/10 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-eyebrow text-brand-primary-light mb-3">
              For Businesses & Institutions
            </div>
            <h2 className="font-display text-hero text-white text-balance">
              Bulk orders for
              <span className="italic font-light text-brand-primary-light"> offices, schools & teams</span>
            </h2>
            <p className="mt-5 text-lg text-white/75 leading-relaxed text-pretty">
              Furnishing an entire office, school, or co-working space? Get wholesale pricing,
              free installation, and dedicated project support. Tell us what you need and we'll send a
              personalized quote within 24 hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/bulk-orders"
                className="btn-shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-gradient text-white text-[15px] font-bold hover:scale-[1.02] transition-transform"
              >
                <Package className="w-5 h-5" />
                Get Bulk Quote
              </Link>
              <a
                href="tel:+923345121727"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-dark text-white text-[15px] font-bold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                0334 5121727
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Package, title: 'Bulk Pricing', desc: '5–15% off on 10+ items' },
              { icon: Truck, title: 'Free Delivery', desc: 'Twin cities coverage' },
              { icon: Sparkles, title: '24h Response', desc: 'Personalized quote' },
              { icon: Shield, title: 'Warranty', desc: 'Extended on bulk orders' },
            ].map((b, i) => (
              <div key={i} className="p-5 rounded-2xl glass-dark">
                <div className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center mb-3">
                  <b.icon className="w-5 h-5 text-white" strokeWidth={2.2} />
                </div>
                <h3 className="font-display text-base font-bold">{b.title}</h3>
                <p className="text-[12px] text-white/70 mt-0.5">{b.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-eyebrow text-primary mb-3">
              Our Story
            </div>
            <h2 className="font-display text-hero text-foreground text-balance">
              A decade of trust
              <span className="italic font-light"> on Murree Road</span>
            </h2>
            <p className="mt-5 text-[15px] sm:text-[16px] text-muted-foreground leading-relaxed">
              For over 10 years, Arslan Traders has been the go-to destination for premium office
              furniture across Rawalpindi, Islamabad, and beyond. Located on the historic Murree Road,
              our showroom brings together the finest selection of executive chairs, office tables,
              workstations, and storage solutions — all backed by honest pricing and exceptional service.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { number: '183', label: 'Google reviews' },
                { number: '4.7', label: 'Star rating' },
                { number: '10+', label: 'Years in business' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-brand">
                    {stat.number}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-[15px] font-bold text-primary hover:gap-3 transition-all"
            >
              Read our full story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-brand-gradient-soft">
              <iframe
                src="https://www.google.com/maps?q=Fatima+Tower+Naz+Cinema+Murree+Road+Rawalpindi&output=embed"
                className="absolute inset-0 w-full h-full grayscale-[20%] opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arslan Traders Showroom Location"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-5 shadow-soft-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-display text-[15px] font-bold text-foreground">
                      Arslan Traders Showroom
                    </div>
                    <div className="text-[12px] text-muted-foreground leading-snug mt-0.5">
                      Shop No.1, Fatima Tower, Naz Cinema Chowk, Murree Road, Rawalpindi
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 sm:py-28 bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Store className="w-12 h-12 mx-auto text-primary mb-4" strokeWidth={2} />
            <h2 className="font-display text-hero text-foreground text-balance">
              Ready to furnish
              <span className="italic font-light"> your workspace?</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Browse our catalog, visit our Murree Road showroom, or message us on WhatsApp.
              We deliver across Rawalpindi, Islamabad, and all of Pakistan — COD available.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/catalog"
                className="btn-shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-gradient text-white text-[15px] font-bold hover:scale-[1.02] transition-transform"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Catalog
              </Link>
              <a
                href={`https://wa.me/923345121727?text=${encodeURIComponent(
                  "Hi Arslan Traders, I'd like to inquire about your office furniture."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-card text-foreground text-[15px] font-bold hover:bg-accent/60 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </StoreLayout>
  );
}
