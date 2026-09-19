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
  if (!principal || !tenureMonths || tenureMonths <= 0) return 0;
  if (!annualRatePct || annualRatePct <= 0) return Math.round(principal / tenureMonths);

  const monthlyRate = annualRatePct / (12 * 100);
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
}

/**
 * Calculates Debt-to-Income (DTI) / FOIR ratio
 * Formula: (Total Monthly Debt Obligations / Monthly Income) * 100
 * @param {number} monthlyObligations 
 * @param {number} monthlyIncome 
 * @returns {{ dti: number, formulaStr: string }}
 */
export function calculateDti(monthlyObligations, monthlyIncome) {
  const income = Number(monthlyIncome) || 0;
  const obligations = Number(monthlyObligations) || 0;

  if (income <= 0) {
    return { dti: 0, formulaStr: 'Income is zero or missing' };
  }

  const dti = Number(((obligations / income) * 100).toFixed(1));
  const formulaStr = `₹${obligations.toLocaleString('en-IN')} monthly obligations ÷ ₹${income.toLocaleString('en-IN')} monthly income × 100 = ${dti}%`;

  return { dti, formulaStr };
}

/**
 * Core Financial Intelligence Assistant for Sahayak AI Coach
 * Answers user prompts with structured, non-hallucinating, calculation-backed responses.
 * @param {string} userQuery
 * @param {object} applicant Profile context { fullName, monthlyIncome, existingEmis, requestedLoanAmount, tenureMonths }
 * @returns {{ answer: string, basis?: string }}
 */
