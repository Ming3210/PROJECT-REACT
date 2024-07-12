import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const allUsers:any = createAsyncThunk("get/getAllUsers", async () => {
    const response = await axios.get(`http://localhost:8080/users`);
      return response.data;
  })

  export const changeUserStatus:any = createAsyncThunk("change/changeStatus", async (user:any) => {
    // console.log(user);
    
    const response = await axios.put(`http://localhost:8080/users/${user.id}`,{...user,status:!user.status}) ;
      return response.data;
    
  })
  export const customerDisplayForm:any = createAsyncThunk("on/onDisplay", async () => {
    return true
  })
  export const display:any = createAsyncThunk("display/customerDisplay", async (user:any) => {
    return user;
  })
  