import React, { useEffect, useState } from "react";
import { FaHome, FaShoppingBag } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProducts } from "../../services/allProduct";
import { getAllCategories } from "../../services/allCategory";
import { allUsers } from "../../services/allCustomer";
import { getAllUsers, setCurrentUser } from "../../store/reducers/homeReducer";

export default function ProductDetail() {
  const [name, setName] = useState<string>("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(setCurrentUser());
    dispatch(getAllUsers());
    dispatch(getAllCategories());
  }, []);
  const product = state.admin.products.find(
    (product: any) => product.id === Number(id)
  );
  // const [items, setItems] = useState<any>({
  //   name: product.name,
  //   price: product.price,
  //   quantity: quantity,
  //   description: product.description,
  //   category: product.category,
  //   created_at: product.created_at,
  //   updated_at: product.updated_at,
  //   image: product.image,
  // });

  console.log(product, 11111111);

  useEffect(() => {
    if (product) {
      const categoryName = state.admin.categories.find(
        (category: any) => category.id === product.category
      )?.name;
      if (categoryName) {
        setName(categoryName);
      }
    }
  }, [product, state.admin.categories]);

  if (!product) {
    return <div>Loading...</div>; // Handle loading state or not found
  }

  // const user = state.home.users.find(
  //   (user: any) => user.id == state.home.loginUser.id
  // );
  // console.log(user, 123123213);

  const addToCart = () => {};

  const quantityDown = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const quantityUp = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };
  return (
    <div>
      {" "}
      <div className="container py-4 flex items-center gap-3">
        <Link to="/" className="text-red-400 text-base">
          <FaHome />
        </Link>
        <span className="text-sm text-gray-400">
          <FaChevronRight />
        </span>

        <p className="text-gray-600 font-medium">Categories</p>
        <span className="text-sm text-gray-400">
          <FaChevronRight />
        </span>
        <p className="text-gray-600 font-medium">Product Detail</p>
      </div>
      <div className="container grid grid-cols-2 gap-6">
        <div>
          <img src={product.image || ""} className="w-full" alt="" />
        </div>

        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">
            {product.name}
          </h2>
          <div>
            <p className="text-gray-800 space-x-2">
              <span>Avalability:</span>
              <span className="text-green-600">In stock</span>
            </p>
            <p className="text-gray-800 space-x-2">
              <span className="text-gray-800">Category:</span>

              <span>{name}</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 mt-4">
            <p className="text-2xl font-medium text-red-400">
              {product.price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <p className="mt-4">{product.description}</p>

          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
            <div className="flex border border-gray-300 text-gray-600  divide-gray-300 w-max">
              <div
                onClick={quantityDown}
                className="h-8 border-solid  border-gray-300 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
              >
                -
              </div>
              <div className="h-8 w-8 text-xl flex items-center justify-center">
                {quantity}
              </div>
              <div
                onClick={quantityUp}
                className="h-8 border-solid w-8 text-xl flex items-center justify-center cursor-pointer select-none"
              >
                +
              </div>
            </div>
          </div>

          <div className="flex gap-3 border-b border-gray-200 pb-5 mt-6">
            <p
              onClick={addToCart}
              className="bg-red-400 border cursor-pointer no-underline border-red-400 text-white px-8 py-2 font-medium rounded uppercase flex items-center justify-center gap-2 hover:bg-transparent hover:text-red-400 transition"
            >
              <FaShoppingBag /> Add to cart
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
