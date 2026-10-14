import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/products/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await db.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('GET /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.price !== undefined) updateData.price = parseInt(body.price, 10);
    if (body.salePrice !== undefined) updateData.salePrice = body.salePrice ? parseInt(body.salePrice, 10) : null;
    if (body.sku !== undefined) updateData.sku = body.sku;
    if (body.stock !== undefined) updateData.stock = parseInt(body.stock, 10);
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.material !== undefined) updateData.material = body.material;
    if (body.color !== undefined) updateData.color = body.color;
    if (body.dimensions !== undefined) updateData.dimensions = body.dimensions;
    if (body.weight !== undefined) updateData.weight = body.weight;
    if (body.tags !== undefined) updateData.tags = body.tags;
    if (body.images !== undefined) updateData.images = body.images;
    if (body.videoUrl !== undefined) updateData.videoUrl = body.videoUrl;
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
    if (body.inStock !== undefined) updateData.inStock = body.inStock;

    const product = await db.product.update({
      where: { id },
      data: updateData,
      include: { category: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
