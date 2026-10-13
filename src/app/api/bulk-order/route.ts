import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/bulk-order - List all bulk orders (admin)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;

    const where: any = {};
    if (status && status !== 'all') {
      where.status = status;
    }

    const orders = await db.bulkOrder.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 500,
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('GET /api/bulk-order error:', error);
    return NextResponse.json({ error: 'Failed to fetch bulk orders' }, { status: 500 });
  }
}

// POST /api/bulk-order - Create a new bulk order request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.quantity) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, quantity' },
        { status: 400 }
      );
    }

    if (body.quantity < 1) {
      return NextResponse.json(
        { error: 'Quantity must be at least 1' },
        { status: 400 }
      );
    }

    const order = await db.bulkOrder.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company || null,
        city: body.city || null,
        productType: body.productType || null,
        quantity: parseInt(body.quantity, 10),
        budget: body.budget || null,
        message: body.message || '',
        status: 'new',
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('POST /api/bulk-order error:', error);
    return NextResponse.json({ error: 'Failed to create bulk order' }, { status: 500 });
  }
}
