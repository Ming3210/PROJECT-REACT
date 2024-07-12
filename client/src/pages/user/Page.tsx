import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Login from "./Login";
import { CiSearch } from "react-icons/ci";
import { GiScrollUnfurled } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { openForm, openRegisterForm } from "../../store/reducers/homeReducer";
import Register from "./Register";
import { MdAlignHorizontalLeft } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import {} from "../../store/reducers/adminReducer";
import { getAllCategories } from "../../services/allCategory";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { FaUserGraduate } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";

export default function Page() {
  const navigate = useNavigate();

  const item = localStorage.getItem("loginStatus");
  const loginStatus: boolean | null = item ? JSON.parse(item) : null;

  const state: any = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const openLoginForm: any = () => {
    dispatch(openForm());
  };
  const openSignUpForm: any = () => {
    dispatch(openRegisterForm());
  };

  const logout = () => {
    localStorage.removeItem("loginStatus");
    // dispatch({ type: "LOGIN_STATUS", payload: false });
    navigate("/");
  };
  console.log(state);

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
            {loginStatus ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/wishlist"
                  className="text-center text-gray-700 hover:text-red-500 transition no-underline relative"
                >
                  <div className="text-2xl">
                    <span>
                      <HiMiniShoppingBag />
                    </span>
                  </div>
                  <div className="text-xs leading-3 ">Wish list</div>
                  <span className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-red-500 text-white text-xs">
                    8
                  </span>
                </Link>
                <Link
                  to="/user-detail"
                  className="text-center text-gray-700 hover:text-red-500 transition no-underline relative"
                >
                  <div className="text-2xl">
                    <span>
                      <FaUserGraduate />
                    </span>
                  </div>
                  <div className="text-xs leading-3 ">Account</div>
                </Link>
              </div>
            ) : (
              <div
                onClick={openLoginForm}
                className="text-center text-gray-700 hover:text-red-500 transition no-underline relative"
              >
                <div className="text-2xl">
                  <span>
                    <BsCart4 />
                  </span>
                </div>
                <div className="text-xs leading-3 ">Shop now</div>
              </div>
            )}
          </div>
        </header>
        <nav className="bg-gray-800">
          <div className="flex">
            <div className="flex container items-center justify-between flex-grow pl-12">
              <div className="px-8 py-4 bg-red-400  cursor-pointer relative group">
                <span className="text-white">
                  <MdAlignHorizontalLeft />
                </span>
                <span className="capitalize ml-2 text-white">
                  All categories
                </span>
                <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-x divide-gray-300 divide-dashed  opacity-0 group-hover:opacity-100 duration-300 invisible group-hover:visible">
                  <Link
                    to=""
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition no-underline"
                  >
                    <IoBed className="w-5 h-5 object-contain" />
                    <span className="ml-6 text-gray-600 text-sm">Bed</span>
                  </Link>
                  <Link
                    to=""
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition no-underline"
                  >
                    <IoBed className="w-5 h-5 object-contain" />
                    <span className="ml-6 text-gray-600 text-sm">Bed</span>
                  </Link>
                  <Link
                    to=""
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition no-underline"
                  >
                    <IoBed className="w-5 h-5 object-contain" />
                    <span className="ml-6 text-gray-600 text-sm">Bed</span>
                  </Link>
                  <Link
                    to=""
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition no-underline"
                  >
                    <IoBed className="w-5 h-5 object-contain" />
                    <span className="ml-6 text-gray-600 text-sm">Bed</span>
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-6 capitalize">
                <NavLink
                  to=""
                  className="text-gray-200 no-underline hover:text-white transition"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/category"
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
              {loginStatus ? (
                <div>
                  <NavLink
                    to=""
                    onClick={logout}
                    className="text-gray-200 no-underline hover:text-white transition"
                  >
                    Logout
                  </NavLink>
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </nav>

        {/* baner */}

        {/* categoty */}
      </div>
      <Outlet />
    </div>
  );
}
