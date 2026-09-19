import React, { useState } from 'react';
import { ArrowRight, RefreshCw, CheckCircle2, Info } from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateReducingEmi, calculateDti } from '../utils/financialEngine';
import DemoBanner from './DemoBanner';

export default function InstantApprovalView({
  applicant,
  onResetAll,
  lang = 'en'
}) {
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [isDisbursed, setIsDisbursed] = useState(false);

  const loanAmount = Math.max(10000, Number(applicant.requestedLoanAmount) || 200000);
  const tenure = Math.max(1, Number(applicant.tenureMonths) || 24);
  const monthlyIncome = Math.max(1, Number(applicant.monthlyIncome) || 55000);
  const existingEmis = Math.max(0, Number(applicant.existingEmis) || 11000);

  const interestRate = 9.99;
  const monthlyEmi = calculateReducingEmi(loanAmount, interestRate, tenure);
  const { dti } = calculateDti(existingEmis, monthlyIncome);

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

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-200">
      <DemoBanner lang={lang} />

      {/* Top Banner */}
      <div className="bg-emerald-700 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xs space-y-3">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
          <CheckCircle2 className="w-7 h-7 text-white" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-white/20 text-white border border-white/30">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
          <span>Simulated Pre-Approval Sanction Preview</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Illustrative Pre-Approval: {applicant.fullName || 'Amit Patel'}
        </h1>

        <p className="text-xs sm:text-sm text-emerald-100 font-normal max-w-lg mx-auto leading-relaxed">
          Your Debt-to-Income (DTI) ratio is {dti}%, which is comfortably below the 40% benchmark. This unlocks illustrative pre-approval terms.
        </p>
      </div>

      {/* Loan Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="font-bold text-[#002970] text-base">Pay</span>
              <span className="font-bold text-[#00BAF2] text-base">tm</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold uppercase text-slate-700">Simulated Sanction Terms</span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
            Ref: PTM-DEMO-{Math.floor(100000 + Math.random() * 900000)}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium uppercase">Requested Amount</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">₹{loanAmount.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium uppercase">Illustrative Rate</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">{interestRate}% p.a.</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium uppercase">Estimated EMI</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">₹{monthlyEmi.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium uppercase">Tenure</span>
            <div className="text-xl font-bold text-emerald-600 mt-0.5">{tenure} Months</div>
          </div>
        </div>

        {/* 1-Click Action */}
        <div className="pt-2">
          {isDisbursed ? (
            <div className="space-y-3 animate-in zoom-in-95">
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs space-y-3 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
            <div className="bg-slate-900 text-white p-5 rounded-2xl text-center space-y-2">
              <RefreshCw className="w-5 h-5 text-[#00BAF2] animate-spin mx-auto" />
              <span className="text-xs font-semibold text-white">Simulating milestone sanction process...</span>
            </div>
          ) : (
            <button
              onClick={handleDisburse}
              className="w-full py-3 px-5 rounded-lg bg-[#002970] hover:bg-[#001f5c] text-white font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>Simulate Sanction Outcome for ₹{loanAmount.toLocaleString('en-IN')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onResetAll}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2 py-2 px-4 bg-white rounded-lg border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span>Switch Persona to Test Rahul Sharma (56.6% DTI Rejection & 90-Day Coach)</span>
        </button>
      </div>
    </div>
  );
}
