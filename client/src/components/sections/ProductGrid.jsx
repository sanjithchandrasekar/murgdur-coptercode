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
                            <Link to={link || "/shop"} key={item._id || idx} className="group block mb-10 relative cursor-pointer">
                                <div className="relative overflow-hidden mb-3 aspect-[4/5] bg-[#f6f6f6]">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="text-center px-2">
                                    <h3 className="text-[#19110b] font-sans text-xs font-bold tracking-[0.1em] uppercase mb-1 leading-relaxed">
                                        {item.name}
                                    </h3>
                                    {item.price && (
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
    );
};

export default ProductGrid;
