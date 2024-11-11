export interface OrdersStateType {
  userOrdersHistory: CreateOrderResponse[];
  activeOrders: CreateOrderResponse[];
  allCompanyOrders: CreateOrderResponse[];
  orderForChanging: CreateOrderResponse | null;
  notificationOrders:
    | CreateOrderResponse[]
    | {
        approvedOrders: CreateOrderResponse[];
        endedOrders: CreateOrderResponse[];
      };
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
      orderStatus: "active" | "inProgress" | "completed";
      phoneNumber: string;
      clientEmail: string;
      time: {
        startDate: string;
        endDate: string;
      };
      cost: number;
      adminApprove: boolean;
      additionally: string
    };

export type CreateOrderRequest = {
  carId: string;
  clientId: string;
  createdBy: "user" | "admin";
  orderType: "rent" | "oil change" | "repair" | "maintenance" | "insurance";
  phoneNumber: string;
  clientEmail: string;
  orderStatus?: "active" | "inProgress" | "completed";
  time: {
    startDate: string;
    endDate: string;
  };
  cost: number;
  adminApprove?: boolean;
  additionally?: string
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
  orderStatus: "active" | "inProgress" | "completed";
  adminApprove: boolean;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  additionally: string
}

export interface GetAllOrdersType {
  orders: CreateOrderResponse[];
}

export type orderToUpdateTypes =
  | {
      carId?: string;
      clientId?: string;
      carName?: string;
      userRole?: "user";
      orderType?: "rent";
      phoneNumber?: string;
      clientEmail?: string;
      time?: {
        startDate: string;
        endDate: string;
      };
      cost?: number;
      createdBy: boolean;
    }
  | {
      carId?: string;
      clientId?: string;
      carName?: string;
      userRole?: "admin";
      orderType?:
        | "oil change"
        | "repair"
        | "maintenance"
        | "insurance"
        | "rent";
      orderStatus?: "active" | "inProgress" | "completed";
      phoneNumber?: string;
      clientEmail?: string;
      time?: {
        startDate: string;
        endDate: string;
      };
      cost?: number;
      adminApprove?: boolean;
      createdBy: "admin" | "user";
    };
