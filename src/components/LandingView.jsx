import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, CheckCircle2, HeartHandshake, Zap, Clock, Users, UserCheck, Smartphone, CreditCard, Shield, Landmark, Award, ChevronRight, HelpCircle, FileText, Check } from 'lucide-react';
import { DEMO_PERSONAS, TRANSLATIONS } from '../data/mockData';

export default function LandingView({
  onStartApplication,
  onSelectPersona,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const paytmQuickServices = [
    {
      title: 'Personal Loan',
      badge: 'Up to ₹5 Lakh',
      desc: 'Instant in 2 mins',
      color: 'bg-blue-50 text-[#002970] border-blue-200',
      icon: <CreditCard className="w-6 h-6 text-[#00BAF2]" />,
      action: onStartApplication
    },
    {
      title: 'Free Credit Report',
      badge: 'CIBIL / Experian',
      desc: 'RBI 15-Day Sync',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      action: onStartApplication
    },
    {
      title: 'Sahayak AI Coach',
      badge: 'Rejection Cure',
      desc: '90-Day Approval Path',
      color: 'bg-[#E8F7FD] text-[#002970] border-[#00BAF2]/40',
      icon: <Sparkles className="w-6 h-6 text-[#002970]" />,
      action: onStartApplication
    },
    {
      title: 'UPI Auto-Pay',
      badge: '0 DPD Guarantee',
      desc: 'Auto-Debit Mandate',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: <Zap className="w-6 h-6 text-amber-600" />,
      action: onStartApplication
    }
  ];

  return (
    <div className="space-y-8 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Paytm Super App Top Services Grid */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-soft">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="font-black text-[#002970] text-base tracking-tighter">Pay</span>
              <span className="font-black text-[#00BAF2] text-base tracking-tighter">tm</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-black text-[#002970] uppercase tracking-wider">Financial Services & Loans</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Digital & RBI Registered
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4">
          {paytmQuickServices.map((srv, idx) => (
            <button
              key={idx}
              onClick={srv.action}
              className="p-4 rounded-2xl bg-[#F7F9FC] hover:bg-[#E8F7FD] border border-slate-200/90 hover:border-[#00BAF2] transition-all text-left group flex flex-col justify-between space-y-3 cursor-pointer shadow-xs hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-xs border border-slate-100 group-hover:scale-105 transition-transform">
                  {srv.icon}
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-white text-[#002970] border border-slate-200 shadow-2xs">
                  {srv.badge}
                </span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#002970] group-hover:text-[#0084B4] transition-colors">
                  {srv.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{srv.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Official Paytm Hero Banner: Sahayak AI Personal Loan & Credit Coach */}
      <div className="relative overflow-hidden rounded-3xl bg-[#002970] text-white p-6 sm:p-10 lg:p-12 shadow-card border border-blue-900">
        <div className="relative z-10 max-w-3xl space-y-5">
          {/* Tag Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#00BAF2] text-[#002970] shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Paytm Build for India Hackathon 2026
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-blue-100 border border-white/10">
              <Landmark className="w-3.5 h-3.5 text-[#00BAF2]" />
              Track: AI-Powered Financial Journeys
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            {t.heroTagline}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-blue-100/90 font-medium leading-relaxed max-w-2xl">
            {t.heroSubtitle}
          </p>

          {/* Quick CTA Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onStartApplication}
              className="inline-flex items-center justify-center gap-2 bg-[#00BAF2] hover:bg-[#00a6d9] text-[#002970] font-black px-8 py-3.5 rounded-xl text-sm sm:text-base shadow-lg shadow-[#00BAF2]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{t.checkAppBtn}</span>
              <ArrowRight className="w-5 h-5 text-[#002970]" />
            </button>

            <div className="flex items-center gap-2 px-4 py-3 bg-white/10 rounded-xl border border-white/10 text-xs text-blue-100">
              <Clock className="w-4 h-4 text-[#00BAF2]" />
              <span>Evaluated in 30 Seconds • 0 Bureau Score Impact</span>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/15 text-xs text-blue-100 font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00B37E]" />
              <span>Soft Inquiries Only</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#00BAF2]" />
              <span>Tailored for Gig & MSME</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>90-Day Guaranteed Pathway</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 1-Click Interactive Hackathon Demo Personas */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#002970] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00BAF2]" />
              {lang === 'en' ? 'Select a Persona to Demo the Journey' : 'डेमो प्रोफाइल से तुरंत टेस्ट करें'}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'en'
                ? 'Test how Paytm Sahayak analyzes high DTI loan rejection and builds an actionable 90-day recovery pathway.'
                : 'पिच डेमो के लिए नीचे दिए गए किसी भी प्रोफाइल पर क्लिक करके तुरंत पूरी यात्रा देखें।'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DEMO_PERSONAS.map((persona) => {
            const isApproved = persona.id === 'amit';
            return (
              <div
                key={persona.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#00BAF2] shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2.5 bg-[#F7F9FC] rounded-2xl border border-slate-100 group-hover:scale-105 transition-transform">
                        {persona.avatar}
                      </span>
                      <div>
                        <h3 className="font-black text-base text-[#002970]">{persona.name}</h3>
                        <p className="text-xs font-semibold text-slate-500">{persona.tag}</p>
                      </div>
                    </div>
                    {isApproved ? (
                      <span className="bg-emerald-50 text-emerald-800 font-black text-[10px] px-2.5 py-1 rounded-full border border-emerald-200">
                        20% DTI (Pass)
                      </span>
                    ) : (
                      <span className="bg-rose-50 text-rose-800 font-black text-[10px] px-2.5 py-1 rounded-full border border-rose-200">
                        {persona.diagnosisNotes.dtiPercent}% DTI (Rejected)
                      </span>
                    )}
                  </div>

                  <div className="bg-[#F7F9FC] rounded-2xl p-3.5 space-y-1.5 text-xs text-slate-700 border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Monthly Income:</span>
                      <span className="font-black text-[#002970]">₹{persona.monthlyIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Existing EMIs:</span>
                      <span className="font-black text-rose-600">₹{persona.existingEmis.toLocaleString('en-IN')}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Requested Loan:</span>
                      <span className="font-black text-[#0084B4]">₹{persona.requestedLoanAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 bg-[#E8F7FD] p-3 rounded-xl border border-[#00BAF2]/30 space-y-1">
                    <span className="text-[10px] font-black text-[#002970] uppercase tracking-wider block">
                      Paytm Sahayak Diagnosis:
                    </span>
                    <p className="text-[11px] text-slate-700 leading-snug">
                      "{persona.diagnosisNotes.quickWin}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPersona(persona.id)}
                  className={`mt-5 w-full py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isApproved
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      : 'bg-[#002970] hover:bg-[#001944] text-white shadow-sm'
                  }`}
                >
                  <span>{isApproved ? 'Test Instant Sanction Flow' : 'Test Rejection & Recovery Journey'}</span>
                  <ArrowRight className="w-4 h-4 text-[#00BAF2]" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Official Paytm Lending Partners Ribbon */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-black text-slate-400 uppercase tracking-wider">
          <span>Official RBI-Registered Paytm Lending Partners</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <div className="p-3 bg-[#F7F9FC] rounded-2xl border border-slate-200 flex items-center justify-center gap-2 text-xs font-black text-[#002970]">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
            <span>Hero FinCorp</span>
          </div>
          <div className="p-3 bg-[#F7F9FC] rounded-2xl border border-slate-200 flex items-center justify-center gap-2 text-xs font-black text-[#002970]">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-800 shrink-0" />
            <span>Tata Capital</span>
          </div>
          <div className="p-3 bg-[#F7F9FC] rounded-2xl border border-slate-200 flex items-center justify-center gap-2 text-xs font-black text-[#002970]">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-700 shrink-0" />
            <span>Piramal Capital</span>
          </div>
          <div className="p-3 bg-[#F7F9FC] rounded-2xl border border-slate-200 flex items-center justify-center gap-2 text-xs font-black text-[#002970]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-700 shrink-0" />
            <span>Aditya Birla Capital</span>
          </div>
          <div className="p-3 bg-[#F7F9FC] rounded-2xl border border-slate-200 flex items-center justify-center gap-2 text-xs font-black text-[#002970] col-span-2 sm:col-span-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 shrink-0" />
            <span>Suryoday SFB</span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 font-semibold border-t border-slate-100">
          <span className="flex items-center gap-1 text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            DigiLocker Paperless e-KYC
          </span>
          <span>•</span>
          <span>RBI Fortnightly Reporting Ingestion</span>
          <span>•</span>
          <span>Paytm Payments Bank Instant Credit</span>
        </div>
      </div>
    </div>
  );
}
