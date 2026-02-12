import React from 'react';
import { Link } from 'react-router-dom';

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
                <source src={videoUrl || "https://videos.pexels.com/video-files/3205903/3205903-hd_1920_1080_25fps.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/20">
                {heading && (
                    <h2 className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase drop-shadow-lg mb-4 text-center px-4">
                        {heading}
                    </h2>
                )}
                {ctaText && ctaLink && (
                    <Link
                        to={ctaLink}
                        className="text-xs md:text-sm font-bold text-white uppercase tracking-[0.3em] border-b border-transparent hover:border-white pb-2 transition-all mt-6"
                    >
                        {ctaText}
                    </Link>
                )}
            </div>
        </section>
    );
};

export default VideoSection;
