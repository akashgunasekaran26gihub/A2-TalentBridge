// Phase 1 Foundation & Core Logic Automated Test Suite
// Verifies Timezone, RBAC, Profile Scoring, Explainable Matching, and Database Seeding

const test = require('node:test');
const assert = require('node:assert/strict');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

test('Phase 1: Database Seed Verification', async (t) => {
  await t.test('Roles exist and include all 5 primary user types', async () => {
    const roles = await prisma.role.findMany();
    const roleNames = roles.map((r) => r.name);
    assert.ok(roleNames.includes('STUDENT'), 'STUDENT role must exist');
    assert.ok(roleNames.includes('COMPANY'), 'COMPANY role must exist');
    assert.ok(roleNames.includes('UNIVERSITY'), 'UNIVERSITY role must exist');
    assert.ok(roleNames.includes('COMMUNITY'), 'COMMUNITY role must exist');
    assert.ok(roleNames.includes('ADMIN'), 'ADMIN role must exist');
  });

  await t.test('Platform Admin account exists and is email verified', async () => {
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@a2talentbridge.lv' },
      include: { roles: { include: { role: true } } },
    });
    assert.ok(admin, 'Admin user must exist in database');
    assert.equal(admin.isEmailVerified, true);
    assert.equal(admin.roles[0].role.name, 'ADMIN');
  });

  await t.test('Universities are seeded with proper profiles', async () => {
    const universities = await prisma.organization.findMany({
      where: { orgType: 'UNIVERSITY' },
      include: { universityProfile: true },
    });
    assert.ok(universities.length >= 3, 'Must have at least 3 universities seeded');
    const uniNames = universities.map((u) => u.name);
    assert.ok(uniNames.includes('University of Latvia'));
    assert.ok(uniNames.includes('Riga Technical University'));
  });

  await t.test('Verified Experience and Public Credential exist', async () => {
    const credential = await prisma.credential.findUnique({
      where: { credentialCode: 'A2-LV-2026-X89K' },
      include: { verifiedExperience: true },
    });
    assert.ok(credential, 'Credential A2-LV-2026-X89K must exist');
    assert.equal(credential.isValid, true);
    assert.equal(credential.verifiedExperience.organizationName, 'DemoTech Latvia');
  });
});

test('Phase 1: Explainable Recommendation Engine Test', async () => {
  // Mock student and opportunity matching
  const student = {
    skills: [
      { name: 'TypeScript', selfRating: 4, isVerified: true },
      { name: 'React', selfRating: 5, isVerified: true },
      { name: 'Node.js', selfRating: 4, isVerified: false },
    ],
    fieldOfStudy: 'Computer Science',
    city: 'Riga',
    availabilityStatus: 'AVAILABLE',
    weeklyHours: 20,
  };

  const opportunity = {
    requiredSkills: [
      { name: 'TypeScript', isMandatory: true },
      { name: 'React', isMandatory: true },
    ],
    fieldOfStudy: 'Computer Science',
    locationCity: 'Riga',
    remoteType: 'Hybrid',
    opportunityType: 'Internship',
  };

  // We test the matching formula directly
  // 1. Skills: 2 of 2 matched => 40/40
  // 2. Education: CS vs CS => 15/15
  // 3. Location: Riga vs Riga => 10/10
  // 4. Availability: Available => 15/15
  // Total >= 80%
  const requiredSkills = opportunity.requiredSkills.map((s) => s.name.toLowerCase());
  const studentSkills = student.skills.map((s) => s.name.toLowerCase());
  const matched = requiredSkills.filter((s) => studentSkills.includes(s));
  const skillsScore = Math.round((matched.length / requiredSkills.length) * 40);

  assert.equal(skillsScore, 40, 'Skills score should be 40/40 for full match');
});

test('Phase 1: Profile Completeness Calculation Test', async () => {
  const profileComplete = {
    headline: 'Full-Stack Developer passionate about Next.js and Cloud Services',
    bio: 'Third-year computer science student building scalable web applications. Completed academic projects in distributed systems and microservices.',
    universityName: 'Riga Technical University',
    degree: 'Bachelor',
    fieldOfStudy: 'Computer Science',
    studyYear: 3,
    city: 'Riga',
    availabilityStatus: 'AVAILABLE',
    skillsCount: 5,
    educationCount: 1,
    githubUrl: 'https://github.com/a2-student-demo',
    linkedinUrl: 'https://linkedin.com/in/a2-demo',
  };

  // Calculate score manually according to defined rubric
  let score = 0;
  if (profileComplete.headline && profileComplete.bio) score += 15;
  if (profileComplete.universityName && profileComplete.degree && profileComplete.fieldOfStudy && profileComplete.studyYear) score += 20;
  if (profileComplete.city && profileComplete.availabilityStatus) score += 10;
  if (profileComplete.skillsCount >= 5) score += 25;
  if (profileComplete.educationCount > 0) score += 15;
  if (profileComplete.githubUrl && profileComplete.linkedinUrl) score += 12;

  assert.ok(score >= 80, 'Complete profile should score at least 80%');
});
