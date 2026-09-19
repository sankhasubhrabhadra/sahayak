import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, CheckCircle2, Zap, Clock, Users, CreditCard, Award } from 'lucide-react';
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
      icon: <CreditCard className="w-5 h-5 text-slate-700" />,
      action: onStartApplication
    },
    {
      title: 'Free Credit Report',
      badge: 'RBI 15-Day',
      desc: 'CIBIL & Experian score',
      icon: <Award className="w-5 h-5 text-slate-700" />,
      action: onStartApplication
    },
    {
      title: 'Sahayak AI Coach',
      badge: '90-Day Plan',
      desc: 'Fix high DTI rejections',
      icon: <TrendingUp className="w-5 h-5 text-slate-700" />,
      action: onStartApplication
    },
    {
      title: 'UPI Auto-Pay',
      badge: '0 DPD',
      desc: 'Timely EMI repayment',
      icon: <Zap className="w-5 h-5 text-slate-700" />,
      action: onStartApplication
    }
  ];

  return (
    <div className="space-y-10 py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* 1. Minimalist Hero Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs space-y-6">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-[#00BAF2]" />
            Paytm Financial Services • Sahayak AI Coach
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {t.heroTagline}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            {t.heroSubtitle}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onStartApplication}
              className="inline-flex items-center justify-center gap-2 bg-[#002970] hover:bg-slate-900 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-xs cursor-pointer"
            >
              <span>{t.checkAppBtn}</span>
              <ArrowRight className="w-4 h-4 text-[#00BAF2]" />
            </button>

            <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>30-second soft check • Zero bureau score impact</span>
            </div>
          </div>
        </div>

        {/* Minimalist Trust Features */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Soft Bureau Pull (0 Hard Inquiries)</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00BAF2]" />
            <span>RBI Fortnightly Reporting Ingestion</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-slate-700" />
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
            className="p-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                {srv.icon}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {srv.badge}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                {srv.title}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">{srv.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* 3. Demo Personas Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-700" />
              {lang === 'en' ? 'Interactive Demo Profiles' : 'डेमो प्रोफाइल से टेस्ट करें'}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'en'
                ? 'Select a borrower scenario to experience the automated underwriting & Sahayak recovery journey.'
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
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-400 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-slate-100 rounded-xl">
                        {persona.avatar}
                      </span>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{persona.name}</h3>
                        <p className="text-xs text-slate-500">{persona.tag}</p>
                      </div>
                    </div>
                    {isApproved ? (
                      <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded">
                        20% DTI (Pass)
                      </span>
                    ) : (
                      <span className="bg-rose-50 text-rose-700 font-bold text-[10px] px-2 py-0.5 rounded">
                        {persona.diagnosisNotes.dtiPercent}% DTI (Rejected)
                      </span>
                    )}
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 space-y-1 text-xs text-slate-600 border border-slate-100">
                    <div className="flex justify-between">
                      <span>Income:</span>
                      <span className="font-bold text-slate-900">₹{persona.monthlyIncome.toLocaleString('en-IN')}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Existing EMIs:</span>
                      <span className="font-bold text-rose-600">₹{persona.existingEmis.toLocaleString('en-IN')}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loan Request:</span>
                      <span className="font-bold text-slate-900">₹{persona.requestedLoanAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    "{persona.diagnosisNotes.quickWin}"
                  </p>
                </div>

                <button
                  onClick={() => onSelectPersona(persona.id)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                >
                  <span>{isApproved ? 'Test Instant Sanction' : 'Test 90-Day Recovery Journey'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Minimalist Partner Lending Strip */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3 text-center">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Official RBI-Regulated Lending Partners
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-1 text-xs font-bold text-slate-700">
          <span className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">Hero FinCorp</span>
          <span className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">Tata Capital</span>
          <span className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">Piramal Capital</span>
          <span className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">Aditya Birla Capital</span>
          <span className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200">Suryoday SFB</span>
        </div>
      </div>
    </div>
  );
}
