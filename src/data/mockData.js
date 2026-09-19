// Mock Data for Sahayak AI Loan Rejection Coach
// Paytm Build for India AI Hackathon - Track: AI-Powered Financial Journeys

export const DEMO_PERSONAS = [
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

export const INITIAL_APPLICATION_STATE = {
  fullName: 'Rahul Sharma',
  monthlyIncome: 38000,
  existingEmis: 21500,
  requestedLoanAmount: 150000,
  tenureMonths: 24,
  employmentType: 'Gig Worker',
  creditTier: 'Fair (670)'
};

export const INITIAL_HABIT_TASKS = [
  {
    phaseId: 1,
    phaseTitle: 'Month 1: EMI Optimization & BNPL Pruning',
    phaseBadge: 'Days 1–30',
    phaseGoal: 'Target: Reduce monthly EMI outflow by ₹6,300 to reach ~40% DTI benchmark',
    tasks: [
      {
        id: 't1',
        title: 'Pay off Simpl Micro-BNPL Loan (₹2,500/mo saved)',
        category: 'Debt Clearance',
        xp: 120,
        weightPercent: 18,
        description: 'Eliminates active unsecured high-frequency lender inquiry and lowers monthly obligations.',
        completed: true,
        dueDate: 'Day 12'
      },
      {
        id: 't2',
        title: 'Consolidate LazyPay BNPL into single low-interest balance',
        category: 'Debt Clearance',
        xp: 100,
        weightPercent: 15,
        description: 'Cuts recurring monthly EMI by ₹3,800/month, reducing DTI by ~10 percentage points.',
        completed: true,
        dueDate: 'Day 22'
      },
      {
        id: 't3',
        title: 'Enable Auto-Debit for Two-Wheeler EMI via Paytm UPI',
        category: 'UPI Habit',
        xp: 60,
        weightPercent: 7,
        description: 'Helps maintain a clean repayment record (0 DPD) for bureau reporting.',
        completed: false,
        dueDate: 'Day 28'
      }
    ]
  },
  {
    phaseId: 2,
    phaseTitle: 'Month 2: Cashflow Velocity & Buffer Building',
    phaseBadge: 'Days 31–60',
    phaseGoal: 'Target: Demonstrate steady cashflow with 25+ regular Paytm UPI transactions',
    tasks: [
      {
        id: 't4',
        title: 'Route daily earnings to primary Paytm Payments Bank account',
        category: 'Cashflow Health',
        xp: 100,
        weightPercent: 15,
        description: 'Demonstrates regular inflow velocity per month for cashflow-based lender underwriting.',
        completed: false,
        dueDate: 'Day 42'
      },
      {
        id: 't5',
        title: 'Park ₹3,000 emergency buffer into Paytm Gold/Vault',
        category: 'Savings Buffer',
        xp: 80,
        weightPercent: 15,
        description: 'Creates a liquid buffer so unexpected expenses do not trigger new micro-loans.',
        completed: false,
        dueDate: 'Day 55'
      }
    ]
  },
  {
    phaseId: 3,
    phaseTitle: 'Month 3: Bureau Refresh & Pre-Approved Sanction',
    phaseBadge: 'Days 61–90',
    phaseGoal: 'Target: Zero new inquiries, low utilization, unlocked simulated pre-approval',
    tasks: [
      {
        id: 't6',
        title: 'Maintain Credit Card utilization strictly below 30%',
        category: 'Bureau Optimization',
        xp: 120,
        weightPercent: 15,
        description: 'Signals responsible balance management, supporting positive bureau risk trajectory.',
        completed: false,
        dueDate: 'Day 78'
      },
      {
        id: 't7',
        title: 'Trigger Sahayak Zero-Inquiry Soft Bureau Refresh',
        category: 'Eligibility Pre-Check',
        xp: 150,
        weightPercent: 15,
        description: 'Confirms that DTI is now < 40% and unlocks illustrative pre-approved loan terms (Demo).',
        completed: false,
        dueDate: 'Day 90'
      }
    ]
  }
];

export const AI_FAQ_KNOWLEDGE = [
  {
    id: 'dti',
    question: 'Why was my loan rejected if I earn a good monthly income?',
    answer: 'Underwriters look at your Debt-to-Income (DTI) ratio rather than gross income alone. If existing EMIs exceed common lender planning benchmarks (typically ~40% of take-home pay), automated algorithms flag high debt obligations. Reducing recurring debt restores your borrowing capacity.'
  },
  {
    id: 'reapply',
    question: 'Can I re-apply earlier than 90 days?',
    answer: 'Yes, you can re-apply earlier. Under RBI guidelines effective Jan 1, 2025, lenders report to credit bureaus fortnightly (15th and month-end). However, 90 days is recommended in Sahayak as an illustrative planning horizon to build a consistent 3-month repayment track record and ensure all debt closures are fully ingested across bureau cycles.'
  },
  {
    id: 'bureau_frequency',
    question: 'How often does CIBIL / credit bureau update?',
    answer: 'Under RBI’s regulatory framework effective January 1, 2025, credit institutions and Credit Information Companies (CICs) must report credit data on a fortnightly basis (15th and last day of each month). Actual credit report updates depend on when lenders submit their batch files and bureau ingestion schedules.'
  },
  {
    id: 'bnpl',
    question: 'Do Buy-Now-Pay-Later (BNPL) apps affect my credit score?',
    answer: 'Yes, many BNPL products are structured as regulated credit lines by partner NBFCs/banks and reported to bureaus. Maintaining timely payments helps, while running multiple active micro-lines simultaneously can signal credit hunger during automated screening.'
  },
  {
    id: 'upi',
    question: 'Does Paytm UPI usage directly increase my CIBIL score?',
    answer: 'No. Standard UPI transactions are payment transfers, not credit facilities, and are not reported to CIBIL. However, with your consent, participating lenders may review UPI cashflow velocity via Account Aggregator as an alternate proof of steady income.'
  },
  {
    id: 'what_if_80k',
    question: 'What if I apply for ₹80,000 instead of ₹1,50,000?',
    answer: 'For ₹80,000 at 10.49% p.a. over 24 months, the estimated reducing-balance EMI is ~₹3,710/month. While lower loan amounts require less monthly headroom, approval cannot be guaranteed as lenders evaluate full debt capacity, credit history, and employment stability.'
  }
];

export const TRANSLATIONS = {
  en: {
    brandName: 'Sahayak',
    brandTag: 'AI Loan Rejection Coach',
    hackathonTag: 'Paytm Build for India AI Hackathon',
    trackTag: 'Track: AI-Powered Financial Journeys',
    heroTagline: "Rejection isn't the end — it's the starting line.",
    heroSubtitle: 'Traditional lenders reject 70% of credit applicants with cold rejection letters. Sahayak uses Paytm AI diagnostics to turn your rejection into an actionable 90-day pathway to loan readiness.',
    checkAppBtn: 'Check My Application',
    demoPersonasBtn: 'Load Demo Personas',
    instantSanction: 'Pre-Approved Demo Sanction',
    zeroBureauHit: '0 Hard Credit Inquiries',
    aiDiagnosisTitle: 'AI Sahayak Diagnostic Report',
    whyRejected: 'Why was this application not approved today?',
    dtiExplained: 'Debt-to-Income (DTI) Ratio',
    safeZone: 'Safe Planning Zone (<40%)',
    stretchedZone: 'High Risk (>40%)',
    roadmapTitle: 'Your 90-Day Financial Recovery Roadmap',
    trackerTitle: 'Sahayak Financial Fitness Dashboard',
    readinessScore: 'Loan Readiness Score',
    streak: 'Days Active Streak',
    fastForwardTitle: 'Demo Fast-Forward Slider (Judges & Pitch Demo)',
    congratsTitle: "You're 100% Loan Ready!",
    claimLoanBtn: 'Claim Pre-Approved Loan',
    disburseNow: 'Disburse to Paytm Payments Bank',
    reset: 'Reset Demo'
  },
  hi: {
    brandName: 'सहायक',
    brandTag: 'AI लोन रिजेक्शन कोच',
    hackathonTag: 'Paytm बिल्ड फॉर इंडिया AI हैकाथॉन',
    trackTag: 'ट्रैक: AI-पावर्ड फाइनेंशियल जर्नीज़',
    heroTagline: 'रिजेक्शन अंत नहीं — बल्कि मंज़िल की शुरुआत है!',
    heroSubtitle: 'बैंक लोन रिजेक्ट कर देते हैं बिना कोई स्पष्ट रास्ता दिखाए। सहायक AI आपके रिजेक्शन का विश्लेषण करके 90 दिनों में लोन पात्रता का पारदर्शी रोडमैप तैयार करता है।',
    checkAppBtn: 'लोन पात्रता जांचें',
    demoPersonasBtn: 'डेमो प्रोफाइल चुनें',
    instantSanction: 'प्री-अप्रूव्ड डेमो सैंक्शन',
    zeroBureauHit: 'सिबिल पर कोई बुरा असर नहीं',
    aiDiagnosisTitle: 'सहायक AI डायग्नोस्टिक रिपोर्ट',
    whyRejected: 'आज लोन अप्रूव क्यों नहीं हुआ?',
    dtiExplained: 'ईएमआई बनाम आमदनी (DTI अनुपात)',
    safeZone: 'सुरक्षित प्लानिंग सीमा (<40%)',
    stretchedZone: 'अधिक जोखिम (>40%)',
    roadmapTitle: 'आपका 90-दिन का वित्तीय सुधार रोडमैप',
    trackerTitle: 'सहायक फाइनेंशियल फिटनेस डैशबोर्ड',
    readinessScore: 'लोन तैयारी स्कोर',
    streak: 'लगातार एक्टिव दिन',
    fastForwardTitle: 'डेमो फास्ट-फॉरवर्ड स्लाइडर (जज और पिच के लिए)',
    congratsTitle: 'बधाई हो! आप 100% लोन पात्रता पर पहुंच गए हैं!',
    claimLoanBtn: 'प्री-अप्रूव्ड लोन देखें',
    disburseNow: 'Paytm पेमेंट्स बैंक में तुरंत ट्रांसफर करें',
    reset: 'रीसेट करें'
  }
};
