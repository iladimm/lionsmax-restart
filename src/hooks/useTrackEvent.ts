import ReactGA from 'react-ga4';

export const useTrackEvent = () => {
    const trackEvent = (category: string, action: string, label?: string, value?: number) => {
        ReactGA.event({
            category,
            action,
            label,
            value,
        });
    };

    const trackAffiliateClick = (productName: string, affiliateLink: string) => {
        trackEvent('Affiliate', 'Click', productName);
        // Optional: Send to external tracking pixel if needed
    };

    const trackPageView = (path: string) => {
        ReactGA.send({ hitType: "pageview", page: path });
    };

    return { trackEvent, trackAffiliateClick, trackPageView };
};
