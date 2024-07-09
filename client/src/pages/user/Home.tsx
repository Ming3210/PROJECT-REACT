import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Login from "./Login";
import { CiSearch } from "react-icons/ci";
import { GiScrollUnfurled } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { openForm, openRegisterForm } from "../../store/reducers/homeReducer";
import Register from "./Register";
import { MdAlignHorizontalLeft } from "react-icons/md";

export default function Home() {
  const navigate = useNavigate();

  const state: any = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(state.home);

  const openLoginForm: any = () => {
    dispatch(openForm());
  };
  const openSignUpForm: any = () => {
    dispatch(openRegisterForm());
  };
  return (
    <div>
      {state.home.formRegister ? <Register></Register> : ""}
      {state.home.formLogin ? <Login></Login> : ""}
      <div>
        <header className="place-content-center p-4 py-4 shadow-sm bg-white">
          <div className="flex items-center justify-evenly">
            <Link className="no-underline" to="/">
              <GiScrollUnfurled size={40} />{" "}
              <span className="text-[40px] text-sky-400">Furni</span>
              <span className="text-[30px] text-purple-500">craft</span>
            </Link>
            <div className="w-full max-w-xl flex static">
              <span className="relative left-7 text-[50px] top-[10px] text-lg text-gray-400">
                <CiSearch />
              </span>
              <input
                type="text"
                className="w-full border border-gray-300 border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
                placeholder="Search"
              />
              <button className="border bg-red-500 border-gray-300 text-white px-8 rounded-r-md hover:bg-transparent hover:text-gray-700 transition">
                Search
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/wishlist"
                className="text-center text-gray-700 hover:text-red-500 transition relative"
              >
                <div className="text-2xl">
                  <span>♥</span>
                </div>
                <div className="text-xs leading-3">Wish list</div>
                <span className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white text-xs">
                  8
                </span>
              </a>
            </div>
          </div>
        </header>
        <nav className="bg-gray-800">
          <div className="flex">
            <div className="flex items-center justify-evenly flex-grow pl-12">
              <div className="px-8 py-4 bg-red-400 flex items-center cursor-pointer">
                <span className="text-white">
                  <MdAlignHorizontalLeft />
                </span>
                <span className="capitalize ml-2 text-white">
                  All categories
                </span>
              </div>
              <div className="flex items-center space-x-6 capitalize">
                <NavLink
                  to=""
                  className="text-gray-200 no-underline hover:text-white transition"
                >
                  Home
                </NavLink>
                <NavLink
                  to=""
                  className="text-gray-200 no-underline hover:text-white transition"
                >
                  Shop
                </NavLink>
                <NavLink
                  to=""
                  className="text-gray-200 no-underline hover:text-white transition"
                >
                  About us
                </NavLink>
                <NavLink
                  to=""
                  className="text-gray-200 no-underline hover:text-white transition"
                >
                  Contact us
                </NavLink>
              </div>
              <div>
                <NavLink
                  onClick={openLoginForm}
                  to=""
                  className="text-gray-200 no-underline hover:text-white transition"
                >
                  Login
                </NavLink>
                <span className="text-white">/</span>
                <NavLink
                  to=""
                  onClick={openSignUpForm}
                  className="text-gray-200 no-underline hover:text-white transition"
                >
                  Register
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
        {/* <nav className="bg-gray-100 p-4 shadow-md">
          <div className="flex justify-center space-x-4">
            <NavLink
              to="/"
              className="text-gray-700 hover:text-red-500 transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="text-gray-700 hover:text-red-500 transition"
            >
              Products
            </NavLink>
            <NavLink
              to="/categories"
              className="text-gray-700 hover:text-red-500 transition"
            >
              Categories
            </NavLink>

            <button
              onClick={openLoginForm}
              className="text-gray-700 hover:text-red-500 transition"
            >
              Login
            </button>
            <button
              onClick={openSignUpForm}
              className="text-gray-700 hover:text-red-500 transition"
            >
              Register
            </button>
          </div>
        </nav> */}
        <Outlet />
        {/* <nav>
        <div className="flex">
          <div>Icon</div>
          <div>
            <NavLink to="">Home</NavLink>
            <NavLink to="">Product</NavLink>
            <NavLink to="">Category</NavLink>
            <NavLink to="/admin">Admin</NavLink>
            <br />
            <button>Login</button>
          </div>
        </div>
      </nav> */}
      </div>
    </div>
  );
}
