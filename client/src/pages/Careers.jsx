import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchCareersPage } from "../utils/sanity";
import SEO from "../components/common/SEO";
import BackButton from "../components/common/BackButton";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const Careers = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCareersPage().then((r) => { if (r) setData(r); });
  }, []);

  const defaultPositions = [
    { role: "Senior Fashion Designer", location: "Mumbai, India", type: "Full-time", description: "Lead design direction for our signature collections.", isActive: true },
    { role: "Luxury Retail Manager", location: "London, UK", type: "Full-time", description: "Manage flagship store operations and client experience.", isActive: true },
    { role: "Textile Artisan (Hand Embroidery)", location: "Jaipur, India", type: "Part-time", description: "Craft intricate embroidery pieces for our couture line.", isActive: true },
  ];

  const defaultCultureValues = [
    { icon: "🎨", title: "Creative Freedom", description: "We encourage bold ideas and unconventional thinking." },
    { icon: "🤝", title: "Collaborative Spirit", description: "Every voice matters; we build together." },
    { icon: "🏅", title: "Excellence Always", description: "We hold our work to the highest standards." },
    { icon: "🌱", title: "Continuous Growth", description: "Invest in learning, evolve every day." },
  ];

  const allPositions = data?.positions?.length ? data.positions : defaultPositions;
  // Filter to only active positions
  const positions = allPositions.filter((p) => p.isActive !== false);
  const cultureValues = data?.cultureValues?.length ? data.cultureValues : defaultCultureValues;

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <SEO
        title={`${data?.heading || "Careers"} | Murgdur`}
        description={data?.intro || "Join the artisans of the future. Explore career opportunities at House of Murgdur."}
        url="https://murugdur1.vercel.app/careers"
      />

      {/* Hero */}
      <div className="pt-32 pb-16 px-6 bg-[#f8f6f2] relative">
        <div className="absolute top-8 left-6"><BackButton className="text-gray-500 hover:text-royal-gold" /></div>
        <div className="container mx-auto text-center max-w-3xl">
          <span className="text-royal-gold text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            {data?.eyebrow || "Work With Us"}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6">{data?.heading || "Careers at Murgdur"}</h1>
          <p className="text-gray-600 font-light text-lg leading-relaxed">
            {data?.intro || "Join the artisans of the future. We are always looking for passionate individuals who share our dedication to excellence, craftsmanship, and luxury."}
          </p>
        </div>
      </div>

      {/* Culture Values */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center text-3xl font-serif text-gray-900 mb-14">
            {data?.cultureHeading || "Our Culture"}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cultureValues.map((v, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100 hover:border-royal-gold/30 transition">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-serif text-gray-900 mb-2">{v.title}</h3>
                <p className="text-xs text-gray-500 font-light">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks / Benefits */}
      {data?.perksHeading && data?.perks?.length > 0 && (
        <section className="py-16 px-6 bg-[#f8f6f2]">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-serif text-gray-900 mb-10">{data.perksHeading}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.perks.map((p, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100">
                  <div className="text-royal-gold text-xl">✓</div>
                  <span className="text-sm text-gray-700 font-light">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Job Openings */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-serif text-gray-900 mb-10 border-b border-gray-200 pb-4">
            {data?.openingsHeading || "Current Openings"}
          </h2>
          <div className="space-y-4">
            {positions.length > 0 ? positions.map((job, idx) => (
              <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gray-50 border border-gray-100 rounded-lg hover:border-royal-gold/40 hover:bg-gray-100 transition-all">
                <div className="flex-1">
                  <h3 className="text-xl font-serif text-royal-gold mb-1">{job.role}</h3>
                  <p className="text-sm text-gray-400">
                    {job.location}{job.type ? ` • ${job.type}` : ""}
                  </p>
                  {job.description && <p className="text-sm text-gray-500 mt-2 font-light">{job.description}</p>}
                </div>
                {job.applyLink ? (
                  <a href={job.applyLink} target="_blank" rel="noopener noreferrer"
                    className="mt-4 md:mt-0 md:ml-6 shrink-0 px-6 py-2 border border-gray-900 text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all">
                    Apply Now
                  </a>
                ) : (
                  <button className="mt-4 md:mt-0 md:ml-6 shrink-0 px-6 py-2 border border-gray-300 text-gray-400 text-xs uppercase tracking-widest cursor-default">
                    Apply Now
                  </button>
                )}
              </div>
            )) : (
              <p className="text-gray-400 font-light text-center py-10">No open positions at the moment. Check back soon!</p>
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              {data?.contactText || "Don't see a role that fits? Send your portfolio to"}{" "}
              <a href={`mailto:${data?.contactEmail || "careers@murgdur.com"}`} className="text-royal-gold hover:underline">
                {data?.contactEmail || "careers@murgdur.com"}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
