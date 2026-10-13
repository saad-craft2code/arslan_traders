import { db } from '../src/lib/db';

const CATEGORIES = [
  { name: 'Office Chairs', slug: 'office-chairs', icon: 'chair', description: 'Ergonomic office chairs for executives, staff, and visitors.' },
  { name: 'Office Tables', slug: 'office-tables', icon: 'table', description: 'Workstations, conference tables, and executive desks.' },
  { name: 'Workstations', slug: 'workstations', icon: 'desk', description: 'Cubicle workstations and modular office setups.' },
  { name: 'Sofas & Lounge', slug: 'sofas-lounge', icon: 'sofa', description: 'Reception sofas and lounge seating for offices.' },
  { name: 'Cabinets & Storage', slug: 'cabinets-storage', icon: 'cabinet', description: 'File cabinets, lockers, and storage units.' },
  { name: 'Conference Room', slug: 'conference-room', icon: 'meeting', description: 'Conference tables and meeting room furniture.' },
];

// Verified working image URLs from ZAI image search service
const CHAIR_IMG = [
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9b0dd780d849.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f6edadca4254.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d792260c4a16.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c4e16a056c5e.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7119c1e46c34.jpg',
];
const TABLE_IMG = [
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/76ab9ce362b3.png',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/11d3466b202e.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/76b57a188085.webp',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2e70c447a3ab.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/964506b75bb7.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2844260a4298.jpg',
];
const VISITOR_IMG = [
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bb9e53dca4b6.png',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/575c9e628db5.png',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c2d024edf5e7.png',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c6c9bca9954f.jpg',
];
const WORKSTATION_IMG = [
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2825998ac544.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4d43d430ce7d.webp',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c90366cab8c2.jpg',
];
const SOFA_IMG = [
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/837fccd07ab1.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0efbc85a9952.png',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ccd9cdcd0e4f.jpg',
];
const CABINET_IMG = [
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fcb264f6cade.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7955ad1b7d5a.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2909794757cc.jpg',
];
const CONF_IMG = [
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/49a050f1f7cc.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2e238fbb2fc1.jpg',
  'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c88c2967b3d8.png',
];

