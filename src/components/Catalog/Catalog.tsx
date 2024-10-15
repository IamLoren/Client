import React from 'react'
import CardsList from '../CardList/CardsList'
import DateTime from '../DateTime/DateTime'
import Button from '../Button/Button'

const Catalog:React.FC = () => {
  return (
    <div className='flex-grow'>
        <div className='flex w-[100%] justify-between mb-[30px]'>
            <DateTime />
            <Button type="button" buttonName="" />
            <DateTime />
        </div>
        <CardsList/>
    </div>
  )
}

export default Catalog