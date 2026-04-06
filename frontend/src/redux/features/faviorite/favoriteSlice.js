import { createSlice } from "@reduxjs/toolkit";

const faviourateSlice = createSlice({
    name:'favorites',
    initialState:[],
    reducers:{
        // chaeck if product is already in favorites
        addTOFavorites:(state,action) =>{
            if(!state.some((product)=>product._id==action.payload._id)){
                 state.push(action.payload)
            }
        },
        removeFromFavorites:(state,action)=>{
        // remove the product from favorite
        return state.filter((product)=>product._id!=action.payload._id)
        },
        setfavorites:(state,action)=>{
            return action.payload
        }
    }
})

export const {addTOFavorites,setfavorites,removeFromFavorites} = faviourateSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites 
export default faviourateSlice.reducer;