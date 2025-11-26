import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { Product, ViewState, ChatMessage, BlogPost, Category } from './types';
import { MOCK_PRODUCTS, MOCK_BLOG_POSTS } from './constants';

// --- ICONS (SVG Strings for zero-dependency) ---
const Icons = {
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  ShoppingBag: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  MessageSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  BookOpen: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 1-4 4v14a3 3 0 0 0 3-3h7z"/></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Send: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
};

// --- SUB COMPONENTS ---

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-brand-600' : 'text-slate-400'}`}>
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

const ProductCard: React.FC<{ product: Product, onClick: () => void }> = ({ product, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full">
    <div className="relative">
      <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
      {product.isBestSeller && (
        <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-sm">
          BEST SELLER
        </span>
      )}
    </div>
    <div className="p-3 flex flex-col flex-1">
      <div className="flex items-center gap-1 mb-1">
        <Icons.Star />
        <span className="text-xs font-bold text-slate-700">{product.rating}</span>
        <span className="text-xs text-slate-400">({product.reviews})</span>
      </div>
      <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2 flex-1">{product.name}</h3>
      <p className="text-xs text-slate-500 mb-2">{product.brand}</p>
      <div className="mt-auto">
        <div className="font-bold text-lg text-slate-900">${product.price.toFixed(2)}</div>
        {product.isPrime && <span className="text-[10px] text-blue-600 font-bold">✓ Prime</span>}
        <button className="w-full mt-2 bg-slate-100 text-slate-700 text-xs font-bold py-2 rounded hover:bg-slate-200">
          View Details
        </button>
      </div>
    </div>
  </div>
);

// --- VIEW COMPONENTS ---

const HomeView = ({ onViewProduct, onViewArticle, onChangeView }: { onViewProduct: (p: Product) => void, onViewArticle: (b: BlogPost) => void, onChangeView: (v: ViewState) => void }) => {
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

      {/* Trending Products */}
      <div className="bg-white p-4 md:rounded-xl shadow-sm border border-slate-100 mx-[-1rem] md:mx-0">
        <h3 className="text-lg font-bold mb-4 px-2">Trending Now</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} onClick={() => onViewProduct(product)} />
          ))}
        </div>
      </div>

      {/* Content Feed */}
      <div className="px-4 md:px-0 pb-6">
        <h3 className="text-lg font-bold mb-4">Latest from the Blog</h3>
        <div className="space-y-4">
          {MOCK_BLOG_POSTS.map(post => (
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

const ShopView = ({ onViewProduct }: { onViewProduct: (p: Product) => void }) => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];
  const filteredProducts = filter === 'All' ? MOCK_PRODUCTS : MOCK_PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="pt-4 px-4 md:px-0">
      <h2 className="text-2xl font-bold mb-6">Shop Supplements</h2>
      
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === cat 
                ? 'bg-brand-600 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onClick={() => onViewProduct(product)} />
        ))}
      </div>
    </div>
  );
};

