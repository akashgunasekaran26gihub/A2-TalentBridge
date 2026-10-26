// Student Profile Completeness Calculator for A2 TalentBridge
// Calculates genuine completeness score (0-100%) strictly from filled fields.

export interface ProfileInputForScoring {
  headline?: string | null;
  bio?: string | null;
  universityName?: string | null;
  degree?: string | null;
  fieldOfStudy?: string | null;
  studyYear?: number | null;
  city?: string | null;
  availabilityStatus?: string | null;
  weeklyHours?: number | null;
  cvUrl?: string | null;
  portfolioUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  skillsCount?: number;
  educationCount?: number;
  certificationsCount?: number;
}

export interface ProfileScoreBreakdown {
  totalScore: number;
  details: {
    category: string;
    pointsEarned: number;
    maxPoints: number;
    isComplete: boolean;
    suggestion: string;
  }[];
}

export function computeProfileScore(profile: ProfileInputForScoring): ProfileScoreBreakdown {
  const details = [];
  let totalScore = 0;

  // 1. Basic Bio & Headline (15 pts)
  const hasHeadline = !!profile.headline && profile.headline.trim().length >= 5;
  const hasBio = !!profile.bio && profile.bio.trim().length >= 20;
  let bioPoints = 0;
  if (hasHeadline) bioPoints += 5;
  if (hasBio) bioPoints += 10;
  totalScore += bioPoints;
  details.push({
    category: 'Headline & Bio',
    pointsEarned: bioPoints,
    maxPoints: 15,
    isComplete: bioPoints === 15,
    suggestion: bioPoints === 15 ? 'Complete' : 'Add a descriptive headline and a detailed summary of your career interests',
  });

  // 2. Academic Affiliation (20 pts)
  const hasUni = !!profile.universityName && profile.universityName.trim().length > 0;
  const hasDegree = !!profile.degree && profile.degree.trim().length > 0;
  const hasField = !!profile.fieldOfStudy && profile.fieldOfStudy.trim().length > 0;
  const hasYear = typeof profile.studyYear === 'number' && profile.studyYear > 0;
  let acadPoints = 0;
  if (hasUni) acadPoints += 5;
  if (hasDegree) acadPoints += 5;
  if (hasField) acadPoints += 5;
  if (hasYear) acadPoints += 5;
  totalScore += acadPoints;
  details.push({
    category: 'Academic Details',
    pointsEarned: acadPoints,
    maxPoints: 20,
    isComplete: acadPoints === 20,
    suggestion: acadPoints === 20 ? 'Complete' : 'Specify your university, degree, field of study, and current academic year',
  });

  // 3. Location & Availability (10 pts)
  const hasCity = !!profile.city && profile.city.trim().length > 0;
  const hasAvail = !!profile.availabilityStatus && profile.availabilityStatus.trim().length > 0;
  let locPoints = 0;
  if (hasCity) locPoints += 5;
  if (hasAvail) locPoints += 5;
  totalScore += locPoints;
  details.push({
    category: 'Location & Availability',
    pointsEarned: locPoints,
    maxPoints: 10,
    isComplete: locPoints === 10,
    suggestion: locPoints === 10 ? 'Complete' : 'Select your Latvian city and working availability',
  });

  // 4. Skills Catalog (25 pts)
  const skillsCount = profile.skillsCount || 0;
  let skillPoints = 0;
  if (skillsCount >= 5) skillPoints = 25;
  else if (skillsCount >= 3) skillPoints = 18;
  else if (skillsCount >= 1) skillPoints = 10;
  totalScore += skillPoints;
  details.push({
    category: 'Skills Catalog',
    pointsEarned: skillPoints,
    maxPoints: 25,
    isComplete: skillPoints === 25,
    suggestion: skillsCount >= 5 ? 'Complete' : `Add at least ${5 - skillsCount} more skills to your profile to maximize job matching`,
  });

  // 5. Education Entries (15 pts)
  const eduCount = profile.educationCount || 0;
  const eduPoints = eduCount > 0 ? 15 : 0;
  totalScore += eduPoints;
  details.push({
    category: 'Formal Education History',
    pointsEarned: eduPoints,
    maxPoints: 15,
    isComplete: eduPoints === 15,
    suggestion: eduPoints === 15 ? 'Complete' : 'Add at least one detailed education record',
  });

  // 6. Portfolio & Links (15 pts)
  let linkPoints = 0;
  if (profile.githubUrl || profile.portfolioUrl) linkPoints += 8;
  if (profile.linkedinUrl) linkPoints += 4;
  if (profile.cvUrl) linkPoints += 3;
  if (linkPoints > 15) linkPoints = 15;
  totalScore += linkPoints;
  details.push({
    category: 'Portfolio & External Links',
    pointsEarned: linkPoints,
    maxPoints: 15,
    isComplete: linkPoints === 15,
    suggestion: linkPoints === 15 ? 'Complete' : 'Add your GitHub, Portfolio URL, and LinkedIn links',
  });

  return {
    totalScore: Math.min(100, Math.max(0, totalScore)),
    details,
  };
}
