import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Assign a unique identifier to differentiate instances of the same dish
      state.items.push({ ...action.payload, uniqueKey: Date.now() });
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1); // Remove only one occurrence
        state.items = [...state.items]; // Force state update
      }
    }
    
    
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors
export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const   selectBasketTotal=(state)=>state.basket.items.reduce((total,item)=>total+=item.price,0)

export default basketSlice.reducer;





