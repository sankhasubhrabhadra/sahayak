# 🚀 Sahayak (सहायक) — AI Loan Rejection Coach
> **Paytm Build for India AI Hackathon (Track: AI-Powered Financial Journeys)**  
> *Transforming cold loan rejections into transparent, actionable, and financially responsible pathways to loan readiness.*

[![Live Demo on Vercel](https://img.shields.io/badge/Live%20Demo-Vercel-00BAF2?style=for-the-badge&logo=vercel&logoColor=white)](https://sahayak-sigma-lyart.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-002970?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sankhasubhrabhadra/sahayak)
[![License: MIT](https://img.shields.io/badge/License-MIT-00B37E?style=for-the-badge)](LICENSE)

---

## 🌐 Live Application & Repositories

- **Live Frontend (Vercel):** [https://sahayak-sigma-lyart.vercel.app/](https://sahayak-sigma-lyart.vercel.app/)
- **Source Code (GitHub):** [https://github.com/sankhasubhrabhadra/sahayak](https://github.com/sankhasubhrabhadra/sahayak)
- **Backend API (Express / Node.js):** Compatible with local runtime and free-tier cloud hosts like Render.

---

## 💡 Problem Statement

In India, traditional banking algorithms reject up to **70% of retail and MSME credit applicants** with cold, uninformative rejection notices. This leads to:
- **Severe Applicant Anxiety:** Borrowers are left in the dark about why their application failed despite earning a steady income.
- **Hidden Debt-to-Income Traps:** Multiple small Buy-Now-Pay-Later (BNPL) micro-loans push Debt-to-Income (DTI) above lender risk thresholds.
- **Predatory Loan Migration:** Desperate rejected borrowers frequently turn to high-interest, unregulated lending apps.

---

## 🌟 The Sahayak Solution

**Sahayak** acts as an empathetic, financially accurate AI coach. Rather than a dead-end rejection letter, Sahayak provides:

1. **Jargon-Free AI Diagnostics:** Isolates the exact Debt-to-Income (DTI) ratio and pinpoints high-cost micro-obligations (e.g., 2 active BNPL accounts totaling ₹6,300/mo causing an automated threshold breach).
2. **Interactive "What-If" Debt Relief Simulator:** Allows applicants to drag an interactive slider to see how paying off small obligations immediately strengthens borrowing capacity.
3. **Best-Fit Alternative Bank Offers:** Computes 3 right-sized alternative loan offers (micro-ticket, cashflow-backed, and debt-consolidation) with standard reducing-balance monthly EMIs.
4. **Structured 90-Day Planning Horizon:** A 3-phase milestone plan that allows sufficient time for debt reductions to be reported under the **RBI Fortnightly Reporting Framework** and ingested across bureau cycles.
5. **Gamified Fitness-Style Progress Tracker:** Complete with circular readiness rings, streak tracking, XP points, and actionable micro-habits.
6. **Pre-Approved Demo Sanction & Disbursal:** Simulated 1-click disbursement to Paytm Payments Bank with an authentic Paytm Soundbox audio-visual chime.
7. **Interactive AI Education Coach (Chat Drawer):** Rigorous, regulatory-aligned AI financial advisor with built-in safety guardrails and disclaimer banners.
8. **Bilingual Experience:** Seamless instant toggle between English and Hindi (हिन्दी).

---

## 📐 Core Financial Intelligence & Regulatory Principles

### 1. Standard Reducing-Balance Monthly EMI Formula
$$\text{EMI} = \frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}$$
- $P$ = Principal loan amount
- $r$ = Monthly interest rate ($\text{Annual Rate} \div 12 \div 100$)
- $n$ = Loan tenure in months
*Example:* ₹80,000 at 10.49% p.a. over 24 months = **₹3,710/month** (Total: ₹89,040 | Interest: ₹9,040).

### 2. Debt-to-Income (DTI / FOIR) Transparency
$$\text{DTI} = \left(\frac{\text{Total Monthly Debt Commitments}}{\text{Monthly Take-Home Income}}\right) \times 100$$
- Every ratio in Sahayak displays the underlying arithmetic (e.g., $₹21,500 \div ₹38,000 \times 100 = 56.6\%$).
- The 40% threshold is accurately contextualized as a common **industry planning benchmark**, not an RBI legal mandate.

### 3. RBI Credit Reporting Framework (Effective Jan 1, 2025)
- Under the Reserve Bank of India’s updated regulatory framework for Credit Information Companies (CICs), credit institutions report borrower data on a **fortnightly frequency** (as of the 15th and last day of each calendar month).
- Sahayak accurately explains that individual report updates depend on lender submission schedules and bureau ingestion processing.

### 4. Safety & Non-Guarantee Guardrails
- Sahayak never guarantees loan approvals or promises specific credit score point increases (e.g., "50 points").
- Clearly separates **Facts** (regulations, mathematical calculations) from **Estimates** and **Underwriting Predictions**.
- Standard educational disclaimer displayed on all advisory screens.

---

## 🛠️ Architecture & Tech Stack

```
sahayak/
├── src/
│   ├── components/
│   │   ├── Header.jsx                # Paytm visual identity & language toggle
│   │   ├── LandingView.jsx           # Hero & 1-click persona quick starters
│   │   ├── ApplicationFormView.jsx   # Loan application & underwriting inputs
│   │   ├── RejectionExplainerView.jsx# Diagnostic breakdown & What-If slider
│   │   ├── BestFitOffersView.jsx     # 3 alternative right-sized lender offers
│   │   ├── RoadmapView.jsx           # 3-phase structured planning timeline
│   │   ├── DashboardView.jsx         # Gamified habit tracker & Fast-Forward slider
│   │   ├── SuccessView.jsx           # Pre-approval certificate & simulated IMPS
│   │   ├── InstantApprovalView.jsx   # Direct approval path for low-DTI applicants
│   │   └── AIChatDrawer.jsx          # AI Financial Coach slide-over drawer
│   ├── utils/
│   │   └── financialEngine.js        # Pure financial calculations & NLP response logic
│   ├── services/
│   │   └── api.js                    # API service layer with graceful offline fallback
│   ├── data/
│   │   └── mockData.js               # Personas, translations, habit phases, and FAQs
│   └── App.jsx                       # Master state management & view router
├── server/
│   └── server.js                     # Express API backend for cloud hosting
├── vercel.json                       # Vercel SPA deployment configuration
└── package.json
```

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend API:** Node.js, Express, CORS, Dotenv
- **Deployment:** Vercel (Frontend SPA) + Render (Backend REST API)

---

## 🏃 Local Setup & Development

```bash
# 1. Clone the repository
git clone https://github.com/sankhasubhrabhadra/sahayak.git

# 2. Navigate to project directory
cd sahayak

# 3. Install dependencies
npm install

# 4. Start the frontend development server
npm run dev

# 5. (Optional) Start the Express backend server
node server/server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏆 Hackathon Demo Personas

| Persona | Role | Monthly Income | Existing EMIs | Baseline DTI | Sahayak Discovery & Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Rahul Sharma** | Gig Delivery Partner | ₹38,000 | ₹21,500 | **56.6%** (High Risk) | Identifies ₹6,300/mo in 2 BNPL micro-loans. Pruning them lowers DTI to 40.0% and unlocks simulated pre-approval. |
| **Priya Verma** | Boutique Owner | ₹65,000 | ₹34,500 | **53.1%** (High Risk) | High revolving credit card balances. Consolidation offer lowers DTI to 33.8%. |
| **Amit Patel** | Salaried Software Associate | ₹55,000 | ₹11,000 | **20.0%** (Prime) | Affordability ratio well within threshold; qualifies for instant direct sanction. |

---

## 📄 License

MIT License — Built for the **Paytm Build for India AI Hackathon (2026)**.  
*Track: AI-Powered Financial Journeys.*
