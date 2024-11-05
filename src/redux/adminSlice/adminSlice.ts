import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./operations";
import { toast } from "react-toastify";

const initialState = {
    adminSearchResult: [],
    usersList: []
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        changeSearchResult: (state, action) => {
            state.adminSearchResult = action.payload;
        },
        clearAdminSearchResult: (state) => {
            state.adminSearchResult = [];
        }
},
extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.usersList = action.payload.allUsers;
      })
},
})

export const adminReducer = adminSlice.reducer;
export const {
    changeSearchResult,
    clearAdminSearchResult
} = adminSlice.actions;