import React from "react";
import { Link } from "react-router-dom";

const VideoSection = ({ heading, videoUrl, ctaText, ctaLink }) => {
  return (
    <section className="relative w-full h-[70vh] overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        poster="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop"
      >
        <source
          src={
            videoUrl ||
            "https://videos.pexels.com/video-files/3205903/3205903-hd_1920_1080_25fps.mp4"
          }
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
        {heading && (
          <h2
            className="font-sans text-white drop-shadow-2xl mb-12"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textShadow: "0 4px 15px rgba(0,0,0,0.6)"
            }}
          >
            {heading}
          </h2>
        )}
        {ctaText && ctaLink && (
          <Link
            to={ctaLink}
            className="text-white text-[15px] md:text-[18px] font-light tracking-[0.05em] border-b border-white/40 pb-[4px] hover:text-gray-200 hover:border-white transition-all drop-shadow-md"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
