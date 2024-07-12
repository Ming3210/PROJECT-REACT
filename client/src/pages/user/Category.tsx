import React, { useEffect } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../services/allCategory";
import { getAllProducts } from "../../services/allProduct";
import { editCategory } from "../../services/editCategoryForm";

export default function Category() {
  const state: any = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(state.admin.product);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
  }, []);

  const handleChange = (category: any) => {
    console.log(category);
    const updatedCategory = {
      ...category,
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
    dispatch(editCategory(updatedCategory));
  };

  const handleClick = (id: any) => {
    console.log(id);
    navigate(`/product-detail/${id}`);
  };
  return (
    <div>
      <div className="container py-4 flex items-center gap-3">
        <Link to="/" className="text-red-400 text-base">
          <FaHome />
        </Link>
        <span className="text-sm text-gray-400">
          <FaChevronRight />
        </span>
        <p className="text-gray-600 font-medium">Categories</p>
      </div>

      <div className="container grid grid-cols-4 gap-6 pt-4 pb-16 items-start">
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
          <div className="divide-y min-h-[50vh] divide-gray-200 space-y-5">
            <div>
              <h3 className="text-xl text-gray-900 mb-3 uppercase font-medium">
                Categories
              </h3>
              {state.admin.categories.map((item: any) => {
                return (
                  <div key={item.id} className="space-y-2 mb-2">
                    <div className="flex items-center">
                      <button onClick={() => handleChange(item)}>
                        {item.name}
                      </button>
                      <div className="ml-auto text-gray-600 text-sm">
                        ({item.product.length})
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <select
            name=""
            className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-red-400 focus:border-red-500 mb-5"
            id=""
          >
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>

          <div className="grid grid-cols-3 gap-6">
            {state.admin.categories.map((item: any) => {
              if (item.displayStatus) {
                return item.product.map((product: any) => {
                  return (
                    <div
                      key={product.id}
                      className="bg-white shadow rounded overflow-hidden group"
                    >
                      <div
                        onClick={() => handleClick(product.id)}
                        className="relative"
                      >
                        <img
                          src={product.image}
                          className="w-full"
                          alt={product.name}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                          <Link
                            to=""
                            className="text-white text-lg w-9 h-8 rounded-full bg-red-400 flex items-center justify-center hover:bg-gray-800 transition"
                          >
                            <BsFillSearchHeartFill />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                });
              }

              return null; // Ensure a return statement is present for non-true statuses
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
