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
      color: 'bg-[#FFD200]',
      target: `Cut monthly EMI by ₹${excessEmi.toLocaleString('en-IN')} (Target: 40% DTI)`,
      impactBadge: 'Immediate DTI Drop',
      actions: [
        {
          title: 'Close 2 Smallest BNPL Micro-Credit Lines (Simpl & LazyPay)',
          desc: `Eliminates recurring monthly payments of ₹6,300/mo, immediately reducing your debt obligations before next fortnightly bureau refresh.`,
          icon: <IndianRupee className="w-5 h-5 text-black" />
        },
        {
          title: 'Enable Paytm UPI Auto-Debit for Essential Two-Wheeler Loan',
          desc: 'Ensures 100% timely payment record (0 DPD) without manual memory slip-ups.',
          icon: <Smartphone className="w-5 h-5 text-black" />
        }
      ]
    },
    {
      phaseNumber: 2,
      badge: 'Days 31–60',
      title: 'Phase 2: Cashflow Velocity & Buffer Building',
      color: 'bg-[#00BAF2]',
      target: 'Prove steady income stability with 25+ monthly UPI inflows',
      impactBadge: 'Account Aggregator Boost',
      actions: [
        {
          title: 'Route Gig / Business Inflows via Paytm QR & Payments Bank',
          desc: 'Creates a verifiable, continuous daily inflow record for alternate cashflow underwriting.',
          icon: <Zap className="w-5 h-5 text-black" />
        },
        {
          title: 'Build ₹3,000 Liquid Buffer in Paytm Vault / Gold',
          desc: 'Shields you from needing emergency short-term high-interest apps during monthly crunches.',
          icon: <ShieldCheck className="w-5 h-5 text-black" />
        }
      ]
    },
    {
      phaseNumber: 3,
      badge: 'Days 61–90',
      title: 'Phase 3: Bureau Ingestion & Pre-Approved Sanction',
      color: 'bg-[#00B37E]',
      target: 'Maintain <30% card utilization & trigger 0-inquiry soft check',
      impactBadge: 'Instant Sanction',
      actions: [
        {
          title: 'Keep Revolving Credit Card Utilization strictly below 30%',
          desc: 'Demonstrates low revolving debt usage across RBI fortnightly reporting cycles (15th and month-end).',
          icon: <TrendingUp className="w-5 h-5 text-black" />
        },
        {
          title: 'Trigger Sahayak Zero-Inquiry Soft Bureau Refresh',
          desc: 'Confirms your DTI is now <40% and unlocks pre-approved loan sanctions across partner banks.',
          icon: <Award className="w-5 h-5 text-black" />
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black bg-[#FFD200] text-black border-2 border-black shadow-brutal-sm uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-black" />
          Paytm 90-Day Credit Transformation Pathway
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight">
          {t.roadmapTitle}
        </h1>
        <p className="text-xs sm:text-sm text-black/70 font-medium max-w-xl mx-auto">
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
            className="bg-white rounded-xl p-6 border-[3px] border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm transition-all space-y-4"
          >
            {/* Top Phase Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${phase.color} text-black font-black flex items-center justify-center text-sm border-2 border-black shadow-brutal-sm`}>
                  M{phase.phaseNumber}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-black">
                    {phase.title}
                  </h3>
                  <span className="text-xs font-bold text-black/60 uppercase">
                    Milestone Window: {phase.badge}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-[#FFFDF5] text-black font-black text-xs px-2.5 py-1 border-2 border-black shadow-brutal-sm uppercase">
                  {phase.impactBadge}
                </span>
              </div>
            </div>

            {/* Target Goal Summary */}
            <div className="bg-[#FFFDF5] p-3 rounded-lg border-2 border-black shadow-brutal-sm flex items-center justify-between text-xs">
              <span className="font-bold text-black flex items-center gap-2">
                <Clock className="w-4 h-4 text-black" />
                {phase.target}
              </span>
              <span className="font-black bg-[#FFD200] px-2 py-0.5 border border-black">30 Days Window</span>
            </div>

            {/* Specific Trackable Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {phase.actions.map((action, actionIdx) => (
                <div
                  key={actionIdx}
                  className="bg-[#FFFDF5] p-4 rounded-lg border-2 border-black shadow-brutal-sm space-y-1.5"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white border-2 border-black mt-0.5 shrink-0 shadow-brutal-sm">
                      {action.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-black">
                        {action.title}
                      </h4>
                      <p className="text-[11px] text-black/70 font-medium leading-relaxed mt-0.5">
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
      <div className="bg-white rounded-xl p-6 border-[3px] border-black shadow-brutal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-black text-black uppercase">
            <Activity className="w-4 h-4 text-black" />
            <span>RBI Fortnightly Reporting Synchronization</span>
          </div>
          <p className="text-xs text-black/70 font-medium leading-relaxed">
            Credit bureaus (CIBIL, Experian, CRIF) ingest bank repayments every 15 days (by the 15th and month-end). By Day 90, all closed BNPLs and disciplined UPI inflows are permanently updated, qualifying you for lowest interest rates.
          </p>
        </div>

        <button
          onClick={onProceedToDashboard}
          className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#00BAF2] hover:bg-[#FFD200] text-black font-black text-xs sm:text-sm border-2 border-black shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <span>Open Interactive Progress Tracker</span>
          <ArrowRight className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
}

