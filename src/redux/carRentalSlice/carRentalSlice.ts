import { createSlice } from "@reduxjs/toolkit";
import { CarInterface, CarsStateType } from "./carRentalSliceTypes";
import { getAllCarsThunk } from "./operations";
import { toast } from "react-toastify";

const initialState: CarsStateType = {
  cars: [],
  userListOfCars: [],
  carTypeFilter: [],
  carTransmissionFilter:[],
  selectedMinPrice: 0,
  selectedMaxPrice: 0,
  isLoading: false,
};

export const carRentalSlice = createSlice({
  name: "carRentalSlice",
  initialState,
  reducers: {
    changeCarTypeFilter: (
      state: CarsStateType,
      { payload }: { payload: string[] }
    ) => {
      state.carTypeFilter = payload;
    },
    changeCarTransmissionFilter: (
        state: CarsStateType,
        { payload }: { payload: string[] }
      ) => {
        state.carTransmissionFilter = payload;
      },
      changeMinPrice: (
        state: CarsStateType,
        { payload }: {payload: number}
      ) => {
        state.selectedMinPrice = payload;
      },
      changeMaxPrice: (
        state: CarsStateType,
        { payload }: {payload: number}
      ) => {
        state.selectedMaxPrice = payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarsThunk.pending, (state: CarsStateType) => {
        state.isLoading = true;
      })
      .addCase(
        getAllCarsThunk.fulfilled,
        (state: CarsStateType, { payload }: { payload: CarInterface[] }) => {
          state.cars = payload;
          state.userListOfCars = payload.filter((car) => car.isRemoved === false);
          state.isLoading = false;
        }
      )
      .addCase(getAllCarsThunk.rejected, (state: CarsStateType) => {
        toast.error("OOOps! Something went wrong... Reload the site");
        state.isLoading = false;
      });
  },
});

export const carRentalReducer = carRentalSlice.reducer;
export const { changeCarTypeFilter, changeCarTransmissionFilter, changeMinPrice, changeMaxPrice } = carRentalSlice.actions;
