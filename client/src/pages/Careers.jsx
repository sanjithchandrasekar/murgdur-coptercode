import React, { useEffect, useState } from 'react';
import { fetchCareersPage } from '../utils/sanity';

const Careers = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const load = async () => {
            const result = await fetchCareersPage();
            if (result) setData(result);
        };
        load();
    }, []);

    const positions = data?.positions || [
        { role: "Senior Fashion Designer", location: "Design Studio • Mumbai, India" },
        { role: "Luxury Retail Manager", location: "Retail Operations • London, UK" },
        { role: "Textile Artisan (Hand Embroidery)", location: "Craftsmanship Centre • Jaipur, India" }
    ];

    return (
        <div className="bg-black min-h-screen text-white">

            <div className="pt-32 pb-20 px-6 container mx-auto">
                <h1 className="text-4xl md:text-6xl font-serif text-royal-gold mb-8 text-center">
                    {data?.heading || "Careers at Murgdur"}
                </h1>
                <div className="max-w-4xl mx-auto text-gray-300 font-light text-lg leading-relaxed text-center mb-12">
                    <p>
                        {data?.intro || "Join the artisans of the future. We are always looking for passionate individuals who share our dedication to excellence, craftsmanship, and luxury."}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-lg p-8">
                    <h2 className="text-2xl font-serif text-white mb-6 border-b border-white/10 pb-4">Current Openings</h2>

                    <div className="space-y-6">
                        {positions.map((job, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 hover:bg-white/5 rounded transition-colors">
                                <div>
                                    <h3 className="text-xl font-bold text-royal-gold">{job.role}</h3>
                                    <p className="text-sm text-gray-400">{job.location}</p>
                                </div>
                                <button className="mt-4 md:mt-0 px-6 py-2 border border-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-sm text-gray-500">
                            {data?.contactText || "Don't see a role that fits? Send your portfolio to"} <span className="text-royal-gold">{data?.contactEmail || "careers@murgdur.com"}</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Careers;
