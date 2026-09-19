import React, { useState } from 'react';
import { ArrowRight, Sliders, AlertCircle, Info } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';
import { calculateDti, calculateMaxSafeEmi, calculateReliefNeeded, calculateNewDtiAfterRelief } from '../utils/financialEngine';
import DemoBanner from './DemoBanner';

export default function RejectionExplainerView({
  applicant,
  onProceedToOffers,
  onProceedToRoadmap,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const monthlyIncome = Math.max(1, Number(applicant.monthlyIncome) || 38000);
  const existingEmis = Math.max(0, Number(applicant.existingEmis) || 21500);

  const { dti: currentDti, isSafe } = calculateDti(existingEmis, monthlyIncome);
  const maxSafeEmi = calculateMaxSafeEmi(monthlyIncome, 40);
  const excessEmi = calculateReliefNeeded(existingEmis, monthlyIncome);

  // Dynamic Debt Relief Simulator State initialized to applicant's excess EMI
  const [simulatedReduction, setSimulatedReduction] = useState(excessEmi > 0 ? excessEmi : 5000);

  const simulatedEmi = Math.max(0, existingEmis - simulatedReduction);
  const simulatedDti = calculateNewDtiAfterRelief(existingEmis, simulatedReduction, monthlyIncome);
  const isSimulatedSafe = simulatedDti <= 40;

  const isRahul = applicant.personaId === 'rahul' || applicant.fullName?.toLowerCase().includes('rahul');

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6 animate-in fade-in duration-200">
      {/* Persistent Demo Simulation Banner */}
      <DemoBanner lang={lang} />

      {/* Minimalist Diagnosis Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            Ref: PTM-DEMO-{Math.floor(100000 + Math.random() * 900000)}
          </span>
          <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200 font-medium">
            Soft Bureau Inquiry (0 Score Impact)
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {applicant.fullName || 'Applicant'}, {lang === 'en' ? "here is your loan underwriting diagnosis." : 'यहाँ आपका लोन डायग्नोसिस है।'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-2xl">
          {lang === 'en'
            ? "Your application was paused today because automated banking algorithms found your active monthly EMI commitments higher than their standard 40% threshold. Sahayak has identified immediate alternative bank offers and structured a 90-day plan to achieve full approval."
            : "आज आपका लोन होल्ड हुआ है क्योंकि आपकी मौजूदा ईएमआई आमदनी के 40% से अधिक है। सहायक AI ने आपके लिए उपयुक्त विकल्प और 90 दिनों का प्लान तैयार किया है।"}
        </p>
      </div>

      {/* 3 Core Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200 inline-block">
            Current DTI
          </span>
          <div className="text-3xl font-bold text-rose-600">{currentDti}%</div>
          <p className="text-slate-500 text-[11px]">
            ₹{existingEmis.toLocaleString('en-IN')} EMIs ÷ ₹{monthlyIncome.toLocaleString('en-IN')} income
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 inline-block">
            Safe Benchmark
          </span>
          <div className="text-3xl font-bold text-emerald-600">40.0%</div>
          <p className="text-slate-500 text-[11px]">
            Max safe EMI for your income: ₹{maxSafeEmi.toLocaleString('en-IN')}/mo
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 inline-block">
            Relief Needed
          </span>
          <div className="text-3xl font-bold text-slate-900">₹{excessEmi.toLocaleString('en-IN')}/mo</div>
          <p className="text-slate-500 text-[11px]">
            Trimming this excess unlocks full eligibility
          </p>
        </div>
      </div>

      {/* Side-by-Side: Automated Filter vs Forensic Discovery */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="inline-block px-2.5 py-1 bg-slate-100 rounded-md font-semibold text-xs text-slate-700 border border-slate-200">
          Forensic Comparison
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <span className="font-semibold text-rose-600 text-xs block">Standard Bank Filter Result</span>
            <ul className="text-slate-600 space-y-1.5 list-disc list-inside text-[11px] leading-relaxed">
              <li>Debt-to-Income ratio at <strong>{currentDti}%</strong>.</li>
              <li>Monthly obligations: ₹{existingEmis.toLocaleString('en-IN')}/mo against ₹{monthlyIncome.toLocaleString('en-IN')}/mo income.</li>
              <li>Automated loan decision: Paused due to threshold breach.</li>
            </ul>
          </div>

          <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <span className="font-semibold text-emerald-700 text-xs block">Sahayak Deep Forensic Discovery</span>
            <ul className="text-slate-600 space-y-1.5 list-disc list-inside text-[11px] leading-relaxed">
              {isRahul ? (
                <>
                  <li>2 small BNPL accounts (Simpl ₹2,500 + LazyPay ₹3,800 = ₹6,300/mo).</li>
                  <li>Primary two-wheeler loan is <strong>100% on-time (0 DPD)</strong>.</li>
                  <li>Closing BNPL micro-lines drops DTI to <strong>40.0%</strong>.</li>
                </>
              ) : (
                <>
                  <li>Relief target of <strong>₹{excessEmi.toLocaleString('en-IN')}/mo</strong> needed to achieve safe DTI.</li>
                  <li>Prioritize settling high-interest short-term credit lines or credit card revolving dues.</li>
                  <li>Reducing EMI outflow brings your DTI to <strong>40.0% or lower</strong>.</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive What-If Debt Relief Simulator */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-semibold text-slate-900">
              Interactive "What-If" Debt Relief Simulator
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            -₹{simulatedReduction.toLocaleString('en-IN')}/mo
          </span>
        </div>

        <input
          type="range"
          min="0"
          max={Math.max(15000, existingEmis)}
          step="500"
          value={simulatedReduction}
          onChange={(e) => setSimulatedReduction(Number(e.target.value))}
          aria-label="Simulate Debt Reduction Amount"
          className="w-full accent-[#002970] h-2 bg-slate-100 rounded-lg cursor-pointer"
        />

        <div className="grid grid-cols-3 gap-3 text-xs pt-1">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-medium">New EMI:</span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">₹{simulatedEmi.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-medium">New DTI:</span>
            <div className="font-bold text-slate-900 text-sm mt-0.5">{simulatedDti}%</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 text-[10px] uppercase font-medium">Status:</span>
            <div className={`font-bold text-sm mt-0.5 ${isSimulatedSafe ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isSimulatedSafe ? 'Eligible ✅' : 'Relief Needed ⚠️'}
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Options */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-slate-900">
            Choose Your Next Step
          </h4>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            View alternative loan matches available today, or explore your structured 90-day recovery plan.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onProceedToOffers}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#002970] hover:bg-[#001f5c] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>View Alternative Bank Offers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
