import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts: any = createAsyncThunk("get/allProducts", async ()=>{
    const response = await axios.get(`http://localhost:8080/products?`);
      return response.data;
  })


  export const getEditedProduct :any = createAsyncThunk("getEdited/product", async (prd)=>{
    return prd
  })
  export const getDeletedProduct :any = createAsyncThunk("get/product", async (prd)=>{
    return prd
  })
  
  export const openEditFormP: any = createAsyncThunk("openEdit/product", async ()=>{
    return true
  })

  