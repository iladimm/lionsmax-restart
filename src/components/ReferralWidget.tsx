import { useEffect, useState } from 'react';
import { Share2, Users, Gift } from 'lucide-react';
import { initFirstPromoter, trackFirstPromoterEvent } from '../lib/firstpromoter';

interface ReferralData {
  referralLink?: string;
  referralCode?: string;
  commissionRate?: number;
}

export const ReferralWidget = () => {
  const [referralData, setReferralData] = useState<ReferralData>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    initFirstPromoter();
    const mockCode = 'LIONS' + Math.random().toString(36).substring(7).toUpperCase();
    setReferralData({
      referralCode: mockCode,
      referralLink: `https://lionsmax.com?ref=${mockCode}`,
      commissionRate: 20,
    });
  }, []);

  const handleCopyLink = () => {
    if (referralData.referralLink) {
      navigator.clipboard.writeText(referralData.referralLink);
      setCopied(true);
      trackFirstPromoterEvent('referral_link_copied');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-6 h-6 text-emerald-600" />
        <h3 className="text-xl font-bold text-emerald-900">Earn with LionsMax Referrals</h3>
      </div>
      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-600 mb-2">Your Referral Code:</p>
        <div className="flex gap-2">
          <code className="flex-1 bg-gray-100 px-4 py-2 rounded font-mono text-emerald-700">
            {referralData.referralCode}
          </code>
          <button onClick={handleCopyLink} className="px-4 py-2 bg-emerald-600 text-white rounded">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

