import React, { useEffect, useState } from "react";
import User from "../interface";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEmail,
  closeRegisterForm,
  getUser,
} from "../store/reducers/homeReducer";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<any>({
    email: "",
    password: "",
    status: false,
    cart: [],
    fname: "",
    lname: "",
  });

  const [error, setError] = useState<any>({
    email: false,
    fname: false,
    lname: false,
    password: false,
  });

  const state: any = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const validate = () => {
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = { ...error };

    if (!inputValue.email || !emailValidate.test(inputValue.email)) {
      errors = { ...errors, email: true };
    } else {
      errors = { ...errors, email: false };
    }

    if (!inputValue.fname) {
      errors = { ...errors, fname: true };
    } else {
      errors = { ...errors, fname: false };
    }

    if (!inputValue.lname) {
      errors = { ...errors, lname: true };
    } else {
      errors = { ...errors, lname: false };
    }

    if (!inputValue.password || inputValue.password.length < 6) {
      errors = { ...errors, password: true };
    } else {
      errors = { ...errors, password: false };
    }

    setError(errors);
    return !errors.email && !errors.fname && !errors.lname && !errors.password;
  };

  const register = async () => {
    const isFormValid = validate();

    if (!isFormValid) {
      console.log("Form validation failed:", error);
      return;
    }

    const resultAction = await dispatch(checkEmail(inputValue));
    if (resultAction.payload.length > 0) {
      setEmailErr(true);
      return;
    }

    dispatch(getUser(inputValue));
    navigate("/login");
  };
  const closeForm = () => {
    dispatch(closeRegisterForm());
  };

  return (
    <div>
      <>
        <div
          //   onClick={closeForm}
          className="w-[100%] fixed min-h-screen bg-opacity-50 bg-slate-400 flex items-center justify-center px-5 py-5"
        >
          <div
            className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
            style={{ maxWidth: 1000 }}
          >
            <div className="md:flex w-full">
              <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
                <svg
                  id="a87032b8-5b37-4b7e-a4d9-4dbfbe394641"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  //   height="auto"
                  viewBox="0 0 744.84799 747.07702"
                ></svg>
              </div>

              <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                </div>
                <div>
                  <div className="flex -mx-3">
                    <div className="w-1/2 px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        First name
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <span className="material-symbols-outlined">
                            person
                          </span>
                        </div>
                        <input
                          onChange={handleChanges}
                          type="text"
                          name="fname"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Your First Name"
                        />
                      </div>
                      {error.fname ? (
                        <p className="text-red-500 flex items-center">
                          <span className="material-symbols-outlined">
                            warning
                          </span>{" "}
                          &nbsp;&nbsp; Enter your first name
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="w-1/2 px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Last name
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <span className="material-symbols-outlined">
                            person
                          </span>
                        </div>
                        <input
                          onChange={handleChanges}
                          name="lname"
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Your last name"
                        />
                      </div>
                      {error.lname ? (
                        <p className="text-red-500 flex items-center">
                          <span className="material-symbols-outlined">
                            warning
                          </span>{" "}
                          &nbsp;&nbsp; Enter your last name
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Email
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <span className="material-symbols-outlined">
                            mail
                          </span>
                        </div>
                        <input
                          onChange={handleChanges}
                          name="email"
                          type="email"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="sample@example.com"
                        />
                      </div>
                      {error.email ? (
                        <p className="text-red-500 flex items-center">
                          <span className="material-symbols-outlined">
                            warning
                          </span>{" "}
                          &nbsp;&nbsp; Hmm.. It's doesn't look like an email
                          address
                        </p>
                      ) : (
                        ""
                      )}
                      {emailErr ? (
                        <p className="text-red-500 flex items-center">
                          <span className="material-symbols-outlined">
                            warning
                          </span>{" "}
                          &nbsp;&nbsp; This email have been signed
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-12">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Password
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <span className="material-symbols-outlined">
                            lock
                          </span>
                        </div>
                        <input
                          type="text"
                          onChange={handleChanges}
                          name="password"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="************"
                        />
                      </div>
                      {error.password ? (
                        <p className="text-red-500 flex items-center">
                          <span className="material-symbols-outlined">
                            warning
                          </span>{" "}
                          &nbsp;&nbsp; Your password too short. You need to 6+
                          characters
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <button
                        className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                        onClick={register}
                      >
                        REGISTER NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                onClick={closeForm}
                className="text-end text-[50px] hover:cursor-pointer"
              >
                X
              </div>
            </div>
          </div>
        </div>
        {/* BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES */}
        <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
          <div>
            <a
              title="Buy me a beer"
              href="https://www.facebook.com/profile.php?id=100044709335875"
              target="_blank"
              className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
            >
              <img
                className="object-cover object-center w-full h-full rounded-full"
                src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
              />
            </a>
          </div>
        </div>
      </>
    </div>
  );
}
