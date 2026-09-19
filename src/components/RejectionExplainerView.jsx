import React, { useState } from 'react';
import { ArrowRight, Sliders, CheckCircle2, AlertCircle, Layers } from 'lucide-react';
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

  // Interactive What-If Simulator Slider state
  const [simulatedReduction, setSimulatedReduction] = useState(6300);

  const simulatedEmi = Math.max(0, existingEmis - simulatedReduction);
  const simulatedDti = ((simulatedEmi / monthlyIncome) * 100).toFixed(1);
  const isSimulatedSafe = simulatedDti <= 40;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Minimal Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-slate-500">Application Reference: PTM-LON-884920</span>
          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded font-semibold">
            Soft Bureau Pull (0 Score Impact)
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {applicant.fullName || 'Rahul'}, {lang === 'en' ? "here is your loan underwriting diagnosis." : 'यहाँ आपका लोन डायग्नोसिस है।'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal">
          {lang === 'en'
            ? "Your application was paused today because automated banking algorithms found your active monthly EMI commitments higher than their standard 40% threshold. Sahayak has identified immediate alternative bank offers and structured a 90-day plan to achieve full approval."
            : "आज आपका लोन होल्ड हुआ है क्योंकि आपकी मौजूदा ईएमआई आमदनी के 40% से अधिक है। सहायक AI ने आपके लिए उपयुक्त विकल्प और 90 दिनों का प्लान तैयार किया है।"}
        </p>
      </div>

      {/* 3 Core Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">Current DTI Ratio</span>
          <div className="text-2xl font-bold text-rose-600">{currentDti}%</div>
          <p className="text-slate-500 text-[11px]">
            ₹{existingEmis.toLocaleString('en-IN')} EMIs ÷ ₹{monthlyIncome.toLocaleString('en-IN')} income
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">Safe Benchmark</span>
          <div className="text-2xl font-bold text-emerald-600">40.0%</div>
          <p className="text-slate-500 text-[11px]">
            Max safe EMI for your income: ₹{maxSafeEmi.toLocaleString('en-IN')}/mo
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">Relief Needed</span>
          <div className="text-2xl font-bold text-slate-900">₹{excessEmi.toLocaleString('en-IN')}/mo</div>
          <p className="text-slate-500 text-[11px]">
            Trimming this excess unlocks full eligibility
          </p>
        </div>
      </div>

      {/* Side-by-Side: Automated Filter vs Deep Discovery */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-600" />
          Automated Filter vs. Sahayak Discovery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-rose-700 block">Bank Automated Filter Result</span>
            <ul className="text-slate-600 space-y-1.5 list-disc list-inside text-[11px]">
              <li>High Debt-to-Income obligation at <strong>{currentDti}%</strong>.</li>
              <li>Multiple micro-BNPL credit lines active.</li>
              <li>Application paused automatically.</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-emerald-700 block">Sahayak Deep Forensic Discovery</span>
            <ul className="text-slate-600 space-y-1.5 list-disc list-inside text-[11px]">
              <li>2 small BNPL accounts (Simpl ₹2,500 + LazyPay ₹3,800 = ₹6,300).</li>
              <li>Primary two-wheeler loan is <strong>100% on-time (0 DPD)</strong>.</li>
              <li>Settling the 2 micro-BNPLs drops DTI to <strong>40.0%</strong>.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive What-If Debt Relief Simulator */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Interactive "What-If" Debt Relief Simulator
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-900">
            -₹{simulatedReduction.toLocaleString('en-IN')}/mo
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="12000"
          step="500"
          value={simulatedReduction}
          onChange={(e) => setSimulatedReduction(Number(e.target.value))}
          className="w-full accent-slate-900 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
        />

        <div className="grid grid-cols-3 gap-3 text-xs pt-1">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[11px]">New EMI:</span>
            <div className="font-bold text-slate-900 mt-0.5">₹{simulatedEmi.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[11px]">New DTI:</span>
            <div className="font-bold text-slate-900 mt-0.5">{simulatedDti}%</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[11px]">Status:</span>
            <div className={`font-bold mt-0.5 ${isSimulatedSafe ? 'text-emerald-700' : 'text-rose-600'}`}>
              {isSimulatedSafe ? 'Eligible' : 'Needs relief'}
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Options */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Choose Your Next Step
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            View alternative loan matches available today, or explore your structured 90-day recovery plan.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onProceedToOffers}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View Alternative Bank Offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
