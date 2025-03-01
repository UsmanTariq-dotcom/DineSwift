import { View,Image, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import tw from "twrnc";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../deliveroo-clone/.sanity/runtime/sanity";


const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch=useDispatch();
  const basketTotal=useSelector(selectBasketTotal);

  // ✅ Use useMemo to optimize calculations
  const groupedItemsInBasket = useMemo(() => {
    return items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
  }, [items]);

  console.log(groupedItemsInBasket);

  return (
    <SafeAreaView style={tw`flex-1 bg-white pt-14`}> 
      {/* Added `pt-14` to push the screen down from the status bar */}
      <View  style={tw`flex-1 bg-gray-100 `}>
        <View style={tw`p-5 border-b border-[#00CCBB]  bg-white shadow-xs `}>
         <View>
         <Text style={tw`text-lg font-bold text-center`}>BasketScreen</Text>
         <Text style={tw`text-center text-gray-400`}>{restaurant?.title}</Text>
         </View>
         <TouchableOpacity
          onPress={navigation.goBack} 
          style={tw`rounded-full bg-gray-100 absolute top-2 right-5`}
          >
      <XCircleIcon color="#00CCBB" height={50} width={50}/>
         </TouchableOpacity>
        </View>
        <View style={tw`flex-row items-center space-x-4 px-4 py-3 bg-white my-5`}>
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          style={tw`h-7  w-7 bg-gray-300 p-4 rounded-full`}
        />
        <Text style={tw`flex-1 px-4`}>Deliver in 50-75 min</Text>
        <TouchableOpacity>
          <Text style={tw`text-[#00CCBB]`}>Change</Text>
        </TouchableOpacity>
        </View>
        <ScrollView >
  {Object.entries(groupedItemsInBasket).map(([key, items]) => (
    <View key={key}>
      <View style={tw`flex-row items-center bg-white py-2 px-5`}>
        <Text style={tw`text-[#00CCBB]`}>{items.length} x</Text>
        <Image
          style={tw`h-12 w-12 rounded-full ml-1`}
          source={{ uri: urlFor(items[0]?.image).url() }}
        />
        <Text style={tw`flex-1 mx-2`}>{items[0]?.name}</Text>
        <Text style={tw`text-gray-600 px-7`}>${items[0]?.price}</Text>
        <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
          <Text style={tw`text-[#00CCBB] text-xs`}>Remove</Text>
        </TouchableOpacity>
        

      </View>

      {/* Divider for all items */}
      <View style={tw`border-b border-gray-200 mx-5`} />
    </View>
  ))}
</ScrollView>

<View style={tw`p-5 bg-white mt-5 `}>
  
  <View style={tw`flex-row justify-between`}>
    <Text style={tw`text-gray-400`}>Subtotal</Text>
    <Text style={tw`text-gray-400`}>${basketTotal}</Text>
  </View>

  <View style={tw`flex-row justify-between`}>
    <Text style={tw`text-gray-400`}>Delivery fee</Text>
    <Text style={tw`text-gray-400`}>${4.99}</Text>
  </View>


  <View style={tw`flex-row justify-between`}>
    <Text style={tw`pb-2`} >Order Total  </Text>
    <Text style={tw`font-extrabold`}>${basketTotal+4.99}</Text>
  </View>

<TouchableOpacity  onPress={()=>navigation.navigate('PreparingOrderScreen')} style={tw`rounded-lg bg-[#00CCBB] p-4 `}>
  <Text style={tw`text-lg text-center text-white font-bold`}>Place Order</Text>
</TouchableOpacity>

</View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
 