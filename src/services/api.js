// Sahayak Frontend API Service Layer
// Seamlessly connects to Render Backend API (or falls back gracefully to local logic)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend API offline or sleeping, using client-side engine.');
  }
  return null;
}

export async function evaluateUnderwriting(applicantData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/underwrite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicantData),
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const data = await res.json();
      return data.evaluation;
    }
  } catch (err) {
    console.warn('API call failed, fallback to client underwriting.');
  }
  return null;
}

export async function fetchBestFitOffers(financialData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/offers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(financialData),
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const data = await res.json();
      return data.offers;
    }
  } catch (err) {
    console.warn('API call failed, fallback to client offers calculation.');
  }
  return null;
}

export async function sendAIChatMessage(message, applicantName = 'Rahul') {
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, applicantName }),
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const data = await res.json();
      return data.reply;
    }
  } catch (err) {
    console.warn('API call failed, fallback to client AI responses.');
  }
  return null;
}

export async function simulateDisbursement(loanAmount, recipientName) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/disburse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loanAmount, recipientName }),
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) {
      const data = await res.json();
      return data.disbursement;
    }
  } catch (err) {
    console.warn('API call failed, fallback to client disbursement.');
  }
  return null;
}
