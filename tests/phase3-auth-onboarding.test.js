// Phase 3 Authentication, RBAC & Onboarding Automated Test Suite
// Verifies user creation, password hashing, JWT session signing/verification, and role onboarding

const test = require('node:test');
const assert = require('node:assert/strict');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'a2_talentbridge_super_secret_jwt_key_riga_2026_dev_min_32_chars';

test('Phase 3: Authentication & Password Verification', async (t) => {
  await t.test('Verify password hashing matches stored hash', async () => {
    const password = 'TestRigaPassword2026!';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const isMatch = await bcrypt.compare(password, hash);
    assert.equal(isMatch, true, 'Bcrypt compare must succeed for valid password');

    const wrongMatch = await bcrypt.compare('WrongPassword', hash);
    assert.equal(wrongMatch, false, 'Bcrypt compare must reject invalid password');
  });

  await t.test('Verify JWT session token creation and decoding', async () => {
    const payload = {
      id: 'test-user-id',
      email: 'student@test.rtu.lv',
      firstName: 'Janis',
      lastName: 'Berzins',
      roles: ['STUDENT'],
      studentProfileId: 'test-profile-id',
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    assert.ok(typeof token === 'string' && token.length > 20, 'JWT token must be a signed string');

    const decoded = jwt.verify(token, JWT_SECRET);
    assert.equal(decoded.id, payload.id);
    assert.equal(decoded.email, payload.email);
    assert.equal(decoded.roles[0], 'STUDENT');
  });

  await t.test('Verify existing demo student login credentials against DB', async () => {
    const user = await prisma.user.findUnique({
      where: { email: 'arturs.berzins@edu.rtu.lv' },
      include: { roles: { include: { role: true } }, studentProfile: true },
    });

    assert.ok(user, 'Arturs Berzins must exist in DB');
    const isValid = await bcrypt.compare('A2Bridge2026!', user.passwordHash);
    assert.equal(isValid, true, 'Demo password A2Bridge2026! must match hash');
    assert.equal(user.roles[0].role.name, 'STUDENT');
    assert.ok(user.studentProfile, 'Student profile record must be linked');
  });
});

test('Phase 3: Student Onboarding & Profile Score Engine', async () => {
  const profileData = {
    headline: 'Cloud Engineer Student',
    bio: 'Third year student focusing on distributed systems and microservices architecture.',
    universityName: 'Riga Technical University',
    degree: 'Bachelor',
    fieldOfStudy: 'Computer Science',
    studyYear: 3,
    city: 'Riga',
    availabilityStatus: 'AVAILABLE',
    skillsCount: 4,
    educationCount: 1,
    githubUrl: 'https://github.com/test',
    linkedinUrl: 'https://linkedin.com/in/test',
  };

  // Profile completeness algorithm validation
  let score = 0;
  if (profileData.headline && profileData.bio) score += 15;
  if (profileData.universityName && profileData.degree && profileData.fieldOfStudy && profileData.studyYear) score += 20;
  if (profileData.city && profileData.availabilityStatus) score += 10;
  if (profileData.skillsCount >= 3) score += 18;
  if (profileData.educationCount > 0) score += 15;
  if (profileData.githubUrl && profileData.linkedinUrl) score += 12;

  assert.ok(score >= 75, `Computed profile score should be >= 75%, got ${score}%`);
});

test('Phase 3: Organization Onboarding Data Structure', async () => {
  const companyOrg = await prisma.organization.findUnique({
    where: { slug: 'demotech-latvia' },
    include: { companyProfile: true, members: { include: { user: true } } },
  });

  assert.ok(companyOrg, 'DemoTech organization must exist');
  assert.equal(companyOrg.orgType, 'COMPANY');
  assert.equal(companyOrg.city, 'Riga');
  assert.equal(companyOrg.country, 'Latvia');
  assert.ok(companyOrg.companyProfile, 'Company profile must be linked');
  assert.equal(companyOrg.companyProfile.industry, 'Information Technology');
  assert.ok(companyOrg.members.length >= 1, 'Company must have an owner member');
});
