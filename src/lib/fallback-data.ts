// Comprehensive fallback data for A2 TalentBridge
// Ensures zero-downtime resilient rendering in serverless environments when DATABASE_URL is not yet connected

export interface FallbackSkill {
  id: string;
  skill: {
    id: string;
    name: string;
    category?: string;
  };
}

export interface FallbackOrganization {
  id: string;
  name: string;
  city?: string | null;
  orgType?: string;
  isVerified?: boolean;
  website?: string | null;
}

export interface FallbackOpportunity {
  id: string;
  title: string;
  opportunityType: string;
  locationCity: string;
  remoteType: string;
  stipendEur: number | null;
  durationWeeks?: number | null;
  applicationDeadline: string | Date;
  description: string;
  organizationId?: string;
  organization: FallbackOrganization;
  requiredSkills: FallbackSkill[];
  _count?: {
    applications: number;
  };
  createdAt?: string | Date;
}

export const FALLBACK_OPPORTUNITIES: FallbackOpportunity[] = [
  {
    id: 'opp-printful-01',
    title: 'Junior Frontend Engineer (React/Next.js)',
    opportunityType: 'Internship',
    locationCity: 'Riga',
    remoteType: 'Hybrid',
    stipendEur: 1200,
    durationWeeks: 16,
    applicationDeadline: new Date('2026-11-30T17:00:00Z'),
    description:
      'Join Printful core web engineering team in Riga. Build high-traffic European e-commerce solutions using modern Next.js and React with live mentor guidance.',
    organization: {
      id: 'org-printful',
      name: 'Printful',
      city: 'Riga',
      orgType: 'COMPANY',
      isVerified: true,
      website: 'https://printful.com',
    },
    requiredSkills: [
      { id: 'fs1', skill: { id: 'sk1', name: 'React', category: 'Technical' } },
      { id: 'fs2', skill: { id: 'sk2', name: 'TypeScript', category: 'Technical' } },
      { id: 'fs3', skill: { id: 'sk3', name: 'UI/UX Design', category: 'Design' } },
    ],
    _count: { applications: 18 },
    createdAt: new Date('2026-10-15T09:00:00Z'),
  },
  {
    id: 'opp-mikrotik-02',
    title: 'Cloud Infrastructure & Network Practicum',
    opportunityType: 'Practicum',
    locationCity: 'Riga',
    remoteType: 'Onsite',
    stipendEur: 1100,
    durationWeeks: 12,
    applicationDeadline: new Date('2026-12-15T17:00:00Z'),
    description:
      'Collaborate with MikroTik network kernel engineers to test RouterOS cloud integrations and automated network test suites across Baltic telecom clusters.',
    organization: {
      id: 'org-mikrotik',
      name: 'MikroTik',
      city: 'Riga',
      orgType: 'COMPANY',
      isVerified: true,
      website: 'https://mikrotik.com',
    },
    requiredSkills: [
      { id: 'fs4', skill: { id: 'sk4', name: 'Linux', category: 'Technical' } },
      { id: 'fs5', skill: { id: 'sk5', name: 'Networking', category: 'Technical' } },
      { id: 'fs6', skill: { id: 'sk6', name: 'Python', category: 'Technical' } },
    ],
    _count: { applications: 12 },
    createdAt: new Date('2026-10-18T11:30:00Z'),
  },
  {
    id: 'opp-lmt-03',
    title: '5G IoT Smart Mobility Challenge',
    opportunityType: 'Challenge',
    locationCity: 'Riga',
    remoteType: 'Hybrid',
    stipendEur: 850,
    durationWeeks: 8,
    applicationDeadline: new Date('2026-11-20T17:00:00Z'),
    description:
      'Multidisciplinary challenge sponsored by LMT Innovations. Build real-time IoT sensor telemetry dashboards for Riga municipal transport with academic mentors.',
    organization: {
      id: 'org-lmt',
      name: 'LMT (Latvijas Mobilais Telefons)',
      city: 'Riga',
      orgType: 'COMPANY',
      isVerified: true,
      website: 'https://lmt.lv',
    },
    requiredSkills: [
      { id: 'fs7', skill: { id: 'sk7', name: 'Python', category: 'Technical' } },
      { id: 'fs8', skill: { id: 'sk8', name: 'Data Analysis', category: 'Technical' } },
      { id: 'fs9', skill: { id: 'sk9', name: 'FastAPI', category: 'Technical' } },
    ],
    _count: { applications: 24 },
    createdAt: new Date('2026-10-20T14:00:00Z'),
  },
  {
    id: 'opp-airbaltic-04',
    title: 'Aviation Operations Analytics Internship',
    opportunityType: 'Internship',
    locationCity: 'Marupe',
    remoteType: 'Hybrid',
    stipendEur: 1050,
    durationWeeks: 20,
    applicationDeadline: new Date('2026-12-01T17:00:00Z'),
    description:
      'Analyze turnaround telemetry and fuel efficiency predictive models with airBaltic data intelligence team at Riga International Airport hub.',
    organization: {
      id: 'org-airbaltic',
      name: 'airBaltic',
      city: 'Marupe',
      orgType: 'COMPANY',
      isVerified: true,
      website: 'https://airbaltic.com',
    },
    requiredSkills: [
      { id: 'fs10', skill: { id: 'sk10', name: 'Data Analysis', category: 'Technical' } },
      { id: 'fs11', skill: { id: 'sk11', name: 'PostgreSQL', category: 'Technical' } },
      { id: 'fs12', skill: { id: 'sk12', name: 'Problem Solving', category: 'Soft Skills' } },
    ],
    _count: { applications: 15 },
    createdAt: new Date('2026-10-21T08:45:00Z'),
  },
  {
    id: 'opp-seb-05',
    title: 'Sustainable ESG Banking Data Practicum',
    opportunityType: 'Practicum',
    locationCity: 'Riga',
    remoteType: 'Hybrid',
    stipendEur: 1000,
    durationWeeks: 14,
    applicationDeadline: new Date('2026-12-10T17:00:00Z'),
    description:
      'Evaluate European taxonomy green financing risk factors across Baltic corporate portfolios with SEB Global Services analytics leads.',
    organization: {
      id: 'org-seb',
      name: 'SEB Global Services',
      city: 'Riga',
      orgType: 'COMPANY',
      isVerified: true,
      website: 'https://seb.lv',
    },
    requiredSkills: [
      { id: 'fs13', skill: { id: 'sk13', name: 'Sustainability', category: 'Business' } },
      { id: 'fs14', skill: { id: 'sk14', name: 'Data Analysis', category: 'Technical' } },
      { id: 'fs15', skill: { id: 'sk15', name: 'Communication', category: 'Soft Skills' } },
    ],
    _count: { applications: 9 },
    createdAt: new Date('2026-10-22T10:15:00Z'),
  },
  {
    id: 'opp-tet-06',
    title: 'Cybersecurity Defense Automation Sprint',
    opportunityType: 'Challenge',
    locationCity: 'Riga',
    remoteType: 'Remote',
    stipendEur: 900,
    durationWeeks: 6,
    applicationDeadline: new Date('2026-11-25T17:00:00Z'),
    description:
      'Form student security teams to architect automated phishing triage and threat intelligence response workflows for Tet certified security analysts.',
    organization: {
      id: 'org-tet',
      name: 'Tet',
      city: 'Riga',
      orgType: 'COMPANY',
      isVerified: true,
      website: 'https://tet.lv',
    },
    requiredSkills: [
      { id: 'fs16', skill: { id: 'sk16', name: 'TypeScript', category: 'Technical' } },
      { id: 'fs17', skill: { id: 'sk17', name: 'Node.js', category: 'Technical' } },
      { id: 'fs18', skill: { id: 'sk18', name: 'Problem Solving', category: 'Soft Skills' } },
    ],
    _count: { applications: 21 },
    createdAt: new Date('2026-10-23T15:20:00Z'),
  },
];

