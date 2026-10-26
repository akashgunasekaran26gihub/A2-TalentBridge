# A2 TalentBridge — Deployment Guide

This guide details the procedure for deploying A2 TalentBridge to European production infrastructure.

```mermaid
graph LR
    Git[GitHub Repository] --> Vercel[Vercel Serverless Hosting]
    Vercel --> WebClient[European Web Users]
    Vercel --> Supabase[(PostgreSQL in Frankfurt / EU West)]
```

## 1. Hosting Architecture
- **Frontend & Route Handlers**: Deployable to **Vercel** or an EU-based Node.js runtime (e.g. Frankfurt / Stockholm region).
- **Relational Database**: **PostgreSQL** hosted in an EU data center (e.g., Supabase EU-Central, AWS eu-central-1 Frankfurt) adhering to GDPR residency requirements.

## 2. Environment Variables Checklist

Ensure these variables are set in your production hosting console:

| Variable | Example Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables optimized build mode |
| `DATABASE_URL` | `postgresql://user:pass@eu-db.supabase.co:5432/postgres?sslmode=require` | Relational PostgreSQL connection |
| `JWT_SECRET` | `a_random_32_character_cryptographic_secret` | Signs auth session tokens |
| `JWT_EXPIRES_IN` | `7d` | Token validity lifetime |
| `APP_TIMEZONE` | `Europe/Riga` | Pin business logic to Riga time |
| `APP_LOCALE` | `en-LV` | European Latvian locale standards |
| `APP_CURRENCY` | `EUR` | Currency for stipends and prizes |
| `APP_COUNTRY` | `Latvia` | Default regional context |
| `APP_URL` | `https://a2talentbridge.lv` | Production canonical URL |

## 3. Database Deployment Procedure
1. Initialize the schema against your production PostgreSQL instance:
   ```bash
   npx prisma db push
   ```
2. Seed the initial Latvian taxonomy and demonstration baseline:
   ```bash
   node prisma/seed.js
   ```

## 4. Production Build Verification
Before deploying, execute the local quality gate:
```bash
npm run build
npm test
```
All routes must compile with zero errors and all automated tests must pass.
