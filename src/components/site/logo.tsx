'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Text-only brand logo: "ARSLAN TRADERS"
 * - Uses Geist Sans (Vercel's premium font) for the wordmark
 * - Letter-spaced uppercase, semibold
 * - Color adapts to parent (uses currentColor by default)
 * - Optional `light` prop to force light text on dark backgrounds
 */
export function Logo({
  href = '/',
  className,
  light = false,
  showTagline = true,
  size = 'md',
}: {
  href?: string;
  className?: string;
  light?: boolean;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'text-[15px] sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  };
  const taglineSize = {
    sm: 'text-[8px]',
    md: 'text-[9px] sm:text-[10px]',
    lg: 'text-[11px] sm:text-[12px]',
  };

  return (
    <Link
      href={href}
      className={cn('group inline-flex flex-col items-start leading-none', className)}
      aria-label="Arslan Traders — Office Furniture Rawalpindi Islamabad Pakistan"
    >
      <span
        className={cn(
          'font-display font-semibold tracking-[0.08em] sm:tracking-[0.12em] uppercase transition-colors',
          sizeClasses[size],
          light ? 'text-white' : 'text-foreground'
        )}
      >
        Arslan<span className="text-primary ml-1.5">Traders</span>
      </span>
      {showTagline && (
        <span
          className={cn(
            'mt-1 uppercase tracking-[0.28em] sm:tracking-[0.32em] font-medium transition-colors',
            taglineSize[size],
            light ? 'text-white/70' : 'text-muted-foreground'
          )}
          style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}
        >
          Office Furniture · Pakistan
        </span>
      )}
    </Link>
  );
}
