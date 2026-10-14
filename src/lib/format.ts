export function formatPrice(price: number, currency = 'PKR'): string {
  if (currency === 'PKR') {
    // Pakistani format: 1,23,456 (lakh/crore grouping)
    const s = price.toLocaleString('en-PK');
    return `Rs. ${s}`;
  }
  return `${currency} ${price.toLocaleString('en-US')}`;
}

export function formatPriceShort(price: number): string {
  if (price >= 100000) {
    return `Rs. ${(price / 100000).toFixed(1).replace('.0', '')} L`;
  }
  if (price >= 1000) {
    return `Rs. ${(price / 1000).toFixed(0)}k`;
  }
  return `Rs. ${price.toLocaleString('en-PK')}`;
}

export function calculateDiscount(price: number, salePrice?: number | null): number {
  if (!salePrice || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
