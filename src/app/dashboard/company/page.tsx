import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CompanyDashboardContent from '@/components/dashboard/CompanyDashboardContent';

export const dynamic = 'force-dynamic';

export default async function CompanyDashboardPage() {
  // Query seeded demo company DemoTech Latvia
  const org = await prisma.organization.findFirst({
    where: { name: 'DemoTech Latvia' },
    include: {
      companyProfile: true,
      opportunities: {
        include: {
          _count: { select: { applications: true } },
          requiredSkills: { include: { skill: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
      projectsSponsored: {
        include: {
          deliverables: true,
          members: { include: { studentProfile: { include: { user: true } } } },
        },
      },
    },
  });

  if (!org) {
    notFound();
  }

  // Fetch applications for this organization's opportunities
  const applications = await prisma.application.findMany({
    where: {
      opportunity: { organizationId: org.id },
    },
    include: {
      opportunity: true,
      studentProfile: {
        include: {
          user: true,
          skills: { include: { skill: true } },
          verifiedExperiences: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Query top emerging talent (Talent Discovery)
  const emergingTalent = await prisma.studentProfile.findMany({
    include: {
      user: true,
      skills: { include: { skill: true } },
      verifiedExperiences: true,
    },
    take: 3,
    orderBy: { profileScore: 'desc' },
  });

  return (
    <CompanyDashboardContent
      org={org}
      applications={applications}
      emergingTalent={emergingTalent}
    />
  );
}
