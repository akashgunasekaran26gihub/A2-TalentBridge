# A2 TalentBridge
> **Bridging Talent, Education & Opportunity**  
> *From Education to Experience to Employment.*

A2 TalentBridge is a multi-sided digital ecosystem connecting **Students, Universities, Companies, and Community/NGO organizations** in Latvia and the wider Baltic/EU region.

The platform transforms academic potential into verified, real-world industry experience:
$$\text{Education} \longrightarrow \text{Discovery} \longrightarrow \text{Application} \longrightarrow \text{Experience} \longrightarrow \text{Evaluation} \longrightarrow \text{Verified Skills} \longrightarrow \text{Employment} \longrightarrow \text{Impact}$$

---

## 🏛️ Ecosystem Stakeholders

- **Students**: Build certified profiles, discover live industry challenges and internships, collaborate in project teams, submit deliverables, and earn immutable verified experience credentials.
- **Companies**: Sponsor challenges, recruit vetted student teams, evaluate deliverables through structured rubrics, discover pre-validated emerging talent, and build hiring pipelines.
- **Universities**: Monitor experiential learning, verify student credentials, track graduate employment outcomes, and manage corporate partnerships.
- **Platform Administrators**: Moderate opportunities, verify institutions and organizations, audit activities, and inspect ecosystem analytics.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14/15 (App Router with TypeScript)
- **Styling**: Vanilla CSS Design System with Baltic & European professional tokens
- **Database**: Relational Database via Prisma ORM (SQLite for local dev zero-dependency verification; PostgreSQL for production/Supabase)
- **Authentication**: JWT & Argon2/Bcrypt password hashing with HTTP-only cookies and strict RBAC
- **Timezone**: Strict `Europe/Riga` wall-clock handling; all database timestamps in UTC
- **Localization**: Currency in `EUR`, locale `en-LV`, English primary with Latvian language foundations

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy the example environment file:
```bash
cp .env.example .env
```

### 3. Initialize Database & Seed Synthetic Latvia Data
```bash
npx prisma db push
node prisma/seed.js
```

### 4. Run Automated Test Suite
```bash
npm test
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Demo Accounts
All synthetic demonstration accounts are pre-seeded:

| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **Platform Admin** | `admin@a2talentbridge.lv` | `AdminRiga2026!` | Full moderation & audit logs |
| **University Coordinator** | `coordinator@rtu.lv` | `A2Bridge2026!` | Riga Technical University |
| **University Coordinator** | `coordinator@lu.lv` | `A2Bridge2026!` | University of Latvia |
| **Company Representative** | `talent@demotech.lv` | `A2Bridge2026!` | DemoTech Latvia |
| **Company Representative** | `partners@balticgreenlabs.eu` | `A2Bridge2026!` | Baltic Green Labs |
| **Student** | `arturs.berzins@edu.rtu.lv` | `A2Bridge2026!` | CS student with verified credential |
| **Student** | `elina.kalnina@lu.lv` | `A2Bridge2026!` | Data Science MSc student |

---

## 📜 Documentation
- [ARCHITECTURE.md](file:///e:/projects/A2%20TALENTBRIDGE/ARCHITECTURE.md)
- [DATABASE.md](file:///e:/projects/A2%20TALENTBRIDGE/DATABASE.md)
- [IMPLEMENTATION_STATUS.md](file:///e:/projects/A2%20TALENTBRIDGE/IMPLEMENTATION_STATUS.md)
