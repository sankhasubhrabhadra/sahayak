import React from 'react';
import { ArrowRight, Clock, ShieldCheck, Zap, TrendingUp, IndianRupee, Smartphone, Award, Activity } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function RoadmapView({
  applicant,
  onProceedToDashboard,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const monthlyIncome = Number(applicant.monthlyIncome) || 38000;
  const existingEmis = Number(applicant.existingEmis) || 21500;
  const maxSafeEmi = Math.round(monthlyIncome * 0.40);
  const excessEmi = Math.max(0, existingEmis - maxSafeEmi);

  const phases = [
    {
      phaseNumber: 1,
      badge: 'Days 1–30',
      title: 'Phase 1: EMI Optimization & BNPL Pruning',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      target: `Cut monthly EMI by ₹${excessEmi.toLocaleString('en-IN')} (Target: 40% DTI)`,
      impactBadge: 'Immediate DTI Drop',
      actions: [
        {
          title: 'Close 2 Smallest BNPL Micro-Credit Lines (Simpl & LazyPay)',
          desc: `Eliminates recurring monthly payments of ₹6,300/mo, immediately reducing your debt obligations before next fortnightly bureau refresh.`,
          icon: <IndianRupee className="w-4 h-4 text-amber-600" />
        },
        {
          title: 'Enable Paytm UPI Auto-Debit for Essential Two-Wheeler Loan',
          desc: 'Ensures 100% timely payment record (0 DPD) without manual memory slip-ups.',
          icon: <Smartphone className="w-4 h-4 text-blue-600" />
        }
      ]
    },
    {
      phaseNumber: 2,
      badge: 'Days 31–60',
      title: 'Phase 2: Cashflow Velocity & Buffer Building',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      target: 'Prove steady income stability with 25+ monthly UPI inflows',
      impactBadge: 'Account Aggregator Boost',
      actions: [
        {
          title: 'Route Gig / Business Inflows via Paytm QR & Payments Bank',
          desc: 'Creates a verifiable, continuous daily inflow record for alternate cashflow underwriting.',
          icon: <Zap className="w-4 h-4 text-indigo-600" />
        },
        {
          title: 'Build ₹3,000 Liquid Buffer in Paytm Vault / Gold',
          desc: 'Shields you from needing emergency short-term high-interest apps during monthly crunches.',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />
        }
      ]
    },
    {
      phaseNumber: 3,
      badge: 'Days 61–90',
      title: 'Phase 3: Bureau Ingestion & Pre-Approved Sanction',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      target: 'Maintain <30% card utilization & trigger 0-inquiry soft check',
      impactBadge: 'Instant Sanction',
      actions: [
        {
          title: 'Keep Revolving Credit Card Utilization strictly below 30%',
          desc: 'Demonstrates low revolving debt usage across RBI fortnightly reporting cycles (15th and month-end).',
          icon: <TrendingUp className="w-4 h-4 text-emerald-600" />
        },
        {
          title: 'Trigger Sahayak Zero-Inquiry Soft Bureau Refresh',
          desc: 'Confirms your DTI is now <40% and unlocks pre-approved loan sanctions across partner banks.',
          icon: <Award className="w-4 h-4 text-amber-600" />
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00BAF2]" />
          <span>Paytm 90-Day Credit Transformation Pathway</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.roadmapTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl mx-auto">
          {lang === 'en'
            ? 'A structured 3-phase planning roadmap aligned with RBI fortnightly credit reporting cycles to systematically rebuild your borrowing profile.'
            : 'क्रेडिट ब्यूरो नियमों के अनुसार तैयार किया गया 3-चरणों का आसान प्लान जो आपकी लोन पात्रता को मजबूत बनाता है।'}
        </p>
      </div>

      {/* 90-Day Timeline Cards */}
      <div className="space-y-5">
        {phases.map((phase) => (
          <div
            key={phase.phaseNumber}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all space-y-4"
          >
            {/* Top Phase Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg ${phase.color} font-bold flex items-center justify-center text-xs border`}>
                  M{phase.phaseNumber}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    {phase.title}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Milestone Window: {phase.badge}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-slate-50 text-slate-700 font-medium text-xs px-2.5 py-1 rounded-md border border-slate-200">
                  {phase.impactBadge}
                </span>
              </div>
            </div>

            {/* Target Goal Summary */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                {phase.target}
              </span>
              <span className="font-semibold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">30 Days Window</span>
            </div>

            {/* Specific Trackable Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {phase.actions.map((action, actionIdx) => (
                <div
                  key={actionIdx}
                  className="bg-slate-50/60 p-4 rounded-xl border border-slate-100 space-y-1.5"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white border border-slate-200 mt-0.5 shrink-0 shadow-2xs">
                      {action.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900">
                        {action.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-normal leading-relaxed mt-0.5">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RBI Regulatory Compliance Note */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>RBI Fortnightly Reporting Synchronization</span>
          </div>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            Credit bureaus (CIBIL, Experian, CRIF) ingest bank repayments every 15 days (by the 15th and month-end). By Day 90, all closed BNPLs and disciplined UPI inflows are permanently updated, qualifying you for lowest interest rates.
          </p>
        </div>

        <button
          onClick={onProceedToDashboard}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#002970] hover:bg-[#001f5c] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer active:scale-[0.99]"
        >
          <span>Open Interactive Progress Tracker</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

