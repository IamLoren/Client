interface CardProperties {
    _id: string;
    make: string;
    model: string;
    year: string;
    type: string;
    engine: number;
    fuel: string;
    transmission: string;
    price: { hour: number; day: number };
    color: string;
    img: string;
    availability: { start: Date; end: Date }[] | [];
    isRemoved: boolean;
  }
  
  export interface CardProps {
    carProps: CardProperties;
  }