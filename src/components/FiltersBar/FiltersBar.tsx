import React from 'react'
import TypeFilter from '../TypeFilter/TypeFilter';
import TransmissionFilter from '../TransmissionFilter/TransmissionFilter';
import PriceRangeSlider from '../PriceSlider/PriceSlider';

const FiltersBar: React.FC = () => {
  return (
    <div className=' flex flex-col gap-[30px] w-[300px] primary-background rounded-lg p-[20px] box-shadow'>
      <div className='sticky top-[90px]'>
        <TypeFilter/>
      <TransmissionFilter />
      <PriceRangeSlider />
      </div>
      
    </div>
  )
}

export default FiltersBar;