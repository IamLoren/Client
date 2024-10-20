import { createSlice } from "@reduxjs/toolkit";
import { CarInterface, CarsStateType } from "./carRentalSliceTypes";
import { getAllCarsThunk } from "./operations";
import { toast } from "react-toastify";

const initialState: CarsStateType = {
  cars: [],
  userListOfCars: [],
  carTypeFilter: [],
  carTransmissionFilter: [],
  selectedMinPrice: 0,
  selectedMaxPrice: 0,
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
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
      { payload }: { payload: number }
    ) => {
      state.selectedMinPrice = payload;
    },
    changeMaxPrice: (
      state: CarsStateType,
      { payload }: { payload: number }
    ) => {
      state.selectedMaxPrice = payload;
    },
    setRentalTime: (
      state: CarsStateType,
      { payload }: { payload: { name: string; time: string } }
    ) => {
      if (payload.name === "Pick-Up") {
        state.startDate = payload.time;
      }
      if (payload.name === "Drop-Off") {
        state.endDate = payload.time;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarsThunk.pending, (state: CarsStateType) => {
        state.isLoading = true;
      })
      .addCase(
        getAllCarsThunk.fulfilled,
        (state: CarsStateType, { payload }:{payload: {data:CarInterface[], minPrice: number, maxPrice:number }}) => {
          state.cars = payload.data;
          state.userListOfCars = payload.data.filter(
            (car) => car.isRemoved === false
          );
          state.selectedMinPrice = payload.minPrice;
          state.selectedMaxPrice = payload.maxPrice;
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
export const {
  changeCarTypeFilter,
  changeCarTransmissionFilter,
  changeMinPrice,
  changeMaxPrice,
  setRentalTime
} = carRentalSlice.actions;
