import React, { useEffect, useState } from 'react';
import { fetchStoriesPage } from '../utils/sanity';

const Stories = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const load = async () => {
            const result = await fetchStoriesPage();
            if (result) setData(result);
        };
        load();
    }, []);

    const stories = data?.stories || [
        {
            image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop",
            category: "Heritage",
            title: "The Lost Art of Zardosi",
            description: "Tracing the origins of gold thread embroidery back to the Mughal courts, and how Murgdur is preserving this dying art form in the 21st century."
        },
        {
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
            category: "Campaign",
            title: "Winter in the Palace",
            description: "Behind the scenes of our latest campaign shot at the historic Udaipur City Palace, featuring the new velvet collection."
        },
        {
            image: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=2069&auto=format&fit=crop",
            category: "Sustainability",
            title: "Silk Without Suffering",
            description: "Our commitment to ethical sourcing: Introducing Ahimsa Silk, created without harming a single silkworm."
        },
        {
            image: "/images/royal_wallet.png",
            category: "Craftsmanship",
            title: "The Making of a Monarch Bag",
            description: "It takes 40 hours and 3 master artisans to create one Murgdur Monarch Bag. Watch the mesmerizing process unfold."
        }
    ];

    return (
        <div className="bg-black min-h-screen text-white">

            <div className="pt-32 pb-20 px-6 container mx-auto">
                <h1 className="text-4xl md:text-6xl font-serif text-royal-gold mb-12 text-center">{data?.heading || "Murgdur Stories"}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {stories.map((story, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="overflow-hidden mb-6 aspect-video">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />
                            </div>
                            <span className="text-xs font-bold text-royal-gold uppercase tracking-widest mb-2 block">{story.category}</span>
                            <h2 className="text-3xl font-serif text-white group-hover:text-royal-gold transition-colors mb-4">{story.title}</h2>
                            <p className="text-gray-400 font-light leading-relaxed">
                                {story.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Stories;
