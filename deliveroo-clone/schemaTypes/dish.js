const dish = {
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Dish Name",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",  // ✅ Changed type from `string` to `text` for longer descriptions
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "image",
      title: "Dish Image",
      type: "image",
      options: { hotspot: true },
    },
  ],
};

export default dish;
