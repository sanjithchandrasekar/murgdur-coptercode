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

const HeroSlider = () => {
    const slides = [
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
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative">
                        {/* Background Media: Video or Image */}
                        {slide.video ? (
                            <div className="absolute inset-0 w-full h-full">
                                <video
                                    src={slide.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40"></div>
                            </div>
                        ) : (
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-black/40"></div>
                            </div>
                        )}

                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                            <span className="text-royal-gold uppercase tracking-[0.5em] mb-4 animate-slide-up">
                                New Arrivals
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif text-white mb-6 animate-fade-in shadow-sm">
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
