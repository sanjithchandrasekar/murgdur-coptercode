import React from 'react';


const Press = () => {
    return (
        <div className="bg-black min-h-screen text-white">

            <div className="pt-32 pb-20 px-6 container mx-auto">
                <h1 className="text-4xl md:text-6xl font-serif text-royal-gold mb-8 text-center">Press Room</h1>
                <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg font-light">
                    Latest news, press releases, and media resources from the House of Murgdur.
                </p>

                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Press Release 1 */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-lg flex flex-col md:flex-row justify-between gap-6 hover:bg-white/10 transition-colors">
                        <div>
                            <span className="text-royal-gold text-xs font-bold uppercase tracking-widest mb-2 block">October 15, 2025</span>
                            <h2 className="text-2xl font-serif text-white mb-3">Murgdur Unveils ' The Sovereign Winter' Collection in Paris</h2>
                            <p className="text-gray-400 font-light text-sm">
                                The luxury house marks its debut at Paris Fashion Week with a collection inspired by the royal durbars of 19th century India.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <button className="px-6 py-3 border border-gray-600 text-white text-xs uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all">
                                Download PDF
                            </button>
                        </div>
                    </div>

                    {/* Press Release 2 */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-lg flex flex-col md:flex-row justify-between gap-6 hover:bg-white/10 transition-colors">
                        <div>
                            <span className="text-royal-gold text-xs font-bold uppercase tracking-widest mb-2 block">August 02, 2025</span>
                            <h2 className="text-2xl font-serif text-white mb-3">House of Murgdur Appoints New Creative Director</h2>
                            <p className="text-gray-400 font-light text-sm">
                                Visionary designer Aarav Mehta takes the helm, promising to blend traditional craftsmanship with futuristic silhouettes.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <button className="px-6 py-3 border border-gray-600 text-white text-xs uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all">
                                Download PDF
                            </button>
                        </div>
                    </div>

                    {/* Press Release 3 */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-lg flex flex-col md:flex-row justify-between gap-6 hover:bg-white/10 transition-colors">
                        <div>
                            <span className="text-royal-gold text-xs font-bold uppercase tracking-widest mb-2 block">June 10, 2025</span>
                            <h2 className="text-2xl font-serif text-white mb-3">Murgdur Sustainability Report 2024-25</h2>
                            <p className="text-gray-400 font-light text-sm">
                                Achieving 100% ethical sourcing for all leather goods and launching the 'Green Gold' initiative.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <button className="px-6 py-3 border border-gray-600 text-white text-xs uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all">
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center pt-20 border-t border-white/10">
                    <h3 className="text-xl font-serif text-white mb-4">Media Enquiries</h3>
                    <p className="text-gray-400 font-light mb-6">
                        For press kits, high-resolution imagery, and interview requests.
                    </p>
                    <a href="mailto:press@murgdur.com" className="text-royal-gold text-lg border-b border-royal-gold/50 hover:border-royal-gold pb-1 transition-all">
                        press@murgdur.com
                    </a>
                </div>
            </div>

        </div>
    );
};

export default Press;
