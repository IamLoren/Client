import React from 'react'

const NotAvailable:React.FC<{availability:{orderId: string, startDate: string; endDate: string }[] | []}> = ({availability}) => {
   
  return (
    <p className='border-[2px] border-red-600 rounded-md p-[5px] text-sm'>This car is not available for rent <br /> {availability.map((period) => {
        return <span key={period.orderId}><span className='accent-text font-bold'>from</span> {new Date(period.startDate).toLocaleDateString()} <span className='accent-text font-bold'>to </span>{new Date(period.endDate).toLocaleDateString()}<br /></span> 
    })}</p>
  )
}

export default NotAvailable