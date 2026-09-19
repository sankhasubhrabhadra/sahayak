import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, CheckCircle2, Zap, Clock, Users, CreditCard, Award, Sparkles } from 'lucide-react';
import { DEMO_PERSONAS, TRANSLATIONS } from '../data/mockData';

export default function LandingView({
  onStartApplication,
  onSelectPersona,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const quickServices = [
    {
      title: 'Personal Loan',
      badge: 'Up to ₹5L',
      desc: 'Instant 2-min approval',
      color: 'bg-blue-50 text-blue-600',
      icon: <CreditCard className="w-5 h-5 text-blue-600" />,
      action: onStartApplication
    },
    {
      title: 'Free Credit Report',
      badge: 'RBI 15-Day',
      desc: 'CIBIL & Experian score',
      color: 'bg-amber-50 text-amber-600',
      icon: <Award className="w-5 h-5 text-amber-600" />,
      action: onStartApplication
    },
    {
      title: 'Sahayak AI Coach',
      badge: '90-Day Plan',
      desc: 'Fix high DTI rejections',
      color: 'bg-emerald-50 text-emerald-600',
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      action: onStartApplication
    },
    {
      title: 'UPI Auto-Pay',
      badge: '0 DPD',
      desc: 'Timely EMI repayment',
      color: 'bg-indigo-50 text-indigo-600',
      icon: <Zap className="w-5 h-5 text-indigo-600" />,
      action: onStartApplication
    }
  ];

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* 1. Minimalist Hero Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs space-y-6 relative overflow-hidden">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-[#00BAF2]" />
            Paytm Financial Services • Sahayak AI Coach
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            {t.heroTagline}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
            {t.heroSubtitle}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onStartApplication}
              className="inline-flex items-center justify-center gap-2 bg-[#002970] hover:bg-[#001f5c] text-white font-semibold px-8 py-3.5 rounded-xl text-sm shadow-xs transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>{t.checkAppBtn}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <div className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-600">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>30-second soft check • Zero bureau score impact</span>
            </div>
          </div>
        </div>

        {/* Minimalist Trust Badges */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Soft Bureau Pull (0 Hard Inquiries)</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <Zap className="w-4 h-4 text-[#00BAF2]" />
            <span>RBI Fortnightly Reporting Sync</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-[#002970]" />
            <span>DigiLocker 100% Paperless KYC</span>
          </div>
        </div>
      </div>

      {/* 2. Quick Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickServices.map((srv, idx) => (
          <button
            key={idx}
            onClick={srv.action}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all text-left flex flex-col justify-between space-y-4 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl ${srv.color} flex items-center justify-center`}>
                {srv.icon}
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600">
                {srv.badge}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#002970] transition-colors">
                {srv.title}
              </h4>
              <p className="text-[11px] text-slate-500 font-normal mt-0.5">{srv.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* 3. Demo Personas Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-700" />
            {lang === 'en' ? 'Interactive Demo Profiles' : 'डेमो प्रोफाइल से टेस्ट करें'}
          </h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            {lang === 'en'
              ? 'Select a borrower scenario to experience the automated underwriting & Sahayak recovery journey.'
              : 'पिच डेमो के लिए नीचे दिए गए किसी भी प्रोफाइल पर क्लिक करके तुरंत पूरी यात्रा देखें।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DEMO_PERSONAS.map((persona) => {
            const isApproved = persona.id === 'amit';
            return (
              <div
                key={persona.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-slate-50 border border-slate-200 rounded-xl">
                        {persona.avatar}
                      </span>
                      <div>
                        <h3 className="font-semibold text-sm text-slate-900">{persona.name}</h3>
                        <p className="text-xs text-slate-500">{persona.tag}</p>
                      </div>
                    </div>
                    {isApproved ? (
                      <span className="bg-emerald-50 text-emerald-700 font-semibold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-200">
                        20% Pass
                      </span>
                    ) : (
                      <span className="bg-rose-50 text-rose-700 font-semibold text-[10px] px-2.5 py-0.5 rounded-full border border-rose-200">
                        {persona.diagnosisNotes.dtiPercent}% Reject
                      </span>
                    )}
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3.5 space-y-1.5 text-xs border border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Income:</span>
                      <span className="font-semibold text-slate-900">₹{persona.monthlyIncome.toLocaleString('en-IN')}/mo</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Existing EMIs:</span>
                      <span className="font-semibold text-rose-600">₹{persona.existingEmis.toLocaleString('en-IN')}/mo</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Loan Request:</span>
                      <span className="font-semibold text-slate-900">₹{persona.requestedLoanAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                    "{persona.diagnosisNotes.quickWin}"
                  </p>
                </div>

                <button
                  onClick={() => onSelectPersona(persona.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                    isApproved
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#002970] hover:bg-[#001f5c] text-white'
                  }`}
                >
                  <span>{isApproved ? 'Test Instant Sanction' : 'Test 90-Day Recovery'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Partner Lending Strip */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3 text-center">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Official RBI-Regulated Lending Partners
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 text-xs font-semibold text-slate-700">
          <span className="px-3.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200/60">Hero FinCorp</span>
          <span className="px-3.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200/60">Tata Capital</span>
          <span className="px-3.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200/60">Piramal Capital</span>
          <span className="px-3.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200/60">Aditya Birla Capital</span>
          <span className="px-3.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200/60">Suryoday SFB</span>
        </div>
      </div>
    </div>
  );
}

