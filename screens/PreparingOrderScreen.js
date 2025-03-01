import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image as ExpoImage } from "expo-image"; // ✅ Correct import
import * as Animatable from "react-native-animatable";
import * as Progress from 'react-native-progress';
import tw from "twrnc";

const PreparingOrderScreen = () => {


  const navigation = useNavigation();

  useEffect(() => {
    // Hide system navigation bar
    StatusBar.setHidden(true);
    setTimeout(()=>{
        navigation.navigate("Delivery");
    },4000);

    return () => {
      // Show system navigation bar when leaving
      StatusBar.setHidden(false);
    };
  }, []);

  return (
    <SafeAreaView style={tw`bg-[#00CCBB] flex-1 justify-center items-center`}>
      {/* Animated GIF */}
      <Animatable.View animation="slideInUp" iterationCount={1}>
        <ExpoImage
          source={require("../assets/delivery.gif")} // Local GIF file
          style={tw`h-96 w-96`}
          contentFit="contain"
        />
      </Animatable.View>

      {/* Animated Text */}
      <Animatable.Text
        animation="fadeInUp" // Animation type
        iterationCount={4} // Loop the animation
        style={tw`text-white text-lg font-bold mt-4`}
      >
        Waiting for Restaurant to accept your order...
      </Animatable.Text>

      <Progress.CircleSnail size={50} color={['yellow', 'orange', 'purple']} />
      
    </SafeAreaView>
  );
}; 

export default PreparingOrderScreen;