# Sahayak (सहायक) — AI Loan Rejection Coach
> **Paytm Build for India Hackathon — Track: AI-Powered Financial Journeys**  
> *Transforming automated loan rejections into transparent, mathematically sound, and financially responsible pathways to approval.*

[![Live Demo on Vercel](https://img.shields.io/badge/Live%20Demo-Vercel-00BAF2?style=flat-square&logo=vercel&logoColor=white)](https://sahayak-sigma-lyart.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-002970?style=flat-square&logo=github&logoColor=white)](https://github.com/sankhasubhrabhadra/sahayak)
[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-99%2F100-00B37E?style=flat-square&logo=lighthouse&logoColor=white)](https://pagespeed.web.dev/analysis/https-sahayak-sigma-lyart-vercel-app/)
[![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-100%2F100-00B37E?style=flat-square)](https://pagespeed.web.dev/analysis/https-sahayak-sigma-lyart-vercel-app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-002970?style=flat-square)](LICENSE)

---

## 1. Executive Summary

In India's retail and MSME credit ecosystem, automated underwriting algorithms reject up to **70% of credit applicants** with uninformative rejection notices. Applicants are rarely informed of why their loan failed, what specific financial parameters triggered the decision, or what exact steps are required to achieve approval.

**Sahayak** is an empathetic, mathematically rigorous AI financial coaching engine integrated within the Paytm Financial Services ecosystem. Rather than delivering a dead-end rejection notice, Sahayak:

1. **Executes Forensic Financial Diagnostics:** Calculates the exact Debt-to-Income (DTI / FOIR) ratio and pinpoints high-cost micro-obligations (such as active BNPL lines) causing algorithm holds.
2. **Provides an Interactive What-If Debt Simulator:** Demonstrates in real time how trimming small monthly commitments restores debt capacity.
3. **Presents Calibrated Alternative Bank Offers:** Generates three right-sized alternative loan options (micro-ticket, cashflow-backed, and debt consolidation) calculated using reducing-balance amortization.
4. **Builds a Structured 90-Day Transformation Roadmap:** Aligns milestone tasks with the **RBI Fortnightly Credit Reporting Directives** (effective January 1, 2025).
5. **Features a Gamified Milestone Tracker:** Includes readiness scoring, discipline streak counters, reward points, and interactive task management.
6. **Delivers Simulated Instant Disbursal:** Integrates Paytm Soundbox 4G audio-visual notifications and Paytm Payments Bank account routing previews.
7. **Embeds an AI Financial Coach:** Built with stateful context retention, fact extraction, contradiction detection, regulatory citations, emergency financial distress safety guardrails, and bilingual localization (English and Hindi).

---

## 2. Live Production & Source Links

- **Production Application URL:** [https://sahayak-sigma-lyart.vercel.app/](https://sahayak-sigma-lyart.vercel.app/)
- **Robots.txt Specification:** [https://sahayak-sigma-lyart.vercel.app/robots.txt](https://sahayak-sigma-lyart.vercel.app/robots.txt)
- **Sitemap XML:** [https://sahayak-sigma-lyart.vercel.app/sitemap.xml](https://sahayak-sigma-lyart.vercel.app/sitemap.xml)
- **GitHub Repository:** [https://github.com/sankhasubhrabhadra/sahayak](https://github.com/sankhasubhrabhadra/sahayak)
- **Primary Branch:** `main`

---

## 3. Technology Stack & System Architecture

### 3.1 Technology Stack Matrix

| Layer | Technology / Library | Purpose & Details |
| :--- | :--- | :--- |
| **Frontend Core** | React 19, Vite 6 | Single-Page Application architecture with fast HMR and optimized bundle compilation |
| **Styling & Design System** | Vanilla CSS, Tailwind CSS | Official Paytm brand palette (Navy `#002970`, Cyan `#00BAF2`, Slate `#F8FAFC`), glassmorphism, responsive 390px+ layouts |
| **Typography** | Plus Jakarta Sans, Inter | Modern Google Fonts typography loaded via optimized preconnect links |
| **Iconography & Visuals** | Lucide React, Canvas Confetti | Crisp UI icon components and celebratory particle physics for milestone achievements |
| **Financial & AI Engine** | `src/utils/financialEngine.js` | Stateful NLP advisor, reducing-balance EMI math, DTI calculations, fact extraction, contradiction detection, regulatory citations |
| **Backend Service** | Node.js, Express, CORS | RESTful API endpoints with full client-side offline fallback |
| **State Persistence** | `sessionStorage` API | Persists user profiles, selected persona, habit completion status, and chat drawer context across browser refreshes |
| **SEO & Web Standards** | Web Manifest, XML Sitemap, Robots.txt | Fully valid search engine directives and canonical URLs |
| **Deployment** | Vercel Serverless Hosting | Automatic GitHub CI/CD deployments with SPA route rewriting rules |

---

### 3.2 Codebase Structure

```
sahayak/
├── public/
│   ├── favicon.ico                 # App icon
│   ├── robots.txt                  # Search engine crawler directives
│   └── sitemap.xml                 # XML site map for indexing
├── src/
│   ├── components/
│   │   ├── AIChatDrawer.jsx        # Slide-over AI financial coach with auto-scroll and formatted text
│   │   ├── ApplicationFormView.jsx # Paperless application form with real-time DTI gauge
│   │   ├── BestFitOffersView.jsx   # Matched alternative bank offers with reducing-balance EMI
│   │   ├── DashboardView.jsx       # Interactive habit tracker, circular readiness score ring, and XP streak counter
│   │   ├── DemoBanner.jsx          # Persistent simulation disclaimer notification header
│   │   ├── FooterModals.jsx        # Interactive modals for Privacy Policy, Grievance Officer, and NBFC disclosures
│   │   ├── InstantApprovalView.jsx # Pre-approved sanction certificate with Paytm Soundbox 4G audio alert
│   │   ├── LandingView.jsx         # Hero showcase section, quick services grid, and demo persona cards
│   │   ├── Navbar.jsx              # Paytm brand header, language toggle, and persona selector
│   │   ├── RejectionExplainerView.jsx # Forensic comparison and What-If debt reduction simulator slider
│   │   ├── RoadmapView.jsx         # 3-phase credit recovery roadmap aligned with RBI fortnightly cycles
│   │   └── SuccessView.jsx         # Sanction certificate preview and account credit simulation
│   ├── data/
│   │   └── mockData.js             # Demo personas, bilingual translations (EN/HI), habit tasks, knowledge base
│   ├── services/
│   │   └── api.js                  # REST API client with automatic offline client engine fallback
│   ├── utils/
│   │   └── financialEngine.js      # Core mathematical engine, stateful AI NLP advisor, and safety rules
│   ├── App.jsx                     # Application master state, view router, and history management
│   ├── index.css                   # Global CSS tokens, custom scrollbars, and Tailwind directives
│   └── main.jsx                    # React 19 application root mounting
├── test/
│   └── runTests.js                 # Automated unit test cases
├── index.html                      # Main HTML entry document
├── package.json                    # Node.js project manifest and scripts
├── tailwind.config.js              # Paytm brand color tokens and typography extensions
├── vercel.json                     # Vercel deployment and SPA routing rules
└── vite.config.js                  # Vite build configuration
```

---

## 4. Mathematical & Financial Specifications

### 4.1 Reducing-Balance Monthly EMI Formula

All loan payments and offer estimates in Sahayak are calculated using the industry-standard reducing-balance Equated Monthly Installment (EMI) formula:

$$\text{EMI} = \frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}$$

Where:
- $P$ = Principal loan amount in INR
- $r$ = Periodic monthly interest rate ($\text{Annual Interest Rate} \div 12 \div 100$)
- $n$ = Loan tenure in months

**Implementation:**
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

### 4.2 Debt-to-Income (DTI / FOIR) Benchmarks

$$\text{DTI} = \left(\frac{\sum \text{Existing Monthly Debt Obligations}}{\text{Monthly Net Take-Home Pay}}\right) \times 100$$

- **Safe Benchmark ($\text{DTI} \le 40.0\%$):** Complies with retail bank risk appetite. The applicant qualifies for standard underwriting.
- **Elevated Risk ($\text{DTI} > 40.0\%$):** Application is paused and routed to the Sahayak 90-Day Credit Transformation Roadmap.
- **Relief Needed Calculation:**
  $$\text{Relief} = \max(0, \text{Existing EMIs} - (\text{Monthly Income} \times 0.40))$$

---

### 4.3 RBI Fortnightly Credit Reporting Alignment

Under the Reserve Bank of India (RBI) directives for Credit Information Companies (CICs) effective January 1, 2025:
- Regulated entities report credit data on a **fortnightly cycle** (15th and end of each month).
- Sahayak's 90-day recovery roadmap maps tasks across 6 consecutive reporting windows.
- When an applicant closes micro-debt lines in Month 1, bureau ingestion reflects the update within 15 to 30 days, enabling re-application readiness by Day 90.

---

## 5. End-to-End User Flow

```
[1. Landing & Persona Selector]
       |
       v
[2. Paperless Loan Application & DTI Gauge]
       |
       +---> DTI <= 40% ---> [Instant Approval + Paytm Soundbox 4G Voice Alert]
       |
       +---> DTI > 40%
               |
               v
       [3. Forensic Rejection Explainer & What-If Debt Simulator]
               |
               +---> [4. Alternative Bank Offers (Hero FinCorp, Piramal, Tata Capital)]
               |
               v
       [5. 90-Day Credit Transformation Roadmap (RBI Fortnightly Aligned)]
               |
               v
       [6. Interactive Habit Tracker & Discipline Streak Counter]
               |
               v
       [7. Pre-Approved Sanction Certificate & Disbursal Preview]
```

---

## 6. Preset Demo Personas

| Persona Name | Occupation & Category | Income | Existing EMIs | DTI | Diagnosis & Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Rahul Sharma** | Gig Worker / Delivery Partner | INR 38,000 | INR 21,500 | **56.6%** | Paused due to 2 active BNPL lines (INR 6,300/mo). Routes to 90-Day Recovery Plan. |
| **Priya Patel** | MSME Kirana Store Owner | INR 62,000 | INR 33,000 | **53.2%** | Paused due to inventory credit overlap. Matched with Piramal Debt Consolidation. |
| **Amit Verma** | Salaried Software Engineer | INR 85,000 | INR 17,000 | **20.0%** | Pre-approved. Routes directly to Instant Approval and Soundbox 4G Disbursal. |

---

## 7. Lighthouse Performance & Web Quality Audit

PageSpeed Insights audit results for the live production deployment ([https://sahayak-sigma-lyart.vercel.app/](https://sahayak-sigma-lyart.vercel.app/)):

| Category | Score | Rating | Optimization Highlights |
| :--- | :---: | :---: | :--- |
| **Performance** | **99 / 100** | High Performance | Fast First Contentful Paint (FCP), minimal main-thread blocking, optimized Vite production chunking. |
| **Best Practices** | **100 / 100** | Perfect Score | HTTPS enforcement, clean DOM structure, secure external links, error-free console execution. |
| **Accessibility** | **92 / 100** | Highly Accessible | ARIA landmarks, high-contrast text color combinations, keyboard-navigable form inputs. |
| **SEO** | **91 / 100** | Fully Indexed | Valid `robots.txt`, XML `sitemap.xml`, descriptive meta titles, preconnected web fonts. |
| **Agentic Browsing** | **2 / 3** | Verified | Machine-readable DOM hierarchy and semantic structured layout for AI agent web navigation. |

*Audit Report Timestamp: September 19, 2026. Tested on Vercel Production Environment.*

---

## 8. Local Installation & Development Guide

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
Open `http://localhost:5173` in your browser.

### Step 4: Execute Automated Tests
```bash
npm test
```

### Step 5: Build Production Bundle
```bash
npm run build
```

---

## 9. Regulatory Compliance & AI Safety Architecture

1. **Explicit Simulation Disclaimers:** All sanction certificates, loan offers, and disbursal previews are labeled with disclaimers indicating they are illustrative educational simulations.
2. **Emergency Financial Distress Protocol:** Prompts involving severe financial distress or predatory loan shark inquiries trigger an emergency intervention protocol referencing the **National Consumer Helpline (1915)** and RBI Fair Recovery Directives.
3. **Credit Bureau Inquiry Safety:** Diagnostic evaluations utilize simulated soft pulls with zero impact on CIBIL, Experian, or CRIF High Mark credit scores.

---

## 10. License & Credits

This project is open-source software licensed under the **MIT License**.

- **Built For:** Paytm Build for India Hackathon
- **Track:** AI-Powered Financial Journeys
- **Copyright:** (c) 2026 Sahayak Project Contributors
