import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { DEMO_ACCOUNTS, FALLBACK_STUDENT, FALLBACK_COMPANY_ORG } from '@/lib/fallback-data';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);

  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  let user: any = null;

  try {
    user = await prisma.user.findUnique({
      where: { id: session.id },
      include: {
        roles: { include: { role: true } },
        studentProfile: {
          include: {
            skills: { include: { skill: true } },
            verifiedExperiences: true,
          },
        },
        orgMemberships: {
          include: {
            organization: {
              include: { companyProfile: true, universityProfile: true },
            },
          },
        },
      },
    });
  } catch (err) {
    console.warn('/api/auth/me database query failed, using session fallback:', err);
  }

  if (!user) {
    const demoUser = DEMO_ACCOUNTS.find(
      (u) => u.id === session.id || u.email.toLowerCase() === session.email.toLowerCase()
    );
    if (demoUser) {
      user = demoUser;
    }
  }

  if (!user || user.isActive === false) {
    // If user object not in DB but we have a valid signed JWT session, synthesize authenticated user
    const primaryRole = session.roles[0] || 'STUDENT';
    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.id,
        email: session.email,
        firstName: session.firstName,
        lastName: session.lastName,
        avatarUrl: null,
        roles: session.roles,
        primaryRole,
        studentProfileId: session.studentProfileId || null,
        organizationId: session.organizationId || null,
        studentProfile: session.studentProfileId ? FALLBACK_STUDENT : null,
        organization: session.organizationId ? FALLBACK_COMPANY_ORG : null,
      },
    });
  }

  const roles = user.roles
    ? user.roles.map((r: any) => (typeof r === 'string' ? r : r.role?.name || r))
    : session.roles;
  const primaryRole = roles[0] || 'STUDENT';

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl || null,
      roles,
      primaryRole,
      studentProfileId: user.studentProfile?.id || session.studentProfileId || null,
      organizationId: user.orgMemberships?.[0]?.organizationId || session.organizationId || null,
      studentProfile: user.studentProfile || (session.studentProfileId ? FALLBACK_STUDENT : null),
      organization: user.orgMemberships?.[0]?.organization || (session.organizationId ? FALLBACK_COMPANY_ORG : null),
    },
  });
}
