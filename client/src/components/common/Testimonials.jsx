import React, { useEffect, useState } from "react";
import { fetchTestimonials } from "../../utils/sanity";

const Testimonials = () => {
  const defaultReviews = [
    {
      text: "The fabric quality is simply unmatched. I wore the Sherwani for my reception and felt absolutely royal.",
      author: "Vikram R.",
      role: "ENTREPRENEUR, MUMBAI",
    },
    {
      text: "Murgdur understands modern luxury. The fit was perfect right out of the box. Highly recommended.",
      author: "Aarav S.",
      role: "ARCHITECT, BANGALORE",
    },
    {
      text: "Exceptional service and timely delivery. The intricate details on the waistcoat were stunning.",
      author: "Rohan K.",
      role: "DOCTOR, DELHI",
    },
  ];

  const [reviews, setReviews] = useState(defaultReviews);

  useEffect(() => {
    const load = async () => {
      const data = await fetchTestimonials();
      if (data?.reviews) setReviews(data.reviews);
    };
    load();
  }, []);

  return (
    <section className="py-20 bg-white text-center relative z-20 border-t border-gray-100">
      {/* Small Gold Separator/Icon at top if needed, based on image */}
      <div className="flex justify-center mb-8">
        <span className="w-1 h-1 bg-royal-gold rounded-full mx-1"></span>
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
