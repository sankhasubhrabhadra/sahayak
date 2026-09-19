// Financial Calculation and Regulatory NLP Engine for Sahayak
// Strictly adheres to RBI Credit Information Reporting Framework & Prudent Underwriting Principles

/**
 * Calculates standard reducing-balance monthly EMI
 * Formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
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
 * Rule: Exactly 40.0% is AT the benchmark and is SAFE (isSafe = dti <= 40).
 */
export function calculateDti(monthlyObligations, monthlyIncome) {
  const income = Math.max(0, Number(monthlyIncome) || 0);
  const obligations = Math.max(0, Number(monthlyObligations) || 0);

  if (income <= 0) {
    return { dti: 0, isSafe: false, formulaStr: 'Income is zero or missing' };
  }

  const dti = Number(((obligations / income) * 100).toFixed(1));
  const isSafe = dti <= 40.0;
  const formulaStr = `₹${obligations.toLocaleString('en-IN')} monthly obligations ÷ ₹${income.toLocaleString('en-IN')} monthly income × 100 = ${dti}%`;

  return { dti, isSafe, formulaStr };
}

/**
 * Calculates maximum suggested safe EMI (40% benchmark)
 */
export function calculateMaxSafeEmi(monthlyIncome, thresholdPct = 40) {
  const income = Math.max(0, Number(monthlyIncome) || 0);
  return Math.round(income * (thresholdPct / 100));
}

/**
 * Calculates relief needed to bring existing EMIs down to 40% DTI
 */
export function calculateReliefNeeded(existingEmis, monthlyIncome) {
  const emis = Math.max(0, Number(existingEmis) || 0);
  const maxSafe = calculateMaxSafeEmi(monthlyIncome, 40);
  return Math.max(0, emis - maxSafe);
}

/**
 * Calculates new DTI after a specific EMI reduction
 */
export function calculateNewDtiAfterRelief(existingEmis, reduction, monthlyIncome) {
  const income = Math.max(0, Number(monthlyIncome) || 0);
  if (income <= 0) return 0;
  const newEmis = Math.max(0, (Number(existingEmis) || 0) - (Number(reduction) || 0));
  return Number(((newEmis / income) * 100).toFixed(1));
}

/**
 * Validates applicant profile input values strictly
 */
export function validateProfileInputs(profile = {}) {
  const errors = {};

  const name = (profile.fullName || '').trim();
  if (!name) {
    errors.fullName = 'Full name is required.';
  } else if (name.length > 100) {
    errors.fullName = 'Full name must be under 100 characters.';
  }

  const rawIncome = profile.monthlyIncome;
  if (rawIncome === undefined || rawIncome === null || rawIncome === '') {
    errors.monthlyIncome = 'Monthly income is required.';
  } else {
    const income = Number(rawIncome);
    if (isNaN(income) || income <= 0) {
      errors.monthlyIncome = 'Monthly income must be a positive number greater than ₹0.';
    } else if (income > 10000000) {
      errors.monthlyIncome = 'Income exceeds maximum limit.';
    }
  }

  const rawEmis = profile.existingEmis;
  if (rawEmis === undefined || rawEmis === null || rawEmis === '') {
    errors.existingEmis = 'Existing EMIs is required. Enter 0 if you have no active EMIs.';
  } else {
    const emis = Number(rawEmis);
    if (isNaN(emis) || emis < 0) {
      errors.existingEmis = 'Existing EMIs cannot be negative.';
    } else if (Number(profile.monthlyIncome) > 0 && emis > Number(profile.monthlyIncome) * 2) {
      errors.existingEmis = 'Existing EMIs exceed realistic bounds relative to income.';
    }
  }

  const rawLoan = profile.requestedLoanAmount;
  if (rawLoan === undefined || rawLoan === null || rawLoan === '') {
    errors.requestedLoanAmount = 'Loan amount is required.';
  } else {
    const loan = Number(rawLoan);
    if (isNaN(loan) || loan <= 0) {
      errors.requestedLoanAmount = 'Loan amount must be greater than ₹0.';
    } else if (loan > 10000000) {
      errors.requestedLoanAmount = 'Requested loan amount exceeds maximum limit.';
    }
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
 * Detects contradictory numbers/claims in query
 */
export function detectContradiction(query = '') {
  const q = query.toLowerCase();

  // Pattern 1: Explicit "both X and Y" numbers
  const bothMatch = q.match(/both\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*)\s*and\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*)/i);
  if (bothMatch) {
    const val1 = Number(bothMatch[1].replace(/,/g, ''));
    const val2 = Number(bothMatch[2].replace(/,/g, ''));
    if (val1 !== val2) {
      return { isContradictory: true, type: 'income', val1, val2 };
    }
  }

  // Pattern 2: Multiple conflicting income numbers (e.g. "income is 30,000 and 1,00,000" or "earn 30000 and 100000")
  const incomeMatches = q.match(/(?:income|salary|earn|earning)\s*(?:is|of|:|=)?\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*)/g);
  if (incomeMatches && incomeMatches.length >= 2) {
    const vals = incomeMatches.map((s) => Number(s.replace(/[^\d]/g, ''))).filter((v) => v > 0);
    if (vals.length >= 2 && vals[0] !== vals[1]) {
      return { isContradictory: true, type: 'income', val1: vals[0], val2: vals[1] };
    }
  }

  // Pattern 3: Missed payment contradiction (e.g. "never missed a payment" + "missed 3 payments")
  if (
    (q.includes('never missed') || q.includes('no missed') || q.includes('always on time') || q.includes('zero dpd')) &&
    (q.includes('missed') || q.includes('late payment') || q.includes('defaulted'))
  ) {
    return { isContradictory: true, type: 'payment_history' };
  }

  return { isContradictory: false };
}

