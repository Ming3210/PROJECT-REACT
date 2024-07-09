import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerDisplayFormOff } from "../../store/reducers/adminReducer";

export default function CustomerDisplay() {
  const state: any = useSelector((state) => state);
  console.log(state);

  const dispatch = useDispatch();
  const close = () => {
    dispatch(customerDisplayFormOff());
  };

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-20 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="mb-2">
          <strong>Full Name:</strong> {state.admin.user.fname}{" "}
          {state.admin.user.lname}
        </div>
        <div className="mb-2">
          <strong>Username:</strong> {state.admin.user.username}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {state.admin.user.email}
        </div>
        <div className="mb-2">
          <strong>Phone Number:</strong> {state.admin.user.phone}
        </div>
        <div className="mb-2">
          <strong>Address:</strong> {state.admin.user.address}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          {state.admin.user.status ? "Đang hoạt động" : "Không hoạt động"}
        </div>
      </div>
    </div>
  );
}
