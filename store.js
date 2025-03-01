import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './features/basketSlice'; // Ensure this path is correct
import restaurantReducer from './features/restaurantSlice';

const store = configureStore({
  reducer: {
    basket: basketReducer, 
    restaurant:restaurantReducer,
  },
});

export default store; 
