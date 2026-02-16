export default {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Main Heading",
      initialValue: "About Murgdur",
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [{ type: "text" }],
    },
    {
      name: "heritageSection",
      type: "object",
      title: "Heritage Card",
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
      ],
    },
    {
      name: "visionSection",
      type: "object",
      title: "Vision Card",
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
      ],
    },
  ],
};
