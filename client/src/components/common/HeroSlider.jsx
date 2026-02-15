import React from 'react';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import Button from './Button';
import { Link } from 'react-router-dom';

const img1 = "/images/Gemini_Generated_Image_120fuv120fuv120f.png";
const img2 = "/images/Gemini_Generated_Image_2heebf2heebf2hee.png";
const img3 = "/images/Gemini_Generated_Image_5pgtfq5pgtfq5pgt.png";

const HeroSlider = ({ slides: customSlides }) => {
    const defaultSlides = [
        {
            id: 1,
            video: "/videos/perfume1.mp4",
            title: "Royal Heritage",
            subtitle: "Experience the legacy of kings.",
            link: "/shop?cat=royal",
            ctaText: "Shop the Royal Edit",
            secondaryLink: "/heritage",
            secondaryCtaText: "Our Legacy"
        },
        {
            id: 2,
            image: img2,
            title: "Modern Elegance",
            subtitle: "Contemporary fashion for the elite.",
            link: "/shop?cat=contemporary",
            ctaText: "View Modern Looks",
            secondaryLink: "/shop?cat=accessories",
            secondaryCtaText: "Shop Accessories"
        },
        {
            id: 3,
            image: img3,
            title: "Winter Collection",
            subtitle: "Warmth wrapped in luxury.",
            link: "/shop?cat=winter",
            ctaText: "Explore Winter",
            secondaryLink: "/shop?cat=jackets",
            secondaryCtaText: "View Jackets"
        }
    ];

    const slides = (customSlides && customSlides.length > 0) ? customSlides : defaultSlides;

    return (
        <div className="h-screen w-full relative">
            <SwiperComponent
                modules={[Autoplay, EffectFade, Pagination]}
                effect={'fade'}
                speed={1500}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="h-full w-full"
            >
                {slides.map((slide, index) => {
                    const videoSrc = slide.video || slide.videoUrl;
                    return (
                        <SwiperSlide key={slide.id || index} className="relative">
                            {/* Background Media: Video or Image */}
                            {videoSrc ? (
                                <div className="absolute inset-0 w-full h-full">
                                    <video
                                        src={videoSrc}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                </div>
                            ) : (
                                <div className="absolute inset-0 w-full h-full">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
                                        loading={index === 0 ? "eager" : "lazy"}
                                        decoding={index === 0 ? "sync" : "async"}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                                </div>
                            )}

                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-16 text-center text-white px-4 z-20">
                                {/* Eyebrow / Category */}
                                <span className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4 drop-shadow-md animate-fade-in block">
                                    {slide.subtitle ? slide.subtitle.split(' ')[0] : 'WOMEN'}
                                </span>

                                {/* Main Title */}
                                <h2
                                    className="text-3xl md:text-5xl lg:text-7xl font-sans font-black uppercase tracking-widest mb-6 drop-shadow-lg animate-slide-up"
                                    style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
                                >
                                    {slide.title}
                                </h2>

                                {/* CTA Links - Dynamic */}
                                <div className="flex gap-12 animate-fade-in delay-200">
                                    <Link
                                        to={slide.link || "/shop"}
                                        className="text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] border-b border-white pb-1 hover:text-gray-200 hover:border-gray-200 transition-all"
                                    >
                                        {slide.ctaText || "Explore Collection"}
                                    </Link>

                                    {(slide.secondaryCtaText || slide.secondaryLink) && (
                                        <Link
                                            to={slide.secondaryLink || "/royal-collection"}
                                            className="text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] border-b border-white pb-1 hover:text-gray-200 hover:border-gray-200 transition-all"
                                        >
                                            {slide.secondaryCtaText || "Discover Campaign"}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
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
