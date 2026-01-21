import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const InfoPage = () => {
    const location = useLocation();

    // Format path to title: "/about-us" -> "About Us"
    const title = location.pathname
        .substring(1)
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="min-h-screen bg-royal-black pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-4xl text-center">
                <span className="text-royal-gold uppercase tracking-widest text-sm font-bold">Murgdur Heritage</span>
                <h1 className="text-4xl md:text-6xl font-serif text-white mt-4 mb-8">
                    {title || 'Information'}
                </h1>

                <div className="w-24 h-1 bg-royal-gold mx-auto mb-12"></div>

                <div className="bg-white/5 border border-white/10 p-12 rounded-lg backdrop-blur-sm">
                    <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
                        Our digital artisans are currently crafting this section of the Royal Experience.
                        The {title} page will be unveiled shortly.
                    </p>

                    <Link to="/shop">
                        <button className="bg-royal-gold text-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
