export default {
  name: "vaultPage",
  title: "Vault (Wishlist) Page",
  type: "document",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
      initialValue: "My Vault",
    },
    {
      name: "emptyStateText",
      type: "string",
      title: "Empty State Text",
      initialValue: "Looking for more?",
    },
    {
      name: "emptyStateButton",
      type: "string",
      title: "Empty State Button",
      initialValue: "Continue Shopping",
    },
  ],
};