const PRODUCTS = [
  // Office Chairs
  {
    name: 'Executive High-Back Leather Chair',
    description: 'Premium full-grain leather executive chair with adjustable lumbar support, chrome base, and tilt-lock mechanism. Designed for long working hours with ergonomic comfort and timeless elegance.',
    price: 32000,
    salePrice: 28500,
    categoryId: 'office-chairs',
    material: 'Full-grain Leather, Chrome',
    color: 'Black',
    dimensions: '70 x 70 x 130 cm',
    weight: '22 kg',
    tags: ['executive', 'leather', 'ergonomic', 'premium'],
    images: [CHAIR_IMG[0], CHAIR_IMG[2]],
    featured: true,
    rating: 4.8,
    reviewCount: 32,
  },
  {
    name: 'Ergonomic Mesh Office Chair',
    description: 'Breathable mesh-back ergonomic chair with adjustable headrest, 4D armrests, seat depth adjustment, and synchronous tilt mechanism. Promotes healthy posture during long work hours.',
    price: 18500,
    salePrice: null,
    categoryId: 'office-chairs',
    material: 'Mesh, Aluminum',
    color: 'Black/Grey',
    dimensions: '65 x 65 x 120 cm',
    weight: '18 kg',
    tags: ['ergonomic', 'mesh', 'adjustable', 'staff'],
    images: [CHAIR_IMG[1], CHAIR_IMG[3]],
    featured: true,
    rating: 4.7,
    reviewCount: 28,
  },
  {
    name: 'Visitor Lounge Chair',
    description: 'Sleek visitor chair with cushioned seat and backrest, sturdy steel frame, and anti-scratch feet. Perfect for reception areas, meeting rooms, and waiting lounges.',
    price: 7500,
    salePrice: null,
    categoryId: 'office-chairs',
    material: 'PU Leather, Steel',
    color: 'Black',
    dimensions: '55 x 60 x 95 cm',
    weight: '8 kg',
    tags: ['visitor', 'reception', 'stackable'],
    images: [VISITOR_IMG[0], VISITOR_IMG[2]],
    featured: false,
    rating: 4.5,
    reviewCount: 15,
  },
  {
    name: 'Executive Recliner Office Chair',
    description: 'Luxurious recliner executive chair with footrest extension, padded armrests, gas-lift height adjustment, and smooth-rolling casters. Perfect blend of comfort and prestige.',
    price: 45000,
    salePrice: 41000,
    categoryId: 'office-chairs',
    material: 'Top-grain Leather, Steel',
    color: 'Brown',
    dimensions: '70 x 75 x 125 cm',
    weight: '26 kg',
    tags: ['executive', 'recliner', 'premium', 'leather'],
    images: [CHAIR_IMG[4], CHAIR_IMG[0]],
    featured: true,
    rating: 4.9,
    reviewCount: 41,
  },
  {
    name: 'Task Chair with Lumbar Support',
    description: 'Affordable task chair with built-in lumbar support, breathable fabric seat, height-adjustable seat, and 360-degree swivel. Ideal for daily staff use.',
    price: 9800,
    salePrice: 8500,
    categoryId: 'office-chairs',
    material: 'Fabric, Nylon',
    color: 'Grey',
    dimensions: '60 x 60 x 105 cm',
    weight: '12 kg',
    tags: ['task', 'staff', 'affordable'],
    images: [VISITOR_IMG[1], VISITOR_IMG[3]],
    featured: false,
    rating: 4.4,
    reviewCount: 19,
  },
  // Office Tables
  {
    name: 'Executive Wooden Office Desk',
    description: 'Solid wood executive desk with spacious work surface, cable management grommets, and built-in drawer unit. Brings warmth and authority to any executive office.',
    price: 68000,
    salePrice: 62000,
    categoryId: 'office-tables',
    material: 'Solid Sheesham Wood, Steel',
    color: 'Walnut',
    dimensions: '160 x 70 x 75 cm',
    weight: '55 kg',
    tags: ['executive', 'wooden', 'desk', 'premium'],
    images: [TABLE_IMG[0], TABLE_IMG[2]],
    featured: true,
    rating: 4.8,
    reviewCount: 22,
  },
  {
    name: 'Modern Glass Workstation',
    description: 'Tempered glass workstation with steel frame, keyboard tray, and CPU shelf. Minimalist design that maximizes space and light in modern offices.',
    price: 28000,
    salePrice: null,
    categoryId: 'office-tables',
    material: 'Tempered Glass, Steel',
    color: 'Black/Glass',
    dimensions: '120 x 60 x 75 cm',
    weight: '28 kg',
    tags: ['modern', 'glass', 'workstation'],
    images: [TABLE_IMG[1], TABLE_IMG[4]],
    featured: false,
    rating: 4.5,
    reviewCount: 17,
  },
  {
    name: 'Computer Desk with Drawers',
    description: 'Practical computer desk with hutch, three drawers, and pull-out keyboard panel. Provides ample storage and work surface for home or office use.',
    price: 22000,
    salePrice: 19500,
    categoryId: 'office-tables',
    material: 'Engineered Wood, Steel',
    color: 'Espresso',
    dimensions: '140 x 65 x 75 cm',
    weight: '35 kg',
    tags: ['computer', 'desk', 'storage'],
    images: [TABLE_IMG[3], TABLE_IMG[5]],
    featured: false,
    rating: 4.6,
    reviewCount: 24,
  },
  // Workstations
  {
    name: 'Modular Office Workstation Set',
    description: 'Complete modular workstation set with partition screens, desk surface, pedestal drawer unit, and cable tray. Configurable for 1, 2, or 4 workstations.',
    price: 95000,
    salePrice: 88000,
    categoryId: 'workstations',
    material: 'Laminated Board, Aluminum',
    color: 'White/Grey',
    dimensions: '160 x 80 x 110 cm',
    weight: '85 kg',
    tags: ['modular', 'workstation', 'partition', 'office'],
    images: [WORKSTATION_IMG[0], WORKSTATION_IMG[2]],
    featured: true,
    rating: 4.7,
    reviewCount: 18,
  },
  {
    name: 'Cubicle Workstation Single Unit',
    description: 'Single cubicle workstation with acoustic partition, integrated shelf, and adjustable CPU holder. Optimizes privacy and focus in shared office spaces.',
    price: 42000,
    salePrice: null,
    categoryId: 'workstations',
    material: 'Laminated Board, Fabric',
    color: 'Beige',
    dimensions: '120 x 70 x 120 cm',
    weight: '45 kg',
    tags: ['cubicle', 'workstation', 'partition'],
    images: [WORKSTATION_IMG[1], WORKSTATION_IMG[0]],
    featured: false,
    rating: 4.4,
    reviewCount: 9,
  },
  // Sofas & Lounge
  {
    name: '3-Seater Office Reception Sofa',
    description: 'Modern 3-seater sofa with high-density foam cushions, stain-resistant fabric upholstery, and solid wood legs. Welcomes guests in style and comfort.',
    price: 55000,
    salePrice: 49500,
    categoryId: 'sofas-lounge',
    material: 'Fabric, Solid Wood',
    color: 'Charcoal Grey',
    dimensions: '200 x 85 x 90 cm',
    weight: '48 kg',
    tags: ['reception', 'sofa', 'lounge', '3-seater'],
    images: [SOFA_IMG[0], SOFA_IMG[2]],
    featured: true,
    rating: 4.7,
    reviewCount: 14,
  },
  {
    name: 'Single Lounge Chair - Premium',
    description: 'Designer lounge chair with curved silhouette, premium fabric upholstery, and tapered wooden legs. Adds character and comfort to executive lounges.',
    price: 28000,
    salePrice: null,
    categoryId: 'sofas-lounge',
    material: 'Premium Fabric, Wood',
    color: 'Mustard',
    dimensions: '75 x 80 x 85 cm',
    weight: '16 kg',
    tags: ['lounge', 'designer', 'reception'],
    images: [SOFA_IMG[1], SOFA_IMG[0]],
    featured: false,
    rating: 4.6,
    reviewCount: 8,
  },
  // Cabinets & Storage
  {
    name: 'Filing Cabinet - 3 Drawer',
    description: 'Sturdy 3-drawer vertical filing cabinet with anti-tilt mechanism, central locking, and smooth ball-bearing slides. Keeps your important documents secure and organized.',
    price: 35000,
    salePrice: 31500,
    categoryId: 'cabinets-storage',
    material: 'Steel, Powder Coated',
    color: 'Grey',
    dimensions: '50 x 60 x 130 cm',
    weight: '38 kg',
    tags: ['filing', 'cabinet', 'storage', 'locking'],
    images: [CABINET_IMG[0], CABINET_IMG[2]],
    featured: false,
    rating: 4.5,
    reviewCount: 12,
  },
  {
    name: 'Office Steel Locker',
    description: 'Multi-compartment steel locker with individual locks for personal storage in shared offices. Durable powder-coated finish and ventilated doors.',
    price: 48000,
    salePrice: null,
    categoryId: 'cabinets-storage',
    material: 'Steel, Powder Coated',
    color: 'Grey/Blue',
    dimensions: '90 x 45 x 180 cm',
    weight: '65 kg',
    tags: ['locker', 'storage', 'steel'],
    images: [CABINET_IMG[1], CABINET_IMG[0]],
    featured: false,
    rating: 4.4,
    reviewCount: 6,
  },
  // Conference Room
  {
    name: '12-Seater Conference Table',
    description: 'Spacious 12-seater conference table with boat-shape design, integrated cable management, and polished wood finish. Commands attention in any boardroom.',
    price: 145000,
    salePrice: 132000,
    categoryId: 'conference-room',
    material: 'Solid Wood, Steel',
    color: 'Walnut',
    dimensions: '360 x 120 x 75 cm',
    weight: '120 kg',
    tags: ['conference', 'boardroom', 'meeting'],
    images: [CONF_IMG[0], CONF_IMG[1]],
    featured: true,
    rating: 4.9,
    reviewCount: 7,
  },
  {
    name: 'Glass Conference Table 6-Seater',
    description: 'Sleek 6-seater glass conference table with chrome legs and steel frame. Modern minimalist design that makes meetings feel open and collaborative.',
    price: 78000,
    salePrice: 71000,
    categoryId: 'conference-room',
    material: 'Tempered Glass, Chrome',
    color: 'Clear/Chrome',
    dimensions: '200 x 100 x 75 cm',
    weight: '55 kg',
    tags: ['conference', 'glass', 'modern'],
    images: [CONF_IMG[2], CONF_IMG[0]],
    featured: false,
    rating: 4.6,
    reviewCount: 11,
  },
];

async function main() {
  console.log('Re-seeding database with verified image URLs...');

  await db.product.deleteMany({});
  await db.category.deleteMany({});

  const categoryMap = new Map<string, string>();
  for (const cat of CATEGORIES) {
    const created = await db.category.create({ data: cat });
    categoryMap.set(cat.slug, created.id);
    console.log(`Created category: ${cat.name}`);
  }

  for (const product of PRODUCTS) {
    const categoryId = categoryMap.get(product.categoryId);
    if (!categoryId) continue;
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now().toString(36).slice(-4);
    const created = await db.product.create({
      data: {
        name: product.name,
        slug,
        description: product.description,
        price: product.price,
        salePrice: product.salePrice || null,
        material: product.material,
        color: product.color,
        dimensions: product.dimensions,
        weight: product.weight,
        tags: product.tags,
        images: product.images,
        featured: product.featured,
        rating: product.rating,
        reviewCount: product.reviewCount,
        categoryId,
      },
    });
    console.log(`Created product: ${created.name}`);
  }

  console.log('\nRe-seed completed!');
  console.log(`Categories: ${CATEGORIES.length}, Products: ${PRODUCTS.length}`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
