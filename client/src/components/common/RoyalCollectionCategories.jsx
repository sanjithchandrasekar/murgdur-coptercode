import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fetchRoyalCollectionPage } from "../../utils/sanity";

const mensImg = "/images/hero/Gemini_Generated_Image_hge4lhge4lhge4lh.png";
const womensImg = "/images/hero/Gemini_Generated_Image_aimaqdaimaqdaima.png";

const RoyalCollectionCategories = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const result = await fetchRoyalCollectionPage();
      if (result) setData(result);
    };
    load();
  }, []);

  const men = data?.menSection;
  const women = data?.womenSection;

  return (
    <section className="py-24 bg-royal-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="text-royal-gold uppercase tracking-[0.2em] text-sm font-bold">
            Discover
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">
            The Royal Collection
          </h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* MEN'S COLLECTION */}
          <Link
            to="/shop?cat=men"
            className="group relative h-[450px] md:h-[600px] overflow-hidden border border-white/10 cursor-pointer text-decoration-none"
          >
            <img
              src={men?.image || mensImg}
              alt={men?.title || "Men's Collection"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>

            <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col items-center text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-4xl font-serif text-white mb-4">
                {men?.title || "Men's Collection"}
              </h3>
              <p className="text-gray-300 mb-6 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light">
                {men?.description ||
                  "Sherwanis, Bandhgalas, and Kurtas crafted for the modern Maharaja."}
              </p>
              <span className="flex items-center gap-2 text-royal-gold uppercase tracking-widest text-sm font-bold border-b border-royal-gold pb-1">
                Explore <ArrowRight size={16} />
              </span>
            </div>
          </Link>

          {/* WOMEN'S COLLECTION */}
          <Link
            to="/shop?cat=women"
            className="group relative h-[450px] md:h-[600px] overflow-hidden border border-white/10 cursor-pointer text-decoration-none"
          >
            <img
              src={women?.image || womensImg}
              alt={women?.title || "Women's Collection"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>

            <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col items-center text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-4xl font-serif text-white mb-4">
                {women?.title || "Women's Collection"}
              </h3>
              <p className="text-gray-300 mb-6 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light">
                {women?.description ||
                  "Lehengas, Sarees, and Anarkalis that define grace and elegance."}
              </p>
              <span className="flex items-center gap-2 text-royal-gold uppercase tracking-widest text-sm font-bold border-b border-royal-gold pb-1">
                Explore <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoyalCollectionCategories;
