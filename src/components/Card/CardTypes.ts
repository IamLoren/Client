interface CardProperties {
    id: number;
    make: string;
    model: string;
    year: string;
    mileage: number;
    type: string;
    engine: number;
    fuel: string;
    transmission: string;
    price: { hour: number; day: number };
    color: string;
    img: string;
    availability: { start: Date; end: Date }[] | [];
    scheduled_maintenance: Date;
    removed: boolean;
  }
  
  export interface CardProps {
    carProps: CardProperties;
  }