export interface StateType {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    role: null | "admin" | "user";
    avatarURL: string;
    registrationDate: string | Date;
    theme: string;
    favorites: [];
    ordersHistory: [];
    verify: boolean;
    verificationToken: string;
    //   language:
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
