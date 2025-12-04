import { supabase } from "../lib/supabase"

// Types pour les paramètres de tracking
interface AffiliateClickParams {
  product_name: string
  external_link: string
  affiliate_id?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  commission_percentage?: number
}

interface IHerbLinkParams {
  productId: string
  productName: string
  affiliateRef?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

interface AffiliateLinkParams {
  baseUrl: string
  productName: string
  affiliateParam?: string
  affiliateValue?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

/**
 * Track un clic d'affiliation avec tous les paramètres dans Supabase
 */
export const trackAffiliateClick = async (params: AffiliateClickParams): Promise<void> => {
  try {
    const {
      product_name,
      external_link,
      affiliate_id = import.meta.env.VITE_AFFILIATE_ID || 'lionsmax-site',
      utm_source = 'lionsmax',
      utm_medium = 'affiliate',
      utm_campaign = 'product-click',
      commission_percentage = parseFloat(import.meta.env.VITE_AFFILIATE_COMMISSION_PERCENT || '5')
    } = params

    const { error } = await supabase
      .from("affiliate_clicks")
      .insert({
        product_name,
        external_link,
        affiliate_id,
        utm_source,
        utm_medium,
        utm_campaign,
        commission_percentage,
        clicked_at: new Date().toISOString(),
      })

    if (error) {
      console.error("Error tracking affiliate click:", error)
    }
  } catch (error) {
    console.error("Error in trackAffiliateClick:", error)
  }
}

/**
 * Wrapper simplifié pour tracker un clic
 */
export const trackClick = async (
  productName: string,
  externalLink: string,
  affiliateId?: string
): Promise<void> => {
  await trackAffiliateClick({
    product_name: productName,
    external_link: externalLink,
    affiliate_id: affiliateId,
  })
}

/**
 * Génère un lien d'affiliation iHerb avec paramètres UTM
 */
export const generateIHerbLink = (params: IHerbLinkParams): string => {
  const {
    productId,
    productName,
    affiliateRef = import.meta.env.VITE_IHERB_AFFILIATE_REF || '',
    utmSource = 'lionsmax',
    utmMedium = 'affiliate',
    utmCampaign = 'iherb-product'
  } = params

  const baseUrl = `https://www.iherb.com/pr/${productId}`
  const searchParams = new URLSearchParams()

  if (affiliateRef) {
    searchParams.append('rcode', affiliateRef)
  }

  searchParams.append('utm_source', utmSource)
  searchParams.append('utm_medium', utmMedium)
  searchParams.append('utm_campaign', utmCampaign)
  searchParams.append('utm_content', productName)

  return `${baseUrl}?${searchParams.toString()}`
}

/**
 * Génère un lien d'affiliation générique avec paramètres UTM
 */
export const generateAffiliateLink = (params: AffiliateLinkParams): string => {
  const {
    baseUrl,
    productName,
    affiliateParam = 'ref',
    affiliateValue = import.meta.env.VITE_AFFILIATE_ID || 'lionsmax',
    utmSource = 'lionsmax',
    utmMedium = 'affiliate',
    utmCampaign = 'product-click'
  } = params

  const url = new URL(baseUrl)
  const searchParams = new URLSearchParams(url.search)

  // Ajouter le paramètre d'affiliation
  if (affiliateValue) {
    searchParams.append(affiliateParam, affiliateValue)
  }

  // Ajouter les paramètres UTM
  searchParams.append('utm_source', utmSource)
  searchParams.append('utm_medium', utmMedium)
  searchParams.append('utm_campaign', utmCampaign)
  searchParams.append('utm_content', productName)

  url.search = searchParams.toString()
  return url.toString()
}

/**
 * Hook personnalisé pour gérer les affiliations
 */
export const useAffiliate = () => {
  return {
    trackClick,
    trackAffiliateClick,
    generateIHerbLink,
    generateAffiliateLink,
  }
}
