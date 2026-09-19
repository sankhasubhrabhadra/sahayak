import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Building2,
  Clock,
  IndianRupee,
  Check,
  ChevronRight,
  Info,
  Calendar,
  Zap,
  HelpCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRANSLATIONS } from '../data/mockData';

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

  // Realistic eligible amounts calculated based on user's income and headroom:
  // Offer 1: Safe micro-ticket (keeps total DTI <= 36%)
  const offer1Amount = Math.max(30000, Math.min(originalRequest - 30000, Math.round((monthlyIncome * 1.8) / 5000) * 5000));
  const offer1Tenure = 18;
  const offer1Rate = '11.49%';
  const offer1Emi = Math.round((offer1Amount * 1.11) / offer1Tenure);

  // Offer 2: Extended Tenure Medium-Ticket (Account Aggregator backed)
  const offer2Amount = Math.max(45000, Math.min(originalRequest - 15000, Math.round((monthlyIncome * 2.4) / 5000) * 5000));
  const offer2Tenure = 24;
  const offer2Rate = '12.25%';
  const offer2Emi = Math.round((offer2Amount * 1.15) / offer2Tenure);

  // Offer 3: BNPL Debt Consolidation / Refinance Loan
  const offer3Amount = Math.max(50000, Math.min(originalRequest, Math.round((monthlyIncome * 2.8) / 5000) * 5000));
  const offer3Tenure = 36;
  const offer3Rate = '10.99%';
  const offer3Emi = Math.round((offer3Amount * 1.18) / offer3Tenure);

  const offers = [
    {
      id: 'offer-1',
      lenderName: 'Paytm Lending Partner (Hero Fincorp)',
      lenderType: 'Pre-Approved NBFC Partner',
      logoBadge: 'Hero',
      logoBg: 'bg-rose-50 text-rose-700 border-rose-200',
      eligibleAmount: offer1Amount,
      interestRate: offer1Rate,
      tenureMonths: offer1Tenure,
      monthlyEmi: offer1Emi,
      isBestMatch: true,
      approvalProbability: '96% Match Score',
      approvalTag: lang === 'en' ? 'Likely to be Approved' : 'पक्की अप्रूवल संभावना',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      whyFits: lang === 'en'
        ? `Based on your monthly income of ₹${monthlyIncome.toLocaleString('en-IN')}, this ₹${offer1Amount.toLocaleString('en-IN')} amount keeps your new EMI to ₹${offer1Emi.toLocaleString('en-IN')}/mo, keeping your overall EMI ratio under 36%.`
        : `आपकी ₹${monthlyIncome.toLocaleString('en-IN')} आमदनी के अनुसार, यह ₹${offer1Amount.toLocaleString('en-IN')} लोन आपकी ईएमआई को सुरक्षित 36% सीमा के अंदर रखता है।`,
      features: [
        'Instant Disbursal via Paytm UPI in 2 mins',
        '0 Physical Documentation (e-KYC verified)',
        'Zero prepayment penalty after 6 months'
      ]
    },
    {
      id: 'offer-2',
      lenderName: 'Tata Capital / Axis Co-Lend',
      lenderType: 'Digital Bank Partner',
      logoBadge: 'Tata',
      logoBg: 'bg-blue-50 text-[#002970] border-blue-200',
      eligibleAmount: offer2Amount,
      interestRate: offer2Rate,
      tenureMonths: offer2Tenure,
      monthlyEmi: offer2Emi,
      isBestMatch: false,
      approvalProbability: '88% Match Score',
      approvalTag: lang === 'en' ? 'High Cashflow Fit' : 'कैशफ्लो आधारित ऑफर',
      tagColor: 'bg-sky-50 text-[#0084B4] border-sky-200',
      whyFits: lang === 'en'
        ? `Evaluates your daily Paytm QR & UPI transaction frequency as alternate income proof instead of salary slips.`
        : `यह बैंक आपकी दैनिक UPI ट्रांजैक्शन की स्थिरता को देखकर बिना सैलरी स्लिप के लोन देता है।`,
      features: [
        'Flexible 12 to 24-month tenure',
        'Account Aggregator soft pull verified',
        'Direct credit to any bank account'
      ]
    },
    {
      id: 'offer-3',
      lenderName: 'Sahayak Smart Refinance (Piramal Finance)',
      lenderType: 'Debt Consolidation Special',
      logoBadge: 'Piramal',
      logoBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      eligibleAmount: offer3Amount,
      interestRate: offer3Rate,
      tenureMonths: offer3Tenure,
      monthlyEmi: offer3Emi,
      isBestMatch: false,
      approvalProbability: '91% Match Score',
      approvalTag: lang === 'en' ? 'EMI Reducer Loan' : 'ईएमआई घटाने वाला ऑफर',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
      whyFits: lang === 'en'
        ? `Consolidates your 2 scattered high-interest BNPLs into one structured loan, saving ₹2,400/month in total outflows.`
        : `यह आपके 2 महंगे BNPL लोन को एक में जोड़कर हर महीने ₹2,400 की बचत कराता है।`,
      features: [
        'Directly pays off active BNPL accounts',
        'Lowers monthly debt commitments immediately',
        'Provides bureau score boost in 30 days'
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
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* Minimalist Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00BAF2]/15 text-[#0084B4]">
            <Sparkles className="w-3.5 h-3.5 text-[#00BAF2]" />
            AI Matched Alternatives
          </span>
          <span className="text-xs text-slate-400 font-semibold">• 3 Lender Offers Available</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002970] tracking-tight">
          {lang === 'en' ? 'Best-Fit Bank & Lender Offers' : 'आपके लिए सबसे उपयुक्त बैंक ऑफर्स'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          {lang === 'en'
            ? `While your original ₹${originalRequest.toLocaleString('en-IN')} request exceeded the standard 40% EMI ratio today, our underwriting engine found 3 verified alternative offers tailored to your current cashflow with high approval rates.`
            : `यद्यपि आपकी पूरी ₹${originalRequest.toLocaleString('en-IN')} की मांग अभी ईएमआई सीमा से अधिक थी, सहायक AI ने आपकी वर्तमान आमदनी के अनुसार 3 बेहतरीन विकल्प तैयार किए हैं।`}
        </p>
      </div>

      {/* Comparison Overview Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-[#00BAF2] shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-[#002970] block">
              Why are these amounts lower than your original ask?
            </span>
            <span className="text-slate-500">
              Lenders safely approve these smaller loan tickets without triggering debt-stress flags.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 text-slate-600 font-medium">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Original Ask</span>
            <span className="font-bold text-rose-600 line-through">₹{originalRequest.toLocaleString('en-IN')}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <div className="text-left">
            <span className="text-[11px] text-[#0084B4] font-bold block">Best-Fit Range</span>
            <span className="font-extrabold text-emerald-700">₹{offer1Amount.toLocaleString('en-IN')} – ₹{offer3Amount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between relative shadow-soft hover:shadow-card group ${
              offer.isBestMatch
                ? 'border-[#00BAF2] ring-2 ring-[#00BAF2]/20'
                : 'border-slate-200/90 hover:border-[#00BAF2]/60'
            }`}
          >
            {/* Best Match Top Ribbon */}
            {offer.isBestMatch && (
              <div className="absolute -top-3 left-6 right-6 flex justify-center">
                <span className="bg-[#002970] text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#00BAF2]" />
                  Recommended Match
                </span>
              </div>
            )}

            <div className="space-y-4 pt-1">
              {/* Lender Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center border ${offer.logoBg}`}>
                      {offer.logoBadge[0]}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-[#002970] leading-snug">
                        {offer.lenderName}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {offer.lenderType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval Probability Tag */}
              <div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${offer.tagColor}`}>
                  <CheckCircle2 className="w-3 h-3" />
                  {offer.approvalTag}
                </span>
              </div>

              {/* Primary Loan Metric */}
              <div className="bg-[#F7F9FC] rounded-2xl p-4 space-y-3 border border-slate-100">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                    Eligible Loan Amount
                  </span>
                  <div className="text-2xl font-black text-[#002970] flex items-baseline gap-1">
                    <span>₹{offer.eligibleAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block">Interest Rate</span>
                    <span className="font-extrabold text-[#0084B4]">{offer.interestRate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block">Estimated EMI</span>
                    <span className="font-extrabold text-[#002970]">₹{offer.monthlyEmi.toLocaleString('en-IN')}/mo</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tenure: <strong>{offer.tenureMonths} Months</strong></span>
                </div>
              </div>

              {/* "Why this fits you" Explanation */}
              <div className="p-3 rounded-xl bg-blue-50/40 border border-blue-100/60 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-[#002970] block mb-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#00BAF2]" />
                  Why this fits you:
                </span>
                <p className="text-[11px] text-slate-600">
                  {offer.whyFits}
                </p>
              </div>

              {/* Feature bullets */}
              <ul className="space-y-1.5 text-[11px] text-slate-500">
                {offer.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#00B37E] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action button */}
            <div className="pt-5">
              <button
                onClick={() => handleApplyOffer(offer)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                  offer.isBestMatch
                    ? 'bg-[#00BAF2] hover:bg-[#00a6d9] text-[#002970] shadow-md shadow-[#00BAF2]/20 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-[#002970] hover:bg-[#001944] text-white hover:scale-[1.01]'
                }`}
              >
                <span>Apply for ₹{offer.eligibleAmount.toLocaleString('en-IN')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dual Path Decision Section: Alternative Offer NOW vs 90-Day Roadmap for Full Goal */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-[#002970] text-white">
            <Calendar className="w-3 h-3 text-[#00BAF2]" />
            Your Dual-Pathway Choice
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#002970]">
            Still need your full ₹{originalRequest.toLocaleString('en-IN')} requested amount?
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            If these lower amounts don't meet your current needs, follow our structured <strong>90-Day Sahayak Recovery Plan</strong> to eliminate high-cost debt and qualify for your full amount with 100% certainty.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={onProceedToRoadmap}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#002970] to-[#001944] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            <span>View My 90-Day Plan Instead</span>
            <ArrowRight className="w-4 h-4 text-[#00BAF2]" />
          </button>
        </div>
      </div>

      {/* Instant Application Modal Simulation */}
      {selectedOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#00BAF2] font-black flex items-center justify-center text-sm">
                  ✓
                </span>
                <div>
                  <h4 className="font-bold text-[#002970] text-sm sm:text-base">
                    {selectedOfferModal.lenderName}
                  </h4>
                  <span className="text-[11px] text-slate-400">Pre-Qualified Instant Loan Form</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedOfferModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isApplying ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-10 h-10 border-3 border-[#00BAF2] border-t-transparent rounded-full animate-spin mx-auto" />
                <h5 className="font-bold text-[#002970] text-sm">Transmitting Pre-Qualified Application...</h5>
                <p className="text-xs text-slate-400">Locking in {selectedOfferModal.interestRate} rate via Paytm Account Aggregator rails</p>
              </div>
            ) : appliedSuccess ? (
              <div className="py-4 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-extrabold text-emerald-900 text-lg">
                    Offer Sanctioned Successfully!
                  </h5>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Your <strong>₹{selectedOfferModal.eligibleAmount.toLocaleString('en-IN')}</strong> loan with {selectedOfferModal.lenderName} has been approved. EMI: <strong>₹{selectedOfferModal.monthlyEmi.toLocaleString('en-IN')}/mo</strong> for {selectedOfferModal.tenureMonths} months.
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 font-mono">
                  Ref: PTM-MATCH-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => setSelectedOfferModal(null)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    Done & Return to Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOfferModal(null);
                      onProceedToRoadmap();
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#002970] font-bold text-xs"
                  >
                    Explore 90-Day Plan Too
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
