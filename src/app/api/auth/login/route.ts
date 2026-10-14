import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_PASSWORD, ADMIN_SESSION_COOKIE, ADMIN_TOKEN, ADMIN_USERNAME, COOKIE_MAX_AGE, isValidCredentials } from '@/lib/auth';

// POST /api/auth/login
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    if (!isValidCredentials(username, password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Set auth cookie
    const response = NextResponse.json({
      success: true,
      username: ADMIN_USERNAME,
    });
    response.cookies.set(ADMIN_SESSION_COOKIE, ADMIN_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
