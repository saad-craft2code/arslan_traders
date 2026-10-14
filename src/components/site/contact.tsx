'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook, Instagram } from 'lucide-react';

export function Contact() {
  const contactItems = [
    {
      icon: MapPin,
      title: 'Showroom Address',
      lines: [
        'Shop No.1, Fatima Tower',
        'Naz Cinema Chowk, Murree Road',
        'Amirpura Mohalla, Rawalpindi 44000',
      ],
      action: {
        label: 'Open in Maps',
        href: 'https://www.google.com/maps/search/?api=1&query=Arslan+Traders+Murree+Road+Rawalpindi',
      },
    },
    {
      icon: Phone,
      title: 'Phone & WhatsApp',
      lines: ['0334 5121727'],
      action: {
        label: 'Call now',
        href: 'tel:+923345121727',
      },
    },
    {
      icon: Clock,
      title: 'Business Hours',
      lines: ['Monday — Saturday', '9:00 AM — 9:00 PM', 'Sunday: Closed'],
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 bg-secondary/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="text-[12px] uppercase tracking-[0.18em] text-primary font-semibold mb-3">
            Visit or Reach Us
          </div>
          <h2 className="font-fraunces text-hero text-foreground text-balance">
            Come see the furniture in person
          </h2>
          <p className="mt-3 text-muted-foreground text-base max-w-2xl mx-auto">
            Our showroom on Murree Road has 500+ designs on display. Walk in, call ahead, or chat with us on WhatsApp.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {contactItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-card border border-border p-6 sm:p-8 card-lift"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-brand mb-5">
                <item.icon className="w-6 h-6 text-white" strokeWidth={2.1} />
              </div>
              <h3 className="font-fraunces text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <div className="space-y-0.5">
                {item.lines.map((line, j) => (
                  <p key={j} className="text-[14px] text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
              {item.action && (
                <a
                  href={item.action.href}
                  target={item.action.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  {item.action.label}
                  <span aria-hidden>→</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* WhatsApp banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 rounded-3xl bg-brand-gradient p-6 sm:p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/5 pointer-events-none" />
          <div className="relative">
            <h3 className="font-fraunces text-2xl sm:text-3xl font-semibold text-white text-balance">
              Need a custom quote for bulk orders?
            </h3>
            <p className="mt-2 text-white/85 text-[14px] max-w-xl mx-auto">
              For office setups, schools, and large projects — message us on WhatsApp and get a personalized quote within 24 hours.
            </p>
            <a
              href={`https://wa.me/923345121727?text=${encodeURIComponent(
                "Hi Arslan Traders, I'd like a quote for office furniture."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary text-[14px] font-semibold hover:scale-[1.02] transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              Message on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
