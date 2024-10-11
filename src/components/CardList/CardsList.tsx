import React from 'react'
import Card from '../Card/Card'

const CardsList:React.FC = () => {

    const cars = [
        {
            id: 1,
            make: "Mercedes",
            model:"S 350 d 4MATIC",
            year: "2024",
            mileage: 1000,
            type:"sedan",
            engine: 4,
            fuel: "diesel",
            transmission:"manual",
            price: {"hour": 3, "day": 35},
            color:"green",
            img:"https://res.cloudinary.com/carsphoto/image/upload/v1728239023/cars/manufaktur_olive.webp",
            availability: [],
            scheduled_maintenance: new Date(),
            removed:false
        },
        {
            id: 2,
            make: "Mercedes",
            model:"GL 350 d AT 4MATIC",
            year: "2015",
            mileage: 150000,
            type:"crossover",
            engine: 3,
            fuel: "diesel",
            transmission:"automatic",
            price: {"hour": 2.5, "day": 30},
            color:"black",
            img:"https://res.cloudinary.com/carsphoto/image/upload/v1728239381/cars/GL-Class_350D_4Matic.jpg",
            availability: [{start: new Date, end: new Date('2024-10-20')}],
            scheduled_maintenance: new Date(),
            removed:false
        },
        {
            id: 3,
            make: "BMW",
            model:"i530",
            year: "2019",
            mileage: 10000,
            type:"sedan",
            engine: 2,
            fuel: "gasoline",
            transmission:"manual",
            price: {"hour": 3, "day": 35},
            color:"blue",
            img:"https://res.cloudinary.com/carsphoto/image/upload/v1728239585/cars/BMW_i530_blue.jpg",
            availability: [],
            scheduled_maintenance: new Date(),
            removed:false
        },
        {
            id: 4,
            make: "Mercedes",
            model:"S 350 d 4MATIC",
            year: "2024",
            mileage: 1000,
            type:"sedan",
            engine: 4,
            fuel: "diesel",
            transmission:"manual",
            price: {"hour": 3, "day": 35},
            color:"green",
            img:"https://res.cloudinary.com/carsphoto/image/upload/v1728239023/cars/manufaktur_olive.webp",
            availability: [],
            scheduled_maintenance: new Date(),
            removed:false
        }
    ]

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] gap-[29px] mb-[50px]">
        {cars.map(car => {
            return <Card key={car.id} carProps={car}/>
        })}
    </ul>
  )
}

export default CardsList