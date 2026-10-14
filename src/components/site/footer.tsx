'use client';

import Link from 'next/link';
import { Phone, MapPin, Clock, Facebook, Instagram, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid gap-10 lg:gap-8 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center">
                <span className="font-display text-2xl font-extrabold italic text-white">A</span>
              </div>
              <div>
                <div className="font-display text-xl font-bold">Arslan Traders</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-background/60">
                  Office Furniture · Est. Rawalpindi
                </div>
              </div>
            </Link>
            <p className="text-[14px] text-background/70 leading-relaxed max-w-md">
              The leading office furniture store in Rawalpindi & Islamabad.
              Premium chairs, tables, workstations, and storage at honest prices — backed by free
              local delivery and expert installation.
            </p>

            <div className="flex items-center gap-2 mt-5">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/923345121727" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] font-bold text-background/60 mb-4">
              Pages
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              {[
                { label: 'Home', href: '/' },
                { label: 'Catalog', href: '/catalog' },
                { label: 'Categories', href: '/categories' },
                { label: 'Bulk Orders', href: '/bulk-orders' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-background/80 hover:text-background transition-colors inline-flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] font-bold text-background/60 mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              {[
                { label: 'Office Chairs', slug: 'office-chairs' },
                { label: 'Office Tables', slug: 'office-tables' },
                { label: 'Workstations', slug: 'workstations' },
                { label: 'Sofas & Lounge', slug: 'sofas-lounge' },
                { label: 'Cabinets & Storage', slug: 'cabinets-storage' },
                { label: 'Conference Room', slug: 'conference-room' },
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-background/80 hover:text-background transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.18em] font-bold text-background/60 mb-4">
              Reach Us
            </h4>
            <ul className="space-y-3 text-[14px] text-background/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-background/60 shrink-0" />
                <span className="leading-snug">
                  Shop No.1, Fatima Tower, Naz Cinema Chowk, Murree Road, Rawalpindi 44000
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-background/60 shrink-0" />
                <a href="tel:+923345121727" className="hover:text-background">
                  0334 5121727
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-background/60 shrink-0" />
                <span className="leading-snug">
                  Mon — Sat: 9 AM — 9 PM<br />
                  Sunday: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-background/50">
          <p>© {new Date().getFullYear()} Arslan Traders. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-background/80 transition-colors">Admin Login</Link>
            <span className="opacity-50">·</span>
            <p>Office Furniture · Rawalpindi & Islamabad, Pakistan</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
