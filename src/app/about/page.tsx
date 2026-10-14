'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Clock, Star, Shield, Truck, Sparkles, Award, Users, Heart, MessageCircle, Navigation, ArrowRight } from 'lucide-react';
import { StoreLayout } from '@/components/site/store-layout';
import { PageHeader } from '@/components/site/page-header';

export default function AboutPage() {
  return (
    <StoreLayout>
      <PageHeader
        eyebrow="Our Story"
        title="Rawalpindi's trusted name"
        titleAccent="in office furniture"
        subtitle="For over a decade, Arslan Traders has been the go-to destination for premium office furniture across Rawalpindi and Islamabad — combining honest pricing with exceptional service."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      {/* Main story */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-eyebrow text-primary mb-3">
                The Arslan Traders Story
              </div>
              <h2 className="font-display text-headline text-foreground text-balance">
                From a small shop on Murree Road to the region's most trusted furniture store
              </h2>
              <div className="mt-5 space-y-4 text-[15px] sm:text-[16px] text-muted-foreground leading-relaxed">
                <p>
                  Arslan Traders began with a simple mission: to bring quality office furniture
                  to the businesses and homes of Rawalpindi and Islamabad at honest, transparent
                  prices. What started as a modest storefront on the historic Murree Road has grown
                  into one of the region's most trusted destinations for executive chairs, office
                  tables, workstations, and complete office setups.
                </p>
                <p>
                  Over the years, we've served hundreds of clients — from corporate offices and
                  banks to schools, government departments, and home offices. Each project, big or
                  small, has been an opportunity to deliver on our promise of quality, value, and
                  service. With over 500 designs in stock and an experienced installation team,
                  we make furnishing your workspace effortless.
                </p>
                <p>
                  Today, our 183 Google reviews with a 4.7-star average rating stand as a
                  testament to the trust our customers have placed in us. That trust is the
                  foundation of everything we do, and we work hard to earn it every single day.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Star, value: '4.7', label: 'Star rating', desc: 'Average Google rating' },
                { icon: Users, value: '183', label: 'Google reviews', desc: 'From verified customers' },
                { icon: Award, value: '10+', label: 'Years in business', desc: 'Serving twin cities' },
                { icon: Sparkles, value: '500+', label: 'Designs in stock', desc: 'Ready to ship' },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl bg-card border border-border text-center">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mb-4 mx-auto">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-gradient-brand">
                    {stat.value}
                  </div>
                  <div className="text-[13px] font-bold text-foreground mt-1">{stat.label}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{stat.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <div className="text-eyebrow text-primary mb-3">
              Our Values
            </div>
            <h2 className="font-display text-hero text-foreground text-balance">
              What we stand for
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: 'Honesty', desc: 'Transparent pricing with no hidden fees. What you see is what you pay.' },
              { icon: Award, title: 'Quality', desc: 'We source only from trusted manufacturers and stand behind every product.' },
              { icon: Heart, title: 'Service', desc: 'From selection to installation, our team goes the extra mile for you.' },
              { icon: Truck, title: 'Reliability', desc: 'On-time delivery and professional installation across the twin cities.' },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-3xl bg-card border border-border"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-brand mb-4">
                  <v.icon className="w-6 h-6 text-white" strokeWidth={2.1} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{v.title}</h3>
                <p className="text-[14px] text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <div className="text-eyebrow text-primary mb-3">
              Visit Our Showroom
            </div>
            <h2 className="font-display text-hero text-foreground text-balance">
              Come see the furniture in person
            </h2>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Our Murree Road showroom has 500+ designs on display. Walk in, test the chairs, feel the materials, and meet our team.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden min-h-[400px] bg-accent/40"
            >
              <iframe
                src="https://www.google.com/maps?q=Fatima+Tower+Naz+Cinema+Murree+Road+Rawalpindi&output=embed"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arslan Traders Showroom Location"
              />
            </motion.div>

            {/* Address card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center p-8 sm:p-10 rounded-3xl bg-foreground text-white"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-5">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">Arslan Traders Showroom</h3>
              <div className="space-y-3 text-[15px] text-white/85">
                <p className="leading-relaxed">
                  Shop No.1, Fatima Tower<br />
                  Naz Cinema Chowk, Murree Road<br />
                  Amirpura Mohalla, Rawalpindi 44000<br />
                  Punjab, Pakistan
                </p>
                <a href="tel:+923345121727" className="flex items-center gap-2 hover:text-brand-orange-light transition-colors">
                  <Phone className="w-4 h-4" /> 0334 5121727
                </a>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Mon — Sat: 9 AM — 9 PM · Sun: Closed
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Arslan+Traders+Murree+Road+Rawalpindi"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-gradient text-white text-[14px] font-bold w-fit"
              >
                <Navigation className="w-4 h-4" />
                Get directions
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-headline text-foreground text-balance">
              Let's furnish your workspace together
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Browse our catalog online or visit us in person. Either way, we're ready to help.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-gradient text-white text-[15px] font-bold">
                Browse catalog
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/923345121727?text=${encodeURIComponent("Hi Arslan Traders, I'd like to discuss my office furniture needs.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-card text-foreground text-[15px] font-bold hover:bg-accent/60 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </StoreLayout>
  );
}
