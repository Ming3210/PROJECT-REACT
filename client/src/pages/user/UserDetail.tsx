import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllUsers, setCurrentUser } from "../../store/reducers/homeReducer";

export default function UserDetail() {
  const dispatch = useDispatch();
  const state: any = useSelector((s) => s);
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    dispatch(setCurrentUser());
    dispatch(getAllUsers());
  }, []);

  const user = useMemo(() => state.home.users.find((u:any) => u.id === state.home.loginUser?.id), [state.home.users, state.home.loginUser]);

  useEffect(() => {
    if (user?.id) {
      axios.get(`http://localhost:8080/addresses?userId=${user.id}`).then(r => setAddresses(r.data));
    }
  }, [user?.id]);

  if (!user) return <div className="container p-6">Vui lòng đăng nhập để xem thông tin.</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="bg-white p-4 border rounded">
        <h2 className="text-xl font-semibold mb-3">Thông tin tài khoản</h2>
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt={user.username} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <p className="font-medium">{user.fname} {user.lname}</p>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <p className="text-gray-600 text-sm">SĐT: {user.phone}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 border rounded">
        <h3 className="text-lg font-semibold mb-3">Địa chỉ nhận hàng</h3>
        <div className="space-y-3">
          {addresses.map((a:any) => (
            <div key={a.id} className="p-3 border rounded flex items-center justify-between">
              <div>
                <p className="font-medium">{a.fullName} | {a.phone}</p>
                <p className="text-gray-600">{a.street}, {a.ward}, {a.district}, {a.province}</p>
                {a.isDefault ? <span className="text-green-600 text-sm">Mặc định</span> : null}
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded">Sửa</button>
            </div>
          ))}
          {addresses.length === 0 ? <p className="text-gray-600">Chưa có địa chỉ.</p> : null}
        </div>
        <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded">Thêm địa chỉ</button>
      </div>
    </div>
  );
}


