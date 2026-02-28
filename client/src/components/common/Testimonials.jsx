import React, { useEffect, useState } from "react";
import { fetchTestimonials } from "../../utils/sanity";

const Testimonials = () => {
  const defaultReviews = [
    {
      text: "The fabric quality is simply unmatched. I wore the Sherwani for my reception and felt absolutely royal. Every guest complimented the intricate embroidery.",
      author: "Vikram R.",
      role: "ENTREPRENEUR, MUMBAI",
    },
    {
      text: "Murgdur understands modern luxury. The fit was perfect right out of the box. The quality rivals the finest European maisons — truly world-class.",
      author: "Aarav S.",
      role: "ARCHITECT, BANGALORE",
    },
    {
      text: "Exceptional service and timely delivery. The intricate details on the waistcoat were stunning. I've ordered three times and each piece is better than the last.",
      author: "Rohan K.",
      role: "DOCTOR, DELHI",
    },
    {
      text: "The lehenga I ordered for my sister's wedding was a masterpiece. Every guest asked where it was from. Murgdur truly lives up to its royal name.",
      author: "Priya N.",
      role: "SOFTWARE ENGINEER, CHENNAI",
    },
    {
      text: "Ordering was seamless, packaging exquisite, and the kurta fit like it was tailored for me personally. The silk feels like wearing heritage itself.",
      author: "Sameer M.",
      role: "BANKER, HYDERABAD",
    },
    {
      text: "From the fragrance to the last stitch on the sherwani, everything breathed authenticity. Murgdur has earned a lifelong customer in me.",
      author: "Ananya T.",
      role: "DESIGNER, PUNE",
    },
  ];

  const [reviews, setReviews] = useState(defaultReviews);
  const [sectionData, setSectionData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchTestimonials();
      if (data?.reviews) setReviews(data.reviews);
      if (data) setSectionData(data);
    };
    load();
  }, []);

  return (
    <section className="py-20 bg-white text-center relative z-20 border-t border-gray-100">
      {/* Section heading */}
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="flex justify-center mb-6">
          <span className="w-1 h-1 bg-royal-gold rounded-full mx-1"></span>
          <span className="w-1 h-1 bg-royal-gold rounded-full mx-1"></span>
          <span className="w-1 h-1 bg-royal-gold rounded-full mx-1"></span>
        </div>
        <span className="text-gray-400 uppercase tracking-[0.25em] text-[10px] font-bold block mb-3">
          {sectionData?.sectionLabel || "Client Voices"}
        </span>
        <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
          {sectionData?.heading || "Words From Our Royal Patrons"}
        </h2>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-8 border border-gray-200 bg-white hover:border-royal-gold/40 transition-colors duration-300 flex flex-col justify-between min-h-[220px]"
            >
              <p className="text-gray-600 font-serif italic text-sm leading-7 mb-6">
                "{review.text}"
              </p>
              <div>
                <h4 className="text-black font-serif text-base tracking-wide mb-1">
                  {review.author}
                </h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                  {review.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;