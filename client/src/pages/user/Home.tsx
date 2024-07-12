import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {} from "../../store/reducers/adminReducer";
import { getAllCategories } from "../../services/allCategory";
import { editCategory } from "../../services/editCategoryForm";

export default function Home() {
  const navigate = useNavigate();

  const state: any = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
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
            "url('https://firebasestorage.googleapis.com/v0/b/react-32712.appspot.com/o/images%2Fbanner-bg.jpg?alt=media&token=95495dcd-28fe-423a-8ede-2f6b3614860c')",
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
    </div>
  );
}
