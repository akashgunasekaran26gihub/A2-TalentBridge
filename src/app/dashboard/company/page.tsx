import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  FALLBACK_COMPANY_ORG,
  FALLBACK_APPLICATIONS,
  FALLBACK_EMERGING_TALENT,
} from '@/lib/fallback-data';
import CompanyDashboardContent from '@/components/dashboard/CompanyDashboardContent';

export const dynamic = 'force-dynamic';

export default async function CompanyDashboardPage() {
  let org: any = null;
  let applications: any[] = [];
  let emergingTalent: any[] = [];

  try {
    org = await prisma.organization.findFirst({
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

    if (org) {
      applications = await prisma.application.findMany({
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
    }

    emergingTalent = await prisma.studentProfile.findMany({
      include: {
        user: true,
        skills: { include: { skill: true } },
        verifiedExperiences: true,
      },
      take: 3,
      orderBy: { profileScore: 'desc' },
    });
  } catch (err) {
    console.warn('Database query failed in CompanyDashboardPage, using fallback data:', err);
  }

  if (!org) {
    org = FALLBACK_COMPANY_ORG;
  }

  if (!applications || applications.length === 0) {
    applications = FALLBACK_APPLICATIONS;
  }

  if (!emergingTalent || emergingTalent.length === 0) {
    emergingTalent = FALLBACK_EMERGING_TALENT;
  }

  return (
    <CompanyDashboardContent
      org={org}
      applications={applications}
      emergingTalent={emergingTalent}
    />
  );
}
