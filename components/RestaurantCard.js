import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({
  id,
  imageUrl,
  title,
  rating,
  genre,
  category,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        // console.log("Navigating with data:", {
        //   id,
        //   imageUrl,
        //   title,
        //   rating,
        //   genre,
        //   category,
        //   address,
        //   short_description,
        //   dishes,
        //   long,
        //   lat,
        // });
        navigation.navigate('Restaurant', {
          id,
          imageUrl,
          title,
          rating,
          genre,
          category,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      style={tw`bg-white mr-3 shadow`}
    >
      <Image style={tw`h-36 w-64 rounded-sm`} source={{ uri: imageUrl }} />
      <View style={tw`px-3 pb-4`}>
        <Text style={tw`font-bold text-lg pt-2`}>{title}</Text>
        <View style={tw`flex-row items-center space-x-1`}>
          <StarIcon color="green" opacity={0.2} size={22} />
          <Text style={tw`text-xs text-gray-500`}>
            <Text style={tw`text-green-500`}>{rating}</Text> · {category?.name || "No Category"}
          </Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text style={tw`mx-1 text-xs text-gray-500`}>Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;