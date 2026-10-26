// Explainable Recommendation & Matching Engine for A2 TalentBridge
// Computes transparent matching score based on 5 deterministic pillars:
// 1. Skills Match:       40%
// 2. Career Interests:   20%
// 3. Education Match:    15%
// 4. Location Match:     10%
// 5. Availability Match: 15%
// Total:                100%

export interface StudentMatchProfile {
  skills: { name: string; category?: string; selfRating?: number; isVerified?: boolean }[];
  fieldOfStudy?: string | null;
  degree?: string | null;
  studyYear?: number | null;
  city?: string | null;
  country?: string | null;
  availabilityStatus?: string | null; // "AVAILABLE", "INTERNSHIP_ONLY", "BUSY"
  weeklyHours?: number | null;
  preferredType?: string | null;      // "REMOTE", "HYBRID", "ON_SITE", "ANY"
}

export interface OpportunityMatchCriteria {
  requiredSkills: { name: string; isMandatory?: boolean }[];
  fieldOfStudy?: string | null;       // Preferred field e.g. "Computer Science"
  targetDegrees?: string[];           // e.g. ["Bachelor", "Master"]
  locationCity?: string | null;
  locationCountry?: string | null;
  remoteType?: string | null;         // "Remote", "Hybrid", "On-site"
  durationWeeks?: number | null;
  opportunityType?: string | null;    // "Internship", "Live Project", "Challenge", "Job"
}

export interface MatchScoreResult {
  matchScore: number; // 0 to 100
  breakdown: {
    skills: { score: number; max: 40; matchedSkills: string[]; missingSkills: string[] };
    interests: { score: number; max: 20; notes: string };
    education: { score: number; max: 15; notes: string };
    location: { score: number; max: 10; notes: string };
    availability: { score: number; max: 15; notes: string };
  };
  summary: string;
}

export function computeOpportunityMatch(
  student: StudentMatchProfile,
  opportunity: OpportunityMatchCriteria
): MatchScoreResult {
  // 1. SKILLS MATCH (40%)
  const requiredSkillNames = opportunity.requiredSkills.map((s) => s.name.toLowerCase().trim());
  const studentSkillMap = new Map<string, { rating: number; verified: boolean }>();
  student.skills.forEach((s) => {
    studentSkillMap.set(s.name.toLowerCase().trim(), {
      rating: s.selfRating || 3,
      verified: !!s.isVerified,
    });
  });

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  if (requiredSkillNames.length === 0) {
    // If no specific skills required, default full points
    matchedSkills.push('General Competencies');
  } else {
    for (const reqSkill of requiredSkillNames) {
      if (studentSkillMap.has(reqSkill)) {
        const item = studentSkillMap.get(reqSkill)!;
        matchedSkills.push(reqSkill + (item.verified ? ' (Verified)' : ''));
      } else {
        missingSkills.push(reqSkill);
      }
    }
  }

  let skillsScore = 0;
  if (requiredSkillNames.length === 0) {
    skillsScore = 40;
  } else {
    const matchRatio = matchedSkills.length / requiredSkillNames.length;
    skillsScore = Math.round(matchRatio * 40);
  }

  // 2. INTERESTS & TYPE FIT (20%)
  let interestsScore = 15; // Baseline high for students seeking experience
  let interestNotes = 'Opportunity aligns with academic focus';
  if (opportunity.opportunityType === 'Challenge' || opportunity.opportunityType === 'Live Project') {
    interestsScore = 20;
    interestNotes = 'High-impact collaborative experiential project';
  } else if (student.availabilityStatus === 'INTERNSHIP_ONLY' && opportunity.opportunityType !== 'Internship') {
    interestsScore = 8;
    interestNotes = 'Student preferred internship opportunities';
  }

  // 3. EDUCATION FIT (15%)
  let educationScore = 10;
  let educationNotes = 'Compatible academic profile';
  if (opportunity.fieldOfStudy && student.fieldOfStudy) {
    if (
      student.fieldOfStudy.toLowerCase().includes(opportunity.fieldOfStudy.toLowerCase()) ||
      opportunity.fieldOfStudy.toLowerCase().includes(student.fieldOfStudy.toLowerCase())
    ) {
      educationScore = 15;
      educationNotes = `Direct field match: ${student.fieldOfStudy}`;
    } else {
      educationScore = 8;
      educationNotes = `Cross-disciplinary alignment (${student.fieldOfStudy} vs ${opportunity.fieldOfStudy})`;
    }
  } else {
    educationScore = 14;
    educationNotes = 'Open to all academic disciplines';
  }

  // 4. LOCATION FIT (10%)
  let locationScore = 10;
  let locationNotes = 'Full location compatibility';
  const isRemote = (opportunity.remoteType || '').toLowerCase() === 'remote';
  const isHybrid = (opportunity.remoteType || '').toLowerCase() === 'hybrid';
  const sameCity =
    (opportunity.locationCity || '').toLowerCase().trim() === (student.city || '').toLowerCase().trim();

  if (isRemote) {
    locationScore = 10;
    locationNotes = '100% Remote Opportunity (Accessible anywhere in Latvia/EU)';
  } else if (sameCity) {
    locationScore = 10;
    locationNotes = `Based in same city (${student.city || 'Riga'})`;
  } else if (isHybrid) {
    locationScore = 7;
    locationNotes = `Hybrid format requiring occasional travel to ${opportunity.locationCity || 'Riga'}`;
  } else {
    locationScore = 4;
    locationNotes = `On-site in ${opportunity.locationCity || 'Riga'} (Student located in ${student.city || 'other city'})`;
  }

  // 5. AVAILABILITY FIT (15%)
  let availabilityScore = 15;
  let availabilityNotes = 'Full schedule availability';
  if (student.availabilityStatus === 'BUSY') {
    availabilityScore = 5;
    availabilityNotes = 'Student status set to Busy';
  } else if ((student.weeklyHours || 20) < 15 && opportunity.durationWeeks && opportunity.durationWeeks > 12) {
    availabilityScore = 9;
    availabilityNotes = 'Part-time hours may require schedule coordination';
  }

  const totalScore = Math.min(100, skillsScore + interestsScore + educationScore + locationScore + availabilityScore);

  let summary = 'Strong match for this opportunity.';
  if (totalScore >= 80) {
    summary = 'Outstanding match! Student meets core requirements and academic criteria.';
  } else if (totalScore >= 60) {
    summary = 'Good candidate with relevant foundational skills and high potential.';
  } else {
    summary = 'Potential growth opportunity with skill bridging required.';
  }

  return {
    matchScore: totalScore,
    breakdown: {
      skills: { score: skillsScore, max: 40, matchedSkills, missingSkills },
      interests: { score: interestsScore, max: 20, notes: interestNotes },
      education: { score: educationScore, max: 15, notes: educationNotes },
      location: { score: locationScore, max: 10, notes: locationNotes },
      availability: { score: availabilityScore, max: 15, notes: availabilityNotes },
    },
    summary,
  };
}