export const FALLBACK_CHALLENGES = FALLBACK_OPPORTUNITIES.filter(
  (o) => o.opportunityType === 'Challenge'
);

export const FALLBACK_IMPACT_METRICS = {
  totalStudents: 1420,
  totalCompanies: 48,
  totalUniversities: 6,
  activeOpportunities: 64,
  completedProjects: 185,
  verifiedCredentials: 312,
  totalApplications: 940,
};

export const FALLBACK_STUDENT = {
  id: 'student-demo-01',
  universityName: 'Riga Technical University',
  degreeProgram: 'Computer Systems & Software Engineering',
  expectedGraduation: '2026',
  profileScore: 88,
  verifiedHours: 160,
  cvUrl: null,
  user: {
    id: 'user-student-01',
    firstName: 'Artūrs',
    lastName: 'Bērziņš',
    email: 'arturs.berzins@edu.rtu.lv',
    avatarUrl: null,
  },
  skills: [
    { id: 'ss1', skill: { id: 'sk1', name: 'React', category: 'Technical' } },
    { id: 'ss2', skill: { id: 'sk2', name: 'TypeScript', category: 'Technical' } },
    { id: 'ss3', skill: { id: 'sk3', name: 'Node.js', category: 'Technical' } },
    { id: 'ss4', skill: { id: 'sk4', name: 'Problem Solving', category: 'Soft Skills' } },
  ],
  applications: [
    {
      id: 'app-01',
      status: 'UnderReview',
      createdAt: new Date('2026-10-24T12:00:00Z'),
      opportunity: {
        id: 'opp-printful-01',
        title: 'Junior Frontend Engineer (React/Next.js)',
        opportunityType: 'Internship',
        locationCity: 'Riga',
        remoteType: 'Hybrid',
        stipendEur: 1200,
        applicationDeadline: new Date('2026-11-30T17:00:00Z'),
        organization: { name: 'Printful', city: 'Riga' },
        requiredSkills: [
          { id: 'r1', skill: { id: 'sk1', name: 'React', category: 'Technical' } },
        ],
      },
    },
    {
      id: 'app-02',
      status: 'Shortlisted',
      createdAt: new Date('2026-10-21T09:30:00Z'),
      opportunity: {
        id: 'opp-lmt-03',
        title: '5G IoT Smart Mobility Challenge',
        opportunityType: 'Challenge',
        locationCity: 'Riga',
        remoteType: 'Hybrid',
        stipendEur: 850,
        applicationDeadline: new Date('2026-11-20T17:00:00Z'),
        organization: { name: 'LMT', city: 'Riga' },
        requiredSkills: [
          { id: 'r2', skill: { id: 'sk7', name: 'Python', category: 'Technical' } },
        ],
      },
    },
  ],
  projectMemberships: [
    {
      id: 'pm-01',
      role: 'Frontend Lead',
      project: {
        id: 'proj-01',
        title: 'Mobility Sensor Telemetry Dashboard',
        status: 'Active',
        organization: { name: 'LMT Innovations' },
        deliverables: [
          { id: 'del-01', title: 'Sprint 1 Architecture Spec', status: 'Submitted' },
          { id: 'del-02', title: 'Interactive Map Demo', status: 'Pending' },
        ],
      },
    },
  ],
  verifiedExperiences: [
    {
      id: 've-01',
      skillsVerified: 'React, TypeScript, Agile Sprint Execution',
      verifiedAt: new Date('2026-09-15T10:00:00Z'),
      credential: {
        id: 'cred-01',
        credentialCode: 'A2-2026-DEMO-001',
        hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        isValid: true,
      },
    },
  ],
};

