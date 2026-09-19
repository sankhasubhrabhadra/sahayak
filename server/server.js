import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend (supports local dev and deployed Vercel domains)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Mock Personas Data
const DEMO_PERSONAS = [
  {
    id: 'rahul',
    name: 'Rahul Sharma',
    avatar: '👨‍💼',
    tag: 'Gig Delivery Partner (Swiggy/Zomato)',
    employmentType: 'Gig Worker',
    monthlyIncome: 38000,
    existingEmis: 21500,
    requestedLoanAmount: 150000,
    tenureMonths: 24,
    creditTier: 'Fair (670)',
    cibilScore: 670,
    existingLoans: [
      { name: 'Bike Two-Wheeler Loan', emi: 6500, balance: 45000, type: 'Secured' },
      { name: 'Personal Gadget Loan', emi: 8700, balance: 52000, type: 'Unsecured' },
      { name: 'LazyPay BNPL Balance', emi: 3800, balance: 12000, type: 'BNPL' },
      { name: 'Simpl Micro-Credit', emi: 2500, balance: 8500, type: 'BNPL' }
    ],
    diagnosisNotes: {
      keyIssue: 'Excessive Unsecured Short-Term BNPL Obligations (Debt-to-Income 56.6%)',
      dtiPercent: 56.6,
      maxRecommendedEmi: 15200,
      excessEmi: 6300,
      quickWin: 'Closing 2 BNPL accounts reduces monthly EMI by ₹6,300 and drops DTI to 40.0%!'
    }
  },
  {
    id: 'priya',
    name: 'Priya Verma',
    avatar: '👩‍💼',
    tag: 'Small Boutique Owner',
    employmentType: 'Self-Employed Business',
    monthlyIncome: 65000,
    existingEmis: 34500,
    requestedLoanAmount: 300000,
    tenureMonths: 36,
    creditTier: 'Good (715)',
    cibilScore: 715,
    existingLoans: [
      { name: 'Commercial Equipment EMI', emi: 16000, balance: 180000, type: 'Business' },
      { name: 'Credit Card Revolving Minimum', emi: 12500, balance: 85000, type: 'Credit Card' },
      { name: 'Amazon Pay Later', emi: 6000, balance: 22000, type: 'BNPL' }
    ],
    diagnosisNotes: {
      keyIssue: 'High Revolving Credit Card Minimums & BNPL Split (53.1% DTI)',
      dtiPercent: 53.1,
      maxRecommendedEmi: 26000,
      excessEmi: 8500,
      quickWin: 'Consolidating revolving card dues and clearing Amazon Pay Later brings DTI to 33.8% in 60 days.'
    }
  },
  {
    id: 'amit',
    name: 'Amit Patel',
    avatar: '👨‍💻',
    tag: 'Salaried Software Associate',
    employmentType: 'Salaried Full-Time',
    monthlyIncome: 55000,
    existingEmis: 11000,
    requestedLoanAmount: 200000,
    tenureMonths: 24,
    creditTier: 'Excellent (785)',
    cibilScore: 785,
    existingLoans: [
      { name: 'Consumer Electronic EMI', emi: 6000, balance: 24000, type: 'Unsecured' },
      { name: 'Education Loan Balance', emi: 5000, balance: 65000, type: 'Education' }
    ],
    diagnosisNotes: {
      keyIssue: 'None — High Affordability Ratio',
      dtiPercent: 20.0,
      maxRecommendedEmi: 22000,
      excessEmi: 0,
      quickWin: 'Your EMI ratio is comfortably under 40%. You qualify for instant loan disbursement!'
    }
  }
];

