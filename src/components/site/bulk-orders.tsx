'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, Shield, Send, Check, Users, Building2 } from 'lucide-react';
import { toast } from 'sonner';

const PRODUCT_TYPES = [
  'Office Chairs',
  'Office Tables / Desks',
  'Workstations',
  'Sofas & Lounge',
  'Cabinets & Storage',
  'Conference Tables',
  'Complete Office Setup',
  'Other (specify in message)',
];

const BENEFITS = [
  { icon: Package, title: 'Bulk Pricing', desc: 'Tiered discounts on orders of 10+ items' },
  { icon: Truck, title: 'Free Delivery', desc: 'Across Rawalpindi & Islamabad' },
  { icon: Clock, title: '24h Response', desc: 'Personalized quote within one business day' },
  { icon: Shield, title: 'Warranty', desc: 'Extended warranty on bulk orders' },
];

export function BulkOrders() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    city: 'Rawalpindi',
    productType: '',
    quantity: '10',
    budget: '',
    message: '',
  });

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.quantity) {
      toast.error('Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/bulk-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Quote request submitted! We\'ll respond within 24 hours.');
        setSubmitted(true);
        setForm({
          name: '',
          email: '',
          phone: '',
          company: '',
          city: 'Rawalpindi',
          productType: '',
          quantity: '10',
          budget: '',
          message: '',
        });
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to submit. Please call us instead.');
      }
    } catch (e) {
      toast.error('Network error. Please call 0334 5121727.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="bulk" className="py-20 sm:py-28 bg-foreground text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 -right-32 w-96 h-96 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-brand-orange-light/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Benefits grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 rounded-2xl glass-dark"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mb-4">
                <b.icon className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
              <h3 className="font-display text-lg font-bold text-white leading-tight">{b.title}</h3>
              <p className="text-[13px] text-white/70 mt-1">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Form + side info */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 bg-white text-foreground rounded-3xl p-6 sm:p-8 shadow-soft-lg"
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
                <h3 className="font-display text-3xl font-bold mb-2">Request received!</h3>
                <p className="text-muted-foreground text-[15px] max-w-md">
                  Thank you for your interest. Our team will review your requirements and
                  send a personalized quote to <span className="font-semibold text-foreground">{form.email || 'your email'}</span> within 24 hours.
                </p>
                <p className="mt-3 text-[14px] text-muted-foreground">
                  Need urgent help? Call <a href="tel:+923345121727" className="font-bold text-primary">0334 5121727</a>
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-5 py-2.5 rounded-full border border-border text-[14px] font-semibold hover:bg-accent/60 transition-colors"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-xl font-bold">Request a Bulk Quote</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" required>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </Field>
                  <Field label="Email *" required>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      required
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </Field>
                  <Field label="Phone / WhatsApp *" required>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      required
                      placeholder="03XX XXXXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </Field>
                  <Field label="Company / Organization">
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update('company', e.target.value)}
                      placeholder="Company name"
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </Field>
                  <Field label="City">
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      placeholder="Rawalpindi"
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </Field>
                  <Field label="Quantity Needed *" required>
                    <input
                      type="number"
                      value={form.quantity}
                      onChange={(e) => update('quantity', e.target.value)}
                      required
                      min="1"
                      placeholder="10"
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                    />
                  </Field>
                </div>

                <Field label="Product Type">
                  <select
                    value={form.productType}
                    onChange={(e) => update('productType', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                  >
                    <option value="">Select product type</option>
                    {PRODUCT_TYPES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Budget Range (optional)">
                  <input
                    type="text"
                    value={form.budget}
                    onChange={(e) => update('budget', e.target.value)}
                    placeholder="e.g. PKR 100k - 500k"
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40"
                  />
                </Field>

                <Field label="Additional Details">
                  <textarea
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    rows={3}
                    placeholder="Tell us about your project, specific needs, dimensions, colors, delivery timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-ring/40 resize-y"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-brand-gradient text-white text-[15px] font-bold hover:scale-[1.01] transition-transform disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Get My Bulk Quote
                    </>
                  )}
                </button>
                <p className="text-center text-[12px] text-muted-foreground">
                  We respect your privacy. Your details will only be used to prepare your quote.
                </p>
              </form>
            )}
          </motion.div>

          {/* Side info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="p-6 rounded-3xl glass-dark">
              <Users className="w-8 h-8 text-brand-orange-light mb-3" />
              <h3 className="font-display text-xl font-bold mb-2">Who we serve</h3>
              <ul className="space-y-2 text-[14px] text-white/80">
                <li>· Corporate offices & banks</li>
                <li>· Schools, colleges & universities</li>
                <li>· Government departments</li>
                <li>· Co-working spaces</li>
                <li>· Hospitals & clinics</li>
                <li>· Hotels & restaurants</li>
                <li>· Startups & home offices</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl glass-dark">
              <Building2 className="w-8 h-8 text-brand-orange-light mb-3" />
              <h3 className="font-display text-xl font-bold mb-2">Bulk pricing tiers</h3>
              <div className="space-y-3 text-[14px]">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-white/80">10 – 25 items</span>
                  <span className="font-bold text-brand-orange-light">5% off</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-white/80">26 – 50 items</span>
                  <span className="font-bold text-brand-orange-light">10% off</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-white/80">51 – 100 items</span>
                  <span className="font-bold text-brand-orange-light">15% off</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">100+ items</span>
                  <span className="font-bold text-brand-orange-light">Custom</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-brand-gradient">
              <h3 className="font-display text-xl font-bold mb-1">Prefer to talk?</h3>
              <p className="text-white/90 text-[14px] mb-4">Call us for immediate assistance.</p>
              <a
                href="tel:+923345121727"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-primary text-[15px] font-bold"
              >
                0334 5121727
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.16em] font-bold text-muted-foreground mb-1.5">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}
