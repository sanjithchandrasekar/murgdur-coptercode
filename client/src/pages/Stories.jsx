import React, { useEffect, useState } from "react";
import { fetchStoriesPage } from "../utils/sanity";
import BackButton from "../components/common/BackButton";
import SEO from "../components/common/SEO";

const Stories = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchStoriesPage().then((r) => { if (r) setData(r); });
  }, []);

  const defaultStories = [
    {
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop",
      category: "Heritage",
      title: "The Lost Art of Zardosi",
      description: "Tracing the origins of gold thread embroidery back to the Mughal courts — and the master craftsmen in Lucknow keeping this 500-year-old tradition alive today.",
    },
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
      category: "Campaign",
      title: "Winter in the Palace",
      description: "Behind the scenes of our winter campaign shot at Udaipur's City Palace — the architecture, the light, and the stories behind every frame.",
    },
    {
      image: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069&auto=format&fit=crop",
      category: "Sustainability",
      title: "Silk Without Suffering",
      description: "Introducing Ahimsa Silk — created without harming a single silkworm. How Murgdur blends ethical sourcing with uncompromising luxury.",
    },
    {
      image: "/images/men/wallets/royal_wallet.png",
      category: "Craftsmanship",
      title: "The Making of a Monarch Bag",
      description: "It takes 40 hours, 3 master artisans, and 200+ individual steps to complete one Murgdur Monarch Bag. Here is every stitch of that journey.",
    },
    {
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=2070&auto=format&fit=crop",
      category: "Artisan",
      title: "The Weavers of Varanasi",
      description: "Meet the families who have kept the Banarasi silk tradition alive for over 400 years — weaving gold into every thread, generation after generation.",
    },
    {
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
      category: "Culture",
      title: "Royal Jewelry: A Living Tradition",
      description: "From Rajputana courts to modern runways — how Murgdur's jewelry line celebrates the unbroken chain of Indian goldsmithing across five centuries.",
    },
    {
      image: "https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?q=80&w=800&auto=format&fit=crop",
      category: "Lifestyle",
      title: "The Modern Maharaj: Dressing with Authority",
      description: "Style notes for the contemporary gentleman who demands tradition and modernity in equal measure — a guide to wearing power with grace.",
    },
    {
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
      category: "Behind the Scenes",
      title: "Inside the Atelier",
      description: "A rare glimpse into our private workshop where each Murgdur piece is born — from raw fabric selection, dyeing, and embroidery to the final hand-finished garment.",
    },
  ];

  const stories = data?.stories?.length ? data.stories : defaultStories;
  const featured = data?.featuredStory;

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <SEO
        title={`${data?.heading || "Stories"} | House of Murgdur`}
        description={data?.seoDescription || "Explore the rich narratives, craftsmanship, and heritage of House of Murgdur."}
        url="https://murugdur1.vercel.app/stories"
      />

      <div className="pt-32 pb-8 px-6 container mx-auto relative">
        <div className="mb-8">
          <BackButton className="text-gray-400 hover:text-royal-gold" />
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 text-center">
          {data?.heading || "Murgdur Stories"}
        </h1>
        <p className="text-gray-500 text-lg text-center max-w-2xl mx-auto mb-8">
          {data?.subheading || "Craft, culture, and the people behind every Murgdur creation. Dive into the narratives that define our heritage."}
        </p>
      </div>

      {/* Featured Story Hero */}
      {featured && (
        <div
          className="relative min-h-[60vh] flex items-end bg-[#1a1a1a] overflow-hidden mb-16"
          style={featured.image ? { backgroundImage: `url(${featured.image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-12 max-w-4xl">
            <span className="text-royal-gold text-xs font-bold uppercase tracking-widest mb-3 block">
              {featured.category || "Featured"}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">{featured.title}</h2>
            <p className="text-white/80 font-light text-lg mb-6 max-w-2xl">{featured.description}</p>
            {featured.readMoreLink && (
              <a href={featured.readMoreLink}
                className="inline-block px-8 py-3 bg-royal-gold text-black text-xs uppercase tracking-widest hover:bg-white transition-all">
                Read Story
              </a>
            )}
          </div>
        </div>
      )}

      {/* Stories Grid */}
      <div className="pb-20 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {stories.map((story, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-video">
                <img src={story.image} alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  loading="lazy" />
              </div>
              <span className="text-xs font-bold text-royal-gold uppercase tracking-widest mb-2 block">{story.category}</span>
              <h2 className="text-3xl font-serif text-gray-900 group-hover:text-royal-gold transition-colors mb-4">{story.title}</h2>
              <p className="text-gray-500 font-light leading-relaxed">{story.description}</p>
              {story.readMoreLink && (
                <a href={story.readMoreLink} className="text-xs uppercase tracking-widest text-gray-400 hover:text-royal-gold mt-4 inline-block transition-colors">
                  Read More →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
