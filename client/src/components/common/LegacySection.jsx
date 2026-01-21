import React from 'react';
import { motion } from 'framer-motion';

const LegacySection = () => {
    return (
        <section className="py-24 bg-royal-charcoal text-center relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 max-w-4xl relative z-10">

                {/* Main Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-royal-gold text-lg tracking-[0.3em] font-medium uppercase mb-4">Our Heritage</h2>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">A Legacy of Excellence</h1>
                    <p className="text-white/80 font-light text-lg">Founded in 2019, Murgdur represents the pinnacle of luxury craftsmanship</p>
                </motion.div>

                {/* Divider */}
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-royal-gold to-transparent mx-auto mb-12 opacity-50"></div>

                {/* Tribute Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                >
                    <h3 className="text-2xl font-serif text-royal-ivory">In Memory of Sri Sundershan Duraisamy</h3>

                    <div className="text-white/90 font-light leading-relaxed space-y-6 text-lg">
                        <p>
                            Murgdur was founded in 2019 by the late <span className="text-royal-gold">Sri Sundershan Duraisamy</span>, a visionary who believed that true luxury lies not in ostentation, but in the quiet confidence of impeccable craftsmanship. His philosophy was simple yet profound: create pieces that transcend trends and become treasured heirlooms.
                        </p>
                        <p>
                            Every product we create honors his legacy—a commitment to excellence, attention to detail, and an unwavering dedication to quality that defines the Murgdur name.
                        </p>
                    </div>

                    {/* Signature or visual element */}
                    <div className="mt-10 opacity-80">
                        <span className="font-serif italic text-3xl text-royal-gold">Murgdur</span>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default LegacySection;
