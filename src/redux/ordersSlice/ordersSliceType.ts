export interface OrdersStateType {
    userOrdersHistory: CreateOrderResponse[],
    activeOrders: CreateOrderResponse[]
}

export type OrderTypes = 
  | {
      carId: string;
      userId: string;
      carName: string;
      userRole: "user";
      orderType: "rent";
      phoneNumber: string;
      startDate: string;
      endDate: string;
    }
  | {
      carId: string;
      userId: string;
      carName: string;
      userRole: "admin";
      orderType: "oil change" | "repair" | "maintenance" | "insurance" | "rent";
      phoneNumber: string;
      startDate: string;
      endDate: string;
    };

export interface CreateOrderResponse {
    createdBy: "user" | "admin";
    carId: string;
    clientId: string;
    orderType: "rent";
    phoneNumber: string;
    clientEmail: string;
    time: {startDate: string,
    endDate: string};
    cost: number;
    status: "active" | "inProgress" | "completed";
    adminApprove: boolean;
}