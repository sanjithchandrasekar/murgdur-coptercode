import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TextWithImage = ({
  eyebrow,
  hashtag,
  heading,
  body,
  image,
  ctaText,
  ctaLink,
  layout,
}) => {
  // Layout: 'stacked' (Background Overlay), 'imageLeft', 'imageRight'

  if (layout === "stacked") {
    const bgImage = image || "/images/women/dresses/royal_dress_bg.png";
    return (
      <div className="relative w-full min-h-[400px] h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center bg-royal-black">
        {/* Background Image */}
        <img
          src={bgImage}
          alt={heading}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center h-full max-w-5xl mx-auto">
          {eyebrow && (
            <span className="text-[11px] md:text-[13px] font-light tracking-[0.4em] uppercase text-white/90 mb-5 animate-fade-in block drop-shadow-md">
              {eyebrow}
            </span>
          )}

          {hashtag && (
            <h1
              className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-light text-white tracking-widest uppercase mb-8 drop-shadow-2xl w-full leading-[0.9]"
              style={{
                fontFamily: '"Futura PT", Futura, sans-serif',
                textShadow: "0 4px 15px rgba(0,0,0,0.6)",
              }}
            >
              {hashtag}
            </h1>
          )}

          {heading && (
            <h2
              className="text-white drop-shadow-lg mb-10 max-w-4xl mx-auto"
              style={{
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              {heading}
            </h2>
          )}

          {body && (
            <p className="text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed text-lg md:text-xl drop-shadow-md">
              {body}
            </p>
          )}

          {ctaText && ctaLink && (
            <div className="flex justify-center gap-10">
              <Link
                to={ctaLink}
                className="inline-block text-white border-b border-white/40 pb-[4px] text-[15px] md:text-[17px] font-light tracking-wide hover:text-gray-200 hover:border-white transition-all drop-shadow-md"
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
  const isImageRight = layout === "imageRight";

  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={`flex flex-col md:flex-row${isImageRight ? "-reverse" : ""} items-center gap-16`}
        >
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: isImageRight ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-[4/5] bg-gray-100 border border-gray-200 relative overflow-hidden group rounded-sm shadow-xl">
              <img
                src={image || "/images/placeholder/placeholder.jpg"}
                alt={heading}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: isImageRight ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-left"
          >
            {eyebrow && (
              <h3 className="text-black text-[11px] md:text-[12px] font-light uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                <span className="w-10 h-[1px] bg-black/30"></span> {eyebrow}
              </h3>
            )}

            {heading && (
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-black mb-8 leading-[1.1] tracking-tight">
                {heading}
              </h2>
            )}

            {hashtag && (
              <h3
                className="text-xl md:text-2xl font-light uppercase tracking-[0.2em] text-gray-500 mb-8"
              >
                {hashtag}
              </h3>
            )}

            {body && (
              <p className="text-gray-600 mb-12 leading-relaxed text-lg md:text-xl font-light border-l border-gray-200 pl-8 max-w-lg">
                {body}
              </p>
            )}

            {ctaText && ctaLink && (
              <div className="pl-8">
                <Link
                  to={ctaLink}
                  className="inline-block text-black border-b border-black/30 pb-[3px] text-[14px] md:text-[16px] font-light tracking-[0.05em] hover:text-gray-600 hover:border-black transition-all"
                >
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
