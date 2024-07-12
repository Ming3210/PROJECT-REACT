import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const editFormClose :any = createAsyncThunk("close/editForm", async ()=>{
    return false
  })
  export const editCategory: any = createAsyncThunk("edit/category", async(category:any)=>{
    const response = await axios.patch(`http://localhost:8080/categories/${category.id}`,category)
    return response.data
  })
  