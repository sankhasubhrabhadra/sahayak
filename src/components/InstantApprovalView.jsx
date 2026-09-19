import React, { useState } from 'react';
import { Trophy, Sparkles, ArrowRight, Smartphone, RefreshCw, Volume2, Radio, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateReducingEmi } from '../utils/financialEngine';

export default function InstantApprovalView({
  applicant,
  onResetAll,
  lang = 'en'
}) {
  const [isDisbursing, setIsDisbursing] = useState(false);
  const [isDisbursed, setIsDisbursed] = useState(false);

  const loanAmount = Number(applicant.requestedLoanAmount) || 200000;
  const tenure = Number(applicant.tenureMonths) || 24;
  const interestRate = 9.99;
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
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }, 1100);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xs space-y-3">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
          <CheckCircle2 className="w-7 h-7 text-white" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          Paytm Pre-Approved Instant Sanction
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Congratulations {applicant.fullName || 'Amit'}!
        </h1>

        <p className="text-xs sm:text-sm text-emerald-100 font-normal max-w-lg mx-auto leading-relaxed">
          Your EMI-to-income ratio is 20.0%, comfortably below the 40% threshold. You qualify for instant credit into your verified account.
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
            <span className="text-xs font-semibold uppercase text-slate-700">Sanction Summary</span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
            Ref: PTM-SANCTION-99218
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium uppercase">Approved Amount</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">₹{loanAmount.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium uppercase">Interest Rate</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">{interestRate}% p.a.</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium uppercase">Monthly EMI</span>
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
              {/* Paytm Soundbox 4G Voice Notification Simulation */}
              <div className="bg-[#002970] text-white rounded-2xl p-6 shadow-xs relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold relative shrink-0 border border-white/20">
                      <Volume2 className="w-6 h-6 text-[#00BAF2] animate-bounce" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-200 bg-white/10 px-2 py-0.5 rounded">
                          Paytm Soundbox 4G Audio Alert
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                          <Radio className="w-3 h-3 animate-pulse" /> 4G LIVE
                        </span>
                      </div>
                      <p className="text-lg font-bold text-white mt-1">
                        "Paytm par ₹{loanAmount.toLocaleString('en-IN')} praapt hue"
                      </p>
                      <p className="text-xs text-slate-300">
                        ₹{loanAmount.toLocaleString('en-IN')} successfully credited to Paytm Payments Bank A/c ••9412
                      </p>
                    </div>
                  </div>

                  {/* Minimal Sound Bars */}
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-6 bg-[#00BAF2] rounded-full animate-pulse" />
                    <span className="w-1.5 h-10 bg-[#FFD200] rounded-full animate-pulse delay-75" />
                    <span className="w-1.5 h-4 bg-[#00BAF2] rounded-full animate-pulse delay-150" />
                    <span className="w-1.5 h-8 bg-emerald-400 rounded-full animate-pulse delay-100" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center space-y-0.5">
                <span className="text-xs text-slate-700 font-medium block">
                  Transaction Ref: PTM-INSTANT-IMPS-{Math.floor(10000000 + Math.random() * 90000000)}
                </span>
                <span className="text-[11px] text-slate-500">
                  Auto-Debit Mandate registered on Paytm UPI with NPCI e-NACH
                </span>
              </div>
            </div>
          ) : isDisbursing ? (
            <div className="bg-slate-900 text-white p-5 rounded-2xl text-center space-y-2">
              <RefreshCw className="w-5 h-5 text-[#00BAF2] animate-spin mx-auto" />
              <span className="text-xs font-semibold text-white">Transferring funds to your Paytm Payments Bank account...</span>
            </div>
          ) : (
            <button
              onClick={handleDisburse}
              className="w-full py-4 px-5 rounded-xl bg-[#002970] hover:bg-[#001f5c] text-white font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>Disburse ₹{loanAmount.toLocaleString('en-IN')} Instantly via Paytm IMPS</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onResetAll}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-2 py-2.5 px-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span>Switch Persona to Test Rahul Sharma (56.6% DTI Rejection & 90-Day Coach)</span>
        </button>
      </div>
    </div>
  );
}

