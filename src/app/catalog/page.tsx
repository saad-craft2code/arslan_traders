'use client';

import { StoreLayout } from '@/components/site/store-layout';
import { PageHeader } from '@/components/site/page-header';
import { Catalog } from '@/components/site/catalog';

export default function CatalogPage() {
  return (
    <StoreLayout>
      <PageHeader
        eyebrow="The Collection"
        title="Browse our complete"
        titleAccent="furniture catalog"
        subtitle="Hand-picked office furniture for every workspace — chairs, tables, workstations, conference tables, sofas, and storage. Filter by category, price, or search to find exactly what you need."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Catalog' },
        ]}
      />
      <Catalog />
    </StoreLayout>
  );
}
