import { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { XCircleIcon } from 'react-native-heroicons/outline';
import ProgressBar from 'react-native-progress/Bar';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import sanityClient from '../deliveroo-clone/.sanity/runtime/sanity';


const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);

    // ✅ State to store coordinates from Sanity
    const [location, setLocation] = useState({
        latitude: 37.78825,  // Default value
        longitude: -122.4324 // Default value
    });

    // ✅ Fetch latitude & longitude from Sanity
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const data = await sanityClient.fetch(`
                    *[_type == "restaurant" && _id == $id][0]{
                        location { lat, lng }
                    }
                `, { id: restaurant.id }); // Assuming your Redux store has restaurant ID

                if (data?.location) {
                    setLocation({
                        latitude: data.location.lat,
                        longitude: data.location.lng
                    });
                }
            } catch (error) {
                console.error("Error fetching location:", error);
            }
        };

        fetchLocation();
    }, [restaurant.id]);

    return (
        <View style={tw`bg-[#00CCBB] flex-1`}>
            <SafeAreaView style={tw`z-50`}>
                <View style={tw`flex-row justify-between items-center p-5`}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <XCircleIcon color="white" size={30} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '300', color: 'white', fontSize: 18 }}>Order Help</Text>
                </View>

                <View style={tw`bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
                    <View style={tw`flex-row justify-center items-center`}>
                        <View>
                            <Text style={tw`text-lg text-gray-400 pl-7`}>Estimated Arrival</Text>
                            <Text style={tw`text-4xl font-bold pl-7`}>45-55 Minutes</Text>
                        </View>
                        <Image style={tw`h-20 w-20`} source={{ uri: "https://links.papareact.com/fls" }} />
                    </View>

                    {/* 🔄 Indeterminate Progress Bar (Animated) */}
                    <ProgressBar indeterminate={true} mx-7 width={200} color="#00CCBB" />
                    <Text style={tw`text-gray-500 mt-3`}>Your order at {restaurant.title} is being prepared 😋 </Text>
                </View>
            </SafeAreaView>

            {/* 🌍 Map with Marker */}
            <MapView
                style={{ flex: 1, width: '100%', height: '50%' }}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {/* 📍 Marker at restaurant location */}
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude
                    }}
                    title={restaurant.title}
                    description="Your food is on the way!"
                    pinColor="#00CCBB"
                />
            </MapView>
            <SafeAreaView style={tw`bg-white flex-row items-center  h-28`}>
                <Image  style={tw`h-12 w-12 p-4 mr-2 mt-2 bg-gray-300 rounded-full ml-5`} source={{uri:"https://links.papareact.com/wru"}} />
                <View style={tw`flex-1`}>
                    <Text style={tw`text-lg mt-3`}>Usman Tariq </Text>
                    <Text style={tw`text-gray-400`}>Your Rider</Text>
                </View>
                <Text style={tw`text-lg text-[#00CCBB] mr-5 font-bold`}>Call</Text>
            </SafeAreaView>
        </View>
    );
}

export default DeliveryScreen;

const styles = StyleSheet.create({});
