import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchHeritagePage } from "../utils/sanity";
import SEO from "../components/common/SEO";
import BackButton from "../components/common/BackButton";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

const Heritage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchHeritagePage().then((r) => { if (r) setData(r); });
  }, []);

  const defaultTimeline = [
    { year: "2019", title: "Founded", description: "Murgdur was born from a vision of luxury and Indian heritage." },
    { year: "2021", title: "First Collection", description: "Launched the signature Royal Heritage bridal collection." },
    { year: "2023", title: "National Reach", description: "Expanded to serve customers across all of India." },
    { year: "2025", title: "Global Vision", description: "Taking Indian luxury to international markets." },
  ];

  const defaultCraft = [
    { icon: "🪡", title: "Hand Embroidery", description: "Every thread is placed with purpose, carrying centuries of technique." },
    { icon: "🌿", title: "Natural Fabrics", description: "Pure silks, linens, and organic cottons only." },
    { icon: "🏺", title: "Traditional Dyeing", description: "Natural dyes and hand-block prints echo our ancestral roots." },
  ];

  const timeline = data?.timeline?.length ? data.timeline : defaultTimeline;
  const craftFeatures = data?.craftFeatures?.length ? data.craftFeatures : defaultCraft;

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${data?.heroHeading || "Our Heritage"} | Murgdur Legacy`}
        description={data?.seoDescription || "Explore the rich history and legacy of Murgdur."}
        url="https://murugdur1.vercel.app/heritage"
      />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <div
        className="relative h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden"
        style={data?.heroBgImage
          ? { backgroundImage: `url(${data.heroBgImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : { background: "linear-gradient(to bottom, #f8f6f2, #eeebe4)" }}
      >
        {data?.heroBgImage && <div className="absolute inset-0 bg-black/40" />}
        <div className="absolute top-32 left-8 z-30">
          <BackButton className="text-gray-700 hover:text-royal-gold" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className={`text-3xl sm:text-5xl md:text-7xl font-serif mb-6 ${data?.heroBgImage ? "text-white" : "text-[#1a1a1a]"}`}>
            {data?.heroHeading || "A Legacy of Excellence"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className={`text-lg md:text-xl font-light ${data?.heroBgImage ? "text-white/80" : "text-gray-600"}`}>
            {data?.heroSubheading || "Founded in 2019, Murgdur represents the pinnacle of luxury craftsmanship"}
          </motion.p>
        </div>
      </div>

      {/* ── FOUNDER TRIBUTE ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {data?.founderImage && (
              <div className="md:w-1/3 shrink-0">
                <img src={data.founderImage} alt={data?.founderName || "Founder"}
                  className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg" />
              </div>
            )}
            <div className={data?.founderImage ? "md:w-2/3" : "max-w-3xl mx-auto text-center"}>
              <span className="text-royal-gold text-xs tracking-[0.3em] uppercase font-bold mb-4 block">Our Founder</span>
              <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="text-3xl md:text-5xl font-serif text-gray-800 mb-8">
                {data?.founderName || "In Memory of Sri Sundershan Duraisamy"}
              </motion.h2>
              <p className="text-gray-600 font-light text-lg leading-loose">
                {data?.founderBio ||
                  "Murgdur was founded by a visionary who believed that true luxury lies not in ostentation, but in the quiet confidence of impeccable craftsmanship. His legacy lives on in every piece we create."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY SECTION ───────────────────────────────────────────── */}
      {data?.storyHeading && (
        <section className="py-24 px-6 bg-[#f8f6f2]">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-serif text-gray-800 mb-8">{data.storyHeading}</h2>
            {data.storyBody && <p className="text-gray-600 font-light text-lg leading-loose">{data.storyBody}</p>}
          </div>
        </section>
      )}

      {/* ── TIMELINE ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-center text-3xl md:text-4xl font-serif text-gray-900 mb-16">
            {data?.timelineHeading || "Milestones in Our Journey"}
          </h2>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            {timeline.map((item, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 mb-12 last:mb-0">
                <div className="w-10 h-10 rounded-full border-2 border-royal-gold bg-white flex items-center justify-center text-xs font-bold text-royal-gold shrink-0 z-10">
                  {item.year}
                </div>
                <div className="flex-1 pb-4">
                  {item.image && <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
                  <h3 className="text-xl font-serif text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRAFTSMANSHIP ──────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#f8f6f2]">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            {data?.craftHeading || "The Art of Craftsmanship"}
          </h2>
          {data?.craftSubheading && <p className="text-gray-500 text-lg mb-14">{data.craftSubheading}</p>}
          {!data?.craftSubheading && <div className="mb-14" />}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {craftFeatures.map((c, i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-gray-100 hover:border-royal-gold/30 transition">
                <div className="text-4xl mb-5">{c.icon}</div>
                <h3 className="text-lg font-serif text-gray-900 mb-3">{c.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ────────────────────────────────────────────────── */}
      {data?.gallery?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {data.gallery.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden">
                  <img src={`${img}?auto=format&q=80&w=400`} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Heritage;
