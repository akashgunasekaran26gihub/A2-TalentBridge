import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { FALLBACK_EMERGING_TALENT } from '@/lib/fallback-data';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || (!session.roles.includes('COMPANY') && !session.roles.includes('ADMIN') && !session.roles.includes('UNIVERSITY'))) {
      return NextResponse.json({ error: 'Unauthorized to access talent discovery' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const skillParam = searchParams.get('skill') || '';
    const uniParam = searchParams.get('university') || '';
    const cityParam = searchParams.get('city') || '';
    const verifiedOnly = searchParams.get('verified') === 'true';

    const whereClause: any = {
      user: { isActive: true },
    };

    if (uniParam) {
      whereClause.universityName = { contains: uniParam };
    }

    if (cityParam) {
      whereClause.city = cityParam;
    }

    if (verifiedOnly) {
      whereClause.verifiedExperiences = {
        some: { status: 'Verified' },
      };
    }

    if (skillParam) {
      whereClause.skills = {
        some: {
          skill: { name: { contains: skillParam } },
        },
      };
    }

    let students: any[] = [];
    try {
      students = await prisma.studentProfile.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
            },
          },
          skills: {
            include: { skill: true },
          },
          verifiedExperiences: {
            include: { credential: true },
          },
        },
        orderBy: { profileScore: 'desc' },
        take: 50,
      });
    } catch (dbErr) {
      console.warn('Talent discovery db query failed, using fallback talent:', dbErr);
    }

    if (!students || students.length === 0) {
      students = FALLBACK_EMERGING_TALENT;
    }

    return NextResponse.json({ students });
  } catch (error: any) {
    console.error('Talent discovery error:', error);
    return NextResponse.json({ students: FALLBACK_EMERGING_TALENT });
  }
}
