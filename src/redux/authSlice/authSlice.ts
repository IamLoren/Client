import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  user: {
    email: string;
    name: string;
    role: null | "admin" | "user";
    avatarURL: string;
    registrationDate: string | Date;
    theme: string;
    favorites: [];
    ordersHistory: [];
    verify: boolean;
    verificationToken: string;
    //   language:
  };
  token: string;
  isLogged: boolean;
  isLoading: boolean;
  isRefresh: boolean;
  isError: null;
}

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
