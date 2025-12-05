import React from 'react';
import { trackAffiliateClick, generateIHerbLink, generateAffiliateLink } from '../hooks/useAffiliate';

interface AffiliateButtonProps {
  productName: string;
  productId: string;
  externalLink: string;
  affiliateRef?: string;
  affiliateId?: string;
  commissionPercentage?: number;
  className?: string;
  buttonText?: string;
  platform?: 'iherb' | 'amazon' | 'custom';
}

const AffiliateButton: React.FC<AffiliateButtonProps> = ({
  productName,
  productId,
  externalLink,
  affiliateRef = 'lionsmax',
  affiliateId = 'direct',
  commissionPercentage = 5,
  className = 'bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors',
  buttonText = `Acheter ${productName} (${commissionPercentage}% comm.)`,
  platform = 'custom',
}) => {
  const handleClick = async () => {
    // Track the click in Supabase
    const finalLink = 
      platform === 'iherb'
        ? generateIHerbLink(productId, affiliateRef)
        : generateAffiliateLink(externalLink, productId, affiliateRef);

    await trackAffiliateClick(productName, finalLink, affiliateId);

    // Open the affiliate link
    window.open(finalLink, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      aria-label={`Buy ${productName}`}
    >
      {buttonText} →
    </button>
  );
};

export default AffiliateButton;