/**
 * Detects vague / incomplete loan queries where mandatory information is missing
 */
export function detectIncompleteQuery(query = '', context = {}) {
  const q = query.toLowerCase().trim();

  // If user provided numbers in query or active profile has income & EMI, not incomplete
  const hasNumbers = /\d+/.test(q);
  if (hasNumbers || (context.income > 0 && context.emi >= 0)) {
    return false;
  }

  const vagueTriggers = [
    'my loan was rejected', 'why was my loan rejected', 'will i get a loan',
    'can i get loan', 'loan rejected', 'got rejected'
  ];

  return vagueTriggers.some((t) => q === t || q === `${t}?` || q === `${t}.`);
}

/**
 * Detects sensitive financial distress or unsafe debt situations
 */
export function detectSensitiveDistress(query = '') {
  const q = query.toLowerCase();
  const distressKeywords = [
    'rent', 'eviction', 'evicted', 'loan shark', 'urgent cash', 'desperate',
    'cannot pay rent', 'cant pay rent', 'unaffordable', 'debt trap', 'suicide', 'hopeless',
    'high interest', 'payday loan', 'money lender', 'bounced', 'starving'
  ];
  return distressKeywords.some((kw) => q.includes(kw));
}

/**
 * Detects whether query is completely out of scope of financial coaching
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
 * Helper to parse numerical figures from user text prompt
 */
export function extractFactsFromQuery(query = '') {
  const q = query.toLowerCase();

  const parseNum = (str) => {
    if (!str) return null;
    const clean = str.replace(/,/g, '');
    let num = Number(clean);
    if (isNaN(num)) return null;
    if (str.includes('k') || str.includes('thousand')) num *= 1000;
    if (str.includes('lakh') || str.includes('lac')) num *= 100000;
    return num;
  };

  const incomeMatch = q.match(/(?:earn|earning|income|salary|take-home|take home)\s*(?:is|of|:|=)?\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*\s*(?:k|thousand|lakh|lakhs|lac)?)/i);
  
  const emiMatch = q.match(/(?:emi|emis|obligations|debt|current emi)\s*(?:is|of|:|=)?\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*\s*(?:k|thousand|lakh|lakhs|lac)?)/i) ||
                   q.match(/(?:have|pay|paying)\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*\s*(?:k|thousand|lakh|lakhs|lac)?)\s*(?:emi|emis|obligations|debt)?/i);

  const loanMatch = q.match(/(?:rejected for|loan of|loan amount|applying for|requesting|loan for|what if i take|what if i apply for|what if loan is)\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*\s*(?:k|thousand|lakh|lakhs|lac)?)/i);
  
  const scoreMatch = q.match(/(?:score|cibil)\s*(?:is|of|:|=)?\s*(\d{3})/i) ||
                     q.match(/(\d{3})\s*(?:score|cibil)/i);

  const tenureMatch = q.match(/(\d{1,2})\s*(?:months|mo|yrs|years)/i);

  const lateMatch = q.includes('late payment') || q.includes('missed payment') || q.includes('dpd');

  let tenureMonths = null;
  if (tenureMatch) {
    const rawVal = Number(tenureMatch[1]);
    if (q.includes('yr') || q.includes('year')) tenureMonths = rawVal * 12;
    else tenureMonths = rawVal;
  }

  return {
    income: incomeMatch ? parseNum(incomeMatch[1]) : null,
    emi: emiMatch ? parseNum(emiMatch[1]) : null,
    loan: loanMatch ? parseNum(loanMatch[1]) : null,
    score: scoreMatch ? Number(scoreMatch[1]) : null,
    tenure: tenureMonths,
    hasLatePayment: lateMatch
  };
}

