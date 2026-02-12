import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TextWithImage = ({ eyebrow, hashtag, heading, body, image, ctaText, ctaLink, layout }) => {
    // Layout: 'stacked' (Background Overlay), 'imageLeft', 'imageRight'

    if (layout === 'stacked') {
        const bgImage = image || "/images/royal_dress_bg.png";
        return (
            <div className="relative w-full h-screen overflow-hidden flex items-end justify-center bg-royal-black">
                {/* Background Image */}
                <img
                    src={bgImage}
                    alt={heading}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content Overlay */}
                <div className="relative z-10 text-center px-4 pb-24 flex flex-col items-center justify-end h-full w-full max-w-7xl mx-auto">
                    {eyebrow && (
                        <span className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-royal-gold mb-4 animate-fade-in block drop-shadow-md">
                            {eyebrow}
                        </span>
                    )}

                    {hashtag && (
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-royal-gold tracking-widest uppercase mb-6 drop-shadow-2xl w-full leading-tight" style={{ fontFamily: '"Stardos Stencil", cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                            {hashtag}
                        </h1>
                    )}

                    {heading && (
                        <h2 className="text-3xl md:text-5xl font-serif text-white font-medium drop-shadow-lg mb-8 tracking-wide">
                            {heading}
                        </h2>
                    )}

                    {body && (
                        <p className="text-gray-200 mb-8 max-w-2xl mx-auto font-normal leading-relaxed text-xl drop-shadow-md">
                            {body}
                        </p>
                    )}

                    {ctaText && ctaLink && (
                        <div>
                            <Link
                                to={ctaLink}
                                className="inline-block text-white border-b-2 border-royal-gold pb-1 text-base md:text-lg font-bold tracking-widest hover:text-royal-gold transition-colors drop-shadow-md uppercase"
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
        <section className="w-full bg-[#FAFAFA] overflow-hidden">
            <div className={`flex flex-col md:flex-row${isImageRight ? '-reverse' : ''} min-h-screen`}>

                {/* Image Column */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden group"
                >
                    <img
                        src={image || "/images/placeholder.jpg"}
                        alt={heading}
                        className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                        loading="lazy"
                    />
                </motion.div>

                {/* Content Column */}
                <motion.div
                    initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 h-auto md:h-screen flex flex-col justify-center items-start p-10 md:p-24 bg-white text-left relative"
                >
                    {eyebrow && (
                        <h3 className="text-royal-gold text-sm font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-royal-gold"></span> {eyebrow}
                        </h3>
                    )}

                    {heading && (
                        <h2 className="text-4xl md:text-6xl font-serif text-black mb-6 leading-tight font-medium">
                            {heading}
                        </h2>
                    )}

                    {hashtag && (
                        <h3 className="text-2xl font-bold uppercase tracking-widest text-royal-gold mb-6" style={{ fontFamily: '"Stardos Stencil", cursive' }}>
                            {hashtag}
                        </h3>
                    )}

                    {body && (
                        <p className="text-gray-700 mb-10 leading-relaxed text-lg font-normal border-l-4 border-royal-gold pl-6">
                            {body}
                        </p>
                    )}

                    {ctaText && ctaLink && (
                        <div className="pl-6">
                            <Link to={ctaLink} className="inline-block px-10 py-4 bg-black text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-royal-gold hover:text-black transition-colors shadow-lg">
                                {ctaText}
                            </Link>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default TextWithImage;
