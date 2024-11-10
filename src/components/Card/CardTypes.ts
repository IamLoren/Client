interface CardProperties {
    _id: string;
    make: string;
    model: string;
    year: string;
    type: string;
    engine: number;
    fuel: "diesel" | "gasoline" | "electric" | "hybrid";
    transmission: "manual" | "automatic";
    price: { hour: number; day: number };
    color: string;
    img: string;
    availability: [{ orderId: string; startDate: string; endDate: string; }] | [];
    isRemoved: boolean;
  }
  
  export interface CardProps {
    carProps: CardProperties;
  }