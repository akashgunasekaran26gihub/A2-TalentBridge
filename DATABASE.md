# A2 TalentBridge — Database Schema & Data Dictionary

The persistence layer uses a normalized relational model managed via **Prisma ORM**.

## Entity Relationship Overview

| Model | Purpose | Key Attributes |
| :--- | :--- | :--- |
| `User` | Core system identity & credentials | `id`, `email`, `passwordHash`, `isEmailVerified`, `gdprConsentDate` |
| `Role` | System RBAC permissions | `name` (`STUDENT`, `COMPANY`, `UNIVERSITY`, `COMMUNITY`, `ADMIN`) |
| `Organization` | Companies, Universities, and NGOs | `name`, `slug`, `orgType`, `country`, `city`, `isVerified` |
| `StudentProfile` | Verified student portfolio | `userId`, `universityName`, `degree`, `fieldOfStudy`, `profileScore` |
| `CompanyProfile` | Company hiring metadata | `industry`, `companySize`, `contactPerson`, `hiringInterests` |
| `UniversityProfile` | Academic institution metadata | `institutionType`, `rectorOrDean`, `academicPrograms` |
| `Skill` | Normalized global taxonomy | `name`, `category`, `description` |
| `StudentSkill` | Student skill mastery & verification | `selfRating`, `verificationStatus`, `verifiedBy`, `evidenceUrl` |
| `Opportunity` | Job, Internship, Project, Challenge | `title`, `opportunityType`, `locationCity`, `remoteType`, `deadline` |
| `Application` | Pipeline tracking | `status`, `coverLetter`, `matchScore`, `interviewDate` |
| `Project` | Experiential learning workspaces | `title`, `problemStatement`, `objectives`, `status`, `targetTeamSize` |
| `ProjectMilestone` | Project milestone delivery | `title`, `dueDate`, `isCompleted` |
| `ProjectDeliverable` | Artifacts & code submissions | `title`, `fileUrl`, `status`, `feedback` |
| `Evaluation` | Structured performance rubric | `technicalScore`, `teamworkScore`, `deliveryScore`, `overallScore` |
| `VerifiedExperience`| Validated student experience record | `projectTitle`, `organizationName`, `durationWeeks`, `skillsVerified` |
| `Credential` | Public shareable validation badge | `credentialCode`, `publicUrl`, `isValid`, `issuedAt` |
| `AuditLog` | Security & compliance audit trail | `action`, `resourceType`, `resourceId`, `ipAddress`, `createdAt` |
