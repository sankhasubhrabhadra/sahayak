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
      <div className="bg-[#00BAF2] text-black rounded-xl p-6 sm:p-8 text-center border-[3px] border-black shadow-brutal space-y-3">
        <div className="w-14 h-14 mx-auto rounded-xl bg-[#FFD200] border-2 border-black shadow-brutal-sm flex items-center justify-center text-black">
          <Trophy className="w-7 h-7 stroke-[2.5]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black bg-white text-black border-2 border-black shadow-brutal-sm uppercase tracking-wide">
          <Sparkles className="w-4 h-4 text-black fill-black" />
          90-Day Pathway Completed
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase">
          {lang === 'en' ? `Congratulations, ${applicant.fullName || 'Rahul'}!` : `बधाई हो, ${applicant.fullName || 'राहुल'}!`}
        </h1>

        <p className="text-xs sm:text-sm font-bold text-black max-w-lg mx-auto leading-relaxed">
          {lang === 'en'
            ? "You transformed a loan rejection into verified loan readiness through consistent 90-day financial discipline."
            : "आपने 90 दिनों की अनुशासनबद्ध योजना से अपनी लोन पात्रता हासिल कर ली है!"}
        </p>
      </div>

      {/* Official Pre-Approved Sanction Certificate Card */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border-[3px] border-black shadow-brutal-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-black pb-4">
          <div>
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
              Paytm AI Underwriting Engine
            </span>
            <h2 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight">
              Pre-Approval Sanction Certificate (Simulated Offer)
            </h2>
          </div>
          <span className="bg-[#00B37E] text-white font-black text-xs px-3 py-1.5 rounded-md border-2 border-black shadow-brutal-sm flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 stroke-[3]" />
            100% READINESS MILESTONE
          </span>
        </div>

        {/* Loan Financial Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#FFFDF5] p-3.5 rounded-lg border-2 border-black shadow-brutal-sm">
            <span className="text-[11px] text-slate-600 font-bold uppercase">Sanction Amount</span>
            <div className="text-lg sm:text-xl font-black text-black mt-0.5">
              ₹{loanAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="bg-[#FFFDF5] p-3.5 rounded-lg border-2 border-black shadow-brutal-sm">
            <span className="text-[11px] text-slate-600 font-bold uppercase">Preferential Rate</span>
            <div className="text-lg sm:text-xl font-black text-black mt-0.5">
              10.49% p.a.
            </div>
            <span className="text-[10px] text-[#008f65] font-extrabold uppercase">Standard waived</span>
          </div>

          <div className="bg-[#FFFDF5] p-3.5 rounded-lg border-2 border-black shadow-brutal-sm">
            <span className="text-[11px] text-slate-600 font-bold uppercase">Tenure & Reducing EMI</span>
            <div className="text-lg sm:text-xl font-black text-black mt-0.5">
              ₹{monthlyEmi.toLocaleString('en-IN')}/mo
            </div>
            <span className="text-[10px] text-slate-700 font-bold">{tenure} Months</span>
          </div>

          <div className="bg-[#FFD200] p-3.5 rounded-lg border-2 border-black shadow-brutal-sm">
            <span className="text-[11px] text-black font-bold uppercase">Processing Fee</span>
            <div className="text-lg sm:text-xl font-black text-black mt-0.5">
              ₹0 (100% OFF)
            </div>
            <span className="text-[10px] text-black font-extrabold uppercase">Graduate Perk</span>
          </div>
        </div>

        {/* Transformation Comparison */}
        <div className="bg-[#FFFDF5] rounded-xl p-4 border-2 border-black shadow-brutal-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs text-slate-700 font-black uppercase tracking-wide">
              Your 90-Day Transformation
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-300 line-through">Day 1: 56.6% DTI (Rejected)</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
              <span className="text-xs font-black text-[#008f65] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-400">Day 90: 34.2% DTI (Approved)</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white px-3 py-2 rounded-lg border-2 border-black shadow-brutal-sm">
            <Award className="w-6 h-6 text-amber-500 fill-amber-400 stroke-[2.5]" />
            <div className="text-left text-xs font-black text-black">
              <div>Sahayak Gold Credit Grade</div>
              <span className="text-[11px] text-slate-600 font-bold">Score improved +42 points</span>
            </div>
          </div>
        </div>

        {/* 1-Click Disbursement Button & State */}
        <div className="pt-2">
          {isDisbursed ? (
            <div className="space-y-4 animate-in zoom-in-95">
              {/* Paytm Soundbox Device Simulation Box */}
              <div className="max-w-md mx-auto bg-black text-white rounded-xl p-5 shadow-brutal border-[3px] border-black relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-base text-white">
                      Pay<span className="text-[#00BAF2]">tm</span>
                    </span>
                    <span className="text-[10px] font-black bg-[#FFD200] text-black px-2 py-0.5 rounded border border-black uppercase tracking-wider">
                      Soundbox 4G
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-black uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active 4G</span>
                  </div>
                </div>

                <div className="py-5 space-y-2.5 text-center">
                  <div className="flex justify-center gap-1.5">
                    <span className="w-1.5 h-6 bg-[#00BAF2] rounded-full animate-pulse" />
                    <span className="w-1.5 h-10 bg-[#FFD200] rounded-full animate-pulse delay-75" />
                    <span className="w-1.5 h-5 bg-[#00B37E] rounded-full animate-pulse delay-150" />
                    <span className="w-1.5 h-8 bg-[#00BAF2] rounded-full animate-pulse delay-100" />
                  </div>

                  <div className="text-xl font-black text-white tracking-tight">
                    "Paytm par ₹{loanAmount.toLocaleString('en-IN')} praapt hue"
                  </div>
                  <p className="text-xs text-zinc-300 font-bold">
                    Instant Credit to Paytm Payments Bank (•••• 4092)
                  </p>
                </div>

                <div className="pt-2.5 text-[10px] text-zinc-400 font-bold flex items-center justify-between border-t border-zinc-800">
                  <span>Txn ID: PTM-SAHAYAK-9921</span>
                  <span className="text-emerald-400 font-black">IMPS Fast-Settlement</span>
                </div>
              </div>

              <div className="text-xs font-black text-black bg-[#00B37E]/20 p-3 rounded-lg border-2 border-black shadow-brutal-sm flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#008f65] stroke-[3]" />
                <span>Loan disbursed instantly. Monthly EMI auto-debit configured via Paytm UPI.</span>
              </div>
            </div>
          ) : isDisbursing ? (
            <div className="bg-black text-white p-6 rounded-xl border-[3px] border-black shadow-brutal text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#FFD200] animate-spin stroke-[2.5]" />
                <span className="text-sm font-black uppercase tracking-wide">Disbursing Loan via Paytm Payments Bank rails...</span>
              </div>
              <p className="text-xs text-zinc-300 font-medium">
                Registering Paytm UPI auto-debit e-mandate & executing IMPS settlement
              </p>
            </div>
          ) : (
            <button
              onClick={handleDisburse}
              className="w-full py-4 px-6 rounded-xl bg-[#FFD200] hover:bg-[#ffe04d] text-black font-black text-base border-[3px] border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex items-center justify-center gap-2 transition-all uppercase tracking-wide cursor-pointer"
            >
              <span>{t.disburseNow} (₹{loanAmount.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          )}
        </div>
      </div>

      {/* Reset & Pitch Actions */}
      <div className="flex items-center justify-center text-xs">
        <button
          onClick={onResetAll}
          className="flex items-center gap-2 text-black font-black py-2.5 px-5 rounded-lg border-2 border-black bg-white hover:bg-[#FFFDF5] transition-all shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer uppercase tracking-wider"
        >
          <RefreshCw className="w-4 h-4 stroke-[2.5]" />
          <span>Reset Demo Flow & Try Other Personas</span>
        </button>
      </div>
    </div>
  );
}
