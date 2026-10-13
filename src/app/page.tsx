'use client';

import { Navbar } from '@/components/site/navbar';
import { Hero } from '@/components/site/hero';
import { FeaturedProducts } from '@/components/site/featured-products';
import { Categories } from '@/components/site/categories';
import { Catalog } from '@/components/site/catalog';
import { About } from '@/components/site/about';
import { Contact } from '@/components/site/contact';
import { Footer } from '@/components/site/footer';
import { ProductModal } from '@/components/site/product-modal';
import { AdminPanel } from '@/components/site/admin-panel';
import { FloatingActions } from '@/components/site/floating-actions';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
        <Categories />
        <Catalog />
        <About />
        <Contact />
      </main>
      <Footer />

      {/* Overlays */}
      <ProductModal />
      <AdminPanel />
      <FloatingActions />
    </div>
  );
}
