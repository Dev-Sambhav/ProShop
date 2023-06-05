import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtil";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // checking item is already exists or not
      const isExistItem = state.cartItems.find((i) => i._id === item._id);
      if (isExistItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === isExistItem._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;
export default cartSlice.reducer;
