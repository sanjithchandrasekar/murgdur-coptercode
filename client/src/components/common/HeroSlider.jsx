import React from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import Button from './Button';
import { Link } from 'react-router-dom';

import img1 from '../../assets/images/Gemini_Generated_Image_120fuv120fuv120f.png';
import img2 from '../../assets/images/Gemini_Generated_Image_2heebf2heebf2hee.png';
import img3 from '../../assets/images/Gemini_Generated_Image_5pgtfq5pgtfq5pgt.png';

const HeroSlider = () => {
    const slides = [
        {
            id: 1,
            image: img1,
            title: "Royal Heritage",
            subtitle: "Experience the legacy of kings.",
            link: "/shop?cat=royal"
        },
        {
            id: 2,
            image: img2,
            title: "Modern Elegance",
            subtitle: "Contemporary fashion for the elite.",
            link: "/shop?cat=contemporary"
        },
        {
            id: 3,
            image: img3,
            title: "Winter Collection",
            subtitle: "Warmth wrapped in luxury.",
            link: "/shop?cat=winter"
        }
    ];

    return (
        <div className="h-screen w-full relative">
            <SwiperComponent
                modules={[Autoplay, EffectFade, Pagination]}
                effect={'fade'}
                speed={1500}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="h-full w-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative">
                        {/* Background Image with Zoom effect manually via CSS or just static cover */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>

                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                            <span className="text-royal-gold uppercase tracking-[0.5em] mb-4 animate-slide-up">
                                New Arrivals
                            </span>
                            <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 animate-fade-in shadow-sm">
                                {slide.title}
                            </h1>
                            <p className="text-xl text-gray-200 mb-10 max-w-2xl font-light">
                                {slide.subtitle}
                            </p>
                            <Link to={slide.link}>
                                <Button variant="primary">Discover More</Button>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </SwiperComponent>

            {/* Custom CSS for Swiper positioning if needed */}
            <style>{`
        .swiper-pagination-bullet-active {
            background-color: #D6C0B0 !important;
        }
      `}</style>
        </div>
    );
};

export default HeroSlider;
