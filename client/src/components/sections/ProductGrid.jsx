import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ heading, eyebrow, products, layout }) => {
    if (!products || products.length === 0) return null;

    return (
        <section className="py-16 relative bg-royal-ivory border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-12">
                    {eyebrow && (
                        <span className="text-royal-obsidian uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">
                            {eyebrow}
                        </span>
                    )}
                    <h2 className="text-xl md:text-2xl font-serif text-black tracking-wide">
                        {heading || "Featured Collection"}
                    </h2>
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4`}>
                    {products.map((item, idx) => {
                        const link = `/product/${item._id}`;
                        return (
                            <Link to={link || "/shop"} key={item._id || idx} className="group block mb-8">
                                <div className="overflow-hidden mb-4 rounded-sm border border-gray-200 aspect-[3/4] relative bg-white">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500 group-hover:opacity-90"
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="text-center text-[10px] md:text-xs text-black font-medium group-hover:text-royal-obsidian hover:underline underline-offset-4 decoration-royal-obsidian uppercase tracking-widest transition-colors mb-1">
                                    {item.name}
                                </h3>
                                {item.price && (
                                    <p className="text-center text-[10px] text-gray-500">₹ {item.price.toLocaleString()}</p>
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
