import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import axios from "axios";

export default function AddCategory() {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [preview, setPreview] = useState<any>();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl: any = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const [image, setImage] = useState<any>("");
  const [cate, setCate] = useState<any>({
    name: "",
    status: true,
    description: "",
    product: [],
  });
  const uploadImage = (e: any) => {
    e.preventDefault();
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url: any) => {
        console.log(url);
        const category = {
          name: cate.name,
          description: cate.description,
          status: cate.status,
          product: cate.product,
          image: url,
        };
        console.log(category);

        axios.post("http://localhost:8080/categories", category);
      });
    });
    setCate({
      name: "",
      status: true,
      description: "",
      product: [],
    });
    setSelectedFile(false);
  };
  const handleChange = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    let valueImage: any = e.target.files?.[0];
    console.log(111, valueImage);
    setImage(valueImage);
  };
  const handleChanges = (e: any) => {
    setCate({ ...cate, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form
        action=""
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
      >
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

        <div className="flex justify-center">
          <button
            type="button"
            onClick={uploadImage}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add category
          </button>
        </div>
      </form>
    </div>
  );
}
