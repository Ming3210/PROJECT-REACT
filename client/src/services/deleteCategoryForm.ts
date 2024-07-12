import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCategory: any = createAsyncThunk(
    "delete/category",
    async (id: any) => {
      await axios.delete(`http://localhost:8080/categories/${id}`);
      return { id };
    }
  );
  export const delFormClose :any = createAsyncThunk("close/deleteForm", async ()=>{
    return false
  })
  