import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { api } from "../../axios/axios";
import { toast } from "react-toastify";

export const getAllUsers = createAsyncThunk<
[],
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("users/getAll", async (_, thunkApi) => {
  const state = thunkApi.getState(); 
    const role = state.auth.user.role;
    if (role === "admin") {
        try {
    const { data } = await api.get("api/user");
    if (role === "admin") {
      return data;
    } else {
     throw new Error("Access denied!")
    }   
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
    return thunkApi.rejectWithValue("An unexpected error occurred"); 
  }
    }
});