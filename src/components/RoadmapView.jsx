import React from 'react';
import { ArrowRight, Sparkles, Calendar, CheckCircle2, ShieldCheck, Zap, TrendingUp, IndianRupee, Smartphone, Clock, Award } from 'lucide-react';
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
      color: 'from-sky-500 to-blue-600',
      target: `Cut monthly EMI by ₹${excessEmi.toLocaleString('en-IN')} (Target: 40% DTI)`,
      impactBadge: 'Immediate DTI Drop',
      actions: [
        {
          title: 'Close 2 Smallest BNPL Micro-Credit Lines (Simpl & LazyPay)',
          desc: `Eliminates recurring monthly payments of ₹6,300/mo, instantly reducing your monthly debt obligations.`,
          icon: <IndianRupee className="w-4 h-4 text-sky-500" />
        },
        {
          title: 'Enable Paytm UPI Auto-Debit for Essential Two-Wheeler Loan',
          desc: 'Ensures 100% timely payment record (0 DPD) without manual memory slip-ups.',
          icon: <Smartphone className="w-4 h-4 text-blue-500" />
        }
      ]
    },
    {
      phaseNumber: 2,
      badge: 'Days 31–60',
      title: 'Phase 2: Cashflow Velocity & Buffer Building',
      color: 'from-blue-600 to-indigo-600',
      target: 'Prove steady income stability with 25+ monthly UPI inflows',
      impactBadge: 'Account Aggregator Boost',
      actions: [
        {
          title: 'Route Gig / Business Inflows via Paytm QR & Payments Bank',
          desc: 'Creates a verifiable, continuous daily inflow record for alternate cashflow underwriting.',
          icon: <Zap className="w-4 h-4 text-indigo-500" />
        },
        {
          title: 'Build ₹3,000 Liquid Buffer in Paytm Vault / Gold',
          desc: 'Shields you from needing emergency short-term high-interest apps during monthly crunches.',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />
        }
      ]
    },
    {
      phaseNumber: 3,
      badge: 'Days 61–90',
      title: 'Phase 3: Bureau Refresh & Pre-Approved Sanction',
      color: 'from-emerald-600 to-teal-600',
      target: 'Maintain <30% card utilization & trigger 0-inquiry soft check',
      impactBadge: '100% Pre-Approved Offer',
      actions: [
        {
          title: 'Keep Revolving Credit Card Utilization strictly below 30%',
          desc: 'Provides a fast 25 to 40 point boost to CIBIL & Experian bureau risk scores.',
          icon: <TrendingUp className="w-4 h-4 text-teal-500" />
        },
        {
          title: 'Trigger Sahayak Zero-Inquiry Soft Bureau Refresh',
          desc: 'Confirms your DTI is now <38% and generates a pre-approved, guaranteed loan offer.',
          icon: <Award className="w-4 h-4 text-amber-500" />
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00BAF2]/15 text-[#0084B4]">
          <Sparkles className="w-3.5 h-3.5 text-[#00BAF2]" />
          Custom Engineered Recovery Plan
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#002970]">
          {t.roadmapTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {lang === 'en'
            ? 'A 3-phase, milestone-driven journey designed for Indian credit bureau refresh cycles. Follow these steps to hit 100% loan eligibility.'
            : 'भारतीय क्रेडिट ब्यूरो के नियमों के अनुसार तैयार किया गया 3-चरणों का आसान प्लान। इसे पूरा करते ही लोन अप्रूवल पक्का है।'}
        </p>
      </div>

      {/* 90-Day Visual Timeline Container */}
      <div className="space-y-6 relative">
        {phases.map((phase, idx) => (
          <div
            key={phase.phaseNumber}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card hover:border-[#00BAF2] transition-all relative overflow-hidden group"
          >
            {/* Top Phase Ribbon */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${phase.color} text-white font-extrabold flex items-center justify-center shadow-md text-sm`}>
                  M{phase.phaseNumber}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#002970]">
                    {phase.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-400">
                    Milestone Window: {phase.badge}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-blue-50 text-[#0084B4] font-extrabold text-xs px-3 py-1 rounded-full border border-blue-100">
                  {phase.impactBadge}
                </span>
              </div>
            </div>

            {/* Target Goal Summary */}
            <div className="my-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#00BAF2]" />
                {phase.target}
              </span>
              <span className="font-bold text-[#002970]">30 Days Window</span>
            </div>

            {/* Specific Trackable Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {phase.actions.map((action, actionIdx) => (
                <div
                  key={actionIdx}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs hover:shadow-soft transition-all space-y-1.5"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 mt-0.5">
                      {action.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#002970]">
                        {action.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
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

      {/* Why Indian Underwriting Models Favor This Plan */}
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-6 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#002970]">
            <ShieldCheck className="w-4 h-4 text-[#00B37E]" />
            <span>Underwriting Assurance</span>
          </div>
          <p className="text-xs text-slate-600">
            Credit bureaus (CIBIL, Experian) refresh on 30-45 day cycles. By Day 90, all closed BNPLs and disciplined UPI inflows are permanently recorded, qualifying you for top-tier interest rates.
          </p>
        </div>

        <button
          onClick={onProceedToDashboard}
          className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#002970] hover:bg-[#001944] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
        >
          <span>Open Interactive Progress Tracker</span>
          <ArrowRight className="w-4 h-4 text-[#00BAF2]" />
        </button>
      </div>
    </div>
  );
}
