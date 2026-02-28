import React, { useEffect, useState } from "react";
import { fetchVisionPage } from "../utils/sanity";
import BackButton from "../components/common/BackButton";
import SEO from "../components/common/SEO";

const Vision = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await fetchVisionPage();
      if (result) setData(result);
    };
    load();
  }, []);

  const defaultPillars = [
    {
      icon: "🌍",
      title: "Global Reach",
      description:
        "We envision a world where the exquisite craftsmanship of Indian royalty is celebrated in every fashion capital — from Paris to Milan, New York to Tokyo. Murgdur is India's luxury offering to the world.",
    },
    {
      icon: "⏳",
      title: "Timeless Modernity",
      description:
        "Our vision is not to merely repeat history, but to evolve it. We create pieces rooted in tradition yet perfectly adapted for the contemporary lifestyle — where ancient technique meets modern silhouette.",
    },
    {
      icon: "✨",
      title: "Uncompromising Luxury",
      description:
        "We aspire to set a new benchmark for quality, where every stitch tells a story of perfection and every garment is a masterpiece of art. No shortcuts. No compromises. Only excellence.",
    },
    {
      icon: "🤝",
      title: "Artisan Empowerment",
      description:
        "Behind every Murgdur piece is a master craftsperson whose skill deserves recognition and fair reward. We are committed to sustaining and celebrating India's artisan communities for generations to come.",
    },
    {
      icon: "🌿",
      title: "Sustainable Luxury",
      description:
        "True royalty respects its kingdom. We source only natural, ethically harvested materials — silks, linens, and organic cottons — and continually reduce our environmental footprint without sacrificing quality.",
    },
    {
      icon: "👑",
      title: "Cultural Sovereignty",
      description:
        "India's royal heritage is a treasure that belongs to the world. Murgdur is our declaration that Indian craftsmanship needs no imitation of Western luxury — it defines a standard all its own.",
    },
  ];

  const pillars = data?.pillars || defaultPillars;

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <SEO
        title={`${data?.heading || "Our Vision"} | Murgdur Future`}
        description={
          data?.statement ||
          "Discover the future of luxury and royalty. Our vision for the House of Murgdur."
        }
        url="https://murugdur1.vercel.app/vision"
      />
      <div className="pt-32 pb-20 px-6 container mx-auto relative">
        <div className="mb-8">
          <BackButton className="text-gray-400 hover:text-royal-gold" />
        </div>
        <header className="text-center mb-16">
          <span className="text-royal-gold uppercase tracking-[0.3em] text-xs font-bold mb-4 block animate-fade-in-up">
            {data?.eyebrow || "The Future of Royalty"}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 animate-fade-in">
            {data?.heading || "Our Vision"}
          </h1>
          <div className="w-24 h-0.5 bg-royal-gold mx-auto opacity-50"></div>
        </header>

        <div className="max-w-5xl mx-auto space-y-20">
          {/* Main Vision Statement */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600">
              "
              {data?.statement ||
                "To be the global standard of regal elegance, bringing the aura of majesty to the modern wardrobe."}
              "
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-100 p-8 rounded-lg hover:border-royal-gold/30 transition-colors group"
              >
                <div className="h-12 w-12 rounded-full bg-royal-gold/10 flex items-center justify-center mb-6 group-hover:bg-royal-gold/20 transition-colors">
                  <span className="text-2xl">{pillar.icon}</span>
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Future Section */}
          <div className="text-center max-w-3xl mx-auto mt-8 p-12 bg-gray-50 border border-gray-100 rounded-lg">
            <h2 className="text-3xl font-serif text-gray-900 mb-6">
              {data?.futureHeading || "Where We Are Headed"}
            </h2>
            <p className="text-gray-500 font-light text-lg leading-relaxed mb-8">
              {data?.futureBody || "By 2027, Murgdur aims to establish its first flagship atelier in London, host its debut runway show in Paris, and partner with artisan collectives across Rajasthan, Tamil Nadu, and Uttar Pradesh to employ over 500 craftspersons full-time."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
              {(data?.futureRoadmap?.length > 0 ? data.futureRoadmap : [
                { year: "2025", milestone: "Launch bespoke consultation service across India's top 10 cities." },
                { year: "2026", milestone: "Debut Murgdur fragrance line featuring 12 signature oud compositions." },
                { year: "2027", milestone: "Open first international flagship in London's Mayfair district." },
              ]).map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 p-6 rounded-md">
                  <div className="text-[#C9A96E] font-serif text-2xl font-bold mb-2">{item.year}</div>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">{item.milestone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <img
              src={
                data?.heroBgImage ||
                data?.bottomImage ||
                "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
              }
              alt={data?.bottomCaption || "Future of Fashion"}
              className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-[10s]"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-serif text-white drop-shadow-lg text-center px-4">
                {data?.bottomCaption || "Creating the Heritage of Tomorrow"}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
