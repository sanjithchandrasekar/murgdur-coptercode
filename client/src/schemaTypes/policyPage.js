export default {
  name: "policyPage",
  title: "Policy/Info Page",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    {
      name: "slug",
      type: "slug",
      title: "URL Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "content",
      type: "array",
      title: "Content",
      of: [
        { type: "block" },
        {
          type: "object",
          name: "infobox",
          title: "Info Box (Bordered)",
          fields: [
            { name: "title", type: "string", title: "Heading" },
            { name: "text", type: "text", title: "Content Text" },
          ],
        },
      ],
    },
  ],
};
