import React from 'react'
import CardsList from '../CardList/CardsList'
import DateTime from '../DateTime/DateTime'
import Button from '../Button/Button'
import { HiArrowsUpDown } from "react-icons/hi2";

const Catalog:React.FC = () => {
  return (
    <div className='flex-grow'>
        <div className='flex w-[100%] justify-between mb-[30px]'>
            <DateTime />
            <Button type="button" buttonName=""><HiArrowsUpDown color="white"/></Button>
            <DateTime />
        </div>
        <CardsList/>
    </div>
  )
}

export default Catalog