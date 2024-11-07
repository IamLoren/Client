import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios/axios";
import { RootState } from "../store";
import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetAllOrdersType,
  OrderTypes,
} from "./ordersSliceType";

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

export const updateOrderThunk = createAsyncThunk<
  void,
  { id: string; orderToUpdate: OrderTypes },
  {
    state: RootState;
    rejectValue: string;
  }
>("order/update", async (allData, thunkApi) => {
  try {
    const { data } = await api.put(
      `api/orders/${allData.id}`,
      allData.orderToUpdate
    );
    console.log(data.updatedOrder);
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

export const searchNotificationThunk = createAsyncThunk<
  GetAllOrdersType,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("orders/getNotification", async (_, thunkApi) => {
  try {
    const { data } = await api.get("api/orders/search");
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

export const getClientHistory = createAsyncThunk<GetAllOrdersType[],string, {
    state: RootState;
    rejectValue: string;
  }
  >("orders/getUserHistory", async (id, thunkApi) =>{
    try {
        const { data } = await api.get(`api/orders/search/${id}`);
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