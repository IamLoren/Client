import React from "react";
import { FiHeart } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import { BsFuelPump } from "react-icons/bs";
import { TbSteeringWheel } from "react-icons/tb";
import Button from "../Button/Button";
import NotAvailable from "../NotAvailable/NotAvailable";
import { CardProps } from "./CardTypes";

const Card: React.FC<CardProps> = ({ carProps }) => {
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

  const isFavorite = false;
  const isAutorized = false;
  //   const handleFavoriteClick = () => {
  //     if (isFavorite) {
  //       dispatch(deleteFavoriteCar(id));
  //     } else {
  //       dispatch(addFavoriteCar(car));
  //     }
  //     setIsFavorite(!isFavorite);
  //   };

  const handleButtonClick = () => {
    if (!isAutorized) {
      //Перевести isModalOpen в true
      // Вміст: Вам слід авторизуватися для можливості оренди авто
    } else if (isAutorized) {
      //Перевести isModalOpen в true
      // Вміст: форма для замовлення авто
    }
  };

  return (
    <li className="relative flex flex-col x-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
      <span
        className="absolute top-[20px] right-[20px]"
        data-tooltip-id={`${_id}-tooltip`}
        data-tooltip-content={
          isFavorite ? "Remove from favorites" : "Add to favorites"
        }
      >
        <Tooltip id={`${_id.toString()}-tooltip`} />
        <FiHeart
          className=""
          size="25px"
          //   onClick={handleFavoriteClick}
          style={{
            fill: isFavorite ? "red" : "transparent",
            color: isFavorite ? "red" : "gray",
          }}
        />
      </span>

      <img src={img} className="aspect-video w-full object-cover" alt={model} />
      <div className="p-4">
        <h3 className="h-[56px] text-xl font-medium primary-text">
          {make} {model}
        </h3>
        <div className="flex justify-between">
          <span>{type}</span>
          <span>{year}</span>
        </div>
        <div className="mt-1">
          {availability.length === 0 ? (
            <span className="mt-1 text-green-700">
              "Available at any time for you!"
            </span>
          ) : (
            <NotAvailable availability={availability} />
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            <BsFuelPump /> {fuel}{" "}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
            <TbSteeringWheel /> {transmission}{" "}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
            Color {color}{" "}
          </span>
        </div>
      </div>
      <div className="flex justify-between pr-[16px] pb-[16px] pl-[16px] last:mt-auto">
        <span>
          <span className="block">per hour: {price.hour}$</span>
          <span className="block">per day: {price.day}$</span>
        </span>
        <Button type="button" buttonName="Rent now" onClick={handleButtonClick} />
      </div>
    </li>
  );
};

export default Card;
