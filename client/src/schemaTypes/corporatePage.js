export default {
  name: "corporatePage",
  title: "Corporate Page",
  type: "document",
  fields: [
    { name: "heading", type: "string", title: "Heading" },
    {
      name: "overview",
      type: "object",
      title: "Company Overview",
      fields: [
        { name: "legalName", type: "string" },
        { name: "incorporationDate", type: "string" },
        { name: "headquarters", type: "string" },
        { name: "description", type: "text" },
      ],
    },
    {
      name: "directors",
      type: "array",
      title: "Board of Directors",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "title", type: "string" },
            { name: "bio", type: "text" },
          ],
        },
      ],
    },
    { name: "investorText", type: "text", title: "Investor Relations Text" },
    { name: "compliance", type: "text", title: "Compliance Info" },
  ],
};
