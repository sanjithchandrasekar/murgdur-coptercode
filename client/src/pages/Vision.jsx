import React from 'react';

const Vision = () => {
    return (
        <div className="bg-black min-h-screen text-white">
            <div className="pt-32 pb-20 px-6 container mx-auto">
                <header className="text-center mb-16">
                    <span className="text-royal-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block animate-fade-in-up">The Future of Royalty</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 animate-fade-in">Our Vision</h1>
                    <div className="w-24 h-0.5 bg-royal-gold mx-auto opacity-50"></div>
                </header>

                <div className="max-w-5xl mx-auto space-y-20">
                    {/* Main Vision Statement */}
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-200">
                            "To be the global standard of regal elegance, bringing the aura of majesty to the modern wardrobe."
                        </p>
                    </div>

                    {/* Three Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Pillar 1 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-lg hover:border-royal-gold/30 transition-colors group">
                            <div className="h-12 w-12 rounded-full bg-royal-gold/10 flex items-center justify-center mb-6 group-hover:bg-royal-gold/20 transition-colors">
                                <span className="text-2xl">🌍</span>
                            </div>
                            <h3 className="text-xl font-serif text-white mb-4">Global Reach</h3>
                            <p className="text-gray-400 font-light text-sm leading-relaxed">
                                We envision a world where the exquisite craftsmanship of Indian royalty is celebrated in every fashion capital, from Paris to Milan, New York to Tokyo.
                            </p>
                        </div>

                        {/* Pillar 2 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-lg hover:border-royal-gold/30 transition-colors group">
                            <div className="h-12 w-12 rounded-full bg-royal-gold/10 flex items-center justify-center mb-6 group-hover:bg-royal-gold/20 transition-colors">
                                <span className="text-2xl">⏳</span>
                            </div>
                            <h3 className="text-xl font-serif text-white mb-4">Timeless Modernity</h3>
                            <p className="text-gray-400 font-light text-sm leading-relaxed">
                                Our vision is not just to repeat history, but to evolve it. We create pieces that are rooted in tradition yet perfectly adapted for the contemporary lifestyle.
                            </p>
                        </div>

                        {/* Pillar 3 */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-lg hover:border-royal-gold/30 transition-colors group">
                            <div className="h-12 w-12 rounded-full bg-royal-gold/10 flex items-center justify-center mb-6 group-hover:bg-royal-gold/20 transition-colors">
                                <span className="text-2xl">✨</span>
                            </div>
                            <h3 className="text-xl font-serif text-white mb-4">Uncompromising Luxury</h3>
                            <p className="text-gray-400 font-light text-sm leading-relaxed">
                                We aspire to set a new benchmark for quality, where every stitch tells a story of perfection and every garment is a masterpiece of art.
                            </p>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative h-[400px] overflow-hidden rounded-lg">
                        <img
                            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                            alt="Future of Fashion"
                            className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-[10s]"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-3xl font-serif text-white text-center px-4">Creating the Heritage of Tomorrow</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vision;
