import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, clearToken, setToken } from "../../axios/axios";
import {
  loginData,
  refreshData,
  RegResponse,
  RegTypes,
} from "./authSliceTypes";
import { RootState } from "../store";

export const registerThunk = createAsyncThunk<
  RegResponse,
  RegTypes,
  {
    state: RootState;
    rejectValue: string;
  }
>("auth/register", async (credentials, thunkApi) => {
  try {
    const { data } = await api.post("api/auth/signup", credentials);
    setToken(data.token);
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

export const loginThunk = createAsyncThunk<
  loginData,
  { email: string; password: string },
  { state: RootState; rejectValue: string }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await api.post("api/auth/signin", credentials);
    setToken(response.data.token);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
  }
});

export const refreshThunk = createAsyncThunk<
  refreshData,
  void,
  {
    state: RootState;
    rejectValue: string;
    getState: () => RootState;
  }
>("auth/refresh", async (_, thunkApi) => {
  const savedToken = localStorage.getItem("authToken");
  if (savedToken) {
    setToken(savedToken);
  } else {
    return thunkApi.rejectWithValue("Token doesn't exist");
  }

  try {
    const { data } = await api.get("api/auth/current");
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

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await api.post("api/auth/logout");
      localStorage.removeItem("authToken");
      clearToken();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        return thunkApi.rejectWithValue(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }
);
