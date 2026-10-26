// Phase 2 Public Website Automated Test Suite
// Verifies public data queries, opportunity filters, impact counters, and credential verification

const test = require('node:test');
const assert = require('node:assert/strict');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

test('Phase 2: Opportunities Filtering Test', async (t) => {
  await t.test('Fetch all published opportunities', async () => {
    const opps = await prisma.opportunity.findMany({
      where: { status: 'Published' },
      include: { organization: true, requiredSkills: { include: { skill: true } } },
    });
    assert.ok(opps.length >= 5, 'Should have at least 5 published opportunities');
  });

  await t.test('Filter by opportunity type Internship', async () => {
    const internships = await prisma.opportunity.findMany({
      where: { status: 'Published', opportunityType: 'Internship' },
    });
    assert.ok(internships.length >= 1, 'Should find at least 1 internship');
    assert.equal(internships[0].opportunityType, 'Internship');
  });

  await t.test('Filter by opportunity type Challenge', async () => {
    const challenges = await prisma.opportunity.findMany({
      where: { status: 'Published', opportunityType: 'Challenge' },
    });
    assert.ok(challenges.length >= 2, 'Should find at least 2 challenges');
    assert.equal(challenges[0].opportunityType, 'Challenge');
  });

  await t.test('Search query matches title keywords', async () => {
    const results = await prisma.opportunity.findMany({
      where: {
        status: 'Published',
        OR: [
          { title: { contains: 'Cloud' } },
          { description: { contains: 'Cloud' } },
        ],
      },
    });
    assert.ok(results.length >= 1, 'Should find cloud opportunities');
  });
});

test('Phase 2: Impact Metrics Aggregation Test', async (t) => {
  const [totalStudents, totalCompanies, totalUniversities, verifiedCredentials] = await Promise.all([
    prisma.studentProfile.count(),
    prisma.organization.count({ where: { orgType: 'COMPANY' } }),
    prisma.organization.count({ where: { orgType: 'UNIVERSITY' } }),
    prisma.credential.count({ where: { isValid: true } }),
  ]);

  assert.ok(totalStudents >= 5, 'Students metric must be >= 5');
  assert.ok(totalCompanies >= 5, 'Companies metric must be >= 5');
  assert.ok(totalUniversities >= 3, 'Universities metric must be >= 3');
  assert.ok(verifiedCredentials >= 1, 'Verified credentials metric must be >= 1');
});

test('Phase 2: Credential Verification Endpoint Data Test', async (t) => {
  const code = 'A2-LV-2026-X89K';
  const cred = await prisma.credential.findUnique({
    where: { credentialCode: code },
    include: {
      verifiedExperience: {
        include: {
          studentProfile: { include: { user: true } },
          project: { include: { organization: true, evaluations: true } },
        },
      },
    },
  });

  assert.ok(cred, `Credential ${code} must resolve`);
  assert.equal(cred.isValid, true);
  assert.equal(cred.verifiedExperience.projectTitle, 'Sustainability Analytics Dashboard');
  assert.equal(cred.verifiedExperience.organizationName, 'DemoTech Latvia');
  assert.equal(cred.verifiedExperience.studentProfile.user.firstName, 'Artūrs');
  assert.ok(cred.verifiedExperience.skillsVerified.includes('React'));
});
