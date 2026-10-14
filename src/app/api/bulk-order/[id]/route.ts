import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PUT /api/bulk-order/[id] - Update status
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updateData: any = {};
    if (body.status !== undefined) updateData.status = body.status;

    const order = await db.bulkOrder.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('PUT /api/bulk-order/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update bulk order' }, { status: 500 });
  }
}

// DELETE /api/bulk-order/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.bulkOrder.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/bulk-order/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete bulk order' }, { status: 500 });
  }
}
