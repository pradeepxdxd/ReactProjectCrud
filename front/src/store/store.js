import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import searchProSlice from "./searchProSlice";

const myStore = configureStore({
    reducer : {
        cart : cartSlice,
        searchPro : searchProSlice
    }
})

export default myStore;