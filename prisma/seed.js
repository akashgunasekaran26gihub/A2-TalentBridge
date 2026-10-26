// Synthetic Seed Script for A2 TalentBridge (Latvia / EU Ecosystem)
// Creates realistic demonstration data across Students, Universities, Companies, Opportunities, and Verified Credentials

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting A2 TalentBridge Database Seed...');

  // 1. Roles
  const roles = ['STUDENT', 'COMPANY', 'UNIVERSITY', 'COMMUNITY', 'ADMIN'];
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: {
        name: roleName,
        description: `${roleName} role with specific domain permissions`,
      },
    });
  }
  console.log('✓ Roles seeded');

  // 2. Normalized Skills Catalog
  const skillCatalog = [
    { name: 'JavaScript', category: 'Technical', description: 'Core web programming language' },
    { name: 'TypeScript', category: 'Technical', description: 'Typed superset of JavaScript' },
    { name: 'React', category: 'Technical', description: 'Modern component-based UI library' },
    { name: 'Node.js', category: 'Technical', description: 'Server-side JavaScript runtime' },
    { name: 'Python', category: 'Technical', description: 'Data analysis, backend, and machine learning' },
    { name: 'FastAPI', category: 'Technical', description: 'High-performance Python web framework' },
    { name: 'PostgreSQL', category: 'Technical', description: 'Relational database management' },
    { name: 'Data Analysis', category: 'Technical', description: 'Statistical analysis and data modeling' },
    { name: 'UI/UX Design', category: 'Design', description: 'Wireframing, user journeys, Figma' },
    { name: 'Project Management', category: 'Business', description: 'Agile, Scrum, sprint planning' },
    { name: 'Sustainability', category: 'Business', description: 'ESG metrics and eco-impact analysis' },
    { name: 'Communication', category: 'Soft Skills', description: 'Cross-functional stakeholder presentation' },
    { name: 'Leadership', category: 'Soft Skills', description: 'Team organization and mentorship' },
    { name: 'Problem Solving', category: 'Soft Skills', description: 'Critical thinking and root-cause analysis' },
  ];

  const skillMap = {};
  for (const s of skillCatalog) {
    const created = await prisma.skill.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
    skillMap[s.name] = created.id;
  }
  console.log('✓ Skills catalog seeded');

  // Standard password for all demo accounts
  const demoPasswordHash = await bcrypt.hash('A2Bridge2026!', 10);
  const adminPasswordHash = await bcrypt.hash('AdminRiga2026!', 10);

  // 3. Platform Admin User
  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@a2talentbridge.lv' },
    update: {},
    create: {
      email: 'admin@a2talentbridge.lv',
      passwordHash: adminPasswordHash,
      firstName: 'Valters',
      lastName: 'Bērziņš',
      isEmailVerified: true,
      roles: {
        create: { roleId: adminRole.id },
      },
    },
  });
  console.log('✓ Admin user seeded (admin@a2talentbridge.lv / AdminRiga2026!)');

  // 4. Universities (Organizations)
  const uniRole = await prisma.role.findUnique({ where: { name: 'UNIVERSITY' } });
  const universitiesData = [
    {
      name: 'University of Latvia',
      slug: 'university-of-latvia',
      email: 'coordinator@lu.lv',
      firstName: 'Inese',
      lastName: 'Liepiņa',
      city: 'Riga',
      type: 'Public University',
      rector: 'Prof. Gundars Bērziņš',
      desc: 'Leading classical university in Latvia fostering research, science and industry collaboration.',
    },
    {
      name: 'Riga Technical University',
      slug: 'riga-technical-university',
      email: 'coordinator@rtu.lv',
      firstName: 'Māris',
      lastName: 'Kalniņš',
      city: 'Riga',
      type: 'Technical University',
      rector: 'Prof. Tālis Juhna',
      desc: 'Oldest technical university in the Baltic States, focused on high-tech engineering and computing.',
    },
    {
      name: 'Riga Business School',
      slug: 'riga-business-school',
      email: 'coordinator@rbs.lv',
      firstName: 'Sandra',
      lastName: 'Ozoliņa',
      city: 'Riga',
      type: 'Business College',
      rector: 'Jānis Grēviņš',
      desc: 'Specialized management institution preparing international leaders in finance and IT management.',
    },
  ];

  const uniOrgMap = {};
  for (const u of universitiesData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        passwordHash: demoPasswordHash,
        firstName: u.firstName,
        lastName: u.lastName,
        isEmailVerified: true,
        roles: { create: { roleId: uniRole.id } },
      },
    });

    const org = await prisma.organization.upsert({
      where: { slug: u.slug },
      update: {},
      create: {
        name: u.name,
        slug: u.slug,
        orgType: 'UNIVERSITY',
        country: 'Latvia',
        city: u.city,
        isVerified: true,
        description: u.desc,
        members: {
          create: {
            userId: user.id,
            roleInOrg: 'OWNER',
          },
        },
        universityProfile: {
          create: {
            institutionType: u.type,
            rectorOrDean: u.rector,
            contactEmail: u.email,
            academicPrograms: 'Computer Science, Data Science, Business Administration, Engineering',
          },
        },
      },
    });
    uniOrgMap[u.slug] = org.id;
  }
  console.log('✓ 3 Universities seeded');

  // 5. Companies (Synthetic Demo Companies)
  const companyRole = await prisma.role.findUnique({ where: { name: 'COMPANY' } });
  const companiesData = [
    {
      name: 'DemoTech Latvia',
      slug: 'demotech-latvia',
      email: 'talent@demotech.lv',
      firstName: 'Kaspars',
      lastName: 'Eglītis',
      city: 'Riga',
      industry: 'Information Technology',
      size: '51-200',
      desc: 'Leading Baltic cloud software engineering consultancy specializing in scalable distributed systems.',
    },
    {
      name: 'Baltic Green Labs',
      slug: 'baltic-green-labs',
      email: 'partners@balticgreenlabs.eu',
      firstName: 'Aija',
      lastName: 'Siliņa',
      city: 'Liepāja',
      industry: 'CleanTech & Sustainability',
      size: '11-50',
      desc: 'Applied sustainability research and digital ESG analytics platform for European manufacturing.',
    },
    {
      name: 'Riga Digital Works',
      slug: 'riga-digital-works',
      email: 'hiring@rigadigitalworks.lv',
      firstName: 'Gints',
      lastName: 'Zariņš',
      city: 'Riga',
      industry: 'Product Design & Web Platforms',
      size: '11-50',
      desc: 'Digital product studio creating enterprise human-centered UX and modern web applications.',
    },
    {
      name: 'Amber Fintech Solutions',
      slug: 'amber-fintech',
      email: 'careers@amberfintech.lv',
      firstName: 'Dace',
      lastName: 'Kļaviņa',
      city: 'Riga',
      industry: 'FinTech & Payments',
      size: '51-200',
      desc: 'Next-generation compliance, real-time SEPA payment gateways, and banking API infrastructure.',
    },
    {
      name: 'Liepāja Smart Manufacturing',
      slug: 'liepaja-smart-mfg',
      email: 'iot@liepajamfg.lv',
      firstName: 'Normunds',
      lastName: 'Būmanis',
      city: 'Liepāja',
      industry: 'Industrial IoT',
      size: '201-500',
      desc: 'Automated telemetry and predictive maintenance for port and advanced manufacturing equipment.',
    },
  ];

  const companyOrgMap = {};
  for (const c of companiesData) {
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: {
        email: c.email,
        passwordHash: demoPasswordHash,
        firstName: c.firstName,
        lastName: c.lastName,
        isEmailVerified: true,
        roles: { create: { roleId: companyRole.id } },
      },
    });

    const org = await prisma.organization.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        name: c.name,
        slug: c.slug,
        orgType: 'COMPANY',
        country: 'Latvia',
        city: c.city,
        isVerified: true,
        description: c.desc,
        members: {
          create: {
            userId: user.id,
            roleInOrg: 'OWNER',
          },
        },
        companyProfile: {
          create: {
            industry: c.industry,
            companySize: c.size,
            contactPerson: `${c.firstName} ${c.lastName}`,
            contactEmail: c.email,
            hiringInterests: 'Software Engineering, UI/UX, Data Science, Sustainability',
          },
        },
      },
    });
    companyOrgMap[c.slug] = org.id;
  }
  console.log('✓ 5 Companies seeded');

  // 6. Students (12 Realistic Latvian Profiles)
  const studentRole = await prisma.role.findUnique({ where: { name: 'STUDENT' } });
  const studentsData = [
    {
      email: 'arturs.berzins@edu.rtu.lv',
      firstName: 'Artūrs',
      lastName: 'Bērziņš',
      city: 'Riga',
      uni: 'Riga Technical University',
      degree: 'Bachelor',
      field: 'Computer Science',
      year: 3,
      headline: 'Full-Stack Developer passionate about Next.js and Cloud Services',
      bio: 'Third-year computer science student building scalable web applications. Completed academic projects in distributed systems and microservices.',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL'],
      score: 88,
    },
    {
      email: 'elina.kalnina@lu.lv',
      firstName: 'Elīna',
      lastName: 'Kalniņa',
      city: 'Riga',
      uni: 'University of Latvia',
      degree: 'Master',
      field: 'Data Science',
      year: 1,
      headline: 'Data Scientist & Machine Learning Researcher',
      bio: 'Master student exploring NLP and econometric time series analysis with Python and PyTorch. Interested in FinTech and green analytics.',
      skills: ['Python', 'Data Analysis', 'FastAPI', 'Problem Solving'],
      score: 92,
    },
    {
      email: 'janis.ozolins@rbs.lv',
      firstName: 'Jānis',
      lastName: 'Ozoliņš',
      city: 'Riga',
      uni: 'Riga Business School',
      degree: 'Bachelor',
      field: 'Business Informatics',
      year: 2,
      headline: 'Aspiring Product Manager with Agile & Analytics background',
      bio: 'Bridging technical engineering with business market execution. Experienced with user interview research, wireframing, and product discovery.',
      skills: ['Project Management', 'Communication', 'Leadership', 'Data Analysis'],
      score: 85,
    },
    {
      email: 'laura.liepina@edu.rtu.lv',
      firstName: 'Laura',
      lastName: 'Liepiņa',
      city: 'Liepāja',
      uni: 'Riga Technical University',
      degree: 'Bachelor',
      field: 'Digital Product Design',
      year: 3,
      headline: 'UI/UX Designer focused on European accessibility and design systems',
      bio: 'Creating human-first digital experiences. Passionate about WCAG standards, clean typography, and interactive prototyping.',
      skills: ['UI/UX Design', 'React', 'Communication', 'Problem Solving'],
      score: 80,
    },
    {
      email: 'roberts.krumins@lu.lv',
      firstName: 'Roberts',
      lastName: 'Krūmiņš',
      city: 'Riga',
      uni: 'University of Latvia',
      degree: 'Bachelor',
      field: 'Computer Science',
      year: 4,
      headline: 'Backend Engineer & Security Enthusiast',
      bio: 'Graduating senior with emphasis on network security, authentication systems, and database optimization.',
      skills: ['Python', 'FastAPI', 'PostgreSQL', 'Problem Solving'],
      score: 84,
    },
  ];

  const studentProfileIds = [];
  for (const s of studentsData) {
    const user = await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: {
        email: s.email,
        passwordHash: demoPasswordHash,
        firstName: s.firstName,
        lastName: s.lastName,
        isEmailVerified: true,
        roles: { create: { roleId: studentRole.id } },
      },
    });

    const profile = await prisma.studentProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        country: 'Latvia',
        city: s.city,
        universityName: s.uni,
        degree: s.degree,
        fieldOfStudy: s.field,
        studyYear: s.year,
        headline: s.headline,
        bio: s.bio,
        availabilityStatus: 'AVAILABLE',
        weeklyHours: 20,
        preferredType: 'HYBRID',
        profileScore: s.score,
        isVerifiedStudent: true,
        portfolioUrl: 'https://github.com/a2-student-demo',
        githubUrl: 'https://github.com/a2-student-demo',
        linkedinUrl: 'https://linkedin.com/in/a2-demo',
        education: {
          create: {
            institutionName: s.uni,
            degree: s.degree,
            fieldOfStudy: s.field,
            startDate: new Date('2023-09-01'),
            isCurrent: true,
          },
        },
      },
    });
    studentProfileIds.push(profile.id);

    // Link skills
    for (const skillName of s.skills) {
      if (skillMap[skillName]) {
        await prisma.studentSkill.upsert({
          where: {
            studentProfileId_skillId: {
              studentProfileId: profile.id,
              skillId: skillMap[skillName],
            },
          },
          update: {},
          create: {
            studentProfileId: profile.id,
            skillId: skillMap[skillName],
            selfRating: 4,
            verificationStatus: 'Self-declared',
          },
        });
      }
    }
  }
  console.log(`✓ ${studentsData.length} Students seeded`);

  // 7. Opportunities (Internships, Live Projects, Challenges, Jobs)
  const oppDeadlines = [
    new Date(Date.now() + 14 * 86400000), // +14 days
    new Date(Date.now() + 30 * 86400000), // +30 days
    new Date(Date.now() + 45 * 86400000), // +45 days
  ];

  const opportunitiesData = [
    {
      orgSlug: 'demotech-latvia',
      title: 'Junior Cloud Software Engineer Internship',
      type: 'Internship',
      city: 'Riga',
      remote: 'Hybrid',
      stipend: 950,
      duration: 12,
      skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
      desc: 'Join our cloud platform team in Riga building distributed microservices. Mentored by senior architects with direct path to junior employment upon completion.',
      deadline: oppDeadlines[0],
    },
    {
      orgSlug: 'baltic-green-labs',
      title: 'Packaging Waste Reduction Live Project',
      type: 'Live Project',
      city: 'Liepāja',
      remote: 'Remote',
      stipend: 600,
      duration: 8,
      skills: ['Sustainability', 'Data Analysis', 'Project Management'],
      desc: 'Industry live project partnering with manufacturing SMEs in Kurzeme to analyze packaging lifecycle data and design an actionable reduction roadmap.',
      deadline: oppDeadlines[1],
    },
    {
      orgSlug: 'riga-digital-works',
      title: 'European SaaS Accessibility Design Challenge',
      type: 'Challenge',
      city: 'Riga',
      remote: 'Remote',
      stipend: 1200,
      duration: 4,
      skills: ['UI/UX Design', 'React', 'Problem Solving'],
      desc: 'Sponsor challenge: Re-architect and benchmark an accessible procurement interface meeting European EN 301 549 standards. Top teams receive cash awards and interview invites.',
      deadline: oppDeadlines[2],
    },
    {
      orgSlug: 'amber-fintech',
      title: 'Automated Transaction Reconciliation Challenge',
      type: 'Challenge',
      city: 'Riga',
      remote: 'Hybrid',
      stipend: 1500,
      duration: 6,
      skills: ['Python', 'FastAPI', 'Data Analysis', 'Problem Solving'],
      desc: 'Build high-throughput idempotent matching algorithms for ISO 20022 payments. Real-world dataset provided under educational terms.',
      deadline: oppDeadlines[1],
    },
    {
      orgSlug: 'demotech-latvia',
      title: 'Full-Stack Web Developer (Graduate Role)',
      type: 'Job',
      city: 'Riga',
      remote: 'Hybrid',
      stipend: 2200,
      duration: 52,
      skills: ['React', 'TypeScript', 'Node.js', 'Communication'],
      desc: 'Full-time graduate placement for students completing university. Develop enterprise web client portals with high visual aesthetics.',
      deadline: oppDeadlines[2],
    },
  ];

  const oppIds = [];
  for (const o of opportunitiesData) {
    const orgId = companyOrgMap[o.orgSlug];
    if (!orgId) continue;

    const opp = await prisma.opportunity.create({
      data: {
        organizationId: orgId,
        title: o.title,
        description: o.desc,
        opportunityType: o.type,
        locationCity: o.city,
        locationCountry: 'Latvia',
        remoteType: o.remote,
        stipendEur: o.stipend,
        durationWeeks: o.duration,
        applicationDeadline: o.deadline,
        status: 'Published',
        requiredSkills: {
          create: o.skills
            .filter((s) => skillMap[s])
            .map((s) => ({
              skillId: skillMap[s],
              isMandatory: true,
            })),
        },
      },
    });
    oppIds.push(opp.id);
  }
  console.log(`✓ ${opportunitiesData.length} Opportunities seeded`);

  // 8. Live Project & Verified Credential Foundation (The Core Differentiator)
  const demotechOrgId = companyOrgMap['demotech-latvia'];
  const primaryStudentId = studentProfileIds[0]; // Artūrs Bērziņš

  const completedProject = await prisma.project.create({
    data: {
      organizationId: demotechOrgId,
      title: 'Sustainability Analytics Dashboard',
      problemStatement: 'SMEs in the Baltic region lack transparent visibility into their Scope 1 & 2 emissions footprint.',
      objectives: 'Develop a responsive real-time data visualization dashboard with automated export for EU CSRD reporting.',
      expectedOutcomes: 'Interactive Next.js dashboard, validated data ingestion pipelines, and client documentation.',
      status: 'Verified',
      targetTeamSize: 3,
      startDate: new Date('2026-06-01'),
      endDate: new Date('2026-07-26'),
      members: {
        create: {
          studentProfileId: primaryStudentId,
          roleInTeam: 'Team Leader & Full-Stack Developer',
        },
      },
      milestones: {
        create: [
          {
            title: 'Architecture & UI Mockups',
            dueDate: new Date('2026-06-15'),
            isCompleted: true,
            orderIndex: 1,
          },
          {
            title: 'Data Ingestion & Invoicing Integration',
            dueDate: new Date('2026-07-01'),
            isCompleted: true,
            orderIndex: 2,
          },
          {
            title: 'Final Delivery & CSRD Export',
            dueDate: new Date('2026-07-24'),
            isCompleted: true,
            orderIndex: 3,
          },
        ],
      },
      evaluations: {
        create: {
          evaluatorId: demotechOrgId,
          evaluatorRole: 'COMPANY_MENTOR',
          technicalScore: 5,
          teamworkScore: 5,
          deliveryScore: 4,
          overallScore: 4.8,
          detailedFeedback: 'Outstanding technical execution. Artūrs demonstrated high autonomy, clean code quality, and exceptional collaboration.',
          recommendation: 'Strong candidate for Junior Solutions Architect role.',
        },
      },
    },
  });

  // Create Verified Experience & Public Credential
  const verifiedExp = await prisma.verifiedExperience.create({
    data: {
      studentProfileId: primaryStudentId,
      projectId: completedProject.id,
      projectTitle: 'Sustainability Analytics Dashboard',
      organizationName: 'DemoTech Latvia',
      durationWeeks: 8,
      skillsVerified: 'React, TypeScript, Data Analysis, Leadership',
      verifiedBy: 'Kaspars Eglītis, VP Engineering',
      status: 'Verified',
      credential: {
        create: {
          credentialCode: 'A2-LV-2026-X89K',
          publicUrl: 'http://localhost:3000/verify/A2-LV-2026-X89K',
          isValid: true,
        },
      },
    },
  });
  console.log('✓ Completed Live Project & Verified Credential seeded (Code: A2-LV-2026-X89K)');

  // Update student's skill to Project-verified
  if (skillMap['React']) {
    await prisma.studentSkill.upsert({
      where: {
        studentProfileId_skillId: {
          studentProfileId: primaryStudentId,
          skillId: skillMap['React'],
        },
      },
      update: {
        verificationStatus: 'Project-verified',
        verifiedBy: 'DemoTech Latvia',
        evidenceUrl: 'http://localhost:3000/verify/A2-LV-2026-X89K',
      },
      create: {
        studentProfileId: primaryStudentId,
        skillId: skillMap['React'],
        selfRating: 5,
        verificationStatus: 'Project-verified',
        verifiedBy: 'DemoTech Latvia',
        evidenceUrl: 'http://localhost:3000/verify/A2-LV-2026-X89K',
      },
    });
  }

  // 9. Application sample
  if (oppIds[0] && primaryStudentId) {
    await prisma.application.create({
      data: {
        opportunityId: oppIds[0],
        studentProfileId: primaryStudentId,
        status: 'Interview',
        coverLetter: 'I am excited to apply my full-stack skills learned at RTU to DemoTech cloud infrastructure.',
        matchScore: 92,
        statusHistory: {
          create: [
            { status: 'Submitted', changedByRole: 'STUDENT', notes: 'Application submitted via portal' },
            { status: 'Under Review', changedByRole: 'COMPANY', notes: 'CV and GitHub reviewed by tech lead' },
            { status: 'Shortlisted', changedByRole: 'COMPANY', notes: 'Selected for technical interview' },
            { status: 'Interview', changedByRole: 'COMPANY', notes: 'Interview scheduled via video link' },
          ],
        },
      },
    });
  }
  console.log('✓ Application sample and status timeline seeded');

  console.log('\n🎉 A2 TalentBridge Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
