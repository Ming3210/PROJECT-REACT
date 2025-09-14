import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddresses: any = createAsyncThunk("checkout/addresses", async (userId: number) => {
  const res = await axios.get(`http://localhost:8080/addresses?userId=${userId}`);
  return res.data;
});

export const fetchVouchers: any = createAsyncThunk("checkout/vouchers", async () => {
  const res = await axios.get(`http://localhost:8080/vouchers`);
  return res.data;
});

export const fetchShippingMethods: any = createAsyncThunk("checkout/shipping", async () => {
  const res = await axios.get(`http://localhost:8080/shippingMethods`);
  return res.data;
});

export const fetchPaymentMethods: any = createAsyncThunk("checkout/payments", async () => {
  const res = await axios.get(`http://localhost:8080/paymentMethods`);
  return res.data;
});


