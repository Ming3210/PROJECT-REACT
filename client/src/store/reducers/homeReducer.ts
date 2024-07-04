import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState:any = []

export const allUsers:any = createAsyncThunk("check/checkAdminAccount", async () =>{
    const response = await axios.get(" http://localhost:8080/user")
    return response.data;
})

export const openForm:any = createAsyncThunk("open/openForm", async () =>{
    return true;
})
export const closeForm:any = createAsyncThunk("close/closeForm", async () =>{
    return false;
})

export const getUser:any = createAsyncThunk(
    "newUser/registerUser",
    async (user) => {
      const response = await axios.post("http://localhost:8080/users", user);
      return response.data;
    }
  );
  
  export const checkEmail:any = createAsyncThunk(
    "users/checkEmail",
    async (email:any) => {
      // console.log();
      
      const response = await axios.get(`http://localhost:8080/users?email=${email.email}`);
      return response.data;
    }
  );
  export const openRegisterForm:any = createAsyncThunk("open/openRegisterForm", async () =>{
    return true;
  })
  export const closeRegisterForm:any = createAsyncThunk("close/closeRegisterForm", async () =>{
    return false;
  })

const homeReducer = createSlice({
    name: "homeReducer",
    initialState: {
        initialState:initialState,
        // tk đang đăng nhập
        loginUser:{},
        // tk đang đăng kí
        currentUser: {},
        // tk admin
        adminUser: {
            email: "admin@gmail.com",
            password: "123456",
        },
        formLogin:false,
        formRegister:false,
        error: null,
        users: [],
    },
    reducers: {
       
    },
    extraReducers(builder) {
        builder.addCase(allUsers.fulfilled,(state:any,action:any)=>{
            state.initialState = action.payload
        })
        .addCase(allUsers.pending, (state) => {
            state.initialState = "loading";
          })
          .addCase(allUsers.rejected, (state, action) => {
            state.initialState = "failed";
          })
          .addCase(openForm.fulfilled, (state,action) => {
            console.log(action.payload);
            
            state.formLogin = action.payload;
          })
          .addCase(closeForm.fulfilled, (state,action) => {
            console.log(action.payload);
            state.formLogin = action.payload;
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
          })
          .addCase(checkEmail.fulfilled, (state, action) => {
            state.users = action.payload;
          })
          .addCase(openRegisterForm.fulfilled, (state, action) => {
            state.formRegister = action.payload;
          })
          .addCase(closeRegisterForm.fulfilled, (state, action) => {
            state.formRegister = action.payload;
          })
    },
})

export default homeReducer.reducer;