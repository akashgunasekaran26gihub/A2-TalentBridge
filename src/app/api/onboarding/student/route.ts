import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';
import { computeProfileScore } from '@/lib/profile-score';
import { z } from 'zod';

const studentOnboardingSchema = z.object({
  universityName: z.string().min(1, 'University name is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  studyYear: z.number().min(1).max(6),
  city: z.string().min(1, 'City is required'),
  headline: z.string().min(5, 'Headline must be at least 5 characters'),
  bio: z.string().min(20, 'Bio must be at least 20 characters'),
  availabilityStatus: z.enum(['AVAILABLE', 'INTERNSHIP_ONLY', 'BUSY']),
  weeklyHours: z.number().min(5).max(40),
  preferredType: z.enum(['REMOTE', 'HYBRID', 'ON_SITE', 'ANY']),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
});

export async function POST(req: NextRequest) {
  try {
    const session = getSessionFromRequest(req);
    if (!session || !session.roles.includes('STUDENT')) {
      return NextResponse.json({ error: 'Unauthorized. Student session required.' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = studentOnboardingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid student onboarding data', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Calculate genuine profile completeness score
    const scoreResult = computeProfileScore({
      headline: data.headline,
      bio: data.bio,
      universityName: data.universityName,
      degree: data.degree,
      fieldOfStudy: data.fieldOfStudy,
      studyYear: data.studyYear,
      city: data.city,
      availabilityStatus: data.availabilityStatus,
      weeklyHours: data.weeklyHours,
      portfolioUrl: data.portfolioUrl,
      githubUrl: data.githubUrl,
      linkedinUrl: data.linkedinUrl,
      skillsCount: data.skills.length,
      educationCount: 1, // Onboarding includes primary education entry
    });

    // Upsert student profile
    const profile = await prisma.studentProfile.upsert({
      where: { userId: session.id },
      update: {
        universityName: data.universityName,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        studyYear: data.studyYear,
        city: data.city,
        headline: data.headline,
        bio: data.bio,
        availabilityStatus: data.availabilityStatus,
        weeklyHours: data.weeklyHours,
        preferredType: data.preferredType,
        portfolioUrl: data.portfolioUrl || null,
        githubUrl: data.githubUrl || null,
        linkedinUrl: data.linkedinUrl || null,
        profileScore: scoreResult.totalScore,
      },
      create: {
        userId: session.id,
        country: 'Latvia',
        universityName: data.universityName,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        studyYear: data.studyYear,
        city: data.city,
        headline: data.headline,
        bio: data.bio,
        availabilityStatus: data.availabilityStatus,
        weeklyHours: data.weeklyHours,
        preferredType: data.preferredType,
        portfolioUrl: data.portfolioUrl || null,
        githubUrl: data.githubUrl || null,
        linkedinUrl: data.linkedinUrl || null,
        profileScore: scoreResult.totalScore,
      },
    });

    // Link skills
    for (const skillName of data.skills) {
      const skillRecord = await prisma.skill.findUnique({
        where: { name: skillName },
      });

      if (skillRecord) {
        await prisma.studentSkill.upsert({
          where: {
            studentProfileId_skillId: {
              studentProfileId: profile.id,
              skillId: skillRecord.id,
            },
          },
          update: {},
          create: {
            studentProfileId: profile.id,
            skillId: skillRecord.id,
            selfRating: 4,
            verificationStatus: 'Self-declared',
          },
        });
      }
    }

    // Add baseline education entry
    await prisma.education.create({
      data: {
        studentProfileId: profile.id,
        institutionName: data.universityName,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        startDate: new Date('2023-09-01'),
        isCurrent: true,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: 'STUDENT_ONBOARDING_COMPLETED',
        resourceType: 'STUDENT_PROFILE',
        resourceId: profile.id,
        details: JSON.stringify({ score: scoreResult.totalScore }),
      },
    });

    return NextResponse.json({
      message: 'Student onboarding completed successfully',
      profileScore: scoreResult.totalScore,
      breakdown: scoreResult.details,
      profile,
    });
  } catch (error: any) {
    console.error('Student onboarding error:', error);
    return NextResponse.json({ error: 'Failed to complete student onboarding' }, { status: 500 });
  }
}
