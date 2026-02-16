export default {
  name: "section.video",
  title: "Video Campaign Section",
  type: "object",
  fields: [
    { name: "heading", type: "string", title: "Heading" },
    { name: "videoUrl", type: "url", title: "Video URL (Background or Embed)" },
    { name: "ctaText", type: "string", title: "Button Text" },
    { name: "ctaLink", type: "string", title: "Button Link" },
  ],
};
