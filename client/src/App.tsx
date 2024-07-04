import React from "react";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";

export default function App() {
  alert("email: admin@gmail.com\npassword:123456");
  return (
    <div>
      <Routes>
        <Route path="" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/admin" element={<Admin></Admin>}>
          <Route path="" element={<Dashboard></Dashboard>}></Route>
          {/* <Route path="cart" element={<Cart></Cart>}></Route>
          <Route path="add-product" element={<AddProduct></AddProduct>}></Route> */}
          {/* <Route
            path="check-user"
            element={<AllCustomer></AllCustomer>}
          ></Route> */}
          {/* <Route
            path="add-category"
            element={<AddCategory></AddCategory>}
          ></Route> */}
        </Route>
      </Routes>
    </div>
  );
}
