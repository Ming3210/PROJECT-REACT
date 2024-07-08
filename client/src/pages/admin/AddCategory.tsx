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
  const [name, setName] = useState<string>("");
  const uploadImage = () => {
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url: any) => {
        console.log(url);
        const category = {
          name: name,
          image: url,
        };
        console.log(category);

        axios.post("http://localhost:8080/category", category);
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
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <label htmlFor="">Category name</label>
      <br />
      <input type="text" value={name} onChange={handleChangeName} />
      <br />
      <label htmlFor="">Image</label>
      <br />
      {selectedFile ? <img className="max-w-[300px]" src={preview} /> : ""}
      <input type="file" onChange={handleChange} />
      <br />
      <button onClick={uploadImage}>Add category</button>
    </div>
  );
}
