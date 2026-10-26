import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { z } from 'zod';

const createOpportunitySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  opportunityType: z.enum(['Internship', 'Live Project', 'Challenge', 'Job', 'Community Project']),
  locationCity: z.string().default('Riga'),
  remoteType: z.enum(['On-site', 'Hybrid', 'Remote']),
  durationWeeks: z.number().min(1).default(8),
  stipendEur: z.number().min(0).default(0),
  applicationDeadline: z.string().min(1, 'Application deadline is required'),
  skills: z.array(z.string()).min(1, 'Select at least one required skill'),
});

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || (!session.roles.includes('COMPANY') && !session.roles.includes('ADMIN'))) {
      return NextResponse.json({ error: 'Unauthorized to post opportunities' }, { status: 403 });
    }

    const membership = await prisma.organizationMember.findFirst({
      where: { userId: session.id },
    });

    if (!membership && !session.roles.includes('ADMIN')) {
      return NextResponse.json({ error: 'Please set up your company profile first' }, { status: 400 });
    }

    const orgId = membership?.organizationId;
    if (!orgId) {
      return NextResponse.json({ error: 'Organization ID is missing' }, { status: 400 });
    }

    const body = await req.json();
    const parsed = createOpportunitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid opportunity payload', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Resolve skill IDs
    const skillRecords = await prisma.skill.findMany({
      where: { name: { in: data.skills } },
    });

    const opp = await prisma.opportunity.create({
      data: {
        organizationId: orgId,
        title: data.title,
        description: data.description,
        opportunityType: data.opportunityType,
        locationCity: data.locationCity,
        locationCountry: 'Latvia',
        remoteType: data.remoteType,
        durationWeeks: data.durationWeeks,
        stipendEur: data.stipendEur,
        applicationDeadline: new Date(data.applicationDeadline),
        status: 'Published',
        requiredSkills: {
          create: skillRecords.map((s) => ({
            skillId: s.id,
            isMandatory: true,
          })),
        },
      },
      include: { requiredSkills: { include: { skill: true } } },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: 'OPPORTUNITY_CREATED',
        resourceType: 'OPPORTUNITY',
        resourceId: opp.id,
        details: JSON.stringify({ title: opp.title, type: opp.opportunityType }),
      },
    });

    return NextResponse.json({ message: 'Opportunity published successfully', opportunity: opp }, { status: 201 });
  } catch (error: any) {
    console.error('Create opportunity error:', error);
    return NextResponse.json({ error: 'Failed to publish opportunity' }, { status: 500 });
  }
}
