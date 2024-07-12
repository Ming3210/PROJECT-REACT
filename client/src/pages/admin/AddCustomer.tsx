import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../store/reducers/adminReducer";
import { checkEmailAdmin } from "../../services/admin";
import { getUserAdmin } from "../../services/addCustomer";

export default function AddCustomer() {
  const date1 = new Date().toISOString().split("T")[0];
  const [emailErr, setEmailErr] = useState<boolean>(false);

  const [error, setError] = useState<any>({
    fname: false,
    lname: false,
    username: false,
    email: false,
    phone: false,
    password: false,
    address: false,
  });
  const [user, setUser] = useState<any>({
    fname: "",
    lname: "",
    username: "",
    role: false,
    email: "",
    password: "",
    phone: 0,
    address: "",
    created_at: date1,
    updated_at: date1,
    status: false,
    cart: [],
    avatar:
      "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
  });

  const handleChanges = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      [name]: name === "role" ? value === "true" : value,
    }));
  };

  const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const state: any = useSelector((state) => state);

  const validateForm = () => {
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = { ...error };

    if (!user.email || !emailValidate.test(user.email)) {
      errors = { ...errors, email: true };
    } else {
      errors = { ...errors, email: false };
    }

    if (!user.fname) {
      errors = { ...errors, fname: true };
    } else {
      errors = { ...errors, fname: false };
    }
    if (user.phone == 0 || user.phone.length != 10) {
      errors = { ...errors, phone: true };
    } else {
      errors = { ...errors, phone: false };
    }

    if (!user.lname) {
      errors = { ...errors, lname: true };
    } else {
      errors = { ...errors, lname: false };
    }

    if (!user.password || user.password.length < 6) {
      errors = { ...errors, password: true };
    } else {
      errors = { ...errors, password: false };
    }

    setError(errors);
    return !errors.email && !errors.fname && !errors.lname && !errors.password;
  };
  console.log(state.admin);
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      const isFormValid = validateForm();

      if (!isFormValid) {
        console.log("Form validation failed:", error);
        return;
      }

      const resultAction = await dispatch(checkEmailAdmin(user));
      if (resultAction.payload.length > 0) {
        setEmailErr(true);
        return;
      }

      dispatch(getUserAdmin(user));
    } else {
      console.log("Form is invalid.");
    }
  };

  return (
    <>
      <div className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Account settings
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200">
                First Name
              </label>
              <input
                onChange={handleChanges}
                name="fname"
                value={user.fname}
                type="text"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${
                  error.fname ? "border-red-500" : "border-gray-300"
                } rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring`}
              />
              {error.fname && (
                <span className="text-red-500">First name is required.</span>
              )}
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Last Name</label>
              <input
                value={user.lname}
                name="lname"
                onChange={handleChanges}
                type="text"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${
                  error.lname ? "border-red-500" : "border-gray-300"
                } rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring`}
              />
              {error.lname && (
                <span className="text-red-500">Last name is required.</span>
              )}
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Role</label>
              <select
                name="role"
                value={user.role.toString()}
                onChange={handleChanges}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value="false">User</option>
                <option value="true">Admin</option>
              </select>
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Username</label>
              <input
                onChange={handleChanges}
                value={user.username}
                name="username"
                type="text"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${
                  error.username ? "border-red-500" : "border-gray-300"
                } rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring`}
              />
              {error.username && (
                <span className="text-red-500">Username is required.</span>
              )}
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Phone number
              </label>
              <input
                onChange={handleChanges}
                value={user.phone}
                name="phone"
                type="text"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${
                  error.username ? "border-red-500" : "border-gray-300"
                } rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring`}
              />
              {error.phone && (
                <span className="text-red-500">Invalid phone number</span>
              )}
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Email Address
              </label>
              <input
                onChange={handleChanges}
                value={user.email}
                name="email"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${
                  error.email ? "border-red-500" : "border-gray-300"
                } rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring`}
              />
              {error.email ? (
                <p className="text-red-500 flex items-center">
                  Hmm.. It's doesn't look like an email address
                </p>
              ) : (
                ""
              )}
              {emailErr && (
                <p className="text-red-500 flex items-center">
                  Email already exists in the system
                </p>
              )}
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Password</label>
              <input
                value={user.password}
                name="password"
                onChange={handleChanges}
                type="password"
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border ${
                  error.password ? "border-red-500" : "border-gray-300"
                } rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring`}
              />
              {error.password ? (
                <p className="text-red-500 flex items-center">
                  Your password too short. You need to 6+ characters
                </p>
              ) : (
                ""
              )}
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Address</label>
              <textarea
                onChange={handleChanges}
                name="address"
                className={`block w-full h-[100px] resize-none px-4 py-2 mt-2 text-gray-700 bg-white border ${
                  error.address ? "border-red-500" : "border-gray-300"
                } rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring`}
                defaultValue={""}
              />
              {error.address && (
                <span className="text-red-500">Address is required.</span>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
