import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const searchProSlice = createSlice({
    name : 'searchPro',
    initialState,
    reducers : {
        addPro(state, action){
            state.push(action.payload);
        }
    }
})

export const {addPro} = searchProSlice.actions;
export default searchProSlice.reducer;