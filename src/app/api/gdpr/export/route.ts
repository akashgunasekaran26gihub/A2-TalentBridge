import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = await prisma.user.findUnique({
      where: { id: session.id },
      include: {
        roles: { include: { role: true } },
        studentProfile: {
          include: {
            skills: { include: { skill: true } },
            education: true,
            certifications: true,
            applications: { include: { opportunity: true } },
            verifiedExperiences: { include: { credential: true } },
          },
        },
        orgMemberships: {
          include: { organization: true },
        },
        notifications: true,
      },
    });

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Exclude password hash from GDPR personal export
    const { passwordHash, ...cleanData } = userData;

    // Log export audit event
    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: 'GDPR_DATA_EXPORT_REQUESTED',
        resourceType: 'USER',
        resourceId: session.id,
      },
    });

    return new NextResponse(JSON.stringify(cleanData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="a2-talentbridge-data-export-${session.id}.json"`,
      },
    });
  } catch (error: any) {
    console.error('GDPR export error:', error);
    return NextResponse.json({ error: 'Failed to export user data' }, { status: 500 });
  }
}
