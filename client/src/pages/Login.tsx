import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeForm } from "../store/reducers/homeReducer";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [inputValue, setInputValue] = useState<any>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const state: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const closeLoginForm = () => {
    dispatch(closeForm());
  };
  const login = (e: any) => {
    e.preventDefault();
    // Handle login logic here

    // console.log("Login clicked");
    console.log(inputValue);

    console.log(state.home.adminUser, 123123213);
    if (
      inputValue.name == state.home.adminUser.name &&
      inputValue.password == state.home.adminUser.password
    ) {
      navigate("/admin");
    }

    dispatch(closeForm());
  };
  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  return (
    <div>
      <div
        // onClick={closeLoginForm}
        className="w-[100%] h-[100vh] flex justify-center items-center bg-slate-600 flex-col z-1000 bg-opacity-50 fixed"
      >
        <form
          action=""
          className="bg-white w-[400px] h-[300px]  flex justify-center items-center flex-col rounded-md"
        >
          <label htmlFor="">Email</label>
          <input
            name="email"
            value={inputValue.email}
            onChange={handleChanges}
            type="text"
          />
          <br />

          <label htmlFor="">Password</label>
          <input
            name="password"
            value={inputValue.password}
            onChange={handleChanges}
            type="text"
          />
          <button onClick={closeLoginForm}>Cancel</button>
          <button onClick={login}>Confirm</button>
        </form>
      </div>
    </div>
  );
}
