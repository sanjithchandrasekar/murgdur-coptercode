import React, { useEffect, useState } from 'react';
import { fetchVisionPage } from '../utils/sanity';

const Vision = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const load = async () => {
            const result = await fetchVisionPage();
            if (result) setData(result);
        };
        load();
    }, []);

    const defaultPillars = [
        { icon: "🌍", title: "Global Reach", description: "We envision a world where the exquisite craftsmanship of Indian royalty is celebrated in every fashion capital, from Paris to Milan, New York to Tokyo." },
        { icon: "⏳", title: "Timeless Modernity", description: "Our vision is not just to repeat history, but to evolve it. We create pieces that are rooted in tradition yet perfectly adapted for the contemporary lifestyle." },
        { icon: "✨", title: "Uncompromising Luxury", description: "We aspire to set a new benchmark for quality, where every stitch tells a story of perfection and every garment is a masterpiece of art." }
    ];

    const pillars = data?.pillars || defaultPillars;

    return (
        <div className="bg-black min-h-screen text-white">
            <div className="pt-32 pb-20 px-6 container mx-auto">
                <header className="text-center mb-16">
                    <span className="text-royal-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block animate-fade-in-up">
                        {data?.eyebrow || "The Future of Royalty"}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 animate-fade-in">
                        {data?.heading || "Our Vision"}
                    </h1>
                    <div className="w-24 h-0.5 bg-royal-gold mx-auto opacity-50"></div>
                </header>

                <div className="max-w-5xl mx-auto space-y-20">
                    {/* Main Vision Statement */}
                    <div className="text-center max-w-3xl mx-auto">
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-200">
                            "{data?.statement || "To be the global standard of regal elegance, bringing the aura of majesty to the modern wardrobe."}"
                        </p>
                    </div>

                    {/* Three Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {pillars.map((pillar, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-lg hover:border-royal-gold/30 transition-colors group">
                                <div className="h-12 w-12 rounded-full bg-royal-gold/10 flex items-center justify-center mb-6 group-hover:bg-royal-gold/20 transition-colors">
                                    <span className="text-2xl">{pillar.icon}</span>
                                </div>
                                <h3 className="text-xl font-serif text-white mb-4">{pillar.title}</h3>
                                <p className="text-gray-400 font-light text-sm leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Image Section */}
                    <div className="relative h-[400px] overflow-hidden rounded-lg">
                        <img
                            src={data?.bottomImage || "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"}
                            alt={data?.bottomCaption || "Future of Fashion"}
                            className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-[10s]"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-3xl font-serif text-white text-center px-4">
                                {data?.bottomCaption || "Creating the Heritage of Tomorrow"}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vision;
