import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  delFormOpen,
  editFormOpen,
  getAllCategories,
  getDeletedCategory,
  getEditedCategory,
} from "../../store/reducers/adminReducer";
import DeleteCategoryForm from "./DeleteCategoryForm";
import EditCategoryForm from "./EditCategoryForm";

export default function AllCategory() {
  const state: any = useSelector((state) => state);
  const dispatch = useDispatch();
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

  return (
    <div>
      {state.admin.deleteForm ? <DeleteCategoryForm></DeleteCategoryForm> : ""}
      {state.admin.editForm ? <EditCategoryForm></EditCategoryForm> : ""}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      STT
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Category Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state.admin.categories.map((item: any, index: any) => {
                    return (
                      <tr
                        key={index}
                        className="border-b border-neutral-200 dark:border-white/10"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          1
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
