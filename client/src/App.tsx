import React from "react";
import Register from "./pages/user/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/Login";
import Page from "./pages/user/Page";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Cart from "./pages/user/Cart";
import AllCustomer from "./pages/admin/AllCustomer";
import AllProduct from "./pages/admin/AllProduct";
import AllCategory from "./pages/admin/AllCategory";
import Category from "./pages/user/Category";
import Home from "./pages/user/Home";
import ProductDetail from "./pages/user/ProductDetail";
import Checkout from "./pages/user/Checkout";
import Wishlist from "./pages/user/Wishlist";
import UserDetail from "./pages/user/UserDetail";
import Orders from "./pages/admin/Orders";

export default function App() {
  // alert("email: admin@gmail.com\npassword:123456");
  return (
    <div>
      <Routes>
        <Route path="" element={<Page></Page>}>
          <Route path="" element={<Home></Home>}></Route>
          <Route
            path="product-detail/:id"
            element={<ProductDetail></ProductDetail>}
          ></Route>
          <Route path="category" element={<Category></Category>}></Route>
          <Route path="cart" element={<Cart></Cart>}></Route>
          <Route path="checkout" element={<Checkout></Checkout>}></Route>
          <Route path="wishlist" element={<Wishlist></Wishlist>}></Route>
          <Route path="user-detail" element={<UserDetail></UserDetail>}></Route>
        </Route>

        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/admin" element={<Admin></Admin>}>
          <Route path="" element={<Dashboard></Dashboard>}></Route>
          <Route
            path="all-category"
            element={<AllCategory></AllCategory>}
          ></Route>
          <Route
            path="check-product"
            element={<AllProduct></AllProduct>}
          ></Route>
          <Route path="cart" element={<Orders></Orders>}></Route>
          <Route
            path="check-user"
            element={<AllCustomer></AllCustomer>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}
