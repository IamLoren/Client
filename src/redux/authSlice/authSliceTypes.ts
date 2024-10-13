export interface StateType {
  user: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: null | "admin" | "user";
    avatarURL: string;
    theme: "light" | "dark";
    favorites: [];
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
