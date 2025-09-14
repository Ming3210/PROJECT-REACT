import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../store/reducers/adminReducer";
import DeleteCategoryForm from "./DeleteCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import {
  delFormOpen,
  editFormOpen,
  getAllCategories,
  getDeletedCategory,
  getEditedCategory,
} from "../../services/allCategory";
import axios from "axios";

export default function AllCategory() {
  const state: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState<"asc"|"desc">("asc");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [formOpen, setFormOpen] = useState(false);
  const [newCat, setNewCat] = useState<any>({ name: "", description: "", status: true, product: [], image: "", displayStatus: false });
  const [filePreview, setFilePreview] = useState<string>("");
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  console.log(state);
  const delCategory = (id: number) => {
    let index = state.admin.categories.find(
      (category: any) => category.id === id
    );
    dispatch(getDeletedCategory(index));
    dispatch(delFormOpen());
  };
  const editCategory = (id: number) => {
    let index = state.admin.categories.find(
      (category: any) => category.id === id
    );
    dispatch(getEditedCategory(index));
    dispatch(editFormOpen());
  };

  const filteredSorted = useMemo(() => {
    let list = [...state.admin.categories];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((c:any) => c.name.toLowerCase().includes(q) || (c.description||"").toLowerCase().includes(q));
    }
    list.sort((a:any,b:any)=>{
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortBy === "name") return a.name.localeCompare(b.name) * dir;
      if (sortBy === "products") return ((a.product?.length||0) - (b.product?.length||0)) * dir;
      return 0;
    });
    return list;
  }, [state.admin.categories, query, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const current = filteredSorted.slice((page-1)*pageSize, page*pageSize);

  const addCategoryInline = async () => {
    if (!newCat.name || !newCat.image) return;
    await axios.post("http://localhost:8080/categories", newCat);
    setNewCat({ name: "", description: "", status: true, product: [], image: "", displayStatus: false });
    setFilePreview("");
    setFormOpen(false);
    dispatch(getAllCategories());
  };

  const onFileChange = (e:any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setNewCat({...newCat, image: dataUrl});
      setFilePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {state.admin.deleteForm ? <DeleteCategoryForm></DeleteCategoryForm> : ""}
      {state.admin.editForm ? <EditCategoryForm></EditCategoryForm> : ""}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <input value={query} onChange={(e)=>{setQuery(e.target.value); setPage(1);}} placeholder="Tìm kiếm..." className="border px-3 py-2 rounded" />
            <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="border px-2 py-2 rounded">
              <option value="name">Sắp xếp theo tên</option>
              <option value="products">Số sản phẩm</option>
            </select>
            <select value={sortDir} onChange={(e)=>setSortDir(e.target.value as any)} className="border px-2 py-2 rounded">
              <option value="asc">Tăng dần</option>
              <option value="desc">Giảm dần</option>
            </select>
          </div>
          <button onClick={()=>setFormOpen(!formOpen)} className="px-3 py-2 bg-green-600 text-white rounded">{formOpen?"Đóng":"Thêm danh mục"}</button>
        </div>
        {formOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded shadow-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Thêm danh mục</h3>
                <button onClick={()=>setFormOpen(false)} className="text-gray-500 hover:text-black">✕</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input className="border px-2 py-2 rounded" placeholder="Tên danh mục" value={newCat.name} onChange={(e)=>setNewCat({...newCat, name:e.target.value})} />
                <div className="flex flex-col gap-2">
                  {filePreview ? <img src={filePreview} alt="preview" className="w-20 h-20 object-cover rounded border" /> : null}
                  <input className="border px-2 py-2 rounded" type="file" accept="image/*" onChange={onFileChange} />
                </div>
                <input className="border px-2 py-2 rounded md:col-span-2" placeholder="Mô tả" value={newCat.description} onChange={(e)=>setNewCat({...newCat, description:e.target.value})} />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={()=>setFormOpen(false)} className="px-4 py-2 border rounded">Hủy</button>
                <button onClick={addCategoryInline} className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
              </div>
            </div>
          </div>
        )}
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light bg-gray-800 text-surface dark:text-white">
                <thead className="border-b border-neutral-200 bg-gray-600 font-medium dark:border-white/10 bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      STT
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Category Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Products
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {current.map((item: any, index: number) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-neutral-200 dark:border-white/10 hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {(page-1)*pageSize + index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.name}
                        </td>
                        {item.status ? (
                          <td className="px-6 py-4 text-green-500">Active</td>
                        ) : (
                          <td className="px-6 py-4 text-red-500">Inactive</td>
                        )}
                        <td className="whitespace-nowrap px-6 py-4">
                          {Array.isArray(item.product) ? item.product.length : 0}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <button
                            onClick={() => delCategory(item.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => editCategory(item.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex items-center justify-between gap-2 p-3">
                <div className="text-sm text-gray-600">Tổng: {filteredSorted.length} danh mục</div>
                <div className="flex items-center gap-1">
                  <button disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 border rounded disabled:opacity-50">«</button>
                  {Array.from({length: totalPages}, (_,i)=>i+1).slice(Math.max(0, page-3), Math.min(totalPages, page+2)).map(num => (
                    <button key={num} onClick={()=>setPage(num)} className={`px-3 py-1 border rounded ${page===num? 'bg-gray-800 text-white':'bg-white'}`}>{num}</button>
                  ))}
                  <button disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 border rounded disabled:opacity-50">»</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
