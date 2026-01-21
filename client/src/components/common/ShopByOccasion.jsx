import React from 'react';
import { Link } from 'react-router-dom';

import occ1 from '../../assets/images/Gemini_Generated_Image_7ou9zl7ou9zl7ou9.png';
import occ2 from '../../assets/images/Gemini_Generated_Image_96hr3v96hr3v96hr.png';
import occ3 from '../../assets/images/Gemini_Generated_Image_aimaqdaimaqdaima.png';
import occ4 from '../../assets/images/Gemini_Generated_Image_b1fmq6b1fmq6b1fm.png';

const ShopByOccasion = () => {
    const occasions = [
        { name: "The Wedding", image: occ1 },
        { name: "Cocktail Hour", image: occ2 },
        { name: "Festive Gala", image: occ3 },
        { name: "Business Elite", image: occ4 }
    ];

    return (
        <section className="py-20 bg-royal-black text-center">
            <span className="text-royal-gold uppercase tracking-widest text-xs font-bold mb-2 block">Curated For You</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-12">Shop By Occasion</h2>

            <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {occasions.map((item, idx) => (
                    <Link to="/shop" key={idx} className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer block">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/90 to-transparent"></div>
                        <div className="absolute bottom-6 left-0 w-full text-center">
                            <h3 className="text-xl font-serif text-white group-hover:text-royal-gold transition-colors">{item.name}</h3>
                            <span className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-wider mt-2 block">
                                Explore
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ShopByOccasion;
