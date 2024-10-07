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
    scheduled_maintenance: Date,
    removed: boolean
}

const Card = ({car}:{CardProperties}) => {
  const  {id, make, model, year, type, fuel, transmission, price, color, img, availability} = car
  return (
    <li className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
        <img src={img} className="aspect-video w-full object-cover" alt={model} />
  <div className="p-4">
    <p className="mb-1 text-sm text-primary-500">Andrea Felsted • <time>18 Nov 2022</time></p>
    <h3 className="text-xl font-medium text-gray-900">Migrating to Sailboat UI</h3>
    <p className="mt-1 text-gray-500">Sailboat UI is a modern UI component library for Tailwind CSS. Get started with 150+ open source components.</p>
    <div className="mt-4 flex gap-2">
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> Design </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"> Product </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600"> Develop </span>
    </div>
  </div>
    </li>
  )
}

export default Card