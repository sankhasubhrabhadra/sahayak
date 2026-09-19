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
  detectSensitiveDistress,
  detectOutOfScope,
  generateFinancialAdvisorResponse
} from '../src/utils/financialEngine.js';

import { DEMO_PERSONAS, TRANSLATIONS } from '../src/data/mockData.js';

test('1. Rahul Persona DTI & Relief Math', () => {
  const rahul = DEMO_PERSONAS.find((p) => p.id === 'rahul');
  assert.ok(rahul, 'Rahul persona exists');

  const { dti, isSafe } = calculateDti(rahul.existingEmis, rahul.monthlyIncome);
  assert.equal(dti, 56.6);
  assert.equal(isSafe, false);

  const maxSafe = calculateMaxSafeEmi(rahul.monthlyIncome, 40);
  assert.equal(maxSafe, 15200);

  const relief = calculateReliefNeeded(rahul.existingEmis, rahul.monthlyIncome);
  assert.equal(relief, 6300);

  const newDti = calculateNewDtiAfterRelief(rahul.existingEmis, relief, rahul.monthlyIncome);
  assert.equal(newDti, 40.0);
});

test('2. Priya Persona DTI & Relief Math', () => {
  const priya = DEMO_PERSONAS.find((p) => p.id === 'priya');
  assert.ok(priya, 'Priya persona exists');

  const { dti, isSafe } = calculateDti(priya.existingEmis, priya.monthlyIncome);
  assert.equal(dti, 53.1);
  assert.equal(isSafe, false);

  const maxSafe = calculateMaxSafeEmi(priya.monthlyIncome, 40);
  assert.equal(maxSafe, 26000);

  const relief = calculateReliefNeeded(priya.existingEmis, priya.monthlyIncome);
  assert.equal(relief, 8500);
});

test('3. Amit Persona DTI Math (Passes <=40%)', () => {
  const amit = DEMO_PERSONAS.find((p) => p.id === 'amit');
  assert.ok(amit, 'Amit persona exists');

  const { dti, isSafe } = calculateDti(amit.existingEmis, amit.monthlyIncome);
  assert.equal(dti, 20.0);
  assert.equal(isSafe, true);
});

test('4. Custom Profile Consistency (50k Income, 30k EMI, 100k Loan)', () => {
  const customProfile = {
    fullName: 'Custom User',
    monthlyIncome: 50000,
    existingEmis: 30000,
    requestedLoanAmount: 100000,
    tenureMonths: 24
  };

  const { dti, isSafe } = calculateDti(customProfile.existingEmis, customProfile.monthlyIncome);
  assert.equal(dti, 60.0);
  assert.equal(isSafe, false);

  const maxSafe = calculateMaxSafeEmi(customProfile.monthlyIncome, 40);
  assert.equal(maxSafe, 20000);

  const relief = calculateReliefNeeded(customProfile.existingEmis, customProfile.monthlyIncome);
  assert.equal(relief, 10000);

  const response = generateFinancialAdvisorResponse('Why was my loan rejected?', customProfile);
  assert.match(response.answer, /60%/);
  assert.match(response.answer, /50,000/);
  assert.match(response.answer, /30,000/);
});

test('5. Invalid Income & Negative EMI Handling', () => {
  const invalid1 = validateProfileInputs({ monthlyIncome: 0, existingEmis: -5000, requestedLoanAmount: 10000 });
  assert.equal(invalid1.isValid, false);
  assert.ok(invalid1.errors.monthlyIncome);
  assert.ok(invalid1.errors.existingEmis);

  const dtiZero = calculateDti(5000, 0);
  assert.equal(dtiZero.dti, 0);
  assert.equal(dtiZero.isSafe, false);
});

test('6. Empty & Whitespace Validation', () => {
  const invalidName = validateProfileInputs({ fullName: '   ', monthlyIncome: 50000, existingEmis: 10000, requestedLoanAmount: 50000, tenureMonths: 12 });
  assert.equal(invalidName.isValid, false);
  assert.ok(invalidName.errors.fullName);

  const emptyResponse = generateFinancialAdvisorResponse('   ', {});
  assert.match(emptyResponse.answer, /Please enter a question/);
});

test('7. Contradictory Chatbot Input Handling', () => {
  const contradiction1 = detectContradiction('My income is both 20,000 and 80,000');
  assert.equal(contradiction1, true);

  const contradiction2 = detectContradiction('I never missed a payment but missed 3 payments last month');
  assert.equal(contradiction2, true);

  const response = generateFinancialAdvisorResponse('My income is both 20,000 and 80,000', {});
  assert.equal(response.answer, 'I see conflicting information. Which value should I use?');
});

test('8. Detailed Rejection Question (5-Part Structure)', () => {
  const response = generateFinancialAdvisorResponse('Why was my loan rejected?', {
    fullName: 'Test User',
    monthlyIncome: 40000,
    existingEmis: 24000
  });

  assert.match(response.answer, /1\. What is known:/);
  assert.match(response.answer, /2\. What is only a possible reason:/);
  assert.match(response.answer, /3\. What cannot be determined/);
  assert.match(response.answer, /4\. What information is missing:/);
  assert.match(response.answer, /5\. Safe next actions:/);
});

test('9. Unrelated Question Boundary Enforcement', () => {
  const isOut = detectOutOfScope('What is the weather in Delhi today?');
  assert.equal(isOut, true);

  const response = generateFinancialAdvisorResponse('Who won the cricket match?', {});
  assert.match(response.answer, /I am Sahayak, your AI Financial Education Coach/);
});

test('10. Sensitive Financial Distress Handling & Safety Disclaimer', () => {
  const isDistress = detectSensitiveDistress('I urgent cash to pay rent or landlord will eviction me');
  assert.equal(isDistress, true);

  const response = generateFinancialAdvisorResponse('I cannot afford rent and need urgent cash from loan shark', {});
  assert.match(response.answer, /strongly advise against borrowing from unverified/);
  assert.match(response.answer, /Financial Safety Note/);
  assert.match(response.answer, /National Consumer Helpline/);
});

test('11. Reducing-Balance EMI Calculation', () => {
  const emi = calculateReducingEmi(80000, 10.49, 24);
  assert.equal(emi, 3710);
});

test('12. Hindi Localization Completeness', () => {
  assert.ok(TRANSLATIONS.hi);
  assert.ok(TRANSLATIONS.hi.tabHome);
  assert.ok(TRANSLATIONS.hi.tabEligibility);
  assert.ok(TRANSLATIONS.hi.tabDiagnosis);
  assert.ok(TRANSLATIONS.hi.tabOffers);
  assert.ok(TRANSLATIONS.hi.tabRoadmap);
  assert.ok(TRANSLATIONS.hi.tabTracker);
  assert.ok(TRANSLATIONS.hi.tabSanction);
});
