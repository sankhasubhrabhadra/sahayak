import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRANSLATIONS } from '../data/mockData';
import { calculateReducingEmi } from '../utils/financialEngine';

export default function BestFitOffersView({
  applicant,
  onProceedToRoadmap,
  onSelectOffer,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [selectedOfferModal, setSelectedOfferModal] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const monthlyIncome = Number(applicant.monthlyIncome) || 38000;
  const existingEmis = Number(applicant.existingEmis) || 21500;
  const originalRequest = Number(applicant.requestedLoanAmount) || 150000;

  // Realistic eligible amounts calculated with reducing-balance EMI formula:
  const offer1Amount = Math.max(30000, Math.min(originalRequest - 30000, Math.round((monthlyIncome * 1.8) / 5000) * 5000));
  const offer1Tenure = 18;
  const offer1Rate = 11.49;
  const offer1Emi = calculateReducingEmi(offer1Amount, offer1Rate, offer1Tenure);

  const offer2Amount = Math.max(45000, Math.min(originalRequest - 15000, Math.round((monthlyIncome * 2.4) / 5000) * 5000));
  const offer2Tenure = 24;
  const offer2Rate = 12.25;
  const offer2Emi = calculateReducingEmi(offer2Amount, offer2Rate, offer2Tenure);

  const offer3Amount = Math.max(50000, Math.min(originalRequest, Math.round((monthlyIncome * 2.8) / 5000) * 5000));
  const offer3Tenure = 36;
  const offer3Rate = 10.99;
  const offer3Emi = calculateReducingEmi(offer3Amount, offer3Rate, offer3Tenure);

  const offers = [
    {
      id: 'offer-1',
      lenderName: 'Hero FinCorp',
      lenderType: 'Pre-Approved Micro Ticket',
      eligibleAmount: offer1Amount,
      interestRate: offer1Rate,
      tenureMonths: offer1Tenure,
      monthlyEmi: offer1Emi,
      isBestMatch: true,
      approvalTag: 'High Approval Probability',
      whyFits: `Keeps new EMI to ₹${offer1Emi.toLocaleString('en-IN')}/mo, holding your total DTI safely under 36%.`,
      features: [
        'Instant disbursal in 2 mins',
        'DigiLocker paperless KYC',
        '0 prepayment fee after 6 mo'
      ]
    },
    {
      id: 'offer-2',
      lenderName: 'Tata Capital / Axis Co-Lend',
      lenderType: 'Cashflow-Backed Digital Loan',
      eligibleAmount: offer2Amount,
      interestRate: offer2Rate,
      tenureMonths: offer2Tenure,
      monthlyEmi: offer2Emi,
      isBestMatch: false,
      approvalTag: 'Cashflow Fit',
      whyFits: `Evaluates steady daily UPI transaction velocity instead of mandatory salary slips.`,
      features: [
        'Flexible 12 to 24-month tenure',
        'Account Aggregator soft pull',
        'Direct bank account transfer'
      ]
    },
    {
      id: 'offer-3',
      lenderName: 'Piramal Finance',
      lenderType: 'BNPL Debt Consolidation',
      eligibleAmount: offer3Amount,
      interestRate: offer3Rate,
      tenureMonths: offer3Tenure,
      monthlyEmi: offer3Emi,
      isBestMatch: false,
      approvalTag: 'EMI Reducer Special',
      whyFits: `Directly settles 2 scattered high-interest BNPLs, saving ₹2,400/month in total outflows.`,
      features: [
        'Directly pays off active BNPLs',
        'Lowers monthly debt commitments',
        'Clean credit bureau update'
      ]
    }
  ];

  const handleApplyOffer = (offer) => {
    setSelectedOfferModal(offer);
    setIsApplying(true);
    setAppliedSuccess(false);

    setTimeout(() => {
      setIsApplying(false);
      setAppliedSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 900);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-block px-2.5 py-1 bg-slate-100 rounded-md font-semibold text-xs text-slate-700 border border-slate-200">
          Paytm Marketplace Matches
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {lang === 'en' ? 'Matched Alternative Bank Offers' : 'आपके लिए उपयुक्त बैंक ऑफर्स'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-2xl">
          {lang === 'en'
            ? `These calibrated loan sizes fit within your safe 40% EMI threshold with immediate pre-qualification.`
            : `यह बैंक विकल्प आपकी वर्तमान आमदनी के अनुसार सुरक्षित ईएमआई सीमा में आते हैं।`}
        </p>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between space-y-4 ${
              offer.isBestMatch
                ? 'border-[#00BAF2] shadow-sm ring-1 ring-[#00BAF2]/30'
                : 'border-slate-200/80 shadow-xs hover:border-slate-300'
            }`}
          >
            <div className="space-y-3.5">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-base text-slate-900">
                    {offer.lenderName}
                  </h3>
                  <span className="text-[11px] font-medium text-slate-500">
                    {offer.lenderType}
                  </span>
                </div>
                {offer.isBestMatch && (
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    ⭐ Top Pick
                  </span>
                )}
              </div>

              {/* Amount Box */}
              <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
                <div className="text-[11px] font-medium text-slate-500 uppercase">Approved Loan Amount</div>
                <div className="text-2xl font-bold text-slate-900">
                  ₹{offer.eligibleAmount.toLocaleString('en-IN')}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Interest</span>
                    <span className="font-semibold text-slate-900">{offer.interestRate}% p.a.</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">Monthly EMI</span>
                    <span className="font-semibold text-slate-900">₹{offer.monthlyEmi.toLocaleString('en-IN')}/mo</span>
                  </div>
                </div>
              </div>

              {/* Why it fits */}
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {offer.whyFits}
              </p>

              {/* Features */}
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                {offer.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button
              onClick={() => handleApplyOffer(offer)}
              className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99] ${
                offer.isBestMatch
                  ? 'bg-[#002970] hover:bg-[#001f5c] text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <span>Apply for ₹{offer.eligibleAmount.toLocaleString('en-IN')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* 90-Day Plan Alternative Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-slate-900">
            Still need your full ₹{originalRequest.toLocaleString('en-IN')} loan amount?
          </h4>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Follow the structured 90-day recovery plan to systematically reduce your DTI below 40%.
          </p>
        </div>

        <button
          onClick={onProceedToRoadmap}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-black text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap active:scale-[0.99]"
        >
          <span>View 90-Day Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal */}
      {selectedOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-semibold text-base text-slate-900">{selectedOfferModal.lenderName}</h4>
                <span className="text-[11px] text-slate-500">Pre-Qualified Loan Sanction</span>
              </div>
              <button
                onClick={() => setSelectedOfferModal(null)}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isApplying ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-[#002970] rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-600 font-medium">Processing pre-approval sanction...</p>
              </div>
            ) : appliedSuccess ? (
              <div className="py-2 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h5 className="font-bold text-lg text-slate-900">Offer Sanctioned!</h5>
                  <p className="text-xs text-slate-500 font-normal mt-1">
                    Your ₹{selectedOfferModal.eligibleAmount.toLocaleString('en-IN')} loan has been approved. Monthly EMI: ₹{selectedOfferModal.monthlyEmi.toLocaleString('en-IN')}.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOfferModal(null)}
                  className="w-full py-2.5 rounded-lg bg-[#002970] hover:bg-[#001f5c] text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

