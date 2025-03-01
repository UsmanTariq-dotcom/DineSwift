import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux';
import store from './store'; // Ensure correct store import
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import BasketScreen from './screens/BasketScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen}  options={{ presentation: "fullScreenModal", animation: "slide_from_bottom" }} />
          <Stack.Screen  name="Basket" component={BasketScreen}  options={{ presentation: "modal", animation: "slide_from_bottom" }}/>
          <Stack.Screen  name="Delivery" component={DeliveryScreen}  options={{ presentation: "fullScreenModal", animation: "slide_from_bottom" }}/>

          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
