import { RootState } from "./store";


export const isModalOpen = (state: RootState) => state.modal.isOpen; 
export const isSignUpForm = (state: RootState) => state.modal.isSignUpForm;
export const isSignInForm = (state: RootState) => state.modal.isSignInForm;
export const isLogoutForm = (state: RootState) => state.modal.isLogoutForm;
export const isRentalCarForm = (state: RootState) => state.modal.isRentalCarForm;
export const selectIsLogged = (state: RootState) => state.auth.isLogged;
export const selectRole = (state: RootState) => state.auth.user.role;
export const selectLoading = (state: RootState) => state.auth.isLoading;
export const selectAllCars = (state: RootState) => state.cars.cars;
export const selectUserListOfCars  = (state: RootState) => state.cars.userListOfCars;
export const selectCarTypeFilter = (state: RootState) => state.cars.carTypeFilter;
export const selectedTransmissionType = (state: RootState) => state.cars.carTransmissionFilter;
export const selectFavoriteCars = (state: RootState) => state.auth.user.favorites;
export const selectUserIMG = (state: RootState) => state.auth.user.avatarURL;
export const selectMinPrice = (state: RootState) => state.cars.selectedMinPrice;
export const selectMaxPrice = (state: RootState) => state.cars.selectedMaxPrice;
export const selectTheme = (state: RootState) => state.auth.user.theme;
export const selectStartRentalDate = (state: RootState) => state.cars.startDate;
export const selectEndRentalDate = (state: RootState) => state.cars.endDate;
export const selectMobileMenu = (state: RootState) => state.modal.isMobileMenuOpen;
export const userData = (state: RootState) => state.auth.user;
export const getSelectedCar = (state: RootState) => state.cars.selectedCar;
export const selectActiveOrders = (state:RootState) => state.orders.activeOrders;
export const selectAllOrders = (state:RootState) => state.orders.allCompanyOrders;
export const selectAllUsers = (state:RootState) => state.admin.usersList;
export const selectAdminSearchResult = (state:RootState) => state.admin.adminSearchResult;