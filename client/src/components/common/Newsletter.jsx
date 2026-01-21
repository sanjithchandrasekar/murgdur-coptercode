import React from 'react';
import { Mail } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="py-24 bg-royal-ivory relative overflow-hidden border-t border-gray-200">
            {/* Decorative big letter background M - positioned far right */}
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[35rem] font-serif text-black/5 pointer-events-none select-none font-bold leading-none">
                M
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">

                {/* Text Section */}
                <div className="md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-serif text-royal-maroon mb-4">Join The Royal Circle</h2>
                    <p className="text-gray-600 font-light text-sm leading-relaxed mb-6 max-w-md">
                        Be the first to know about our exclusive launches, private sales, and prestige events.
                        Subscribe to our newsletter and receive a complimentary style guide.
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                        <span>- Early Access</span>
                        <span>- Exclusive Offers</span>
                        <span>- Style Notes</span>
                    </div>
                </div>

                {/* Form Section */}
                <div className="md:w-1/2 w-full max-w-md">
                    <form className="flex flex-col gap-4">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full bg-white border border-gray-200 text-black pl-12 pr-4 py-4 text-sm placeholder:text-gray-400 focus:outline-none focus:border-royal-maroon transition-colors"
                            />
                        </div>
                        <button className="bg-royal-maroon text-white text-xs font-bold uppercase tracking-[0.2em] py-4 px-8 hover:bg-red-900 transition-colors duration-300 w-full shadow-sm">
                            Subscribe Now
                        </button>
                    </form>
                    <p className="text-[10px] text-gray-400 mt-3 text-center">
                        By subscribing you agree to our Terms & Privacy Policy.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
