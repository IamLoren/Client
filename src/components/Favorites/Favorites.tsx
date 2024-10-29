import React from 'react'
import { useAppSelector } from '../../hooks'
import { selectFavoriteCars } from '../../redux/selectors'
import Card from '../Card/Card';

const Favorites:React.FC = () => {
    const favorites = useAppSelector(selectFavoriteCars);
  return (
    <ul data-cy="favorite list" className='flex gap-[30px] p-[20px] flex-wrap'>{ favorites?.map((car) => {
        return <Card key={car._id} carProps={car} />;
      })}</ul>
  )
}

export default Favorites