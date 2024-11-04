import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios/axios";
import { RootState } from "../store";
import { CreateOrderRequest, CreateOrderResponse, GetAllOrdersType } from "./ordersSliceType";

export const createOrderThunk = createAsyncThunk<
CreateOrderResponse,
CreateOrderRequest,
  {
    state: RootState;
    rejectValue: string;
  }
>("order/create", async (orderToCreate, thunkApi) => {
  try {
    const { data } = await api.post("api/orders/create", orderToCreate);

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


export const getAllOrdersThunk = createAsyncThunk<
GetAllOrdersType,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("orders/getActive", async (_, thunkApi) => {

  try {
    const { data } = await api.get("api/orders");
    console.log(data)
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