import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCategory, editFormClose } from "../../store/reducers/adminReducer";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import axios from "axios";

export default function EditCategoryForm() {
  const state: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [cate, setCate] = useState({
    name: "",
    status: true,
    description: "",
    product: [],
  });

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const closeForm = () => {
    dispatch(editFormClose());
  };

  const handleChanges = (e: any) => {
    setCate({ ...cate, [e.target.name]: e.target.value });
  };

  const handleChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    const file = e.target.files[0];
    setSelectedFile(file);
    setImage(file);
  };

  const uploadImage = (e: any) => {
    e.preventDefault();

    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const category = {
            id: state.admin.editedCategory.id,
            name: cate.name,
            description: cate.description,
            status: cate.status,
            product: cate.product,
            image: url || state.admin.editedCategory.image,
          };
          dispatch(editCategory(category));
        });
      });
    } else {
      const category = {
        id: state.admin.editedCategory.id,
        name: cate.name,
        description: cate.description,
        status: cate.status,
        product: cate.product,
        image: state.admin.editedCategory.image,
      };
      dispatch(editCategory(category));
    }

    setCate({
      name: "",
      status: true,
      description: "",
      product: [],
    });
    setSelectedFile(null);
    closeForm();
  };

  return (
    <div className="bg-slate-600 fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-gray-700 font-bold mb-2"
          >
            Category name
          </label>
          <input
            id="categoryName"
            type="text"
            name="name"
            value={cate.name}
            onChange={handleChanges}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            onChange={handleChanges}
            value={cate.description}
            name="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image
          </label>
          {selectedFile && (
            <img className="max-w-full mb-4" src={preview} alt="Preview" />
          )}
          <input
            id="image"
            type="file"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={uploadImage}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={closeForm}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
