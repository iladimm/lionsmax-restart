import { supabase } from '../lib/supabase';

export const trackClick = async (product: string, affiliateId?: string) => {
  try {
    await supabase.from('clicks').insert({
      product,
      affiliate_id: affiliateId || 'direct',
      url: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error tracking click:', error);
  }
};

export const iHerbLink = (productId: string, ref: string) =>
  `https://iherb.com/pr/${productId}?rid=${ref}&utm_source=lionsmax`;

export const getAffiliateLink = (platform: string, productId: string, ref: string) => {
  const links: Record<string, string> = {
    iherb: iHerbLink(productId, ref),
    amazon: `https://amazon.com/s?k=${productId}&tag=${ref}`,
  };
  return links[platform] || '#';
};

