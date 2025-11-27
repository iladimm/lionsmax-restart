import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Product, ViewState, ChatMessage, BlogPost } from './types';
import { MOCK_PRODUCTS, MOCK_BLOG_POSTS } from './constants';

// --- ICONS ---
const Icons = {
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
  ShoppingBag: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  MessageSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  BookOpen: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 1-4 4v14a3 3 0 0 0 3-3h7z" /></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>,
  Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  Send: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
  Globe: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  Share: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
  Cart: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
};

// --- SUB COMPONENTS ---

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-brand-600' : 'text-slate-400'}`}>
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

const ProductCard: React.FC<{ product: Product, onClick: () => void }> = ({ product, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full group">
    <div className="relative p-4">
      <img src={product.image} alt={product.name} className="w-full aspect-square object-contain group-hover:scale-105 transition-transform duration-300" />
      {product.isBestSeller && (
        <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-sm">
          BEST SELLER
        </span>
      )}
      <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <Icons.Share />
      </button>
    </div>
    <div className="p-3 flex flex-col flex-1 border-t border-slate-100">
      <div className="flex items-center gap-1 mb-1">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Icons.Star key={i} />
          ))}
        </div>
        <span className="text-xs text-slate-500 ml-1">{product.reviews}</span>
      </div>
      <h3 className="font-medium text-sm leading-tight mb-1 line-clamp-2 flex-1 text-slate-800 hover:text-brand-600 transition-colors">{product.name}</h3>
      <div className="mt-2">
        <div className="font-bold text-lg text-slate-900">${product.price.toFixed(2)}</div>
      </div>
      <button className="w-full mt-3 bg-brand-600 text-white text-sm font-bold py-2 rounded-full hover:bg-brand-700 transition-colors opacity-0 group-hover:opacity-100">
        Add to Cart
      </button>
    </div>
  </div>
);

// --- VIEW COMPONENTS ---

const HomeView = ({ onViewProduct, onChangeView }: { onViewProduct: (p: Product) => void, onChangeView: (v: ViewState) => void }) => {
  return (
    <div className="animate-fade-in pb-12">
      {/* Hero Section */}
      <div className="bg-accent-400 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-4">
              Shop NMN Now
            </h2>
            <p className="text-xl md:text-2xl font-medium text-slate-800 mb-8">
              Premium quality from trusted brands
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="https://s3.images-iherb.com/cgn/cgn01986/l/1.jpg"
              alt="NMN Product"
              className="h-48 md:h-80 object-contain drop-shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>

          {/* Navigation Arrows (Visual Only) */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      {/* Sub-Hero Links */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar divide-x divide-slate-100">
          {[
            { title: 'Wellness Gift Guide', subtitle: 'Shop Now' },
            { title: 'Glutathione', subtitle: 'Learn More' },
            { title: 'Premium NMN', subtitle: 'Shop Now', active: true },
            { title: 'Futurebiotics', subtitle: 'Shop Now' }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onChangeView('shop')}
              className={`flex-shrink-0 px-8 py-4 text-center min-w-[160px] hover:bg-slate-50 transition-colors ${item.active ? 'bg-white shadow-inner' : ''}`}
            >
              <div className={`text-sm font-medium ${item.active ? 'text-brand-600' : 'text-slate-600'}`}>{item.title}</div>
              <div className={`text-xs font-bold ${item.active ? 'text-brand-600' : 'text-slate-400'}`}>{item.subtitle}</div>
            </button>
          ))}
          <button onClick={() => onChangeView('shop')} className="flex-shrink-0 px-8 py-4 flex items-center gap-1 text-brand-600 font-bold text-sm hover:bg-slate-50">
            View all <Icons.ChevronRight />
          </button>
        </div>
      </div>

      {/* Recommended For You */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Recommended for you</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {MOCK_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => onViewProduct(product)} />
          ))}
        </div>
      </div>

      {/* Floating Promo Button */}
      <div className="fixed bottom-6 left-6 z-40 animate-bounce">
        <button className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 group transition-all">
          <span className="font-bold">Get 20% off your first order!</span>
          <button className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20">
            <Icons.X />
          </button>
        </button>
      </div>
    </div>
  );
};

const ShopView = ({ onViewProduct }: { onViewProduct: (p: Product) => void }) => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];
  const filteredProducts = filter === 'All' ? MOCK_PRODUCTS : MOCK_PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="pt-8 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shop Supplements</h2>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === cat
              ? 'bg-brand-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-300'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onClick={() => onViewProduct(product)} />
        ))}
      </div>
    </div>
  );
};

