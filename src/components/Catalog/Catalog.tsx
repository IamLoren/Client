import React from 'react'
import CardsList from '../CardList/CardsList'
import DateTime from '../DateTime/DateTime'
import Button from '../Button/Button'
import { HiArrowsUpDown } from "react-icons/hi2";

const Catalog:React.FC = () => {
  return (
    <div className='flex-grow'>
        <div className='flex w-[100%] justify-between mb-[30px]'>
            <DateTime name="Pick-Up"/>
            <Button type="button" buttonName="" style="h-[55px] self-center" ><HiArrowsUpDown color="white"/></Button>
            <DateTime name="Drop-Off"/>
        </div>
        <CardsList/>
    </div>
  )
}

export default Catalog