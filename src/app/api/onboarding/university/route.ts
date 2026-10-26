import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { z } from 'zod';

const universityOnboardingSchema = z.object({
  universityName: z.string().min(2, 'University name is required'),
  institutionType: z.string().default('Public University'),
  city: z.string().min(1, 'City is required'),
  rectorOrDean: z.string().min(2, 'Dean or Rector name is required'),
  contactEmail: z.string().email(),
  academicPrograms: z.string().min(5, 'Academic programs list is required'),
  website: z.string().url().optional().or(z.literal('')),
});

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || !session.roles.includes('UNIVERSITY')) {
      return NextResponse.json({ error: 'Unauthorized. University session required.' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = universityOnboardingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid university onboarding data', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const slug = data.universityName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const org = await prisma.organization.create({
      data: {
        name: data.universityName,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        orgType: 'UNIVERSITY',
        country: 'Latvia',
        city: data.city,
        website: data.website || null,
        description: `Higher education institution accredited in Latvia. Programs: ${data.academicPrograms}`,
        isVerified: true,
        members: {
          create: {
            userId: session.id,
            roleInOrg: 'OWNER',
          },
        },
        universityProfile: {
          create: {
            institutionType: data.institutionType,
            rectorOrDean: data.rectorOrDean,
            contactEmail: data.contactEmail,
            academicPrograms: data.academicPrograms,
          },
        },
      },
      include: { universityProfile: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: 'UNIVERSITY_ONBOARDING_COMPLETED',
        resourceType: 'ORGANIZATION',
        resourceId: org.id,
        details: JSON.stringify({ universityName: org.name }),
      },
    });

    return NextResponse.json({
      message: 'University onboarding completed successfully',
      organization: org,
    });
  } catch (error: any) {
    console.error('University onboarding error:', error);
    return NextResponse.json({ error: 'Failed to complete university onboarding' }, { status: 500 });
  }
}
