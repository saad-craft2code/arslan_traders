'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronRight, Truck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Shop Chairs', href: '/category/office-chairs' },
  { label: 'Shop Tables', href: '/category/office-tables' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Bulk Orders', href: '/bulk-orders' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Detect if we're on a page with dark hero
  const isHome = pathname === '/';
  const onDarkBg = isHome && !scrolled;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    // For category links, also match product detail pages in that category
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass shadow-soft py-3' : onDarkBg ? 'py-5 bg-transparent' : 'py-4 bg-background/80 backdrop-blur-md border-b border-border/40'
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-6">
          {/* Logo */}
          <Logo light={onDarkBg} size="md" className="shrink-0" />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative px-3.5 py-2 text-[14px] font-semibold rounded-full transition-all',
                    isActive(item.href)
                      ? (onDarkBg ? 'text-brand-primary-light' : 'text-primary')
                      : (onDarkBg ? 'text-white/85 hover:text-white' : 'text-foreground/80 hover:text-foreground')
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className={cn(
                        'absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full',
                        onDarkBg ? 'bg-brand-primary-light' : 'bg-primary'
                      )}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Free delivery badge (desktop) */}
            <div className={cn(
              'hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border',
              onDarkBg ? 'glass-dark text-white border-white/10' : 'bg-accent/60 text-foreground border-border'
            )}>
              <Truck className="w-3.5 h-3.5 text-brand-success" />
              <span>Free delivery in twin cities</span>
            </div>

            <a
              href="tel:+923345121727"
              className={cn(
                'hidden md:flex items-center gap-2 text-[14px] font-bold transition-colors',
                onDarkBg ? 'text-white hover:text-brand-primary-light' : 'text-foreground hover:text-primary'
              )}
            >
              <Phone className="w-4 h-4" />
              <span>0334 5121727</span>
            </a>

            <Link
              href="/catalog"
              className="btn-shine hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white text-[14px] font-bold hover:shadow-brand transition-all hover:scale-[1.03] active:scale-95"
            >
              Shop Now
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-full transition-colors',
                onDarkBg ? 'text-white hover:bg-white/10' : 'hover:bg-accent/60 text-foreground'
              )}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-20 left-4 right-4 glass rounded-3xl p-6 shadow-soft-lg"
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 text-base font-semibold rounded-2xl transition-colors',
                        isActive(item.href) ? 'bg-brand-gradient text-white' : 'text-foreground hover:bg-accent/60'
                      )}
                    >
                      {item.label}
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-2 px-4 text-[12px] text-muted-foreground">
                  <Truck className="w-4 h-4 text-brand-success" />
                  Free delivery in Rawalpindi & Islamabad
                </div>
                <a
                  href="tel:+923345121727"
                  className="flex items-center gap-3 text-[15px] font-bold text-foreground"
                >
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>0334 5121727</span>
                </a>
                <Link
                  href="/catalog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-brand-gradient text-white font-bold"
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
