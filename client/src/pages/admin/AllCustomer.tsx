import React, { useEffect, useMemo, useState } from "react";
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
  const [pageSize, setPageSize] = useState<number>(8);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState("username");
  const [sortDir, setSortDir] = useState<"asc"|"desc">("asc");
  const [formOpen, setFormOpen] = useState(false);
  const [filePreview, setFilePreview] = useState<string>("");
  const [newUser, setNewUser] = useState<any>({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
    role: false,
    status: true,
    cart: []
  });
  const dispatch = useDispatch();

  const searching = () => {
    const params:any = {
      _page: currentPage,
      _limit: pageSize,
    };
    if (inputValue.trim()) params.username_like = inputValue;
    if (sortBy) { params._sort = sortBy; params._order = sortDir; }
    axios.get(`http://localhost:8080/users`, { params }).then((response: AxiosResponse) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/users`).then((response: AxiosResponse) => {
      const totalItems = response.data.length;
      const totalPage = totalItems / pageSize;
      setTotalPage(Math.ceil(totalPage));
    });
  }, [pageSize, inputValue]);

  useEffect(() => {
    searching();
  }, [inputValue, currentPage, sortBy, sortDir]);

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
      {state.admin.Cdisplay ? <CustomerDisplay></CustomerDisplay> : ""}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <input
            value={inputValue}
            onChange={handleChange}
            type="text"
            className="border px-3 py-2 rounded"
            placeholder="Tìm kiếm theo tên"
          />
          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="border px-2 py-2 rounded">
            <option value="username">Tên</option>
            <option value="email">Email</option>
          </select>
          <select value={sortDir} onChange={(e)=>setSortDir(e.target.value as any)} className="border px-2 py-2 rounded">
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
        <button onClick={()=>setFormOpen(true)} className="px-3 py-2 bg-green-600 text-white rounded">Thêm khách hàng</button>
      </div>
      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Thêm khách hàng</h3>
              <button onClick={()=>setFormOpen(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input className="border px-2 py-2 rounded" placeholder="Họ" value={newUser.fname} onChange={(e)=>setNewUser({...newUser, fname:e.target.value})} />
              <input className="border px-2 py-2 rounded" placeholder="Tên" value={newUser.lname} onChange={(e)=>setNewUser({...newUser, lname:e.target.value})} />
              <input className="border px-2 py-2 rounded" placeholder="Username" value={newUser.username} onChange={(e)=>setNewUser({...newUser, username:e.target.value})} />
              <input className="border px-2 py-2 rounded" placeholder="Email" value={newUser.email} onChange={(e)=>setNewUser({...newUser, email:e.target.value})} />
              <input className="border px-2 py-2 rounded" placeholder="Mật khẩu" type="password" value={newUser.password} onChange={(e)=>setNewUser({...newUser, password:e.target.value})} />
              <input className="border px-2 py-2 rounded" placeholder="SĐT" value={newUser.phone} onChange={(e)=>setNewUser({...newUser, phone:e.target.value})} />
              <input className="border px-2 py-2 rounded md:col-span-2" placeholder="Địa chỉ" value={newUser.address} onChange={(e)=>setNewUser({...newUser, address:e.target.value})} />
              <div className="flex flex-col gap-2">
                {filePreview ? <img src={filePreview} alt="preview" className="w-20 h-20 object-cover rounded border" /> : null}
                <input className="border px-2 py-2 rounded" type="file" accept="image/*" onChange={(e:any)=>{
                  const f = e.target.files?.[0];
                  if (!f) return; const r = new FileReader(); r.onload=()=>{ const d=r.result as string; setNewUser({...newUser, avatar:d}); setFilePreview(d); }; r.readAsDataURL(f);
                }} />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={()=>setFormOpen(false)} className="px-4 py-2 border rounded">Hủy</button>
              <button onClick={async()=>{ await axios.post('http://localhost:8080/users', newUser); setNewUser({ fname:"", lname:"", username:"", email:"", password:"", phone:"", address:"", avatar:"", role:false, status:true, cart:[] }); setFilePreview(""); setFormOpen(false); searching(); }} className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
            </div>
          </div>
        </div>
      )}
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
