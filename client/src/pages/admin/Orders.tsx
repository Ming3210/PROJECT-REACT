import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrder } from "../../services/orders";

export default function Orders() {
  const dispatch = useDispatch();
  const state: any = useSelector((s) => s);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const orders = state.admin.orders || [];

  const changeStatus = (order: any, status: string) => {
    dispatch(updateOrder({ ...order, status, updated_at: new Date().toISOString().slice(0, 10) }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((o: any) => (
            <tr key={o.id}>
              <td className="px-6 py-4 whitespace-nowrap">{o.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{o.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{o.items.length}</td>
              <td className="px-6 py-4 whitespace-nowrap">{o.total.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</td>
              <td className="px-6 py-4 whitespace-nowrap">{o.status}</td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => changeStatus(o, "paid")}>Mark paid</button>
                <button className="px-2 py-1 bg-amber-500 text-white rounded" onClick={() => changeStatus(o, "shipped")}>Ship</button>
                <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={() => changeStatus(o, "delivered")}>Deliver</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => changeStatus(o, "cancelled")}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


