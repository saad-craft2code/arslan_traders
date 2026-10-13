'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, MessageCircle, Navigation } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[12px] uppercase tracking-[0.18em] text-primary font-semibold mb-3">
              Our Story
            </div>
            <h2 className="font-fraunces text-hero text-foreground text-balance">
              Rawalpindi's trusted name in office furniture
            </h2>
            <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed">
              For over a decade, Arslan Traders has been the go-to destination for
              premium office furniture across Rawalpindi and Islamabad. Located on the
              historic Murree Road, our showroom brings together the finest selection of
              executive chairs, office tables, workstations, and storage solutions — all
              backed by honest pricing and exceptional service.
            </p>
            <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
              Our commitment to quality has earned us the trust of hundreds of businesses,
              government offices, and home users across the twin cities. With over 500
              designs in stock and expert installation, we make furnishing your workspace
              effortless.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <Stat number="183" label="Google reviews" />
              <Stat number="4.7" label="Star rating" />
              <Stat number="10+" label="Years in business" />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/923345121727?text=${encodeURIComponent(
                  "Hi Arslan Traders, I'd like to inquire about your office furniture."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-gradient text-white text-[14px] font-semibold hover:scale-[1.02] transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Arslan+Traders+Murree+Road+Rawalpindi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-border text-foreground text-[14px] font-semibold hover:bg-accent/60 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </motion.div>

          {/* Right: Showroom info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden bg-brand-gradient-soft">
              {/* Map embed */}
              <iframe
                src="https://www.google.com/maps?q=Fatima+Tower+Naz+Cinema+Murree+Road+Rawalpindi&output=embed"
                className="absolute inset-0 w-full h-full grayscale-[20%] opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arslan Traders Showroom Location"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent pointer-events-none" />

              {/* Floating info card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 glass rounded-2xl p-5 shadow-soft-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-fraunces text-[15px] font-semibold text-foreground">
                      Arslan Traders Showroom
                    </div>
                    <div className="text-[12px] text-muted-foreground leading-snug mt-0.5">
                      Shop No.1, Fatima Tower, Naz Cinema Chowk,
                      Murree Road, Amirpura Mohalla, Rawalpindi 44000
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-fraunces text-2xl sm:text-3xl font-semibold text-gradient-bronze">
        {number}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
        {label}
      </div>
    </div>
  );
}
