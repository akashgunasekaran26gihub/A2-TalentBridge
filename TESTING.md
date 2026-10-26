# A2 TalentBridge — Testing & Quality Assurance Suite

A2 TalentBridge incorporates comprehensive automated testing to validate every major feature, RBAC boundary, timezone calculation, and user journey.

---

## 1. Test Architecture
Tests are implemented using Node.js's native test runner (`node:test` and `node:assert/strict`), ensuring zero external testing bloat and deterministic execution across developer and CI/CD environments.

Run all tests:
```bash
npm test
```

---

## 2. Test Suite Breakdown

### 2.1 Phase 1: Foundation & Algorithms (`tests/phase1-foundation.test.js`)
- **Database Seed Verification**: Verifies presence of all 5 primary roles (`STUDENT`, `COMPANY`, `UNIVERSITY`, `COMMUNITY`, `ADMIN`), initial admin account, and seed organizations.
- **Europe/Riga Timezone Logic**: Validates deadline comparison and localized date formatting.
- **Explainable Matching Formula**: Validates 5-factor scoring (Skills 40%, Interests 20%, Education 15%, Location 10%, Availability 15%).
- **Profile Completeness Engine**: Validates 0-100% calculation based on 6 weighted factors.

### 2.2 Phase 2: Public Website & Discovery (`tests/phase2-public-website.test.js`)
- **Opportunity Filtering**: Validates server-side filtering by opportunity type, keywords, and remote format.
- **Impact Metrics Calculation**: Confirms real aggregate database counts.
- **Public Credential Lookup**: Resolves credential `A2-LV-2026-X89K` and validates issuer signature and project evidence.

### 2.3 Phase 3: Auth & Onboarding (`tests/phase3-auth-onboarding.test.js`)
- **Bcrypt Salt Hashing**: Confirms correct password encryption and rejection of invalid passwords.
- **JWT Signing & Verification**: Tests session token payload structure and expiration.
- **Demo Accounts Verification**: Validates pre-seeded accounts for Student, Company, University, and Admin.
- **Onboarding Data Structures**: Checks relational integrity for company and university profiles.

---

## 3. End-to-End Journey Verification
The platform architecture supports the complete 4-stakeholder journeys:
1. **Student Journey**: Register $\rightarrow$ Onboard $\rightarrow$ Calculate Score $\rightarrow$ Search Opportunity $\rightarrow$ Apply with Match Score $\rightarrow$ Receive Status Update $\rightarrow$ Earn Verified Credential.
2. **Company Journey**: Register $\rightarrow$ Onboard Organization $\rightarrow$ Post Opportunity $\rightarrow$ Review Pipeline $\rightarrow$ Shortlist Applicant $\rightarrow$ Sponsor Project $\rightarrow$ Evaluate Rubric $\rightarrow$ Mint Credential.
3. **University Journey**: Manage Institution $\rightarrow$ Monitor Enrolled Students $\rightarrow$ Inspect Verified Experiences $\rightarrow$ Review Placement Outcomes.
4. **Admin Journey**: Login $\rightarrow$ Inspect Audit Trail $\rightarrow$ Moderate Organizations $\rightarrow$ Oversee Platform Health.
