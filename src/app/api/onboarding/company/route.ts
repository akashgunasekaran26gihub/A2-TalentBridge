import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { z } from 'zod';

const companyOnboardingSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  industry: z.string().min(2, 'Industry is required'),
  companySize: z.string().default('11-50'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  city: z.string().min(1, 'City in Latvia is required'),
  website: z.string().url().optional().or(z.literal('')),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  contactEmail: z.string().email(),
  hiringInterests: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || !session.roles.includes('COMPANY')) {
      return NextResponse.json({ error: 'Unauthorized. Company session required.' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = companyOnboardingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid company onboarding data', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const slug = data.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Create or update organization
    const org = await prisma.organization.create({
      data: {
        name: data.companyName,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        orgType: 'COMPANY',
        country: 'Latvia',
        city: data.city,
        website: data.website || null,
        description: data.description,
        isVerified: true,
        members: {
          create: {
            userId: session.id,
            roleInOrg: 'OWNER',
          },
        },
        companyProfile: {
          create: {
            industry: data.industry,
            companySize: data.companySize,
            contactPerson: data.contactPerson,
            contactEmail: data.contactEmail,
            hiringInterests: data.hiringInterests || 'Software Engineering, Business, Design',
          },
        },
      },
      include: { companyProfile: true },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: 'COMPANY_ONBOARDING_COMPLETED',
        resourceType: 'ORGANIZATION',
        resourceId: org.id,
        details: JSON.stringify({ companyName: org.name }),
      },
    });

    return NextResponse.json({
      message: 'Company onboarding completed successfully',
      organization: org,
    });
  } catch (error: any) {
    console.error('Company onboarding error:', error);
    return NextResponse.json({ error: 'Failed to complete company onboarding' }, { status: 500 });
  }
}
