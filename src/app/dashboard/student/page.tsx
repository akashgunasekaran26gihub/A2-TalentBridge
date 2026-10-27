import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { FALLBACK_STUDENT, FALLBACK_OPPORTUNITIES } from '@/lib/fallback-data';
import StudentDashboardContent from '@/components/dashboard/StudentDashboardContent';

export const dynamic = 'force-dynamic';

export default async function StudentDashboardPage() {
  let student: any = null;
  let recommendations: any[] = [];

  try {
    student = await prisma.studentProfile.findFirst({
      where: { user: { email: 'arturs.berzins@edu.rtu.lv' } },
      include: {
        user: true,
        skills: { include: { skill: true } },
        applications: {
          include: {
            opportunity: {
              include: { organization: true, requiredSkills: { include: { skill: true } } },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        projectMemberships: {
          include: {
            project: {
              include: { organization: true, deliverables: true },
            },
          },
        },
        verifiedExperiences: {
          include: {
            credential: true,
          },
          orderBy: { verifiedAt: 'desc' },
        },
      },
    });

    recommendations = await prisma.opportunity.findMany({
      where: { status: 'Published' },
      include: {
        organization: true,
        requiredSkills: { include: { skill: true } },
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
  } catch (err) {
    console.warn('Database query failed in StudentDashboardPage, using fallback data:', err);
  }

  if (!student) {
    student = FALLBACK_STUDENT;
  }

  if (!recommendations || recommendations.length === 0) {
    recommendations = FALLBACK_OPPORTUNITIES.slice(0, 3);
  }

  const matchScores = [94, 89, 82];

  return (
    <StudentDashboardContent
      student={student}
      recommendations={recommendations}
      matchScores={matchScores}
    />
  );
}
