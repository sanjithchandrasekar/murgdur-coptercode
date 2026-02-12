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
            video: "/videos/perfume1.mp4", // Local Video
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

    const slides = (customSlides && customSlides.length > 0) ? customSlides : defaultSlides;

    return (
        <div className="h-screen w-full relative">
            <SwiperComponent
                modules={[Autoplay, EffectFade, Pagination]}
                effect={'fade'}
                speed={1500}
                autoplay={{
                    delay: 5000, // Increased delay for video visibility
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

                            <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white px-4 pb-32 z-20">
                                <h2
                                    className="text-4xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight drop-shadow-2xl font-bold animate-fade-in"
                                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
                                >
                                    {slide.title}
                                </h2>

                                <p
                                    className="text-lg md:text-2xl font-normal tracking-wide mb-10 text-gray-100 max-w-3xl drop-shadow-lg animate-slide-up"
                                >
                                    {slide.subtitle}
                                </p>

                                {slide.link && (
                                    <div className="animate-fade-in">
                                        <Link
                                            to={slide.link}
                                            className="inline-block border-2 border-royal-gold px-12 py-4 text-sm md:text-base font-bold uppercase tracking-[0.25em] hover:bg-royal-gold hover:text-black transition-all duration-300 shadow-xl backdrop-blur-sm"
                                        >
                                            {slide.ctaText || "Explore Collection"}
                                        </Link>
                                    </div>
                                )}
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
