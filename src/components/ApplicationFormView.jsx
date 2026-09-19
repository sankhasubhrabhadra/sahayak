import React, { useState } from 'react';
import { ArrowRight, User, IndianRupee, Briefcase, Clock, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
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
    lang === 'en' ? 'Verifying Account Aggregator cashflows...' : 'अकाउंट एग्रीगेटर से डेटा कनेक्ट हो रहा है...',
    lang === 'en' ? 'Calculating Debt-to-Income (DTI) ratio...' : 'ईएमआई बनाम आमदनी (DTI) अनुपात का विश्लेषण...',
    lang === 'en' ? 'Generating underwriting diagnosis...' : 'सहायक AI अंडरराइटिंग रिपोर्ट तैयार हो रही है...'
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
          }, 500);
          return prev;
        }
      });
    }, 400);
  };

  const handleInputChange = (field, value) => {
    setApplicant((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Minimal Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900">
          {lang === 'en' ? 'Check Loan Eligibility' : 'अपनी लोन पात्रता जांचें'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {lang === 'en'
            ? 'Enter your monthly financial profile to evaluate debt capacity.'
            : 'अपनी मासिक आमदनी और मौजूदा ईएमआई दर्ज करें।'}
        </p>
      </div>

      {/* Preset Personas */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-600">Fill with demo persona:</span>
        <div className="flex flex-wrap items-center gap-2">
          {DEMO_PERSONAS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPersona(p.id)}
              className={`px-3 py-1.5 rounded-lg font-medium border transition-colors ${
                activePersonaId === p.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{p.avatar} {p.name.split(' ')[0]}</span>
              <span className="text-[10px] ml-1 opacity-70">({p.id === 'amit' ? 'Pass' : 'Reject'})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              required
              value={applicant.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 outline-none text-sm text-slate-900 bg-slate-50/50"
              placeholder="Rahul Sharma"
            />
          </div>

          {/* Employment Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Employment Type
            </label>
            <select
              value={applicant.employmentType}
              onChange={(e) => handleInputChange('employmentType', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 outline-none text-sm text-slate-900 bg-slate-50/50"
            >
              <option value="Gig Worker">Gig Worker / Delivery Executive</option>
              <option value="Self-Employed Business">Self-Employed / MSME Owner</option>
              <option value="Salaried Full-Time">Salaried Employee</option>
              <option value="Freelancer">Freelancer / Consultant</option>
            </select>
          </div>

          {/* Monthly Income */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Monthly Income</span>
              <span className="font-bold text-slate-900">₹{Number(applicant.monthlyIncome).toLocaleString('en-IN')}</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">₹</span>
              <input
                type="number"
                min="10000"
                max="500000"
                step="1000"
                required
                value={applicant.monthlyIncome}
                onChange={(e) => handleInputChange('monthlyIncome', Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 outline-none text-sm text-slate-900"
              />
            </div>
          </div>

          {/* Existing EMIs */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Existing Monthly EMIs</span>
              <span className={`font-bold ${isHighRisk ? 'text-rose-600' : 'text-slate-900'}`}>
                ₹{Number(applicant.existingEmis).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">₹</span>
              <input
                type="number"
                min="0"
                max="200000"
                step="500"
                required
                value={applicant.existingEmis}
                onChange={(e) => handleInputChange('existingEmis', Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 outline-none text-sm text-slate-900"
              />
            </div>
          </div>

          {/* Requested Loan */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Loan Amount</span>
              <span className="font-bold text-slate-900">₹{Number(applicant.requestedLoanAmount).toLocaleString('en-IN')}</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm">₹</span>
              <input
                type="number"
                min="20000"
                max="1000000"
                step="10000"
                required
                value={applicant.requestedLoanAmount}
                onChange={(e) => handleInputChange('requestedLoanAmount', Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 outline-none text-sm text-slate-900"
              />
            </div>
          </div>

          {/* Preferred Tenure */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Tenure</label>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => handleInputChange('tenureMonths', months)}
                  className={`py-2 rounded-xl text-xs font-medium border transition-colors ${
                    tenureMonths === months
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {months} Mo
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal DTI Metric Gauge */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-600">Debt-to-Income (DTI) Ratio</span>
            <span className={`font-bold px-2 py-0.5 rounded text-xs ${
              isHighRisk ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {currentDti}% {isHighRisk ? '(Exceeds 40% Guideline)' : '(Safe)'}
            </span>
          </div>

          {/* Simple Progress Bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isHighRisk ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, currentDti))}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500">
            {isHighRisk
              ? `Your EMIs (₹${existingEmis.toLocaleString('en-IN')}) exceed the recommended ₹${maxSafeEmi.toLocaleString('en-IN')} limit. Sahayak will structure a 90-day plan to bring it below 40%.`
              : `Your monthly EMIs are within the safe 40% benchmark. You are eligible for immediate sanction.`}
          </p>
        </div>

        {/* Action Button */}
        <div>
          {isScanning ? (
            <div className="p-4 bg-slate-900 text-white rounded-xl text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold">
                <RefreshCw className="w-4 h-4 animate-spin text-[#00BAF2]" />
                <span>{scanSteps[scanStep]}</span>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#002970] hover:bg-slate-900 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{isHighRisk ? 'Evaluate & View AI Diagnosis' : 'Submit for Instant Sanction'}</span>
              <ArrowRight className="w-4 h-4 text-[#00BAF2]" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
