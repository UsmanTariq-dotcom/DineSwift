import React from 'react';
import { View, Text,TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';


const BasketIcon = () => {

    const items=useSelector(selectBasketItems);
    const navigation=useNavigation();
    const basketTotal= useSelector(selectBasketTotal);

 
    if(items.length===0) return null; 

    return (
        <View style={tw`absolute bottom-10 w-full z-50`}>
            <TouchableOpacity onPress={()=>navigation.navigate("Basket")} style={tw`mx-5 p-4 rounded-lg flex-row items-center space-x-1 bg-[#66E5D3]`}>
            <Text style={tw`text-white font-extrabold text-lg bg-[#01A296] py-1 px-2 rounded-lg`}>{items.length}</Text>
            <Text style={tw`text-white font-extrabold text-lg text-center flex-1`}>View Basket</Text>
            <Text>${basketTotal}</Text>
            </TouchableOpacity>
        </View>
    );
};




export default BasketIcon;