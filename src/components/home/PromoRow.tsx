import React from 'react';
import { ViewState } from '../../../types';

interface PromoRowProps {
    onNavigate: (view: ViewState) => void;
}

const PROMOS = [
    {
        id: 1,
        title: 'Wellness Gift Guide',
        cta: 'Shop Now',
        image: 'https://images.unsplash.com/photo-1549488497-613203975559?auto=format&fit=crop&q=80&w=400',
        link: 'shop' as ViewState
    },
    {
        id: 2,
        title: 'Energy & Vitality',
        cta: 'Learn More',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=400',
        link: 'shop' as ViewState
    },
    {
        id: 3,
        title: 'Joint & Mobility Support',
        cta: 'Shop Now',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400',
        link: 'shop' as ViewState
    },
    {
        id: 4,
        title: 'New Arrivals',
        cta: 'View All',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
        link: 'shop' as ViewState
    }
];

export const PromoRow: React.FC<PromoRowProps> = ({ onNavigate }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
            {PROMOS.map((promo) => (
                <div
                    key={promo.id}
                    onClick={() => onNavigate(promo.link)}
                    className="group cursor-pointer bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-all"
                >
                    <div className="flex items-center p-3 gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden">
                            <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-slate-900 leading-tight group-hover:text-brand-600 transition-colors">
                                {promo.title}
                            </span>
                            <span className="text-xs text-slate-500 font-medium mt-0.5">
                                {promo.cta}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
