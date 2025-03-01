import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, SafeAreaView, TextInput } from 'react-native';
import sanityClient from '../deliveroo-clone/.sanity/runtime/sanity';
import FeaturedRow from '../components/FeaturedRow';
import Categories from '../components/categories'; // Import the Categories component
import tw from 'twrnc';
import { ChevronDownIcon, UserIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    // Fetch restaurants from Sanity
    sanityClient
      .fetch(
        `*[_type == "restaurant"] {
          _id,
          name,
          image,
          rating,
          category->{
            name
          },
          address,
          short_description,
          dishes[]->{
            _id,
            name,
            description, // ✅ Added description
            image,
            price
          },
          long,
          lat
        }`
      )
      .then((data) => {
        // console.log("Fetched restaurants:", data); // Debugging
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });

    // Fetch featured categories from Sanity
    sanityClient
      .fetch(
        `*[_type == "featured"] {
          _id,
          name,
          short_description,
          restaurants[]->{
            _id,
            name,
            image,
            rating,
            category->{
              name
            },
            address,
            short_description,
            dishes[]->{
              _id,
              name,
              description, // ✅ Added description
              image,
              price
            },
            long,
            lat
          }
        }`
      )
      .then((data) => {
        // console.log("Fetched featured categories:", data); // Debugging
        setFeaturedCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching featured categories:", error);
      });
  }, []);

  return (
    <SafeAreaView style={tw`bg-white h-full pt-2`}>
      {/* Header Section */}
      <View style={tw`flex-row pb-3 items-center mx-4 space-x-2 mt-5`}>
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}
        />
        <View style={tw`flex-1`}>
          <Text style={tw`font-bold pl-1 text-gray-400 text-xs`}>Deliver Now!</Text>
          <Text style={tw`font-bold pl-1 text-xl`}>Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon style={tw`ml-20`} size={35} color="#00CCBB" />
      </View>

      <View style={tw`flex-row space-x-2 items-center pb-2 mx-4`}>
        <View style={tw`flex-row flex-1 space-x-2 items-center bg-gray-200`}>
          <MagnifyingGlassIcon style={tw`ml-2 mt-1`} color="#00CCBB" />
          <TextInput placeholder='Restaurants and Cuisines' keyboardType='default' />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      <ScrollView style={tw`bg-gray-100`} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Restaurants Title */}
        <Text style={tw`text-2xl font-bold p-2`}>Restaurants</Text>

        {/* Categories Section */}
        <Categories />

        {/* Render Featured Rows */}
        {featuredCategories.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
