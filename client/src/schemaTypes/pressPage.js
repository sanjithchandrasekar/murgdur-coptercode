export default {
  name: "pressPage",
  title: "Press Page",
  type: "document",
  fields: [
    { name: "heading", type: "string", title: "Heading" },
    { name: "intro", type: "text", title: "Intro" },
    {
      name: "releases",
      type: "array",
      title: "Press Releases",
      of: [
        {
          type: "object",
          fields: [
            { name: "date", type: "string", title: "Date" },
            { name: "title", type: "string", title: "Title" },
            { name: "summary", type: "text", title: "Summary" },
          ],
        },
      ],
    },
    { name: "mediaContactEmail", type: "string", title: "Media Contact Email" },
  ],
};
