import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, CheckCircle, ArrowRight, ShieldCheck, Download, Share2, IndianRupee, Smartphone, RefreshCw, Award } from 'lucide-react';
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
    // Fire festive confetti cannon
    try {
      confetti({
        particleCount: 120,
        spread: 90,
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
          particleCount: 150,
          spread: 100,
          origin: { y: 0.4 }
        });
      } catch (e) {}
    }, 1600);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-500">
      {/* Hero Celebration Banner */}
      <div className="bg-gradient-to-br from-[#002970] via-[#001944] to-[#0084B4] text-white rounded-3xl p-8 sm:p-12 text-center shadow-card relative overflow-hidden space-y-4">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#00BAF2] to-[#00B37E] flex items-center justify-center shadow-lg shadow-[#00BAF2]/30 mb-2">
          <Trophy className="w-10 h-10 text-white" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#00BAF2] text-[#002970]">
          <Sparkles className="w-3.5 h-3.5" />
          90-Day Pathway Completed
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          {lang === 'en' ? `🎉 Congratulations, ${applicant.fullName || 'Rahul'}!` : `🎉 बधाई हो, ${applicant.fullName || 'राहुल'}!`}
        </h1>

        <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
          {lang === 'en'
            ? "You transformed a loan rejection into verified loan readiness through consistent 90-day financial discipline."
            : "आपने 90 दिनों की अनुशासनबद्ध योजना से अपनी लोन पात्रता हासिल कर ली है!"}
        </p>
      </div>

      {/* Official Pre-Approved Sanction Certificate Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Paytm AI Underwriting Simulation
            </span>
            <h2 className="text-xl font-bold text-[#002970]">
              Demo Pre-Approval Certificate (Simulated Offer)
            </h2>
          </div>
          <span className="bg-emerald-50 text-emerald-700 font-extrabold text-xs px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            100% Readiness Milestone (Demo)
          </span>
        </div>

        {/* Loan Financial Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="text-[11px] text-slate-500 font-semibold">Sanction Amount</span>
            <div className="text-xl font-black text-[#002970] mt-1">
              ₹{loanAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="text-[11px] text-slate-500 font-semibold">Preferential Rate</span>
            <div className="text-xl font-black text-[#0084B4] mt-1">
              10.49% p.a.
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">Standard rate waived</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="text-[11px] text-slate-500 font-semibold">Tenure & Reducing EMI</span>
            <div className="text-xl font-black text-[#002970] mt-1">
              ₹{monthlyEmi.toLocaleString('en-IN')}/mo
            </div>
            <span className="text-[10px] text-slate-400">{tenure} Months</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="text-[11px] text-slate-500 font-semibold">Processing Fee</span>
            <div className="text-xl font-black text-[#00B37E] mt-1">
              ₹0 (100% OFF)
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">Sahayak Graduate Perk</span>
          </div>
        </div>

        {/* Transformation Comparison */}
        <div className="bg-gradient-to-r from-blue-50/70 to-emerald-50/70 rounded-2xl p-5 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your 90-Day Transformation
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-rose-600 line-through">Day 1: 56.6% DTI (Rejected)</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-black text-emerald-700">Day 90: 34.2% DTI (Approved!)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-8 h-8 text-amber-500" />
            <div className="text-left text-xs font-bold text-[#002970]">
              <div>Sahayak Gold Credit Grade</div>
              <span className="text-[11px] text-slate-500 font-normal">Score improved +42 points</span>
            </div>
          </div>
        </div>

        {/* 1-Click Disbursement Button & State */}
        <div className="pt-2">
          {isDisbursed ? (
            <div className="bg-gradient-to-b from-emerald-50 to-teal-50/60 rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 text-center space-y-4 animate-in zoom-in-95 shadow-soft">
              {/* Paytm Soundbox Device Simulation Box */}
              <div className="max-w-md mx-auto bg-gradient-to-b from-[#002970] to-[#001944] text-white rounded-3xl p-6 shadow-xl border-4 border-[#00BAF2] relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/15">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-lg text-white">
                      Pay<span className="text-[#00BAF2]">tm</span>
                    </span>
                    <span className="text-[10px] font-bold bg-[#00BAF2] text-[#002970] px-1.5 py-0.5 rounded">
                      Soundbox 4G
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active</span>
                  </div>
                </div>

                <div className="py-5 space-y-2">
                  <div className="flex justify-center gap-1">
                    <span className="w-1.5 h-6 bg-[#00BAF2] rounded-full animate-pulse" />
                    <span className="w-1.5 h-10 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-7 bg-[#00BAF2] rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                    <span className="w-1.5 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
                    <span className="w-1.5 h-8 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                  </div>

                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight pt-1">
                    "Paytm par ₹{loanAmount.toLocaleString('en-IN')} prapt hue"
                  </div>
                  <p className="text-xs text-blue-200">
                    Instant Credit to Paytm Payments Bank (•••• 4092)
                  </p>
                </div>

                <div className="pt-2 text-[10px] text-slate-300 flex items-center justify-between border-t border-white/10">
                  <span>Txn ID: PTM-SAHAYAK-9921</span>
                  <span>IMPS Fast-Settlement</span>
                </div>
              </div>

              <div className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5 pt-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Loan disbursed instantly. Monthly EMI auto-debit configured via Paytm UPI.</span>
              </div>
            </div>
          ) : isDisbursing ? (
            <div className="bg-[#002970] text-white p-8 rounded-3xl text-center space-y-4 shadow-xl border border-blue-900">
              <div className="flex items-center justify-center gap-3">
                <RefreshCw className="w-7 h-7 text-[#00BAF2] animate-spin" />
                <span className="text-lg font-bold">Disbursing Loan via Paytm Payments Bank Instant Rails...</span>
              </div>
              <p className="text-xs text-blue-200">
                Registering Paytm UPI auto-debit e-mandate & executing instant IMPS settlement
              </p>
            </div>
          ) : (
            <button
              onClick={handleDisburse}
              className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-[#00BAF2] to-[#0084B4] hover:opacity-95 text-[#002970] font-black text-lg shadow-xl shadow-[#00BAF2]/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>{t.disburseNow} (₹{loanAmount.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-5 h-5 text-[#002970]" />
            </button>
          )}
        </div>
      </div>

      {/* Reset & Pitch Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
        <button
          onClick={onResetAll}
          className="flex items-center gap-2 text-slate-500 hover:text-[#002970] font-bold py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-xs"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Demo Flow & Try Other Personas</span>
        </button>
      </div>
    </div>
  );
}
