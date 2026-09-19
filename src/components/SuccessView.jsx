import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle, ArrowRight, ShieldCheck, Download, Share2, IndianRupee, Smartphone, RefreshCw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRANSLATIONS } from '../data/mockData';
import { calculateReducingEmi } from '../utils/financialEngine';

export default function SuccessView({
  applicant,
  onResetAll,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [isDisbursed, setIsDisbursed] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  }, []);

  const loanAmount = Number(applicant.requestedLoanAmount) || 150000;
  const tenure = Number(applicant.tenureMonths) || 24;
  const interestRate = 10.49;
  const monthlyEmi = calculateReducingEmi(loanAmount, interestRate, tenure);

  const handleDisburse = () => {
    setIsDisbursing(true);
    setTimeout(() => {
      setIsDisbursing(false);
      setIsDisbursed(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.4 }
        });
      } catch (e) {}
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-200">
      {/* Hero Celebration Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xs space-y-3">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
          <Trophy className="w-6 h-6 text-emerald-400" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>90-Day Pathway Completed</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          {lang === 'en' ? `Congratulations, ${applicant.fullName || 'Rahul'}` : `बधाई हो, ${applicant.fullName || 'राहुल'}`}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          {lang === 'en'
            ? "You transformed a loan rejection into verified loan readiness through consistent 90-day financial discipline."
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
              Pre-Approval Sanction Certificate (Simulated Offer)
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
              10.49% p.a.
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Standard rate waived</span>
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
              <span className="text-xs font-semibold text-rose-600 line-through">Day 1: 56.6% DTI (Rejected)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-bold text-emerald-700">Day 90: 34.2% DTI (Approved)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <div className="text-left text-xs font-semibold text-slate-900">
              <div>Sahayak Gold Credit Grade</div>
              <span className="text-[11px] text-slate-500 font-normal">Score improved +42 points</span>
            </div>
          </div>
        </div>

        {/* 1-Click Disbursement Button & State */}
        <div className="pt-2">
          {isDisbursed ? (
            <div className="space-y-3 animate-in zoom-in-95">
              {/* Paytm Soundbox Device Simulation Box */}
              <div className="max-w-md mx-auto bg-slate-900 text-white rounded-2xl p-5 shadow-xs border border-slate-800 relative overflow-hidden">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">
                      Pay<span className="text-[#00BAF2]">tm</span>
                    </span>
                    <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                      Soundbox 4G
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active</span>
                  </div>
                </div>

                <div className="py-4 space-y-2 text-center">
                  <div className="flex justify-center gap-1">
                    <span className="w-1 h-5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-1 h-8 bg-emerald-400 rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse delay-150" />
                    <span className="w-1 h-7 bg-emerald-400 rounded-full animate-pulse delay-100" />
                  </div>

                  <div className="text-lg font-bold text-white tracking-tight">
                    "Paytm par ₹{loanAmount.toLocaleString('en-IN')} praapt hue"
                  </div>
                  <p className="text-xs text-slate-400">
                    Instant Credit to Paytm Payments Bank (•••• 4092)
                  </p>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800">
                  <span>Txn ID: PTM-SAHAYAK-9921</span>
                  <span>IMPS Fast-Settlement</span>
                </div>
              </div>

              <div className="text-xs font-medium text-emerald-800 flex items-center justify-center gap-1.5 pt-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Loan disbursed instantly. Monthly EMI auto-debit configured via Paytm UPI.</span>
              </div>
            </div>
          ) : isDisbursing ? (
            <div className="bg-slate-900 text-white p-6 rounded-2xl text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 text-emerald-400 animate-spin" />
                <span className="text-sm font-semibold">Disbursing Loan via Paytm Payments Bank rails...</span>
              </div>
              <p className="text-xs text-slate-400">
                Registering Paytm UPI auto-debit e-mandate & executing IMPS settlement
              </p>
            </div>
          ) : (
            <button
              onClick={handleDisburse}
              className="w-full py-3.5 px-5 rounded-xl bg-[#002970] hover:bg-[#001f5c] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>{t.disburseNow} (₹{loanAmount.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Reset & Pitch Actions */}
      <div className="flex items-center justify-center text-xs">
        <button
          onClick={onResetAll}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Flow & Try Other Personas</span>
        </button>
      </div>
    </div>
  );
}
