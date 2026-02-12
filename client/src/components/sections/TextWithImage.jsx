import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TextWithImage = ({ eyebrow, hashtag, heading, body, image, ctaText, ctaLink, layout }) => {
    // Layout: 'stacked' (Background Overlay), 'imageLeft', 'imageRight'

    if (layout === 'stacked') {
        const bgImage = image || "/images/royal_dress_bg.png";
        return (
            <div className="relative w-full min-h-[400px] h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center bg-[#000000]">
                {/* Background Image */}
                <img
                    src={bgImage}
                    alt={heading}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content Overlay */}
                <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center h-full max-w-5xl mx-auto">
                    {eyebrow && (
                        <span className="text-xs md:text-sm font-bold tracking-[0.5em] uppercase text-[#D4AF37] mb-4 animate-fade-in block drop-shadow-md">
                            {eyebrow}
                        </span>
                    )}

                    {hashtag && (
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-[#D4AF37] tracking-widest uppercase mb-6 drop-shadow-2xl w-full leading-tight" style={{ fontFamily: '"Stardos Stencil", cursive' }}>
                            {hashtag}
                        </h1>
                    )}

                    {heading && (
                        <h2 className="text-2xl md:text-5xl font-serif text-white font-medium drop-shadow-md mb-8">
                            {heading}
                        </h2>
                    )}

                    {body && (
                        <p className="text-gray-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed text-lg">
                            {body}
                        </p>
                    )}

                    {ctaText && ctaLink && (
                        <div>
                            <Link
                                to={ctaLink}
                                className="inline-block text-white border-b border-white pb-1 text-sm md:text-base font-medium tracking-wide hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors drop-shadow-md"
                            >
                                {ctaText}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Side by Side Layout
    const isImageRight = layout === 'imageRight';

    return (
        <section className="py-20 bg-royal-ivory overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className={`flex flex-col md:flex-row${isImageRight ? '-reverse' : ''} items-center gap-16`}>

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: isImageRight ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative"
                    >
                        <div className="aspect-[4/3] bg-gray-900 border border-white/10 relative overflow-hidden group rounded-lg shadow-2xl">
                            <img
                                src={image || "/images/placeholder.jpg"}
                                alt={heading}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: isImageRight ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2"
                    >
                        {eyebrow && (
                            <h3 className="text-royal-obsidian text-sm font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-royal-obsidian"></span> {eyebrow}
                            </h3>
                        )}

                        {heading && (
                            <h2 className="text-4xl md:text-6xl font-serif text-black mb-6 leading-tight">
                                {heading}
                            </h2>
                        )}

                        {hashtag && (
                            <h3 className="text-xl font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
                                {hashtag}
                            </h3>
                        )}

                        {body && (
                            <p className="text-gray-600 mb-8 leading-relaxed text-lg font-light border-l-2 border-gray-200 pl-6">
                                {body}
                            </p>
                        )}

                        {ctaText && ctaLink && (
                            <div className="pl-6">
                                <Link to={ctaLink} className="inline-block px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-royal-charcoal transition-colors">
                                    {ctaText}
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TextWithImage;
