import React from "react";
import Register from "./pages/user/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Cart from "./pages/admin/Cart";
import AddProduct from "./pages/admin/AddProduct";
import AllCustomer from "./pages/admin/AllCustomer";
import AddCategory from "./pages/admin/AddCategory";
import AllProduct from "./pages/admin/AllProduct";
import AddCustomer from "./pages/admin/AddCustomer";
import AllCategory from "./pages/admin/AllCategory";

export default function App() {
  // alert("email: admin@gmail.com\npassword:123456");
  return (
    <div>
      <Routes>
        <Route path="" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/admin" element={<Admin></Admin>}>
          <Route path="" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="check-product"
            element={<AllProduct></AllProduct>}
          ></Route>
          <Route path="cart" element={<Cart></Cart>}></Route>

          <Route path="add-product" element={<AddProduct></AddProduct>}></Route>
          <Route
            path="check-user"
            element={<AllCustomer></AllCustomer>}
          ></Route>
          <Route path="add-user" element={<AddCustomer></AddCustomer>}></Route>
          <Route
            path="add-category"
            element={<AddCategory></AddCategory>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}
