# Sahayak (सहायक) — AI Loan Rejection Coach
> **Paytm Build for India Hackathon — Track: AI-Powered Financial Journeys**  
> *Transforming automated loan rejections into transparent, actionable, and financially responsible pathways to loan readiness.*

[![Live Demo on Vercel](https://img.shields.io/badge/Live%20Demo-Vercel-00BAF2?style=flat-square&logo=vercel&logoColor=white)](https://sahayak-sigma-lyart.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-002970?style=flat-square&logo=github&logoColor=white)](https://github.com/sankhasubhrabhadra/sahayak)
[![License: MIT](https://img.shields.io/badge/License-MIT-00B37E?style=flat-square)](LICENSE)

---

## 1. Executive Summary

In India's retail and MSME lending landscape, automated underwriting algorithms reject up to **70% of credit applicants** with vague, uninformative rejection notices. Borrowers are rarely told why their application failed, what specific financial parameters caused the failure, or what concrete steps are required to achieve approval.

**Sahayak** is an empathetic, mathematically rigorous AI financial coaching engine integrated within the Paytm Financial Services ecosystem. Rather than delivering a dead-end rejection notice, Sahayak:

1. **Conducts Forensic Debt Diagnostics:** Isolates the exact Debt-to-Income (DTI / FOIR) ratio and pinpoints high-cost micro-obligations (such as multiple BNPL micro-lines) causing algorithm rejection.
2. **Offers an Interactive What-If Debt Relief Simulator:** Demonstrates in real time how trimming small monthly commitments restores debt capacity.
3. **Presents Best-Fit Alternative Bank Offers:** Generates three right-sized alternative loan options (micro-ticket, cashflow-backed, and debt consolidation) calculated using reducing-balance amortization.
4. **Builds a Structured 90-Day Transformation Roadmap:** Aligns milestone tasks with the **RBI Fortnightly Credit Reporting Framework** (effective January 1, 2025).
5. **Provides a Gamified Milestone Tracker:** Features readiness scoring, discipline streak counters, reward points, and an interactive presenter fast-forward mode.
6. **Delivers Simulated Instant Disbursal:** Includes authentic Paytm Soundbox 4G audio-visual notifications and Paytm Payments Bank account routing.
7. **Embeds a 24x7 AI Financial Coach:** Built with regulatory guardrails, safety disclaimers, and bilingual support (English and Hindi).

---

## 2. Live Application Links

- **Production URL:** [https://sahayak-sigma-lyart.vercel.app/](https://sahayak-sigma-lyart.vercel.app/)
- **GitHub Repository:** [https://github.com/sankhasubhrabhadra/sahayak](https://github.com/sankhasubhrabhadra/sahayak)
- **Branch:** `main`

---

## 3. Mathematical Foundations & Financial Engine

### 3.1 Reducing-Balance Monthly EMI Formula

All loan payments and offer estimates in Sahayak are computed using the industry-standard reducing-balance Equated Monthly Installment (EMI) formula:

$$\text{EMI} = \frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}$$

Where:
- $P$ = Principal loan amount in INR
- $r$ = Periodic monthly interest rate ($\text{Annual Interest Rate} \div 12 \div 100$)
- $n$ = Loan tenure in months

**Example Calculation:**
- Principal ($P$): INR 80,000
- Annual Rate: 10.49% ($r = 0.00874167$)
- Tenure ($n$): 24 months
- Calculated EMI: **INR 3,710 / month**
- Total Repayment: INR 89,040 (Principal: INR 80,000 | Total Interest: INR 9,040)

```javascript
export function calculateReducingEmi(principal, annualRatePercent, tenureMonths) {
  const p = Number(principal);
  const n = Number(tenureMonths);
  const r = Number(annualRatePercent) / 12 / 100;
  if (r === 0) return Math.round(p / n);
  const factor = Math.pow(1 + r, n);
  return Math.round((p * r * factor) / (factor - 1));
}
```

---

### 3.2 Debt-to-Income (DTI / FOIR) Formula

$$\text{DTI} = \left(\frac{\sum \text{Existing Monthly Debt EMIs}}{\text{Monthly Net Take-Home Income}}\right) \times 100$$

- **Safe Benchmark:** $\text{DTI} \le 40\%$ (Standard retail banking comfort threshold).
- **Elevated Risk:** $\text{DTI} > 40\%$ (Triggers automated underwriting hold and routes to Sahayak Recovery Roadmap).
- **Excess EMI Calculation:** $\text{Excess} = \max(0, \text{Existing EMIs} - (\text{Monthly Income} \times 0.40))$.

---

### 3.3 RBI Fortnightly Credit Reporting Synchronization

Under the Reserve Bank of India’s updated regulatory guidelines for Credit Information Companies (CICs) and credit institutions:

- Credit institutions report borrower repayment status and loan closures on a **fortnightly frequency** (as of the 15th and the final day of each calendar month).
- Sahayak's 90-day roadmap maps directly to 6 distinct fortnightly bureau ingestion cycles.
- When an applicant closes micro-BNPL credit lines in Month 1, the reduction is reflected on bureau records (CIBIL, Experian, CRIF High Mark) by the subsequent reporting cycle, restoring underwriting eligibility by Day 90.

---

### 3.4 Regulatory Safety & Guardrail Principles

Sahayak adheres strictly to digital lending ethics and Indian financial regulations:

1. **Non-Guarantee Clause:** Sahayak explicitly states that all credit scores, readiness percentages, and loan offers are simulations and estimates. Final approval remains at the sole discretion of partner banks and NBFCs.
2. **Fact vs. Estimate Separation:** Mathematical equations and regulatory facts are clearly labeled and separated from predictive guidance.
3. **No Bureau Hard Inquiry During Coaching:** All diagnostic evaluations use Account Aggregator soft pull simulations with zero negative impact on the applicant's credit score.

---

## 4. End-to-End User Journey

```
[1. Landing & Persona Selector]
       |
       v
[2. Loan Application & Soft Eligibility Check]
       |
       +---> DTI <= 40% ---> [Instant Approval & Disbursal + Soundbox 4G]
       |
       +---> DTI > 40%
               |
               v
       [3. Forensic Rejection Explainer & What-If Simulator]
               |
               +---> [4. Matched Alternative Bank Offers (Hero FinCorp, Tata Capital, Piramal)]
               |
               v
       [5. 90-Day Credit Transformation Roadmap (RBI Fortnightly Aligned)]
               |
               v
       [6. Interactive Habit Tracker & Presenter Fast-Forward Mode]
               |
               v
       [7. Pre-Approved Sanction Certificate & Simulated Disbursal]
```

---

## 5. Preset Demo Personas

| Persona | Profile & Occupation | Monthly Income | Existing EMIs | DTI | Diagnosis & Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Rahul Sharma** | Gig Worker / Delivery Partner | INR 38,000 | INR 21,500 | **56.6%** | Paused due to 2 micro-BNPLs (INR 6,300/mo). Routes to 90-Day Recovery Plan. |
| **Priya Patel** | MSME Kirana Store Owner | INR 62,000 | INR 33,000 | **53.2%** | Paused due to inventory credit overlap. Qualifies for Piramal Debt Consolidation. |
| **Amit Verma** | Salaried Software Engineer | INR 85,000 | INR 17,000 | **20.0%** | Pre-approved. Routes directly to Instant Approval and Soundbox Disbursal. |

---

## 6. System Architecture & Tech Stack

```
sahayak/
├── index.html                      # Entry HTML with Plus Jakarta Sans & Inter typography
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Paytm brand header, language toggle, and persona selector
│   │   ├── LandingView.jsx         # Hero section, quick services grid, and demo personas
│   │   ├── ApplicationFormView.jsx # Paperless application form with real-time DTI gauge
│   │   ├── RejectionExplainerView.jsx # Forensic comparison and What-If simulator slider
│   │   ├── BestFitOffersView.jsx   # 3 calibrated alternative bank offers with reducing EMI
│   │   ├── RoadmapView.jsx         # 3-phase roadmap aligned with RBI fortnightly reporting
│   │   ├── DashboardView.jsx       # Circular readiness score ring, streak counter, and habit list
│   │   ├── SuccessView.jsx         # Sanction certificate, transformation comparison, and disbursal
│   │   ├── InstantApprovalView.jsx # Instant sanction with Paytm Soundbox 4G voice alert
│   │   └── AIChatDrawer.jsx        # Slide-over AI financial coaching drawer
│   ├── utils/
│   │   └── financialEngine.js      # Reducing-balance EMI math, DTI formulas, and NLP advisor
│   ├── services/
│   │   └── api.js                  # Frontend API integration with offline fallback
│   ├── data/
│   │   └── mockData.js             # Personas, translations (EN/HI), habit tasks, and knowledge base
│   ├── App.jsx                     # Master state controller, navigation routing, and mobile bar
│   ├── index.css                   # Tailwind directives and custom fintech utility classes
│   └── main.jsx                    # React 19 application entry point
├── server/
│   └── server.js                   # Express.js REST API backend
├── tailwind.config.js              # Custom color tokens (Paytm Navy #002970, Cyan #00BAF2)
├── vite.config.js                  # Vite bundler configuration
├── vercel.json                     # Vercel SPA routing and header configuration
└── package.json                    # Project dependencies and build scripts
```

### Technology Matrix

- **Frontend Framework:** React 19, Vite
- **Styling & Design System:** Tailwind CSS, Plus Jakarta Sans, Inter
- **Icons & Animation:** Lucide React, Canvas Confetti
- **Backend API:** Node.js, Express, CORS
- **Deployment & Hosting:** Vercel (Frontend SPA) + GitHub CI/CD

---

## 7. Local Installation & Development Guide

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Step 1: Clone Repository
```bash
git clone https://github.com/sankhasubhrabhadra/sahayak.git
cd sahayak
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```
The application will start at `http://localhost:5173`.

### Step 4: Run Production Build
```bash
npm run build
```

---

## 8. API Specifications

### `POST /api/evaluate`
Evaluates applicant financial data and returns underwriting decision, DTI metrics, and matched offers.

**Request Payload:**
```json
{
  "monthlyIncome": 38000,
  "existingEmis": 21500,
  "requestedLoanAmount": 150000,
  "tenureMonths": 24,
  "employmentType": "Gig Worker"
}
```

**Response Payload:**
```json
{
  "status": "PAUSED_RECOVERY_OFFERED",
  "dti": 56.6,
  "isSafe": false,
  "maxSafeEmi": 15200,
  "excessEmi": 6300,
  "matchedOffers": [
    {
      "lenderName": "Hero FinCorp",
      "eligibleAmount": 70000,
      "interestRate": 11.49,
      "tenureMonths": 18,
      "monthlyEmi": 4252
    }
  ]
}
```

---

## 9. License

This project is open-source software licensed under the **MIT License**.

Copyright (c) 2026 One97 Communications Limited / Sahayak Project Contributors.
