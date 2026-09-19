import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, CheckCircle2, HeartHandshake, Zap, Clock, Users, UserCheck } from 'lucide-react';
import { DEMO_PERSONAS, TRANSLATIONS } from '../data/mockData';

export default function LandingView({
  onStartApplication,
  onSelectPersona,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#00BAF2]" />,
      title: lang === 'en' ? 'Jargon-Free AI Diagnostics' : 'सरल AI डायग्नोस्टिक्स',
      desc: lang === 'en'
        ? 'No cold rejection emails. Understand the exact math behind underwriting models in plain Indian language.'
        : 'बिना किसी उलझन के समझिए कि बैंक ने लोन क्यों नहीं दिया और आपकी ईएमआई का क्या हिसाब है।'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#00B37E]" />,
      title: lang === 'en' ? 'Personalized 90-Day Roadmap' : '90 दिनों का पर्सनल प्लान',
      desc: lang === 'en'
        ? 'Actionable steps to eliminate high-cost BNPLs and optimize your debt-to-income ratio below 40%.'
        : 'छोटे कर्ज निपटाने और ईएमआई कम करने के लिए आसान कदम जो आपकी पात्रता बढ़ाते हैं।'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#F59E0B]" />,
      title: lang === 'en' ? 'Fitness-App Style Tracker' : 'फिटनेस-स्टाइल प्रोग्रेस ट्रैकर',
      desc: lang === 'en'
        ? 'Circular readiness ring, daily habits, XP points, and streak counters to keep you motivated.'
        : 'रोजाना की आदतों को टिक करें, स्ट्रीक बनाएं और अपना लोन रेडीनेस स्कोर 100% तक पहुंचाएं।'
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-[#00BAF2]" />,
      title: lang === 'en' ? 'Pre-Approved Re-Application' : 'प्री-अप्रूव्ड री-एप्लीकेशन',
      desc: lang === 'en'
        ? 'Hit 100% readiness and unlock simulated pre-approved loan terms with 0 hard inquiries.'
        : '100% स्कोर होते ही बिना किसी अतिरिक्त कागजात के तुरंत प्री-अप्रूव्ड लोन शर्तें देखें।'
    }
  ];

  return (
    <div className="space-y-12 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#002970] via-[#001944] to-[#00388A] text-white p-8 sm:p-12 lg:p-16 shadow-card border border-blue-900/40">
        {/* Background glow & subtle Paytm rings */}
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#00BAF2]/20 blur-3xl pointer-events-none" />
        <div className="absolute right-10 bottom-0 w-80 h-80 rounded-full bg-[#00B37E]/10 blur-3xl pointer-events-none" />
        <div className="absolute right-8 top-12 opacity-10 hidden md:block">
          <span className="text-[180px] font-black leading-none text-white select-none">₹</span>
        </div>

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Tag Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00BAF2] text-[#002970] shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Paytm AI Hackathon 2026
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-blue-100 border border-white/10">
              <HeartHandshake className="w-3.5 h-3.5 text-[#00BAF2]" />
              Track: AI-Powered Financial Journeys
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroTagline}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-2xl">
            {t.heroSubtitle}
          </p>

          {/* Quick CTA Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onStartApplication}
              className="inline-flex items-center justify-center gap-2.5 bg-[#00BAF2] hover:bg-[#00a6d9] text-[#002970] font-bold px-8 py-4 rounded-xl text-base shadow-lg shadow-[#00BAF2]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>{t.checkAppBtn}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs text-blue-200">
              <Clock className="w-4 h-4 text-[#00BAF2]" />
              <span>Takes under 60 seconds • 100% Mock Simulated</span>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200">
              <ShieldCheck className="w-4 h-4 text-[#00B37E]" />
              <span>0 Hard Bureau Inquiries</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200">
              <UserCheck className="w-4 h-4 text-[#00BAF2]" />
              <span>Tailored for Gig & MSME</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 col-span-2 sm:col-span-1">
              <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
              <span>Structured 90-Day Pathway</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1-Click Hackathon Demo Personas Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#002970] flex items-center gap-2">
              <Users className="w-6 h-6 text-[#00BAF2]" />
              {lang === 'en' ? 'Try Instant Demo Personas' : 'डेमो प्रोफाइल से तुरंत टेस्ट करें'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'en'
                ? 'Select a persona below to see how Sahayak diagnoses and cures loan rejections live in the pitch demo.'
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
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#00BAF2] shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
                        {persona.avatar}
                      </span>
                      <div>
                        <h3 className="font-bold text-base text-[#002970]">{persona.name}</h3>
                        <p className="text-xs font-medium text-slate-500">{persona.tag}</p>
                      </div>
                    </div>
                    {isApproved ? (
                      <span className="bg-emerald-50 text-emerald-700 font-bold text-[11px] px-2.5 py-1 rounded-full border border-emerald-200">
                        20% DTI (Pass)
                      </span>
                    ) : (
                      <span className="bg-amber-50 text-amber-700 font-bold text-[11px] px-2.5 py-1 rounded-full border border-amber-200">
                        {persona.diagnosisNotes.dtiPercent}% DTI (Reject)
                      </span>
                    )}
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Monthly Income:</span>
                      <span className="font-bold text-[#002970]">₹{persona.monthlyIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Existing Monthly EMIs:</span>
                      <span className="font-bold text-rose-600">₹{persona.existingEmis.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Requested Loan:</span>
                      <span className="font-bold text-[#0084B4]">₹{persona.requestedLoanAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                    💡 "{persona.diagnosisNotes.quickWin}"
                  </p>
                </div>

                <button
                  onClick={() => onSelectPersona(persona.id)}
                  className={`mt-4 w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    isApproved
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      : 'bg-[#002970] hover:bg-[#001944] text-white shadow-sm'
                  }`}
                >
                  <span>{isApproved ? 'Test Instant Approval Flow' : 'Test Rejection & Recovery Journey'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="space-y-4 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-[#002970]">
            {lang === 'en' ? 'How Sahayak Powers Financial Journeys' : 'सहायक AI कैसे काम करता है'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {lang === 'en'
              ? 'An empathetic bridge between applicant aspiration and lender underwriting rules.'
              : 'बैंक के कड़े नियमों और जरूरतमंद ग्राहकों के बीच एक सच्चा मार्गदर्शक।'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                {f.icon}
              </div>
              <h3 className="font-bold text-base text-[#002970]">{f.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
