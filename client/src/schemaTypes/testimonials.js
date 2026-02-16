export default {
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  fields: [
    {
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", type: "text", title: "Review Text" },
            { name: "author", type: "string", title: "Author Name" },
            { name: "role", type: "string", title: "Role / Location" },
          ],
        },
      ],
    },
  ],
};
