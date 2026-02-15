import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import HeroSlider from '../components/common/HeroSlider';
import RoyalCollectionCategories from '../components/common/RoyalCollectionCategories';
import ShopByOccasion from '../components/common/ShopByOccasion';
import Newsletter from '../components/common/Newsletter';
import Testimonials from '../components/common/Testimonials';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import LegacySection from '../components/common/LegacySection';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchHomePage } from '../utils/sanity';
import PageSections from '../components/sections/PageSections';

const spotlightImg = "/images/Gemini_Generated_Image_hge4lhge4lhge4lh.png";
const royalBg = "/images/royal_dress_bg.png";

import SEO from '../components/common/SEO';

const Home = () => {
    const [homeData, setHomeData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchHomePage();
            if (data) setHomeData(data);
        };
        loadData();
    }, []);

    // ---------------------------------------------------------
    // DYNAMIC PAGE BUILDER MODE
    // ---------------------------------------------------------
    if (homeData?.pageBuilder && homeData.pageBuilder.length > 0) {
        return (
            <div className="bg-royal-black overflow-x-hidden">
                <SEO
                    title="Murgdur | Royal Heritage & Luxury"
                    description="Discover the epitome of luxury tailored for the elite. Timeless fashion, royal aesthetics, and signature collections crafted for modern royalty."
                />
                <PageSections sections={homeData.pageBuilder} />

                {/* Keep Footer-like sections if they aren't part of pageBuilder yet, 
                    or assume user will add them via builder. 
                    For now, let's keep the globally used Newsletter if it's not in builder.
                    But typically Page Builder takes over full content.
                */}
                <Newsletter />
            </div>
        );
    }

    // ---------------------------------------------------------
    // LEGACY / HARDCODED FALLBACK MODE
    // ---------------------------------------------------------
    return (
        <div className="bg-royal-black overflow-x-hidden">
            <SEO
                title="Murgdur | The Kingdom of Luxury"
                description="Experience the legacy of kings. Shop our exclusive collection of royal attire, bespoke accessories, and timeless artifacts."
            />
            {/* 1. Full Screen Hero Slider */}
            <HeroSlider slides={homeData?.heroSlides} />

            {/* New Promotional Banner Section (Wood Texture Style) */}
            <div className="relative w-full min-h-[400px] h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center bg-royal-black">
                {/* Background Image - Royal Light Theme */}
                <img
                    src={homeData?.promoSection?.backgroundImage || royalBg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>

                {/* Content Overlay */}
                <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center h-full w-full max-w-7xl mx-auto">
                    {/* Eyebrow Label */}
                    <span className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-royal-gold mb-4 animate-fade-in block drop-shadow-md">
                        {homeData?.promoSection?.eyebrow || "The Imperial Showcase"}
                    </span>

                    {/* Main Hashtag - Minimalist Luxury */}
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-wide uppercase mb-6 drop-shadow-2xl w-full leading-tight text-center break-words">
                        {homeData?.promoSection?.hashtag || "#ROYALASCENSION"}
                    </h1>

                    {/* Subheading */}
                    <h2 className="text-xl md:text-2xl font-sans text-white uppercase tracking-[0.5em] font-medium drop-shadow-lg mb-8">
                        {homeData?.promoSection?.heading || "The Sovereign Winter"}
                    </h2>

                    {/* CTA */}
                    <div>
                        <Link
                            to="/royal-collection"
                            className="inline-block text-white border-b-2 border-royal-gold pb-1 text-base md:text-lg font-bold tracking-widest hover:text-royal-gold transition-colors drop-shadow-md uppercase"
                        >
                            {homeData?.promoSection?.ctaText || "Witness The Coronation"}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Maison's Creations Grid */}
            <section className="py-16 relative bg-[#FAFAFA] border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-gray-400 uppercase tracking-[0.2em] text-xs font-bold mb-3 block">From the Atelier</span>
                        <h2 className="text-3xl md:text-4xl font-sans text-black uppercase tracking-widest font-bold">
                            Treasures of the Dynasty
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-2">
                        {(homeData?.treasures && homeData.treasures.length > 0 ? homeData.treasures : [
                            { name: "Women's Handbags", img: "/images/women%20handbag/woman%20bag%20white%201.jpeg", type: "image", isStatic: true },
                            { name: "Women's Small Leather Goods", img: "/images/woens%20small%20bag.jpg", type: "image", isStatic: true },
                            { name: "Women's Sandals", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop", type: "image", isStatic: true },
                            { name: "Perfumes", img: "/images/women%20perfume/womens-perfume4.png", type: "image", isStatic: true }
                        ]).map((item, idx) => {
                            let link = item.isStatic ? "/shop" : `/product/${item._id}`;
                            if (item.isStatic) {
                                if (item.name.includes("Handbag")) link = "/shop?type=bags";
                                else if (item.name.includes("Leather Goods")) link = "/shop?type=wallets";
                                else if (item.name.includes("Sandals")) link = "/shop?type=shoes";
                                else if (item.name.includes("Perfume")) link = "/shop?type=perfumes";
                            }

                            return (
                                <Link to={link || '#'} key={idx} className="group block mb-8 relative cursor-pointer">
                                    <div className="relative overflow-hidden mb-3 aspect-[4/5] bg-[#f6f6f6]">
                                        <img
                                            src={item.image || item.img}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="text-center px-2">
                                        <h3 className="text-[#19110b] font-sans text-xs font-bold tracking-[0.1em] uppercase mb-1 leading-relaxed">
                                            {item.name}
                                        </h3>
                                        {!item.isStatic && item.price && (
                                            <p className="text-[#595959] text-[11px] font-medium tracking-wide">
                                                ₹ {item.price.toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Black Section Grid */}
            <section className="bg-royal-black py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "Men's Bags", img: "/images/mensbags/mens-bag3.png", link: "/shop?type=bags" },
                            { name: "Men's Wallet", img: "/images/mens_royal_wallet_section.png", link: "/shop?type=wallets" },
                            { name: "Men's Shoes", img: "https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?q=80&w=800&auto=format&fit=crop", link: "/shop?type=shoes" },
                            { name: "Sunglasses", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop", link: "/shop?type=sunglasses" }
                        ].map((item, idx) => (
                            <Link to={item.link || "/shop"} key={idx} className="group block mb-8">
                                <div className="overflow-hidden mb-4 rounded-sm border border-white/10 shadow-lg relative aspect-square">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="text-center text-sm md:text-base text-white font-semibold group-hover:text-royal-gold uppercase tracking-widest transition-colors border-b border-transparent group-hover:border-royal-gold inline-block pb-1">
                                    {item.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Campaign Section */}
            <section className="relative w-full h-[80vh] overflow-hidden bg-black">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                    poster="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop"
                >
                    <source src={homeData?.videoCampaign?.videoUrl || "https://videos.pexels.com/video-files/3205903/3205903-hd_1920_1080_25fps.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
                    <h2 className="text-5xl md:text-7xl font-sans font-black text-white tracking-widest uppercase drop-shadow-xl mb-6" style={{ textShadow: '0 4px 8px rgba(0,0,0,0.6)' }}>
                        {homeData?.videoCampaign?.heading || "The Royal Chronicle"}
                    </h2>
                    <Link
                        to="/royal-collection"
                        className="text-sm md:text-base font-bold text-royal-gold uppercase tracking-[0.4em] border-b-2 border-royal-gold hover:text-white hover:border-white pb-2 transition-all drop-shadow-md"
                    >
                        {homeData?.videoCampaign?.ctaText || "View The Saga"}
                    </Link>
                </div>
            </section>

            {/* 2. Welcome Note (Animated) */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="py-24 px-4 md:px-6 text-center container mx-auto"
            >
                <span className="text-gray-500 uppercase tracking-[0.3em] text-xs font-bold block mb-6">Welcome to Murgdur</span>
                <h2 className="text-2xl md:text-4xl font-sans text-white uppercase tracking-widest my-8 leading-tight max-w-4xl mx-auto font-bold drop-shadow-sm">
                    {homeData?.welcomeSection?.title || "\"The Crown Fits Only The Worthy\""}
                </h2>
                <div className="w-24 h-0.5 bg-royal-gold mx-auto my-10 opacity-80"></div>
                <p className="text-gray-300 max-w-3xl mx-auto font-normal leading-loose text-xl tracking-wide font-sans">
                    {homeData?.welcomeSection?.body || "Forged in the fires of tradition, sculpted for the modern monarch. A collection that whispers power and echoes eternity."}
                </p>
            </motion.section>

            {/* Valentine's Day Gifts Section */}
            <section className="py-20 bg-white text-center border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">Courtly Gestures</span>
                    <h2 className="text-3xl md:text-4xl font-sans text-black uppercase tracking-widest font-bold mb-12">Tokens of Affection</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {[
                            { name: "Tan Leather Satchel", price: "₹ 42,000", img: "/images/women%20handbag/women%20bag%20brown%20front.jpeg", link: "/product/42" },
                            { name: "Elegant Heels", price: "₹ 12,999", img: "/images/royal_heels.png", link: "/product/17" },
                            { name: "Signature Perfume", price: "₹ 12,500", img: "/images/royal_perfume.png", link: "/product/27" },
                            { name: "Passport Cover", price: "₹ 22,000", img: "/images/passport.jpg", link: "/product/110" },

                            { name: "Zippy Wallet", img: "/images/zippy%20wallet.jpg", link: "/product/111" },
                            { name: "Victorine Wallet", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop", link: "/product/112" },
                            { name: "Micro Vanity", img: "/images/micro.jpg", link: "/product/113" },
                            { name: "Run 55", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop", link: "/product/18" },
                            { name: "Squad Sneaker", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop", link: "/product/38" },
                            { name: "Archlight", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800&auto=format&fit=crop", link: "/shop?type=shoes" }
                        ].map((item, idx) => (
                            <Link to={item.link || "/shop"} key={idx} className="group block cursor-pointer">
                                <div className="aspect-square bg-gray-50 mb-4 overflow-hidden flex items-center justify-center p-8 relative">
                                    <button className="absolute top-4 right-4 z-10 text-gray-400 hover:text-red-600 transition-colors">
                                        <Heart size={20} />
                                    </button>
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                                        loading="lazy"
                                    />
                                </div>
                                <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-black group-hover:text-gray-600 transition-colors">{item.name}</h4>
                                {item.price && <p className="text-xs text-gray-500 mt-1">{item.price}</p>}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* High Perfumery Section */}
            <section className="py-20 bg-royal-ivory">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2 h-[400px] md:h-[600px] overflow-hidden relative group">
                            <img
                                src="/images/royal_perfume.png"
                                alt="Perfumery"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"

                            />
                        </div>
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <span className="text-royal-obsidian uppercase tracking-[0.2em] text-xs font-bold block mb-4">Essence of Majesty</span>
                            <h2 className="text-4xl lg:text-5xl font-serif text-black mb-6">Royal Olfactory</h2>
                            <p className="text-gray-600 mb-8 font-light leading-relaxed max-w-md">
                                A sensory journey through the finest ingredients. Our fragrances are crafted to evoke memories, status, and the essence of royalty.
                            </p>
                            <Link to="/shop" className="inline-block px-10 py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-royal-charcoal transition-colors">
                                Explore Fragrances
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timepieces / Watches Section */}
            <section className="py-20 bg-white text-center">
                <div className="container mx-auto px-4 md:px-6">
                    <h3 className="text-royal-obsidian text-xs font-bold uppercase tracking-[0.2em] mb-12">Guardians of Time</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Tambour Moon", img: "/images/watch%202.png", link: "/product/20" },
                            { name: "Escale Spin Time", img: "/images/watch1.png", link: "/product/21" },
                            { name: "Voyager Skeleton", img: "/images/royal_watch.png", link: "/product/22" }
                        ].map((item, idx) => (
                            <Link to={item.link || "/shop?type=watches"} key={idx} className="group cursor-pointer">
                                <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"

                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                </div>
                                <h4 className="text-lg font-serif text-black group-hover:text-royal-obsidian transition-colors">{item.name}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-royal-ivory">
                <div className="container mx-auto px-4 md:px-6">
                    <h3 className="text-royal-obsidian text-xs font-bold uppercase tracking-[0.2em] mb-12 text-center">Privileges of Court</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Personalization", desc: "Make it your own with hot stamping and painting.", img: "/images/per.jpg" },
                            { title: "The Art of Gifting", desc: "The perfect gift, beautifully wrapped.", img: "/images/gift.jpg" },
                            { title: "Repairs & Care", desc: "Preserve the beauty of your Murgdur creation.", img: "/images/cares.jpg" }
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="aspect-video overflow-hidden mb-6 relative">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"

                                    />
                                </div>
                                <h4 className="text-lg font-serif text-black mb-2">{item.title}</h4>
                                <p className="text-sm text-gray-500 font-light underline underline-offset-4 decoration-gray-300 group-hover:decoration-royal-obsidian transition-all">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* World of Murgdur (Magazine) */}
            <section className="py-20 bg-white text-center">
                <div className="container mx-auto px-4 md:px-6">
                    <h3 className="text-royal-obsidian text-xs font-bold uppercase tracking-[0.2em] mb-12">World of Murgdur</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[
                            { title: "Men's Fall-Winter 2026 Show", category: "FASHION SHOWS", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop" },
                            { title: "Commitment to Sustainability", category: "SUSTAINABILITY", img: "/images/sus.jpg" },
                            { title: "La Galerie Murgdur", category: "ARTS & CULTURE", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop" }
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <Link to="/royal-collection">
                                    <div className="aspect-[4/3] overflow-hidden mb-6 relative">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"

                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-royal-obsidian uppercase tracking-widest mb-2 block">{item.category}</span>
                                    <h4 className="text-xl font-serif text-black group-hover:text-royal-obsidian transition-colors">{item.title}</h4>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Shop By Occasion (Replaced with Custom Section matching User Image) */}
            <section className="py-20 bg-royal-ivory text-center">
                <div className="container mx-auto px-4 md:px-6">
                    <span className="text-black uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">Ceremonies & Galas</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-black mb-12">The Royal Calendar</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "The Wedding", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop" },
                            { name: "Cocktail Hour", img: "/images/royal_perfume.png" },
                            { name: "Festive Gala", img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop" },
                            { name: "Business Elite", img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop" }
                        ].map((item, idx) => (
                            <Link to="/shop" key={idx} className="group relative h-[300px] md:h-[400px] overflow-hidden rounded-sm cursor-pointer block">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    loading="lazy"

                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-6 left-0 w-full text-center">
                                    <h3 className="text-white font-serif text-lg tracking-wider group-hover:text-gray-200 transition-colors">{item.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Royal Collection: Men & Women Categories */}
            <RoyalCollectionCategories />

            {/* 5. The 'Bespoke' Atelier (Interactive) */}
            <section className="py-24 relative overflow-hidden bg-royal-black border-y border-gray-900">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full md:w-1/2 relative"
                        >
                            <div className="aspect-video bg-gray-900 border border-white/10 relative overflow-hidden group rounded-lg shadow-2xl">
                                <img
                                    src={spotlightImg}
                                    alt="Bespoke Tailoring"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                    loading="lazy"

                                />

                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full md:w-1/2"
                        >
                            <h3 className="text-white text-sm font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-white"></span> The King's Tailor
                            </h3>
                            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">Bespoke <br /> Sovereignty</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed text-lg font-light border-l-2 border-white/10 pl-6">
                                True luxury lies in the perfect fit. Our master tailors combine generations of craftsmanship with your unique measurements to create garments that are exclusively yours.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 pl-6">
                                <Link to="/royal-collection">
                                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8">
                                        Book Consultation
                                    </Button>
                                </Link>
                                <Link to="/heritage" className="flex items-center text-gray-500 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold gap-2">
                                    Read Our Story <span className="text-lg">→</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>






            {/* 7. New Legacy/Heritage Section */}
            <LegacySection />

            {/* 8. Client Diaries (Testimonials) */}
            <Testimonials />

            {/* 9. Newsletter */}
            <Newsletter />

        </div >
    );
};

export default Home;
