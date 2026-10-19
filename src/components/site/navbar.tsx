'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronRight, Truck, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Categories', href: '/categories' },
  { label: 'Bulk Orders', href: '/bulk-orders' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = pathname === '/';
  const onDarkBg = isHome && !scrolled;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border py-3'
            : onDarkBg
              ? 'py-5 bg-transparent'
              : 'py-4 bg-background/40 backdrop-blur-sm'
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-6">
          {/* Logo */}
          <Logo light={onDarkBg} size="md" className="shrink-0" />

          {/* Desktop nav - centered */}
          <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'relative px-3.5 py-2 text-[14px] font-medium rounded-full transition-all',
                      active
                        ? (onDarkBg ? 'text-brand-primary-light' : 'text-primary')
                        : (onDarkBg ? 'text-white/80 hover:text-white' : 'text-foreground/75 hover:text-foreground')
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className={cn(
                          'absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full',
                          onDarkBg ? 'bg-brand-primary-light' : 'bg-primary'
                        )}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Phone (compact) - desktop only */}
            <a
              href="tel:+923345121727"
              className={cn(
                'hidden md:flex items-center gap-2 px-3 py-2 rounded-full text-[13px] font-semibold transition-colors',
                onDarkBg
                  ? 'text-white hover:bg-white/10'
                  : 'text-foreground hover:bg-accent/60'
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">0334 5121727</span>
            </a>

            {/* Shop Now CTA */}
            <Link
              href="/catalog"
              className="btn-shine hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-white text-[13px] font-semibold hover:bg-foreground/90 transition-all hover:scale-[1.03] active:scale-95"
            >
              Shop Now
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-full transition-colors',
                onDarkBg ? 'text-white hover:bg-white/10' : 'hover:bg-accent/60 text-foreground'
              )}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu - clean slide-down panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-20 left-4 right-4 bg-card border border-border rounded-3xl p-6 shadow-soft-lg"
            >
              {/* Top: delivery badge */}
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-border text-[12px] text-muted-foreground">
                <Truck className="w-4 h-4 text-brand-success" />
                Free delivery in Rawalpindi & Islamabad · COD available
              </div>

              {/* Nav items */}
              <ul className="flex flex-col gap-0.5">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 text-[15px] font-medium rounded-2xl transition-colors',
                          active ? 'bg-foreground text-white' : 'text-foreground hover:bg-accent/60'
                        )}
                      >
                        {item.label}
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Bottom actions */}
              <div className="mt-5 pt-5 border-t border-border space-y-3">
                <a
                  href="tel:+923345121727"
                  className="flex items-center gap-3 text-[15px] font-semibold text-foreground"
                >
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>0334 5121727</span>
                </a>
                <Link
                  href="/catalog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-foreground text-white font-semibold"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
