import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { computeOpportunityMatch } from '@/lib/matching';
import { z } from 'zod';

const createApplicationSchema = z.object({
  opportunityId: z.string().min(1),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().optional(),
});

const updateStatusSchema = z.object({
  applicationId: z.string().min(1),
  status: z.enum(['Submitted', 'Under Review', 'Shortlisted', 'Interview', 'Accepted', 'Rejected', 'Withdrawn']),
  notes: z.string().optional(),
  interviewDate: z.string().optional(),
});

export const dynamic = 'force-dynamic';

// GET: Retrieve applications for student or company
export async function GET(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const opportunityId = searchParams.get('opportunityId');

    // 1. If student: return their applications with timeline history
    if (session.roles.includes('STUDENT')) {
      const studentProfile = await prisma.studentProfile.findUnique({
        where: { userId: session.id },
      });

      if (!studentProfile) {
        return NextResponse.json({ applications: [] });
      }

      const applications = await prisma.application.findMany({
        where: { studentProfileId: studentProfile.id },
        include: {
          opportunity: { include: { organization: true } },
          statusHistory: { orderBy: { createdAt: 'desc' } },
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ applications });
    }

    // 2. If company: return applications for their organization opportunities
    if (session.roles.includes('COMPANY')) {
      const membership = await prisma.organizationMember.findFirst({
        where: { userId: session.id },
      });

      if (!membership) {
        return NextResponse.json({ applications: [] });
      }

      const whereClause: any = {
        opportunity: { organizationId: membership.organizationId },
      };

      if (opportunityId) {
        whereClause.opportunityId = opportunityId;
      }

      const applications = await prisma.application.findMany({
        where: whereClause,
        include: {
          studentProfile: {
            include: {
              user: true,
              skills: { include: { skill: true } },
              verifiedExperiences: true,
            },
          },
          opportunity: true,
          statusHistory: { orderBy: { createdAt: 'desc' } },
        },
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ applications });
    }

    // 3. Admin: all applications
    if (session.roles.includes('ADMIN')) {
      const applications = await prisma.application.findMany({
        include: {
          studentProfile: { include: { user: true } },
          opportunity: { include: { organization: true } },
          statusHistory: { orderBy: { createdAt: 'desc' } },
        },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ applications });
    }

    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  } catch (error: any) {
    console.error('Fetch applications error:', error);
    return NextResponse.json({ applications: [] });
  }
}

// POST: Student submits an application
export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || !session.roles.includes('STUDENT')) {
      return NextResponse.json({ error: 'Unauthorized. Only students can apply.' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid application payload' }, { status: 400 });
    }

    const { opportunityId, coverLetter, resumeUrl } = parsed.data;

    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: session.id },
      include: { skills: { include: { skill: true } } },
    });

    if (!studentProfile) {
      return NextResponse.json({ error: 'Please complete your student profile before applying.' }, { status: 400 });
    }

    // Verify opportunity exists and is published
    const opportunity = await prisma.opportunity.findUnique({
      where: { id: opportunityId },
      include: { requiredSkills: { include: { skill: true } } },
    });

    if (!opportunity || opportunity.status !== 'Published') {
      return NextResponse.json({ error: 'Opportunity is no longer accepting applications.' }, { status: 400 });
    }

    // Check if already applied
    const existing = await prisma.application.findUnique({
      where: {
        opportunityId_studentProfileId: {
          opportunityId,
          studentProfileId: studentProfile.id,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'You have already applied for this opportunity.' }, { status: 409 });
    }

    // Compute explainable match score
    const matchResult = computeOpportunityMatch(
      {
        skills: studentProfile.skills.map((s) => ({
          name: s.skill.name,
          selfRating: s.selfRating,
          isVerified: s.verificationStatus === 'Project-verified' || s.verificationStatus === 'Company-verified',
        })),
        fieldOfStudy: studentProfile.fieldOfStudy,
        degree: studentProfile.degree,
        studyYear: studentProfile.studyYear,
        city: studentProfile.city,
        availabilityStatus: studentProfile.availabilityStatus,
        weeklyHours: studentProfile.weeklyHours,
        preferredType: studentProfile.preferredType,
      },
      {
        requiredSkills: opportunity.requiredSkills.map((rs) => ({
          name: rs.skill.name,
          isMandatory: rs.isMandatory,
        })),
        locationCity: opportunity.locationCity,
        remoteType: opportunity.remoteType,
        opportunityType: opportunity.opportunityType,
      }
    );

    // Create application and initial timeline entry
    const application = await prisma.application.create({
      data: {
        opportunityId,
        studentProfileId: studentProfile.id,
        coverLetter: coverLetter || null,
        resumeUrl: resumeUrl || studentProfile.cvUrl || null,
        status: 'Submitted',
        matchScore: matchResult.matchScore,
        statusHistory: {
          create: {
            status: 'Submitted',
            changedByRole: 'STUDENT',
            notes: 'Application submitted via student portal.',
          },
        },
      },
      include: { statusHistory: true, opportunity: true },
    });

    // Create in-app notification for student
    await prisma.notification.create({
      data: {
        userId: session.id,
        title: 'Application Submitted',
        message: `Your application for "${opportunity.title}" was submitted with a ${matchResult.matchScore}% match score.`,
        type: 'APPLICATION',
        link: '/dashboard/student',
      },
    });

    return NextResponse.json(
      {
        message: 'Application submitted successfully',
        application,
        matchScore: matchResult.matchScore,
        breakdown: matchResult.breakdown,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Submit application error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

// PATCH: Company or Admin updates application status (Shortlist, Interview, Accept, Reject)
export async function PATCH(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || (!session.roles.includes('COMPANY') && !session.roles.includes('ADMIN'))) {
      return NextResponse.json({ error: 'Unauthorized to update application status' }, { status: 403 });
    }

    const body = await req.json();
    const parsed = updateStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid status update payload' }, { status: 400 });
    }

    const { applicationId, status, notes, interviewDate } = parsed.data;

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        opportunity: true,
        studentProfile: { include: { user: true } },
      },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Verify company ownership if company role
    if (session.roles.includes('COMPANY')) {
      const membership = await prisma.organizationMember.findFirst({
        where: { userId: session.id, organizationId: application.opportunity.organizationId },
      });

      if (!membership) {
        return NextResponse.json({ error: 'Forbidden: You do not manage this opportunity' }, { status: 403 });
      }
    }

    // Update status and append to timeline
    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        feedbackNotes: notes || undefined,
        interviewDate: interviewDate ? new Date(interviewDate) : undefined,
        statusHistory: {
          create: {
            status,
            changedByRole: session.roles.includes('ADMIN') ? 'ADMIN' : 'COMPANY',
            notes: notes || `Status updated to ${status}`,
          },
        },
      },
      include: { statusHistory: { orderBy: { createdAt: 'desc' } } },
    });

    // Notify student
    await prisma.notification.create({
      data: {
        userId: application.studentProfile.userId,
        title: `Application Update: ${application.opportunity.title}`,
        message: `Your application status is now "${status}". ${notes ? `Note: "${notes}"` : ''}`,
        type: 'APPLICATION',
        link: '/dashboard/student',
      },
    });

    return NextResponse.json({ message: 'Status updated', application: updated });
  } catch (error: any) {
    console.error('Update status error:', error);
    return NextResponse.json({ error: 'Failed to update application status' }, { status: 500 });
  }
}
