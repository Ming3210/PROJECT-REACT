import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import axios from "axios";
import { Product } from "../../interface";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/reducers/adminReducer";

export default function AddProduct() {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [preview, setPreview] = useState<any>();

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
  let date = new Date().toISOString().split("T")[0];
  console.log(date);

  const [image, setImage] = useState<any>("");
  const [inputValue, setInputValue] = useState<any>({
    name: "",
    image: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    created_at: date,
    updated_at: "",
  });
  const dispatch = useDispatch();
  const uploadImage = () => {
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url: any) => {
        console.log(url);
        const product = {
          name: inputValue.name,
          price: Number(inputValue.price),
          quantity: Number(inputValue.quantity),
          description: inputValue.description,
          category: Number(inputValue.category),
          created_at: inputValue.created_at,
          updated_at: date,
          image: url,
        };
        console.log(product);
        dispatch(addProduct(product));
      });
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
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  console.log(inputValue);

  return (
    <div>
      <label htmlFor="">Product name</label>
      <br />
      <input
        value={inputValue.name}
        name="name"
        type="text"
        onChange={handleChanges}
      />
      <br />
      <label htmlFor="">Price</label>
      <br />
      <input
        value={inputValue.price}
        name="price"
        type="text"
        onChange={handleChanges}
      />
      <br />
      <label htmlFor="">Quantity</label>
      <br />
      <input
        value={inputValue.quantity}
        name="quantity"
        type="text"
        onChange={handleChanges}
      />

      <br />
      <select
        value={inputValue.category}
        onChange={handleChanges}
        name="category"
        id=""
      >
        <option value="1">-- Select your category --</option>
        <option value="1">Bedroom</option>
        <option value="2">Office</option>
      </select>
      <br />
      <label htmlFor="">Description</label>
      <br />
      <textarea
        onChange={handleChanges}
        value={inputValue.description}
        name="description"
        id=""
        className="w-[300px] h-[100px] resize-none"
      ></textarea>
      <br />
      <label htmlFor="">Image</label>
      <br />
      {selectedFile ? <img className="max-w-[300px]" src={preview} /> : ""}
      <input type="file" onChange={handleChange} />
      <br />
      <button onClick={uploadImage}>Add product</button>
    </div>
  );
}
