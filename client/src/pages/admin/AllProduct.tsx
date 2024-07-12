import React, { useEffect, useState } from "react";
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

export default function AllProduct() {
  const [categories, setCategories] = useState<string[]>([]);
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
  return (
    <>
      {state.admin.deleteFormProduct ? (
        <DeleteProductForm></DeleteProductForm>
      ) : (
        ""
      )}
      {state.admin.editFormProduct ? <EditProductForm></EditProductForm> : ""}
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
          {state.admin.products.map((item: any, index: any) => {
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
    </>
  );
}
