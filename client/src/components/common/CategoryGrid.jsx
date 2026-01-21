import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import cat1 from '../../assets/images/Gemini_Generated_Image_687ijq687ijq687i.png';
import cat2 from '../../assets/images/hand bag.png'; // Corrected filename with space
import cat3 from '../../assets/images/Gemini_Generated_Image_7cejht7cejht7cej.png';
import cat4 from '../../assets/images/Gemini_Generated_Image_6x7jv96x7jv96x7j.png';

const CategoryGrid = () => {
    const categories = [
        { name: "Royal Shirts", img: cat1, size: "large", link: "/shop/shirts" },
        { name: "Signature Bags", img: cat2, size: "small", link: "/shop/bags" },
        { name: "Luxury Watches", img: cat3, size: "small", link: "/shop/watches" },
        { name: "Ethnic Wear", img: cat4, size: "wide", link: "/shop/ethnic" },
    ];

    return (
        <section className="py-24 px-4 bg-royal-black">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-serif text-royal-ivory mb-2">Curated Collections</h2>
                        <p className="text-gray-400">Handpicked for the connoisseur.</p>
                    </div>
                    <Link to="/shop" className="text-royal-gold flex items-center gap-2 hover:underline underline-offset-4 transition-all">
                        View All Categories <ArrowUpRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
                    {categories.map((cat, idx) => (
                        <Link
                            to={cat.link}
                            key={idx}
                            className={`relative group overflow-hidden border border-gray-800 ${cat.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                                cat.size === 'wide' ? 'md:col-span-2 md:row-span-1' :
                                    'md:col-span-1 md:row-span-1'
                                }`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${cat.img})` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-2xl font-serif text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{cat.name}</h3>
                                <span className="text-royal-gold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Shop Now</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
