import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const imgMen = "/images/boy.jpeg";
const imgWomen = "/images/girl.png";
const imgRoyalWatch = "/images/royal_watch.png";
const imgRoyalBelt = "/images/royal_belt.png";
const imgRoyalWallet = "/images/royal_wallet.png";
const imgRoyalPerfume = "/images/royal_perfume.png";
const imgRoyalSunglasses = "/images/royal_sunglasses.png";
const imgRoyalJewellery = "/images/royal_jewellery.png";
const imgRoyalSaree = "/images/royal_saree.png";
const imgRoyalSherwani = "/images/royal_sherwani.png";
const imgRoyalHeels = "/images/royal_heels.png";
const imgRoyalGown = "/images/royal_gown.png";
const imgRoyalShirt = "/images/royal_shirt.png";
const imgRoyalTShirt = "/images/royal_tshirt.png";
const imgRoyalHoodie = "/images/royal_hoodie.png";
const imgRoyalSweater = "/images/royal_sweater.png";
const imgBag = "/images/hand bag.png";
const imgLogo = "/images/logo.jpeg";

const RoyalCollection = () => {
    const [activeView, setActiveView] = useState('main'); // 'main' or 'men'

    return (
        <div className="min-h-screen bg-royal-ivory pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-[600px] opacity-[0.2] pointer-events-none">
                <img src={imgMen} className="w-full h-full object-cover grayscale" alt="Heritage Background" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-royal-ivory/80 to-royal-ivory"></div>
            </div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                {/* Header */}
                <div className="text-center mb-24 relative max-w-5xl mx-auto">
                    {activeView !== 'main' && (
                        <button
                            onClick={() => {
                                if (activeView === 'men-clothing' || activeView === 'men-accessories') setActiveView('men');
                                else if (activeView === 'women-clothing' || activeView === 'women-accessories') setActiveView('women');
                                else setActiveView('main');
                            }}
                            className="absolute left-0 top-0 text-gray-500 hover:text-royal-maroon flex items-center gap-2 uppercase text-xs tracking-[0.2em] transition-all group"
                        >
                            <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Back to Collection
                        </button>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-royal-maroon uppercase tracking-[0.3em] text-xs md:text-sm font-bold flex items-center justify-center gap-4 mb-6">
                            <span className="w-12 h-[1px] bg-royal-maroon/40 hidden md:block"></span>
                            The Murgdur Legacy
                            <span className="w-12 h-[1px] bg-royal-maroon/40 hidden md:block"></span>
                        </span>
                    </motion.div>

                    <motion.h1
                        key={activeView}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-serif text-black mb-6 drop-shadow-sm tracking-wide"
                    >
                        {activeView === 'men' ? 'Royal Men' : activeView === 'women' ? 'Royal Women' : 'A Legacy of Excellence'}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-gray-600 text-lg md:text-xl font-light mb-12"
                    >
                        Founded in 2019, Murgdur represents the pinnacle of luxury craftsmanship.
                    </motion.p>

                    {activeView === 'main' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="bg-white border border-gray-200 p-8 rounded-lg max-w-4xl mx-auto shadow-sm"
                        >
                            <h2 className="text-2xl md:text-3xl font-serif text-royal-maroon mb-4">In Memory of Sri Sundershan Duraisamy</h2>
                            <p className="text-gray-600 font-light leading-relaxed">
                                "Murgdur was founded in 2019 by the late <span className="text-black font-normal">Sri Sundershan Duraisamy</span>, a visionary who believed that true luxury lies not in ostentation, but in the quiet confidence of impeccable craftsmanship. His philosophy was simple yet profound: create pieces that transcend trends and become treasured heirlooms."
                            </p>
                        </motion.div>
                    )}
                </div>

                {activeView === 'main' ? (
                    /* Main Split Layout */
                    <div className="flex flex-col md:flex-row gap-8 h-auto md:h-[600px]">

                        {/* Men's Section (Clickable) */}
                        <div
                            onClick={() => setActiveView('men')}
                            className="relative w-full md:w-1/2 h-[500px] md:h-full group overflow-hidden rounded-lg border border-white/10 shadow-2xl cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10"></div>
                            <img
                                src={imgMen}
                                alt="Royal Men's Collection"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 text-center p-6">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-wide drop-shadow-lg"
                                >
                                    Men's Collection
                                </motion.h2>
                                <p className="text-gray-200 text-sm md:text-base font-light mb-8 max-w-md mx-auto drop-shadow-md">
                                    Sherwanis, Bandhgalas, and Kurtas crafted for the modern Maharaja.
                                </p>
                                <span className="text-royal-gold uppercase tracking-[0.2em] text-sm font-bold border-b-2 border-royal-gold pb-2 hover:text-white hover:border-white transition-all duration-300 flex items-center gap-2">
                                    EXPLORE <ArrowRight size={16} />
                                </span>
                            </div>
                        </div>

                        {/* Women's Section */}
                        <div
                            onClick={() => setActiveView('women')}
                            className="relative w-full md:w-1/2 h-[500px] md:h-full group overflow-hidden rounded-lg border border-white/10 shadow-2xl cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10"></div>
                            <img
                                src={imgWomen}
                                alt="Royal Women's Collection"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 text-center p-6">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-wide drop-shadow-lg"
                                >
                                    Women's Collection
                                </motion.h2>
                                <p className="text-gray-200 text-sm md:text-base font-light mb-8 max-w-md mx-auto drop-shadow-md">
                                    Exquisite Lehengas, Sarees, and Gowns for the royal muse.
                                </p>
                                <span className="text-royal-gold uppercase tracking-[0.2em] text-sm font-bold border-b-2 border-royal-gold pb-2 hover:text-white hover:border-white transition-all duration-300 flex items-center gap-2">
                                    EXPLORE <ArrowRight size={16} />
                                </span>
                            </div>
                        </div>

                    </div>
                ) : activeView === 'men' ? (
                    /* Men's Sub-Category Layout (Clothing vs Accessories) */
                    <div className="flex flex-col md:flex-row gap-8 h-auto md:h-[600px]">

                        {/* Men's Clothing (Clickable -> Opens Sub-Sub-Menu) */}
                        <div
                            onClick={() => setActiveView('men-clothing')}
                            className="group w-full md:w-1/2 h-[450px] md:h-full flex flex-col cursor-pointer"
                        >
                            <div className="relative w-full h-[85%] overflow-hidden rounded-lg border border-white/10 shadow-2xl">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700 z-10"></div>
                                <img
                                    src={imgRoyalSherwani}
                                    alt="Royal Men's Clothing"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center pt-6 text-center">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    className="text-3xl md:text-4xl font-serif text-black mb-2 tracking-[0.2em] group-hover:text-royal-maroon transition-colors"
                                >
                                    CLOTHING
                                </motion.h2>
                                <span className="text-xs text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors flex items-center gap-2 border-b border-transparent group-hover:border-white/50 pb-0.5">
                                    View Collection <ArrowRight size={14} />
                                </span>
                            </div>
                        </div>

                        {/* Men's Accessories (Clickable -> Opens Sub-Sub-Menu) */}
                        <div
                            onClick={() => setActiveView('men-accessories')}
                            className="group w-full md:w-1/2 h-[450px] md:h-full flex flex-col cursor-pointer"
                        >
                            <div className="relative w-full h-[85%] overflow-hidden rounded-lg border border-white/10 shadow-2xl">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700 z-10"></div>
                                <img
                                    src={imgRoyalWatch}
                                    alt="Royal Men's Accessories"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center pt-6 text-center">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    className="text-3xl md:text-4xl font-serif text-black mb-2 tracking-[0.2em] group-hover:text-royal-maroon transition-colors"
                                >
                                    ACCESSORIES
                                </motion.h2>
                                <span className="text-xs text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors flex items-center gap-2 border-b border-transparent group-hover:border-white/50 pb-0.5">
                                    View Collection <ArrowRight size={14} />
                                </span>
                            </div>
                        </div>

                    </div>
                ) : activeView === 'men-clothing' ? (
                    /* Men's Clothing Sub-Categories (Shirt, Hoodie, Sweater) */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 h-auto md:h-[600px]">
                        {[
                            { name: 'ROYAL SHIRT', img: imgRoyalShirt, link: 'Shirt' },
                            { name: 'ROYAL HOODIE', img: imgRoyalHoodie, link: 'Hoodie' },
                            { name: 'ROYAL SWEATER', img: imgRoyalSweater, link: 'Sweater' }
                        ].map((item) => (
                            <Link to={`/shop?search=${item.link}`} key={item.name} className="relative w-full h-[300px] md:h-full group overflow-hidden rounded-lg border border-white/10 shadow-2xl cursor-pointer block">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10"></div>
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        className="text-2xl md:text-4xl font-serif text-white mb-6 tracking-wider"
                                    >
                                        {item.name}
                                    </motion.h2>
                                    <span className="bg-white/10 backdrop-blur-sm border border-white/50 text-white px-6 py-2 uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all duration-300">
                                        Shop Now
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : activeView === 'men-accessories' ? (
                    /* Men's Accessories Sub-Categories (9 items) */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                        {[
                            { name: 'LUXURY WATCHES', link: 'Watch', img: imgRoyalWatch },
                            { name: 'LEATHER BELTS', link: 'Belt', img: imgRoyalBelt },
                            { name: 'WALLETS', link: 'Wallet', img: imgRoyalWallet },
                            { name: 'SUNGLASSES', link: 'Sunglasses', img: imgRoyalSunglasses },
                            { name: 'BRACELETS', link: 'Bracelet', img: imgRoyalWatch },
                            { name: 'RINGS', link: 'Ring', img: imgRoyalWatch },
                            { name: 'FRAGRANCE', link: 'Perfume', img: imgRoyalPerfume },
                            { name: 'FOOTWEAR CARE', link: 'Shoe Care', img: imgRoyalBelt },
                            { name: 'TRAVEL & UTILITY', link: 'Travel', img: imgBag },
                        ].map((item, idx) => (
                            <Link to={`/shop?search=${item.link}`} key={idx} className="relative group overflow-hidden rounded-lg border border-white/10 shadow-xl cursor-pointer block">
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-700 z-10"></div>
                                {/* Reusing the generic accessories image as fallback/placeholder for now */}
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4">
                                    <h3 className="text-xl md:text-2xl font-serif text-white mb-4 tracking-wider text-shadow-lg">
                                        {item.name}
                                    </h3>
                                    <span className="text-xs text-royal-gold uppercase tracking-widest border-b border-royal-gold pb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        Explore Collection
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : activeView === 'women' ? (
                    /* Women's Sub-Category Layout (Clothing vs Accessories) */
                    <div className="flex flex-col md:flex-row gap-8 h-auto md:h-[600px]">

                        {/* Women's Clothing (Clickable -> Opens Sub-Sub-Menu) */}
                        <div
                            onClick={() => setActiveView('women-clothing')}
                            className="group w-full md:w-1/2 h-[450px] md:h-full flex flex-col cursor-pointer"
                        >
                            <div className="relative w-full h-[85%] overflow-hidden rounded-lg border border-white/10 shadow-2xl">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700 z-10"></div>
                                <img
                                    src={imgRoyalSaree}
                                    alt="Royal Women's Clothing"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center pt-6 text-center">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    className="text-3xl md:text-4xl font-serif text-black mb-2 tracking-[0.2em] group-hover:text-royal-maroon transition-colors"
                                >
                                    CLOTHING
                                </motion.h2>
                                <span className="text-xs text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors flex items-center gap-2 border-b border-transparent group-hover:border-white/50 pb-0.5">
                                    View Collection <ArrowRight size={14} />
                                </span>
                            </div>
                        </div>

                        {/* Women's Accessories (Clickable -> Opens Sub-Sub-Menu) */}
                        <div
                            onClick={() => setActiveView('women-accessories')}
                            className="group w-full md:w-1/2 h-[450px] md:h-full flex flex-col cursor-pointer"
                        >
                            <div className="relative w-full h-[85%] overflow-hidden rounded-lg border border-white/10 shadow-2xl">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700 z-10"></div>
                                <img
                                    src={imgRoyalJewellery}
                                    alt="Royal Women's Accessories"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center pt-6 text-center">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    className="text-3xl md:text-4xl font-serif text-black mb-2 tracking-[0.2em] group-hover:text-royal-maroon transition-colors"
                                >
                                    ACCESSORIES
                                </motion.h2>
                                <span className="text-xs text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors flex items-center gap-2 border-b border-transparent group-hover:border-white/50 pb-0.5">
                                    View Collection <ArrowRight size={14} />
                                </span>
                            </div>
                        </div>

                    </div>
                ) : activeView === 'women-clothing' ? (
                    /* Women's Clothing Detailed Sub-Categories */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Ethnic Wear",
                                items: ["Sarees", "Salwar Suits", "Anarkali Dresses", "Kurti Sets", "Dupattas"],
                                img: imgRoyalSaree
                            },
                            {
                                title: "Western Wear",
                                items: ["Dresses", "Tops & Blouses", "Skirts", "Trousers", "Jumpsuits"],
                                img: imgRoyalGown
                            },
                            {
                                title: "Formal Wear",
                                items: ["Blazers & Coats", "Formal Shirts", "Pencil Skirts", "Tailored Pants", "Co-ord Sets"],
                                img: imgRoyalGown
                            },
                            {
                                title: "Casual Wear",
                                items: ["Tunics", "Cotton Kurtis", "Casual Dresses", "Leggings & Jeggings"],
                                img: imgWomen
                            },
                            {
                                title: "Seasonal Wear",
                                items: ["Shawls & Stoles", "Sweaters & Cardigans", "Jackets"],
                                img: imgRoyalSaree
                            },
                            {
                                title: "Luxury & Occasion",
                                items: ["Gowns", "Designer Lehengas", "Bridal Wear", "Embroidered Suits"],
                                img: imgRoyalGown
                            }
                        ].map((category, idx) => (
                            <Link to={`/shop?search=${category.title}`} key={idx} className="relative group overflow-hidden rounded-xl border border-white/20 shadow-2xl cursor-pointer block h-[450px]">
                                {/* Background Image with lighter overlay for clarity */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-700 z-10"></div>
                                <img
                                    src={category.img}
                                    alt={category.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-100"
                                />

                                {/* Content Container - Centered */}
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8">
                                    {/* Logo/Icon placeholder or decorative element */}
                                    <div className="w-16 h-16 border border-white/30 rounded-full flex items-center justify-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-0 group-hover:scale-100">
                                        <span className="text-royal-gold font-serif text-2xl">M</span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 tracking-wide drop-shadow-lg relative inline-block">
                                        {category.title}
                                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-royal-gold"></span>
                                    </h3>

                                    <ul className="space-y-2">
                                        {category.items.map((item, i) => (
                                            <li key={i} className="text-gray-300 text-sm md:text-base font-light tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : activeView === 'women-accessories' ? (
                    /* Women's Accessories Detailed Sub-Categories */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Jewellery",
                                items: ["Necklaces", "Earrings", "Bangles & Bracelets", "Rings", "Anklets", "Nose Pins"],
                                img: imgRoyalJewellery
                            },
                            {
                                title: "Fashion Accessories",
                                items: ["Handbags", "Wallets & Purses", "Belts", "Sunglasses", "Scarves & Stoles"],
                                img: imgBag
                            },
                            {
                                title: "Hair Accessories",
                                items: ["Hair Clips & Pins", "Hair Bands & Scrunchies", "Decorative Combs"],
                                img: imgRoyalJewellery
                            },
                            {
                                title: "Watches",
                                items: ["Analog Watches", "Luxury Watches", "Smart Watches"],
                                img: imgRoyalWatch
                            },
                            {
                                title: "Footwear Accessories",
                                items: ["Socks & Stockings", "Shoe Care Kits"],
                                img: imgRoyalHeels
                            },
                            {
                                title: "Beauty & Grooming",
                                items: ["Perfumes", "Makeup Accessories", "Skincare Tools"],
                                img: imgRoyalPerfume
                            }
                        ].map((category, idx) => (
                            <Link to={`/shop?search=${category.title}`} key={idx} className="relative group overflow-hidden rounded-xl border border-white/20 shadow-2xl cursor-pointer block h-[450px]">
                                {/* Background Image with lighter overlay for clarity */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-700 z-10"></div>
                                <img
                                    src={category.img}
                                    alt={category.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-100"
                                />

                                {/* Content Container - Centered */}
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8">
                                    {/* Logo/Icon placeholder or decorative element */}
                                    <div className="w-16 h-16 border border-white/30 rounded-full flex items-center justify-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-0 group-hover:scale-100">
                                        <span className="text-royal-gold font-serif text-2xl">M</span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 tracking-wide drop-shadow-lg relative inline-block">
                                        {category.title}
                                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-royal-gold"></span>
                                    </h3>

                                    <ul className="space-y-2">
                                        {category.items.map((item, i) => (
                                            <li key={i} className="text-gray-300 text-sm md:text-base font-light tracking-wide opacity-90 group-hover:opacity-100 transition-opacity">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : null}
            </div>

            {/* Additional Features Section (Always Visible) */}
            <div className="container mx-auto mt-32 space-y-32">

                {/* 1. The Royal Concierge */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-[400px] rounded-lg overflow-hidden flex items-center justify-center border border-royal-maroon/20"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-royal-maroon via-royal-maroon/80 to-royal-maroon z-10"></div>
                    {/* Using imgMen again as background placeholder, but darkened */}
                    <img src={imgMen} className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" alt="Concierge" />

                    <div className="relative z-20 text-center px-6 max-w-3xl">
                        <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">The Royal Concierge</h2>
                        <p className="text-gray-200 text-lg mb-8 font-light">
                            Experience the luxury of private shopping. Book an appointment with our dedicated stylists for a personalized fitting session at your residence or our flagship boutique.
                        </p>
                        <button className="bg-white text-royal-maroon px-10 py-4 uppercase tracking-[0.2em] text-sm font-bold hover:bg-black hover:text-white transition-colors duration-300">
                            Book Private Appointment
                        </button>
                    </div>
                </motion.div>


                {/* 2. The Art of Regality (Craftsmanship Features) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {[
                        { title: "Hand-Woven Legacy", desc: "Sourced directly from the master weavers of Banaras and Kanchipuram." },
                        { title: "Bespoke Tailoring", desc: "Each garment is cut and stitched to perfection by our master craftsmen." },
                        { title: "Rare Fabrics", desc: "Utilizing the finest Ahimsa silk, Pashmina, and Egyptian cotton." }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="p-8 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <div className="w-16 h-16 bg-royal-maroon/10 rounded-full mx-auto mb-6 flex items-center justify-center text-royal-maroon text-2xl font-serif">
                                {idx + 1}
                            </div>
                            <h3 className="text-xl font-serif text-black mb-4 tracking-wide">{feature.title}</h3>
                            <p className="text-gray-600 font-light leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>


                {/* 3. The Royal Registry (Newsletter) */}
                <div className="border-t border-royal-maroon/20 pt-20 pb-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-serif text-black mb-4">Join The Royal Registry</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">Be the first to receive invitations to exclusive events, private previews, and stories from the Murgdur archives.</p>
                    <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            className="bg-transparent border border-gray-300 text-black px-6 py-3 w-full focus:outline-none focus:border-royal-maroon transition-colors"
                        />
                        <button className="bg-royal-maroon text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-black transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default RoyalCollection;
