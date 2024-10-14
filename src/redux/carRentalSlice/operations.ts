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
  }
>("cars/getAll", async (_, thunkApi) => {
  try {
    const { data } = await api.get("api/cars");
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
  }
});