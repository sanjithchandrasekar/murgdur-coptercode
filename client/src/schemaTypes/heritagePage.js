export default {
  name: "heritagePage",
  title: "Heritage Page",
  type: "document",
  fields: [
    {
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      initialValue: "A Legacy of Excellence",
    },
    {
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "text",
      initialValue:
        "Founded in 2019, Murgdur represents the pinnacle of luxury craftsmanship",
    },
    {
      name: "contentHeading",
      title: "Content Heading",
      type: "string",
      initialValue: "In Memory of Sri Sundershan Duraisamy",
    },
    {
      name: "contentBody",
      title: "Content Body",
      type: "text",
      rows: 5,
    },
  ],
};
