import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios/axios";
import { RootState } from "../store";
import { CarInterface } from "./carRentalSliceTypes";

export const getAllCarsThunk = createAsyncThunk<
  { data: CarInterface[]; minPrice: number; maxPrice: number },
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("cars/getAll", async (_, thunkApi) => {
  const state = thunkApi.getState();
  const role = state.auth.user.role;
  try {
    const { data } = await api.get("api/cars");

    let prices;
    if (role === "user") {
      prices = data
        .filter((car: CarInterface) => !car.isRemoved)
        .map((car: CarInterface) => car.price.day);
    } else {
      prices = data.map((car: CarInterface) => car.price.day);
    }

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return { data, minPrice, maxPrice };
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

export const updateCarThunk = createAsyncThunk<
  { updatedCar: CarInterface },
  {
    id: string;
    carToUpdate: {
      orderId: string;
      startDate: string;
      endDate: string;
    };
  },
  {
    state: RootState;
    rejectValue: string;
  }
>("cars/update", async (allData, thunkApi) => {
  try {
    const { data } = await api.put(
      `api/cars/${allData.id}`,
      allData.carToUpdate
    );
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


export const updateCarAvailability = createAsyncThunk<{ updatedCar: CarInterface },
{
  id: string,
  orderId:string
},
{
  state: RootState;
  rejectValue: string;
}>("cars/updateAvailability", async (allData, thunkApi) => {
  try {
    const { data } = await api.put(
      `api/cars/availability/${allData.id}`,
      { orderId: allData.orderId }
    );
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