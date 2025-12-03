import React from 'react';
import { ViewState } from '../../../types';

interface CategoryListProps {
    onNavigate: (view: ViewState) => void;
}

const PRODUCT_TYPES = [
    'Supplements',
    'Vitamins',
    'Sports & Active Life',
    'Bath & Personal Care',
    'Beauty from Within',
    'Healthy Home'
];

const HEALTH_GOALS = [
    'Immune Support',
    'Energy',
    'Sleep',
    'Joint & Mobility',
    'Heart Health',
    'Metabolism & Weight',
    'Mood & Stress'
];

export const CategoryList: React.FC<CategoryListProps> = ({ onNavigate }) => {
    return (
        <div className="bg-white py-12 px-4 border-b border-slate-100">
            <div className="max-w-[1440px] mx-auto">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8">Filter by Category</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {/* Column 1: Product Types */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Product Types</h3>
                        <ul className="space-y-3">
                            {PRODUCT_TYPES.map((cat) => (
                                <li key={cat}>
                                    <button
                                        onClick={() => onNavigate('shop')}
                                        className="text-slate-700 hover:text-brand-600 hover:underline text-base"
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Health Goals */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Health Goals</h3>
                        <ul className="space-y-3">
                            {HEALTH_GOALS.map((goal) => (
                                <li key={goal}>
                                    <button
                                        onClick={() => onNavigate('shop')}
                                        className="text-slate-700 hover:text-brand-600 hover:underline text-base"
                                    >
                                        {goal}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
