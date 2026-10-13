import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/products
// Query params: category (slug), minPrice, maxPrice, search, sort (newest|price_asc|price_desc|popular), featured, limit, offset
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search') || undefined;
    const sort = searchParams.get('sort') || 'newest';
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const where: any = {};
    if (category && category !== 'all') {
      where.category = { slug: category };
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseInt(minPrice, 10);
      if (maxPrice) where.price.lte = parseInt(maxPrice, 10);
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }
    if (featured === 'true') {
      where.featured = true;
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };
    if (sort === 'popular') orderBy = { reviewCount: 'desc' };

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: { category: true },
        orderBy,
        take: limit,
        skip: offset,
      }),
      db.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products - Create new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.description || !body.price || !body.categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, price, categoryId' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = (body.slug || body.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now().toString(36).slice(-6);

    const product = await db.product.create({
      data: {
        name: body.name,
        slug,
        description: body.description,
        price: parseInt(body.price, 10),
        salePrice: body.salePrice ? parseInt(body.salePrice, 10) : null,
        sku: body.sku || null,
        stock: body.stock ? parseInt(body.stock, 10) : 0,
        featured: body.featured || false,
        material: body.material || null,
        color: body.color || null,
        dimensions: body.dimensions || null,
        weight: body.weight || null,
        tags: body.tags || [],
        images: body.images || [],
        videoUrl: body.videoUrl || null,
        categoryId: body.categoryId,
      },
      include: { category: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