const ProductDetailView = ({ product, onBack }: { product: Product, onBack: () => void }) => {
  return (
    <div className="bg-white min-h-screen md:min-h-0 md:rounded-xl">
      <div className="p-4 flex items-center gap-2 border-b border-slate-100 md:hidden">
        <button onClick={onBack} className="p-1"><Icons.ChevronLeft /></button>
        <span className="font-semibold">Back to Shop</span>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-8 md:p-8">
        <div>
           <img src={product.image} alt={product.name} className="w-full aspect-square object-cover md:rounded-lg" />
        </div>

        <div className="p-4 md:p-0">
          <p className="text-brand-600 font-bold text-sm mb-1">{product.brand}</p>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
             <div className="flex text-yellow-400">
               {[...Array(5)].map((_, i) => <Icons.Star key={i} />)}
             </div>
             <span className="text-sm text-slate-500">{product.reviews} Reviews</span>
          </div>

          <div className="text-3xl font-bold text-slate-900 mb-6">${product.price.toFixed(2)}</div>

          <div className="mb-6">
            <h3 className="font-bold text-slate-900 mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed text-sm">{product.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-slate-900 mb-2">Key Benefits</h3>
            <ul className="space-y-2">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="text-green-500"><Icons.Check /></div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Desktop Buy Button area */}
          <div className="hidden md:block">
              <a 
                href={product.affiliateLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-brand-500 hover:bg-brand-600 text-white text-center font-bold py-4 rounded-lg shadow-lg transition-transform active:scale-95"
              >
                Check Price on Amazon
              </a>
              <p className="text-center text-[10px] text-slate-400 mt-2">
                As an Amazon Associate I earn from qualifying purchases.
              </p>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Buy Button */}
      <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-slate-200 md:hidden z-40">
        <a 
          href={product.affiliateLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-brand-500 text-white text-center font-bold py-3 rounded-full shadow-lg"
        >
          Check Price on Amazon
        </a>
        <p className="text-center text-[10px] text-slate-400 mt-2">
           As an Amazon Associate I earn from qualifying purchases.
        </p>
      </div>
    </div>
  );
};

const BlogView = ({ onViewArticle }: { onViewArticle: (p: BlogPost) => void }) => {
  return (
    <div className="pt-4 px-4 md:px-0">
      <h2 className="text-2xl font-bold mb-6">Health & Wellness Blog</h2>
      <div className="space-y-6">
        {MOCK_BLOG_POSTS.map(post => (
          <div key={post.id} onClick={() => onViewArticle(post)} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer group">
            <div className="h-48 overflow-hidden">
               <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="text-brand-600 font-bold uppercase">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{post.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 text-brand-600 text-sm font-semibold flex items-center gap-1">
                Read Article <Icons.ChevronLeft />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ArticleView = ({ post, onBack }: { post: BlogPost, onBack: () => void }) => (
  <div className="bg-white min-h-screen md:min-h-0 md:rounded-xl">
    <div className="relative h-64 md:rounded-t-xl overflow-hidden">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      <button onClick={onBack} className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-md text-slate-900">
        <Icons.ChevronLeft />
      </button>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
        <span className="text-brand-400 text-xs font-bold uppercase mb-1 block">{post.category}</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{post.title}</h1>
      </div>
    </div>
    
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="prose prose-slate prose-lg">
        {post.content.map((paragraph, idx) => (
          <p key={idx} className="mb-4 text-slate-700 leading-relaxed">{paragraph}</p>
        ))}
        
        {/* Contextual Ad */}
        <div className="my-8 p-4 bg-brand-50 rounded-lg border border-brand-100">
          <h4 className="font-bold text-brand-800 mb-2">Looking to get started?</h4>
          <p className="text-sm text-brand-900 mb-3">Check out our top-rated supplements curated for adults 40+.</p>
          <button className="bg-brand-600 text-white text-sm font-bold px-4 py-2 rounded shadow-sm">
            View Shop
          </button>
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
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
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[600px] bg-white md:rounded-xl md:shadow-sm overflow-hidden">
      <div className="bg-brand-600 p-4 text-white flex items-center gap-2">
        <div className="bg-white/20 p-2 rounded-full"><Icons.MessageSquare /></div>
        <div>
          <h2 className="font-bold">LionsMax Assistant</h2>
          <p className="text-[10px] opacity-80">Powered by Gemini AI • Not Medical Advice</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
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
  const [cartCount, setCartCount] = useState(0);

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
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20 md:pb-0 font-sans text-slate-800">
      
      {/* Top Banner */}
      <div className="bg-brand-600 text-white text-xs md:text-sm text-center py-2 px-4 font-medium sticky top-0 z-50">
        New Customer? Get 20% Off Your First Order Code: <span className="font-bold underline">APP123</span>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-8 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden text-slate-600">
            <Icons.Menu />
          </button>
          <div onClick={goHome} className="cursor-pointer flex items-center gap-2">
            <img 
              src="./logo.png" 
              alt="LionsMax" 
              className="h-8 w-auto object-contain" 
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none'; 
                const titleEl = document.getElementById('brand-title');
                if(titleEl) titleEl.classList.remove('hidden', 'md:block');
              }} 
            />
            <h1 id="brand-title" className="text-xl font-bold tracking-tight text-brand-700 hidden md:block">LionsMax</h1>
          </div>
        </div>
        
        {/* Search Bar - Hidden on very small screens, visible on md+ */}
        <div className="hidden md:flex flex-1 mx-8 relative">
          <input 
            type="text" 
            placeholder="Search for joint relief, energy..." 
            className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-500"
          />
          <div className="absolute left-3 top-2.5 text-slate-400">
            <Icons.Search />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Icons.ShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-5xl mx-auto md:px-4">
        {view === 'home' && <HomeView onViewProduct={viewProduct} onViewArticle={viewArticle} onChangeView={setView} />}
        {view === 'shop' && <ShopView onViewProduct={viewProduct} />}
        {view === 'product' && selectedProduct && <ProductDetailView product={selectedProduct} onBack={goShop} />}
        {view === 'blog' && <BlogView onViewArticle={viewArticle} />}
        {view === 'article' && selectedBlogPost && <ArticleView post={selectedBlogPost} onBack={goBlog} />}
        {view === 'assistant' && <AssistantView />}
      </main>

      {/* Footer / Disclaimer */}
      <footer className="bg-slate-850 text-slate-400 py-8 px-4 text-sm mt-8">
        <div className="max-w-5xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-white font-bold mb-4">LionsMax</h3>
                <p>Empowering adults 40+ to reclaim vitality through trusted supplementation.</p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li onClick={goShop} className="cursor-pointer hover:text-brand-400">Shop Supplements</li>
                  <li onClick={goBlog} className="cursor-pointer hover:text-brand-400">Health Blog</li>
                  <li className="cursor-pointer hover:text-brand-400">About Us</li>
                  <li className="cursor-pointer hover:text-brand-400">Contact</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li className="cursor-pointer hover:text-brand-400">Privacy Policy</li>
                  <li className="cursor-pointer hover:text-brand-400">Terms of Service</li>
                  <li className="cursor-pointer hover:text-brand-400">Affiliate Disclosure</li>
                </ul>
              </div>
           </div>
           <div className="border-t border-slate-700 pt-6 text-xs text-center">
             <p className="mb-2">LionsMax is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
             <p>&copy; {new Date().getFullYear()} LionsMax Restart. All rights reserved.</p>
           </div>
        </div>
      </footer>

      {/* Sticky Bottom Nav (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-6 py-2 pb-safe">
        <div className="flex justify-between items-center">
          <NavItem icon={<Icons.Home />} label="Home" active={view === 'home'} onClick={goHome} />
          <NavItem icon={<Icons.Search />} label="Shop" active={view === 'shop' || view === 'product'} onClick={goShop} />
          <NavItem icon={<Icons.MessageSquare />} label="Ask AI" active={view === 'assistant'} onClick={goAssistant} />
          <NavItem icon={<Icons.BookOpen />} label="Blog" active={view === 'blog' || view === 'article'} onClick={goBlog} />
          <NavItem icon={<Icons.User />} label="Account" active={false} onClick={() => {}} />
        </div>
      </div>

    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);