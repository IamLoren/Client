import { createSlice} from "@reduxjs/toolkit";
import { CarInterface, CarsStateType } from "./carRentalSliceTypes";
import { getAllCarsThunk } from "./operations";
import { toast } from "react-toastify";

const initialState: CarsStateType = {
   cars: [],
    isLoading: false,
  };

  export const carRentalSlice = createSlice({
    name: "carRentalSlice",
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllCarsThunk.pending, (state: CarsStateType) => {
          state.isLoading = true;
        })
        .addCase(getAllCarsThunk.fulfilled, (state: CarsStateType, { payload }:{payload:CarInterface[]}) => {
          state.cars = payload;
          state.isLoading = false;
        })
        .addCase(getAllCarsThunk.rejected, (state: CarsStateType) => {
          toast.error("OOOps! Something went wrong... Reload the site");
          state.isLoading = false;
        })
        
    },
  });
  
  export const carRentalReducer = carRentalSlice.reducer;
//   export const {  } = carRentalSlice.actions;
  