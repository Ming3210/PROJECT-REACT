import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const editProduct : any = createAsyncThunk("edit/product", async (prd:any)=>{
    const response = await axios.patch(`http://localhost:8080/products/${prd.id}`,prd)
    return response.data
  })
  export const closeEditFormP: any = createAsyncThunk("closeEdit/product", async ()=>{
    return false
  })
  