/**
 * Core Financial Intelligence Assistant for Sahayak AI Coach with Context Retention
 */
export function generateFinancialAdvisorResponse(userQuery = '', applicant = {}, conversationContext = {}, lang = 'en') {
  const rawQuery = (userQuery || '').trim();

  if (!rawQuery) {
    return {
      answer: lang === 'hi'
        ? 'कृपया अपना प्रश्न दर्ज करें ताकि मैं आपकी लोन पात्रता और क्रेडिट रोडमैप में मदद कर सकूं।'
        : 'Please enter a question or prompt so I can assist you with your loan eligibility and credit roadmap.'
    };
  }

  const query = rawQuery.toLowerCase();

  // Contradiction Check
  const contradiction = detectContradiction(rawQuery);
  if (contradiction.isContradictory) {
    if (contradiction.type === 'income') {
      return {
        answer: `I see conflicting income values (₹${contradiction.val1.toLocaleString('en-IN')} vs ₹${contradiction.val2.toLocaleString('en-IN')}). Which value is correct, and is this your gross income or net monthly take-home pay? Please clarify so I can calculate your Debt-to-Income (DTI) ratio accurately.`,
        basis: 'Contradiction detector flagged conflicting income amounts.'
      };
    }
    return {
      answer: 'I see conflicting information in your prompt. Which value should I use, and what is your net monthly take-home pay?',
      basis: 'Contradiction detector flagged conflicting numbers or statements.'
    };
  }

  // Sensitive Financial Distress Check
  if (detectSensitiveDistress(rawQuery)) {
    return {
      answer: `**Financial Safety Note:** I understand that you may be facing an urgent or difficult financial situation, but I strongly advise against borrowing from unverified or high-interest lenders, as taking on high-interest BNPL or predatory loans can lead to severe debt traps.\n\n**Safer Immediate Options:**\n1. **Communicate directly with your landlord or creditor:** Explain your temporary hardship and request a deferred payment schedule.\n2. **Reach out to family or trusted support:** Seek temporary emergency support without incurring high interest rates.\n3. **Contact Regulated Financial Counselors:** Consult licensed financial advice counselors or call the National Consumer Helpline (1915) for guidance.\n\n*Regulatory Basis: RBI Guidelines on Digital Lending & Fair Recovery Practices. Helpline: 1915 (Department of Consumer Affairs).*`,
      basis: 'Financial Safety Protocol for Emergency Debt Distress (Ref: NCH 1915).'
    };
  }

  // Out-of-Scope Boundary Check
  if (detectOutOfScope(rawQuery)) {
    return {
      answer: 'I am Sahayak, your AI Financial Education Coach. I can only assist with personal loan eligibility, DTI calculations, debt recovery roadmaps, and credit reporting questions. How can I help with your financial journey today?',
      basis: 'Scope boundary enforcement.'
    };
  }

  // Extract facts from current prompt
  const extracted = extractFactsFromQuery(rawQuery);

  // Merge newly extracted facts with cumulative conversation context & active profile (Source of Truth)
  const income = extracted.income || conversationContext.income || Number(applicant.monthlyIncome) || 0;
  const emi = extracted.emi !== null ? extracted.emi : (conversationContext.emi !== undefined ? conversationContext.emi : Number(applicant.existingEmis) || 0);
  const loan = extracted.loan || conversationContext.loan || Number(applicant.requestedLoanAmount) || 150000;
  const tenure = extracted.tenure || conversationContext.tenure || Number(applicant.tenureMonths) || 24;
  const score = extracted.score || conversationContext.score || applicant.cibilScore || null;
  const profileName = (applicant.fullName || 'Applicant').trim();

  const profileIncome = income;
  const profileEmis = emi;
  const profileLoan = loan;
  const profileTenure = tenure;

  // Incomplete Check if missing both income and EMI and no context exists
  if (income <= 0 && emi <= 0 && detectIncompleteQuery(rawQuery, { income, emi })) {
    return {
      answer: `To provide an accurate underwriting analysis and diagnosis, I need a few key details about your profile. Could you please share:\n\n1. **Monthly take-home income** (e.g. ₹50,000)\n2. **Existing EMIs** / monthly debt obligations (e.g. ₹15,000)\n3. **Requested loan amount & preferred tenure** (e.g. ₹2,00,000 for 24 months)\n4. **Employment type** (Salaried, Self-Employed, or Gig Worker)\n5. **Credit score** (if known)\n6. **Lender's stated rejection reason** (if provided in your rejection notice)\n\nOnce you share these facts, I can calculate your Debt-to-Income (DTI) ratio and give you a customized recovery plan!`,
      basis: 'Incomplete information clarification protocol.'
    };
  }

  // Detailed scenario extraction prompt (takes precedence when multiple facts are extracted)
  if (extracted.income || extracted.emi || extracted.score || (extracted.loan && !query.includes('what if') && !query.includes('instead') && !query.includes('how about'))) {
    const { dti, isSafe, formulaStr } = calculateDti(emi, income);
    const maxSafe = calculateMaxSafeEmi(income, 40);

    let analysisNotes = [];
    if (!isSafe) {
      analysisNotes.push(`Your calculated DTI of **${dti}%** exceeds the standard 40% benchmark (max safe EMI for your income is ₹${maxSafe.toLocaleString('en-IN')}/mo).`);
    } else {
      analysisNotes.push(`Your calculated DTI of **${dti}%** is healthy (at or below 40%).`);
    }

    if (score && score < 720) {
      analysisNotes.push(`A credit score of **${score}** is below many retail bank thresholds (typically 720–750+).`);
    }

    if (extracted.hasLatePayment) {
      analysisNotes.push(`A **recent late payment record** introduces automated risk flags during credit scoring.`);
    }

    if (loan > income * 5) {
      analysisNotes.push(`Requested loan amount of ₹${loan.toLocaleString('en-IN')} is large relative to monthly income (₹${income.toLocaleString('en-IN')}).`);
    }

    return {
      answer: `Here is the analysis based strictly on the facts supplied in your message:\n\n**1. Extracted Facts & Financial Metrics:**\n• Monthly Take-Home Income: ₹${income.toLocaleString('en-IN')}\n• Current Monthly EMIs: ₹${emi.toLocaleString('en-IN')}\n• Calculated Debt-to-Income (DTI): **${dti}%** (${formulaStr})\n• Credit Score: ${score ? score : 'Not provided'}\n• Requested Loan Amount: ₹${loan.toLocaleString('en-IN')}\n\n**2. Analysis of Possible Rejection Reasons:**\n${analysisNotes.map((n) => `• ${n}`).join('\n')}\n• Note: Automated underwriting algorithms evaluate multiple criteria. Please verify the official rejection notice from your lender for their exact policy cutoff.\n\n**3. Recommended Next Steps:**\n${!isSafe ? `1. Reduce monthly EMI obligations by ₹${(emi - maxSafe).toLocaleString('en-IN')}/mo to reach safe DTI.\n` : ''}${extracted.hasLatePayment || (score && score < 720) ? `2. Maintain 100% on-time payments for 3 to 6 months to rebuild your score.\n` : ''}3. Consider applying for a lower loan amount or extending tenure to reduce monthly EMI burden.\n4. Allow fortnightly bureau reporting cycles (15th and month-end) to ingest updates before reapplying.\n\n*Regulatory Basis: RBI Guidelines on Credit Information Reporting (Jan 1, 2025). Educational estimate only.*`,
      basis: 'Detailed scenario extraction engine.',
      updatedContext: { income, emi, loan, tenure, score }
    };
  }

  // Follow-up prompt scenario e.g. "What if I take 1 lakh?" or "What if tenure is 36 months?"
  const isFollowUp = (query.includes('what if') || query.includes('instead') || query.includes('how about') || query.includes('change to') || extracted.loan || extracted.tenure);

  if (isFollowUp && income > 0) {
    const { dti: currentDti } = calculateDti(emi, income);
    const newEmiForRequestedLoan = calculateReducingEmi(loan, 10.49, tenure);
    const totalObligationsWithNewLoan = emi + newEmiForRequestedLoan;
    const { dti: newCombinedDti, isSafe: isNewSafe } = calculateDti(totalObligationsWithNewLoan, income);
    const maxSafeEmi = calculateMaxSafeEmi(income, 40);

    return {
      answer: `Here is the revised scenario for **₹${loan.toLocaleString('en-IN')}** over **${tenure} months**:\n\n**1. Revised Calculation Details:**\n• Monthly Take-Home Income: ₹${income.toLocaleString('en-IN')}\n• Current Existing EMIs: ₹${emi.toLocaleString('en-IN')} (Current DTI: ${currentDti}%)\n• New Loan EMI Estimate (@ 10.49% p.a.): **₹${newEmiForRequestedLoan.toLocaleString('en-IN')}/mo**\n• Total Projected Monthly EMIs: ₹${totalObligationsWithNewLoan.toLocaleString('en-IN')}\n• **Projected Combined DTI:** **${newCombinedDti}%** (${isNewSafe ? 'Safe, at or below 40% benchmark' : 'Exceeds 40% benchmark'})\n\n**2. Assessment:**\n${isNewSafe ? `Taking a loan of ₹${loan.toLocaleString('en-IN')} keeps your total monthly debt obligations at ${newCombinedDti}%, which is within the safe 40% benchmark (Max safe EMI capacity: ₹${maxSafeEmi.toLocaleString('en-IN')}/mo).` : `Adding this EMI increases your monthly commitments to ₹${totalObligationsWithNewLoan.toLocaleString('en-IN')} (${newCombinedDti}% DTI). Reducing existing debt by ₹${(totalObligationsWithNewLoan - maxSafeEmi).toLocaleString('en-IN')}/mo brings your DTI back to 40%.`}\n\n*Regulatory Source: RBI Master Directions on Credit Risk Management & Prudent FOIR Limits. Illustrative estimate only.*`,
      basis: 'Follow-up scenario analysis engine.',
      updatedContext: { income, emi, loan, tenure, score }
    };
  }

  const { dti: profileDti, isSafe: profileIsSafe } = calculateDti(profileEmis, profileIncome);
  const profileMaxSafe = calculateMaxSafeEmi(profileIncome, 40);

  // General Rejection Reasons Query
  if (query.includes('why was my loan rejected') || query.includes('why rejected') || query.includes('reason for rejection') || query.includes('why do banks reject')) {
    return {
      answer: `Here is the structured breakdown of loan rejection factors for your active profile (${profileName}):\n\n**1. What is known:**\n• Take-Home Income: ₹${profileIncome.toLocaleString('en-IN')}/mo\n• Existing Monthly EMIs: ₹${profileEmis.toLocaleString('en-IN')}/mo\n• Debt-to-Income (DTI) Ratio: **${profileDti}%** (${profileIsSafe ? 'At or below 40% benchmark' : 'Exceeds 40% benchmark'})\n\n**2. What is only a possible reason:**\n• High DTI ratio (exceeding common 40% threshold).\n• Multiple active short-term BNPL accounts or high credit card utilization (>30%).\n• Bureau inquiry frequency or recent late payment history.\n\n**3. What cannot be determined without lender notice:**\n• Lender's proprietary internal credit scoring cutoffs.\n• Employer categorization or specific policy risk lists.\n\n**4. What information is missing:**\n• Complete 24-month repayment track record.\n• Proof of 0 Days Past Due (0 DPD) history.\n\n**5. Safe next actions:**\n• ${profileIsSafe ? 'Your DTI is already healthy. Check your credit report for score errors.' : `Reduce monthly EMI outflow to bring DTI under 40% (target EMI: ₹${profileMaxSafe.toLocaleString('en-IN')}/mo).`}\n• Allow fortnightly credit reporting cycles (15th and month-end) for updates to process.\n\n*Regulatory Basis: RBI Master Directions on Prudent Lending. Illustrative demo estimate.*`,
      basis: '5-Step Structured Rejection Analysis Model.'
    };
  }

  // Eligibility Improvement Query
  if (query.includes('how to improve') || query.includes('how to fix') || query.includes('what to do next') || query.includes('how to get approved') || query.includes('next steps')) {
    const relief = calculateReliefNeeded(profileEmis, profileIncome);
    return {
      answer: `Here are prioritized actionable steps to strengthen your eligibility profile:\n\n1. **Reduce Excess Monthly Debt:** ${profileIsSafe ? 'Keep existing EMIs under control.' : `Trim ~₹${relief.toLocaleString('en-IN')}/month of high-cost BNPL or debt dues to lower your DTI to 40%.`}\n2. **Maintain 100% On-Time Payments:** Configure auto-debit via Paytm UPI to ensure zero missed payments (0 DPD).\n3. **Keep Credit Card Utilization Under 30%:** Maintain low balances relative to your card limit.\n4. **Avoid Frequent Hard Inquiries:** Refrain from applying across multiple apps simultaneously.\n5. **Allow Bureau Ingestion:** Under RBI fortnightly reporting guidelines (15th and month-end), allow time for debt closures to reflect.\n\n*Regulatory Basis: RBI Fortnightly Credit Reporting Directives (Effective Jan 1, 2025).*`,
      basis: 'Eligibility improvement protocol.'
    };
  }

  // Re-application timing
  if (query.includes('earlier than 90 days') || query.includes('reapply earlier') || (query.includes('reapply') && query.includes('90'))) {
    return {
      answer: `Yes, you can re-apply whenever you wish, but re-applying too quickly without lowering your DTI or addressing score factors can lead to repeated rejections.\n\n**Regulatory Fact:**\nUnder RBI guidelines effective Jan 1, 2025, credit institutions report to bureaus on a **fortnightly basis** (15th and month-end).\n\n**Why 90 days is used in Sahayak:**\n90 days is an illustrative planning horizon to demonstrate consistent repayment discipline across multiple reporting cycles before seeking new credit.`,
      basis: 'RBI Fortnightly Reporting Guidelines (Jan 1, 2025).'
    };
  }

  // UPI and Credit Score
  if (query.includes('upi') && (query.includes('cibil') || query.includes('score') || query.includes('increase'))) {
    return {
      answer: `No, standard Paytm UPI transactions do not directly increase your CIBIL score.\n\n**Explanation:**\n• CIBIL scores evaluate formal credit facilities (loans, cards, BNPL lines) reported by financial institutions.\n• However, with your consent, participating digital lenders may review your UPI cashflow velocity via Account Aggregator as an alternate proof of income stability.\n\n*Regulatory Ref: Credit Information Companies Act, 2005 & Account Aggregator Ecosystem Guidelines.*`,
      basis: 'Bureau Reporting vs Account Aggregator Cashflow Rules.'
    };
  }

  // BNPL and Credit Score
  if (query.includes('bnpl') || query.includes('lazypay') || query.includes('simpl') || query.includes('pay later')) {
    return {
      answer: `Yes, Buy-Now-Pay-Later (BNPL) products are reported to credit bureaus if structured as regulated credit lines by partner NBFCs.\n\n**Impact:**\n• On-time payments build credit history.\n• Multiple active micro-lines running simultaneously can increase your perceived credit risk during automated underwriting.\n\n*Closing micro-BNPL lines directly reduces your active debt lines and lowers monthly EMI obligations.*`,
      basis: 'BNPL Credit Reporting Guidelines.'
    };
  }

  // Fallback response using active profile name and figures
  return {
    answer: `Hello ${profileName}! I am Paytm Sahayak, your AI Financial Education Coach.\n\n**Active Profile Summary (${applicant.isCustom ? 'Custom User Data' : 'Demo Profile'}):**\n• Take-Home Income: ₹${profileIncome.toLocaleString('en-IN')}/mo\n• Existing EMIs: ₹${profileEmis.toLocaleString('en-IN')}/mo (DTI: ${profileDti}%)\n• Requested Loan: ₹${profileLoan.toLocaleString('en-IN')} (${profileTenure} Months)\n\nHow can I help you analyze your DTI, explore repayment scenarios, or clarify credit reporting guidelines today?\n\n*Educational estimate only.*`
  };
}
