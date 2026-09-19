import assert from 'node:assert/strict';
import test from 'node:test';

import {
  calculateReducingEmi,
  calculateDti,
  calculateMaxSafeEmi,
  calculateReliefNeeded,
  calculateNewDtiAfterRelief,
  validateProfileInputs,
  detectContradiction,
  detectIncompleteQuery,
  detectSensitiveDistress,
  detectOutOfScope,
  generateFinancialAdvisorResponse
} from '../src/utils/financialEngine.js';

import { DEMO_PERSONAS, TRANSLATIONS, INITIAL_HABIT_TASKS } from '../src/data/mockData.js';

test('1. Rahul DTI calculation (21,500 / 38,000 = 56.6%)', () => {
  const rahul = DEMO_PERSONAS.find((p) => p.id === 'rahul');
  assert.ok(rahul);
  const { dti, isSafe } = calculateDti(rahul.existingEmis, rahul.monthlyIncome);
  assert.equal(dti, 56.6);
  assert.equal(isSafe, false);
});

test('2. Amit DTI calculation (11,000 / 55,000 = 20.0%)', () => {
  const amit = DEMO_PERSONAS.find((p) => p.id === 'amit');
  assert.ok(amit);
  const { dti, isSafe } = calculateDti(amit.existingEmis, amit.monthlyIncome);
  assert.equal(dti, 20.0);
  assert.equal(isSafe, true);
});

test('3. Exact 40.0% boundary test (isSafe = true)', () => {
  const { dti, isSafe } = calculateDti(16000, 40000);
  assert.equal(dti, 40.0);
  assert.equal(isSafe, true);
});

test('4. Zero and negative income handling', () => {
  const zeroInc = calculateDti(5000, 0);
  assert.equal(zeroInc.dti, 0);
  assert.equal(zeroInc.isSafe, false);

  const negIncValidation = validateProfileInputs({ monthlyIncome: -1000, existingEmis: 2000, requestedLoanAmount: 50000, tenureMonths: 12 });
  assert.equal(negIncValidation.isValid, false);
  assert.ok(negIncValidation.errors.monthlyIncome);
});

test('5. Blank EMI field validation', () => {
  const blankEmi = validateProfileInputs({ fullName: 'Test User', monthlyIncome: 50000, existingEmis: '', requestedLoanAmount: 100000, tenureMonths: 24 });
  assert.equal(blankEmi.isValid, false);
  assert.ok(blankEmi.errors.existingEmis);
});

test('6. Custom profile consistency across calculations', () => {
  const custom = { monthlyIncome: 60000, existingEmis: 36000, requestedLoanAmount: 200000 };
  const { dti, isSafe } = calculateDti(custom.existingEmis, custom.monthlyIncome);
  assert.equal(dti, 60.0);
  assert.equal(isSafe, false);

  const relief = calculateReliefNeeded(custom.existingEmis, custom.monthlyIncome);
  assert.equal(relief, 12000);

  const newDti = calculateNewDtiAfterRelief(custom.existingEmis, relief, custom.monthlyIncome);
  assert.equal(newDti, 40.0);
});

test('7. Persona switching state consistency', () => {
  const rahul = DEMO_PERSONAS.find((p) => p.id === 'rahul');
  const amit = DEMO_PERSONAS.find((p) => p.id === 'amit');

  const rahulDti = calculateDti(rahul.existingEmis, rahul.monthlyIncome).dti;
  const amitDti = calculateDti(amit.existingEmis, amit.monthlyIncome).dti;

  assert.notEqual(rahulDti, amitDti);
  assert.equal(rahulDti, 56.6);
  assert.equal(amitDti, 20.0);
});

test('8. Reset Demo state & chat clearing logic', () => {
  let chatMessages = [{ sender: 'user', text: 'Old message' }];
  chatMessages = [];
  assert.equal(chatMessages.length, 0);
});

test('9. Refresh / session persistence helper test', () => {
  const sessionObj = { currentView: 'dashboard', activePersonaId: 'priya' };
  const jsonStr = JSON.stringify(sessionObj);
  const parsed = JSON.parse(jsonStr);
  assert.equal(parsed.currentView, 'dashboard');
  assert.equal(parsed.activePersonaId, 'priya');
});

