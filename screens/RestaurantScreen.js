import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import { ArrowLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { StarIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import DishRow from "../components/DishRow";
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';



const RestaurantScreen = () => {
const dispatch=useDispatch();
const navigation = useNavigation();
  const { params } = useRoute() || { params: {} };

  const {
    id,
    imageUrl,
    title,
    rating,
    genre,
    category,
    address,
    short_description,
    description,  
    dishes = [],
    long,
    lat,
  } = params || {};

 

  // console.log("Params Received:", params);
  // console.log("Dishes Data:", dishes);


useEffect(()=>{
  dispatch(setRestaurant({ 
    id,
    imageUrl,
    title,
    rating,
    genre,
    category,
    address,
    short_description,
    description,  
    dishes,
    long,
    lat,
  }))
},[dispatch])

  return (
    <>
    <BasketIcon />
    <ScrollView>
      {/* Restaurant Image and Back Button */}
      <View style={tw`relative`}>
        <Image source={{ uri: imageUrl }} style={tw`w-full h-56 bg-gray-300`} />
        <TouchableOpacity
          onPress={navigation.goBack}
          style={tw`absolute top-14 left-2 p-2 bg-gray-100 rounded-full`}
        >
          <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>

      {/* Restaurant Details */}
      <View style={tw`bg-white`}>
        <View style={tw`px-4 pt-4`}>
          <Text style={tw`text-3xl font-bold`}>{title}</Text>
          <View style={tw`flex-row space-x-2 my-1`}>
            <View style={tw`flex-row items-center space-x-1`}>
              <StarIcon size={22} color="green" opacity={0.5} />
              <Text style={tw`text-xs text-gray-500`}>
                <Text style={tw`text-green-500`}>{rating}</Text> · {category?.name || 'No Category'}
              </Text>
            </View>
            <View style={tw`flex-row items-center space-x-1`}>
              <View style={tw`pl-1`}>
                <MapPinIcon size={22} color="gray" opacity={0.4} />
              </View>
              <Text style={tw`text-xs text-gray-500`}>
                <Text style={tw`text-gray-500`}>Nearby. {address}</Text>
              </Text>
            </View>
          </View>
          <Text style={tw`text-gray-500 mt-2 pb-2`}>{short_description}</Text>
        </View>

        {/* Allergy Info */}
        <TouchableOpacity style={tw`flex-row items-center space-x-2 p-4 border-t border-b border-gray-300`}>
          <QuestionMarkCircleIcon color="gray" size={20} opacity={0.5} />
          <Text style={tw`pl-2 flex-1 text-md font-bold`}>Have a food allergy?</Text>
          <ChevronRightIcon color="#00CCBB" />
        </TouchableOpacity>
      </View>

      {/* Menu Section */}
      <View style={tw`pb-36`}>
        <Text style={tw`px-4 pt-6 mb-3 text-xl font-bold`}>Menu</Text>
{Array.isArray(dishes) && dishes.length > 0 ? (
  dishes.map((dish, index) => (
    <DishRow
      key={dish._id || `dish-${index}`}
      id={dish._id || `dish-${index}`} // Use fallback if _id is undefined
      name={dish.name}
      price={dish.price}
      description={dish.description || "No description available!"}
      image={dish.image}
    />
  ))
) : (
  <Text style={tw`px-4 py-2 text-gray-500`}>No dishes available.</Text>
)}

      </View>
    </ScrollView>
    </>
  );
};

export default RestaurantScreen;
