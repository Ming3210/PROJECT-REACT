import { createAsyncThunk } from "@reduxjs/toolkit"

export const customerDisplayFormOff:any = createAsyncThunk("close/closeDisplay", async () => {
    return false
  })