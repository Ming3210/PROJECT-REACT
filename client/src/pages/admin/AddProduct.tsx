import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import axios from "axios";

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

  const [image, setImage] = useState<any>("");
  const [name, setName] = useState<string>("");
  const uploadImage = () => {
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url: any) => {
        console.log(url);
        const product = {
          name: name,
          image: url,
        };
        axios.post("http://localhost:8080/product", product);
      });
    });
    setName("");
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
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <label htmlFor="">Product name</label>
      <br />
      <input type="text" value={name} onChange={handleChanges} />
      <br />
      <select name="" id="">
        <option value="1">Bedroom</option>
        <option value="1">Office</option>
      </select>
      <br />
      <label htmlFor="">Description</label>
      <br />
      <textarea
        name=""
        id=""
        className="w-[300px] h-[100px] resize-y"
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
