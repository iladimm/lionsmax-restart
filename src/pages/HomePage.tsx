import React from 'react';
import { Product, BlogPost, ViewState } from '../types';
import { MOCK_PRODUCTS, MOCK_BLOG_POSTS } from '../constants';
interface HomeProps {
  onViewProduct: (p: Product) => void;
  onViewArticle: (b: BlogPost) => void;
  onChangeView: (v: ViewState) => void;
}

export const HomePage: React.FC<HomeProps> = ({ onViewProduct, onViewArticle, onChangeView }) => {
  const featuredPost = MOCK_BLOG_POSTS.find(p => p.isFeatured);
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative bg-brand-50 md:rounded-2xl mt-4 mx-[-1rem] md:mx-0 overflow-hidden">
        <div className="p-6 md:p-10 flex flex-col items-start gap-4 relative z-10">
          <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Mobile-First Wellness</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            Vitality After 40 <br /> <span className="text-brand-600">Starts Here.</span>
          </h2>
          <p className="text-slate-600 max-w-md">
            Curated supplements for energy, joint health, and better sleep. Trusted by adults 40+.
          </p>
          <button onClick={() => onChangeView('shop')} className="bg-brand-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-brand-700 transition active:scale-95">
            Shop Best Sellers
          </button>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-10 bg-[url('https://images.unsplash.com/photo-1544367563-12123d896889?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center" />
      </div>

      {/* Categories */}
      <div className="px-4 md:px-0">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-lg font-bold">Shop by Concern</h3>
           <button onClick={() => onChangeView('shop')} className="text-brand-600 text-sm font-medium">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
           {['Joint Health', 'Energy & Metabolism', 'Sleep & Stress', 'Multivitamins'].map((cat) => (
             <button key={cat} onClick={() => onChangeView('shop')} className="flex-shrink-0 flex flex-col items-center gap-2 max-w-[80px]">
                <div className="w-16 h-16 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-2xl">
                  {cat.includes('Joint') && '🦴'}
                  {cat.includes('Energy') && '⚡'}
                  {cat.includes('Sleep') && '🌙'}
                  {cat.includes('Multi') && '💊'}
                </div>
                <span className="text-xs font-medium text-slate-600 text-center leading-tight">{cat.split(' ')[0]}</span>
             </button>
           ))}
        </div>
      </div>

      {/* Featured Article */}
      {featuredPost && (
        <div className="px-4 md:px-0">
          <h3 className="text-lg font-bold mb-4">Featured Article</h3>
          <div onClick={() => onViewArticle(featuredPost)} className="relative bg-slate-900 rounded-xl overflow-hidden cursor-pointer shadow-md group h-64">
            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <span className="bg-brand-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">New Guide</span>
              <h3 className="text-white text-xl font-bold leading-tight mb-2">{featuredPost.title}</h3>
              <p className="text-slate-200 text-xs line-clamp-2">{featuredPost.excerpt}</p>
            </div>
          </div>
        </div>
      )}

      {/* Trending Products */}
      <div className="bg-white p-4 md:rounded-xl shadow-sm border border-slate-100 mx-[-1rem] md:mx-0">
        <h3 className="text-lg font-bold mb-4 px-2">Trending Now</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.slice(0, 4).map(product => (
<div key={product.id} onClick={() => onViewProduct(product)} className="border border-slate-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition">
              <div className="text-sm font-bold text-slate-800">{product.name}</div>
              <div className="text-xs text-slate-500 mt-1">★★★★★ {product.rating}</div>
            </div>          ))}
        </div>
      </div>

      {/* Content Feed */}
      <div className="px-4 md:px-0 pb-6">
        <h3 className="text-lg font-bold mb-4">Latest from the Blog</h3>
        <div className="space-y-4">
          {MOCK_BLOG_POSTS.filter(p => !p.isFeatured).map(post => (
             <div key={post.id} onClick={() => onViewArticle(post)} className="flex gap-4 bg-white p-3 rounded-lg shadow-sm border border-slate-100 cursor-pointer">
                <img src={post.image} alt={post.title} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <span className="text-xs text-brand-600 font-bold uppercase">{post.category}</span>
                  <h4 className="font-bold text-slate-800 leading-tight mb-1">{post.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
