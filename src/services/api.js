// Sahayak Frontend API Service Layer
// Deterministic mock adapters adhering to RBI digital lending transparency guidelines

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Expected fallback in client-only demo environment
  }
  return { status: 'client-engine-active', mode: 'educational-simulation' };
}

export async function evaluateUnderwriting(applicantData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/underwrite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicantData),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      const data = await res.json();
      return data.evaluation;
    }
  } catch (err) {
    // Fallback to deterministic client evaluation
  }
  const income = Number(applicantData?.monthlyIncome) || 38000;
  const emis = Number(applicantData?.existingEmis) || 21500;
  const dti = Number(((emis / income) * 100).toFixed(1));
  const isEligible = dti <= 40;

  return {
    isMock: true,
    dtiPercent: dti,
    isEligible,
    recommendation: isEligible
      ? 'Under 40% DTI threshold — Eligible for immediate sanction'
      : 'Exceeds 40% DTI threshold — 90-day recovery plan recommended',
    timestamp: new Date().toISOString()
  };
}

export async function fetchBestFitOffers(financialData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/offers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(financialData),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      const data = await res.json();
      return data.offers;
    }
  } catch (err) {
    // Fallback to client calculations
  }
  return null;
}

export async function sendAIChatMessage(message, applicant = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, applicant }),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) {
      const data = await res.json();
      return data.reply;
    }
  } catch (err) {
    // Fallback to client financial engine
  }
  return null;
}

export async function simulateDisbursement(loanAmount, recipientName) {
  return {
    isMock: true,
    status: 'simulated_milestone_reached',
    amount: loanAmount,
    disclaimer: 'Illustrative demo estimate. No actual bank disbursement or e-NACH mandate registration has occurred.'
  };
}
