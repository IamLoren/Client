import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios/axios";
import { RootState } from "../store";
import { CreateOrderResponse, OrderTypes } from "./ordersSliceType";

export const createOrderThunk = createAsyncThunk<
CreateOrderResponse,
OrderTypes,
  {
    state: RootState;
    rejectValue: string;
  }
>("order/create", async (orderToCreate, thunkApi) => {
  const state = thunkApi.getState(); 
    const role = state.auth.user.role;
  try {
    const { data } = await api.post("api/orders/create", {...orderToCreate, createdBy: role});

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
    return thunkApi.rejectWithValue("An unexpected error occurred"); 
  }
});