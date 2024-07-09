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
export const getAllCategories:any = createAsyncThunk("get/getCategory", async (user:any) => {
  const response = await axios.get("http://localhost:8080/categories");
    return response.data;
})

export const deleteCategory: any = createAsyncThunk(
  "delete/category",
  async (id: any) => {
    await axios.delete(`http://localhost:8080/categories/${id}`);
    return { id };
  }
);

export const delFormOpen :any = createAsyncThunk("open/deleteForm", async ()=>{
  return true
})
export const delFormClose :any = createAsyncThunk("close/deleteForm", async ()=>{
  return false
})
export const editFormOpen :any = createAsyncThunk("open/editForm", async ()=>{
  return true
})
export const editFormClose :any = createAsyncThunk("close/editForm", async ()=>{
  return false
})

export const getDeletedCategory: any = createAsyncThunk("get/category", async(cate)=>{
  return cate
})
export const getEditedCategory: any = createAsyncThunk("get/edit", async(cate)=>{
  return cate
})
export const editCategory: any = createAsyncThunk("edit/category", async(category:any)=>{
  const response = await axios.patch(`http://localhost:8080/categories/${category.id}`,category)
  return response.data
})
export const getAllProducts: any = createAsyncThunk("get/allProducts", async ()=>{
  const response = await axios.get(`http://localhost:8080/products?`);
    return response.data;
})
export const openDeleteFormP: any = createAsyncThunk("open/product", async ()=>{
  return true
})
export const closeDeleteFormP: any = createAsyncThunk("close/product", async ()=>{
  return false
})
export const openEditFormP: any = createAsyncThunk("openEdit/product", async ()=>{
  return true
})
export const closeEditFormP: any = createAsyncThunk("closeEdit/product", async ()=>{
  return false
})
export const getDeletedProduct :any = createAsyncThunk("get/product", async (prd)=>{
  return prd
})
export const deleteProduct :any = createAsyncThunk("delete/product", async (id:any)=>{
  await axios.delete(`http://localhost:8080/products/${id}`);
  return {id}
})
export const getEditedProduct :any = createAsyncThunk("getEdited/product", async (prd)=>{
  return prd
})
export const addProduct :any = createAsyncThunk("add/product", async(prd)=>{
  const response = await axios.post(`http://localhost:8080/products`,prd)
  return response.data
})
export const editProduct : any = createAsyncThunk("edit/product", async (prd:any)=>{
  const response = await axios.patch(`http://localhost:8080/products/${prd.id}`,prd)
  return response.data
})

const adminReducer = createSlice({
  name: "adminReducer",
  initialState:{
    users: initialState,
    user:{},
    Cdisplay:false,
    categories:[],
    deleteForm:false,
    deletedCategory:{},
    editForm:false,
    editedCategory:{},
    products:[],
    deleteFormProduct:false,
    editFormProduct:false,
    deletedProduct:{},
    editedProduct:{}

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
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state: any, action: any) => {
        state.categories = state.categories.filter((category: any) => category.id !== action.payload.id);
      })
      .addCase(delFormOpen.fulfilled, (state,action) => {
        state.deleteForm = action.payload;
      })
      .addCase(delFormClose.fulfilled, (state,action) => {
        state.deleteForm = action.payload;
      })
      .addCase(getDeletedCategory.fulfilled, (state, action) => {
        state.deletedCategory = action.payload;
      })
      .addCase(editFormOpen.fulfilled, (state,action) => {
        state.editForm = action.payload;
      })
      .addCase(editFormClose.fulfilled, (state,action) => {
        state.editForm = action.payload;
      })
      .addCase(getEditedCategory.fulfilled, (state,action) => {
        state.editedCategory = action.payload;
      })
      .addCase(editCategory.fulfilled, (state:any, action:any) => {
        const updatedCategoryIndex:any = state.categories.findIndex((c:any) => c.id === action.payload.id);
        if (updatedCategoryIndex!== -1) {
          state.categories[updatedCategoryIndex] = action.payload;
        }
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(openDeleteFormP.fulfilled, (state,action) => {
        state.deleteFormProduct = action.payload;
      })
      .addCase(closeDeleteFormP.fulfilled, (state,action) => {
        state.deleteFormProduct = action.payload;
      })
      .addCase(openEditFormP.fulfilled, (state,action) => {
        state.editFormProduct = action.payload;
      })
      .addCase(closeEditFormP.fulfilled, (state,action) => {
        state.editFormProduct = action.payload;
      })
      .addCase(getDeletedProduct.fulfilled, (state,action) => {
        state.deletedProduct = action.payload
      })
      .addCase(deleteProduct.fulfilled, (state:any, action:any) => {
        state.products = state.products.filter((product:any) => product.id!== action.payload.id);
      })
      .addCase(addProduct.fulfilled, (state:any,action:any) => {
        state.products.push(action.payload);
      })
      .addCase(getEditedProduct.fulfilled, (state, action) => {
        state.editedProduct = action.payload;
      })
      .addCase(editProduct.fulfilled, (state:any, action) => {
        const updatedProductIndex:any = state.products.findIndex((p:any) => p.id === action.payload.id);
        if (updatedProductIndex!== -1) {
          state.products[updatedProductIndex] = action.payload;
        }
      })
      ;

  },
});

export default adminReducer.reducer;
