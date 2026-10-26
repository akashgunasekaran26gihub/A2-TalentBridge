# A2 TalentBridge — Architecture & Technical Specifications

## 1. System Overview
A2 TalentBridge is designed as a scalable multi-sided SaaS platform serving Latvia with regional Baltic & EU expansion capability.

```mermaid
graph TD
    User([User Browser / Mobile]) --> AppRouter[Next.js App Router]
    
    subgraph Frontend Tier
        AppRouter --> PublicPages[Public SEO Pages]
        AppRouter --> AuthPages[Auth & Role Onboarding]
        AppRouter --> Dashboards[Workspaces: Student, Company, University, Admin]
    end

    subgraph Service & API Tier
        AppRouter --> RESTApi[/app/api/* Route Handlers]
        RESTApi --> RBAC[RBAC & Tenant Isolation Guard]
        RESTApi --> TimezoneLayer[Europe/Riga Timezone Adapter]
        RESTApi --> MatchEngine[5-Factor Explainable Recommendation Engine]
        RESTApi --> VerifyEngine[Credential Minting & Verification Engine]
    end

    subgraph Persistence Tier
        RESTApi --> PrismaClient[Prisma Data Access Layer]
        PrismaClient --> RelationalDB[(PostgreSQL / SQLite Dev DB)]
    end
```

## 2. Core Architectural Pillars

### 2.1 Multi-Tenant Data Isolation
- Student private application data (CVs, cover letters, feedback notes) is strictly isolated.
- Company applicant pipelines are isolated per Organization ID.
- University coordinators can only monitor students registered under their academic domain or institution.
- All authorization checks are enforced on the server in route handlers before executing database queries.

### 2.2 Timezone Awareness (Europe/Riga)
- All timestamps in the database are stored in UTC (`DateTime`).
- All deadlines, interview slots, and project milestones are interpreted and formatted strictly in `Europe/Riga` wall-clock time using `src/lib/timezone.ts`.
- Time comparisons evaluate against the current UTC instant translated to Riga calendar dates.

### 2.3 Transparent Explainable Matching
Instead of opaque or simulated recommendations, matching scores are deterministically computed and explained to students and recruiters across 5 weighted dimensions:
1. **Skills Match (40%)**: Required vs possessed skills with verification bonus.
2. **Interests Fit (20%)**: Academic direction and project type preferences.
3. **Education Fit (15%)**: Field of study alignment.
4. **Location Fit (10%)**: City matching (Riga, Liepāja, etc.) and remote flexibility.
5. **Availability (15%)**: Status and weekly capacity.

### 2.4 Verifiable Digital Experience Foundation
- Verification only occurs upon evaluated project/internship completion.
- When an authorized company or university mentor approves a final deliverable and completes the evaluation rubric, a `VerifiedExperience` record is created.
- An immutable `Credential` record is minted with a unique alphanumeric identifier (e.g. `A2-LV-2026-X89K`).
- Public verification is accessible without authentication at `/verify/[credentialCode]` providing cryptographic assurance of student achievements.
