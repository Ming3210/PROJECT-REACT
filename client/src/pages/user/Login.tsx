import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeForm,
  getAllUsers,
  setCurrentUser,
} from "../../store/reducers/homeReducer";
import { useNavigate } from "react-router-dom";
import { CiWarning } from "react-icons/ci";

const Login: React.FC = () => {
  const [inputValue, setInputValue] = useState<any>({
    email: "",
    password: "",
  });
  const [loginUser, setLoginUser] = useState<any | null>(null);
  const [loginStatus, setLoginStatus] = useState<boolean>(() => {
    const storedLoginStatus = localStorage.getItem("loginStatus");
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });
  const [error, setError] = useState<any>({ email: false, password: false });

  const navigate = useNavigate();
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const closeLoginForm = () => {
    dispatch(closeForm());
  };

  const validate = (): boolean => {
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors: any = { email: false, password: false };

    if (!inputValue.email || !emailValidate.test(inputValue.email)) {
      errors.email = true;
    }

    if (!inputValue.password) {
      errors.password = true;
    }

    setError(errors);

    const isValid = !errors.email && !errors.password;
    if (isValid) {
      const user = state.home.users.find(
        (user: any) =>
          user.email === inputValue.email &&
          user.password === inputValue.password
      );

      if (user) {
        let customer = state.home.users.find(
          (user: any) => user.email === inputValue.email
        );
        console.log(customer);

        setLoginUser(user);
        setLoginStatus(true);
        localStorage.setItem("loginStatus", JSON.stringify(true));
        dispatch(setCurrentUser(customer));
        dispatch(closeForm());
      } else {
        setError({ email: true, password: true });
      }
    }

    return isValid;
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      inputValue.email === state.home.adminUser.email &&
      inputValue.password === state.home.adminUser.password
    ) {
      navigate("/admin");
      dispatch(closeForm());
    } else {
      validate();
    }
  };
  console.log(state);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <div>
      <div className="w-full h-full flex justify-center items-center bg-slate-600 flex-col z-1000 bg-opacity-50 fixed">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              value={inputValue.email}
              onChange={handleChanges}
              type="email"
              placeholder="example@example.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {error.email && (
              <p className="text-red-500 flex items-center">
                <CiWarning />
                &nbsp;Invalid email or password
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              value={inputValue.password}
              onChange={handleChanges}
              type="password"
              placeholder="********"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {error.password && (
              <p className="text-red-500 flex items-center">
                <CiWarning />
                &nbsp;Invalid email or password
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={closeLoginForm}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={login}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
