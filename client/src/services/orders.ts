import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Order } from "../interface";

export const getAllOrders: any = createAsyncThunk("orders/getAll", async () => {
  const res = await axios.get("http://localhost:8080/orders");
  return res.data as Order[];
});

export const updateOrder: any = createAsyncThunk(
  "orders/update",
  async (order: Order) => {
    const res = await axios.patch(`http://localhost:8080/orders/${order.id}`, order);
    return res.data as Order;
  }
);


