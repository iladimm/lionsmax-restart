import React from 'react'
import { useAffiliate, generateIHerbLink, generateAffiliateLink } from '../../hooks/useAffiliate'

export interface AffiliateButtonProps {
    // Informations produit
    productName: string
    productId?: string
    externalLink?: string

    // Configuration affiliation
    platform?: 'iherb' | 'amazon' | 'custom'
    affiliateRef?: string
    affiliateParam?: string
    affiliateValue?: string

    // Paramètres UTM personnalisés
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string

    // Tracking commission
    commissionPercentage?: number

    // Apparence du bouton
    children?: React.ReactNode
    className?: string
    variant?: 'primary' | 'secondary' | 'outline'
}

/**
 * Composant bouton d'affiliation réutilisable
 * Génère automatiquement les liens d'affiliation et track les clics
 */
export const AffiliateButton: React.FC<AffiliateButtonProps> = ({
    productName,
    productId,
    externalLink,
    platform = 'custom',
    affiliateRef,
    affiliateParam,
    affiliateValue,
    utmSource,
    utmMedium,
    utmCampaign,
    commissionPercentage,
    children = 'Acheter maintenant',
    className = '',
    variant = 'primary',
}) => {
    const { trackAffiliateClick } = useAffiliate()

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        let affiliateLink = ''

        // Générer le lien selon la plateforme
        if (platform === 'iherb' && productId) {
            affiliateLink = generateIHerbLink({
                productId,
                productName,
                affiliateRef,
                utmSource,
                utmMedium,
                utmCampaign,
            })
        } else if (externalLink) {
            affiliateLink = generateAffiliateLink({
                baseUrl: externalLink,
                productName,
                affiliateParam,
                affiliateValue,
                utmSource,
                utmMedium,
                utmCampaign,
            })
        } else {
            console.error('Missing productId for iHerb or externalLink for custom platform')
            return
        }

        // Tracker le clic dans Supabase
        await trackAffiliateClick({
            product_name: productName,
            external_link: affiliateLink,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            commission_percentage: commissionPercentage,
        })

        // Ouvrir le lien d'affiliation dans une nouvelle fenêtre
        window.open(affiliateLink, '_blank', 'noopener,noreferrer')
    }

    // Classes CSS basées sur le variant
    const variantClasses = {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-secondary text-white hover:bg-secondary-dark',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    }

    const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer'

    return (
        <button
            onClick={handleClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            type="button"
        >
            {children}
        </button>
    )
}

export default AffiliateButton
