import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState:any = []

export const getAllUsers:any = createAsyncThunk("check/checkAdminAccount", async () =>{
    const response = await axios.get("http://localhost:8080/users")
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

  export const setCurrentUser:any = createAsyncThunk("users/getCurrentUser", async(user:any)=>{
    const response = await axios.get(`http://localhost:8080/users/${user.id}`)
    console.log(response.data);
    
    return response.data
    
  })
  const getCurrentUser = createAsyncThunk("users/getCurrentUser", async()=>{
    
  })

const homeReducer = createSlice({
    name: "homeReducer",
    initialState: {
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
        users: [],
    },
    reducers: {
       
    },
    extraReducers(builder) {
        builder
        .addCase(getAllUsers.pending, (state) => {
        })
        .addCase(getAllUsers.fulfilled,(state:any,action:any)=>{
            state.users = action.payload
        })
          .addCase(getAllUsers.rejected, (state, action) => {
          })
          .addCase(openForm.fulfilled, (state,action) => {            
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
          .addCase(setCurrentUser.fulfilled, (state, action) => {
            state.loginUser = action.payload;
          })
    },
})

export default homeReducer.reducer;