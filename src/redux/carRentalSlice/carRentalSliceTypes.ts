export interface CarInterface {
  price: {
    hour: number;
    day: number;
  };
  _id: string;
  make: string;
  model: string;
  year: string;
  type: string;
  engine: number;
  fuel: "diesel" | "gasoline" | "electric" | "hybrid";
  transmission: "manual" | "automatic";
  color: string;
  img: string;
  availability?: [{orderId: string, startDate: string, endDate:string}] |[];
  isRemoved: boolean;
}

export interface CarsStateType {
  cars: CarInterface[];
  userListOfCars: CarInterface[];
  carTypeFilter: string[];
  carTransmissionFilter: string[];
  selectedMinPrice: number,
  selectedMaxPrice: number,
  startDate: string ,
  endDate: string ,
  selectedCar: CarInterface | null,
  isLoading: boolean;
}
