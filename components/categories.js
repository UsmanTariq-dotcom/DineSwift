import { Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import sanityClient, { urlFor } from '../deliveroo-clone/.sanity/runtime/sanity';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from Sanity
    sanityClient
      .fetch(
        `*[_type == "category"] {
          _id,
          name,
          image
        }`
      )
      .then((data) => {
        console.log("Fetched categories:", data); // Debugging
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Map over categories and render CategoryCard for each */}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          title={category.name}
          imgUrl={urlFor(category.image).url()} // Use urlFor to get the image URL
        />
      ))}
    </ScrollView>
  );
};

export default Categories;