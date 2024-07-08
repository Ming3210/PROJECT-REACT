import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../interface/index";
import {
  allUsers,
  changeUserStatus,
  customerDisplayForm,
  display,
} from "../store/reducers/adminReducer";
import CustomerDisplay from "./CustomerDisplay";

export default function AllCustomer() {
  const state: any = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUsers());
  }, []);
  // console.log(state);

  const changeStatus: any = (user: any) => {
    dispatch(changeUserStatus(user));
    console.log(user);
  };

  const displayUser: any = (user: any) => {
    dispatch(customerDisplayForm());
    dispatch(display(user));
  };

  return (
    <div>
      {/* <div>Tìm kiếm</div> */}
      {state.admin.Cdisplay ? <CustomerDisplay></CustomerDisplay> : ""}
      <div className="text-end">
        <input
          type="text"
          className="h-[25px] rounded-md placeholder:pl-2"
          placeholder="Tìm kiếm theo tên"
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Password
              </th> */}
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {state.admin.users.map((item: User, index: number) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.username}
                  </th>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4">{item.phone}</td>
                  {/* <td className="px-6 py-4">{item.password}</td> */}
                  <td className="px-6 py-4">
                    {item.password ? "Đang hoạt động" : "Ko hoạt động"}
                  </td>
                  <td className="px-6 py-4">
                    {/* <button className="mr-6 font-medium border-0 bg-dark text-red-500  hover:cursor-pointer w-[20%] h-[30px] rounded-lg">
                      Delete
                    </button> */}
                    {item.status ? (
                      <button
                        onClick={() => changeStatus(item)}
                        className="mr-3 font-medium border-0 bg-red-500 text-black  hover:cursor-pointer w-[40%] h-[30px] rounded-lg"
                      >
                        Ban
                      </button>
                    ) : (
                      <button
                        onClick={() => changeStatus(item)}
                        className="mr-3 font-medium border-0 bg-green-500 text-black  hover:cursor-pointer w-[40%] h-[30px] rounded-lg"
                      >
                        Unban
                      </button>
                    )}
                    <button
                      onClick={() => displayUser(item)}
                      className="font-medium border-0 bg-sky-500 text-white  hover:cursor-pointer w-[40%] h-[30px] rounded-lg"
                    >
                      Obverse
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