const AI_FAQ_KNOWLEDGE = [
  {
    id: 'dti',
    keywords: ['dti', 'debt to income', 'salary', 'income', 'reject', 'ratio'],
    question: 'Why was my loan rejected if I earn a good monthly income?',
    answer: 'Underwriters look at Debt-to-Income (DTI) ratio rather than gross income. If your existing EMIs exceed 40% of your take-home pay, lenders worry that any unexpected expense might lead to a default, even if your total income is high.'
  },
  {
    id: 'bnpl',
    keywords: ['bnpl', 'lazypay', 'simpl', 'pay later', 'amazon pay'],
    question: 'Do Buy-Now-Pay-Later (BNPL) apps affect my loan approval?',
    answer: 'Yes! Every active BNPL account is registered as an active unsecured personal loan line on CIBIL/Experian. Having 3–4 active micro-lines signals credit hunger, dragging down your approval score. Closing unused BNPL apps is the fastest way to improve eligibility.'
  },
  {
    id: 'upi',
    keywords: ['upi', 'paytm', 'soundbox', 'gig', 'swiggy', 'zomato'],
    question: 'How does regular Paytm UPI usage help gig workers get loans?',
    answer: 'When gig workers lack formal salary slips, Paytm AI uses Account Aggregator & UPI transaction velocity (consistent daily inflows from Swiggy/Zomato/Uber) as alternative proof of steady cashflow to approve loans.'
  },
  {
    id: 'timeline',
    keywords: ['reapply', 'timeline', 'fast', 'how long', '90 days', 'cibil'],
    question: 'Can I re-apply earlier than 90 days?',
    answer: 'Credit bureaus in India (CIBIL, Experian, CRIF) update records on a 30 to 45-day cycle. 90 days is the ideal sweet spot to pay down micro-loans, let the bureau refresh, and build a 3-month positive streak without multiple hard inquiries.'
  }
];

// Reducing-balance EMI calculation
function calculateReducingEmi(principal, annualRatePct, tenureMonths) {
  if (!principal || !tenureMonths || tenureMonths <= 0) return 0;
  if (!annualRatePct || annualRatePct <= 0) return Math.round(principal / tenureMonths);

  const monthlyRate = annualRatePct / (12 * 100);
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
}

function calculateDti(obligations, income) {
  const inc = Number(income) || 1;
  const obs = Number(obligations) || 0;
  const dti = Number(((obs / inc) * 100).toFixed(1));
  const formulaStr = `₹${obs.toLocaleString('en-IN')} obligations ÷ ₹${inc.toLocaleString('en-IN')} income × 100 = ${dti}%`;
  return { dti, formulaStr };
}

// Comprehensive Financial AI response generator
function generateAdvisorReply(message = '', applicant = {}) {
  const query = (message || '').toLowerCase().trim();
  const profileIncome = Number(applicant.monthlyIncome) || 38000;
  const profileEmis = Number(applicant.existingEmis) || 21500;
  const profileName = applicant.fullName || applicant.applicantName || 'Borrower';

  if (query.includes('earlier than 90 days') || query.includes('reapply earlier') || (query.includes('reapply') && query.includes('90'))) {
    return `Yes, you can re-apply earlier. Under RBI's regulatory framework (effective Jan 1, 2025), lenders report credit data fortnightly (15th and month-end). However, 90 days is recommended in Sahayak as an illustrative planning horizon to build a consistent 3-month repayment track record and allow closed micro-lines to be fully ingested across bureau cycles.`;
  }

  if (query.includes('how often') && (query.includes('cibil') || query.includes('bureau') || query.includes('update') || query.includes('report'))) {
    return `Under RBI's regulatory framework effective January 1, 2025, credit institutions and Credit Information Companies (CICs) must report credit data on a fortnightly basis (as of the 15th and last day of each month). The actual appearance on your report depends on when your specific lender submits the reporting file and bureau processing schedules.`;
  }

  if (query.includes('80000') || query.includes('80,000') || (query.includes('what if') && query.includes('80'))) {
    const P = 80000;
    const rate = 10.49;
    const n = 24;
    const emi = calculateReducingEmi(P, rate, n);
    const newTotalObligations = profileEmis + emi;
    const newDti = ((newTotalObligations / profileIncome) * 100).toFixed(1);

    return `I can't guarantee that ₹80,000 will be approved. Illustrative demo calculation:\n• Loan Amount: ₹80,000 at ${rate}% p.a. for ${n} months\n• Estimated Monthly EMI: ₹${emi.toLocaleString('en-IN')}/mo (reducing balance)\n• Current DTI: ${((profileEmis / profileIncome) * 100).toFixed(1)}% (₹${profileEmis.toLocaleString('en-IN')} ÷ ₹${profileIncome.toLocaleString('en-IN')})\n• New Estimated DTI: ${newDti}% without debt reduction.\n• If you first close ₹6,300/mo micro-BNPLs, new DTI becomes ~${(((newTotalObligations - 6300) / profileIncome) * 100).toFixed(1)}%.\n*Educational estimate only. Approval is subject to individual lender underwriting.*`;
  }

  if (query.includes('50 points') || (query.includes('score') && (query.includes('increase by') || query.includes('guarantee')))) {
    return `No specific credit score increase (such as 50 points) can be guaranteed. Credit scoring algorithms evaluate overall payment history (35%), credit utilization (30%), vintage (15%), credit mix (10%), and inquiries (10%). Repaying debt supports credit health, but exact movements depend on your entire bureau history.`;
  }

  if (query.includes('upi') && (query.includes('cibil') || query.includes('score') || query.includes('increase'))) {
    return `No, using Paytm UPI does not directly increase your CIBIL score. Bureau scores are built only from formal credit facilities reported by regulated institutions. However, consenting lenders may evaluate UPI transaction velocity via Account Aggregator as an alternate indicator of steady cashflow.`;
  }

  if (query.includes('bnpl') || query.includes('lazypay') || query.includes('simpl')) {
    return `Many Buy-Now-Pay-Later (BNPL) facilities are structured as regulated credit lines and reported to credit bureaus. Timely payments support repayment history, while having multiple active micro-lines simultaneously can signal credit hunger during automated screening.`;
  }

  if (query.includes('40%') && (query.includes('rbi') || query.includes('rule') || query.includes('law') || query.includes('mandate'))) {
    return `No, RBI does not mandate a universal 40% DTI cap for personal loans. The 40% threshold is an industry planning benchmark and internal risk guideline adopted by retail lenders. Each regulated lender sets its own board-approved underwriting criteria.`;
  }

  if (query.includes('dti') || query.includes('debt to income') || (query.includes('income') && query.includes('emi'))) {
    const { dti, formulaStr } = calculateDti(profileEmis, profileIncome);
    return `Your Debt-to-Income (DTI) calculation:\n${formulaStr}\nLenders commonly use ~40% as an affordability planning benchmark. Trimming ₹6,300/mo in micro-obligations drops your DTI to ${(((profileEmis - 6300) / profileIncome) * 100).toFixed(1)}%, expanding your borrowing headroom.`;
  }

  return `Hello ${profileName}! Underwriting models evaluate Debt-to-Income (DTI) capacity and payment discipline. In your profile, closing ₹6,300/mo of micro-BNPLs drops your DTI from ${((profileEmis/profileIncome)*100).toFixed(1)}% to ~40.0% within standard bureau reporting cycles. Educational estimate only.`;
}

