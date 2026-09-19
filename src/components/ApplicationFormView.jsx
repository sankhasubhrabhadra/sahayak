import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Shield, AlertTriangle, CheckCircle, Calculator, User, IndianRupee, Briefcase, Clock, RefreshCw } from 'lucide-react';
import { DEMO_PERSONAS, TRANSLATIONS } from '../data/mockData';

export default function ApplicationFormView({
  applicant,
  setApplicant,
  onSubmitEvaluation,
  onSelectPersona,
  activePersonaId,
  lang = 'en'
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  const monthlyIncome = Number(applicant.monthlyIncome) || 1;
  const existingEmis = Number(applicant.existingEmis) || 0;
  const requestedLoanAmount = Number(applicant.requestedLoanAmount) || 50000;
  const tenureMonths = Number(applicant.tenureMonths) || 24;

  const currentDti = ((existingEmis / monthlyIncome) * 100).toFixed(1);
  const isHighRisk = currentDti > 40;
  const maxSafeEmi = Math.round(monthlyIncome * 0.40);
  const excessEmi = Math.max(0, existingEmis - maxSafeEmi);

  const scanSteps = [
    lang === 'en' ? 'Connecting to Account Aggregator (AA)...' : 'अकाउंट एग्रीगेटर से डेटा कनेक्ट हो रहा है...',
    lang === 'en' ? 'Analyzing Paytm UPI inflow regularity...' : 'Paytm UPI ट्रांजैक्शन की नियमितता जांची जा रही है...',
    lang === 'en' ? 'Evaluating Debt-to-Income (DTI) serviceability...' : 'ईएमआई बनाम आमदनी (DTI) अनुपात का विश्लेषण...',
    lang === 'en' ? 'Generating Sahayak AI Underwriting Verdict...' : 'सहायक AI अंडरराइटिंग रिपोर्ट तैयार हो रही है...'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsScanning(true);
    setScanStep(0);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsScanning(false);
            onSubmitEvaluation();
          }, 600);
          return prev;
        }
      });
    }, 450);
  };

  const handleInputChange = (field, value) => {
    setApplicant((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#00BAF2]/15 text-[#0084B4]">
          <Sparkles className="w-3.5 h-3.5 text-[#00BAF2]" />
          Instant Eligibility Underwriting
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002970]">
          {lang === 'en' ? 'Check Your Loan Eligibility' : 'अपनी लोन पात्रता जांचें'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          {lang === 'en'
            ? 'Enter your monthly financial profile. Sahayak AI uses automated DTI & cashflow analysis to simulate lender underwriting.'
            : 'अपनी मासिक आमदनी और मौजूदा ईएमआई दर्ज करें। सहायक AI तुरंत पात्रता का विश्लेषण करेगा।'}
        </p>
      </div>

      {/* Quick Fill Preset Persona Chips */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-soft">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#00BAF2]" />
            <span>1-Click Preset Personas for Demo:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {DEMO_PERSONAS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectPersona(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activePersonaId === p.id
                    ? 'bg-[#002970] text-white shadow-sm ring-2 ring-[#00BAF2]'
                    : 'bg-slate-100 hover:bg-slate-200 text-[#002970]'
                }`}
              >
                <span>{p.avatar}</span>
                <span>{p.name.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75">({p.id === 'amit' ? 'Pass 20%' : 'Reject 56%'})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-8">
        {/* Paytm e-KYC & DigiLocker Verified Strip */}
        <div className="bg-[#F0F9FE] rounded-2xl p-4 border border-[#00BAF2]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#002970] text-white font-black text-xs flex items-center justify-center shrink-0">
              Pay<span className="text-[#00BAF2]">tm</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-[#002970]">
                <span>DigiLocker e-KYC Verified</span>
                <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">100% Paperless</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Disbursal Target: <strong>Paytm Payments Bank (•••• 4092)</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-[#0084B4] bg-white px-3 py-1.5 rounded-xl border border-blue-100 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#00B37E]" />
            <span>Bank-Grade 256-bit Security</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002970] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#00BAF2]" />
              Full Name
            </label>
            <input
              type="text"
              required
              value={applicant.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#00BAF2] focus:ring-2 focus:ring-[#00BAF2]/20 outline-none text-sm font-semibold text-[#002970] bg-slate-50/50"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          {/* Employment Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002970] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#00BAF2]" />
              Employment Category
            </label>
            <select
              value={applicant.employmentType}
              onChange={(e) => handleInputChange('employmentType', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#00BAF2] focus:ring-2 focus:ring-[#00BAF2]/20 outline-none text-sm font-semibold text-[#002970] bg-slate-50/50"
            >
              <option value="Gig Worker">Gig Worker / Delivery Executive (Zomato/Swiggy/Uber)</option>
              <option value="Self-Employed Business">Small Business Owner / Retailer / D2C</option>
              <option value="Salaried Full-Time">Salaried Employee (Private / Govt)</option>
              <option value="Freelancer">Freelancer / Independent Contractor</option>
            </select>
          </div>

          {/* Monthly Income */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002970] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-[#00B37E]" />
                Net Monthly Take-Home Income
              </span>
              <span className="text-xs font-extrabold text-[#002970]">
                ₹{Number(applicant.monthlyIncome).toLocaleString('en-IN')}
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                min="10000"
                max="500000"
                step="1000"
                required
                value={applicant.monthlyIncome}
                onChange={(e) => handleInputChange('monthlyIncome', Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#00BAF2] focus:ring-2 focus:ring-[#00BAF2]/20 outline-none text-sm font-semibold text-[#002970]"
              />
            </div>
            <input
              type="range"
              min="15000"
              max="200000"
              step="5000"
              value={applicant.monthlyIncome}
              onChange={(e) => handleInputChange('monthlyIncome', Number(e.target.value))}
              className="w-full accent-[#00BAF2] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Existing Total EMIs */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002970] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-rose-500" />
                Current Total Monthly EMIs & BNPLs
              </span>
              <span className={`text-xs font-extrabold ${isHighRisk ? 'text-rose-600' : 'text-emerald-600'}`}>
                ₹{Number(applicant.existingEmis).toLocaleString('en-IN')}
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                min="0"
                max="200000"
                step="500"
                required
                value={applicant.existingEmis}
                onChange={(e) => handleInputChange('existingEmis', Number(e.target.value))}
                className={`w-full pl-8 pr-4 py-3 rounded-xl border outline-none text-sm font-semibold ${
                  isHighRisk
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-[#00BAF2] focus:ring-2 focus:ring-[#00BAF2]/20'
                }`}
              />
            </div>
            <input
              type="range"
              min="0"
              max="80000"
              step="1000"
              value={applicant.existingEmis}
              onChange={(e) => handleInputChange('existingEmis', Number(e.target.value))}
              className="w-full accent-rose-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Requested Loan Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002970] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-[#0084B4]" />
                Loan Amount Requested
              </span>
              <span className="text-xs font-extrabold text-[#0084B4]">
                ₹{Number(applicant.requestedLoanAmount).toLocaleString('en-IN')}
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                min="20000"
                max="1000000"
                step="10000"
                required
                value={applicant.requestedLoanAmount}
                onChange={(e) => handleInputChange('requestedLoanAmount', Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#00BAF2] focus:ring-2 focus:ring-[#00BAF2]/20 outline-none text-sm font-semibold text-[#002970]"
              />
            </div>
            <input
              type="range"
              min="25000"
              max="500000"
              step="25000"
              value={applicant.requestedLoanAmount}
              onChange={(e) => handleInputChange('requestedLoanAmount', Number(e.target.value))}
              className="w-full accent-[#0084B4] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Preferred Tenure */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002970] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00BAF2]" />
              Repayment Tenure
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => handleInputChange('tenureMonths', months)}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    tenureMonths === months
                      ? 'bg-[#002970] text-white border-[#002970] shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {months} Mo
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Dynamic DTI Calculation Gauge Bar */}
        <div className={`rounded-2xl p-5 border transition-all ${
          isHighRisk
            ? 'bg-amber-50/70 border-amber-200'
            : 'bg-emerald-50/70 border-emerald-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              {isHighRisk ? (
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              )}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Live Underwriting Metric
                </span>
                <h4 className="text-sm font-extrabold text-[#002970]">
                  Debt-to-Income (EMI Ratio): <span className={isHighRisk ? 'text-rose-600' : 'text-emerald-600'}>{currentDti}%</span>
                </h4>
              </div>
            </div>

            <div className="text-right">
              <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold inline-block ${
                isHighRisk
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {isHighRisk ? '⚠️ Stretched (>40% Rule)' : '✅ Safe Zone (<=40%)'}
              </span>
            </div>
          </div>

          {/* Progress bar representing DTI */}
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isHighRisk
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                  : 'bg-gradient-to-r from-emerald-400 to-teal-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, currentDti))}%` }}
            />
            {/* 40% Threshold Marker */}
            <div className="absolute top-0 bottom-0 left-[40%] w-0.5 bg-[#002970] z-10 opacity-70" title="40% Standard Limit" />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-medium">
            <span>0% (Debt Free)</span>
            <span className="font-bold text-[#002970]">40% Benchmark Threshold</span>
            <span>80%+ (High Burden)</span>
          </div>

          <p className="text-xs text-slate-600 mt-3">
            {isHighRisk ? (
              <span>
                Your current monthly EMIs are <strong>₹{existingEmis.toLocaleString('en-IN')}</strong>. Lenders prefer your total EMIs to stay under <strong>₹{maxSafeEmi.toLocaleString('en-IN')}</strong> (40% of income). This triggers an automated underwriting rejection, but <strong>Sahayak will fix this in 90 days!</strong>
              </span>
            ) : (
              <span>
                Great! Your EMI burden is within the safe 40% threshold. You are likely eligible for immediate sanction.
              </span>
            )}
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          {isScanning ? (
            <div className="bg-[#002970] text-white p-6 rounded-2xl text-center space-y-3 shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <RefreshCw className="w-6 h-6 text-[#00BAF2] animate-spin" />
                <span className="text-base font-bold">Sahayak AI Underwriting Engine Active</span>
              </div>
              <p className="text-xs text-blue-200 font-mono tracking-wide animate-pulse">
                {scanSteps[scanStep]}
              </p>
              <div className="w-48 mx-auto bg-blue-950 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#00BAF2] h-full transition-all duration-300"
                  style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00BAF2] to-[#0084B4] hover:opacity-95 text-[#002970] font-extrabold text-base shadow-lg shadow-[#00BAF2]/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>{isHighRisk ? 'Simulate AI Underwriting & Diagnostic Check' : 'Submit for Instant Loan Sanction'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
