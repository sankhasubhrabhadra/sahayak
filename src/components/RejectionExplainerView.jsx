import React, { useState } from 'react';
import { ArrowRight, Sliders, CheckCircle2, AlertCircle, Layers, Sparkles } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6 animate-in fade-in duration-200">
      {/* Neo-Brutalist Diagnosis Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border-[3px] border-black shadow-brutal-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-mono font-bold bg-[#FFD200] px-2.5 py-1 border-2 border-black uppercase tracking-wider shadow-brutal-sm">
            Ref: PTM-LON-884920
          </span>
          <span className="bg-[#00B37E] text-white px-2.5 py-1 border-2 border-black font-black uppercase tracking-wider shadow-brutal-sm">
            Soft Bureau Pull (0 Score Impact)
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight leading-tight">
          {applicant.fullName || 'Rahul'}, {lang === 'en' ? "here is your loan underwriting diagnosis." : 'यहाँ आपका लोन डायग्नोसिस है।'}
        </h1>

        <p className="text-xs sm:text-sm text-black font-medium leading-relaxed max-w-2xl">
          {lang === 'en'
            ? "Your application was paused today because automated banking algorithms found your active monthly EMI commitments higher than their standard 40% threshold. Sahayak has identified immediate alternative bank offers and structured a 90-day plan to achieve full approval."
            : "आज आपका लोन होल्ड हुआ है क्योंकि आपकी मौजूदा ईएमआई आमदनी के 40% से अधिक है। सहायक AI ने आपके लिए उपयुक्त विकल्प और 90 दिनों का प्लान तैयार किया है।"}
        </p>
      </div>

      {/* 3 Core Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white rounded-xl p-5 border-[3px] border-black shadow-brutal space-y-2">
          <span className="text-black font-black uppercase tracking-wider text-[11px] bg-[#FF4D4D] text-white px-2 py-0.5 border border-black inline-block">
            Current DTI
          </span>
          <div className="text-3xl font-black text-[#FF4D4D]">{currentDti}%</div>
          <p className="text-black/70 font-semibold text-[11px]">
            ₹{existingEmis.toLocaleString('en-IN')} EMIs ÷ ₹{monthlyIncome.toLocaleString('en-IN')} income
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border-[3px] border-black shadow-brutal space-y-2">
          <span className="text-black font-black uppercase tracking-wider text-[11px] bg-[#00B37E] text-white px-2 py-0.5 border border-black inline-block">
            Safe Benchmark
          </span>
          <div className="text-3xl font-black text-[#00B37E]">40.0%</div>
          <p className="text-black/70 font-semibold text-[11px]">
            Max safe EMI for your income: ₹{maxSafeEmi.toLocaleString('en-IN')}/mo
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border-[3px] border-black shadow-brutal space-y-2">
          <span className="text-black font-black uppercase tracking-wider text-[11px] bg-[#FFD200] text-black px-2 py-0.5 border border-black inline-block">
            Relief Needed
          </span>
          <div className="text-3xl font-black text-black">₹{excessEmi.toLocaleString('en-IN')}/mo</div>
          <p className="text-black/70 font-semibold text-[11px]">
            Trimming this excess unlocks full eligibility
          </p>
        </div>
      </div>

      {/* Side-by-Side: Automated Filter vs Deep Discovery */}
      <div className="bg-white rounded-xl p-6 border-[3px] border-black shadow-brutal space-y-4">
        <div className="inline-block px-3 py-1 bg-[#00BAF2] border-2 border-black font-black text-xs uppercase tracking-wider shadow-brutal-sm">
          Forensic Comparison
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#FFFDF5] p-4 rounded-xl border-2 border-black shadow-brutal-sm space-y-2">
            <span className="font-black text-[#FF4D4D] uppercase text-xs block">Bank Automated Filter Result</span>
            <ul className="text-black font-semibold space-y-1.5 list-disc list-inside text-[11px] leading-relaxed">
              <li>High Debt-to-Income obligation at <strong>{currentDti}%</strong>.</li>
              <li>Multiple micro-BNPL credit lines active.</li>
              <li>Application paused automatically.</li>
            </ul>
          </div>

          <div className="bg-[#FFFDF5] p-4 rounded-xl border-2 border-black shadow-brutal-sm space-y-2">
            <span className="font-black text-[#00B37E] uppercase text-xs block">Sahayak Deep Forensic Discovery</span>
            <ul className="text-black font-semibold space-y-1.5 list-disc list-inside text-[11px] leading-relaxed">
              <li>2 small BNPL accounts (Simpl ₹2,500 + LazyPay ₹3,800 = ₹6,300).</li>
              <li>Primary two-wheeler loan is <strong>100% on-time (0 DPD)</strong>.</li>
              <li>Settling the 2 micro-BNPLs drops DTI to <strong>40.0%</strong>.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive What-If Debt Relief Simulator */}
      <div className="bg-white rounded-xl p-6 border-[3px] border-black shadow-brutal space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-black" />
            <h3 className="text-sm font-black text-black uppercase tracking-wider">
              Interactive "What-If" Debt Relief Simulator
            </h3>
          </div>
          <span className="text-xs font-black bg-[#FFD200] px-2 py-0.5 border-2 border-black shadow-brutal-sm">
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
          className="w-full accent-black h-3 bg-[#FFFDF5] border-2 border-black rounded-lg cursor-pointer"
        />

        <div className="grid grid-cols-3 gap-3 text-xs pt-1">
          <div className="bg-[#FFFDF5] p-3 rounded-lg border-2 border-black shadow-brutal-sm">
            <span className="text-black/60 font-bold text-[10px] uppercase">New EMI:</span>
            <div className="font-black text-black text-base mt-0.5">₹{simulatedEmi.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-[#FFFDF5] p-3 rounded-lg border-2 border-black shadow-brutal-sm">
            <span className="text-black/60 font-bold text-[10px] uppercase">New DTI:</span>
            <div className="font-black text-black text-base mt-0.5">{simulatedDti}%</div>
          </div>
          <div className="bg-[#FFFDF5] p-3 rounded-lg border-2 border-black shadow-brutal-sm">
            <span className="text-black/60 font-bold text-[10px] uppercase">Status:</span>
            <div className={`font-black text-base mt-0.5 ${isSimulatedSafe ? 'text-[#00B37E]' : 'text-[#FF4D4D]'}`}>
              {isSimulatedSafe ? 'Eligible ✅' : 'Relief Needed ⚠️'}
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Options */}
      <div className="bg-[#FFFDF5] rounded-xl p-6 border-[3px] border-black shadow-brutal-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-black text-black">
            Choose Your Next Step
          </h4>
          <p className="text-xs text-black/80 font-medium mt-0.5">
            View alternative loan matches available today, or explore your structured 90-day recovery plan.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onProceedToOffers}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00BAF2] hover:bg-[#FFD200] text-black font-black text-xs sm:text-sm border-2 border-black shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brutal-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Alternative Bank Offers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

