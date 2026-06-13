# Philix Finance — Loan Management Platform

> *Creating a Future Together*

A production-grade Loan Management System for Philix Finance, a Zambian microfinance institution specializing in collateral-based lending.

---

## How to Run on Your Computer (VS Code)

### Step 1 — Install the required tools

Download and install these (if you don't have them already):

| Tool | Download Link |
|------|--------------|
| **Node.js** (LTS version) | https://nodejs.org |
| **Git** | https://git-scm.com/download/win |
| **VS Code** | https://code.visualstudio.com |

Restart your computer after installing.

---

### Step 2 — Clone the project

Open **Command Prompt** (`Win + R` → type `cmd` → Enter) and run:

```bash
git clone https://github.com/Dalisoalex15/philix15.git
```

---

### Step 3 — Open in VS Code

```bash
cd philix15
code .
```

This opens the whole project in VS Code.

---

### Step 4 — Open the terminal inside VS Code

In VS Code press: **Ctrl + `** (the backtick key, top-left of keyboard)

A terminal panel will open at the bottom.

---

### Step 5 — Install dependencies

In the VS Code terminal, run:

```bash
cd frontend
npm install --legacy-peer-deps
```

Wait for it to finish (may take 1–2 minutes).

---

### Step 6 — Start the app

```bash
npm run dev
```

You will see:
```
  Local:   http://localhost:5173/
```

---

### Step 7 — Open in your browser

Go to: **http://localhost:5173**

---

## Login Credentials (Demo Mode)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@philix.zm | Admin@123 |
| Loan Officer | officer@philix.zm | Officer@123 |

No backend or database needed — the app runs fully with demo data.

---

## What's Inside

| Module | Description |
|--------|-------------|
| Dashboard | KPI cards, portfolio charts, officer leaderboard |
| Clients | Borrower profiles, NRC/Student ID, risk scoring |
| Collateral Vault | Asset registration, chain of custody, LTV |
| Loan Origination | 4-step wizard with auto amortization calculator |
| Repayment Tracker | Payment recording, schedules, overdue flags |
| Collections | GREEN/YELLOW/ORANGE/RED risk categories |
| Reports | 8 report types, PDF/Excel/CSV export |
| Accounting | Income, expenses, investor management |
| Users | 5 RBAC roles, user management |
| Settings | Loan parameters, AI features roadmap |

---

## Loan Types

| Type | Interest Rate | Notes |
|------|--------------|-------|
| Student | 10% p.m. | University students (UNZA, CBU, ZCAS) |
| Campus | 12% p.m. | Short-term campus loans |
| Business | 8% p.m. | SME and market traders |
| Short-Term | 15% p.m. | Weekly repayment |
| Asset-Backed | 7% p.m. | High-value collateral |

Every loan requires collateral — NO unsecured lending.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, PostgreSQL, Prisma
- **Auth**: JWT + Refresh Tokens, RBAC
- **Infrastructure**: Docker, Nginx

All amounts displayed in **ZMW (Zambian Kwacha)**.
