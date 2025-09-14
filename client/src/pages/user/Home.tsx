import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {} from "../../store/reducers/adminReducer";
import { getAllCategories } from "../../services/allCategory";
import { editCategory } from "../../services/editCategoryForm";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();

  const state: any = useSelector((state) => state);

  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [benefits, setBenefits] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getAllCategories());
    axios.get("http://localhost:8080/suggestions").then(r => setSuggestions(r.data));
    axios.get("http://localhost:8080/benefits").then(r => setBenefits(r.data));
  }, []);

  const getCategory = (category: any) => {
    let index = state.admin.categories.findIndex(
      (c: any) => c.id === category.id
    );
    let updateCategory = {
      ...state.admin.categories[index],
      displayStatus: true,
    };
    state.admin.categories.forEach((cat: any) => {
      if (cat.id !== category.id) {
        let a = {
          ...cat,
          displayStatus: false,
        };
        dispatch(editCategory(a));
      }
    });
    dispatch(editCategory(updateCategory));
  };

  return (
    <div>
      {" "}
      <div
        className="bg-cover bg-no-repeat bg-center py-36"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="container">
          <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
            best collection for <br />
            home decoration
          </h1>
          <p className="w-[300px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ut
            error ullam earum dolore, quam sit commodi repellendus porro ducimus
            recusandae delectus consectetur saepe, doloremque, iure cumque ipsa?
            Et, itaque.
          </p>
          <div className="mt-12">
            <Link
              to=""
              className="bg-red-400 border border-red-400 text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-red-300 transition no-underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      {/* banner */}
      {/* categoty */}
      <div className="container py-16">
        <h2 className="text-3xl font-medium text-gray-800 uppercase mb-6">
          Shop by category
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {state.admin.categories.map((item: any, index: number) => {
            if (item.status) {
              return (
                <div
                  key={index}
                  className="relative rounded-sm overflow-hidden group"
                >
                  <img src={item.image} className="w-full" alt="" />
                  <Link
                    to="/category"
                    onClick={() => getCategory(item)}
                    className="absolute no-underline inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-medium group-hover:bg-opacity-60"
                  >
                    {item.name}
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="container py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Gợi ý hôm nay</h2>
          <button onClick={()=>navigate('/category')} className="text-red-500">Xem thêm</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {suggestions.map((s:any) => (
            <div key={s.id} className="bg-white border rounded overflow-hidden group">
              <img src={s.image} alt={s.name} className="w-full h-40 object-cover" />
              <div className="p-3 space-y-1">
                <p className="line-clamp-2 text-sm">{s.name}</p>
                <div className="flex items-center gap-2">
                  {s.discountPercent ? <span className="text-xs text-red-600 font-semibold">-{s.discountPercent}%</span> : null}
                  {Array.isArray(s.badges) && s.badges.includes('hot') ? <span className="text-[10px] bg-red-500 text-white px-1 rounded">hot</span> : null}
                  {Array.isArray(s.badges) && s.badges.includes('new') ? <span className="text-[10px] bg-green-600 text-white px-1 rounded">new</span> : null}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-semibold">{(s.salePrice||s.price).toLocaleString('it-IT', {style:'currency', currency:'VND'})}</span>
                  {s.salePrice ? <span className="text-gray-400 line-through text-xs">{s.price.toLocaleString('it-IT', {style:'currency', currency:'VND'})}</span> : null}
                </div>
                <div className="text-xs text-gray-500">({s.reviews||0}) • Đã bán {s.sold||0}</div>
                {Array.isArray(s.colors) && s.colors.length ? <div className="flex flex-wrap gap-1 text-[10px]">{s.colors.map((c:string)=>(<span key={c} className="px-1 py-[1px] border rounded">{c}</span>))}</div> : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {benefits.map((b:any)=> (
          <div key={b.id} className="bg-white border p-4 rounded text-center">
            <p className="font-semibold">{b.title}</p>
            <p className="text-gray-600 text-sm">{b.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
