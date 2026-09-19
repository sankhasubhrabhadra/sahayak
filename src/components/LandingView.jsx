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
      color: 'bg-[#00BAF2]',
      icon: <CreditCard className="w-5 h-5 text-black" />,
      action: onStartApplication
    },
    {
      title: 'Free Credit Report',
      badge: 'RBI 15-Day',
      desc: 'CIBIL & Experian score',
      color: 'bg-[#FFD200]',
      icon: <Award className="w-5 h-5 text-black" />,
      action: onStartApplication
    },
    {
      title: 'Sahayak AI Coach',
      badge: '90-Day Plan',
      desc: 'Fix high DTI rejections',
      color: 'bg-[#00B37E]',
      icon: <TrendingUp className="w-5 h-5 text-black" />,
      action: onStartApplication
    },
    {
      title: 'UPI Auto-Pay',
      badge: '0 DPD',
      desc: 'Timely EMI repayment',
      color: 'bg-[#FF90E8]',
      icon: <Zap className="w-5 h-5 text-black" />,
      action: onStartApplication
    }
  ];

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* 1. Neo-Brutalist Hero Card */}
      <div className="bg-white rounded-2xl p-8 sm:p-12 border-[3px] border-black shadow-brutal-lg space-y-6 relative overflow-hidden">
        {/* Decorative background tag */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-black bg-[#FFD200] text-black border-2 border-black shadow-brutal-sm uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            Paytm Financial Services • Sahayak AI Coach
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-[1.08]">
            {t.heroTagline}
          </h1>

          <p className="text-sm sm:text-base text-black/80 font-medium leading-relaxed max-w-2xl">
            {t.heroSubtitle}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onStartApplication}
              className="inline-flex items-center justify-center gap-2 bg-[#00BAF2] hover:bg-[#FFD200] text-black font-black px-8 py-4 rounded-xl text-base border-[3px] border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
            >
              <span>{t.checkAppBtn}</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </button>

            <div className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#FFFDF5] border-2 border-black rounded-xl text-xs font-bold text-black shadow-brutal-sm">
              <Clock className="w-4 h-4 text-black" />
              <span>30-second soft check • Zero bureau score impact</span>
            </div>
          </div>
        </div>

        {/* Neo-Brutalist Trust Badges */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t-2 border-black text-xs font-black text-black">
          <div className="flex items-center gap-2 bg-[#FFFDF5] p-2.5 border-2 border-black rounded-lg shadow-brutal-sm">
            <ShieldCheck className="w-4 h-4 text-[#00B37E]" />
            <span>Soft Bureau Pull (0 Hard Inquiries)</span>
          </div>
          <div className="flex items-center gap-2 bg-[#FFFDF5] p-2.5 border-2 border-black rounded-lg shadow-brutal-sm">
            <Zap className="w-4 h-4 text-[#00BAF2]" />
            <span>RBI Fortnightly Reporting Sync</span>
          </div>
          <div className="flex items-center gap-2 bg-[#FFFDF5] p-2.5 border-2 border-black rounded-lg shadow-brutal-sm">
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
            className="p-5 rounded-xl bg-white border-2 border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-lg ${srv.color} border-2 border-black flex items-center justify-center shadow-brutal-sm`}>
                {srv.icon}
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded border border-black bg-[#FFFDF5]">
                {srv.badge}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-black">
                {srv.title}
              </h4>
              <p className="text-[11px] text-black/70 font-medium mt-0.5">{srv.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* 3. Demo Personas Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-black flex items-center gap-2">
              <Users className="w-5 h-5 text-black" />
              {lang === 'en' ? 'Interactive Demo Profiles' : 'डेमो प्रोफाइल से टेस्ट करें'}
            </h2>
            <p className="text-xs text-black/70 font-medium">
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
                className="bg-white rounded-xl p-6 border-[3px] border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 bg-[#FFFDF5] border-2 border-black rounded-lg shadow-brutal-sm">
                        {persona.avatar}
                      </span>
                      <div>
                        <h3 className="font-black text-sm text-black">{persona.name}</h3>
                        <p className="text-xs text-black/70 font-bold">{persona.tag}</p>
                      </div>
                    </div>
                    {isApproved ? (
                      <span className="bg-[#00B37E] text-white font-black text-[10px] px-2 py-0.5 border border-black uppercase shadow-brutal-sm">
                        20% Pass
                      </span>
                    ) : (
                      <span className="bg-[#FF4D4D] text-white font-black text-[10px] px-2 py-0.5 border border-black uppercase shadow-brutal-sm">
                        {persona.diagnosisNotes.dtiPercent}% Reject
                      </span>
                    )}
                  </div>

                  <div className="bg-[#FFFDF5] rounded-lg p-3 space-y-1 text-xs text-black border-2 border-black font-semibold">
                    <div className="flex justify-between">
                      <span>Income:</span>
                      <span className="font-black">₹{persona.monthlyIncome.toLocaleString('en-IN')}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Existing EMIs:</span>
                      <span className="font-black text-[#FF4D4D]">₹{persona.existingEmis.toLocaleString('en-IN')}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Loan Request:</span>
                      <span className="font-black">₹{persona.requestedLoanAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <p className="text-xs text-black font-medium italic bg-[#FFD200]/30 p-2.5 rounded-lg border-2 border-black">
                    "{persona.diagnosisNotes.quickWin}"
                  </p>
                </div>

                <button
                  onClick={() => onSelectPersona(persona.id)}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 border-2 border-black shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer ${
                    isApproved ? 'bg-[#00B37E] text-white' : 'bg-[#00BAF2] text-black'
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
      <div className="bg-white rounded-xl p-6 border-[3px] border-black shadow-brutal space-y-3 text-center">
        <div className="text-xs font-black text-black uppercase tracking-wider bg-[#FFD200] inline-block px-3 py-1 border-2 border-black shadow-brutal-sm">
          Official RBI-Regulated Lending Partners
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 text-xs font-black text-black">
          <span className="px-3.5 py-1.5 bg-[#FFFDF5] rounded-md border-2 border-black shadow-brutal-sm">Hero FinCorp</span>
          <span className="px-3.5 py-1.5 bg-[#FFFDF5] rounded-md border-2 border-black shadow-brutal-sm">Tata Capital</span>
          <span className="px-3.5 py-1.5 bg-[#FFFDF5] rounded-md border-2 border-black shadow-brutal-sm">Piramal Capital</span>
          <span className="px-3.5 py-1.5 bg-[#FFFDF5] rounded-md border-2 border-black shadow-brutal-sm">Aditya Birla Capital</span>
          <span className="px-3.5 py-1.5 bg-[#FFFDF5] rounded-md border-2 border-black shadow-brutal-sm">Suryoday SFB</span>
        </div>
      </div>
    </div>
  );
}

