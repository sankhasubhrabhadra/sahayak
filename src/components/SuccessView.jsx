import React, { useState } from 'react';
import { Trophy, CheckCircle, ArrowRight, RefreshCw, Award, Lock, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRANSLATIONS } from '../data/mockData';
import { calculateReducingEmi } from '../utils/financialEngine';
import DemoBanner from './DemoBanner';

export default function SuccessView({
  applicant,
  progressPercent = 100,
  onProceedToDashboard,
  onResetAll,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [isDisbursed, setIsDisbursed] = useState(false);

  const loanAmount = Math.max(10000, Number(applicant.requestedLoanAmount) || 150000);
  const tenure = Math.max(1, Number(applicant.tenureMonths) || 24);
  const interestRate = 10.49;
  const monthlyEmi = calculateReducingEmi(loanAmount, interestRate, tenure);

  const isCompleted = progressPercent >= 100 || applicant.personaId === 'amit';

  const handleDisburse = () => {
    setIsDisbursing(true);
    setTimeout(() => {
      setIsDisbursing(false);
      setIsDisbursed(true);
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }, 900);
  };

  if (!isCompleted) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-200">
        <DemoBanner lang={lang} />
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              Future Milestone Preview
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              This is a simulated future milestone preview.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Complete the 90-day recovery plan on your tracker to unlock the final illustrative outcome for {applicant.fullName || 'Applicant'}. Current progress: <strong>{progressPercent}%</strong>.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={onProceedToDashboard}
              className="px-6 py-2.5 rounded-lg bg-[#002970] hover:bg-[#001f5c] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Return to 90-Day Tracker ({progressPercent}%)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-200">
      <DemoBanner lang={lang} />

      {/* Hero Celebration Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xs space-y-3">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
          <Trophy className="w-6 h-6 text-emerald-400" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>90-Day Pathway Milestone Achieved</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          {lang === 'en' ? `Congratulations, ${applicant.fullName || 'Applicant'}!` : `बधाई हो, ${applicant.fullName || 'आवेदक'}!`}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          {lang === 'en'
            ? "You transformed a loan rejection into verified loan readiness through consistent financial discipline."
            : "आपने 90 दिनों की अनुशासनबद्ध योजना से अपनी लोन पात्रता हासिल कर ली है!"}
        </p>
      </div>

      {/* Official Pre-Approved Sanction Certificate Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Paytm AI Underwriting Engine
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Pre-Approval Sanction Preview (Simulated Offer)
            </h2>
          </div>
          <span className="bg-emerald-50 text-emerald-700 font-semibold text-xs px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            100% Readiness Milestone
          </span>
        </div>

        {/* Loan Financial Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">Sanction Amount</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">
              ₹{loanAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">Preferential Rate</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">
              {interestRate}% p.a.
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Illustrative rate</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">Tenure & Reducing EMI</span>
            <div className="text-lg font-bold text-slate-900 mt-0.5">
              ₹{monthlyEmi.toLocaleString('en-IN')}/mo
            </div>
            <span className="text-[10px] text-slate-500">{tenure} Months</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">Processing Fee</span>
            <div className="text-lg font-bold text-emerald-700 mt-0.5">
              ₹0 (100% OFF)
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Graduate Perk</span>
          </div>
        </div>

        {/* Transformation Comparison */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="text-xs text-slate-500 font-medium">
              Your 90-Day Transformation
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-rose-600 line-through">Day 1: High DTI (Hold)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-bold text-emerald-700">Day 90: Safe DTI (Sanction Ready)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <div className="text-left text-xs font-semibold text-slate-900">
              <div>Sahayak Credit Grade</div>
              <span className="text-[11px] text-slate-500 font-normal">Debt Capacity Restored</span>
            </div>
          </div>
        </div>

        {/* Action Button & State */}
        <div className="pt-2">
          {isDisbursed ? (
            <div className="space-y-3 animate-in zoom-in-95">
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs space-y-3 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Simulated Sanction Milestone Reached
                </div>
                <p className="text-sm font-medium text-slate-200 leading-relaxed">
                  In a live production application with an RBI-regulated lending partner, your pre-approved loan of ₹{loanAmount.toLocaleString('en-IN')} would now undergo final e-sign agreement.
                </p>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-[11px] text-slate-400">
                  Disclaimer: Illustrative demo estimate. No actual bank disbursement or credit mandate registration has occurred.
                </div>
              </div>
            </div>
          ) : isDisbursing ? (
            <div className="bg-slate-900 text-white p-6 rounded-2xl text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin" />
                <span className="text-sm font-semibold">Simulating sanction milestone...</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleDisburse}
              className="w-full py-3 px-5 rounded-lg bg-[#002970] hover:bg-[#001f5c] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>Simulate Sanction Outcome for ₹{loanAmount.toLocaleString('en-IN')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Reset & Pitch Actions */}
      <div className="flex items-center justify-center text-xs">
        <button
          onClick={onResetAll}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium py-2 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Flow & Try Other Personas</span>
        </button>
      </div>
    </div>
  );
}
