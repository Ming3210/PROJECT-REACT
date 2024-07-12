import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct:any = createAsyncThunk(
    "add/product",
    async ({ prd, cate }: any) => {
      console.log(prd,123123123);
      
      const response = await axios.post(`http://localhost:8080/products`, prd);
      const categoriesResponse = await axios.get(`http://localhost:8080/categories`);
      return { product: response.data, categories: categoriesResponse.data };
    }
  );

  export const openDeleteFormP: any = createAsyncThunk("open/product", async ()=>{
    return true
  })