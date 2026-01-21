import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Heritage = () => {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <div className="relative h-[60vh] bg-gradient-to-b from-[#2b2520] to-[#4a3f35] flex items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif text-[#f2f0ea] mb-6"
                    >
                        A Legacy of Excellence
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg md:text-xl text-[#dcd6ce] font-light"
                    >
                        Founded in 2019, Murgdur represents the pinnacle of luxury craftsmanship
                    </motion.p>
                </div>
            </div>

            {/* Content Section */}
            <div className="py-24 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif text-[#4a4a4a] mb-12"
                    >
                        In Memory of Sri Sundershan Duraisamy
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8 text-lg font-light text-gray-600 leading-loose"
                    >
                        <p>
                            Murgdur was founded in 2019 by the late Sri Sundershan Duraisamy, a visionary who believed that true luxury lies not in ostentation, but in the quiet confidence of impeccable craftsmanship. His philosophy was simple yet profound: create pieces that transcend trends and become treasured heirlooms.
                        </p>
                        <p>
                            Every product we create honors his legacy—a commitment to excellence, attention to detail, and an unwavering dedication to quality that defines the Murgdur name.
                        </p>
                    </motion.div>
                </div>
            </div>

        </div>
    );
};

export default Heritage;
