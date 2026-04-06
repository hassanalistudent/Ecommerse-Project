import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
    categories:[],
    products:[],
    checked:[],
    radio:[],
    brandCheckboxes:{},
    selectedBrands:[]
}

const shopSlice = createSlice({
    name:'shop',
    initialState,
    reducers:{
        setCategories:(state,action)=>{
            state.categories=action.payload
        },
        setProducts:(state,action)=>{
            state.products=action.payload
        },
        setChecked:(state,action)=>{
            state.checked=action.payload
        },
        setSelectedBrand:(state,action)=>{
            state.selectedBrands=action.payload
        },
        setRadio:(state,action)=>{
            state.radio=action.payload
        },
    }
})

export const {setCategories,setChecked,setRadio,setSelectedBrand,setProducts} = shopSlice.actions;
export default shopSlice.reducer;