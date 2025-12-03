import React from "react"
import { trackAffiliateClick } from "../hooks/useAffiliate"

interface AffiliateButtonProps {
  product: string
  iherbLink: string
  commission?: string
}

export const AffiliateButton: React.FC<AffiliateButtonProps> = ({
  product,
  iherbLink,
  commission,
}) => {
  const handleClick = () => {
    trackAffiliateClick(product, iherbLink)
    window.open(iherbLink, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
    >
      Acheter sur iHerb
      {commission ? ` (${commission} commission)` : ""}
    </button>
  )
}

export default AffiliateButton
