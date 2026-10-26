import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signSessionToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid login credentials', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        roles: { include: { role: true } },
        studentProfile: true,
        orgMemberships: { include: { organization: true } },
      },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Invalid email address or password' },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email address or password' },
        { status: 401 }
      );
    }

    const roles = user.roles.map((ur) => ur.role.name);
    const primaryRole = roles[0] || 'STUDENT';
    const studentProfileId = user.studentProfile?.id;
    const organizationId = user.orgMemberships[0]?.organizationId;

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_LOGIN',
        resourceType: 'USER',
        resourceId: user.id,
        details: JSON.stringify({ email: user.email, roles }),
      },
    });

    // Sign session token
    const sessionToken = signSessionToken({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles,
      studentProfileId,
      organizationId,
    });

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles,
        primaryRole,
        studentProfileId,
        organizationId,
      },
      token: sessionToken,
    });

    // Set secure HTTP-only cookie
    response.cookies.set('a2_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error during login' },
      { status: 500 }
    );
  }
}
