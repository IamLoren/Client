import { CarInterface } from "../carRentalSlice/carRentalSliceTypes";

export interface StateType {
  user: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: null | "admin" | "user";
    avatarURL: string;
    theme: "light" | "dark";
    favorites: CarInterface[] | [];
    ordersHistory: [];
  };
  token: string;
  isLogged: boolean;
  isLoading: boolean;
  isRefresh: boolean;
  isError: null;
}

export interface RegTypes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface RegResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "admin" | "user";
  };
}

export interface refreshData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarURL: string;
  theme: "light" | "dark";
  role: "admin" | "user";
  token: string;
}

export interface loginData {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    theme: "light" | "dark";
    avatarURL: string;
    role: "admin" | "user";
  };
}
