import React from 'react';
import { ArrowRight, Sparkles, Calendar, CheckCircle2, ShieldCheck, Zap, TrendingUp, IndianRupee, Smartphone, Clock, Award, Activity } from 'lucide-react';
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
      target: `Cut monthly EMI by ₹${excessEmi.toLocaleString('en-IN')} (Target: 40% DTI)`,
      impactBadge: 'Immediate DTI Drop',
      actions: [
        {
          title: 'Close 2 Smallest BNPL Micro-Credit Lines (Simpl & LazyPay)',
          desc: `Eliminates recurring monthly payments of ₹6,300/mo, immediately reducing your debt obligations before next fortnightly bureau refresh.`,
          icon: <IndianRupee className="w-4 h-4 text-slate-700" />
        },
        {
          title: 'Enable Paytm UPI Auto-Debit for Essential Two-Wheeler Loan',
          desc: 'Ensures 100% timely payment record (0 DPD) without manual memory slip-ups.',
          icon: <Smartphone className="w-4 h-4 text-slate-700" />
        }
      ]
    },
    {
      phaseNumber: 2,
      badge: 'Days 31–60',
      title: 'Phase 2: Cashflow Velocity & Buffer Building',
      target: 'Prove steady income stability with 25+ monthly UPI inflows',
      impactBadge: 'Account Aggregator Boost',
      actions: [
        {
          title: 'Route Gig / Business Inflows via Paytm QR & Payments Bank',
          desc: 'Creates a verifiable, continuous daily inflow record for alternate cashflow underwriting.',
          icon: <Zap className="w-4 h-4 text-slate-700" />
        },
        {
          title: 'Build ₹3,000 Liquid Buffer in Paytm Vault / Gold',
          desc: 'Shields you from needing emergency short-term high-interest apps during monthly crunches.',
          icon: <ShieldCheck className="w-4 h-4 text-slate-700" />
        }
      ]
    },
    {
      phaseNumber: 3,
      badge: 'Days 61–90',
      title: 'Phase 3: Bureau Ingestion & Pre-Approved Sanction',
      target: 'Maintain <30% card utilization & trigger 0-inquiry soft check',
      impactBadge: 'Instant Sanction',
      actions: [
        {
          title: 'Keep Revolving Credit Card Utilization strictly below 30%',
          desc: 'Demonstrates low revolving debt usage across RBI fortnightly reporting cycles (15th and month-end).',
          icon: <TrendingUp className="w-4 h-4 text-slate-700" />
        },
        {
          title: 'Trigger Sahayak Zero-Inquiry Soft Bureau Refresh',
          desc: 'Confirms your DTI is now <40% and unlocks pre-approved loan sanctions across partner banks.',
          icon: <Award className="w-4 h-4 text-slate-700" />
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-[#002970]" />
          Paytm 90-Day Credit Transformation Pathway
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {t.roadmapTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          {lang === 'en'
            ? 'A structured 3-phase planning roadmap aligned with RBI fortnightly credit reporting cycles to systematically rebuild your borrowing profile.'
            : 'क्रेडिट ब्यूरो नियमों के अनुसार तैयार किया गया 3-चरणों का आसान प्लान जो आपकी लोन पात्रता को मजबूत बनाता है।'}
        </p>
      </div>

      {/* 90-Day Timeline Cards */}
      <div className="space-y-4">
        {phases.map((phase) => (
          <div
            key={phase.phaseNumber}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-4"
          >
            {/* Top Phase Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                  M{phase.phaseNumber}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {phase.title}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Milestone Window: {phase.badge}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-2.5 py-1 rounded-md border border-slate-200">
                  {phase.impactBadge}
                </span>
              </div>
            </div>

            {/* Target Goal Summary */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                {phase.target}
              </span>
              <span className="font-semibold text-slate-900">30 Days Window</span>
            </div>

            {/* Specific Trackable Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {phase.actions.map((action, actionIdx) => (
                <div
                  key={actionIdx}
                  className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/60 space-y-1.5"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white border border-slate-200 mt-0.5 shrink-0">
                      {action.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900">
                        {action.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
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
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Activity className="w-4 h-4 text-[#002970]" />
            <span>RBI Fortnightly Reporting Synchronization</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Credit bureaus (CIBIL, Experian, CRIF) ingest bank repayments every 15 days (by the 15th and month-end). By Day 90, all closed BNPLs and disciplined UPI inflows are permanently updated, qualifying you for lowest interest rates.
          </p>
        </div>

        <button
          onClick={onProceedToDashboard}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#002970] hover:bg-[#001f5c] text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all whitespace-nowrap"
        >
          <span>Open Interactive Progress Tracker</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
