import React from 'react'

interface CardProperties {
    id: number,
    make: string,
    model: string,
    year: string,
    mileage: number,
    type: string,
    engeen: number,
    fuel: string,
    transmission: string,
    price: {hour: number, day: number},
    color: string,
    img: string,
    availability: {start: Date, end:Date}[] | [],
    scheduled_maintenance: string,
    removed: boolean
}

interface CardProps {
    carProps: CardProperties;
  }

const Card:React.FC<CardProps> = ({carProps}) => {
  const  {make, model, year, type, fuel, transmission, price, color, img, availability} = carProps
  return (
    <li className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
        <img src={img} className="aspect-video w-full object-cover" alt={model} />
  <div className="p-4">
    <p className="mb-1 text-sm text-primary-500">{make} <span>{model}</span></p>
    <h3 className="text-xl font-medium text-gray-900">{make} {model}</h3>
    <span>{type}</span><span>{year}</span>
    <p className="mt-1 text-gray-500">{availability.length === 0 ? "Free anytime for you!" : `The car cannot be rented from ${availability.map(rented => rented.start)}`}</p>
    <span>per hour: {price.hour} / per day: {price.day}</span>
    <div className="mt-4 flex gap-2">
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> {fuel} </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"> {transmission} </span>
    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"> {color} </span>
    </div>
  </div>
    </li>
  )
}

export default Card