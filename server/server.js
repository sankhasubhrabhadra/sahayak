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
      maxSafeEmi,
      excessEmi,
      status: isApproved ? 'APPROVED' : 'REJECTED_RECOVERY_REQUIRED',
      verdictMessage: isApproved
        ? 'Congratulations! Your Debt-to-Income ratio is well within the safe 40% threshold.'
        : `Your monthly EMI commitments take up ${dti}% of your income. Lenders require under 40%.`,
      quickWin: isApproved
        ? 'Pre-approved for instant loan disbursement.'
        : `Paying down ₹${excessEmi.toLocaleString('en-IN')}/mo in high-cost micro-BNPLs drops your DTI below 40% in 30-90 days!`
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
  const offer1Rate = '11.49%';
  const offer1Emi = Math.round((offer1Amount * 1.11) / offer1Tenure);

  const offer2Amount = Math.max(45000, Math.min(originalRequest - 15000, Math.round((income * 2.4) / 5000) * 5000));
  const offer2Tenure = 24;
  const offer2Rate = '12.25%';
  const offer2Emi = Math.round((offer2Amount * 1.15) / offer2Tenure);

  const offer3Amount = Math.max(50000, Math.min(originalRequest, Math.round((income * 2.8) / 5000) * 5000));
  const offer3Tenure = 36;
  const offer3Rate = '10.99%';
  const offer3Emi = Math.round((offer3Amount * 1.18) / offer3Tenure);

  const offers = [
    {
      id: 'offer-1',
      lenderName: 'Paytm Lending Partner (Hero Fincorp)',
      lenderType: 'Pre-Approved NBFC Partner',
      eligibleAmount: offer1Amount,
      interestRate: offer1Rate,
      tenureMonths: offer1Tenure,
      monthlyEmi: offer1Emi,
      isBestMatch: true,
      approvalTag: 'Likely to be Approved',
      whyFits: `Based on your monthly income of ₹${income.toLocaleString('en-IN')}, this ₹${offer1Amount.toLocaleString('en-IN')} amount keeps your new EMI to ₹${offer1Emi.toLocaleString('en-IN')}/mo, keeping your overall EMI ratio safely under 36%.`
    },
    {
      id: 'offer-2',
      lenderName: 'Tata Capital / Axis Co-Lend',
      lenderType: 'Digital Bank Partner',
      eligibleAmount: offer2Amount,
      interestRate: offer2Rate,
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
      interestRate: offer3Rate,
      tenureMonths: offer3Tenure,
      monthlyEmi: offer3Emi,
      isBestMatch: false,
      approvalTag: 'EMI Reducer Loan',
      whyFits: 'Consolidates your scattered high-interest BNPLs into one structured loan, saving ₹2,400/month in total outflows.'
    }
  ];

  res.json({ success: true, originalRequest, offers });
});

// 4. AI Coach Chat Endpoint
app.post('/api/chat', (req, res) => {
  const { message = '', applicantName = 'Borrower' } = req.body;
  const query = message.toLowerCase();

  const matchedFaq = AI_FAQ_KNOWLEDGE.find(
    (f) => f.keywords.some((kw) => query.includes(kw)) || query.includes(f.id)
  );

  let responseText = '';
  if (matchedFaq) {
    responseText = matchedFaq.answer;
  } else {
    responseText = `Hello ${applicantName}! Underwriting models look at cashflow velocity and Debt-to-Income (DTI). Focusing on closing active micro-loans (e.g. BNPL apps) and routing daily earnings through Paytm UPI will optimize your credit eligibility within 30 to 90 days!`;
  }

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
