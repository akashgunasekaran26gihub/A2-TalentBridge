# A2 TalentBridge — REST API Documentation

Base URL: `/api`  
Authentication: Bearer JWT in `Authorization` header or HTTP-only cookie `a2_session`.  
Business Timezone: `Europe/Riga` (UTC internally).  
Currency: `EUR`.

---

## 1. Authentication & Session

### `POST /api/auth/register`
Creates a new user account with selected RBAC role and issues a session JWT.
* **Access**: Public
* **Payload**:
  ```json
  {
    "email": "student@edu.rtu.lv",
    "password": "SecurePassword123!",
    "firstName": "Artūrs",
    "lastName": "Bērziņš",
    "role": "STUDENT" // "STUDENT", "COMPANY", "UNIVERSITY"
  }
  ```
* **Response (201 Created)**:
  ```json
  {
    "message": "Registration successful",
    "user": { "id": "...", "email": "...", "role": "STUDENT" },
    "token": "..."
  }
  ```

### `POST /api/auth/login`
Authenticates credentials, updates login audit logs, and sets `a2_session` cookie.
* **Access**: Public
* **Payload**: `{ "email": "...", "password": "..." }`
* **Response (200 OK)**: `{ "message": "Login successful", "user": { ... }, "token": "..." }`

### `POST /api/auth/logout`
Clears session cookie.
* **Response (200 OK)**: `{ "message": "Logged out successfully" }`

### `GET /api/auth/me`
Returns current session profile and tenant linkages.
* **Access**: Authenticated

---

## 2. Onboarding & Profiles

### `POST /api/onboarding/student`
Completes student onboarding, calculates genuine profile completeness score (0-100%), and links skill competencies.
* **Access**: Role `STUDENT`
* **Payload**:
  ```json
  {
    "universityName": "Riga Technical University",
    "degree": "Bachelor",
    "fieldOfStudy": "Computer Science",
    "studyYear": 3,
    "city": "Riga",
    "headline": "...",
    "bio": "...",
    "availabilityStatus": "AVAILABLE",
    "weeklyHours": 20,
    "preferredType": "HYBRID",
    "skills": ["TypeScript", "React", "Node.js"]
  }
  ```

### `POST /api/onboarding/company`
Creates employer organization, company profile, and owner link.
* **Access**: Role `COMPANY`

### `POST /api/onboarding/university`
Registers higher education institution with accredited academic programs.
* **Access**: Role `UNIVERSITY`

---

## 3. Opportunities & Discovery

### `GET /opportunities` (Page / Server Component)
Filters published opportunities by `query`, `type`, `remote`, and `city`.

### `POST /api/opportunities`
Publishes new opportunities (Internships, Live Projects, Challenges, Jobs).
* **Access**: Role `COMPANY` or `ADMIN`
* **Payload**:
  ```json
  {
    "title": "Junior Cloud Software Engineer",
    "opportunityType": "Internship",
    "description": "...",
    "locationCity": "Riga",
    "remoteType": "Hybrid",
    "durationWeeks": 12,
    "stipendEur": 950,
    "applicationDeadline": "2026-11-30T23:59:59Z",
    "skills": ["TypeScript", "React"]
  }
  ```

---

## 4. Application Pipeline & Matching

### `POST /api/applications`
Submits application, runs transparent 5-factor matching algorithm, creates initial status history timeline entry, and notifies student.
* **Access**: Role `STUDENT`

### `PATCH /api/applications`
Transitions application state (`Shortlisted`, `Interview`, `Accepted`, `Rejected`) with feedback notes.
* **Access**: Authorized Organization Owner or `ADMIN`

---

## 5. Experience Verification & Credentials

### `POST /api/projects/evaluate`
Submits mentor rubric evaluation (Technical, Teamwork, Delivery), marks project verified, creates `VerifiedExperience` records, and mints unique cryptographic `Credential` codes (e.g. `A2-LV-2026-X89K`).
* **Access**: Authorized Mentor / `COMPANY` / `UNIVERSITY`

### `GET /verify/:credentialCode` (Public Web Route)
Publicly verifies authentic project credential, student name, duration, verified competencies, and sponsoring organization.

---

## 6. GDPR Data Portability & Erasure

### `GET /api/gdpr/export`
Exports complete personal data archive in machine-readable JSON (excluding password hashes).

### `DELETE /api/gdpr/delete`
Permanently erases user account and personal data under GDPR Article 17 (Right to Erasure).
