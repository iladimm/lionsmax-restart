import { trackClick, iHerbLink } from '../hooks/useAffiliate';

interface AffiliateButtonProps {
  product: string;
  productId: string;
  commission: number;
  ref: string;
  platform?: string;
}

export const AffiliateButton = ({
  product,
  productId,
  commission,
  ref,
  platform = 'iherb',
}: AffiliateButtonProps) => {
  const handleClick = async () => {
    await trackClick(product);
    const link = iHerbLink(productId, ref);
    window.open(link, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
    >
      Acheter {product} ({commission}% comm.) →
    </button>
  );
};

