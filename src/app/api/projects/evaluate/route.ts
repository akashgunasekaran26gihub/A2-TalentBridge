import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { z } from 'zod';

const evaluateProjectSchema = z.object({
  projectId: z.string().min(1),
  technicalScore: z.number().min(1).max(5),
  teamworkScore: z.number().min(1).max(5),
  deliveryScore: z.number().min(1).max(5),
  detailedFeedback: z.string().min(20, 'Feedback must be at least 20 characters'),
  recommendation: z.string().optional(),
  verifiedSkills: z.string().min(2, 'Comma separated list of verified skills is required'),
});

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || (!session.roles.includes('COMPANY') && !session.roles.includes('ADMIN') && !session.roles.includes('UNIVERSITY'))) {
      return NextResponse.json({ error: 'Unauthorized to submit project evaluation' }, { status: 403 });
    }

    const body = await req.json();
    const parsed = evaluateProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid evaluation payload', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Fetch project with members and organization
    const project = await prisma.project.findUnique({
      where: { id: data.projectId },
      include: {
        organization: true,
        members: { include: { studentProfile: { include: { user: true } } } },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const overallScore = parseFloat(
      ((data.technicalScore + data.teamworkScore + data.deliveryScore) / 3).toFixed(2)
    );

    // Create Evaluation record
    const evaluation = await prisma.evaluation.create({
      data: {
        projectId: project.id,
        evaluatorId: session.id,
        evaluatorRole: session.roles.includes('UNIVERSITY') ? 'UNIVERSITY_PROFESSOR' : 'COMPANY_MENTOR',
        technicalScore: data.technicalScore,
        teamworkScore: data.teamworkScore,
        deliveryScore: data.deliveryScore,
        overallScore,
        detailedFeedback: data.detailedFeedback,
        recommendation: data.recommendation || null,
      },
    });

    // Update project status to Verified
    await prisma.project.update({
      where: { id: project.id },
      data: { status: 'Verified' },
    });

    // Generate Verified Experience and Digital Credentials for all team members
    const issuedCredentials = [];
    for (const member of project.members) {
      const studentId = member.studentProfileId;
      const codeSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const credentialCode = `A2-LV-${new Date().getFullYear()}-${codeSuffix}`;

      const verifiedExp = await prisma.verifiedExperience.create({
        data: {
          studentProfileId: studentId,
          projectId: project.id,
          projectTitle: project.title,
          organizationName: project.organization.name,
          durationWeeks: 8,
          skillsVerified: data.verifiedSkills,
          verifiedBy: `${session.firstName} ${session.lastName}, ${project.organization.name}`,
          status: 'Verified',
          credential: {
            create: {
              credentialCode,
              publicUrl: `/verify/${credentialCode}`,
              isValid: true,
            },
          },
        },
        include: { credential: true },
      });

      // Update student skills to Project-verified
      const skillNames = data.verifiedSkills.split(',').map((s) => s.trim());
      for (const sName of skillNames) {
        const skillRecord = await prisma.skill.findUnique({ where: { name: sName } });
        if (skillRecord) {
          await prisma.studentSkill.upsert({
            where: {
              studentProfileId_skillId: {
                studentProfileId: studentId,
                skillId: skillRecord.id,
              },
            },
            update: {
              verificationStatus: 'Project-verified',
              verifiedBy: project.organization.name,
              evidenceUrl: `/verify/${credentialCode}`,
            },
            create: {
              studentProfileId: studentId,
              skillId: skillRecord.id,
              selfRating: 5,
              verificationStatus: 'Project-verified',
              verifiedBy: project.organization.name,
              evidenceUrl: `/verify/${credentialCode}`,
            },
          });
        }
      }

      // Notify student
      await prisma.notification.create({
        data: {
          userId: member.studentProfile.userId,
          title: 'Verified Experience Credential Minted! 🎓',
          message: `Congratulations! Your work on "${project.title}" has been evaluated (${overallScore}/5.0). Credential code: ${credentialCode}`,
          type: 'EVALUATION',
          link: `/verify/${credentialCode}`,
        },
      });

      issuedCredentials.push(verifiedExp);
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: 'PROJECT_EVALUATED_AND_VERIFIED',
        resourceType: 'PROJECT',
        resourceId: project.id,
        details: JSON.stringify({ overallScore, credentialsMinted: issuedCredentials.length }),
      },
    });

    return NextResponse.json({
      message: 'Project evaluated successfully. Verified credentials minted.',
      evaluation,
      credentials: issuedCredentials,
    });
  } catch (error: any) {
    console.error('Project evaluation error:', error);
    return NextResponse.json({ error: 'Failed to submit evaluation' }, { status: 500 });
  }
}
