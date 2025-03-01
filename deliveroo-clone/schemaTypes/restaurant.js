const restaurant = {
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Restaurant Name",
      type: "string",
    },
    {
      name: "short_description",
      title: "Short Description",
      type: "string",
    },
    {
      name: "description",
      title: "Detailed Description",  // ✅ Added missing description field
      type: "text",
    },
    {
      name: "image",
      title: "Image of the Restaurant",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "latitude",
      title: "Latitude of the Restaurant",
      type: "number",
    },
    {
      name: "longitude",
      title: "Longitude of the Restaurant",
      type: "number",
    },
    {
      name: "address",
      title: "Restaurant Address",
      type: "string",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Rate the restaurant from 1 to 5",
      validation: (Rule) => Rule.min(1).max(5).error("Rating must be between 1 and 5"),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "dishes",
      title: "Dishes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
    },
  ],
};

export default restaurant;
