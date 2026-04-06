import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice.js";
import favoritesReducer from '../redux/features/faviorite/favoriteSlice.js'
import { getFavoritesFromLocalStorage } from "../Utils/localStorage.js";
import cartSliceReducer from "../redux/features/cart/cartSlice.js"
import shopReducer from "../redux/features/shop/shopSlice.js"


const initialFavorites = getFavoritesFromLocalStorage()||[];
const store = configureStore({
  reducer: {
    // ✅ Register your auth slice so `state.auth` exists
    auth: authReducer,
    favorites:favoritesReducer,
    cart:cartSliceReducer,
    shop:shopReducer,
    // ✅ Register RTK Query slice
    [apiSlice.reducerPath]: apiSlice.reducer,

  },
  preloadedState:{
    favorites:initialFavorites
   
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true,
});

setupListeners(store.dispatch);
export default store;