export const FALLBACK_COMPANY_ORG = {
  id: 'org-company-01',
  name: 'Printful',
  orgType: 'COMPANY',
  isVerified: true,
  city: 'Riga',
  website: 'https://printful.com',
  companyProfile: {
    industry: 'High-Tech E-Commerce & Global Logistics',
    sizeRange: '1000+',
    regNumber: 'LV40203050123',
    city: 'Riga',
  },
  opportunities: FALLBACK_OPPORTUNITIES.slice(0, 3).map((opp) => ({
    ...opp,
    organizationId: 'org-company-01',
  })),
  projectsSponsored: [
    {
      id: 'proj-sponsored-01',
      title: 'Global Fulfillment Engine Optimizer',
      status: 'Active',
      deliverables: [
        { id: 'd1', title: 'Benchmarking Report', status: 'Approved' },
        { id: 'd2', title: 'Production PR Integration', status: 'In Review' },
      ],
      members: [
        {
          studentProfile: {
            user: { firstName: 'Mārtiņš', lastName: 'Kalniņš' },
          },
        },
      ],
    },
  ],
};

export const FALLBACK_APPLICATIONS = [
  {
    id: 'app-in-01',
    status: 'Applied',
    createdAt: new Date('2026-10-25T14:30:00Z'),
    opportunity: {
      id: 'opp-printful-01',
      title: 'Junior Frontend Engineer (React/Next.js)',
      opportunityType: 'Internship',
    },
    studentProfile: {
      id: 'stu-01',
      profileScore: 92,
      universityName: 'Riga Technical University',
      degreeProgram: 'Computer Science',
      user: {
        id: 'u-01',
        firstName: 'Dāvis',
        lastName: 'Ozols',
        email: 'davis.ozols@edu.rtu.lv',
      },
      skills: [
        { id: 's1', skill: { id: 'sk1', name: 'React', category: 'Technical' } },
        { id: 's2', skill: { id: 'sk2', name: 'TypeScript', category: 'Technical' } },
      ],
      verifiedExperiences: [{ id: 've1' }],
    },
  },
  {
    id: 'app-in-02',
    status: 'Shortlisted',
    createdAt: new Date('2026-10-23T11:00:00Z'),
    opportunity: {
      id: 'opp-printful-01',
      title: 'Junior Frontend Engineer (React/Next.js)',
      opportunityType: 'Internship',
    },
    studentProfile: {
      id: 'stu-02',
      profileScore: 89,
      universityName: 'University of Latvia',
      degreeProgram: 'Informatics & Software Engineering',
      user: {
        id: 'u-02',
        firstName: 'Laura',
        lastName: 'Bērziņa',
        email: 'laura.berzina@lu.lv',
      },
      skills: [
        { id: 's3', skill: { id: 'sk1', name: 'React', category: 'Technical' } },
        { id: 's4', skill: { id: 'sk3', name: 'UI/UX Design', category: 'Design' } },
      ],
      verifiedExperiences: [{ id: 've2' }],
    },
  },
];

