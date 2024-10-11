import React from 'react'

const NotAvailable:React.FC<{availability:{ start: Date; end: Date }[] | []}> = ({availability}) => {
   
  return (
    <p className='border-[2px] border-red-600 rounded-md p-[10px]'>This car is not available for rent  {availability.map((period, index) => {
        return <span key={index}> <span className='accent-text'>from</span> {period.start.toLocaleDateString()} <span className='accent-text '>to</span>  {period.end.toLocaleDateString()}</span>
    })}</p>
  )
}

export default NotAvailable