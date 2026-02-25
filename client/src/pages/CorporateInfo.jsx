import React, { useEffect, useState } from "react";
import { fetchCorporatePage } from "../utils/sanity";
import BackButton from "../components/common/BackButton";
import SEO from "../components/common/SEO";

const CorporateInfo = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await fetchCorporatePage();
      if (result) setData(result);
    };
    load();
  }, []);

  const directors = data?.directors || [
    {
      name: "Vikram Aditya Singh",
      title: "Chairman & CEO",
      bio: "Former executive at Global Lux Group with over 20 years of experience in high fashion.",
    },
    {
      name: "Elena Rosetti",
      title: "Chief Creative Officer",
      bio: "Award-winning designer known for her fusion of European silhouettes and Asian textiles.",
    },
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <SEO
        title={`${data?.heading || "Corporate Information"} | Murgdur Governance`}
        description="Official corporate and legal information for House of Murgdur. Transparency and excellence in our operations."
        url="https://murugdur1.vercel.app/corporate"
      />

      <div className="pt-32 pb-20 px-6 container mx-auto relative">
        <div className="mb-8">
          <BackButton className="text-gray-400 hover:text-royal-gold" />
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-royal-gold mb-12 text-center">
          {data?.heading || "Corporate Information"}
        </h1>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-gray-900 border-l-4 border-royal-gold pl-4">
              Company Overview
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-gray-600 font-light leading-relaxed">
              <p className="mb-4">
                <strong>Legal Name:</strong>{" "}
                {data?.overview?.legalName || "Murgdur Private Limited"}
              </p>
              <p className="mb-4">
                <strong>Incorporation Date:</strong>{" "}
                {data?.overview?.incorporationDate || "January 15, 2012"}
              </p>
              <p className="mb-4">
                <strong>Headquarters:</strong>{" "}
                {data?.overview?.headquarters || "Bengaluru, Karnataka, India"}
              </p>
              <p>
                {data?.overview?.description ||
                  "Murgdur is a premier luxury fashion house dedicated to preserving traditional craftsmanship while engaging with modern aesthetics. We operate globally with flagship boutiques in major capital cities."}
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-gray-900 border-l-4 border-royal-gold pl-4">
              Board of Directors
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {directors.map((director, idx) => (
                <div key={idx}>
                  <h3 className="text-gray-900 font-bold text-lg">
                    {director.name}
                  </h3>
                  <p className="text-royal-gold text-sm uppercase tracking-widest mb-2">
                    {director.title}
                  </p>
                  <p className="text-gray-400 text-sm font-light">
                    {director.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-gray-900 border-l-4 border-royal-gold pl-4">
              Investor Relations
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-gray-600 font-light leading-relaxed">
              <p className="mb-6">
                {data?.investorText ||
                  "Murgdur is committed to transparency and delivering long-term value to our shareholders. Find our annual reports and financial statements below."}
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-royal-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                  Annual Report {new Date().getFullYear()}
                </button>
                <button className="px-6 py-2 border border-gray-900 text-gray-900 text-xs font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors">
                  Governance Policies
                </button>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-gray-900 border-l-4 border-royal-gold pl-4">
              Compliance
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-gray-600 font-light text-sm whitespace-pre-line">
              {data?.compliance ||
                `CIN: U51109KA2012PTC066107
VAT/TIN: 295489372
GSTIN: 29AAACM3452L1Z2`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateInfo;
