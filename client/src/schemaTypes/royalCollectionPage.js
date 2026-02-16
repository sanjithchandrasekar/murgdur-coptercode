export default {
  name: "royalCollectionPage",
  title: "Royal Collection Page",
  type: "document",
  fields: [
    { name: "mainHeading", type: "string", title: "Main Heading" },
    { name: "subHeading", type: "string", title: "Sub Heading" },
    { name: "description", type: "text", title: "Description" },
    {
      name: "memorySection",
      type: "object",
      title: "Memory Section",
      fields: [
        { name: "heading", type: "string", title: "Heading" },
        { name: "text", type: "text", title: "Text" },
      ],
    },
    {
      name: "menSection",
      type: "object",
      title: "Men Section",
      fields: [
        { name: "image", type: "image", title: "Image" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "string", title: "Description" },
        {
          name: "featuredProducts",
          title: "Featured Men Products",
          type: "array",
          of: [{ type: "reference", to: [{ type: "product" }] }],
        },
      ],
    },
    {
      name: "womenSection",
      type: "object",
      title: "Women Section",
      fields: [
        { name: "image", type: "image", title: "Image" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "string", title: "Description" },
        {
          name: "featuredProducts",
          title: "Featured Women Products",
          type: "array",
          of: [{ type: "reference", to: [{ type: "product" }] }],
        },
      ],
    },
    {
      name: "conciergeSection",
      type: "object",
      title: "Concierge Section",
      fields: [
        { name: "heading", type: "string", title: "Heading" },
        { name: "description", type: "text", title: "Description" },
        { name: "buttonText", type: "string", title: "Button Text" },
        { name: "image", type: "image", title: "Background Image" },
      ],
    },
    {
      name: "features",
      type: "array",
      title: "Craftsmanship Features",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
      ],
    },
    {
      name: "registrySection",
      type: "object",
      title: "Registry (Newsletter) Section",
      fields: [
        { name: "heading", type: "string", title: "Heading" },
        { name: "description", type: "text", title: "Description" },
        { name: "buttonText", type: "string", title: "Button Text" },
      ],
    },
  ],
};
