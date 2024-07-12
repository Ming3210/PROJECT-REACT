import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import User from "../../interface";
import { getUserAdmin } from "../../services/addCustomer";
import { addProduct, openDeleteFormP } from "../../services/addProduct";
import { delFormOpen, editFormOpen, getAllCategories, getDeletedCategory, getEditedCategory } from "../../services/allCategory";
import {  allUsers } from "../../services/allCustomer";
import { changeUserStatus, customerDisplayForm, display } from "../../services/allCustomer";
import { customerDisplayFormOff } from "../../services/customerDisplay";
import { getAllProducts, getDeletedProduct, getEditedProduct, openEditFormP } from "../../services/allProduct";
import { checkEmailAdmin } from "../../services/admin";
import { deleteCategory, delFormClose } from "../../services/deleteCategoryForm";
import { closeDeleteFormP, deleteProduct } from "../../services/deleteProduct";
import { closeEditFormP, editProduct } from "../../services/editProductForm";
import { editCategory, editFormClose } from "../../services/editCategoryForm";


const initialState:any=[]

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
        const updatedUserIndex = state.users.findIndex((u:any) => u.id === action.payload.id);
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
      
      .addCase(addProduct.fulfilled, (state:any, action: any) => {
        const { product, categories } = action.payload;

        state.products.push(product);

        state.categories = categories;

        const categoryIndex = state.categories.findIndex((cat:any) => cat.id === product.category);

        console.log(categoryIndex); 

        let a:any = state.categories[categoryIndex]
        if (categoryIndex !== -1) {
        

          state.categories[categoryIndex].product.push(product);
        }
        axios.patch(`http://localhost:8080/categories/${state.categories[categoryIndex].id}`, a)
        console.log(state.categories); // Log updated categories state
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
