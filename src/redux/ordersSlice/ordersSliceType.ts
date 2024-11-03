export interface OrdersStateType {
  userOrdersHistory: CreateOrderResponse[];
  activeOrders: CreateOrderResponse[];
}

export type OrderTypes =
  | {
      carId: string;
      clientId: string;
      carName: string;
      userRole: "user";
      orderType: "rent";
      phoneNumber: string;
      clientEmail: string;
      time: {
        startDate: string;
        endDate: string;
      };
      cost: number;
    }
  | {
      carId: string;
      clientId: string;
      carName: string;
      userRole: "admin";
      orderType: "oil change" | "repair" | "maintenance" | "insurance" | "rent";
      phoneNumber: string;
      clientEmail: string;
      time: {
        startDate: string;
        endDate: string;
      };
      cost: number;
    };

    export type CreateOrderRequest = {
        carId: string;
        clientId: string;
        userRole: "user" | "admin";
        orderType: "rent" | "oil change" | "repair" | "maintenance" | "insurance";
        phoneNumber: string;
        clientEmail: string;
        time: {
          startDate: string;
          endDate: string;
        };
        cost: number;
      };
      
      export interface CreateOrderResponse {
        createdBy: "user" | "admin";
        carId: string;
        clientId: string;
        orderType: "rent" | "oil change" | "repair" | "maintenance" | "insurance";
        phoneNumber: string;
        clientEmail: string;
        time: { startDate: string; endDate: string };
        cost: number;
        status: "active" | "inProgress" | "completed";
        adminApprove: boolean;
      }
      
