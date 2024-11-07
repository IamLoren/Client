import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findOneUser, getAllUsers } from "./operations";
import { adminStateTypes, oneUserTypes } from "./adminSliceTypes";

const initialState:adminStateTypes = {
  adminSearchResult: [],
  usersList: [],
  foundedUser: null
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    changeSearchResult: (state:adminStateTypes, action) => {
      state.adminSearchResult = action.payload;
    },
    clearAdminSearchResult: (state:adminStateTypes) => {
      state.adminSearchResult = [];
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllUsers.fulfilled, (state:adminStateTypes, action) => {
      state.usersList = action.payload.allUsers;
    })
    .addCase(findOneUser.fulfilled, (state: adminStateTypes, action: PayloadAction<{ client: oneUserTypes }>) => {
        state.foundedUser = action.payload.client;
    })
  },
});

export const adminReducer = adminSlice.reducer;
export const { changeSearchResult, clearAdminSearchResult } =
  adminSlice.actions;
