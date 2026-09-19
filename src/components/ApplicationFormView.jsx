import React, { useState } from 'react';
import { ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { DEMO_PERSONAS, TRANSLATIONS } from '../data/mockData';
import { calculateDti, validateProfileInputs, calculateMaxSafeEmi, calculateReliefNeeded } from '../utils/financialEngine';

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

  const validation = validateProfileInputs(applicant);
  const { isValid, errors } = validation;

  const rawIncome = Number(applicant.monthlyIncome);
  const rawEmis = Number(applicant.existingEmis);

  const monthlyIncome = isNaN(rawIncome) || rawIncome <= 0 ? 0 : rawIncome;
  const existingEmis = isNaN(rawEmis) || rawEmis < 0 ? 0 : rawEmis;

  const { dti: currentDti, isSafe } = calculateDti(existingEmis, monthlyIncome);
  const maxSafeEmi = calculateMaxSafeEmi(monthlyIncome, 40);
  const excessEmi = calculateReliefNeeded(existingEmis, monthlyIncome);

  const scanSteps = [
    lang === 'en' ? 'Verifying cashflows & debt capacity...' : 'डेटा कनेक्ट हो रहा है...',
    lang === 'en' ? 'Calculating Debt-to-Income (DTI) ratio...' : 'ईएमआई बनाम आमदनी (DTI) का विश्लेषण...',
    lang === 'en' ? 'Generating underwriting diagnosis...' : 'सहायक AI अंडरराइटिंग रिपोर्ट तैयार हो रही है...'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    // Clean applicant state
    setApplicant((prev) => ({
      ...prev,
      fullName: (prev.fullName || '').trim(),
      monthlyIncome: Math.max(1, Number(prev.monthlyIncome) || 0),
      existingEmis: Math.max(0, Number(prev.existingEmis) || 0),
      requestedLoanAmount: Math.max(1000, Number(prev.requestedLoanAmount) || 0),
      tenureMonths: Math.max(1, Number(prev.tenureMonths) || 12)
    }));

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
          }, 450);
          return prev;
        }
      });
    }, 350);
  };

  const handleInputChange = (field, value) => {
    setApplicant((prev) => ({
      ...prev,
      [field]: value,
      isCustom: true
    }));
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 space-y-6 animate-in fade-in duration-200">
      {/* Minimalist Header */}
      <div className="space-y-1">
        <div className="inline-block px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md font-semibold text-xs text-slate-700">
          Paytm Paperless Loan Application
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t.tabEligibility}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          {lang === 'en'
            ? 'Enter your monthly financial profile to evaluate debt capacity.'
            : 'अपनी मासिक आमदनी और मौजूदा ईएमआई दर्ज करें।'}
        </p>
      </div>

      {/* Preset Personas */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-700">Fast Demo Profiles:</span>
        <div className="flex flex-wrap items-center gap-2">
          {DEMO_PERSONAS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPersona(p.id)}
              className={`px-3 py-1.5 rounded-lg font-medium border transition-colors cursor-pointer ${
                activePersonaId === p.id && !applicant.isCustom
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-semibold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{p.avatar} {p.name.split(' ')[0]}</span>
              <span className="text-[10px] ml-1 opacity-80">({p.id === 'amit' ? 'Pass' : 'Reject'})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="text-xs font-semibold text-slate-700">
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              required
              maxLength={100}
              value={applicant.fullName || ''}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 bg-slate-50/50'
              } focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none text-sm text-slate-900 transition-all`}
              placeholder="e.g. Rahul Sharma"
            />
            {errors.fullName && (
              <span className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Employment Type */}
          <div className="space-y-1.5">
            <label htmlFor="employmentType" className="text-xs font-semibold text-slate-700">
              Employment Type
            </label>
            <select
              id="employmentType"
              value={applicant.employmentType || 'Gig Worker'}
              onChange={(e) => handleInputChange('employmentType', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none text-sm text-slate-900 transition-all"
            >
              <option value="Gig Worker">Gig Worker / Delivery Executive</option>
              <option value="Self-Employed Business">Self-Employed / MSME Owner</option>
              <option value="Salaried Full-Time">Salaried Employee</option>
              <option value="Freelancer">Freelancer / Consultant</option>
            </select>
          </div>

          {/* Monthly Income */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <label htmlFor="monthlyIncome">Monthly Income *</label>
              <span className="font-semibold text-slate-900">
                ₹{monthlyIncome > 0 ? monthlyIncome.toLocaleString('en-IN') : '0'}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">₹</span>
              <input
                id="monthlyIncome"
                type="number"
                min="1000"
                max="10000000"
                step="500"
                required
                value={applicant.monthlyIncome ?? ''}
                onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                className={`w-full pl-8 pr-3 py-2.5 rounded-lg border ${
                  errors.monthlyIncome ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 bg-slate-50/50'
                } focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none text-sm text-slate-900 transition-all`}
              />
            </div>
            {errors.monthlyIncome && (
              <span className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.monthlyIncome}
              </span>
            )}
          </div>

          {/* Existing EMIs */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <label htmlFor="existingEmis">Existing EMIs *</label>
              <span className={`font-semibold ${!isSafe && isValid ? 'text-rose-600' : 'text-emerald-600'}`}>
                ₹{existingEmis.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">₹</span>
              <input
                id="existingEmis"
                type="number"
                min="0"
                max="10000000"
                step="500"
                required
                value={applicant.existingEmis ?? ''}
                onChange={(e) => handleInputChange('existingEmis', e.target.value)}
                className={`w-full pl-8 pr-3 py-2.5 rounded-lg border ${
                  errors.existingEmis ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 bg-slate-50/50'
                } focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none text-sm text-slate-900 transition-all`}
              />
            </div>
            {errors.existingEmis && (
              <span className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.existingEmis}
              </span>
            )}
          </div>

          {/* Requested Loan */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <label htmlFor="requestedLoanAmount">Loan Amount *</label>
              <span className="font-semibold text-slate-900">
                ₹{Number(applicant.requestedLoanAmount || 0).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">₹</span>
              <input
                id="requestedLoanAmount"
                type="number"
                min="5000"
                max="10000000"
                step="5000"
                required
                value={applicant.requestedLoanAmount ?? ''}
                onChange={(e) => handleInputChange('requestedLoanAmount', e.target.value)}
                className={`w-full pl-8 pr-3 py-2.5 rounded-lg border ${
                  errors.requestedLoanAmount ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200 bg-slate-50/50'
                } focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none text-sm text-slate-900 transition-all`}
              />
            </div>
            {errors.requestedLoanAmount && (
              <span className="text-[11px] text-rose-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.requestedLoanAmount}
              </span>
            )}
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
                  aria-label={`Select ${months} months tenure`}
                  className={`py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    Number(applicant.tenureMonths) === months
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {months} Mo
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic DTI Metric Display */}
        {isValid ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Debt-to-Income (DTI) Ratio</span>
              <span className={`font-semibold px-2.5 py-0.5 rounded-md text-xs ${
                !isSafe ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {currentDti}% {!isSafe ? '⚠️ Exceeds 40%' : '✅ Safe <40%'}
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  !isSafe ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(5, currentDti))}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
              {!isSafe
                ? `Your EMIs (₹${existingEmis.toLocaleString('en-IN')}) exceed the recommended ₹${maxSafeEmi.toLocaleString('en-IN')} limit. Sahayak will structure a 90-day recovery plan.`
                : `Your monthly EMIs are comfortably within the safe 40% benchmark. Illustrative eligibility confirmed.`}
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Please fix invalid inputs above to calculate your Debt-to-Income (DTI) eligibility.</span>
          </div>
        )}

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
              disabled={!isValid}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isValid
                  ? 'bg-[#002970] hover:bg-[#001f5c] text-white active:scale-[0.99]'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{!isSafe ? 'Evaluate & View AI Diagnosis ➔' : 'Submit for Pre-Approval Sanction ➔'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
