import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "./authSliceTypes";

const initialState: StateType = {
  user: {
    email: "",
    name: "",
    role: null,
    avatarURL: "",
    registrationDate: "",
    theme: "light",
    favorites: [],
    ordersHistory: [],
    verify: false,
    verificationToken: "",
    //   language:
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
    changeTheme: (state, { payload }: PayloadAction<string>) => {
      state.user.theme = payload;
    },
  },
  //   extraReducers: (builder) => {
  // builder
  // .addCase(registerThunk.fullfilled)
  //   }
});

export const authReducer = authSlice.reducer;
export const { changeTheme } = authSlice.actions;