// --- ROUTES ---

// Health check (for Render monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Sahayak AI Loan Rejection Coach API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sahayak Backend API — Paytm Build for India AI Hackathon',
    docs: {
      health: 'GET /health',
      personas: 'GET /api/personas',
      underwrite: 'POST /api/underwrite',
      offers: 'POST /api/offers',
      roadmap: 'GET /api/roadmap',
      chat: 'POST /api/chat',
      disburse: 'POST /api/disburse'
    }
  });
});

// 1. Get Personas
app.get('/api/personas', (req, res) => {
  res.json({ success: true, personas: DEMO_PERSONAS });
});

// 2. Underwrite & Diagnostic Evaluation
app.post('/api/underwrite', (req, res) => {
  const {
    fullName = 'Applicant',
    monthlyIncome = 38000,
    existingEmis = 21500,
    requestedLoanAmount = 150000,
    tenureMonths = 24,
    employmentType = 'Gig Worker'
  } = req.body;

  const income = Number(monthlyIncome) || 1;
  const emis = Number(existingEmis) || 0;
  const loan = Number(requestedLoanAmount) || 50000;
  const tenure = Number(tenureMonths) || 24;

  const dti = Number(((emis / income) * 100).toFixed(1));
  const maxSafeEmi = Math.round(income * 0.40);
  const excessEmi = Math.max(0, emis - maxSafeEmi);
  const isApproved = dti <= 40;

  res.json({
    success: true,
    evaluation: {
      fullName,
      monthlyIncome: income,
      existingEmis: emis,
      requestedLoanAmount: loan,
      tenureMonths: tenure,
      employmentType,
      dtiPercent: dti,
      dtiFormula: `₹${emis.toLocaleString('en-IN')} ÷ ₹${income.toLocaleString('en-IN')} × 100 = ${dti}%`,
      maxSafeEmi,
      excessEmi,
      status: isApproved ? 'APPROVED' : 'REJECTED_RECOVERY_REQUIRED',
      verdictMessage: isApproved
        ? 'Congratulations! Your Debt-to-Income ratio is well within the 40% benchmark.'
        : `Your monthly debt obligations take up ${dti}% of your income. Standard retail lender benchmarks recommend under 40%.`,
      quickWin: isApproved
        ? 'Demo Pre-Approved for instant simulated disbursement.'
        : `Paying down ₹${excessEmi.toLocaleString('en-IN')}/mo in high-cost micro-BNPLs drops your DTI to 40.0% within standard bureau reporting cycles.`
    }
  });
});

