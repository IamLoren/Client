import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "./authSliceTypes";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
  updateFavoriteList,
} from "./operations";
import { toast } from "react-toastify";
import { CarInterface } from "../carRentalSlice/carRentalSliceTypes";

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
    changeTheme: (
      state: StateType,
      { payload }: PayloadAction<"light" | "dark">
    ) => {
      state.user.theme = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state: StateType) => {
        state.isLoading = true;
      })
      .addCase(registerThunk.fulfilled, (state: StateType, { payload }) => {
        toast.success(`${payload.user.firstName}, You have been registered as a new user!
         Enjoy the additional features!`);
        state.user.userId = payload.user.id;
        state.user.firstName = payload.user.firstName;
        state.user.lastName = payload.user.lastName;
        state.user.role = payload.user.role;
        state.user.email = payload.user.email;
        state.token = payload.token;
        state.isLoading = false;
        state.isLogged = true;
      })
      .addCase(registerThunk.rejected, (state: StateType) => {
        toast.error("User already exists");
        state.isLogged = false;
        state.isLoading = false;
      })
      .addCase(refreshThunk.pending, (state: StateType) => {
        state.isLoading = true;
      })
      .addCase(refreshThunk.fulfilled, (state: StateType, { payload }) => {
        state.user.userId = payload.id;
        state.user.firstName = payload.firstName;
        state.user.lastName = payload.lastName;
        state.user.role = payload.role;
        state.user.email = payload.email;
        state.user.avatarURL = payload.avatarURL;
        state.user.favorites = payload.favorites;
        state.user.ordersHistory = payload.history;
        state.token = payload.token;
        state.isLoading = false;
        state.isLogged = true;
      })
      .addCase(refreshThunk.rejected, (state: StateType) => {
        toast.error("It looks like your session has timed out. Log in again");
        state.isLogged = false;
        state.isLoading = false;
      })
      .addCase(loginThunk.pending, (state: StateType) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state: StateType, { payload }) => {
        toast.success(
          `${payload.user.firstName}, You succesfully accessed your personal profile!`
        );
        state.user.userId = payload.user.id;
        state.user.firstName = payload.user.firstName;
        state.user.lastName = payload.user.lastName;
        state.user.role = payload.user.role;
        state.user.email = payload.user.email;
        state.token = payload.token;
        state.user.favorites = payload.user.favorites;
        state.user.ordersHistory = payload.user.history;
        state.isLoading = false;
        state.isLogged = true;
      })
      .addCase(loginThunk.rejected, (state: StateType) => {
        toast.error("Your email or password is wrong");
        state.isLogged = false;
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, (state: StateType) => {
        state.user = {
          userId: "",
          firstName: "",
          lastName: "",
          email: "",
          role: null,
          avatarURL: "",
          theme: "light",
          favorites: [],
          ordersHistory: [],
        };
        state.token = "";
        state.isLogged = false;
        state.isLoading = false;
      })
      .addCase(
        updateFavoriteList.fulfilled,
        (
          state: StateType,
          { payload }: PayloadAction<{ arrFavorite: CarInterface[] }>
        ) => {
          state.user.favorites = payload.arrFavorite;
          state.isLoading = false;
          state.isLogged = true;
        }
      )
      .addCase(updateFavoriteList.rejected, (state: StateType) => {
        toast.error("Updating of your favorite list was failed");
        state.isLogged = false;
        state.isLoading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { changeTheme } = authSlice.actions;
