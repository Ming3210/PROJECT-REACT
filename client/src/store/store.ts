import { configureStore, createSlice } from "@reduxjs/toolkit";
import homeReducer from "./reducers/homeReducer";

export const store= configureStore({
    reducer:{
        home:homeReducer,
    }
})

export default store;