export const FALLBACK_EMERGING_TALENT = [
  {
    id: 'talent-01',
    profileScore: 94,
    universityName: 'Riga Technical University',
    degreeProgram: 'Computer Science',
    user: {
      id: 'ut-01',
      firstName: 'Roberts',
      lastName: 'Kalniņš',
      email: 'roberts.k@edu.rtu.lv',
    },
    skills: [
      { id: 'ts1', skill: { id: 'sk1', name: 'React', category: 'Technical' } },
      { id: 'ts2', skill: { id: 'sk2', name: 'TypeScript', category: 'Technical' } },
      { id: 'ts3', skill: { id: 'sk4', name: 'FastAPI', category: 'Technical' } },
    ],
    verifiedExperiences: [{ id: 've1' }, { id: 've2' }],
  },
  {
    id: 'talent-02',
    profileScore: 91,
    universityName: 'University of Latvia',
    degreeProgram: 'Data Science',
    user: {
      id: 'ut-02',
      firstName: 'Katrīna',
      lastName: 'Vītola',
      email: 'katrina.v@lu.lv',
    },
    skills: [
      { id: 'ts4', skill: { id: 'sk5', name: 'Python', category: 'Technical' } },
      { id: 'ts5', skill: { id: 'sk6', name: 'PostgreSQL', category: 'Technical' } },
    ],
    verifiedExperiences: [{ id: 've3' }],
  },
];

export const FALLBACK_UNIVERSITY_STUDENTS = [
  {
    id: 'ustu-01',
    universityName: 'Riga Technical University',
    degreeProgram: 'Computer Systems',
    profileScore: 91,
    user: {
      id: 'uu-01',
      firstName: 'Artūrs',
      lastName: 'Bērziņš',
      email: 'arturs.berzins@edu.rtu.lv',
    },
    skills: [
      { id: 'us1', skill: { id: 'sk1', name: 'React' } },
      { id: 'us2', skill: { id: 'sk2', name: 'TypeScript' } },
    ],
    verifiedExperiences: [
      {
        id: 'uve-01',
        credential: { id: 'uc-01', credentialCode: 'A2-2026-DEMO-001' },
      },
    ],
    applications: [
      {
        id: 'uapp-01',
        opportunity: {
          id: 'opp-printful-01',
          title: 'Junior Frontend Engineer',
          organization: { name: 'Printful' },
        },
      },
    ],
  },
  {
    id: 'ustu-02',
    universityName: 'Riga Technical University',
    degreeProgram: 'Telecommunications',
    profileScore: 86,
    user: {
      id: 'uu-02',
      firstName: 'Miks',
      lastName: 'Liepa',
      email: 'miks.liepa@edu.rtu.lv',
    },
    skills: [
      { id: 'us3', skill: { id: 'sk3', name: 'Linux' } },
      { id: 'us4', skill: { id: 'sk4', name: 'Networking' } },
    ],
    verifiedExperiences: [],
    applications: [
      {
        id: 'uapp-02',
        opportunity: {
          id: 'opp-mikrotik-02',
          title: 'Cloud Infrastructure Practicum',
          organization: { name: 'MikroTik' },
        },
      },
    ],
  },
];

