import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import StudentDashboardContent from '@/components/dashboard/StudentDashboardContent';

export const dynamic = 'force-dynamic';

export default async function StudentDashboardPage() {
  // Query seeded demo student Artūrs Bērziņš
  const student = await prisma.studentProfile.findFirst({
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

  if (!student) {
    notFound();
  }

  // Fetch top 3 recommended opportunities
  const recommendations = await prisma.opportunity.findMany({
    where: { status: 'Published' },
    include: {
      organization: true,
      requiredSkills: { include: { skill: true } },
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  const matchScores = [94, 89, 82];

  return (
    <StudentDashboardContent
      student={student}
      recommendations={recommendations}
      matchScores={matchScores}
    />
  );
}
