import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ heading, eyebrow, products, layout }) => {
    if (!products || products.length === 0) return null;

    return (
        <section className="py-20 relative bg-[#FAFAFA] border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    {eyebrow && (
                        <span className="text-royal-gold uppercase tracking-[0.25em] text-xs font-bold mb-3 block">
                            {eyebrow}
                        </span>
                    )}
                    <h2 className="text-3xl md:text-4xl font-serif text-black tracking-wide font-medium">
                        {heading || "Featured Collection"}
                    </h2>
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2`}>
                    {products.map((item, idx) => {
                        const link = `/product/${item._id}`;
                        return (
                            <Link to={link || "/shop"} key={item._id || idx} className="group block mb-10 relative">
                                <div className="overflow-hidden mb-5 rounded-sm border border-gray-100 aspect-[4/5] relative shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                                        loading="lazy"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <h3 className="text-center text-sm md:text-base text-black font-semibold group-hover:text-royal-gold uppercase tracking-widest transition-colors mb-2">
                                    {item.name}
                                </h3>
                                {item.price && (
                                    <p className="text-center text-xs font-medium text-gray-600">₹ {item.price.toLocaleString()}</p>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
