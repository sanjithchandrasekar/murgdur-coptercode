import React from 'react';

const Testimonials = () => {
    const reviews = [
        {
            text: "The fabric quality is simply unmatched. I wore the Sherwani for my reception and felt absolutely royal.",
            author: "Vikram R.",
            role: "ENTREPRENEUR, MUMBAI"
        },
        {
            text: "Murgdur understands modern luxury. The fit was perfect right out of the box. Highly recommended.",
            author: "Aarav S.",
            role: "ARCHITECT, BANGALORE"
        },
        {
            text: "Exceptional service and timely delivery. The intricate details on the waistcoat were stunning.",
            author: "Rohan K.",
            role: "DOCTOR, DELHI"
        }
    ];

    return (
        <section className="py-20 bg-royal-black text-center relative z-20">
            {/* Small Gold Separator/Icon at top if needed, based on image */}
            <div className="flex justify-center mb-8">
                <span className="w-1 h-1 bg-royal-gold rounded-full mx-1"></span>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="p-8 border border-white/10 bg-black hover:border-royal-gold/20 transition-colors duration-300 flex flex-col justify-between min-h-[220px]">
                            <p className="text-gray-400 font-serif italic text-sm leading-7 mb-6">"{review.text}"</p>
                            <div>
                                <h4 className="text-royal-gold/90 font-serif text-base tracking-wide mb-1 opacity-90">{review.author}</h4>
                                <p className="text-[10px] text-royal-gold/60 uppercase tracking-widest">{review.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
