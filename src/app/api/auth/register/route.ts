import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signSessionToken } from '@/lib/auth';
import { ROLES } from '@/lib/rbac';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['STUDENT', 'COMPANY', 'UNIVERSITY', 'COMMUNITY']),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid registration data', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName, role: roleName } = parsed.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    // Find role in DB
    const roleRecord = await prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!roleRecord) {
      return NextResponse.json({ error: 'Specified role not found' }, { status: 400 });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user and link role
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        isEmailVerified: true, // Auto-verified for seamless MVP onboarding
        roles: {
          create: {
            roleId: roleRecord.id,
          },
        },
      },
      include: {
        roles: { include: { role: true } },
      },
    });

    // Create initial profile container if student
    let studentProfileId: string | undefined;
    if (roleName === 'STUDENT') {
      const studentProfile = await prisma.studentProfile.create({
        data: {
          userId: newUser.id,
          country: 'Latvia',
          city: 'Riga',
          profileScore: 10,
        },
      });
      studentProfileId = studentProfile.id;
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: newUser.id,
        action: 'USER_REGISTER',
        resourceType: 'USER',
        resourceId: newUser.id,
        details: JSON.stringify({ role: roleName, email: newUser.email }),
      },
    });

    // Generate JWT token
    const sessionToken = signSessionToken({
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      roles: [roleName],
      studentProfileId,
    });

    const response = NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          roles: [roleName],
          primaryRole: roleName,
          studentProfileId,
        },
        token: sessionToken,
      },
      { status: 201 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set('a2_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error during registration' },
      { status: 500 }
    );
  }
}
