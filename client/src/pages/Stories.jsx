import React from 'react';


const Stories = () => {
    return (
        <div className="bg-black min-h-screen text-white">

            <div className="pt-32 pb-20 px-6 container mx-auto">
                <h1 className="text-4xl md:text-6xl font-serif text-royal-gold mb-12 text-center">Murgdur Stories</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Story 1 */}
                    <div className="group cursor-pointer">
                        <div className="overflow-hidden mb-6 aspect-video">
                            <img
                                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop"
                                alt="The Lost Art"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                        </div>
                        <span className="text-xs font-bold text-royal-gold uppercase tracking-widest mb-2 block">Heritage</span>
                        <h2 className="text-3xl font-serif text-white group-hover:text-royal-gold transition-colors mb-4">The Lost Art of Zardosi</h2>
                        <p className="text-gray-400 font-light leading-relaxed">
                            Tracing the origins of gold thread embroidery back to the Mughal courts, and how Murgdur is preserving this dying art form in the 21st century.
                        </p>
                    </div>

                    {/* Story 2 */}
                    <div className="group cursor-pointer">
                        <div className="overflow-hidden mb-6 aspect-video">
                            <img
                                src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
                                alt="Winter Collection"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                        </div>
                        <span className="text-xs font-bold text-royal-gold uppercase tracking-widest mb-2 block">Campaign</span>
                        <h2 className="text-3xl font-serif text-white group-hover:text-royal-gold transition-colors mb-4">Winter in the Palace</h2>
                        <p className="text-gray-400 font-light leading-relaxed">
                            Behind the scenes of our latest campaign shot at the historic Udaipur City Palace, featuring the new velvet collection.
                        </p>
                    </div>

                    {/* Story 3 */}
                    <div className="group cursor-pointer">
                        <div className="overflow-hidden mb-6 aspect-video">
                            <img
                                src="https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069&auto=format&fit=crop"
                                alt="Sustainability"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                        </div>
                        <span className="text-xs font-bold text-royal-gold uppercase tracking-widest mb-2 block">Sustainability</span>
                        <h2 className="text-3xl font-serif text-white group-hover:text-royal-gold transition-colors mb-4">Silk Without Suffering</h2>
                        <p className="text-gray-400 font-light leading-relaxed">
                            Our commitment to ethical sourcing: Introducing Ahimsa Silk, created without harming a single silkworm.
                        </p>
                    </div>

                    {/* Story 4 */}
                    <div className="group cursor-pointer">
                        <div className="overflow-hidden mb-6 aspect-video">
                            <img
                                src="https://images.unsplash.com/photo-1627964402634-91ce35d5565f?q=80&w=2070&auto=format&fit=crop"
                                alt="Craftsmanship"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                        </div>
                        <span className="text-xs font-bold text-royal-gold uppercase tracking-widest mb-2 block">Craftsmanship</span>
                        <h2 className="text-3xl font-serif text-white group-hover:text-royal-gold transition-colors mb-4">The Making of a Monarch Bag</h2>
                        <p className="text-gray-400 font-light leading-relaxed">
                            It takes 40 hours and 3 master artisans to create one Murgdur Monarch Bag. Watch the mesmerizing process unfold.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Stories;
