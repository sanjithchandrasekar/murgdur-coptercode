import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchLegacySection } from "../../utils/sanity";

const LegacySection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await fetchLegacySection();
      if (result) setData(result);
    };
    load();
  }, []);

  return (
    <section className="py-24 bg-white text-center relative overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-gray-500 text-lg tracking-[0.3em] font-medium uppercase mb-4">
            {data?.subHeading || "Our Heritage"}
          </h2>
          <h1 className="text-4xl md:text-5xl font-serif text-black mb-6">
            {data?.heading || "A Legacy of Excellence"}
          </h1>
          <p className="text-gray-600 font-light text-lg">
            {data?.body ||
              "Founded in 2018, Murgdur represents the pinnacle of luxury craftsmanship rooted in Indian royal tradition."}
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {(data?.stats?.length > 0 ? data.stats : [
            { number: "500+", label: "Happy Clients" },
            { number: "200+", label: "Unique Designs" },
            { number: "15+", label: "Master Artisans" },
            { number: "7 Yrs", label: "Of Legacy" },
          ]).map((stat, i) => (
            <div key={i} className="border border-gray-100 py-6 px-4 hover:border-royal-gold/30 transition-colors">
              <div className="text-3xl font-serif text-[#C9A96E] mb-1">{stat.number}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-auto mb-12 opacity-50"></div>

        {/* Tribute Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-serif text-black">
            {data?.memoryTitle || "In Memory of Sri Sundershan Duraisamy"}
          </h3>

          <div className="text-gray-600 font-light leading-relaxed space-y-6 text-lg text-left md:text-center max-w-3xl mx-auto">
            <p>
              {data?.memoryBody ||
                "Murgdur was founded in 2018 by the late Sri Sundershan Duraisamy, a visionary who believed that true luxury lies not in ostentation, but in the quiet confidence of impeccable craftsmanship. His philosophy was simple yet profound: create pieces that transcend trends and become treasured heirlooms."}
            </p>
            <p className="text-gray-500">
              {data?.additionalBody || "His belief was that every piece of clothing carries the energy of its maker — that the hands which weave, embroider, and craft are as important as the person who wears it. That belief lives at the very heart of every Murgdur creation, from the first thread to the final stitch."}
            </p>
          </div>

          {/* Philosophy Quote */}
          <blockquote className="border-l-4 border-[#C9A96E] pl-6 text-left max-w-2xl mx-auto my-8">
            <p className="text-xl font-serif text-gray-700 italic leading-relaxed">
              "{data?.founderQuoteBody || "Luxury is not what you wear — it is what you leave behind for those who come after you."}"
            </p>
            <cite className="text-xs uppercase tracking-widest text-gray-400 mt-3 block not-italic">
              {data?.founderQuoteCite || "— Sri Sundershan Duraisamy, Founder"}
            </cite>
          </blockquote>

          {/* Signature or visual element */}
          <div className="mt-10 opacity-80">
            <span className="font-serif italic text-3xl text-black">
              Murgdur
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LegacySection;
