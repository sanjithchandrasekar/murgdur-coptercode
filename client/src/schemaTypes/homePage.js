export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "pageBuilder",
      title: "Page Builder (New Layout Engine)",
      type: "array",
      of: [
        { type: "section.hero" },
        { type: "section.textWithImage" },
        { type: "section.productGrid" },
        { type: "section.video" },
      ],
      description: "Add and reorder sections to build your page dynamically.",
    },
    // Legacy Fields (For backward compatibility, will be removed later)
    {
      name: "heroSlides",
      title: "Hero Slider (Legacy)",
      type: "array",
      of: [
        {
          type: "object",
          title: "Slide",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "subtitle", type: "string", title: "Subtitle" },
            { name: "videoUrl", type: "url", title: "Video URL (Optional)" },
            { name: "image", type: "image", title: "Background Image" },
            { name: "link", type: "string", title: "Button Link (e.g. /shop)" },
          ],
        },
      ],
      hidden: ({ document }) => document?.pageBuilder?.length > 0,
    },
    {
      name: "promoSection",
      title: "Promotional Section (Legacy)",
      type: "object",
      hidden: ({ document }) => document?.pageBuilder?.length > 0,
      fields: [
        {
          name: "eyebrow",
          type: "string",
          title: "Eyebrow Text (Small Top Label)",
        },
        { name: "hashtag", type: "string", title: "Hashtag (Big Text)" },
        { name: "heading", type: "string", title: "Heading" },
        { name: "ctaText", type: "string", title: "Button Text" },
        { name: "backgroundImage", type: "image", title: "Background Image" },
      ],
    },
    {
      name: "welcomeSection",
      title: "Welcome Note (Legacy)",
      type: "object",
      hidden: ({ document }) => document?.pageBuilder?.length > 0,
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "body", type: "text", title: "Body Text" },
      ],
    },
    {
      name: "videoCampaign",
      title: "Video Campaign (Legacy)",
      type: "object",
      hidden: ({ document }) => document?.pageBuilder?.length > 0,
      fields: [
        { name: "videoUrl", type: "url", title: "Video URL" },
        { name: "heading", type: "string", title: "Heading" },
        { name: "ctaText", type: "string", title: "Button Text" },
      ],
    },
    {
      name: "treasures",
      title: "Treasures of the Dynasty (Legacy)",
      type: "array",
      hidden: ({ document }) => document?.pageBuilder?.length > 0,
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    },
  ],
};
