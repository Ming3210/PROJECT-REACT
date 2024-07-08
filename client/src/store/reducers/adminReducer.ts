import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import User from "../../interface";


const initialState:User[]=[]



export const allUsers:any = createAsyncThunk("get/getAllUsers", async (user: any) => {
  const response = await axios.get("http://localhost:8080/users");
    return response.data;
})
export const getUserAdmin:any = createAsyncThunk(
  "newUser/registerUser",
  async (user) => {
    const response = await axios.post("http://localhost:8080/users", user);
    return response.data;
  }
);
export const checkEmailAdmin:any = createAsyncThunk(
  "users/checkEmail",
  async (email:any) => {
    // console.log();
    
    const response = await axios.get(`http://localhost:8080/users?email=${email.email}`);
    return response.data;
  }
);
export const changeUserStatus:any = createAsyncThunk("change/changeStatus", async (user:any) => {
  // console.log(user);
  
  const response = await axios.put(`http://localhost:8080/users/${user.id}`,{...user,status:!user.status}) ;
    return response.data;
  
})
export const customerDisplayForm:any = createAsyncThunk("on/onDisplay", async () => {
  return true
})
export const customerDisplayFormOff:any = createAsyncThunk("close/closeDisplay", async () => {
  return false
})
export const display:any = createAsyncThunk("display/customerDisplay", async (user:any) => {
  return user;
})

const adminReducer = createSlice({
  name: "adminReducer",
  initialState:{
    users: initialState,
    user:{},
    Cdisplay:false,
    // error: null,
    // loading: false,
    // user: null as User | null,
  },
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(allUsers.pending, (state) => {
      })
      .addCase(allUsers.rejected, (state, action) => {
      })
      .addCase(allUsers.fulfilled,(state,action)=>{
        state.users = action.payload;
      })
      .addCase(getUserAdmin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(checkEmailAdmin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        const updatedUserIndex = state.users.findIndex((u) => u.id === action.payload.id);
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload;
        }
      })
      .addCase(customerDisplayForm.fulfilled, (state, action) => {
        state.Cdisplay = action.payload;
      })
      .addCase(customerDisplayFormOff.fulfilled, (state, action) => {
        state.Cdisplay = action.payload;
      })
      .addCase(display.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  },
});

export default adminReducer.reducer;
