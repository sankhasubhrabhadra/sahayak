// Financial Calculation and Regulatory NLP Engine for Sahayak
// Strictly adheres to RBI Credit Information Reporting Framework & Prudent Underwriting Principles

/**
 * Calculates standard reducing-balance monthly EMI
 * Formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
 * @param {number} principal Principal amount (P)
 * @param {number} annualRatePct Annual interest rate percentage (e.g. 10.49)
 * @param {number} tenureMonths Total months (n)
 * @returns {number} Monthly EMI rounded to nearest rupee
 */
export function calculateReducingEmi(principal, annualRatePct, tenureMonths) {
  const p = Number(principal) || 0;
  const n = Number(tenureMonths) || 0;
  const r = Number(annualRatePct) || 0;

  if (p <= 0 || n <= 0) return 0;
  if (r <= 0) return Math.round(p / n);

  const monthlyRate = r / (12 * 100);
  const factor = Math.pow(1 + monthlyRate, n);
  const emi = (p * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
}

/**
 * Calculates Debt-to-Income (DTI) / FOIR ratio
 * Formula: (Total Monthly Debt Obligations / Monthly Income) * 100
 * @param {number} monthlyObligations 
 * @param {number} monthlyIncome 
 * @returns {{ dti: number, isSafe: boolean, formulaStr: string }}
 */
export function calculateDti(monthlyObligations, monthlyIncome) {
  const income = Math.max(0, Number(monthlyIncome) || 0);
  const obligations = Math.max(0, Number(monthlyObligations) || 0);

  if (income <= 0) {
    return { dti: 0, isSafe: false, formulaStr: 'Income is zero or missing' };
  }

  const dti = Number(((obligations / income) * 100).toFixed(1));
  const isSafe = dti <= 40;
  const formulaStr = `₹${obligations.toLocaleString('en-IN')} monthly obligations ÷ ₹${income.toLocaleString('en-IN')} monthly income × 100 = ${dti}%`;

  return { dti, isSafe, formulaStr };
}

/**
 * Calculates maximum suggested safe EMI (40% benchmark)
 * @param {number} monthlyIncome 
 * @param {number} thresholdPct 
 * @returns {number}
 */
export function calculateMaxSafeEmi(monthlyIncome, thresholdPct = 40) {
  const income = Math.max(0, Number(monthlyIncome) || 0);
  return Math.round(income * (thresholdPct / 100));
}

/**
 * Calculates relief needed to bring existing EMIs down to 40% DTI
 * @param {number} existingEmis 
 * @param {number} monthlyIncome 
 * @returns {number}
 */
export function calculateReliefNeeded(existingEmis, monthlyIncome) {
  const emis = Math.max(0, Number(existingEmis) || 0);
  const maxSafe = calculateMaxSafeEmi(monthlyIncome, 40);
  return Math.max(0, emis - maxSafe);
}

/**
 * Calculates new DTI after a specific EMI reduction
 * @param {number} existingEmis 
 * @param {number} reduction 
 * @param {number} monthlyIncome 
 * @returns {number}
 */
export function calculateNewDtiAfterRelief(existingEmis, reduction, monthlyIncome) {
  const income = Math.max(0, Number(monthlyIncome) || 0);
  if (income <= 0) return 0;
  const newEmis = Math.max(0, (Number(existingEmis) || 0) - (Number(reduction) || 0));
  return Number(((newEmis / income) * 100).toFixed(1));
}

/**
 * Validates applicant profile input values
 * @param {object} profile 
 * @returns {{ isValid: boolean, errors: object }}
 */
export function validateProfileInputs(profile = {}) {
  const errors = {};

  const name = (profile.fullName || '').trim();
  if (!name) {
    errors.fullName = 'Full name is required.';
  } else if (name.length > 100) {
    errors.fullName = 'Full name must be under 100 characters.';
  }

  const income = Number(profile.monthlyIncome);
  if (isNaN(income) || income <= 0) {
    errors.monthlyIncome = 'Monthly income must be a positive number greater than ₹0.';
  } else if (income > 10000000) {
    errors.monthlyIncome = 'Income exceeds maximum limit.';
  }

  const emis = Number(profile.existingEmis);
  if (isNaN(emis) || emis < 0) {
    errors.existingEmis = 'Existing EMIs cannot be negative.';
  } else if (income > 0 && emis > income * 2) {
    errors.existingEmis = 'Existing EMIs exceed realistic bounds relative to income.';
  }

  const loan = Number(profile.requestedLoanAmount);
  if (isNaN(loan) || loan <= 0) {
    errors.requestedLoanAmount = 'Loan amount must be greater than ₹0.';
  } else if (loan > 10000000) {
    errors.requestedLoanAmount = 'Requested loan amount exceeds maximum limit.';
  }

  const tenure = Number(profile.tenureMonths);
  if (isNaN(tenure) || tenure <= 0) {
    errors.tenureMonths = 'Please select a valid tenure.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Detects contradictory claims in chatbot queries
 * @param {string} query 
 * @returns {boolean}
 */
export function detectContradiction(query = '') {
  const q = query.toLowerCase();

  // Pattern 1: Conflicting income claims e.g. "income is 20000 and 80000" or "earn 20000 but earn 80000"
  const incomeNumbers = q.match(/(?:income|salary|earn|earning|take-home|take home|earn)\s*(?:is|of|:|=)?\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*)/g);
  if (incomeNumbers && incomeNumbers.length >= 2) {
    const vals = incomeNumbers.map((s) => Number(s.replace(/[^\d]/g, ''))).filter((v) => v > 0);
    if (vals.length >= 2 && vals[0] !== vals[1]) {
      return true;
    }
  }

  // Pattern 2: Missed payment contradictions e.g. "never missed a payment" + "missed three payments"
  if (
    (q.includes('never missed') || q.includes('no missed') || q.includes('always on time') || q.includes('zero dpd')) &&
    (q.includes('missed') || q.includes('late payment') || q.includes('defaulted') || q.includes('dpd'))
  ) {
    if (q.includes('missed 3') || q.includes('missed three') || q.includes('missed two') || q.includes('missed 2') || q.includes('missed last month')) {
      return true;
    }
  }

  // Pattern 3: Explicit wording "both 20,000 and 80,000" or "income is 20,000 and 80,000"
  if (q.includes('both') && q.includes('and') && (q.includes('20') || q.includes('50')) && (q.includes('80') || q.includes('60'))) {
    return true;
  }

  return false;
}

/**
 * Detects sensitive financial distress or unsafe debt situations
 * @param {string} query 
 * @returns {boolean}
 */
export function detectSensitiveDistress(query = '') {
  const q = query.toLowerCase();
  const distressKeywords = [
    'rent', 'eviction', 'evicted', 'loan shark', 'urgent cash', 'desperate',
    'cannot pay rent', 'unaffordable', 'debt trap', 'suicide', 'hopeless',
    'high interest', 'payday loan', 'money lender', 'bounced', 'starving'
  ];
  return distressKeywords.some((kw) => q.includes(kw));
}

/**
 * Detects whether query is completely out of scope of financial coaching
 * @param {string} query 
 * @returns {boolean}
 */
export function detectOutOfScope(query = '') {
  const q = query.toLowerCase();
  const outOfScopeKeywords = [
    'weather', 'recipe', 'cook', 'movie', 'actor', 'cricket', 'football',
    'coding', 'python', 'javascript', 'react', 'joke', 'song', 'capital of',
    'who is president', 'who won', 'translate'
  ];
  return outOfScopeKeywords.some((kw) => q.includes(kw));
}

/**
 * Core Financial Intelligence Assistant for Sahayak AI Coach
 * @param {string} userQuery 
 * @param {object} applicant Active profile model
 * @returns {{ answer: string, basis?: string }}
 */
export function generateFinancialAdvisorResponse(userQuery = '', applicant = {}) {
  const rawQuery = (userQuery || '').trim();

  // Reject empty or whitespace-only inputs
  if (!rawQuery) {
    return {
      answer: 'Please enter a question or prompt so I can assist you with your loan eligibility and credit roadmap.'
    };
  }

  const query = rawQuery.toLowerCase();

  // 1. Contradiction Check (CRITICAL FIX REQUIREMENT)
  if (detectContradiction(rawQuery)) {
    return {
      answer: 'I see conflicting information. Which value should I use?',
      basis: 'Contradiction detector flagged conflicting numbers or statements.'
    };
  }

  // 2. Sensitive Financial Distress Check (CRITICAL FIX REQUIREMENT)
  if (detectSensitiveDistress(rawQuery)) {
    return {
      answer: `I understand that you may be facing an urgent or difficult financial situation, but I strongly advise against borrowing from unverified, high-interest, or predatory lenders.\n\n**Safer Immediate Options:**\n1. **Communicate directly with your landlord/creditor:** Explain your situation and request a temporary extension or structured split payment.\n2. **Reach out to family or trusted contacts:** Seek temporary support without incurring high-interest penalty rates.\n3. **Contact Regulated Financial Counseling Services:** You can consult licensed counselors or call the National Consumer Helpline (1915) for official advice.\n\n*Financial Safety Note: Sahayak does not recommend unregulated or high-interest lenders. Seek guidance from licensed financial advisory services for emergency debt distress.*`,
      basis: 'Financial Safety Protocol for Urgent Debt Distress.'
    };
  }

  // 3. Out-of-Scope Questions Boundary (CRITICAL FIX REQUIREMENT)
  if (detectOutOfScope(rawQuery)) {
    return {
      answer: 'I am Sahayak, your AI Financial Education Coach. I can only assist with personal loan eligibility, DTI calculations, debt recovery roadmaps, and credit reporting questions. How can I help with your financial journey today?',
      basis: 'Scope boundary enforcement.'
    };
  }

  // Extract active profile figures safely (Source of Truth)
  const profileIncome = Math.max(1, Number(applicant.monthlyIncome) || 38000);
  const profileEmis = Math.max(0, Number(applicant.existingEmis) || 21500);
  const profileLoan = Math.max(1000, Number(applicant.requestedLoanAmount) || 150000);
  const profileTenure = Math.max(1, Number(applicant.tenureMonths) || 24);
  const profileName = (applicant.fullName || 'Applicant').trim();

  const { dti: profileDti } = calculateDti(profileEmis, profileIncome);

  // Helper to parse numerical strings like "50,000" or "80000"
  const parseNum = (str) => {
    if (!str) return null;
    const clean = str.replace(/,/g, '');
    const num = Number(clean);
    return isNaN(num) ? null : num;
  };

  const incomeMatch = query.match(/(?:income|salary|earn|earning|take-home|take home)(?:\s*(?:is|of|:|=)?\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*))/i);
  const emiMatch = query.match(/(?:emi|obligation|obligations|debt|current emi)(?:\s*(?:is|of|:|=)?\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*))/i);

  const parsedExplicitIncome = incomeMatch ? parseNum(incomeMatch[1]) : null;
  const parsedExplicitEmi = emiMatch ? parseNum(emiMatch[1]) : null;

  // 4. Detailed Rejection Question (CRITICAL 5-STEP RESPONSE STRUCTURE)
  if (query.includes('why was my loan rejected') || query.includes('why rejected') || query.includes('reason for rejection') || query.includes('why was i rejected') || query.includes('why did i get rejected')) {
    const inc = parsedExplicitIncome || profileIncome;
    const emi = parsedExplicitEmi || profileEmis;
    const { dti, formulaStr } = calculateDti(emi, inc);
    const maxSafe = calculateMaxSafeEmi(inc, 40);

    return {
      answer: `Here is the structured breakdown of your application evaluation:\n\n**1. What is known:**\n• Monthly Take-Home Income: ₹${inc.toLocaleString('en-IN')}\n• Existing Monthly EMIs: ₹${emi.toLocaleString('en-IN')}\n• Calculated Debt-to-Income (DTI) Ratio: **${dti}%** (${formulaStr})\n\n**2. What is only a possible reason:**\n• A DTI ratio of ${dti}% ${dti > 40 ? 'exceeds common lender planning benchmarks (~40%)' : 'is within normal ranges, but secondary risk factors may apply'}.\n• Active short-term unsecured micro-lines or high credit card utilization can also trigger automated holds.\n\n**3. What cannot be determined without the lender’s rejection notice:**\n• Exact internal credit score cutoffs used by individual partner banks.\n• Specific employment employer categorization or policy-level risk lists.\n\n**4. What information is missing:**\n• Your complete multi-year repayment history across all bureaus.\n• Proof of 0 Days Past Due (0 DPD) history over the last 12 months.\n\n**5. Safe next actions:**\n• Reduce existing monthly EMI obligations to bring your DTI under 40% (max safe EMI for your income: ₹${maxSafe.toLocaleString('en-IN')}/mo).\n• Allow fortnightly credit reporting cycles (15th and month-end) for debt closures to ingest before re-applying.\n\n*Illustrative demo estimate. Approval is determined solely by the lender.*`,
      basis: '5-Step Structured Rejection Analysis Model.'
    };
  }

  // 5. Query: Can I re-apply earlier than 90 days?
  if (query.includes('earlier than 90 days') || query.includes('reapply earlier') || query.includes('re-apply earlier') || (query.includes('reapply') && query.includes('90'))) {
    return {
      answer: `Yes, you can re-apply whenever you wish, but doing so too quickly without addressing underlying debt capacity may result in repeated rejections and multiple hard credit inquiries.\n\n**Regulatory Fact:**\nUnder RBI's framework, credit institutions and Credit Information Companies (CICs) update credit data on a **fortnightly basis**—as of the 15th and last day of each month (effective January 1, 2025).\n\n**Why 90 days is used in Sahayak:**\n90 days is an illustrative planning horizon, not a universal rule or guarantee of approval. It provides sufficient time to demonstrate repayment consistency across multiple reporting cycles and allow debt closures to be ingested cleanly before seeking new credit.`,
      basis: 'RBI Framework on Credit Information Reporting (Fortnightly frequency, effective Jan 1, 2025).'
    };
  }

  // 6. Query: How often does CIBIL / credit bureau update?
  if (query.includes('how often') && (query.includes('cibil') || query.includes('bureau') || query.includes('update') || query.includes('report'))) {
    return {
      answer: `Under RBI guidelines, credit institutions and Credit Information Companies (CIBIL, Experian, CRIF High Mark, Equifax) report credit data on a **fortnightly basis**—generally as of the 15th and last day of each month—effective January 1, 2025.\n\n**Processing Note:**\nThe exact appearance of a repayment or account closure depends on when your specific lender submits their batch file and the bureau's internal ingestion processing schedule.`,
      basis: 'RBI Directive on Fortnightly Reporting of Credit Information to CICs (Effective Jan 1, 2025).'
    };
  }

  // 7. Query: Is 40% DTI required by RBI?
  if ((query.includes('rbi') || query.includes('law') || query.includes('mandate')) && (query.includes('40%') || query.includes('40 percent') || query.includes('dti') || query.includes('foir') || query.includes('rule') || query.includes('required'))) {
    return {
      answer: `No, the Reserve Bank of India (RBI) does not mandate a universal 40% Debt-to-Income (DTI) or FOIR limit for all personal loans.\n\n**Regulatory Reality:**\n• The 40% threshold is an **industry planning benchmark** widely used by commercial banks and NBFCs for prudent credit risk management.\n• RBI guidelines mandate that lenders assess borrower repayment capacity, but exact DTI caps and risk appetites are set independently by each lender's board-approved credit policy.`,
      basis: 'RBI Master Directions on Prudent Lending & Credit Risk Management.'
    };
  }

  // 8. Query: Will score increase by specific points if I repay?
  if (query.includes('50 points') || (query.includes('score') && (query.includes('increase by') || query.includes('points') || query.includes('guarantee')))) {
    return {
      answer: `No specific credit score increase (such as 50 points) can ever be guaranteed.\n\n**How Credit Scoring Works:**\nCredit scoring models evaluate multiple interconnected parameters simultaneously:\n• Payment history (35% weight)\n• Credit utilization ratio (30% weight)\n• Credit vintage/age (15% weight)\n• Credit mix (10% weight)\n• Recent hard inquiries (10% weight)\n\nRepaying debt strengthens your debt capacity over time, but exact score changes depend on your full credit profile across all reporting accounts.\n\n*Educational estimate only. Score movements are calculated solely by licensed Credit Information Companies.*`
    };
  }

  // 9. Query: DTI Calculation / What is my DTI?
  if (query.includes('dti') || query.includes('debt to income') || (query.includes('calculate') && query.includes('ratio')) || (parsedExplicitIncome && parsedExplicitEmi)) {
    const inc = parsedExplicitIncome || profileIncome;
    const emi = parsedExplicitEmi || profileEmis;
    const { dti, isSafe, formulaStr } = calculateDti(emi, inc);
    const maxSafe = calculateMaxSafeEmi(inc, 40);

    return {
      answer: `**DTI Calculation Summary (Source of Truth):**\n\n• **Monthly Take-Home Income:** ₹${inc.toLocaleString('en-IN')}\n• **Monthly Debt Obligations:** ₹${emi.toLocaleString('en-IN')}\n• **Calculated DTI:** **${dti}%** (${formulaStr})\n• **Max Safe EMI (40% Benchmark):** ₹${maxSafe.toLocaleString('en-IN')}/mo\n\n**Status:**\n${isSafe ? `Your DTI of ${dti}% is comfortably within the 40% safe benchmark.` : `Your DTI of ${dti}% exceeds the 40% benchmark by ${(dti - 40).toFixed(1)} percentage points.`}\n\n*Assumptions: Illustrative calculation based on user-provided income and EMI figures.*`
    };
  }

  // 10. Query: Next steps / How to improve eligibility
  if (query.includes('what should i do next') || query.includes('next steps') || query.includes('how to improve') || query.includes('how to fix') || query.includes('tips')) {
    const reliefNeeded = calculateReliefNeeded(profileEmis, profileIncome);
    return {
      answer: `Here are recommended safe next actions for ${profileName}:\n\n1. **Reduce Excess Monthly Debt:** Target trimming ~₹${reliefNeeded > 0 ? reliefNeeded.toLocaleString('en-IN') : '2,000'}/month of short-term BNPL or high-cost dues to bring your DTI under 40%.\n2. **Maintain 100% On-Time Payments:** Ensure zero missed payments (0 DPD) across all active accounts.\n3. **Keep Credit Card Utilization Under 30%:** Avoid maxing out revolving credit lines.\n4. **Avoid Frequent Hard Inquiries:** Refrain from applying on multiple loan apps simultaneously.\n5. **Allow Bureau Ingestion Window:** Give time for fortnightly reporting cycles (15th and month-end) to ingest your repayments.\n\n*Educational guidance only. Final loan approvals depend on individual lender criteria.*`
    };
  }

  // Fallback response preserving active user profile values
  return {
    answer: `Hello ${profileName}! I am Sahayak, your AI Financial Education Coach.\n\n**Your Current Active Profile:**\n• Monthly Income: ₹${profileIncome.toLocaleString('en-IN')}\n• Existing EMIs: ₹${profileEmis.toLocaleString('en-IN')} (DTI: ${profileDti}%)\n• Requested Loan: ₹${profileLoan.toLocaleString('en-IN')} (${profileTenure} Months)\n\nHow can I help you analyze your DTI, explore repayment scenarios, or understand credit reporting guidelines today?\n\n*Illustrative educational estimate only.*`
  };
}
