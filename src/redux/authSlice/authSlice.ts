import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "./authSliceTypes";
import { registerThunk } from "./operations";
import { toast } from "react-toastify";

const initialState: StateType = {
  user: { 
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    role: null,
    avatarURL: "",
    theme: "light",
    favorites: [],
    ordersHistory: [],
  },
  token: "",
  isLogged: false,
  isLoading: false,
  isRefresh: false,
  isError: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    changeTheme: (state, { payload }: PayloadAction<"light" |"dark">) => {
      state.user.theme = payload;
    },
  },
    extraReducers: (builder) => {
    builder
    .addCase(registerThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(registerThunk.fulfilled, (state, { payload }) => {
      toast.success(`${payload.user.firstName}, You have been registered as a new user!
         Enjoy the additional features!`)
         state.user.userId = payload.user.id;
      state.user.firstName = payload.user.firstName;
      state.user.lastName = payload.user.lastName;
      state.user.role = payload.user.role;
      state.user.email = payload.user.email;
      state.token = payload.token;
      state.isLoading = false;
      state.isLogged = true;
    })
    .addCase(registerThunk.rejected, (state) => {
      toast.error('User already exists');
      state.isLogged = false;
      state.isLoading = false;
    })
  },
});

export const authReducer = authSlice.reducer;
export const { changeTheme } = authSlice.actions;
