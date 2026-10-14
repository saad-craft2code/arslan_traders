import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/lib/auth';

// POST /api/auth/logout
export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}
