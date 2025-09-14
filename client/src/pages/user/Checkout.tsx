import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllUsers, setCurrentUser } from "../../store/reducers/homeReducer";
import { getAllProducts } from "../../services/allProduct";
import { fetchAddresses, fetchPaymentMethods, fetchShippingMethods, fetchVouchers } from "../../services/checkout";

export default function Checkout() {
  const dispatch = useDispatch();
  const state: any = useSelector((s) => s);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedShippingId, setSelectedShippingId] = useState<number | null>(2);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(1);
  const [voucherCode, setVoucherCode] = useState("");
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    dispatch(setCurrentUser());
    dispatch(getAllUsers());
    dispatch(getAllProducts());
  }, []);

  const user = useMemo(() => state.home.users.find((u:any) => u.id === state.home.loginUser?.id), [state.home.users, state.home.loginUser]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAddresses(user.id));
    }
    dispatch(fetchShippingMethods());
    dispatch(fetchPaymentMethods());
    dispatch(fetchVouchers());
  }, [user?.id]);

  const addresses = state.checkout?.addresses || [];
  const shippings = state.checkout?.shippingMethods || [];
  const payments = state.checkout?.paymentMethods || [];
  const vouchers = state.checkout?.vouchers || [];

  useEffect(() => {
    if (!selectedAddressId && addresses.length) {
      const def = addresses.find((a:any) => a.isDefault) || addresses[0];
      setSelectedAddressId(def.id);
    }
  }, [addresses, selectedAddressId]);

  const subtotal = (user?.cart || []).reduce((s:number, c:any) => s + c.price * c.quantity, 0);
  const shippingFee = shippings.find((s:any) => s.id === selectedShippingId)?.fee || 0;

  const activeVoucher = vouchers.find((v:any) => v.code.toUpperCase() === voucherCode.trim().toUpperCase() && v.isActive);
  const now = new Date().toISOString().slice(0,10);
  const inDate = activeVoucher && now >= activeVoucher.start && now <= activeVoucher.end;
  let discount = 0;
  if (activeVoucher && inDate && subtotal >= activeVoucher.minSubtotal) {
    if (activeVoucher.type === "percent") {
      discount = Math.min(Math.floor((subtotal * activeVoucher.value)/100), activeVoucher.maxDiscount || Infinity);
    } else if (activeVoucher.type === "fixed") {
      discount = activeVoucher.value;
    } else if (activeVoucher.type === "shipping") {
      discount = Math.floor((shippingFee * activeVoucher.value)/100);
    }
  }
  const total = Math.max(subtotal + shippingFee - discount, 0);

  const placeOrder = async () => {
    if (!user || !selectedAddressId || !selectedShippingId || !selectedPaymentId) return;
    setPlacing(true);
    try {
      // Validate stock
      const products = state.admin.products;
      const invalid = user.cart.find((ci:any) => {
        const p = products.find((pp:any) => pp.id === ci.productId);
        return !p || ci.quantity > p.quantity || ci.quantity <= 0;
      });
      if (invalid) { setPlacing(false); return; }

      const today = new Date().toISOString().slice(0,10);
      const order = {
        userId: user.id,
        addressId: selectedAddressId,
        shippingMethodId: selectedShippingId,
        paymentMethodId: selectedPaymentId,
        items: user.cart,
        subtotal,
        shippingFee,
        discount,
        voucherCode: activeVoucher?.code || "",
        total,
        status: "pending",
        created_at: today,
        updated_at: today
      };
      await axios.post("http://localhost:8080/orders", order);
      for (const ci of user.cart) {
        const p = products.find((pp:any) => pp.id === ci.productId);
        if (p) {
          await axios.patch(`http://localhost:8080/products/${p.id}`, { quantity: Math.max(p.quantity - ci.quantity, 0) });
        }
      }
      await axios.patch(`http://localhost:8080/users/${user.id}`, { cart: [] });
      dispatch(getAllUsers());
    } finally {
      setPlacing(false);
      dispatch(getAllProducts());
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Thanh toán</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white p-4 border">
            <h3 className="font-semibold mb-2">Địa chỉ nhận hàng</h3>
            <div className="space-y-2">
              {addresses.map((a:any) => (
                <label key={a.id} className="block">
                  <input type="radio" name="address" checked={selectedAddressId===a.id} onChange={()=>setSelectedAddressId(a.id)} />
                  <span className="ml-2">{a.fullName} | {a.phone} | {a.street}, {a.ward}, {a.district}, {a.province}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 border">
            <h3 className="font-semibold mb-2">Phương thức vận chuyển</h3>
            <div className="space-y-2">
              {shippings.map((s:any)=> (
                <label key={s.id} className="block">
                  <input type="radio" name="ship" checked={selectedShippingId===s.id} onChange={()=>setSelectedShippingId(s.id)} />
                  <span className="ml-2">{s.name} - {s.fee.toLocaleString("it-IT", {style:"currency", currency:"VND"})}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 border">
            <h3 className="font-semibold mb-2">Phương thức thanh toán</h3>
            <div className="space-y-2">
              {payments.map((p:any)=> (
                <label key={p.id} className="block">
                  <input type="radio" name="pay" checked={selectedPaymentId===p.id} onChange={()=>setSelectedPaymentId(p.id)} />
                  <span className="ml-2">{p.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-gray-50 p-4 border">
          <h3 className="font-semibold mb-2">Mã giảm giá</h3>
          <div className="flex gap-2 mb-3">
            <input value={voucherCode} onChange={(e)=>setVoucherCode(e.target.value)} placeholder="Nhập mã" className="border p-2 flex-1" />
          </div>

          <h3 className="font-semibold mb-2">Tóm tắt đơn hàng</h3>
          <p className="flex justify-between"><span>Tạm tính</span><span>{subtotal.toLocaleString("it-IT", {style:"currency", currency:"VND"})}</span></p>
          <p className="flex justify-between"><span>Phí vận chuyển</span><span>{shippingFee.toLocaleString("it-IT", {style:"currency", currency:"VND"})}</span></p>
          <p className="flex justify-between"><span>Giảm giá</span><span>-{discount.toLocaleString("it-IT", {style:"currency", currency:"VND"})}</span></p>
          <p className="flex justify-between font-semibold border-t mt-2 pt-2"><span>Tổng</span><span>{total.toLocaleString("it-IT", {style:"currency", currency:"VND"})}</span></p>
          <button disabled={placing || !user || (user?.cart||[]).length===0} onClick={placeOrder} className="w-full mt-3 bg-red-500 text-white py-2 rounded disabled:opacity-50">{placing?"Đang đặt...":"Đặt hàng"}</button>
        </div>
      </div>
    </div>
  );
}


