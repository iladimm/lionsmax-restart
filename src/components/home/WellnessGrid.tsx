import React from 'react';
import { BlogPost, ViewState } from '../../../types';
import { Icons } from '../ui/Icons';

interface WellnessGridProps {
    posts: BlogPost[];
    onViewArticle: (post: BlogPost) => void;
    onNavigate: (view: ViewState) => void;
}

export const WellnessGrid: React.FC<WellnessGridProps> = ({ posts, onViewArticle, onNavigate }) => {
    return (
        <div className="bg-white py-12 px-4 border-b border-slate-100">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">Wellness Center</h2>
                    <button
                        onClick={() => onNavigate('blog')}
                        className="text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1"
                    >
                        Visit Wellness Center <Icons.ChevronLeft />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.slice(0, 3).map((post) => (
                        <div
                            key={post.id}
                            onClick={() => onViewArticle(post)}
                            className="group cursor-pointer flex flex-col gap-3"
                        >
                            <div className="rounded-lg overflow-hidden aspect-video">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-brand-600 uppercase tracking-wide">{post.category}</span>
                                <h3 className="font-bold text-lg text-slate-900 leading-tight mt-1 mb-2 group-hover:text-brand-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-slate-500 line-clamp-2 mb-2">
                                    {post.excerpt}
                                </p>
                                <span className="text-xs font-bold text-slate-900 underline decoration-slate-300 underline-offset-4 group-hover:decoration-brand-600 transition-all">
                                    Read More
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
