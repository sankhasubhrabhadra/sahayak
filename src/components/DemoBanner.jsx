import React from 'react';
import { Info } from 'lucide-react';

export default function DemoBanner({ lang = 'en' }) {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-amber-900 text-[11px] sm:text-xs font-medium flex items-center justify-center gap-2 text-center leading-snug">
      <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
      <span>
        {lang === 'en'
          ? 'Illustrative Demo Simulation: Educational financial estimates only. No real loan application, bureau inquiry, or money disbursement has occurred.'
          : 'इल्लस्ट्रेटिव डेमो सिमुलेशन: यह केवल शैक्षणिक वित्तीय अनुमान है। कोई वास्तविक लोन आवेदन, सिबिल जांच या धन वितरण नहीं हुआ है।'}
      </span>
    </div>
  );
}
