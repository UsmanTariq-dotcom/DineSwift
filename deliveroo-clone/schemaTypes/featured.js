export default {
    name: "featured",
    title: "Featured Menu categories",
    type: "document",
    fields: [
      {
        name: "name",
        type: "string",
        title: "Featured Category name",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "short_description",
        type: "string",
        title: "Short description",
        validation: (Rule) => Rule.max(208),
      },
      {
        name: "image",
        type: "image",
        title: "Image of Category",
        options: {
          hotspot: true, // Enables hotspot for responsive images
        },
      },
      {
        name: "restaurants",
        type: "array",
        title: "Restaurants",
        of: [{ type: "reference", to: [{ type: "restaurant" }] }],
      },
    ],
  };