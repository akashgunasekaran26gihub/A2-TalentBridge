import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);

  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
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

  if (!user || !user.isActive) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const roles = user.roles.map((r) => r.role.name);
  const primaryRole = roles[0] || 'STUDENT';

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      roles,
      primaryRole,
      studentProfileId: user.studentProfile?.id,
      organizationId: user.orgMemberships[0]?.organizationId,
      studentProfile: user.studentProfile,
      organization: user.orgMemberships[0]?.organization || null,
    },
  });
}
