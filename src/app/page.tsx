import React from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/landing/HeroSection';
import TrustStrip from '@/components/landing/TrustStrip';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import EcosystemGrid from '@/components/landing/EcosystemGrid';
import FeaturedOpportunities from '@/components/landing/FeaturedOpportunities';
import CredentialVerifier from '@/components/landing/CredentialVerifier';
import FinalCtaSection from '@/components/landing/FinalCtaSection';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'A2 TalentBridge | Bridging Talent, Education & Opportunity in Latvia',
  description:
    'Connect education with real-world experience. A2 TalentBridge brings students, universities and employers together through live opportunities, project sprints and verified skills.',
  openGraph: {
    title: 'A2 TalentBridge | Bridging Talent, Education & Opportunity',
    description:
      'Connect education with real-world experience in Latvia. Internships, live company sprints, and verified credentials.',
    url: 'https://a2talentbridge.lv',
    siteName: 'A2 TalentBridge',
    locale: 'en_LV',
    type: 'website',
  },
};

export default async function HomePage() {
  const featuredOpportunities = await prisma.opportunity.findMany({
    where: { status: 'Published' },
    include: {
      organization: true,
      requiredSkills: { include: { skill: true } },
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="landing-page-wrapper">
      {/* 1. High-Impact Hero with Live Preview Card */}
      <HeroSection />

      {/* 2. Partner Institutions & Enterprise Sponsors Strip */}
      <TrustStrip />

      {/* 3. 3-Step Clear Pathway */}
      <HowItWorksSection />

      {/* 4. Ecosystem Solutions (Students, Companies, Universities) */}
      <EcosystemGrid />

      {/* 5. Live Marketplace Preview (from Database) */}
      <FeaturedOpportunities opportunities={featuredOpportunities} />

      {/* 6. Signature Verifiable Credential Showcase */}
      <CredentialVerifier />

      {/* 7. High-Conversion CTA Banner */}
      <FinalCtaSection />

      {/* 8. Modern Footer */}
      <Footer />
    </div>
  );
}