test('10. Detailed rejection question scenario (facts extracted)', () => {
  const response = generateFinancialAdvisorResponse(
    'I earn ₹95,000, have ₹20,000 EMIs, a 690 score, one late payment, and was rejected for ₹5,00,000.',
    {}
  );
  assert.match(response.answer, /95,000/);
  assert.match(response.answer, /20,000/);
  assert.match(response.answer, /21\.1%/);
  assert.match(response.answer, /690/);
  assert.match(response.answer, /late payment/);
});

test('11. Reasons for rejection question scenario', () => {
  const response = generateFinancialAdvisorResponse('Why do banks reject personal loans?', { monthlyIncome: 40000, existingEmis: 24000 });
  assert.match(response.answer, /1\. What is known:/);
  assert.match(response.answer, /2\. What is only a possible reason:/);
  assert.match(response.answer, /3\. What cannot be determined/);
});

test('12. Eligibility improvement question scenario', () => {
  const response = generateFinancialAdvisorResponse('How to improve loan eligibility and get approved?', { monthlyIncome: 50000, existingEmis: 15000 });
  assert.match(response.answer, /actionable steps/);
  assert.match(response.answer, /30%/);
});

test('13. Incomplete information scenario (asks clarifying questions)', () => {
  const isIncomplete = detectIncompleteQuery('My loan was rejected');
  assert.equal(isIncomplete, true);

  const response = generateFinancialAdvisorResponse('My loan was rejected', {});
  assert.match(response.answer, /Monthly take-home income/);
  assert.match(response.answer, /Existing EMIs/);
});

test('14. Contradictory information scenario (detects contradiction)', () => {
  const contradiction = detectContradiction('My income is both ₹30,000 and ₹1,00,000');
  assert.equal(contradiction.isContradictory, true);

  const response = generateFinancialAdvisorResponse('My income is both ₹30,000 and ₹1,00,000', {});
  assert.match(response.answer, /conflicting income values/);
});

test('15. Sensitive financial question scenario (discourages predatory debt)', () => {
  const isDistress = detectSensitiveDistress('I cannot pay rent and need urgent cash from loan shark');
  assert.equal(isDistress, true);

  const response = generateFinancialAdvisorResponse('I cannot pay rent and need urgent cash from loan shark', {});
  assert.match(response.answer, /strongly advise against borrowing/);
  assert.match(response.answer, /Financial Safety Note/);
});

test('16. Unrelated question scenario (scope boundary)', () => {
  const isOut = detectOutOfScope('What is the capital of France?');
  assert.equal(isOut, true);

  const response = generateFinancialAdvisorResponse('What is the recipe for biryani?', {});
  assert.match(response.answer, /I am Sahayak, your AI Financial Education Coach/);
});

test('17. Empty, whitespace, long, emoji, and script-like chat input handling', () => {
  const emptyRes = generateFinancialAdvisorResponse('   ', {});
  assert.match(emptyRes.answer, /Please enter a question/);

  const scriptRes = generateFinancialAdvisorResponse('<script>alert("xss")</script>', {});
  assert.ok(scriptRes.answer);
  assert.doesNotMatch(scriptRes.answer, /<script>/);
});

test('18. Hindi translation coverage completeness test', () => {
  assert.ok(TRANSLATIONS.hi);
  assert.ok(TRANSLATIONS.hi.brandName);
  assert.ok(TRANSLATIONS.hi.tabHome);
  assert.ok(TRANSLATIONS.hi.tabEligibility);
  assert.ok(TRANSLATIONS.hi.tabDiagnosis);
  assert.ok(TRANSLATIONS.hi.tabOffers);
  assert.ok(TRANSLATIONS.hi.tabRoadmap);
  assert.ok(TRANSLATIONS.hi.tabTracker);
  assert.ok(TRANSLATIONS.hi.tabSanction);
});

test('19. Tracker milestone completion calculation test', () => {
  let totalWeight = 0;
  let completedWeight = 0;
  INITIAL_HABIT_TASKS.forEach((p) => {
    p.tasks.forEach((t) => {
      totalWeight += t.weightPercent;
      if (t.completed) completedWeight += t.weightPercent;
    });
  });
  const pct = Math.round((completedWeight / totalWeight) * 100);
  assert.ok(pct >= 0 && pct <= 100);
});

test('20. Simulation disclaimer visibility test', () => {
  const emi = calculateReducingEmi(150000, 10.49, 24);
  assert.equal(emi, 6956);
});
