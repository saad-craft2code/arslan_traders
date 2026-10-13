'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Package } from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setMobileMenuOpen, isMobileMenuOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Catalog', href: '#catalog' },
    { label: 'Categories', href: '#categories' },
    { label: 'Bulk Orders', href: '#bulk' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass shadow-soft py-3' : 'py-5 bg-transparent'
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-foreground flex items-center justify-center shadow-soft transition-transform group-hover:scale-105">
                <span className="font-display text-2xl font-extrabold italic text-brand-orange">A</span>
              </div>
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-display text-xl font-bold tracking-tight text-foreground">
                Arslan Traders
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                Office Furniture · RWP / ISB
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="px-4 py-2 text-[15px] font-semibold text-foreground/80 hover:text-foreground rounded-full hover:bg-accent/60 transition-all"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+923345121727"
              className="hidden md:flex items-center gap-2 text-[14px] font-bold text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>0334 5121727</span>
            </a>

            <a
              href="#bulk"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gradient text-white text-[14px] font-bold hover:shadow-brand transition-all hover:scale-[1.03] active:scale-95"
            >
              <Package className="w-4 h-4" />
              <span>Get Bulk Quote</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-accent/60 transition-colors"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
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
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-lg font-semibold text-foreground hover:bg-accent/60 rounded-2xl transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <a
                  href="tel:+923345121727"
                  className="flex items-center gap-3 text-[15px] font-bold text-foreground"
                >
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>0334 5121727</span>
                </a>
                <a
                  href="#bulk"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-brand-gradient text-white font-bold"
                >
                  <Package className="w-4 h-4" />
                  Get Bulk Quote
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
