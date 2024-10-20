import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../axios/axios";
import { RootState } from "../store";
import { CarInterface } from "./carRentalSliceTypes";

export const getAllCarsThunk = createAsyncThunk<
CarInterface[],
  void,
  {
    state: RootState;
    rejectValue: string;
    getState: ()=> void
  }
>("cars/getAll", async (_, thunkApi) => {
  const state = thunkApi.getState(); 
    const role = state.auth.user.role;
  try {
    const { data } = await api.get("api/cars");

    let prices;
    if (role === "user") {
      prices = data.filter((car:CarInterface) => !car.isRemoved).map((car:CarInterface) => car.price.day);
    } else {
      prices = data.map((car:CarInterface) => car.price.day);
    }

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return {data, minPrice, maxPrice };
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
  }
});