import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from "../features/basketSlice";
import tw from "twrnc";
import { urlFor } from "../deliveroo-clone/.sanity/runtime/sanity";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();

  // Get the count of this item in the basket
  const quantity = useSelector((state) => selectBasketItemsWithId(state, id).length);

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (quantity > 0) {
      dispatch(removeFromBasket({ id }));
    }
  };

  return (
    <>
      <TouchableOpacity 
        onPress={() => setIsPressed(!isPressed)} 
        style={tw`flex-row items-center bg-white p-4 border-b border-gray-200 ${isPressed ? "border-b-0" : ""}`}
      >
        {/* Dish Details */}
        <View style={tw`flex-1 pr-2`}>
          <Text style={tw`text-lg mb-1`}>{name}</Text>
          <Text style={tw`text-gray-400 mt-1 text-sm`}>{description}</Text>
          <Text style={tw`text-gray-400 mt-2`}>${price}</Text>
        </View>
        
        {/* Dish Image */}
        <Image 
          source={{ uri: urlFor(image).url() }} 
          style={[tw`h-20 w-20 bg-gray-300 p-4`, { borderWidth: 1, borderColor: "#F3F3F4" }]} 
        />
      </TouchableOpacity>

      {/* Quantity Controls */}
      {isPressed && (
        <View style={tw`bg-white px-4`}>
          <View style={tw`flex-row items-center space-x-2 pb-3`}>
            <TouchableOpacity onPress={removeItemFromBasket} disabled={quantity === 0}>
              <MinusCircleIcon color={quantity > 0 ? "#00CCBB" : "gray"} size={40} />
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
