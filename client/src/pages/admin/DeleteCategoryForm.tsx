import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../store/reducers/adminReducer";
import {
  deleteCategory,
  delFormClose,
} from "../../services/deleteCategoryForm";

export default function DeleteCategoryForm() {
  const state: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const closeForm = () => {
    dispatch(delFormClose());
  };
  const confirmDelete = () => {
    dispatch(deleteCategory(state.admin.deletedCategory.id));
    dispatch(delFormClose());
  };

  return (
    <div>
      {" "}
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-4">Are you sure you want to delete this category?</p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
