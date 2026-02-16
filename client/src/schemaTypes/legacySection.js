export default {
  name: "legacySection",
  title: "Legacy Section (Home)",
  type: "document",
  fields: [
    { name: "heading", type: "string", title: "Heading" },
    {
      name: "subHeading",
      type: "string",
      title: "Sub Heading",
      initialValue: "Our Heritage",
    },
    { name: "body", type: "text", title: "Intro Body" },
    { name: "memoryTitle", type: "string", title: "Memory Title" },
    { name: "memoryBody", type: "text", title: "Memory Body" },
  ],
};
