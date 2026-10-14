'use client';

import { StoreLayout } from '@/components/site/store-layout';
import { PageHeader } from '@/components/site/page-header';
import { Categories } from '@/components/site/categories';

export default function CategoriesPage() {
  return (
    <StoreLayout>
      <PageHeader
        eyebrow="Browse Collections"
        title="Explore by"
        titleAccent="category"
        subtitle="Six curated collections covering every workspace scenario — from executive suites to staff workstations, conference rooms to reception areas."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories' },
        ]}
      />
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Categories />
        </div>
      </section>
    </StoreLayout>
  );
}
