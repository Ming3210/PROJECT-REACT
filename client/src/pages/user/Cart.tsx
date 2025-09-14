import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import type { CartItem, Product, User } from "../../interface";
import { getAllUsers, setCurrentUser } from "../../store/reducers/homeReducer";
import { getAllProducts } from "../../services/allProduct";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const state = useSelector((s: any) => s);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentUser());
    dispatch(getAllUsers());
    dispatch(getAllProducts());
  }, []);

  const user: User | undefined = useMemo(() => {
    return state.home.users.find((u: User) => u.id === state.home.loginUser?.id);
  }, [state.home.users, state.home.loginUser]);

  const products: Product[] = state.admin.products;

  const updateCart = async (newCart: CartItem[]) => {
    if (!user) return;
    await axios.patch(`http://localhost:8080/users/${user.id}`, { cart: newCart });
    dispatch(getAllUsers());
  };

  const inc = async (item: CartItem) => {
    const product = products.find(p => p.id === item.productId);
    if (!user || !product) return;
    const newCart = user.cart.map(c => c.productId === item.productId ? { ...c, quantity: Math.min(c.quantity + 1, product.quantity) } : c);
    await updateCart(newCart);
  };
  const dec = async (item: CartItem) => {
    if (!user) return;
    const newCart = user.cart
      .map(c => c.productId === item.productId ? { ...c, quantity: Math.max(c.quantity - 1, 0) } : c)
      .filter(c => c.quantity > 0);
    await updateCart(newCart);
  };
  const removeItem = async (item: CartItem) => {
    if (!user) return;
    const newCart = user.cart.filter(c => c.productId !== item.productId);
    await updateCart(newCart);
  };

  const subtotal = (user?.cart || []).reduce((s, c) => s + c.price * c.quantity, 0);

  const placeOrder = async () => {
    if (!user) return;
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <div className="w-3/4">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 text-start px-4 border-b">Product</th>
                <th className="py-2 text-start px-4 border-b">Quantity</th>
                <th className="py-2 text-start px-4 border-b">Total Price</th>
                <th className="py-2 text-start px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {(user?.cart || []).map((ci) => (
                <tr key={ci.productId}>
                  <td className="py-2 px-4 border-b flex items-center">
                    <img src={ci.image} alt={ci.name} className="w-16 h-16 object-cover mr-4" />
                    <div>
                      <p className="font-bold">{ci.name}</p>
                      <p className="text-sm text-gray-500">{ci.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</p>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => dec(ci)} className="px-2 py-1 bg-gray-200 rounded hover:bg-slate-400">-</button>
                    <span className="mx-2">{ci.quantity}</span>
                    <button onClick={() => inc(ci)} className="px-2 py-1 bg-gray-200  hover:bg-slate-400 rounded">+</button>
                  </td>
                  <td className="py-2 px-4 border-b">{(ci.price * ci.quantity).toLocaleString("it-IT", { style: "currency", currency: "VND" })}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => removeItem(ci)} className="text-red-500">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/4 bg-gray-100 p-4">
          <h2 className="text-lg font-bold mb-4">ORDER SUMMARY</h2>
          <p className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</span>
          </p>
          <p className="flex justify-between font-bold mb-4">
            <span>Total</span>
            <span>{subtotal.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</span>
          </p>
          <button disabled={!user || (user?.cart || []).length === 0} onClick={placeOrder} className="w-full bg-red-500 disabled:opacity-50 hover:cursor-pointer text-white py-2 rounded">
            Tiếp tục thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
