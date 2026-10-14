'use client';

import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';
import { FloatingActions } from '@/components/site/floating-actions';
import { ProductModal } from '@/components/site/product-modal';

export function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ProductModal />
      <FloatingActions />
    </div>
  );
}
