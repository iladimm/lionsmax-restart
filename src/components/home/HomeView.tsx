import React from 'react';
import { Product, BlogPost, ViewState } from '../../../types';
import { MOCK_PRODUCTS, MOCK_BLOG_POSTS, MOCK_BRANDS } from '../../../constants';
import { HeroSlider } from './HeroSlider';
import { PromoRow } from './PromoRow';
import { ProductCarousel } from './ProductCarousel';
import { CategoryList } from './CategoryList';
import { BrandRow } from './BrandRow';
import { WellnessGrid } from './WellnessGrid';
import { RewardsBanner } from './RewardsBanner';

interface HomeViewProps {
    onViewProduct: (product: Product) => void;
    onViewArticle: (post: BlogPost) => void;
    onChangeView: (view: ViewState) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onViewProduct, onViewArticle, onChangeView }) => {
    // Mock data filtering for different sections
    const specialOffers = MOCK_PRODUCTS.slice(0, 4);
    const trendingProducts = MOCK_PRODUCTS.slice(2, 6);
    const bestSellers = MOCK_PRODUCTS.filter(p => p.isBestSeller);
    const newArrivals = MOCK_PRODUCTS.slice(0, 5).reverse();

    return (
        <div className="animate-fade-in bg-white">
            {/* Hero Slider */}
            <div className="px-4 md:px-0 mt-4">
                <HeroSlider onNavigate={onChangeView} />
            </div>

            {/* Promo Buttons */}
            <div className="px-4 md:px-0">
                <PromoRow onNavigate={onChangeView} />
            </div>

            {/* Special Offers */}
            <ProductCarousel
                title="Special Offers"
                products={specialOffers}
                onViewProduct={onViewProduct}
                onViewAll={() => onChangeView('shop')}
                showOldPrice={true}
                bgColor="bg-white"
            />

            {/* Filter by Category */}
            <CategoryList onNavigate={onChangeView} />

            {/* Trending Today */}
            <ProductCarousel
                title="Trending Today"
                products={trendingProducts}
                onViewProduct={onViewProduct}
                onViewAll={() => onChangeView('shop')}
                bgColor="bg-slate-50"
            />

            {/* Brands of the Week */}
            <BrandRow brands={MOCK_BRANDS} onNavigate={onChangeView} />

            {/* Best Sellers */}
            <ProductCarousel
                title="Best Sellers"
                products={bestSellers}
                onViewProduct={onViewProduct}
                onViewAll={() => onChangeView('shop')}
                bgColor="bg-white"
            />

            {/* New Arrivals */}
            <ProductCarousel
                title="New Arrivals"
                products={newArrivals}
                onViewProduct={onViewProduct}
                onViewAll={() => onChangeView('shop')}
                bgColor="bg-slate-50"
            />

            {/* Community Strip (Placeholder) */}
            <div className="bg-brand-600 py-3 text-center text-white text-sm font-bold tracking-wide">
                Join 50,000+ LionsMax Members Reclaiming Their Vitality
            </div>

            {/* Wellness Center */}
            <WellnessGrid
                posts={MOCK_BLOG_POSTS}
                onViewArticle={onViewArticle}
                onNavigate={onChangeView}
            />

            {/* Rewards Banner */}
            <RewardsBanner />
        </div>
    );
};
