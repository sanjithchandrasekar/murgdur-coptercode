import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="bg-black min-h-screen text-white">
            <div className="pt-32 pb-20 px-6 container mx-auto">
                <h1 className="text-4xl md:text-6xl font-serif text-royal-gold mb-8 text-center">About Murgdur</h1>
                <div className="max-w-4xl mx-auto space-y-8 text-gray-300 font-light text-lg leading-relaxed">
                    <p>
                        Established in the heart of royal tradition, Murgdur represents the pinnacle of luxury fashion.
                        Our journey began with a vision to revive the majestic elegance of the past and weave it into
                        the fabric of contemporary style.
                    </p>
                    <p>
                        We believe that true luxury is timeless. Every piece in our collection is a testament to
                        unparalleled craftsmanship, designed for those who appreciate the finer things in life.
                        From the choice of rare fabrics to the intricate details of embroidery, Murgdur embodies
                        perfection.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <Link to="/heritage" className="block group">
                            <div className="bg-white/5 p-8 rounded-lg border border-white/10 h-full transition-colors duration-300 group-hover:bg-white/10 group-hover:border-royal-gold/30">
                                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-royal-gold transition-colors">Our Heritage</h3>
                                <p className="text-sm">
                                    Roots depicted deep in the cultural history of royalty, inspired by the grand durbars and imperial courts.
                                </p>
                            </div>
                        </Link>
                        <Link to="/vision" className="block group">
                            <div className="bg-white/5 p-8 rounded-lg border border-white/10 h-full transition-colors duration-300 group-hover:bg-white/10 group-hover:border-royal-gold/30">
                                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-royal-gold transition-colors">Our Vision</h3>
                                <p className="text-sm">
                                    To be the global standard of regal elegance, bringing the aura of majesty to the modern wardrobe.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