const ProductDetailView = ({ product, onBack }: { product: Product, onBack: () => void }) => {
  return (
    <div className="bg-white min-h-screen md:min-h-0">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600 mb-6">
          <Icons.ChevronLeft /> Back to Shop
        </button>

        <div className="md:grid md:grid-cols-2 md:gap-12">
          <div className="bg-white border border-slate-100 rounded-xl p-8 flex items-center justify-center mb-6 md:mb-0">
            <img src={product.image} alt={product.name} className="max-w-full max-h-[500px] object-contain" />
          </div>

          <div>
            <div className="mb-2">
              <span className="text-brand-600 font-bold text-sm uppercase tracking-wide">{product.brand}</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Icons.Star key={i} />)}
              </div>
              <span className="text-sm text-slate-500 hover:text-brand-600 cursor-pointer underline">{product.reviews} Reviews</span>
              <span className="text-slate-300">|</span>
              <span className="text-sm text-slate-500">Item #{product.id}</span>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                {product.isBestSeller && <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Best Seller</span>}
              </div>
              <p className="text-sm text-slate-500 mb-4">Price includes VAT</p>

              <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-full shadow-lg transition-transform active:scale-95 mb-3">
                Add to Cart
              </button>
              <button className="w-full bg-white border border-slate-300 text-slate-700 font-bold py-4 rounded-full hover:bg-slate-50 transition-colors">
                Add to List
              </button>
            </div>

            <div className="prose prose-slate prose-sm">
              <h3 className="font-bold text-slate-900">Description</h3>
              <p>{product.description}</p>

              <h3 className="font-bold text-slate-900 mt-6">Key Benefits</h3>
              <ul className="list-none pl-0 space-y-2">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="text-green-500"><Icons.Check /></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogView = ({ onViewArticle }: { onViewArticle: (p: BlogPost) => void }) => {
  return (
    <div className="pt-8 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Health & Wellness Blog</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_BLOG_POSTS.map(post => (
          <div key={post.id} onClick={() => onViewArticle(post)} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer group hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="text-brand-600 font-bold uppercase">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-brand-600 transition-colors">{post.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-2 mb-4">{post.excerpt}</p>
              <div className="text-brand-600 text-sm font-semibold flex items-center gap-1">
                Read Article <Icons.ChevronRight />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ArticleView = ({ post, onBack }: { post: BlogPost, onBack: () => void }) => (
  <div className="bg-white min-h-screen md:min-h-0">
    <div className="max-w-4xl mx-auto bg-white md:shadow-sm md:my-8 md:rounded-2xl overflow-hidden">
      <div className="relative h-64 md:h-96">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <button onClick={onBack} className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-md text-slate-900 hover:bg-white">
          <Icons.ChevronLeft />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-10">
          <span className="text-brand-400 text-xs font-bold uppercase mb-2 block tracking-wider">{post.category}</span>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      <div className="p-6 md:p-10">
        <div className="prose prose-slate prose-lg mx-auto">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="mb-6 text-slate-700 leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- GEMINI ASSISTANT ---

const AssistantView = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm the LionsMax Assistant. I can help you find supplements for joint health, energy, sleep, or general wellness for adults over 40. What are you looking for today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

      // Inject product context into the prompt
      const productContext = MOCK_PRODUCTS.map(p => `${p.name} (${p.category}): ${p.description} - Benefits: ${p.benefits.join(', ')}`).join('\n');
      const systemInstruction = `You are a specialist supplement guide for LionsMax, catering specifically to adults aged 40-70.
      Here is our product catalog:\n${productContext}\n
      Rules:
      1. Only recommend products from our catalog.
      2. If asked about medical advice (e.g., "will this cure my arthritis?"), clearly state you are an AI and not a doctor, and advise consulting a physician.
      3. Be concise and empathetic to aging concerns (joints, energy, sleep, metabolism).
      4. Suggest products that match the user's specific concern.
      5. Tone: Trustworthy, Encouraging, Informative.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `System Context: ${systemInstruction} \n\n User Question: ${userMsg.text}` }] }
        ]
      });

      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "I'm sorry, I couldn't generate a response right now.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);

    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[600px] bg-white md:rounded-xl md:shadow-sm overflow-hidden border border-slate-200 mx-auto max-w-4xl my-8">
      <div className="bg-brand-600 p-4 text-white flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full"><Icons.MessageSquare /></div>
        <div>
          <h2 className="font-bold">LionsMax Assistant</h2>
          <p className="text-[10px] opacity-80">Powered by Gemini AI • Not Medical Advice</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
              ? 'bg-brand-600 text-white rounded-br-none'
              : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
              }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about joint pain, sleep..."
            className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-brand-600 text-white p-2 rounded-full hover:bg-brand-700 disabled:opacity-50"
          >
            <Icons.Send />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- APP COMPONENT ---

const App = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [cartCount] = useState(0);

  // Navigation Handlers
  const goHome = () => setView('home');
  const goShop = () => setView('shop');
  const goBlog = () => setView('blog');
  const goAssistant = () => setView('assistant');
  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo(0, 0);
  };
  const viewArticle = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setView('article');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800">

      {/* Top Banner (Desktop) */}
      <div className="hidden md:flex justify-between items-center px-4 py-1 bg-white border-b border-slate-100 text-xs text-slate-600">
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-brand-600">Green Friday Month &gt;</span>
          <span className="cursor-pointer hover:text-brand-600">Specials &gt;</span>
          <span className="cursor-pointer hover:text-brand-600">World's Best Value &gt;</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 cursor-pointer hover:text-brand-600 border border-slate-200 rounded-full px-2 py-0.5">
            <Icons.Globe />
            <span>MA | EN | MAD</span>
          </div>
          <div className="cursor-pointer hover:text-brand-600">
            <Icons.Share />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-brand-600 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 md:gap-8">
          {/* Logo */}
          <div onClick={goHome} className="cursor-pointer flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">LionsMax</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 relative max-w-3xl">
            <input
              type="text"
              placeholder="Search all of LionsMax"
              className="w-full bg-white text-slate-900 border-none rounded-full py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-brand-300 shadow-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-brand-600">
              <Icons.Search />
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
            <button className="flex items-center gap-1 hover:bg-brand-700 px-2 py-1 rounded transition-colors">
              <Icons.User />
              <span className="hidden md:inline font-semibold text-sm">Sign in</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden md:block"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            <div className="relative cursor-pointer hover:bg-brand-700 p-2 rounded transition-colors">
              <Icons.Cart />
              <span className="absolute top-0 right-0 bg-white text-brand-600 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Navigation (Desktop) */}
      <nav className="bg-white border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between text-sm font-medium text-slate-600">
            <div className="flex gap-6 overflow-x-auto no-scrollbar py-3">
              {['Supplements', 'Sports', 'Bath', 'Beauty', 'Grocery', 'Home', 'Baby', 'Pets', 'Brands A-Z', 'Health Topics'].map(item => (
                <button key={item} onClick={goShop} className="hover:text-brand-600 whitespace-nowrap transition-colors">
                  {item}
                </button>
              ))}
            </div>
            <div className="flex gap-4 pl-4 border-l border-slate-200 py-3">
              <button className="text-brand-600 font-bold italic hover:underline">Specials</button>
              <button className="text-brand-600 font-bold italic hover:underline">Best Sellers</button>
              <button className="hover:text-brand-600">Try</button>
              <button className="hover:text-brand-600">New</button>
              <button className="flex items-center gap-1 hover:text-brand-600">
                More <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow w-full bg-slate-50">
        {view === 'home' && <HomeView onViewProduct={viewProduct} onChangeView={setView} />}
        {view === 'shop' && <ShopView onViewProduct={viewProduct} />}
        {view === 'product' && selectedProduct && <ProductDetailView product={selectedProduct} onBack={goShop} />}
        {view === 'blog' && <BlogView onViewArticle={viewArticle} />}
        {view === 'article' && selectedBlogPost && <ArticleView post={selectedBlogPost} onBack={goBlog} />}
        {view === 'assistant' && <AssistantView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-12 pb-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="hover:text-brand-600 cursor-pointer">Contact Us</li>
              <li className="hover:text-brand-600 cursor-pointer">Request a Refund</li>
              <li className="hover:text-brand-600 cursor-pointer">Order Status</li>
              <li className="hover:text-brand-600 cursor-pointer">Shipping Info</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">About Us</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="hover:text-brand-600 cursor-pointer">Our Story</li>
              <li className="hover:text-brand-600 cursor-pointer">Careers</li>
              <li className="hover:text-brand-600 cursor-pointer">Press</li>
              <li className="hover:text-brand-600 cursor-pointer">Affiliate Program</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="hover:text-brand-600 cursor-pointer">Specials</li>
              <li className="hover:text-brand-600 cursor-pointer">Best Sellers</li>
              <li className="hover:text-brand-600 cursor-pointer">New Arrivals</li>
              <li className="hover:text-brand-600 cursor-pointer">Brands A-Z</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Stay Connected</h4>
            <div className="flex gap-4 mb-4">
              {/* Social Placeholders */}
              <div className="w-8 h-8 bg-slate-200 rounded-full hover:bg-brand-600 transition-colors"></div>
              <div className="w-8 h-8 bg-slate-200 rounded-full hover:bg-brand-600 transition-colors"></div>
              <div className="w-8 h-8 bg-slate-200 rounded-full hover:bg-brand-600 transition-colors"></div>
            </div>
            <p className="text-xs text-slate-500">
              Sign up for our newsletter to get the latest health tips and exclusive offers.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-200 pt-8 text-center text-xs text-slate-400">
          <p className="mb-2">&copy; {new Date().getFullYear()} LionsMax. All rights reserved.</p>
          <p>Disclaimer: Statements made, or products sold through this website, have not been evaluated by the United States Food and Drug Administration. They are not intended to diagnose, treat, cure or prevent any disease.</p>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-6 py-2 pb-safe">
        <div className="flex justify-between items-center">
          <NavItem icon={<Icons.Home />} label="Home" active={view === 'home'} onClick={goHome} />
          <NavItem icon={<Icons.Search />} label="Shop" active={view === 'shop' || view === 'product'} onClick={goShop} />
          <NavItem icon={<Icons.MessageSquare />} label="Ask AI" active={view === 'assistant'} onClick={goAssistant} />
          <NavItem icon={<Icons.BookOpen />} label="Blog" active={view === 'blog' || view === 'article'} onClick={goBlog} />
          <NavItem icon={<Icons.User />} label="Account" active={false} onClick={() => { }} />
        </div>
      </div>

    </div>
  );
};

export default App;