import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../store/reducers/adminReducer";
import DeleteProductForm from "./DeleteProductForm";
import EditProductForm from "./EditProductForm";
import {
  getAllProducts,
  getDeletedProduct,
  getEditedProduct,
  openEditFormP,
} from "../../services/allProduct";
import { getAllCategories } from "../../services/allCategory";
import { openDeleteFormP } from "../../services/addProduct";
import axios from "axios";

export default function AllProduct() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState<"asc"|"desc">("asc");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [formOpen, setFormOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<any>({ name:"", price:0, quantity:0, description:"", category:"", image:"", created_at:"", updated_at:"" });
  const [filePreview, setFilePreview] = useState<string>("");
  const state: any = useSelector((state) => state);
  console.log(state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, []);

  // let cateList = state.admin.categories.map((category: any) => {
  //   return category.name;
  // });
  // console.log(cateList);

  const openDeleteForm = (id: any) => {
    let index = state.admin.products.find((product: any) => product.id === id);
    dispatch(getDeletedProduct(index));
    dispatch(openDeleteFormP());
  };
  const openEditForm = (id: number) => {
    let index = state.admin.products.find((product: any) => product.id === id);
    dispatch(getEditedProduct(index));
    dispatch(openEditFormP());
  };

  const filteredSorted = useMemo(()=>{
    let list = [...state.admin.products];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p:any)=> p.name.toLowerCase().includes(q) || (p.description||"").toLowerCase().includes(q));
    }
    const dir = sortDir === "asc" ? 1 : -1;
    list.sort((a:any,b:any)=>{
      if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
      if (sortBy === "quantity") return (a.quantity - b.quantity) * dir;
      if (sortBy === "category") return (a.category - b.category) * dir;
      return 0;
    });
    return list;
  }, [state.admin.products, query, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const current = filteredSorted.slice((page-1)*pageSize, page*pageSize);

  const addProductInline = async () => {
    if (!newProduct.name || !newProduct.image || !newProduct.category) return;
    const now = new Date().toISOString().slice(0,10);
    const product = { ...newProduct, price: Number(newProduct.price||0), quantity: Number(newProduct.quantity||0), category: Number(newProduct.category), created_at: now, updated_at: now };
    await axios.post("http://localhost:8080/products", product);
    setNewProduct({ name:"", price:0, quantity:0, description:"", category:"", image:"", created_at:"", updated_at:"" });
    setFilePreview("");
    setFormOpen(false);
    dispatch(getAllProducts());
  };

  const onFileChange = (e:any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setNewProduct({...newProduct, image: dataUrl});
      setFilePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      {state.admin.deleteFormProduct ? (
        <DeleteProductForm></DeleteProductForm>
      ) : (
        ""
      )}
      {state.admin.editFormProduct ? <EditProductForm></EditProductForm> : ""}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <input value={query} onChange={(e)=>{setQuery(e.target.value); setPage(1);}} placeholder="Tìm kiếm..." className="border px-3 py-2 rounded" />
          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="border px-2 py-2 rounded">
            <option value="name">Sắp xếp theo tên</option>
            <option value="quantity">Số lượng</option>
            <option value="category">Thể loại</option>
          </select>
          <select value={sortDir} onChange={(e)=>setSortDir(e.target.value as any)} className="border px-2 py-2 rounded">
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
        <button onClick={()=>setFormOpen(!formOpen)} className="px-3 py-2 bg-green-600 text-white rounded">{formOpen?"Đóng":"Thêm sản phẩm"}</button>
      </div>
      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Thêm sản phẩm</h3>
              <button onClick={()=>setFormOpen(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
              <input className="border px-2 py-2 rounded" placeholder="Tên" value={newProduct.name} onChange={(e)=>setNewProduct({...newProduct, name:e.target.value})} />
              <input className="border px-2 py-2 rounded" placeholder="Giá" type="number" value={newProduct.price} onChange={(e)=>setNewProduct({...newProduct, price:e.target.value})} />
              <input className="border px-2 py-2 rounded" placeholder="SL" type="number" value={newProduct.quantity} onChange={(e)=>setNewProduct({...newProduct, quantity:e.target.value})} />
              <select className="border px-2 py-2 rounded" value={newProduct.category} onChange={(e)=>setNewProduct({...newProduct, category:e.target.value})}>
                <option value="">Chọn thể loại</option>
                {state.admin.categories.map((c:any)=>(<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
              <div className="flex flex-col gap-2">
                {filePreview ? <img src={filePreview} alt="preview" className="w-20 h-20 object-cover rounded border" /> : null}
                <input className="border px-2 py-2 rounded" type="file" accept="image/*" onChange={onFileChange} />
              </div>
              <input className="border px-2 py-2 rounded md:col-span-2" placeholder="Mô tả" value={newProduct.description} onChange={(e)=>setNewProduct({...newProduct, description:e.target.value})} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={()=>setFormOpen(false)} className="px-4 py-2 border rounded">Hủy</button>
              <button onClick={addProductInline} className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
            </div>
          </div>
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created at
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Update at
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {current.map((item: any, index: any) => {
            let a = state.admin.categories.find((cateList: any) => {
              return cateList.id === item.category;
            });
            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.updated_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {a ? a.name : "Loading..."}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item.image}
                    className="w-[100px] h-[100px] rounded-full"
                    alt=""
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => openEditForm(item.id)}
                    className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteForm(item.id)}
                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-end gap-2 p-3">
        <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded disabled:opacity-50">Trước</button>
        <span className="text-sm">{page}/{totalPages}</span>
        <button disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 border rounded disabled:opacity-50">Sau</button>
      </div>
    </>
  );
}
