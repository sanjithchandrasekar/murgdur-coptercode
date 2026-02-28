import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchAboutPage } from "../utils/sanity";
import SEO from "../components/common/SEO";
import BackButton from "../components/common/BackButton";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

const AboutUs = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAboutPage().then((result) => { if (result) setData(result); });
  }, []);

  // Default fallback data
  const impactStats = data?.impactStats?.length ? data.impactStats : [
    { number: "500+", label: "Happy Customers", description: "Across India & beyond" },
    { number: "200+", label: "Unique Designs", description: "Crafted with care" },
    { number: "5★", label: "Average Rating", description: "Unmatched satisfaction" },
    { number: "2019", label: "Founded", description: "Legacy since" },
  ];
  const coreValues = data?.coreValues?.length ? data.coreValues : [
    { icon: "👑", title: "Royal Heritage", description: "Rooted in centuries of Indian craftsmanship tradition, we draw from the artistic vocabulary of Mughal courts, Rajputana palaces, and Dravidian temples to create pieces that honour their origins." },
    { icon: "✨", title: "Uncompromising Quality", description: "Every stitch tells a story of perfection. We refuse shortcuts — each garment passes through 18 quality checkpoints before it reaches a single Murgdur customer." },
    { icon: "🌍", title: "Global Elegance", description: "Bringing Indian luxury to the world stage on its own terms. We do not imitate Western luxury — we define a standard that is entirely, proudly our own." },
    { icon: "💎", title: "Timeless Design", description: "Pieces crafted to transcend fashion seasons and trend cycles. A Murgdur garment is not a purchase — it is an heirloom acquired in your lifetime." },
  ];
  const journeyMilestones = data?.journeyMilestones?.length ? data.journeyMilestones : [
    { year: "2019", title: "Founded", description: "Murgdur was born from a deeply personal vision of luxury rooted in Indian heritage. It opened with a single atelier, three artisans, and an uncompromising commitment to craft." },
    { year: "2021", title: "Royal Heritage Collection", description: "The debut bridal collection launched with 24 bespoke pieces and sold out within two weeks. It established Murgdur's signature aesthetic — the intersection of Mughal grandeur and contemporary refinement." },
    { year: "2022", title: "Accessories & Fragrance Launch", description: "Expanded into leather goods, jewelry, and a debut fragrance line crafted with master perfumers from Grasse and Kannauj. Each product reflected the same obsessive quality standards as the apparel." },
    { year: "2023", title: "Online Expansion", description: "Reached customers across all 28 states of India with a fully redesigned digital experience, personal styling service, and same-day delivery in 10 major cities." },
    { year: "2024", title: "International Recognition", description: "Featured in Vogue India, Harper's Bazaar Arabia, and GQ India. First wholesale orders received from luxury multi-brand boutiques in Dubai and Singapore." },
    { year: "2025", title: "Global Ambition", description: "Entering international luxury markets with a flagship boutique planned in London's Mayfair district and plans for a debut runway presentation at Paris Fashion Week." },
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <SEO
        title={`${data?.heroHeading || "About Murgdur"} | Our Story`}
        description={data?.seoDescription || "Discover the legacy of Murgdur. Born from royal tradition, crafted for modern elegance."}
        url="https://murugdur1.vercel.app/about"
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <div
        className="relative min-h-[50vh] flex items-end justify-center bg-[#1a1a1a] overflow-hidden"
        style={data?.heroBgImage ? { backgroundImage: `url(${data.heroBgImage})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-32 left-8 z-20"><BackButton className="text-white/70 hover:text-royal-gold" /></div>
        <div className="relative z-10 text-center pb-16 px-6">
          <span className="text-royal-gold text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            {data?.heroEyebrow || "Our Story"}
          </span>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show"
            className="text-4xl md:text-7xl font-serif text-white mb-4">
            {data?.heroHeading || "About Murgdur"}
          </motion.h1>
          {data?.heroSubheading && (
            <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">{data.heroSubheading}</p>
          )}
        </div>
      </div>

      {/* ── IMPACT STATS ──────────────────────────────────────────── */}
      <section className="py-20 bg-[#f8f6f2]">
        <div className="container mx-auto px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center text-3xl md:text-4xl font-serif text-gray-900 mb-14">
            {data?.impactStatsHeading || "Our Impact at a Glance"}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-white rounded-lg border border-gray-100 hover:border-royal-gold/30 transition-colors">
                <div className="text-4xl md:text-5xl font-serif text-royal-gold mb-2">{stat.number}</div>
                <div className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-1">{stat.label}</div>
                {stat.description && <div className="text-xs text-gray-500">{stat.description}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHAPING THE FUTURE SECTION ────────────────────────────── */}
      {(data?.shapingFutureSection || !data) && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="lg:w-1/2">
                <span className="text-royal-gold text-xs tracking-[0.25em] uppercase font-bold mb-4 block">
                  {data?.shapingFutureSection?.eyebrow || "Our Mission"}
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-6">
                  {data?.shapingFutureSection?.heading || "Shaping the Future of Luxury"}
                </h2>
                <p className="text-gray-600 font-light leading-relaxed text-lg">
                  {data?.shapingFutureSection?.body ||
                    "Established in the heart of royal tradition, Murgdur represents the pinnacle of luxury fashion. Our journey began with a vision to revive the majestic elegance of the past and weave it into the fabric of contemporary style. We believe that true luxury is timeless."}
                </p>
                {data?.shapingFutureSection?.ctaText && (
                  <Link to={data.shapingFutureSection.ctaLink || "/heritage"}
                    className="mt-8 inline-block px-8 py-3 border-2 border-gray-900 text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all">
                    {data.shapingFutureSection.ctaText}
                  </Link>
                )}
              </motion.div>
              {data?.shapingFutureSection?.image && (
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="lg:w-1/2">
                  <img src={data.shapingFutureSection.image} alt="Mission" className="w-full h-[500px] object-cover rounded-lg" />
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CORE VALUES ───────────────────────────────────────────── */}
      <section className="py-24 bg-[#f8f6f2]">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4">
              {data?.coreValuesHeading || "What We Stand For"}
            </h2>
            {data?.coreValuesSubheading && <p className="text-gray-500 text-lg max-w-2xl mx-auto">{data.coreValuesSubheading}</p>}
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {coreValues.map((v, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-lg border border-gray-100 hover:border-royal-gold/40 hover:shadow-sm transition-all">
                <div className="text-4xl mb-5">{v.icon}</div>
                <h3 className="text-lg font-serif text-gray-900 mb-3">{v.title}</h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4">{data?.journeyHeading || "Our Journey"}</h2>
            {data?.journeySubheading && <p className="text-gray-500 text-lg max-w-2xl mx-auto">{data.journeySubheading}</p>}
          </motion.div>
          <div className="max-w-4xl mx-auto">
            {journeyMilestones.map((m, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="flex gap-8 mb-12 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-royal-gold flex items-center justify-center text-xs font-bold text-royal-gold shrink-0">
                    {m.year}
                  </div>
                  {i < journeyMilestones.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-2" />}
                </div>
                <div className="pb-12">
                  <h3 className="text-xl font-serif text-gray-900 mb-2">{m.title}</h3>
                  <p className="text-gray-500 font-light">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────────── */}
      {data?.industries?.length > 0 && (
        <section className="py-24 bg-[#f8f6f2]">
          <div className="container mx-auto px-6 text-center">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-gray-900 mb-14">
              {data?.industriesHeading || "Industries We Serve"}
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {data.industries.map((ind, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-100 hover:border-royal-gold/30 transition">
                  <div className="text-3xl mb-3">{ind.icon}</div>
                  <h4 className="font-serif text-gray-900 mb-1">{ind.title}</h4>
                  <p className="text-xs text-gray-500">{ind.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SCROLLING BANNER ──────────────────────────────────────── */}
      {data?.scrollingBannerText && (
        <section className="py-8 bg-[#1a1a1a] overflow-hidden">
          <div className="whitespace-nowrap animate-pulse">
            <span className="inline-block text-royal-gold text-xl font-serif tracking-widest px-8">
              {Array(6).fill(data.scrollingBannerText).join("  •  ")}
            </span>
          </div>
        </section>
      )}

      {/* ── VIDEO SECTION ─────────────────────────────────────────── */}
      {data?.videoSection?.videoUrl && (
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6 text-center">
            {data.videoSection.heading && (
              <h2 className="text-3xl font-serif text-white mb-10">{data.videoSection.heading}</h2>
            )}
            <div className="max-w-4xl mx-auto aspect-video overflow-hidden rounded-lg">
              <iframe src={data.videoSection.videoUrl} title="Video" className="w-full h-full" allowFullScreen />
            </div>
          </div>
        </section>
      )}

      {/* ── GALLERY ───────────────────────────────────────────────── */}
      {data?.galleryImages?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {data.galleryImages.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden">
                  <img src={`${img}?auto=format&q=80&w=400`} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PARTNERS ──────────────────────────────────────────────── */}
      {data?.partners?.length > 0 && (
        <section className="py-20 bg-[#f8f6f2]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif text-gray-900 mb-12">{data?.partnersHeading || "Our Partners & Clients"}</h2>
            <div className="flex flex-wrap justify-center items-center gap-10">
              {data.partners.map((p, i) => (
                <div key={i} className="grayscale hover:grayscale-0 transition-all">
                  {p.logo ? (
                    <a href={p.website || "#"} target="_blank" rel="noopener noreferrer">
                      <img src={p.logo} alt={p.name} className="h-12 object-contain" />
                    </a>
                  ) : (
                    <span className="text-gray-400 font-serif text-lg">{p.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── AWARDS ────────────────────────────────────────────────── */}
      {data?.awards?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-3xl font-serif text-gray-900 mb-12">{data?.awardsHeading || "Awards & Recognition"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {data.awards.map((a, i) => (
                <div key={i} className="flex gap-4 p-6 bg-gray-50 rounded-lg border border-gray-100 hover:border-royal-gold/30 transition">
                  {a.badge && <img src={a.badge} alt={a.title} className="w-16 h-16 object-contain shrink-0" />}
                  <div>
                    <div className="text-xs text-royal-gold font-bold uppercase tracking-widest mb-1">{a.year} {a.issuedBy && `• ${a.issuedBy}`}</div>
                    <h4 className="font-serif text-gray-900 mb-1">{a.title}</h4>
                    <p className="text-xs text-gray-500">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LEADERSHIP TEAM ───────────────────────────────────────── */}
      {data?.leadershipTeam?.length > 0 && (
        <section className="py-24 bg-[#f8f6f2]">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-3xl md:text-4xl font-serif text-gray-900 mb-14">
              {data?.leadershipHeading || "Our Leadership"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {data.leadershipTeam.map((m, i) => (
                <div key={i} className="text-center group">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-2 border-transparent group-hover:border-royal-gold transition-all">
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl font-serif text-gray-400">
                        {m.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h4 className="font-serif text-gray-900 text-lg mb-1">{m.name}</h4>
                  <p className="text-xs text-royal-gold uppercase tracking-widest">{m.role}</p>
                  {m.bio && <p className="text-xs text-gray-500 mt-2 font-light">{m.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOARD ─────────────────────────────────────────────────── */}
      {data?.boardMembers?.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-3xl font-serif text-gray-900 mb-14">
              {data?.boardHeading || "Board of Directors"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {data.boardMembers.map((m, i) => (
                <div key={i} className="flex gap-5 p-6 bg-gray-50 border border-gray-100 rounded-lg hover:border-royal-gold/30 transition">
                  {m.photo && <img src={m.photo} alt={m.name} className="w-16 h-16 rounded-full object-cover shrink-0" />}
                  <div>
                    <h4 className="font-serif text-gray-900">{m.name}</h4>
                    <p className="text-xs text-royal-gold uppercase tracking-widest mt-1">{m.role}</p>
                    {m.bio && <p className="text-xs text-gray-500 mt-2">{m.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HERITAGE & VISION LINKS ───────────────────────────────── */}
      <section className="py-20 bg-[#f8f6f2]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/heritage" className="block group">
              <div className="bg-white p-8 rounded-lg border border-gray-200 h-full hover:border-royal-gold/50 transition-all">
                <h3 className="text-2xl font-serif text-gray-900 mb-4 group-hover:text-royal-gold transition-colors">Our Heritage</h3>
                <p className="text-sm text-gray-500">Roots deep in the cultural history of royalty, inspired by the grand durbars and imperial courts.</p>
              </div>
            </Link>
            <Link to="/vision" className="block group">
              <div className="bg-white p-8 rounded-lg border border-gray-200 h-full hover:border-royal-gold/50 transition-all">
                <h3 className="text-2xl font-serif text-gray-900 mb-4 group-hover:text-royal-gold transition-colors">Our Vision</h3>
                <p className="text-sm text-gray-500">To be the global standard of regal elegance, bringing the aura of majesty to the modern wardrobe.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
