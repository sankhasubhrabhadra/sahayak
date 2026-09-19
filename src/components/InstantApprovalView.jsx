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
      <div className="bg-[#00B37E] text-white rounded-2xl p-6 sm:p-8 text-center border-[3px] border-black shadow-brutal-lg space-y-3">
        <div className="w-14 h-14 mx-auto rounded-xl bg-white border-2 border-black flex items-center justify-center text-black shadow-brutal-sm">
          <CheckCircle2 className="w-8 h-8 text-[#00B37E]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black bg-[#FFD200] text-black border-2 border-black shadow-brutal-sm uppercase">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          Paytm Pre-Approved Instant Sanction
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          Congratulations {applicant.fullName || 'Amit'}!
        </h1>

        <p className="text-xs sm:text-sm text-white/90 font-bold max-w-lg mx-auto leading-relaxed">
          Your EMI-to-income ratio is 20.0%, comfortably below the 40% threshold. You qualify for instant credit into your verified account.
        </p>
      </div>

      {/* Loan Details */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border-[3px] border-black shadow-brutal space-y-5">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="font-black text-[#002970] text-base">Pay</span>
              <span className="font-black text-[#00BAF2] text-base">tm</span>
            </div>
            <span className="text-black font-bold">|</span>
            <span className="text-xs font-black uppercase text-black">Sanction Summary</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-black bg-[#FFD200] px-2.5 py-1 rounded border-2 border-black shadow-brutal-sm">
            Ref: PTM-SANCTION-99218
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#FFFDF5] p-3.5 rounded-xl border-2 border-black shadow-brutal-sm">
            <span className="text-[11px] text-black/60 font-black uppercase">Approved Amount</span>
            <div className="text-xl font-black text-black mt-0.5">₹{loanAmount.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-[#FFFDF5] p-3.5 rounded-xl border-2 border-black shadow-brutal-sm">
            <span className="text-[11px] text-black/60 font-black uppercase">Interest Rate</span>
            <div className="text-xl font-black text-black mt-0.5">{interestRate}% p.a.</div>
          </div>
          <div className="bg-[#FFFDF5] p-3.5 rounded-xl border-2 border-black shadow-brutal-sm">
            <span className="text-[11px] text-black/60 font-black uppercase">Monthly EMI</span>
            <div className="text-xl font-black text-black mt-0.5">₹{monthlyEmi.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-[#FFFDF5] p-3.5 rounded-xl border-2 border-black shadow-brutal-sm">
            <span className="text-[11px] text-black/60 font-black uppercase">Tenure</span>
            <div className="text-xl font-black text-[#00B37E] mt-0.5">{tenure} Months</div>
          </div>
        </div>

        {/* 1-Click Action */}
        <div className="pt-2">
          {isDisbursed ? (
            <div className="space-y-3 animate-in zoom-in-95">
              {/* Paytm Soundbox 4G Voice Notification Simulation */}
              <div className="bg-[#002970] text-white rounded-2xl p-6 border-[3px] border-black shadow-brutal relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-xl bg-[#00BAF2] text-black flex items-center justify-center font-black border-2 border-black shadow-brutal-sm relative shrink-0">
                      <Volume2 className="w-7 h-7 text-black animate-bounce" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-black bg-[#FFD200] px-2 py-0.5 rounded border border-black">
                          Paytm Soundbox 4G Audio Alert
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-[#00E699] font-black">
                          <Radio className="w-3 h-3 animate-pulse" /> 4G LIVE
                        </span>
                      </div>
                      <p className="text-lg font-black text-white mt-1">
                        "Paytm par ₹{loanAmount.toLocaleString('en-IN')} praapt hue"
                      </p>
                      <p className="text-xs text-[#00BAF2] font-semibold">
                        ₹{loanAmount.toLocaleString('en-IN')} successfully credited to Paytm Payments Bank A/c ••9412
                      </p>
                    </div>
                  </div>

                  {/* Minimal Sound Bars */}
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-6 bg-[#00BAF2] rounded-full animate-pulse" />
                    <span className="w-1.5 h-10 bg-[#FFD200] rounded-full animate-pulse delay-75" />
                    <span className="w-1.5 h-4 bg-[#00BAF2] rounded-full animate-pulse delay-150" />
                    <span className="w-1.5 h-8 bg-[#00E699] rounded-full animate-pulse delay-100" />
                  </div>
                </div>
              </div>

              <div className="bg-[#FFFDF5] rounded-xl p-3 border-2 border-black shadow-brutal-sm text-center space-y-0.5">
                <span className="text-xs text-black font-black block">
                  Transaction Ref: PTM-INSTANT-IMPS-{Math.floor(10000000 + Math.random() * 90000000)}
                </span>
                <span className="text-[11px] text-black/70 font-medium">
                  Auto-Debit Mandate registered on Paytm UPI with NPCI e-NACH
                </span>
              </div>
            </div>
          ) : isDisbursing ? (
            <div className="bg-black text-white p-5 rounded-xl text-center space-y-2 border-2 border-black shadow-brutal">
              <RefreshCw className="w-5 h-5 text-[#00BAF2] animate-spin mx-auto" />
              <span className="text-xs font-black text-white uppercase">Transferring funds to your Paytm Payments Bank account...</span>
            </div>
          ) : (
            <button
              onClick={handleDisburse}
              className="w-full py-4 px-5 rounded-xl bg-[#00BAF2] hover:bg-[#FFD200] text-black font-black text-base border-[3px] border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
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
          className="text-xs font-black text-black flex items-center gap-2 py-2 px-4 bg-white rounded-xl border-2 border-black shadow-brutal-sm hover:bg-[#FFD200] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-black" />
          <span>Switch Persona to Test Rahul Sharma (56.6% DTI Rejection & 90-Day Coach)</span>
        </button>
      </div>
    </div>
  );
}

