import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAboutPage } from "../utils/sanity";
import SEO from "../components/common/SEO";
import BackButton from "../components/common/BackButton";

const AboutUs = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await fetchAboutPage();
      if (result) setData(result);
    };
    load();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <SEO
        title={`${data?.heading || "About Murgdur"} | Our Story`}
        description="Discover the legacy of Murgdur. Born from royal tradition, crafted for modern elegance."
        url="https://murugdur1.vercel.app/about"
      />
      <div className="pt-32 pb-20 px-6 container mx-auto relative">
        <div className="mb-8">
          <BackButton className="text-gray-400 hover:text-royal-gold" />
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-royal-gold mb-8 text-center">
          {data?.heading || "About Murgdur"}
        </h1>
        <div className="max-w-4xl mx-auto space-y-8 text-gray-300 font-light text-lg leading-relaxed">
          {data?.content ? (
            // Render dynamic content blocks if available (simple text array)
            data.content.map((block, index) => <p key={index}>{block}</p>)
          ) : (
            <>
              <p>
                Established in the heart of royal tradition, Murgdur represents
                the pinnacle of luxury fashion. Our journey began with a vision
                to revive the majestic elegance of the past and weave it into
                the fabric of contemporary style.
              </p>
              <p>
                We believe that true luxury is timeless. Every piece in our
                collection is a testament to unparalleled craftsmanship,
                designed for those who appreciate the finer things in life. From
                the choice of rare fabrics to the intricate details of
                embroidery, Murgdur embodies perfection.
              </p>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Link to="/heritage" className="block group">
              <div className="bg-white/5 p-8 rounded-lg border border-white/10 h-full transition-colors duration-300 group-hover:bg-white/10 group-hover:border-royal-gold/30">
                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-royal-gold transition-colors">
                  {data?.heritageSection?.title || "Our Heritage"}
                </h3>
                <p className="text-sm">
                  {data?.heritageSection?.description ||
                    "Roots depicted deep in the cultural history of royalty, inspired by the grand durbars and imperial courts."}
                </p>
              </div>
            </Link>
            <Link to="/vision" className="block group">
              <div className="bg-white/5 p-8 rounded-lg border border-white/10 h-full transition-colors duration-300 group-hover:bg-white/10 group-hover:border-royal-gold/30">
                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-royal-gold transition-colors">
                  {data?.visionSection?.title || "Our Vision"}
                </h3>
                <p className="text-sm">
                  {data?.visionSection?.description ||
                    "To be the global standard of regal elegance, bringing the aura of majesty to the modern wardrobe."}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
