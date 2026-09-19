import React from 'react';
import { X, ShieldCheck, Mail, Building2, Lock } from 'lucide-react';

export default function FooterModals({ activeModal, onClose }) {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            {activeModal === 'privacy' && <Lock className="w-4 h-4 text-[#002970]" />}
            {activeModal === 'grievance' && <Mail className="w-4 h-4 text-[#002970]" />}
            {activeModal === 'nbfc' && <Building2 className="w-4 h-4 text-[#002970]" />}
            <h3 className="font-bold text-base text-slate-900">
              {activeModal === 'privacy' && 'Security & Data Privacy Policy'}
              {activeModal === 'grievance' && 'RBI Nodal Grievance Officer Details'}
              {activeModal === 'nbfc' && 'Regulated NBFC Partner Disclosures'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {activeModal === 'privacy' && (
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              Paytm Sahayak adheres to the RBI Digital Lending Guidelines (2022/2025). Data privacy & security practices include:
            </p>
            <ul className="list-disc list-inside space-y-1 font-normal text-slate-700">
              <li><strong>Zero Unnecessary Access:</strong> No biometric, contact list, or media storage access requested.</li>
              <li><strong>Consent-Based Aggregation:</strong> Account Aggregator (AA) data fetched strictly via explicit OTP verification.</li>
              <li><strong>Data Encryption:</strong> 256-bit TLS/SSL encryption for all data transit and AES-256 at rest.</li>
              <li><strong>Right to Forget:</strong> Users can request immediate purging of cached financial analysis records.</li>
            </ul>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
              Note: Sahayak does not sell user data to third-party telemarketers or unregulated lending entities.
            </div>
          </div>
        )}

        {activeModal === 'grievance' && (
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              In accordance with RBI Master Directions on Customer Protection and Digital Lending, users may contact our designated Grievance Officer:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-900">Principal Nodal Officer — Customer Grievances</div>
              <div>One97 Communications Ltd / Paytm Financial Services</div>
              <div>Email: <span className="font-semibold text-[#002970]">grievance-officer@paytm.com</span></div>
              <div>Phone: <span className="font-semibold text-slate-900">0120-4456-456 (24x7 Helpline)</span></div>
              <div>Address: Noida One Tower, Plot No. B-8, Block B, Sector 62, Noida, UP 201309</div>
            </div>
            <p className="text-[11px] text-slate-500">
              Turnaround Time (TAT): Complaints are acknowledged within 24 hours and resolved within 15 working days. If unresolved, escalations can be made to the RBI Banking Ombudsman at <a href="https://cms.rbi.org.in" target="_blank" rel="noreferrer" className="text-[#002970] underline">cms.rbi.org.in</a>.
            </p>
          </div>
        )}

        {activeModal === 'nbfc' && (
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              Paytm acts as a Digital Lending App (DLA) and Lending Service Provider (LSP) for RBI-regulated Banks and Non-Banking Financial Companies (NBFCs):
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900">1. Hero FinCorp Limited</div>
                <div className="text-[11px] text-slate-500">RBI Regn No: 14.00018 • Product: Personal Loans</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900">2. Tata Capital Financial Services Ltd</div>
                <div className="text-[11px] text-slate-500">RBI Regn No: N.13.01831 • Product: Digital Cashflow Loans</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900">3. Piramal Capital & Housing Finance Ltd</div>
                <div className="text-[11px] text-slate-500">RBI Regn No: 05.00424 • Product: EMI Debt Consolidation</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900">4. Suryoday Small Finance Bank Ltd</div>
                <div className="text-[11px] text-slate-500">Scheduled Commercial Bank • Product: Micro-Business Credit</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Disclaimer: All Key Fact Statements (KFS), Annual Percentage Rates (APR), and loan agreements are directly issued by the respective regulated lender upon formal sanction.
            </p>
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-black text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
