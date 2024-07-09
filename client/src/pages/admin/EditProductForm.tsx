import React from "react";
import { useDispatch } from "react-redux";
import { closeEditFormP } from "../../store/reducers/adminReducer";

export default function EditProductForm() {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(closeEditFormP());
    // Close form
  };
  const handleSave = () => {
    // Save changes to the product
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 flex justify-center items-center rounded shadow-lg w-1/4">
        <div>
          <h2 className="text-xl font-bold mb-4">Edit Item</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="mt-1 p-2  border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input type="number" className="mt-1 p-2  border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input type="number" className="mt-1 p-2  border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <select className="w-[100%]" name="" id="">
              <option value=""> -- Select your category --</option>
              <option value="">Bedroom</option>
              <option value="">Office</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400 focus:outline-none mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 focus:outline-none"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
