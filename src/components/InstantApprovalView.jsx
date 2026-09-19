import React, { useState } from 'react';
import { CheckCircle, Trophy, Sparkles, ArrowRight, Smartphone, RefreshCw, ShieldCheck, Volume2, Radio, CheckCircle2 } from 'lucide-react';
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
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#002970] via-[#001f5c] to-[#001438] text-white rounded-3xl p-8 sm:p-12 text-center shadow-card relative overflow-hidden space-y-4">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#00BAF2]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#00BAF2]/20 border border-[#00BAF2]/30 flex items-center justify-center text-[#00BAF2] mb-2">
          <CheckCircle2 className="w-10 h-10 text-[#00BAF2]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#00BAF2] text-[#002970]">
          <Sparkles className="w-3.5 h-3.5" />
          Paytm Pre-Approved Instant Sanction
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Congratulations {applicant.fullName || 'Amit'}!
        </h1>

        <p className="text-sm sm:text-base text-blue-100 max-w-lg mx-auto">
          Your EMI-to-income ratio is in the top tier (20.0%), comfortably below the 40% benchmark. You qualify for instant direct credit into your Paytm Payments Bank account.
        </p>
      </div>

      {/* Loan Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="font-black text-[#002970] text-base">Pay</span>
              <span className="font-black text-[#00BAF2] text-base">tm</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold text-slate-500">Sanction Summary</span>
          </div>
          <span className="text-[11px] font-mono text-[#0084B4] bg-[#E8F7FD] px-2.5 py-1 rounded-md font-bold">
            Ref: PTM-SANCTION-99218
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold">Approved Amount</span>
            <div className="text-xl font-black text-[#002970] mt-1">₹{loanAmount.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold">Interest Rate</span>
            <div className="text-xl font-black text-[#0084B4] mt-1">{interestRate}% p.a.</div>
          </div>
          <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold">Monthly EMI</span>
            <div className="text-xl font-black text-[#002970] mt-1">₹{monthlyEmi.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-500 font-semibold">Tenure</span>
            <div className="text-xl font-black text-emerald-600 mt-1">{tenure} Months</div>
          </div>
        </div>

        {/* 1-Click Action */}
        <div className="pt-2">
          {isDisbursed ? (
            <div className="space-y-4 animate-in zoom-in-95">
              {/* Paytm Soundbox 4G Voice Notification Simulation */}
              <div className="bg-gradient-to-br from-[#002970] to-[#001944] text-white rounded-3xl p-6 border-2 border-[#00BAF2] shadow-xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#00BAF2] text-[#002970] flex items-center justify-center font-black shadow-lg shadow-[#00BAF2]/30 relative">
                      <Volume2 className="w-7 h-7 animate-bounce" />
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#002970] animate-ping" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-[#00BAF2] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                          Paytm Soundbox 4G Audio Alert
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                          <Radio className="w-3 h-3 animate-pulse" /> 4G LIVE
                        </span>
                      </div>
                      <p className="text-lg font-black text-white mt-1 italic font-sans">
                        "Paytm par ₹{loanAmount.toLocaleString('en-IN')} praapt hue!"
                      </p>
                      <p className="text-xs text-blue-200">
                        ₹{loanAmount.toLocaleString('en-IN')} successfully credited to Paytm Payments Bank A/c ••9412
                      </p>
                    </div>
                  </div>

                  {/* Equalizer Sound Waves */}
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-6 bg-[#00BAF2] rounded-full animate-pulse" />
                    <span className="w-1.5 h-10 bg-emerald-400 rounded-full animate-pulse delay-75" />
                    <span className="w-1.5 h-4 bg-[#00BAF2] rounded-full animate-pulse delay-150" />
                    <span className="w-1.5 h-8 bg-teal-300 rounded-full animate-pulse delay-100" />
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-center space-y-1">
                <span className="text-xs text-emerald-800 font-bold block">
                  Transaction Ref: PTM-INSTANT-IMPS-{Math.floor(10000000 + Math.random() * 90000000)}
                </span>
                <span className="text-[11px] text-slate-500">
                  Auto-Debit Mandate registered on Paytm UPI with NPCI e-NACH
                </span>
              </div>
            </div>
          ) : isDisbursing ? (
            <div className="bg-[#002970] text-white p-6 rounded-2xl text-center space-y-2 shadow-lg">
              <RefreshCw className="w-6 h-6 text-[#00BAF2] animate-spin mx-auto" />
              <span className="text-sm font-bold">Transferring funds to your Paytm Payments Bank account...</span>
            </div>
          ) : (
            <button
              onClick={handleDisburse}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00BAF2] to-[#0084B4] hover:opacity-95 text-[#002970] font-black text-base shadow-lg shadow-[#00BAF2]/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
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
          className="text-xs font-bold text-slate-500 hover:text-[#002970] flex items-center gap-1.5 p-2 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-[#00BAF2] transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-[#00BAF2]" />
          <span>Switch Persona to Test Rahul Sharma (56.6% DTI Rejection & 90-Day Coach)</span>
        </button>
      </div>
    </div>
  );
}
