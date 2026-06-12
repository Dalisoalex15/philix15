# Philix Finance — Loan Management Platform

> *Creating a Future Together*

A production-grade Loan Management System for Philix Finance, a Zambian microfinance institution specializing in collateral-based lending.

## Features

### 10 Core Modules
| Module | Description |
|--------|-------------|
| **Executive Dashboard** | KPI cards, portfolio charts, risk gauge, officer leaderboard |
| **Client CRM** | Full borrower profiles, risk scoring, notes, documents |
| **Collateral Vault** | Asset tracking, chain of custody, valuation management |
| **Loan Origination** | Multi-step wizard, auto-calculations, approval workflow |
| **Repayment Tracker** | Amortization schedules, partial payments, settlements |
| **Collections System** | Risk categorization (GREEN/YELLOW/ORANGE/RED), contact logs |
| **Reports Engine** | 8 report types, PDF/Excel/CSV export |
| **Accounting** | Income, expenses, investor tracking |
| **User Management** | RBAC with 5 roles, audit trails |
| **Settings** | System config, AI feature roadmap |

### Loan Types Supported
- Student Loans
- Campus Loans  
- Business Loans
- Short-Term (Weekly) Loans
- Asset-Backed Loans

### Collateral Types
- Smartphones, Laptops, Tablets, Gaming Consoles, Electronics, Equipment

## Tech Stack

**Frontend:** React 19 · TypeScript · Tailwind CSS · Shadcn UI · Recharts · React Query

**Backend:** Node.js · Express · TypeScript · PostgreSQL · Prisma ORM

**Security:** JWT · Refresh Tokens · RBAC · MFA-ready · Audit Logs

**Deployment:** Docker · Nginx · VPS-ready

## Quick Start (Demo Mode)

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Open http://localhost:3000

**Demo Credentials:**
- Super Admin: `admin@philix.zm` / `Admin@123`
- Loan Officer: `officer@philix.zm` / `Officer@123`

## Full Stack Setup

### 1. Clone & Configure
```bash
cp .env.example .env
# Edit .env with your database URL and JWT secrets
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

### 4. Docker Deployment
```bash
docker-compose up -d
```

## Database

PostgreSQL schema with **14 tables:**
- Users, Sessions, Clients, Loans, LoanSchedules
- Payments, Penalties, Collateral, CollateralMovements
- Documents, AuditLogs, Notifications, Investors
- Expenses, ClientNotes, SystemConfig

## API Endpoints

```
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
GET    /api/v1/dashboard/stats
GET    /api/v1/clients
POST   /api/v1/clients
GET    /api/v1/collateral
POST   /api/v1/collateral
GET    /api/v1/loans
POST   /api/v1/loans
POST   /api/v1/loans/:id/approve
POST   /api/v1/loans/:id/disburse
POST   /api/v1/payments
GET    /api/v1/collections
GET    /api/v1/reports/loans-issued
GET    /api/v1/accounting/summary
GET    /api/v1/users
```

## User Roles

| Role | Permissions |
|------|-------------|
| **Super Admin** | Full access, user management, system config |
| **Manager** | Approve loans, analytics, manage staff |
| **Loan Officer** | Register clients, create loans, record payments |
| **Collections Officer** | Track overdue, contact clients, log collections |
| **Accountant** | Financial reports, cashflow, export statements |

## AI Features (Roadmap)

- [ ] Credit Scoring AI (ML-based assessment)
- [ ] Default Prediction (Early warning system)
- [ ] WhatsApp AI Bot (Automated client communications)
- [ ] Cash Flow Forecasting
- [ ] Portfolio Risk AI
- [ ] Fraud Detection
- [ ] Investor Analytics

## Currency

All amounts in **ZMW (Zambian Kwacha)**

---
© 2024 Philix Finance · Lusaka, Zambia
