# A2 TalentBridge — Security & Governance Architecture

## 1. Authentication & Password Security
- **Algorithm**: Passwords are encrypted using **Argon2 / Bcrypt with 10 salt rounds**. Plaintext passwords are never logged, stored, or returned in any API response.
- **Session Tokens**: Cryptographically signed **JSON Web Tokens (JWT)** with 7-day expiration.
- **Cookie Security**: Auth cookies are marked `HttpOnly`, `SameSite=Lax`, and `Secure` in production environments, mitigating Cross-Site Scripting (XSS) token exfiltration.

## 2. Role-Based Access Control (RBAC) & Multi-Tenancy
Access boundaries are verified on the server before database execution:
- **`STUDENT`**: Restricted to editing their own profile, viewing published opportunities, submitting applications, and accessing projects they belong to.
- **`COMPANY`**: Can only view applicants who submitted to their organization's postings. Company A cannot view Company B's candidate shortlist.
- **`UNIVERSITY`**: Restricted to monitoring students affiliated with their institution and verifying academic claims.
- **`ADMIN`**: Global governance with full audit logging for actions like user suspension or organization verification.

## 3. SQL Injection & Cross-Site Scripting (XSS) Prevention
- **Prisma Parameterized Queries**: All database queries utilize Prisma's strongly typed, parameterized query engine, preventing SQL injection vulnerabilities.
- **Schema Validation**: All incoming requests are validated against strict **Zod schemas** before reaching service handlers.
- **HTML Sanitization**: User-submitted bios and cover letters are rendered as plain text or escaped HTML, preventing XSS injection.

## 4. Timezone & Clock Skew Resilience
- Storage format: Standard UTC timestamps (`DateTime`).
- All deadline evaluations and business queries run against `Europe/Riga` wall-clock time via `src/lib/timezone.ts`.
- Prevents tampering with machine local clocks to bypass deadlines.

## 5. GDPR & European Union Compliance
A2 TalentBridge incorporates European privacy-by-design principles:
- **Article 5(1)(c) - Data Minimization**: Only information required for experiential matching is collected.
- **Article 17 - Right to Erasure**: Hard-delete endpoint (`DELETE /api/gdpr/delete`) cascades and permanently purges personal data while maintaining an anonymous audit reference.
- **Article 20 - Data Portability**: Machine-readable JSON export (`GET /api/gdpr/export`) allows students to download all verified credentials, skills, and application history.
- **Public Credential Safety**: Public credential verification routes (`/verify/[code]`) show only authorized project achievements, sponsoring company, duration, and verified skills, keeping private contact details hidden.
