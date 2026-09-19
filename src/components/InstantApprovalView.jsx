import React, { useState } from 'react';
import { CheckCircle, Trophy, Sparkles, ArrowRight, Smartphone, RefreshCw, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InstantApprovalView({
  applicant,
  onResetAll,
  lang = 'en'
}) {
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [isDisbursed, setIsDisbursed] = useState(false);

  const loanAmount = Number(applicant.requestedLoanAmount) || 200000;
  const tenure = Number(applicant.tenureMonths) || 24;
  const monthlyEmi = Math.round((loanAmount * 1.095) / tenure);

  const handleDisburse = () => {
    setIsDisbursing(true);
    setTimeout(() => {
      setIsDisbursing(false);
      setIsDisbursed(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-[#002970] via-[#001944] to-[#00B37E] text-white rounded-3xl p-8 sm:p-12 text-center shadow-card relative overflow-hidden space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-2">
          <CheckCircle className="w-10 h-10 text-[#00BAF2]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-400 text-emerald-950">
          <Sparkles className="w-3.5 h-3.5" />
          Direct Pre-Approved Eligibility
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Congratulations {applicant.fullName || 'Amit'}! Your Loan is Approved!
        </h1>

        <p className="text-sm sm:text-base text-blue-100 max-w-lg mx-auto">
          Your EMI-to-income ratio is in the top tier (20.0%), safely below the 40% threshold. You qualify for instant direct disbursement.
        </p>
      </div>

      {/* Loan Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6">
        <h3 className="text-lg font-bold text-[#002970] border-b border-slate-100 pb-3">
          Sanction Terms Summary
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="text-xs text-slate-500 font-semibold">Approved Amount</span>
            <div className="text-xl font-black text-[#002970] mt-1">₹{loanAmount.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="text-xs text-slate-500 font-semibold">Interest Rate</span>
            <div className="text-xl font-black text-[#0084B4] mt-1">9.99% p.a.</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="text-xs text-slate-500 font-semibold">Monthly EMI</span>
            <div className="text-xl font-black text-[#002970] mt-1">₹{monthlyEmi.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl">
            <span className="text-xs text-slate-500 font-semibold">Tenure</span>
            <div className="text-xl font-black text-emerald-600 mt-1">{tenure} Months</div>
          </div>
        </div>

        {/* 1-Click Action */}
        <div className="pt-2">
          {isDisbursed ? (
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center space-y-2 animate-in zoom-in-95">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-900">
                ₹{loanAmount.toLocaleString('en-IN')} Transferred to Paytm Payments Bank
              </h4>
              <p className="text-xs text-emerald-700">
                Transaction ID: <strong>PTM-INSTANT-APPROVED-9941</strong>
              </p>
            </div>
          ) : isDisbursing ? (
            <div className="bg-[#002970] text-white p-6 rounded-2xl text-center space-y-2 shadow-lg">
              <RefreshCw className="w-6 h-6 text-[#00BAF2] animate-spin mx-auto" />
              <span className="text-sm font-bold">Transferring funds to your Paytm Payments Bank account...</span>
            </div>
          ) : (
            <button
              onClick={handleDisburse}
              className="w-full py-4 px-6 rounded-2xl bg-[#00BAF2] hover:bg-[#00a6d9] text-[#002970] font-black text-base shadow-lg shadow-[#00BAF2]/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>Disburse ₹{loanAmount.toLocaleString('en-IN')} Instantly</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onResetAll}
          className="text-xs font-bold text-slate-500 hover:text-[#002970] flex items-center gap-1.5 p-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Test Another Persona (e.g. Rahul Sharma with 56% DTI)</span>
        </button>
      </div>
    </div>
  );
}
