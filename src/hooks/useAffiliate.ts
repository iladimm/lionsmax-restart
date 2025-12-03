import { supabase } from "../lib/supabase"

export const trackAffiliateClick = async (product: string, link: string) => {
  try {
    await supabase.from("clicks").insert({
      product,
      affiliate_link: link,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking affiliate click:", error)
  }
}

export const trackClick = async (product: string, link?: string) => {
  await trackAffiliateClick(product, link || "")
}