export const FALLBACK_PARTNER_COMPANIES = [
  {
    id: 'p-01',
    name: 'Printful',
    city: 'Riga',
    companyProfile: { industry: 'High-Tech E-Commerce' },
    _count: { opportunities: 4, projectsSponsored: 2 },
  },
  {
    id: 'p-02',
    name: 'MikroTik',
    city: 'Riga',
    companyProfile: { industry: 'Networking Hardware & Systems' },
    _count: { opportunities: 3, projectsSponsored: 1 },
  },
  {
    id: 'p-03',
    name: 'LMT',
    city: 'Riga',
    companyProfile: { industry: 'Telecommunications & 5G IoT' },
    _count: { opportunities: 5, projectsSponsored: 3 },
  },
  {
    id: 'p-04',
    name: 'airBaltic',
    city: 'Marupe',
    companyProfile: { industry: 'Aviation Technology' },
    _count: { opportunities: 2, projectsSponsored: 1 },
  },
];

export const FALLBACK_ADMIN_ORGS = [
  {
    id: 'admin-org-01',
    name: 'Printful',
    orgType: 'COMPANY',
    city: 'Riga',
    isVerified: true,
    _count: { members: 8, opportunities: 4 },
  },
  {
    id: 'admin-org-02',
    name: 'Riga Technical University',
    orgType: 'UNIVERSITY',
    city: 'Riga',
    isVerified: true,
    _count: { members: 14, opportunities: 6 },
  },
  {
    id: 'admin-org-03',
    name: 'MikroTik',
    orgType: 'COMPANY',
    city: 'Riga',
    isVerified: true,
    _count: { members: 6, opportunities: 3 },
  },
  {
    id: 'admin-org-04',
    name: 'University of Latvia',
    orgType: 'UNIVERSITY',
    city: 'Riga',
    isVerified: true,
    _count: { members: 12, opportunities: 5 },
  },
  {
    id: 'admin-org-05',
    name: 'LMT (Latvijas Mobilais Telefons)',
    orgType: 'COMPANY',
    city: 'Riga',
    isVerified: true,
    _count: { members: 9, opportunities: 5 },
  },
  {
    id: 'admin-org-06',
    name: 'airBaltic',
    orgType: 'COMPANY',
    city: 'Marupe',
    isVerified: true,
    _count: { members: 7, opportunities: 2 },
  },
];

export const FALLBACK_ADMIN_AUDIT_LOGS = [
  {
    id: 'log-01',
    action: 'CREDENTIAL_ISSUED',
    resourceType: 'CREDENTIAL',
    resourceId: 'cred-01',
    createdAt: new Date('2026-10-26T14:15:00Z'),
  },
  {
    id: 'log-02',
    action: 'OPPORTUNITY_PUBLISHED',
    resourceType: 'OPPORTUNITY',
    resourceId: 'opp-printful-01',
    createdAt: new Date('2026-10-26T11:30:00Z'),
  },
  {
    id: 'log-03',
    action: 'ORGANIZATION_VERIFIED',
    resourceType: 'ORGANIZATION',
    resourceId: 'admin-org-03',
    createdAt: new Date('2026-10-25T16:00:00Z'),
  },
  {
    id: 'log-04',
    action: 'STUDENT_ONBOARDED',
    resourceType: 'USER',
    resourceId: 'u-01',
    createdAt: new Date('2026-10-25T09:20:00Z'),
  },
];

