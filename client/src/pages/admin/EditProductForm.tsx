import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import {} from "../../store/reducers/adminReducer";
import { closeEditFormP, editProduct } from "../../services/editProductForm";

export default function EditProductForm() {
  const date = new Date().toISOString().split("T")[0];
  const [image, setImage] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);

  const state: any = useSelector((state) => state);
  const [inputValue, setInputValue] = useState<any>({
    name: state.admin.editedProduct.name,
    image: state.admin.editedProduct.image,
    price: state.admin.editedProduct.price,
    quantity: state.admin.editedProduct.quantity,
    description: state.admin.editedProduct.description,
    category: state.admin.editedProduct.category,
    created_at: state.admin.editedProduct.created_at,
    updated_at: date,
  });
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(closeEditFormP());
    // Close form
  };
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const handleSave = () => {
    dispatch(closeEditFormP());
    // Save changes to the product

    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const product = {
            id: state.admin.editedProduct.id,
            name: inputValue.name,
            image: url || inputValue.image,
            price: Number(inputValue.price),
            quantity: Number(inputValue.quantity),
            description: inputValue.description,
            category: Number(inputValue.category),
            created_at: inputValue.created_at,
            updated_at: date,
          };
          dispatch(editProduct(product));
        });
      });
    } else {
      const product = {
        id: state.admin.editedProduct.id,
        name: inputValue.name,
        image: inputValue.image,
        price: Number(inputValue.price),
        quantity: Number(inputValue.quantity),
        description: inputValue.description,
        category: Number(inputValue.category),
        created_at: inputValue.created_at,
        updated_at: date,
      };
      dispatch(editProduct(product));
      dispatch(closeEditFormP());
    }
    setSelectedFile(null);
  };
  const imageChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    const file = e.target.files[0];
    setSelectedFile(file);
    setImage(file);
  };

  const handleChange = (e: any) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 flex justify-center items-center rounded shadow-lg w-1/4">
        <div>
          <h2 className="text-xl font-bold mb-4">Edit Item</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              onChange={handleChange}
              name="name"
              value={inputValue.name}
              type="text"
              className="mt-1 p-2  border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              onChange={handleChange}
              name="price"
              value={inputValue.price}
              type="number"
              className="mt-1 p-2  border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              onChange={handleChange}
              name="quantity"
              value={inputValue.quantity}
              type="number"
              className="mt-1 p-2  border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            {selectedFile && (
              <img className="max-w-full mb-4" src={preview} alt="Preview" />
            )}
            <input
              onChange={imageChange}
              name="image"
              type="file"
              className="mt-1 p-2  border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              value={inputValue.category}
              onChange={handleChange}
              name="category"
            >
              <option value="">-- Select your category --</option>
              {state.admin.categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
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
