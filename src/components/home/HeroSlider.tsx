import React, { useState, useEffect } from 'react';
import { Icons } from '../ui/Icons';
import { ViewState } from '../../../types';

interface HeroSliderProps {
    onNavigate: (view: ViewState) => void;
}

const SLIDES = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1544367563-12123d896889?auto=format&fit=crop&q=80&w=1200',
        title: 'Top-Rated Supplements for 40+',
        subtitle: 'Restart your body with trusted formulas, weekly deals, and fast shipping.',
        cta: 'Shop Now',
        link: 'shop' as ViewState,
        color: 'bg-brand-50'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=1200',
        title: 'Holiday Wellness Gifts',
        subtitle: 'Give the gift of health this season. Curated packs for everyone on your list.',
        cta: 'View Gift Guide',
        link: 'shop' as ViewState,
        color: 'bg-red-50'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1552674605-46d536d0248c?auto=format&fit=crop&q=80&w=1200',
        title: 'Energy & Joint Support Packs',
        subtitle: 'Save up to 20% when you bundle our best-selling mobility and vitality boosters.',
        cta: 'Shop Bundles',
        link: 'shop' as ViewState,
        color: 'bg-blue-50'
    }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl group">
            {SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        } ${slide.color}`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent z-10" />
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="absolute right-0 top-0 h-full w-2/3 object-cover mix-blend-multiply opacity-80"
                    />
                    <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                            {slide.title}
                        </h2>
                        <p className="text-lg text-slate-700 mb-8 max-w-md">
                            {slide.subtitle}
                        </p>
                        <button
                            onClick={() => onNavigate(slide.link)}
                            className="w-fit bg-brand-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-brand-700 transition-transform active:scale-95"
                        >
                            {slide.cta}
                        </button>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
            >
                <Icons.ChevronLeft />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 rotate-180"
            >
                <Icons.ChevronLeft />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-brand-600 w-6' : 'bg-slate-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};
