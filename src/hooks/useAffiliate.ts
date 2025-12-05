import { supabase } from '../lib/supabase';

// Track affiliate click on product
export const trackAffiliateClick = async (
  product: string,
  externalLink: string,
  affiliateId?: string
) => {
  try {
    const { data, error } = await supabase
      .from('affiliate_clicks')
      .insert([
        {
          product_name: product,
          external_link: externalLink,
          affiliate_id: affiliateId || 'direct',
          utm_source: 'lionsmax',
          utm_medium: 'affiliate_button',
          utm_campaign: 'product_promo',
          clicked_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Error tracking affiliate click:', error);
      return null;
    }

    console.log('Affiliate click tracked:', data);
    return data;
  } catch (err) {
    console.error('Exception tracking affiliate click:', err);
    return null;
  }
};

// Simplified wrapper for tracking clicks
export const trackClick = async (
  product: string,
  link: string,
  affiliateId?: string
) => {
  return await trackAffiliateClick(product, link, affiliateId);
};

// Generate iHerb affiliate link with tracking parameters
export const generateIHerbLink = (
  productId: string,
  affiliateRef: string
): string => {
  const baseUrl = 'https://iherb.com/pr';
  return `${baseUrl}/${productId}?rid=${affiliateRef}&utm_source=lionsmax&utm_medium=affiliate_link&utm_campaign=product_link`;
};

// Generate affiliate link for any product
export const generateAffiliateLink = (
  baseUrl: string,
  productId: string,
  affiliateRef: string,
  additionalParams?: Record<string, string>
): string => {
  const params = new URLSearchParams({
    rid: affiliateRef,
    utm_source: 'lionsmax',
    utm_medium: 'affiliate_link',
    utm_campaign: 'product_link',
    ...additionalParams,
  });
  return `${baseUrl}/${productId}?${params.toString()}`;
};