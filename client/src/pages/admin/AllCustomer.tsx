import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../interface/index";
import {} from "../../store/reducers/adminReducer";
import CustomerDisplay from "./CustomerDisplay";
import {
  allUsers,
  changeUserStatus,
  customerDisplayForm,
  display,
} from "../../services/allCustomer";
import axios, { AxiosResponse } from "axios";

export default function AllCustomer() {
  const state: any = useSelector((state) => state);
  const [inputValue, setInputValue] = useState<string>("");
  const [user, setUser] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);
  const [totalPage, setTotalPage] = useState<number>(0);
  const dispatch = useDispatch();

  const searching = () => {
    axios
      .get(
        `http://localhost:8080/users?username_like=${inputValue}&_page=${currentPage}&_limit=${pageSize}`
      )
      .then((response: AxiosResponse) => {
        setUser(response.data);
        console.log(response.data);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/users`).then((response: AxiosResponse) => {
      const totalItems = response.data.length;
      const totalPage = totalItems / pageSize;
      setTotalPage(Math.ceil(totalPage));
    });
  }, [pageSize]);

  useEffect(() => {
    searching();
  }, [inputValue, currentPage]);

  const changeStatus: any = (user: any) => {
    dispatch(changeUserStatus(user));
    searching();
    console.log(user);
  };

  const displayUser: any = (user: any) => {
    dispatch(customerDisplayForm());
    dispatch(display(user));
  };

  const setPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const setNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const renderPage = () => {
    const page: number[] = [];
    for (let i = 1; i <= totalPage; i++) {
      page.push(i);
    }
    return (
      <>
        {page.map((page: number) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`text-xs mr-4 px-3 py-2 ${
              currentPage === page ? "bg-blue-500 text-white" : "text-gray-600"
            } dark:bg-gray-700 dark:text-gray-400`}
          >
            {page}
          </button>
        ))}
      </>
    );
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      {/* <div>Tìm kiếm</div> */}
      {state.admin.Cdisplay ? <CustomerDisplay></CustomerDisplay> : ""}
      <div className="text-end">
        <input
          value={inputValue}
          onChange={handleChange}
          // onChange={(e) => setInputValue(e.target.value)}
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
            {user.length > 0 &&
              user.map((item, index) => (
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
                    {item.role ? (
                      <button className="mr-3 font-medium border-0 bg-yellow-500 text-black w-[40%] h-[30px] rounded-lg">
                        Ban
                      </button>
                    ) : (
                      ""
                    )}
                    {item.status && item.role == false ? (
                      <button
                        onClick={() => changeStatus(item)}
                        className="mr-3 font-medium border-0 bg-red-500 text-black  hover:cursor-pointer w-[40%] h-[30px] rounded-lg"
                      >
                        Ban
                      </button>
                    ) : (
                      ""
                    )}
                    {!item.status && item.role == false ? (
                      <button
                        onClick={() => changeStatus(item)}
                        className="mr-3 font-medium border-0 bg-green-500 text-black  hover:cursor-pointer w-[40%] h-[30px] rounded-lg"
                      >
                        Unban
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      onClick={() => displayUser(item)}
                      className="font-medium border-0 bg-sky-500 text-white  hover:cursor-pointer w-[40%] h-[30px] rounded-lg"
                    >
                      Obverse
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-full text-end mt-7">
        <button onClick={setPrevPage} className="mr-4">
          Prev
        </button>
        {renderPage()}
        <button className="" onClick={setNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
