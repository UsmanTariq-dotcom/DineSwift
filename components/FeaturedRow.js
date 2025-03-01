import { ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from "react-native-heroicons/outline";
import tw from 'twrnc';
import RestaurantCard from './RestaurantCard';
import sanityClient,{urlFor} from '../deliveroo-clone/.sanity/runtime/sanity';

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured" && _id == $id] {
          _id,
          name,
          short_description,
          restaurants[]->{
            _id,
            name,
            image,
            rating,
            category->{  // Fetch the referenced category document
              name
            },
            address,
            short_description,
            dishes[]->{
              name,
              image,
              price,
              description,
            },
            long,
            lat
          }
        }[0]`,
        { id }
      )
      .then((data) => {
        console.log("Fetched restaurants:", data?.restaurants); // Debugging
        setRestaurants(data?.restaurants || []);
      })
      .catch(console.error);
  }, [id]);
  

  return (
    <View>
      <View style={tw`mt-4 flex-row items-center justify-between px-4`}>
        <Text style={tw`font-bold text-lg`}>{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text style={tw`text-xs text-gray-500 px-4`}>{description}</Text>
      <ScrollView
        horizontal
        style={tw`pt-4`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {restaurants.map((restaurant) => (
          
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imageUrl={urlFor(restaurant.image).url()}  // Convert image object to URL
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.genre}
            address={restaurant.address}
            short_description={restaurant.short_description}
            description={restaurant.description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
            category={restaurant.category}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
