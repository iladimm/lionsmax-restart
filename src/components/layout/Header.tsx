import React from 'react';
import { Icons } from '../ui/Icons';
import { NAV_LINKS } from '../../../constants';
import { ViewState } from '../../../types';

interface HeaderProps {
    cartCount: number;
    onNavigate: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onNavigate }) => {
    return (
        <div className="w-full font-sans text-slate-800">
            {/* Top Bar */}
            <div className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 py-1.5 px-4 hidden md:block">
                <div className="max-w-[1440px] mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button className="hover:text-brand-600 flex items-center gap-1">
                            <Icons.Globe />
                            <span>EN</span>
                            <span className="text-slate-300">|</span>
                            <span>USD</span>
                            <Icons.ChevronDown />
                        </button>
                        <button className="hover:text-brand-600">Accessibility Statement</button>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-brand-600 font-medium">Free Shipping on Orders Over $50</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white py-4 px-4 border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-[1440px] mx-auto flex items-center gap-4 md:gap-8">
                    {/* Logo */}
                    <div
                        onClick={() => onNavigate('home')}
                        className="flex-shrink-0 cursor-pointer flex flex-col items-start"
                    >
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="LionsMax" className="h-8 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <h1 className="text-2xl font-bold tracking-tight text-brand-700 leading-none">LionsMax</h1>
                        </div>
                        <span className="text-[10px] text-brand-600 font-medium tracking-wide ml-10 -mt-1 hidden md:block">Restart Your Inner Lion</span>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl relative hidden md:block">
                        <input
                            type="text"
                            placeholder="Search vitamins, supplements, and natural health products..."
                            className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-500 transition-shadow"
                        />
                        <div className="absolute left-4 top-2.5 text-slate-400">
                            <Icons.Search />
                        </div>
                        <button className="absolute right-1.5 top-1.5 bg-brand-600 text-white p-1.5 rounded-full hover:bg-brand-700 transition-colors">
                            <Icons.Search />
                        </button>
                    </div>

                    {/* Mobile Search Icon (visible only on mobile) */}
                    <button className="md:hidden ml-auto text-slate-600">
                        <Icons.Search />
                    </button>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
                        <button className="hidden md:flex flex-col items-center text-xs font-medium text-slate-600 hover:text-brand-600">
                            <Icons.User />
                            <span>Sign In</span>
                        </button>

                        <div className="relative cursor-pointer hover:text-brand-600 transition-colors">
                            <Icons.ShoppingBag />
                            <span className="absolute -top-1.5 -right-1.5 bg-brand-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                                {cartCount}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Bar */}
            <nav className="bg-white border-b border-slate-200 hidden md:block shadow-sm">
                <div className="max-w-[1440px] mx-auto px-4">
                    <ul className="flex items-center gap-6 text-sm font-medium text-slate-700 overflow-x-auto no-scrollbar">
                        {NAV_LINKS.map((link) => (
                            <li key={link} className="flex-shrink-0">
                                <button
                                    onClick={() => onNavigate(link === 'Blog' ? 'blog' : 'shop')}
                                    className={`py-3 border-b-2 border-transparent hover:border-brand-600 hover:text-brand-600 transition-all ${link === 'Deals' ? 'text-red-600 hover:text-red-700 hover:border-red-600' : ''}`}
                                >
                                    {link}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};
