import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserAdmin:any = createAsyncThunk(
    "newUser/registerUser",
    async (user:any) => {
      const response = await axios.post("http://localhost:8080/users", user);
      return response.data;
    }
  );