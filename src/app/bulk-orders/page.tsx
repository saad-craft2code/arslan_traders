'use client';

import { StoreLayout } from '@/components/site/store-layout';
import { PageHeader } from '@/components/site/page-header';
import { BulkOrders } from '@/components/site/bulk-orders';

export default function BulkOrdersPage() {
  return (
    <StoreLayout>
      <PageHeader
        eyebrow="For Businesses & Institutions"
        title="Bulk orders for"
        titleAccent="offices, schools & teams"
        subtitle="Equipping an entire office, school, or co-working space? Get wholesale pricing, free installation, and dedicated project support. Tell us what you need and we'll send a personalized quote within 24 hours."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Bulk Orders' },
        ]}
        dark
      />
      <BulkOrders />
    </StoreLayout>
  );
}
