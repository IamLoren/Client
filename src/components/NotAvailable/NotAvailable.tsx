import React from 'react'

const NotAvailable:React.FC<{availability:{ start: Date; end: Date }[] | []}> = ({availability}) => {
   
  return (
    <p className='border-[2px] border-red-600 rounded-md p-[5px] text-sm'>This car is not available for rent <br /> {availability.map((period, index) => {
        return <span key={index}> <span className='accent-text font-bold'>from</span> {period.start.toLocaleDateString()} <br /> <span className='accent-text font-bold'>to</span>  {period.end.toLocaleDateString()}</span>
    })}</p>
  )
}

export default NotAvailable