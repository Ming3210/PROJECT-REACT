import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProduct :any = createAsyncThunk("delete/product", async (id:any)=>{
    await axios.delete(`http://localhost:8080/products/${id}`);
    return {id}
  })

  export const closeDeleteFormP: any = createAsyncThunk("close/product", async ()=>{
    return false
  })
  