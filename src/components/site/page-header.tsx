'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  breadcrumbs = [],
  align = 'center',
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  align?: 'center' | 'left';
  dark?: boolean;
}) {
  return (
    <section
      className={`relative pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden ${
        dark ? 'bg-foreground text-white' : 'bg-hero-gradient'
      }`}
    >
      {dark && (
        <>
          <div className="absolute top-0 -right-32 w-96 h-96 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -left-32 w-96 h-96 rounded-full bg-brand-orange-light/10 blur-3xl pointer-events-none" />
        </>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`max-w-4xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
        >
          {breadcrumbs.length > 0 && (
            <nav className={`flex items-center gap-1 text-[12px] font-semibold mb-4 ${
              align === 'center' ? 'justify-center' : 'justify-start'
            } ${dark ? 'text-white/60' : 'text-muted-foreground'}`}>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1">
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={dark ? 'text-white' : 'text-foreground'}>{crumb.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3 opacity-50" />}
                </span>
              ))}
            </nav>
          )}

          {eyebrow && (
            <div className={`text-eyebrow mb-3 ${dark ? 'text-brand-orange-light' : 'text-primary'}`}>
              {eyebrow}
            </div>
          )}

          <h1 className={`font-display text-hero text-balance ${dark ? 'text-white' : 'text-foreground'}`}>
            {title}
            {titleAccent && (
              <span className="italic font-light">
                {' '}{titleAccent}
              </span>
            )}
          </h1>

          {subtitle && (
            <p className={`mt-5 text-lg sm:text-xl leading-relaxed text-pretty ${
              dark ? 'text-white/80' : 'text-muted-foreground'
            }`}>
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
