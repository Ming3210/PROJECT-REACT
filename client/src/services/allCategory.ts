import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategories:any = createAsyncThunk("get/getCategory", async (user:any) => {
    const response = await axios.get("http://localhost:8080/categories");
      return response.data;
  })

  export const getDeletedCategory: any = createAsyncThunk("get/category", async(cate)=>{
    return cate
  })
  
export const getEditedCategory: any = createAsyncThunk("get/edit", async(cate)=>{
    return cate
  })

  export const delFormOpen :any = createAsyncThunk("open/deleteForm", async ()=>{
    return true
  })
  export const editFormOpen :any = createAsyncThunk("open/editForm", async ()=>{
    return true
  })