// 3. Best-Fit Alternative Bank Offers
app.post('/api/offers', (req, res) => {
  const {
    monthlyIncome = 38000,
    existingEmis = 21500,
    requestedLoanAmount = 150000
  } = req.body;

  const income = Number(monthlyIncome) || 38000;
  const originalRequest = Number(requestedLoanAmount) || 150000;

  const offer1Amount = Math.max(30000, Math.min(originalRequest - 30000, Math.round((income * 1.8) / 5000) * 5000));
  const offer1Tenure = 18;
  const offer1Rate = 11.49;
  const offer1Emi = calculateReducingEmi(offer1Amount, offer1Rate, offer1Tenure);

  const offer2Amount = Math.max(45000, Math.min(originalRequest - 15000, Math.round((income * 2.4) / 5000) * 5000));
  const offer2Tenure = 24;
  const offer2Rate = 12.25;
  const offer2Emi = calculateReducingEmi(offer2Amount, offer2Rate, offer2Tenure);

  const offer3Amount = Math.max(50000, Math.min(originalRequest, Math.round((income * 2.8) / 5000) * 5000));
  const offer3Tenure = 36;
  const offer3Rate = 10.99;
  const offer3Emi = calculateReducingEmi(offer3Amount, offer3Rate, offer3Tenure);

  const offers = [
    {
      id: 'offer-1',
      lenderName: 'Paytm Lending Partner (Hero Fincorp)',
      lenderType: 'Pre-Approved NBFC Partner',
      eligibleAmount: offer1Amount,
      interestRate: `${offer1Rate}%`,
      tenureMonths: offer1Tenure,
      monthlyEmi: offer1Emi,
      isBestMatch: true,
      approvalTag: 'Likely to be Approved (Demo Fit)',
      whyFits: `Based on your monthly income of ₹${income.toLocaleString('en-IN')}, this ₹${offer1Amount.toLocaleString('en-IN')} amount keeps your new reducing-balance EMI to ₹${offer1Emi.toLocaleString('en-IN')}/mo, keeping your overall EMI ratio safely under 36%.`
    },
    {
      id: 'offer-2',
      lenderName: 'Tata Capital / Axis Co-Lend',
      lenderType: 'Digital Bank Partner',
      eligibleAmount: offer2Amount,
      interestRate: `${offer2Rate}%`,
      tenureMonths: offer2Tenure,
      monthlyEmi: offer2Emi,
      isBestMatch: false,
      approvalTag: 'High Cashflow Fit',
      whyFits: 'Evaluates your daily Paytm QR & UPI transaction frequency as alternate income proof instead of salary slips.'
    },
    {
      id: 'offer-3',
      lenderName: 'Sahayak Smart Refinance (Piramal Finance)',
      lenderType: 'Debt Consolidation Special',
      eligibleAmount: offer3Amount,
      interestRate: `${offer3Rate}%`,
      tenureMonths: offer3Tenure,
      monthlyEmi: offer3Emi,
      isBestMatch: false,
      approvalTag: 'EMI Reducer Loan',
      whyFits: 'Consolidates scattered high-interest BNPLs into one structured loan, saving ₹2,400/month in total outflows.'
    }
  ];

  res.json({ success: true, originalRequest, offers });
});

// 4. AI Coach Chat Endpoint
app.post('/api/chat', (req, res) => {
  const { message = '', applicantName = 'Borrower', applicant = {} } = req.body;
  const responseText = generateAdvisorReply(message, { applicantName, ...applicant });

  res.json({
    success: true,
    reply: responseText,
    timestamp: new Date().toISOString()
  });
});

// 5. Instant Disbursement Simulation
app.post('/api/disburse', (req, res) => {
  const {
    loanAmount = 150000,
    recipientName = 'Rahul Sharma',
    accountType = 'Paytm Payments Bank'
  } = req.body;

  const txnId = `PTM-90DAY-SUCCESS-${Math.floor(100000 + Math.random() * 900000)}`;

  res.json({
    success: true,
    disbursement: {
      transactionId: txnId,
      amount: loanAmount,
      recipientName,
      destinationAccount: `${accountType} (•••• 4092)`,
      status: 'COMPLETED_INSTANT_IMPS',
      soundboxChimeText: `Paytm par ₹${Number(loanAmount).toLocaleString('en-IN')} prapt hue`,
      timestamp: new Date().toISOString()
    }
  });
});

app.listen(PORT, () => {
  console.log(`Sahayak Backend API server listening on port ${PORT}`);
});
