import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkEmailAdmin:any = createAsyncThunk(
    "users/checkEmail",
    async (email:any) => {
      // console.log();
      
      const response = await axios.get(`http://localhost:8080/users?email=${email.email}`);
      return response.data;
    }
  );
  