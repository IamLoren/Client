import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import { BsFuelPump } from "react-icons/bs";
import { TbSteeringWheel } from "react-icons/tb";
import Button from "../Button/Button";
import NotAvailable from "../NotAvailable/NotAvailable";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectFavoriteCars, selectIsLogged } from "../../redux/selectors";
import { updateFavoriteList } from "../../redux/authSlice/operations";
import {
  openModal,
  openRentalCArForm,
} from "../../redux/modalSlice/modalSlice";
import { changeSelectedCar } from "../../redux/carRentalSlice/carRentalSlice";
import { toast } from "react-toastify";
import { CarInterface } from "../../redux/carRentalSlice/carRentalSliceTypes";

const Card: React.FC<{carProps:CarInterface}> = ({ carProps }) => {
  const {
    _id,
    make,
    model,
    year,
    type,
    fuel,
    transmission,
    price,
    color,
    img,
    availability,
  } = carProps;
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(selectFavoriteCars);
  const isLogged = useAppSelector(selectIsLogged);
  const [isFavorite, setIsFavorite] = useState(() =>
    favoriteList?.some((car) => car._id === _id)
  );

  const handleFavoriteClick = () => {
    if (isLogged) {
      setIsFavorite(!isFavorite);
      dispatch(updateFavoriteList(carProps));
    }
  };

  const handleButtonClick = () => {
    if (!isLogged) {
      toast.success(`You should sign up or sign in to rent a car`);
    } else if (isLogged) {
      dispatch(changeSelectedCar(carProps));
      dispatch(openModal());
      dispatch(openRentalCArForm());
    }
  };

  return (
    <li className="relative flex flex-col x-auto w-[100%] max-w-[320px] primary-background overflow-hidden rounded-lg bg-white box-shadow">
      <div className="h-[150px] md:h-[180px] overflow-hidden">
        <img
          src={img}
          className="aspect-video w-[100%] object-cover scale-110 hover:scale-100 transition duration-300 ease-in-out"
          alt={model}
        />
      </div>
      <span
        role="button"
        tabIndex={0}
        aria-label="press to add this car to favorites"
        className="absolute top-[20px] right-[20px]"
        data-tooltip-id={`${_id}-tooltip`}
        data-tooltip-content={
          isFavorite && isLogged
            ? "Remove from favorites"
            : !isFavorite && isLogged
            ? "Add to favorites"
            : "Please sign up or log in to be able to add a car"
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleFavoriteClick()
          }}}
      >
        <Tooltip id={`${_id.toString()}-tooltip`} />
        <FiHeart
          className=""
          size="25px"
          onClick={handleFavoriteClick}
          style={{
            fill: isFavorite ? "red" : "transparent",
            color: isFavorite ? "red" : "gray",
          }}
        />
      </span>
      <div className=" p-[10px] md:p-[15px]">
        <h3 className="mb-[10px] text-md sm:text-xl font-medium primary-text">
          {make} {model}
        </h3>
        <div className="flex justify-between">
          <span>{type}</span>
          <span>{year}</span>
        </div>
        <div className="mb-2">
          {availability?.length === 0 && (
            <span className="mb-1 text-sm text-green-700">
              "Available at any time for you!"
            </span>
          ) } 
          {(availability && availability.length >0) && (
            <NotAvailable availability={availability} />
          )}
        </div>

        <div className="flex flex-col items-start md:flex-row gap-2">
          <span className="w-[100px] inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold secondary-text">
            <BsFuelPump /> {fuel}{" "}
          </span>
          <span className=" w-[100px] inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold secondary-text">
            <TbSteeringWheel /> {transmission}{" "}
          </span>
          <span className=" w-[100px] inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold secondary-text">
            Color {color}{" "}
          </span>
        </div>
      </div>
      <div className="flex justify-between pr-[16px] pb-[16px] pl-[16px] last:mt-auto">
        <span className="text-sm md:text-[15px]">
          <span className="block">per hour: {price.hour}$</span>
          <span className="block">per day: {price.day}$</span>
        </span>
        <Button
          type="button"
          buttonName="Rent now"
          ariaLabel="create Order"
          onClick={handleButtonClick}
        />
      </div>
    </li>
  );
};

export default Card;
