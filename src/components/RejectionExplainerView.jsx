import React, { useState } from 'react';
import { ArrowRight, Sparkles, AlertCircle, TrendingDown, CheckCircle2, Sliders, ShieldCheck, HeartHandshake, HelpCircle, Layers, Building2, Shield, Activity, RefreshCw } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function RejectionExplainerView({
  applicant,
  onProceedToOffers,
  onProceedToRoadmap,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const monthlyIncome = Number(applicant.monthlyIncome) || 38000;
  const existingEmis = Number(applicant.existingEmis) || 21500;
  const currentDti = ((existingEmis / monthlyIncome) * 100).toFixed(1);
  const maxSafeEmi = Math.round(monthlyIncome * 0.40);
  const excessEmi = Math.max(0, existingEmis - maxSafeEmi);

  // Interactive What-If Simulator Slider state (simulating paying off ₹X of EMIs)
  const [simulatedReduction, setSimulatedReduction] = useState(6300);

  const simulatedEmi = Math.max(0, existingEmis - simulatedReduction);
  const simulatedDti = ((simulatedEmi / monthlyIncome) * 100).toFixed(1);
  const isSimulatedSafe = simulatedDti <= 40;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* Paytm Super-App Application Reference Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-soft flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="font-black text-[#002970] text-sm tracking-tighter">Pay</span>
            <span className="font-black text-[#00BAF2] text-sm tracking-tighter">tm</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="font-bold text-[#002970]">Credit Health & Loan Underwriting Desk</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#E8F7FD] text-[#002970] font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#00BAF2]/30">
            Application Ref: PTM-LON-2026-884920
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Soft Bureau Pull (0 Score Impact)
          </span>
        </div>
      </div>

      {/* Empathetic Paytm AI Greeting Header */}
      <div className="bg-gradient-to-br from-[#002970] via-[#001f5c] to-[#001438] text-white rounded-3xl p-6 sm:p-10 shadow-card border border-blue-900/40 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#00BAF2]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00BAF2] text-[#002970]">
            <Sparkles className="w-3.5 h-3.5" />
            {t.aiDiagnosisTitle}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {applicant.fullName || 'Rahul'}, {lang === 'en' ? "don't worry — you're much closer to approval than you think." : 'घबराएं नहीं — आप लोन अप्रूवल के बहुत करीब हैं!'}
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            {lang === 'en'
              ? "Your loan request was placed on hold today because automated banking algorithms found your active monthly EMI commitments higher than their 40% income cap. There is zero damage to your credit score — Paytm Sahayak has matched alternative approved partner offers for you right now, plus a structured 90-day pathway to your full goal."
              : "आज आपका लोन रिजेक्ट नहीं, बल्कि होल्ड हुआ है क्योंकि आपकी मौजूदा ईएमआई आमदनी के 40% से ज्यादा है। सहायक AI ने आपके लिए तुरंत उपयुक्त बैंक ऑफर्स और 90 दिनों का रोडमैप तैयार कर लिया है।"}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-blue-200">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#00BAF2]" />
              No Hard Bureau Inquiry Recorded
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <Activity className="w-4 h-4 text-[#00B37E]" />
              RBI Fortnightly Reporting Ingestion
            </span>
          </div>
        </div>
      </div>

      {/* Core Diagnostic Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1: Current DTI */}
        <div className="bg-white rounded-2xl p-6 border border-rose-200 shadow-soft space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Current Debt-to-Income (DTI)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-600">{currentDti}%</span>
            <span className="text-xs text-rose-700 bg-rose-50 font-bold px-2 py-0.5 rounded">High Obligation</span>
          </div>
          <p className="text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
            ₹{existingEmis.toLocaleString('en-IN')} obligations ÷ ₹{monthlyIncome.toLocaleString('en-IN')} income × 100 = <strong>{currentDti}%</strong>
          </p>
        </div>

        {/* Metric 2: Lender Benchmark */}
        <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-soft space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Lender Safe Cap Benchmark
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">40.0%</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded">Paytm Guideline</span>
          </div>
          <p className="text-xs text-slate-500">
            Standard banking guideline: Max recommended monthly EMI for your income is ₹{maxSafeEmi.toLocaleString('en-IN')} (40% of income).
          </p>
        </div>

        {/* Metric 3: The Gap to Close */}
        <div className="bg-white rounded-2xl p-6 border border-[#00BAF2]/40 shadow-soft space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Monthly Relief Target
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#002970]">₹{excessEmi.toLocaleString('en-IN')}</span>
            <span className="text-xs text-[#002970] bg-[#E8F7FD] font-bold px-2 py-0.5 rounded border border-[#00BAF2]/30">Target Relief</span>
          </div>
          <p className="text-xs text-slate-500">
            Trimming ₹{excessEmi.toLocaleString('en-IN')}/mo in micro-EMIs drops your ratio below 40%, significantly expanding borrowing eligibility.
          </p>
        </div>
      </div>

      {/* Side-by-Side: What Lenders Saw vs What Sahayak Found */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-[#002970] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#00BAF2]" />
          What Automated Underwriting Saw vs. What Sahayak Discovered
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What Bank Algorithms Saw */}
          <div className="bg-rose-50/60 rounded-2xl p-5 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Automated Lender Underwriting Filter</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2.5 list-disc list-inside">
              <li>High Debt-to-Income obligation at <strong>{currentDti}%</strong> (exceeds 40% benchmark guideline).</li>
              <li>Multiple active short-term unsecured BNPL accounts open on bureau.</li>
              <li>Automated system flagged high debt commitments and paused instant sanction.</li>
            </ul>
          </div>

          {/* What Sahayak Discovered */}
          <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Paytm Sahayak Deep Cashflow Analysis</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2.5 list-disc list-inside">
              <li>You have <strong>2 micro-BNPL accounts</strong> (Simpl ₹2,500/mo + LazyPay ₹3,800/mo = ₹6,300).</li>
              <li>Your underlying repayment discipline on your primary loan is <strong>100% on time (0 DPD)</strong>.</li>
              <li>Closing the 2 small BNPL balances drops your DTI to <strong>40.0%</strong> (₹15,200 ÷ ₹38,000) without needing any salary hike!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive What-If Simulator */}
      <div className="bg-gradient-to-br from-[#002970] via-[#001f5c] to-[#001438] text-white rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#00BAF2]" />
              <h3 className="text-lg font-bold text-white">
                Interactive "What-If" Debt Relief Simulator
              </h3>
            </div>
            <p className="text-xs text-blue-200 mt-1">
              Drag the slider to see how paying off small EMIs transforms your underwriting score in real-time.
            </p>
          </div>

          <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-[#00BAF2] border border-white/10">
            Paytm Underwriting Engine
          </span>
        </div>

        {/* Slider Controls */}
        <div className="bg-white/10 rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex justify-between items-center text-sm font-semibold">
            <span>Simulate Monthly EMI Reduction:</span>
            <span className="text-xl font-black text-[#00BAF2]">
              -₹{simulatedReduction.toLocaleString('en-IN')}/month
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="12000"
            step="500"
            value={simulatedReduction}
            onChange={(e) => setSimulatedReduction(Number(e.target.value))}
            className="w-full accent-[#00BAF2] h-2 bg-white/20 rounded-lg cursor-pointer"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-black/20 p-3 rounded-xl">
              <span className="text-[11px] text-blue-200">New Monthly EMI:</span>
              <div className="text-lg font-bold text-white">₹{simulatedEmi.toLocaleString('en-IN')}</div>
            </div>

            <div className="bg-black/20 p-3 rounded-xl">
              <span className="text-[11px] text-blue-200">New DTI Ratio:</span>
              <div className={`text-lg font-bold ${isSimulatedSafe ? 'text-[#00BAF2]' : 'text-amber-300'}`}>
                {simulatedDti}%
              </div>
            </div>

            <div className="bg-black/20 p-3 rounded-xl">
              <span className="text-[11px] text-blue-200">Simulated Status:</span>
              <div className={`text-sm font-bold flex items-center gap-1.5 mt-0.5 ${
                isSimulatedSafe ? 'text-[#00B37E]' : 'text-amber-300'
              }`}>
                {isSimulatedSafe ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Eligible for Sanction!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>Needs ₹{(simulatedEmi - maxSafeEmi).toLocaleString('en-IN')} more relief</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Options: Best-Fit Offers (Immediate) OR 90-Day Plan */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#E8F7FD] text-[#002970] mb-1 border border-[#00BAF2]/30">
            <Building2 className="w-3.5 h-3.5 text-[#00BAF2]" />
            Paytm Lending Partners
          </div>
          <h3 className="text-lg font-bold text-[#002970]">
            Explore 3 Alternative Bank Offers Matched to Your Profile
          </h3>
          <p className="text-xs text-slate-500">
            See instant eligible bank loans you qualify for right now, or head to your structured 90-day recovery plan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onProceedToOffers}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00BAF2] to-[#0084B4] hover:opacity-95 text-[#002970] font-black text-sm shadow-lg shadow-[#00BAF2]/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <span>View Best-Fit Bank Offers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
