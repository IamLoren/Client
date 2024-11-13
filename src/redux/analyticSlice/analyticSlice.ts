import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { CreateOrderResponse } from "../ordersSlice/ordersSliceType";

interface analyticStateTypes {
    selectedMonth: string;
    incomeOrders: CreateOrderResponse[];
    expensesOrders: CreateOrderResponse[];
}

const initialState:analyticStateTypes = {
  selectedMonth: "",
  incomeOrders: [],
  expensesOrders: [],
};

const analyticSlice = createSlice({
  name: "analytic",
  initialState,
  reducers: {
    changeSelectedMonth: (state:analyticStateTypes, action:PayloadAction<string>) => {
      state.selectedMonth = action.payload;
    },
    splitOrders: (state:analyticStateTypes, action:PayloadAction<{incomeOrders:CreateOrderResponse[], expensesOrders:CreateOrderResponse[]}>) => {
        state.incomeOrders = action.payload.incomeOrders;
        state.expensesOrders = action.payload.expensesOrders;
      },
  },
});

export const { changeSelectedMonth, splitOrders } = analyticSlice.actions;
export const analyticReducer = analyticSlice.reducer;
