import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import { CreateOrderResponse, GetAllOrdersType, OrdersStateType } from "./ordersSliceType";
import { createOrderThunk, getAllOrdersThunk } from "./operations";

const initialState: OrdersStateType = {
    userOrdersHistory: [],
    activeOrders: [],
    allCompanyOrders: []
  };

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder
        // .addCase(createOrderThunk.pending, (state: OrdersStateType) => {

        // })
        .addCase(createOrderThunk.fulfilled, (state: OrdersStateType,  action: PayloadAction<CreateOrderResponse>) => {
            console.log(action.payload);
            if(action.payload.createdBy === "user") {
                state.userOrdersHistory.push(action.payload)
            } else if (action.payload.createdBy === "admin") {
                state.activeOrders.push(action.payload)
            }
        })
        .addCase(getAllOrdersThunk.fulfilled, (state: OrdersStateType,  action: PayloadAction<GetAllOrdersType>) => {
            state.allCompanyOrders = action.payload.orders;
            state.activeOrders = action.payload.orders.filter(order => order.orderStatus=== "active") 
        })
    }
});

export const ordersReducer = ordersSlice.reducer;
// export const {} = ordersSlice.actions;
