import React from "react";
import HeroSlider from "../common/HeroSlider";
import TextWithImage from "./TextWithImage";
import ProductGrid from "./ProductGrid";
import VideoSection from "./VideoSection";

const PageSections = ({ sections }) => {
  if (!sections || !Array.isArray(sections)) {
    return null;
  }

  return sections.map((section) => {
    const { _type, _key } = section;

    switch (_type) {
      case "section.hero":
        return <HeroSlider key={_key} slides={section.slides} />;

      case "section.textWithImage":
        return (
          <TextWithImage
            key={_key}
            {...section}
            // Ensure layout property is passed correctly
            layout={section.layout || "imageRight"}
          />
        );

      case "section.productGrid":
        return <ProductGrid key={_key} {...section} />;

      case "section.video":
        return <VideoSection key={_key} {...section} />;

      default:
        if (process.env.NODE_ENV === "development") {
          return (
            <div key={_key} className="p-4 bg-red-100 text-red-800">
              Unknown section type: {_type}
            </div>
          );
        }
        return null;
    }
  });
};

export default PageSections;
