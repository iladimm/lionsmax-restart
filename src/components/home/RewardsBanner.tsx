import React from 'react';
import { Icons } from '../ui/Icons';

export const RewardsBanner: React.FC = () => {
    return (
        <div className="bg-brand-50 py-6 px-4 border-b border-slate-200">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-around items-center gap-6 text-center md:text-left">

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white text-brand-600 flex items-center justify-center shadow-sm">
                        <Icons.Star />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">Earn rewards with every order</h4>
                        <p className="text-xs text-slate-500">Join for free and start saving.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white text-brand-600 flex items-center justify-center shadow-sm">
                        <Icons.Check />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">Best value on 40+ supplements</h4>
                        <p className="text-xs text-slate-500">Guaranteed quality and price.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white text-brand-600 flex items-center justify-center shadow-sm">
                        <Icons.MessageSquare />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-sm">Exclusive member offers</h4>
                        <p className="text-xs text-slate-500">Get early access to new products.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};