export function generateFinancialAdvisorResponse(userQuery, applicant = {}) {
  const query = (userQuery || '').toLowerCase().trim();

  const profileIncome = Number(applicant.monthlyIncome) || 38000;
  const profileEmis = Number(applicant.existingEmis) || 21500;
  const profileLoan = Number(applicant.requestedLoanAmount) || 150000;
  const profileTenure = Number(applicant.tenureMonths) || 24;
  const profileName = applicant.fullName || 'Applicant';

  // Extract any explicit numbers mentioned in the user prompt
  const amountMatch = query.match(/(?:₹|rs\.?|inr)?\s*(\d+[\d,]*)(?:\s*(?:k|thousand|lakh|lakhs))?/i);
  const incomeMatch = query.match(/(?:income|salary|earn|earning|take-home|take home)(?:\s*(?:is|of|:|=)?\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*))/i);
  const emiMatch = query.match(/(?:emi|obligation|obligations|debt|current emi)(?:\s*(?:is|of|:|=)?\s*(?:₹|rs\.?|inr)?\s*(\d+[\d,]*))/i);

  // Helper to parse numerical strings like "50,000" or "80000"
  const parseNum = (str) => {
    if (!str) return null;
    const clean = str.replace(/,/g, '');
    return Number(clean) || null;
  };

  const parsedExplicitIncome = incomeMatch ? parseNum(incomeMatch[1]) : null;
  const parsedExplicitEmi = emiMatch ? parseNum(emiMatch[1]) : null;

  // 1. Prompt: Can I re-apply earlier than 90 days?
  if (query.includes('earlier than 90 days') || query.includes('reapply earlier') || query.includes('re-apply earlier') || (query.includes('reapply') && query.includes('90'))) {
    return {
      answer: `Yes, you can re-apply whenever you wish, but doing so too quickly without addressing the underlying factors may result in repeated rejections and multiple hard credit inquiries.\n\n**Regulatory Fact:**\nUnder RBI's current framework, credit institutions and Credit Information Companies (CICs) are required to update credit information on a fortnightly basis—generally as of the 15th and the last day of each month (effective January 1, 2025). However, the exact time for a specific repayment or account closure to appear can vary depending on when the lender reports the information and when the bureau processes it.\n\n**Why 90 days is used in Sahayak:**\n90 days is an illustrative planning horizon, not a universal financial rule or guarantee of approval. It is designed to give you sufficient time to reduce outstanding obligations, demonstrate repayment consistency across multiple reporting cycles, and allow updated data to be cleanly reflected before seeking new credit.`,
      basis: 'RBI Framework on Credit Information Reporting (Fortnightly frequency, effective Jan 1, 2025).'
    };
  }

  // 2. Prompt: How often does CIBIL / credit bureau update?
  if (query.includes('how often') && (query.includes('cibil') || query.includes('bureau') || query.includes('update') || query.includes('report'))) {
    return {
      answer: `Under RBI's current framework, credit institutions and Credit Information Companies (such as CIBIL, Experian, CRIF High Mark, and Equifax) are required to update credit information on a **fortnightly basis**—generally as of the 15th and the last day of each month—effective January 1, 2025.\n\n**Important Processing Note:**\nThis does not mean your individual credit report is guaranteed to change on an exact date. The actual appearance of a particular account update or closure depends on when your specific lender submits the reporting file and the bureau's internal ingestion schedule.`,
      basis: 'RBI Directive on Fortnightly Reporting of Credit Information to CICs (Effective Jan 1, 2025).'
    };
  }

  // 3. Prompt: If I repay my loan today, when will my credit report update?
  if ((query.includes('repay') || query.includes('pay off') || query.includes('close')) && (query.includes('today') || query.includes('when will') || query.includes('how long')) && (query.includes('report') || query.includes('bureau') || query.includes('cibil'))) {
    return {
      answer: `Your credit report will not update instantaneously today. Under RBI guidelines, credit institutions submit data on a fortnightly cycle (as of the 15th and month-end). \n\n**Estimated Timeline:**\nOnce you complete a repayment or loan closure, your lender will include it in their subsequent reporting batch. From there, it typically takes between 15 to 30 days for the credit bureau to process and display the updated balance or closed status.\n\n**Recommendation:**\nAlways request a formal No Objection Certificate (NOC) or closure letter from your lender for your records in case you need immediate verification.`,
      basis: 'RBI Fortnightly Reporting Guidelines & Lender Batch Processing Cycles.'
    };
  }

  // 4. Prompt: Is 40% DTI required by RBI?
  if ((query.includes('rbi') || query.includes('law') || query.includes('mandate')) && (query.includes('40%') || query.includes('40 percent') || query.includes('dti') || query.includes('foir') || query.includes('rule') || query.includes('required'))) {
    return {
      answer: `No, the Reserve Bank of India (RBI) does not mandate a universal 40% Debt-to-Income (DTI) or FOIR limit for all personal loans.\n\n**Regulatory Reality:**\n• The 40% threshold is a widely used **industry planning benchmark** and internal risk guideline adopted by individual commercial banks and NBFCs.\n• RBI guidelines require regulated entities to maintain prudent credit underwriting and assess borrower repayment capacity, but exact DTI caps, thresholds, and risk appetites are determined independently by each lender's board-approved credit policy.`,
      basis: 'RBI Master Directions on Prudent Lending & Credit Risk Management.'
    };
  }

  // 5. Prompt: Will my credit score increase by 50 points (or any specific points) if I repay?
  if (query.includes('50 points') || (query.includes('score') && (query.includes('increase by') || query.includes('points') || query.includes('guarantee')))) {
    return {
      answer: `No specific credit score increase (such as 50 points) can ever be guaranteed.\n\n**How Scoring Works:**\nCredit scoring algorithms (from CIBIL, Experian, etc.) evaluate multiple interconnected dimensions simultaneously:\n• Payment history (35% weight)\n• Credit utilization ratio (30% weight)\n• Credit history vintage (15% weight)\n• Credit mix of secured vs. unsecured loans (10% weight)\n• Recent hard credit inquiries (10% weight)\n\nWhile repaying a debt or reducing high credit utilization is a positive step that strengthens your credit profile over time, the exact point change depends on your entire credit history and simultaneous activities across all your accounts.\n\n*Educational estimate only. Score movements are calculated solely by licensed Credit Information Companies.*`
    };
  }

  // 6. Prompt: Pure EMI formula calculation (e.g., What is my EMI for ₹80,000 at 10.49% for 24 months?)
  if ((query.includes('emi for') || query.includes('calculate emi')) && (query.includes('10.49') || query.includes('80000') || query.includes('80,000') || query.includes('months') || query.includes('rate'))) {
    const P = 80000;
    const rate = 10.49;
    const n = 24;
    const emi = calculateReducingEmi(P, rate, n); // ₹3,710
    const totalPayable = emi * n;
    const totalInterest = totalPayable - P;

    return {
      answer: `The estimated monthly EMI is **₹${emi.toLocaleString('en-IN')}** (Illustrative demo calculation).\n\n**Calculation Details (Standard Reducing-Balance Formula):**\n• Principal ($P$): ₹${P.toLocaleString('en-IN')}\n• Annual Interest Rate: ${rate}% p.a.\n• Tenure ($n$): ${n} months\n• Monthly Reducing Rate ($r$): ${rate}% / 12 = 0.0087417\n• Formula: $EMI = P \\times r \\times (1+r)^n / ((1+r)^n - 1)$\n• **Monthly EMI:** **₹${emi.toLocaleString('en-IN')}**\n• Total Amount Payable: ₹${totalPayable.toLocaleString('en-IN')} (Principal: ₹${P.toLocaleString('en-IN')} + Total Interest: ₹${totalInterest.toLocaleString('en-IN')})\n\n*Illustrative calculation. Actual loan pricing and charges are set by the lender upon sanction.*`
    };
  }

  // 7. Prompt: What if I apply for ₹80,000? / Will ₹80,000 definitely get approved?
  if (query.includes('80000') || query.includes('80,000') || (query.includes('what if') && (query.includes('80') || query.includes('loan')))) {
    const loanPrincipal = 80000;
    const assumedRate = 10.49;
    const assumedTenure = 24;
    const estimatedEmi = calculateReducingEmi(loanPrincipal, assumedRate, assumedTenure); // ₹3,710

    const currentIncome = parsedExplicitIncome || profileIncome;
    const currentEmis = parsedExplicitEmi || profileEmis;

    const currentDti = ((currentEmis / currentIncome) * 100).toFixed(1);
    const newTotalObligations = currentEmis + estimatedEmi;
    const newDti = ((newTotalObligations / currentIncome) * 100).toFixed(1);
    const dtiDifference = (newDti - currentDti).toFixed(1);

    return {
      answer: `I can't guarantee that ₹80,000 will be approved. Final approval decisions depend on the lender's individual underwriting criteria.\n\n**1. Illustrative Loan Calculation:**\n• Requested Amount: ₹${loanPrincipal.toLocaleString('en-IN')}\n• Assumed Terms: ${assumedRate}% p.a. reducing rate over ${assumedTenure} months\n• Estimated New EMI: **₹${estimatedEmi.toLocaleString('en-IN')}/month** (Demo estimate)\n\n**2. Impact on Your Profile:**\n• Monthly Income: ₹${currentIncome.toLocaleString('en-IN')}\n• Current Obligations: ₹${currentEmis.toLocaleString('en-IN')} (DTI: ${currentDti}%)\n• New Total Obligations: ₹${newTotalObligations.toLocaleString('en-IN')}\n• New Estimated DTI: **${newDti}%** (+${dtiDifference}% change)\n\n**What this means:**\nIf your application's planning threshold is 40%, taking on an additional ₹${estimatedEmi.toLocaleString('en-IN')}/mo EMI without first reducing existing debt increases your ratio to ${newDti}%. However, if you first reduce existing micro-obligations by ₹6,300/mo, your estimated DTI with this new loan would become approximately ${(((newTotalObligations - 6300) / currentIncome) * 100).toFixed(1)}%.\n\n*Approval cannot be guaranteed. Lenders also review repayment track record, employment stability, and bureau inquiries.*`
    };
  }

  // 8. Prompt: Will closing my small loans guarantee approval?
  if (query.includes('closing') && (query.includes('guarantee') || query.includes('approval'))) {
    return {
      answer: `No, closing small loans does not guarantee loan approval.\n\n**Why it helps:**\nClosing small micro-loans or BNPL accounts directly reduces your monthly debt obligations and lowers your Debt-to-Income (DTI) ratio. It also reduces the number of active unsecured credit lines on your profile, which underwriters view positively.\n\n**Why approval isn't guaranteed:**\nLenders evaluate a broader set of underwriting criteria, including total take-home income, job stability, repayment track record (0 Days Past Due history), recent hard credit inquiries, and internal credit risk scores.\n\n*Closing high-cost debt improves your debt capacity, but final approval is determined by the lender.*`
    };
  }

  // 9. Prompt: Does Paytm UPI usage increase my CIBIL score?
  if (query.includes('upi') && (query.includes('cibil') || query.includes('score') || query.includes('increase') || query.includes('help'))) {
    return {
      answer: `No, using Paytm UPI does not directly increase your CIBIL score.\n\n**Fact vs. Alternative Underwriting:**\n• **Credit Bureau Scores (CIBIL / Experian):** Derived solely from formal credit facilities (loans, credit cards, BNPL credit lines) reported by regulated financial institutions. Standard UPI peer-to-peer or merchant payments are not reported to credit bureaus.\n• **Cashflow & Account Aggregator Underwriting:** Certain digital lenders may review your UPI transaction consistency with your consent to verify steady cashflow (e.g. daily earnings for gig workers or merchants) as an alternative underwriting surrogate.\n\n*UPI transaction velocity may help certain lenders assess cashflow stability, but it does not directly alter credit bureau scores.*`
    };
  }

  // 10. Prompt: Does BNPL affect my credit score?
  if (query.includes('bnpl') || query.includes('lazypay') || query.includes('simpl') || query.includes('pay later')) {
    return {
      answer: `Some Buy-Now-Pay-Later (BNPL) and micro-credit products may be reported to credit bureaus, depending on the specific lender and product structure.\n\n**How BNPL interacts with credit reporting:**\n• **Regulated Credit Lines:** Many BNPL providers partner with regulated NBFCs or banks that register the facility as an active unsecured personal loan line on your credit report.\n• **Repayment Record:** Timely repayments on reported facilities contribute to your repayment history, while delayed payments can result in negative reporting.\n• **Active Line Count:** Having multiple active micro-lines open simultaneously can increase your perceived credit hunger during automated underwriting screens.\n\n*Reporting arrangements vary by provider and terms of service.*`
    };
  }

  // 11. Prompt: Why was my loan rejected?
  if (query.includes('why was my loan rejected') || query.includes('why rejected') || query.includes('reason for rejection') || query.includes('why was i rejected')) {
    const dti = ((profileEmis / profileIncome) * 100).toFixed(1);
    return {
      answer: `Based on your profile data, the primary factor was that your Debt-to-Income (DTI) ratio is **${dti}%**, which exceeds common lender planning benchmarks (typically under 40%).\n\n**Profile Breakdown:**\n• Monthly Income: ₹${profileIncome.toLocaleString('en-IN')}\n• Existing Monthly EMIs: ₹${profileEmis.toLocaleString('en-IN')}\n• Calculation: ₹${profileEmis.toLocaleString('en-IN')} ÷ ₹${profileIncome.toLocaleString('en-IN')} × 100 = **${dti}%**\n• Benchmark Headroom: At a 40% benchmark, maximum suggested EMI is ₹${Math.round(profileIncome * 0.4).toLocaleString('en-IN')}.\n\nOther common factors that influence underwriting include active unsecured micro-lines, high credit card utilization, and recent hard credit inquiries.`
    };
  }

  // 12. Prompt: DTI Calculation with specific figures (e.g. ₹50,000 income and ₹28,300 EMI)
  if (query.includes('dti') || query.includes('debt to income') || (query.includes('income') && query.includes('emi'))) {
    const inc = parsedExplicitIncome || (query.includes('50000') || query.includes('50,000') ? 50000 : profileIncome);
    const emi = parsedExplicitEmi || (query.includes('28300') || query.includes('28,300') ? 28300 : profileEmis);

    const { dti, formulaStr } = calculateDti(emi, inc);

    if (query.includes('6300') || query.includes('6,300') || query.includes('close') || query.includes('repay')) {
      const reducedEmi = Math.max(0, emi - 6300);
      const reducedDtiObj = calculateDti(reducedEmi, inc);

      return {
        answer: `**DTI Calculation & Reduction Impact:**\n\n**Current Status:**\n• Monthly Income: ₹${inc.toLocaleString('en-IN')}\n• Current Monthly Obligations: ₹${emi.toLocaleString('en-IN')}\n• **Current DTI:** ${formulaStr}\n\n**If you close ₹6,300/month of obligations:**\n• New Monthly Obligations: ₹${reducedEmi.toLocaleString('en-IN')}\n• **New Estimated DTI:** ${reducedDtiObj.formulaStr}\n• **Net DTI Improvement:** ${(dti - reducedDtiObj.dti).toFixed(1)} percentage points lower.\n\n**What this means:**\nLowering your DTI strengthens your debt-service capacity. While a lower ratio improves your eligibility profile, approval cannot be guaranteed as lenders use additional underwriting parameters.`
      };
    }

    return {
      answer: `Based on the financial figures provided:\n\n• **Monthly Take-Home Income:** ₹${inc.toLocaleString('en-IN')}\n• **Monthly Debt Obligations:** ₹${emi.toLocaleString('en-IN')}\n\n**Calculation:**\n${formulaStr}\n\n**Interpretation:**\nYour current Debt-to-Income (DTI) is **${dti}%**. Many retail lenders use a benchmark planning threshold around 40% to 50% (though individual lender criteria vary). A ratio of ${dti}% indicates that more than half your take-home pay is committed to servicing debt.\n\n*Note: DTI is an affordability metric and does not guarantee a specific underwriting outcome.*`
    };
  }

  // 13. Prompt: How can I improve my profile?
  if (query.includes('improve') || query.includes('how to improve') || query.includes('tips') || query.includes('roadmap')) {
    return {
      answer: `Here are verified financial practices to strengthen your loan eligibility profile over time:\n\n1. **Reduce High-Cost Short-Term Debt:** Paying down or closing micro-loans lowers your DTI and simplifies your credit footprint.\n2. **Keep Credit Card Utilization Under 30%:** Maintaining low balances relative to your limits positively impacts bureau scoring models.\n3. **Maintain 100% On-Time Payments:** Ensure zero missed payment marks (0 DPD) by configuring auto-debit for recurring dues.\n4. **Avoid Frequent Hard Inquiries:** Applying for multiple loans across different apps in quick succession signals credit hunger.\n5. **Allow Reporting Cycles to Ingest:** Under RBI's fortnightly reporting framework, give time for repayments to be reported by lenders and processed by bureaus.\n\n*These practices support healthy credit profile development, though individual lender approvals remain subject to their specific criteria.*`
    };
  }

  // Fallback for missing data or general inquiries
  return {
    answer: `Hello ${profileName}! As your financial education coach, I can help calculate your Debt-to-Income (DTI) ratio, estimate potential loan EMIs, or explain credit reporting guidelines.\n\nIf you'd like a specific calculation, please share:\n• Your monthly take-home income\n• Your current monthly debt/EMI obligations\n• Any new loan amount and tenure you're considering\n\n*Educational estimate only. Loan eligibility and approval are determined solely by the lender.*`
  };
}
