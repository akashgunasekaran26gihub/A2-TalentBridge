import { prisma } from '@/lib/prisma';
import {
  FALLBACK_UNIVERSITY_STUDENTS,
  FALLBACK_PARTNER_COMPANIES,
} from '@/lib/fallback-data';
import UniversityDashboardContent from '@/components/dashboard/UniversityDashboardContent';

export const dynamic = 'force-dynamic';

export default async function UniversityDashboardPage() {
  let students: any[] = [];
  let activeOpportunitiesCount = 64;
  let liveProjectsCount = 18;
  let verifiedExperiences: any[] = [];
  let partnerCompaniesCount = 48;
  let partnerCompanies: any[] = [];

  try {
    const results = await Promise.all([
      prisma.studentProfile.findMany({
        where: { universityName: 'Riga Technical University' },
        include: {
          user: true,
          skills: { include: { skill: true } },
          verifiedExperiences: { include: { credential: true } },
          applications: { include: { opportunity: { include: { organization: true } } } },
        },
        take: 10,
      }),
      prisma.opportunity.count({ where: { status: 'Published' } }),
      prisma.project.count({ where: { status: 'Active' } }),
      prisma.verifiedExperience.findMany({
        include: {
          credential: true,
          studentProfile: { include: { user: true } },
          project: { include: { organization: true } },
        },
        take: 5,
      }),
      prisma.organization.count({ where: { orgType: 'COMPANY', isVerified: true } }),
      prisma.organization.findMany({
        where: { orgType: 'COMPANY', isVerified: true },
        include: {
          companyProfile: true,
          _count: { select: { opportunities: true, projectsSponsored: true } },
        },
        take: 4,
      }),
    ]);

    students = results[0];
    activeOpportunitiesCount = results[1];
    liveProjectsCount = results[2];
    verifiedExperiences = results[3];
    partnerCompaniesCount = results[4];
    partnerCompanies = results[5];
  } catch (err) {
    console.warn('Database query failed in UniversityDashboardPage, using fallback data:', err);
  }

  if (!students || students.length === 0) {
    students = FALLBACK_UNIVERSITY_STUDENTS;
  }

  if (!partnerCompanies || partnerCompanies.length === 0) {
    partnerCompanies = FALLBACK_PARTNER_COMPANIES;
  }

  return (
    <UniversityDashboardContent
      students={students}
      activeOpportunitiesCount={activeOpportunitiesCount}
      liveProjectsCount={liveProjectsCount}
      verifiedExperiences={verifiedExperiences}
      partnerCompaniesCount={partnerCompaniesCount}
      partnerCompanies={partnerCompanies}
    />
  );
}
