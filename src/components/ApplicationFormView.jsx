import React, { useState } from 'react';
import { ArrowRight, User, IndianRupee, Briefcase, Clock, RefreshCw, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
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
          }, 450);
          return prev;
        }
      });
    }, 350);
  };

  const handleInputChange = (field, value) => {
    setApplicant((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 space-y-6 animate-in fade-in duration-200">
      {/* Neo-Brutalist Header */}
      <div className="space-y-1">
        <div className="inline-block px-3 py-1 bg-[#FFD200] border-2 border-black font-black text-xs uppercase tracking-wider shadow-brutal-sm">
          Paytm Paperless Loan Application
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
          {lang === 'en' ? 'Check Loan Eligibility' : 'अपनी लोन पात्रता जांचें'}
        </h1>
        <p className="text-xs sm:text-sm text-black/70 font-medium">
          {lang === 'en'
            ? 'Enter your monthly financial profile to evaluate debt capacity.'
            : 'अपनी मासिक आमदनी और मौजूदा ईएमआई दर्ज करें।'}
        </p>
      </div>

      {/* Preset Personas */}
      <div className="bg-white rounded-xl p-4 border-[3px] border-black shadow-brutal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <span className="font-black text-black uppercase tracking-wider">Fast Demo Profiles:</span>
        <div className="flex flex-wrap items-center gap-2">
          {DEMO_PERSONAS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPersona(p.id)}
              className={`px-3 py-1.5 rounded-lg font-black border-2 border-black transition-all cursor-pointer ${
                activePersonaId === p.id
                  ? 'bg-[#00BAF2] text-black shadow-brutal-sm translate-x-[1px] translate-y-[1px]'
                  : 'bg-[#FFFDF5] text-black hover:bg-[#FFD200] shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none'
              }`}
            >
              <span>{p.avatar} {p.name.split(' ')[0]}</span>
              <span className="text-[10px] ml-1 opacity-80">({p.id === 'amit' ? 'Pass' : 'Reject'})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border-[3px] border-black shadow-brutal-lg space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-black uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              required
              value={applicant.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black focus:bg-[#FFFDF5] outline-none text-sm font-bold text-black shadow-brutal-sm"
              placeholder="Rahul Sharma"
            />
          </div>

          {/* Employment Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-black uppercase tracking-wider">
              Employment Type
            </label>
            <select
              value={applicant.employmentType}
              onChange={(e) => handleInputChange('employmentType', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-black focus:bg-[#FFFDF5] outline-none text-sm font-bold text-black shadow-brutal-sm"
            >
              <option value="Gig Worker">Gig Worker / Delivery Executive</option>
              <option value="Self-Employed Business">Self-Employed / MSME Owner</option>
              <option value="Salaried Full-Time">Salaried Employee</option>
              <option value="Freelancer">Freelancer / Consultant</option>
            </select>
          </div>

          {/* Monthly Income */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-black text-black">
              <span className="uppercase tracking-wider">Monthly Income</span>
              <span className="font-mono bg-[#FFD200] px-1.5 border border-black">₹{Number(applicant.monthlyIncome).toLocaleString('en-IN')}</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-black font-black text-sm">₹</span>
              <input
                type="number"
                min="10000"
                max="500000"
                step="1000"
                required
                value={applicant.monthlyIncome}
                onChange={(e) => handleInputChange('monthlyIncome', Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2.5 rounded-xl border-2 border-black focus:bg-[#FFFDF5] outline-none text-sm font-bold text-black shadow-brutal-sm"
              />
            </div>
          </div>

          {/* Existing EMIs */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-black text-black">
              <span className="uppercase tracking-wider">Existing EMIs</span>
              <span className={`font-mono px-1.5 border border-black ${isHighRisk ? 'bg-[#FF4D4D] text-white' : 'bg-[#00B37E] text-white'}`}>
                ₹{Number(applicant.existingEmis).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-black font-black text-sm">₹</span>
              <input
                type="number"
                min="0"
                max="200000"
                step="500"
                required
                value={applicant.existingEmis}
                onChange={(e) => handleInputChange('existingEmis', Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2.5 rounded-xl border-2 border-black focus:bg-[#FFFDF5] outline-none text-sm font-bold text-black shadow-brutal-sm"
              />
            </div>
          </div>

          {/* Requested Loan */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-black text-black">
              <span className="uppercase tracking-wider">Loan Amount</span>
              <span className="font-mono bg-[#00BAF2] px-1.5 border border-black">₹{Number(applicant.requestedLoanAmount).toLocaleString('en-IN')}</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-black font-black text-sm">₹</span>
              <input
                type="number"
                min="20000"
                max="1000000"
                step="10000"
                required
                value={applicant.requestedLoanAmount}
                onChange={(e) => handleInputChange('requestedLoanAmount', Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2.5 rounded-xl border-2 border-black focus:bg-[#FFFDF5] outline-none text-sm font-bold text-black shadow-brutal-sm"
              />
            </div>
          </div>

          {/* Preferred Tenure */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-black uppercase tracking-wider">Tenure</label>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => handleInputChange('tenureMonths', months)}
                  className={`py-2 rounded-xl text-xs font-black border-2 border-black transition-all cursor-pointer ${
                    tenureMonths === months
                      ? 'bg-black text-white shadow-brutal-sm'
                      : 'bg-[#FFFDF5] text-black hover:bg-[#FFD200] shadow-brutal-sm hover:shadow-none'
                  }`}
                >
                  {months} Mo
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Neo-Brutalist DTI Metric Box */}
        <div className="p-4 rounded-xl bg-[#FFFDF5] border-2 border-black shadow-brutal space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-black text-black uppercase tracking-wider">Debt-to-Income (DTI) Ratio</span>
            <span className={`font-black px-2.5 py-1 rounded border-2 border-black text-xs shadow-brutal-sm ${
              isHighRisk ? 'bg-[#FF4D4D] text-white' : 'bg-[#00B37E] text-white'
            }`}>
              {currentDti}% {isHighRisk ? '⚠️ Exceeds 40%' : '✅ Safe <40%'}
            </span>
          </div>

          {/* Brutalist Progress Bar */}
          <div className="w-full bg-white h-4 rounded-md border-2 border-black overflow-hidden p-0.5">
            <div
              className={`h-full transition-all duration-300 rounded-sm ${
                isHighRisk ? 'bg-[#FF4D4D]' : 'bg-[#00B37E]'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, currentDti))}%` }}
            />
          </div>

          <p className="text-[11px] text-black font-medium leading-relaxed">
            {isHighRisk
              ? `Your EMIs (₹${existingEmis.toLocaleString('en-IN')}) exceed the recommended ₹${maxSafeEmi.toLocaleString('en-IN')} limit. Sahayak will structure a 90-day plan to bring it below 40%.`
              : `Your monthly EMIs are within the safe 40% benchmark. You are eligible for immediate sanction.`}
          </p>
        </div>

        {/* Action Button */}
        <div>
          {isScanning ? (
            <div className="p-4 bg-black text-white rounded-xl text-center space-y-2 border-2 border-black shadow-brutal">
              <div className="flex items-center justify-center gap-2 text-xs font-black">
                <RefreshCw className="w-4 h-4 animate-spin text-[#00BAF2]" />
                <span>{scanSteps[scanStep]}</span>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-[#00BAF2] hover:bg-[#FFD200] text-black font-black text-base border-[3px] border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isHighRisk ? 'Evaluate & View AI Diagnosis ➔' : 'Submit for Instant Sanction ➔'}</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

