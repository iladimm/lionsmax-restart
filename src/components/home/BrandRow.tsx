import React from 'react';
import { Brand, ViewState } from '../../../types';
import { Icons } from '../ui/Icons';

interface BrandRowProps {
    brands: Brand[];
    onNavigate: (view: ViewState) => void;
}

export const BrandRow: React.FC<BrandRowProps> = ({ brands, onNavigate }) => {
    return (
        <div className="bg-white py-12 px-4 border-b border-slate-100">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900">Brands of the Week – Up to 20% Off</h2>
                        <p className="text-sm text-red-600 font-medium mt-1 flex items-center gap-1">
                            <Icons.Check /> Offer ends in 2 days, 14 hours
                        </p>
                    </div>
                    <button
                        onClick={() => onNavigate('shop')}
                        className="text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1"
                    >
                        View All <Icons.ChevronLeft />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {brands.map((brand) => (
                        <div
                            key={brand.id}
                            onClick={() => onNavigate('shop')}
                            className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-center hover:shadow-md cursor-pointer transition-shadow h-24"
                        >
                            {brand.logo.startsWith('/') ? (
                                // Local asset (like logo.png)
                                <div className="flex flex-col items-center">
                                    <img src={brand.logo} alt={brand.name} className="h-8 w-auto object-contain mb-1" />
                                    <span className="text-xs font-bold text-slate-700">{brand.name}</span>
                                </div>
                            ) : (
                                // External image
                                <img src={brand.logo} alt={brand.name} className="max-h-12 max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
