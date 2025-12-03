import React from 'react';
import { Icons } from '../ui/Icons';
import { ViewState } from '../../../types';

interface FooterProps {
    onNavigate: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200 text-slate-600 font-sans">
            <div className="max-w-[1440px] mx-auto px-4">

                {/* Top Section: Columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">

                    {/* Column 1: About */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">About</h3>
                        <ul className="space-y-3 text-sm">
                            <li><button onClick={() => onNavigate('home')} className="hover:text-brand-600 hover:underline">About LionsMax</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Store Reviews</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Rewards Program</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Affiliate Program</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Quality & Testing</button></li>
                        </ul>
                    </div>

                    {/* Column 2: Company */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">Company</h3>
                        <ul className="space-y-3 text-sm">
                            <li><button className="hover:text-brand-600 hover:underline">Company Info</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Press</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Partner with LionsMax</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Careers</button></li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li><button onClick={() => onNavigate('blog')} className="hover:text-brand-600 hover:underline">Wellness Center (Blog)</button></li>
                            <li><button onClick={() => onNavigate('shop')} className="hover:text-brand-600 hover:underline">Sales & Offers</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Accessibility</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Sitemap</button></li>
                        </ul>
                    </div>

                    {/* Column 4: Customer Service */}
                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">Customer Service</h3>
                        <ul className="space-y-3 text-sm">
                            <li><button className="hover:text-brand-600 hover:underline">24/7 Support</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Suggest a Product</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Order Status</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Shipping</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Returns</button></li>
                            <li><button className="hover:text-brand-600 hover:underline">Communication Preferences</button></li>
                        </ul>
                    </div>

                    {/* Column 5: Mobile App (Placeholder) */}
                    <div className="hidden lg:block">
                        <h3 className="font-bold text-slate-900 mb-4">Mobile App</h3>
                        <div className="space-y-2">
                            <div className="bg-slate-200 h-10 rounded flex items-center justify-center text-xs font-bold text-slate-500 cursor-not-allowed">App Store (Coming Soon)</div>
                            <div className="bg-slate-200 h-10 rounded flex items-center justify-center text-xs font-bold text-slate-500 cursor-not-allowed">Google Play (Coming Soon)</div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="md:w-1/2">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Be the first to get offers and health tips in your inbox.</h3>
                        <p className="text-sm text-slate-500">Join our community of 40+ wellness enthusiasts.</p>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-2">
                        <div className="flex gap-2">
                            <input type="email" placeholder="Email Address" className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-500 outline-none" />
                            <button className="bg-brand-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-brand-700 transition-colors">Sign Up</button>
                        </div>
                        <p className="text-[10px] text-slate-400">By signing up, you agree to our Privacy Policy and Terms of Use.</p>
                    </div>
                </div>

                {/* Bottom Section: Social & Legal */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200">
                    <div className="flex items-center gap-4">
                        {/* Social Placeholders */}
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-brand-100 text-brand-600 cursor-pointer transition-colors"><Icons.Globe /></div>
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-brand-100 text-brand-600 cursor-pointer transition-colors"><Icons.MessageSquare /></div>
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-brand-100 text-brand-600 cursor-pointer transition-colors"><Icons.User /></div>
                        <div className="flex items-center gap-2 ml-4">
                            <div className="flex text-yellow-400 text-xs"><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /></div>
                            <span className="text-xs font-bold text-slate-700">4.8 Store Reviews</span>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-xs text-slate-500 mb-2">
                            Disclaimer: Supplements are not intended to diagnose, treat, cure, or prevent any disease. Consult your physician before use.
                        </p>
                        <div className="flex justify-center md:justify-end gap-4 text-xs text-slate-500">
                            <button className="hover:text-brand-600">Privacy Policy</button>
                            <button className="hover:text-brand-600">Terms of Use</button>
                            <button className="hover:text-brand-600">Accessibility</button>
                            <span>© {new Date().getFullYear()} LionsMax. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
