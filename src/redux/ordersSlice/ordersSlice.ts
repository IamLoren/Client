import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CreateOrderResponse, GetAllOrdersType, OrdersStateType } from "./ordersSliceType";
import { createOrderThunk, getAllOrdersThunk, getClientHistory, searchNotificationThunk, updateOrderThunk } from "./operations";

const initialState: OrdersStateType = {
    userOrdersHistory: [],
    activeOrders: [],
    allCompanyOrders: [],
    orderForChanging: null,
    notificationOrders: []
  };

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers : {
        selectOrderForChanging: (state, action:PayloadAction<CreateOrderResponse>) => {
            state.orderForChanging = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder
        // .addCase(createOrderThunk.pending, (state: OrdersStateType) => {

        // })
        .addCase(createOrderThunk.fulfilled, (state: OrdersStateType,  action: PayloadAction<CreateOrderResponse>) => {
            toast.success("You have successfully submitted a car rental request. Our manager will contact you within 10 minutes.")
            if(action.payload.createdBy === "user") {
                state.userOrdersHistory.push(action.payload)
            } else if (action.payload.createdBy === "admin") {
                state.activeOrders.push(action.payload)
            }
        })
        .addCase(getAllOrdersThunk.fulfilled, (state: OrdersStateType,  action: PayloadAction<GetAllOrdersType>) => {
            state.allCompanyOrders = action.payload.orders;
            state.activeOrders = action.payload.orders.filter(order => order.orderStatus=== "active" && order.adminApprove === false) 
        })
        .addCase(updateOrderThunk.fulfilled, (state: OrdersStateType, action) => {
            toast.success("Data in DB were updated successfully");
            state.allCompanyOrders = state.allCompanyOrders.map(order =>
                order._id === action.payload.updatedOrder._id ? action.payload.updatedOrder : order
            );
            state.activeOrders = state.activeOrders.filter(order => order._id !== action.payload.updatedOrder._id);
        })
        .addCase(searchNotificationThunk.fulfilled, (state: OrdersStateType,  action: PayloadAction<GetAllOrdersType>) => {
            state.notificationOrders = action.payload.orders;
        })
        .addCase(getClientHistory.fulfilled, (state: OrdersStateType,  action: PayloadAction<GetAllOrdersType>) => {
            state.userOrdersHistory = action.payload.orders;
        })
    }
});

export const ordersReducer = ordersSlice.reducer;
export const {selectOrderForChanging} = ordersSlice.actions;
