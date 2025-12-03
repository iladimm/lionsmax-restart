import React from 'react';
import { Product } from '../../types';
import { Icons } from './Icons';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
    showOldPrice?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, showOldPrice = false }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full min-w-[160px] md:min-w-[200px]"
        >
            <div className="relative">
                <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
                {product.isBestSeller && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                        BEST SELLER
                    </span>
                )}
                {showOldPrice && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                        SALE
                    </span>
                )}
            </div>
            <div className="p-3 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-1">
                    <div className="flex text-yellow-400 text-[10px]">
                        <Icons.Star />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                    <span className="text-xs text-slate-400">({product.reviews})</span>
                </div>
                <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2 flex-1 hover:text-brand-600 transition-colors">
                    {product.name}
                </h3>
                <p className="text-xs text-slate-500 mb-2 line-clamp-1">{product.brand}</p>
                <div className="mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="font-bold text-lg text-slate-900">${product.price.toFixed(2)}</div>
                        {showOldPrice && (
                            <div className="text-xs text-slate-400 line-through">${(product.price * 1.2).toFixed(2)}</div>
                        )}
                    </div>
                    {product.isPrime && <span className="text-[10px] text-blue-600 font-bold flex items-center gap-0.5"><Icons.Check /> Prime</span>}
                    <button className="w-full mt-2 bg-slate-100 text-slate-700 text-xs font-bold py-2 rounded hover:bg-slate-200 transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
