import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./operations";
import { adminStateTypes } from "./adminSliceTypes";

const initialState:adminStateTypes = {
  adminSearchResult: [],
  usersList: [],
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
    builder.addCase(getAllUsers.fulfilled, (state:adminStateTypes, action) => {
      state.usersList = action.payload.allUsers;
    });
  },
});

export const adminReducer = adminSlice.reducer;
export const { changeSearchResult, clearAdminSearchResult } =
  adminSlice.actions;
