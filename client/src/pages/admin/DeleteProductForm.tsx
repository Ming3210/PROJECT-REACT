import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDeleteFormP,
  deleteProduct,
} from "../../store/reducers/adminReducer";

export default function DeleteProductForm() {
  const state: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(closeDeleteFormP());
    // Close the form when the cancel button is clicked
  };
  const onConfirm = () => {
    dispatch(deleteProduct(state.admin.deletedProduct.id));
    dispatch(closeDeleteFormP());
    // Delete the product when the delete button is clicked
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400 focus:outline-none mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 focus:outline-none"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
