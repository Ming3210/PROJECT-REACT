import React from "react";

export default function Cart() {
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b flex items-center">
                  <img
                    src="https://th.bing.com/th/id/OIP.GDLemZi-1AOrn1QEId4WgAHaHa?rs=1&pid=ImgDetMain"
                    alt="Headphones"
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <p className="font-bold">BED</p>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="px-2 py-1 bg-gray-200 rounded hover:bg-slate-400">
                    -
                  </button>
                  <span className="mx-2">4</span>
                  <button className="px-2 py-1 bg-gray-200  hover:bg-slate-400 rounded">
                    +
                  </button>
                </td>
                <td className="py-2 px-4 border-b">$45.00</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b flex items-center">
                  <img
                    src="https://th.bing.com/th/id/OIP.GDLemZi-1AOrn1QEId4WgAHaHa?rs=1&pid=ImgDetMain"
                    alt="iPhone"
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <p className="font-bold">BED</p>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  {" "}
                  <button className="px-2 py-1 bg-gray-200 rounded hover:bg-slate-400">
                    -
                  </button>
                  <span className="mx-2">1</span>
                  <button className="px-2 py-1 bg-gray-200  hover:bg-slate-400 rounded">
                    +
                  </button>
                </td>
                <td className="py-2 px-4 border-b">$499.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/4 bg-gray-100 p-4">
          <h2 className="text-lg font-bold mb-4">ORDER SUMMARY</h2>
          <p className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>$545.00</span>
          </p>

          <p className="flex justify-between font-bold mb-4">
            <span>Total</span>
            <span>$545.00</span>
          </p>

          <button className="w-full bg-red-500 hover:cursor-pointer text-white py-2 rounded">
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
}
