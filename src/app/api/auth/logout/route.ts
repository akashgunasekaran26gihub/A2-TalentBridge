import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  // Expire session cookie
  response.cookies.set('a2_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
  return response;
}
