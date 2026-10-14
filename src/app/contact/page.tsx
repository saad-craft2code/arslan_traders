'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation, Send, Check, Building2 } from 'lucide-react';
import { StoreLayout } from '@/components/site/store-layout';
import { PageHeader } from '@/components/site/page-header';
import { toast } from 'sonner';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all required fields');
      return;
    }
    setSubmitting(true);
    // Submit as a general bulk order with quantity 1
    try {
      const res = await fetch('/api/bulk-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || 'N/A',
          company: form.company || null,
          city: 'N/A',
          productType: 'General inquiry',
          quantity: 1,
          budget: null,
          message: form.message,
        }),
      });
      if (res.ok) {
        toast.success('Message sent! We will respond within 24 hours.');
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        toast.error('Failed to send. Please call us instead.');
      }
    } catch (e) {
      toast.error('Network error. Please call 0334 5121727.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StoreLayout>
      <PageHeader
        eyebrow="Get In Touch"
        title="Come see the furniture"
        titleAccent="in person"
        subtitle="Our showroom on Murree Road has 500+ designs on display. Walk in, call ahead, or send us a message — we'll be happy to help you find the perfect furniture for your workspace."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      {/* Contact cards */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: MapPin,
                title: 'Showroom Address',
                lines: ['Shop No.1, Fatima Tower', 'Naz Cinema Chowk, Murree Road', 'Amirpura Mohalla, Rawalpindi 44000'],
                action: { label: 'Open in Maps', href: 'https://www.google.com/maps/search/?api=1&query=Arslan+Traders+Murree+Road+Rawalpindi' },
              },
              {
                icon: Phone,
                title: 'Phone & WhatsApp',
                lines: ['0334 5121727', 'Call or message us', 'Mon — Sat: 9 AM — 9 PM'],
                action: { label: 'Call now', href: 'tel:+923345121727' },
              },
              {
                icon: Clock,
                title: 'Business Hours',
                lines: ['Monday — Saturday', '9:00 AM — 9:00 PM', 'Sunday: Closed'],
              },
            ].map((item, i) => (
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
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <div className="space-y-0.5">
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-[14px] text-muted-foreground">{line}</p>
                  ))}
                </div>
                {item.action && (
                  <a
                    href={item.action.href}
                    target={item.action.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-bold text-primary hover:gap-2.5 transition-all"
                  >
                    {item.action.label}
                    <span>→</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {/* Map + form */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden h-[400px] sm:h-[500px] bg-accent/40"
            >
              <iframe
                src="https://www.google.com/maps?q=Fatima+Tower+Naz+Cinema+Murree+Road+Rawalpindi&output=embed"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Arslan Traders Showroom Location"
              />
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-card border border-border rounded-3xl p-6 sm:p-8"
            >
              {submitted ? (
                <div className="flex flex-col items-center text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                    className="w-20 h-20 rounded-full bg-brand-gradient flex items-center justify-center mb-6"
                  >
                    <Check className="w-10 h-10 text-white" strokeWidth={3} />
                  </motion.div>
                  <h3 className="font-display text-3xl font-bold mb-2">Message sent!</h3>
                  <p className="text-muted-foreground text-[15px] max-w-md">
                    Thank you for reaching out. Our team will respond to your message within 24 hours.
                  </p>
                  <p className="mt-3 text-[14px] text-muted-foreground">
                    For urgent inquiries, call <a href="tel:+923345121727" className="font-bold text-primary">0334 5121727</a>
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-5 py-2.5 rounded-full border border-border text-[14px] font-bold hover:bg-accent/60"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-display text-2xl font-bold mb-2">Send us a message</h3>
                  <p className="text-[13px] text-muted-foreground mb-4">
                    Fill in the form and we'll get back to you within 24 hours.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      required
                      placeholder="Full name *"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                      placeholder="Email *"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="Phone / WhatsApp"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update('company', e.target.value)}
                      placeholder="Company (optional)"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </div>
                  <textarea
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    required
                    rows={5}
                    placeholder="Tell us what you're looking for... *"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-[14px] focus:outline-none focus:ring-2 focus:ring-ring/40 resize-y"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-brand-gradient text-white text-[14px] font-bold hover:scale-[1.01] transition-transform disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send message
                      </>
                    )}
                  </button>

                  <div className="pt-4 border-t border-border text-[13px] text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Prefer to talk? Call <a href="tel:+923345121727" className="font-bold text-primary">0334 5121727</a>
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* WhatsApp banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 rounded-3xl bg-brand-gradient p-6 sm:p-8 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/5 pointer-events-none" />
            <div className="relative">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white text-balance">
                Need an instant reply?
              </h3>
              <p className="mt-2 text-white/85 text-[14px] max-w-xl mx-auto">
                Message us on WhatsApp and we typically respond within minutes during business hours.
              </p>
              <a
                href={`https://wa.me/923345121727?text=${encodeURIComponent("Hi Arslan Traders, I'd like to inquire about office furniture.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary text-[15px] font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                Message on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </StoreLayout>
  );
}
