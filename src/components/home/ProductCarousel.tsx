import React, { useRef } from 'react';
import { Product, ViewState } from '../../../types';
import { ProductCard } from '../ui/ProductCard';
import { Icons } from '../ui/Icons';

interface ProductCarouselProps {
    title: string;
    products: Product[];
    onViewProduct: (product: Product) => void;
    onViewAll?: () => void;
    showOldPrice?: boolean;
    bgColor?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
    title,
    products,
    onViewProduct,
    onViewAll,
    showOldPrice = false,
    bgColor = 'bg-white'
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className={`${bgColor} py-8 px-4 border-b border-slate-100`}>
            <div className="max-w-[1440px] mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h2>
                    {onViewAll && (
                        <button
                            onClick={onViewAll}
                            className="text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1"
                        >
                            View All <Icons.ChevronLeft />
                        </button>
                    )}
                </div>

                <div className="relative group">
                    {/* Scroll Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-slate-100 rounded-full p-2 text-slate-600 hover:text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    >
                        <Icons.ChevronLeft />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-slate-100 rounded-full p-2 text-slate-600 hover:text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity rotate-180"
                    >
                        <Icons.ChevronLeft />
                    </button>

                    {/* Carousel Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0"
                    >
                        {products.map((product) => (
                            <div key={product.id} className="flex-shrink-0 w-[160px] md:w-[220px]">
                                <ProductCard
                                    product={product}
                                    onClick={() => onViewProduct(product)}
                                    showOldPrice={showOldPrice}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
