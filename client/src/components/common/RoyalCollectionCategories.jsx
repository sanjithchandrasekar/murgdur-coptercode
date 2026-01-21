import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
const mensImg = "/images/Gemini_Generated_Image_hge4lhge4lhge4lh.png";
const womensImg = "/images/Gemini_Generated_Image_aimaqdaimaqdaima.png";

const RoyalCollectionCategories = () => {
    return (
        <section className="py-24 px-6 bg-royal-black">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <span className="text-royal-gold uppercase tracking-[0.2em] text-sm font-bold">Discover</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">The Royal Collection</h2>
                    <div className="w-24 h-1 bg-royal-gold mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                    {/* MEN'S COLLECTION */}
                    <Link to="/shop?cat=men" className="group relative h-[600px] overflow-hidden border border-white/10 cursor-pointer">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundImage: `url(${mensImg})` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>

                        <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col items-center text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-4xl font-serif text-white mb-4">Men's Collection</h3>
                            <p className="text-gray-300 mb-6 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light">
                                Sherwanis, Bandhgalas, and Kurtas crafted for the modern Maharaja.
                            </p>
                            <span className="flex items-center gap-2 text-royal-gold uppercase tracking-widest text-sm font-bold border-b border-royal-gold pb-1">
                                Explore <ArrowRight size={16} />
                            </span>
                        </div>
                    </Link>

                    {/* WOMEN'S COLLECTION */}
                    <Link to="/shop?cat=women" className="group relative h-[600px] overflow-hidden border border-white/10 cursor-pointer">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                            style={{ backgroundImage: `url(${womensImg})` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>

                        <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col items-center text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-4xl font-serif text-white mb-4">Women's Collection</h3>
                            <p className="text-gray-300 mb-6 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light">
                                Lehengas, Sarees, and Anarkalis that define grace and elegance.
                            </p>
                            <span className="flex items-center gap-2 text-royal-gold uppercase tracking-widest text-sm font-bold border-b border-royal-gold pb-1">
                                Explore <ArrowRight size={16} />
                            </span>
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
};

export default RoyalCollectionCategories;
