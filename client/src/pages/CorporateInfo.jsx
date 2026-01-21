import React from 'react';


const CorporateInfo = () => {
    return (
        <div className="bg-black min-h-screen text-white">

            <div className="pt-32 pb-20 px-6 container mx-auto">
                <h1 className="text-4xl md:text-6xl font-serif text-royal-gold mb-12 text-center">Corporate Information</h1>

                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Section 1 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif text-white border-l-4 border-royal-gold pl-4">Company Overview</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-gray-300 font-light leading-relaxed">
                            <p className="mb-4">
                                <strong>Legal Name:</strong> Murgdur Private Limited
                            </p>
                            <p className="mb-4">
                                <strong>Incorporation Date:</strong> January 15, 2012
                            </p>
                            <p className="mb-4">
                                <strong>Headquarters:</strong> Bengaluru, Karnataka, India
                            </p>
                            <p>
                                Murgdur is a premier luxury fashion house dedicated to preserving traditional craftsmanship while engaging with modern aesthetics. We operate globally with flagship boutiques in major capital cities.
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif text-white border-l-4 border-royal-gold pl-4">Board of Directors</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-white font-bold text-lg">Vikram Aditya Singh</h3>
                                <p className="text-royal-gold text-sm uppercase tracking-widest mb-2">Chairman & CEO</p>
                                <p className="text-gray-400 text-sm font-light">
                                    Former executive at Global Lux Group with over 20 years of experience in high fashion.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Elena Rosetti</h3>
                                <p className="text-royal-gold text-sm uppercase tracking-widest mb-2">Chief Creative Officer</p>
                                <p className="text-gray-400 text-sm font-light">
                                    Award-winning designer known for her fusion of European silhouettes and Asian textiles.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif text-white border-l-4 border-royal-gold pl-4">Investor Relations</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-gray-300 font-light leading-relaxed">
                            <p className="mb-6">
                                Murgdur is committed to transparency and delivering long-term value to our shareholders.
                                Find our annual reports and financial statements below.
                            </p>
                            <div className="flex gap-4">
                                <button className="px-6 py-2 bg-royal-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                    Annual Report 2024
                                </button>
                                <button className="px-6 py-2 border border-white text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                                    Governance Policies
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif text-white border-l-4 border-royal-gold pl-4">Compliance</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-gray-300 font-light text-sm">
                            <p>CIN: U51109KA2012PTC066107</p>
                            <p>VAT/TIN: 295489372</p>
                            <p>GSTIN: 29AAACM3452L1Z2</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CorporateInfo;
