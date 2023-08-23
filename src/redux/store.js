import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import BasketSlice from "./BasketSlice";



export default configureStore({
    reducer:{
        user:UserSlice,
        basket:BasketSlice,
        
    }
})