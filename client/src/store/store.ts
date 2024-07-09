import { configureStore, createSlice } from "@reduxjs/toolkit";
import homeReducer from "./reducers/homeReducer";
import adminReducer from "./reducers/adminReducer";

export const store= configureStore({
    reducer:{
        home:homeReducer,
        admin:adminReducer,
    }
})

export default store;