export const FALLBACK_CREDENTIAL = {
  id: 'cred-01',
  credentialCode: 'A2-2026-DEMO-001',
  hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  isValid: true,
  issuedAt: new Date('2026-09-15T10:00:00Z'),
  verifiedExperience: {
    skillsVerified: 'React, TypeScript, Agile Sprint Delivery, REST API Integration',
    hoursLogged: 160,
    studentProfile: {
      universityName: 'Riga Technical University',
      degreeProgram: 'Computer Science',
      user: {
        firstName: 'Artūrs',
        lastName: 'Bērziņš',
        email: 'arturs.berzins@edu.rtu.lv',
      },
    },
    project: {
      title: 'Printful Core E-Commerce Component Modernization',
      organization: {
        name: 'Printful',
        city: 'Riga',
        isVerified: true,
      },
      evaluations: [
        {
          evaluatorRole: 'COMPANY_MENTOR',
          technicalRating: 5,
          collaborationRating: 5,
          feedbackText:
            'Artūrs demonstrated strong TypeScript skills, proactive communication, and excellent adherence to clean code standards.',
        },
      ],
    },
  },
};

export interface DemoAccount {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordHash: string;
  roles: string[];
  primaryRole: 'STUDENT' | 'COMPANY' | 'UNIVERSITY' | 'ADMIN';
  studentProfileId?: string | null;
  organizationId?: string | null;
  isActive: boolean;
  avatarUrl?: string | null;
  studentProfile?: any;
  organization?: any;
  orgMemberships?: any[];
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'user-student-01',
    email: 'arturs.berzins@edu.rtu.lv',
    firstName: 'Artūrs',
    lastName: 'Bērziņš',
    password: 'A2Bridge2026!',
    passwordHash: '$2a$10$wT282n0a7GfWq8b1j1G9q.Rk0e0M1D2K4c2A5B8N7M6L5K4J3I2H1',
    roles: ['STUDENT'],
    primaryRole: 'STUDENT',
    studentProfileId: 'student-demo-01',
    organizationId: null,
    isActive: true,
    avatarUrl: null,
    studentProfile: FALLBACK_STUDENT,
    orgMemberships: [],
  },
  {
    id: 'user-company-01',
    email: 'talent@demotech.lv',
    firstName: 'Dace',
    lastName: 'Ozoliņa',
    password: 'A2Bridge2026!',
    passwordHash: '$2a$10$wT282n0a7GfWq8b1j1G9q.Rk0e0M1D2K4c2A5B8N7M6L5K4J3I2H1',
    roles: ['COMPANY'],
    primaryRole: 'COMPANY',
    studentProfileId: null,
    organizationId: 'org-company-01',
    isActive: true,
    avatarUrl: null,
    organization: FALLBACK_COMPANY_ORG,
    orgMemberships: [{ organizationId: 'org-company-01', organization: FALLBACK_COMPANY_ORG }],
  },
  {
    id: 'user-uni-01',
    email: 'coordinator@rtu.lv',
    firstName: 'Māris',
    lastName: 'Kalniņš',
    password: 'A2Bridge2026!',
    passwordHash: '$2a$10$wT282n0a7GfWq8b1j1G9q.Rk0e0M1D2K4c2A5B8N7M6L5K4J3I2H1',
    roles: ['UNIVERSITY'],
    primaryRole: 'UNIVERSITY',
    studentProfileId: null,
    organizationId: 'org-uni-01',
    isActive: true,
    avatarUrl: null,
    organization: {
      id: 'org-uni-01',
      name: 'Riga Technical University',
      orgType: 'UNIVERSITY',
      city: 'Riga',
      isVerified: true,
    },
    orgMemberships: [
      {
        organizationId: 'org-uni-01',
        organization: {
          id: 'org-uni-01',
          name: 'Riga Technical University',
          orgType: 'UNIVERSITY',
          city: 'Riga',
          isVerified: true,
        },
      },
    ],
  },
  {
    id: 'user-admin-01',
    email: 'admin@a2talentbridge.lv',
    firstName: 'Valters',
    lastName: 'Bērziņš',
    password: 'AdminRiga2026!',
    passwordHash: '$2a$10$wT282n0a7GfWq8b1j1G9q.Rk0e0M1D2K4c2A5B8N7M6L5K4J3I2H1',
    roles: ['ADMIN'],
    primaryRole: 'ADMIN',
    studentProfileId: null,
    organizationId: null,
    isActive: true,
    avatarUrl: null,
    orgMemberships: [],
  },
];
