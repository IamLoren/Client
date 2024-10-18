import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { openMobailMenu } from "../../redux/modalSlice/modalSlice";
import { selectMobileMenu } from "../../redux/selectors";
import TypeFilter from "../TypeFilter/TypeFilter";
import TransmissionFilter from "../TransmissionFilter/TransmissionFilter";
import PriceRangeSlider from "../PriceSlider/PriceSlider";

const MobileFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectMobileMenu);

  const handleClose = () => {
    dispatch(openMobailMenu(false));
  };
  return (
    <div
      className={`fixed left-0 bottom-0 w-[80%] h-100vh-minus-86px primary-background translate-x-[-100%] transition-transform duration-250 ease-in-out ${
        isOpen && "translate-x-[0]"
      }`}
    >
      <button
        onClick={handleClose}
        className="absolute top-[20px] right-[20px] outline-0 primary-text"
      >
        <MdOutlineClose />
      </button>
      <div className="">
        <TypeFilter />
        <TransmissionFilter />
        <PriceRangeSlider />
      </div>
    </div>
  );
};

export default MobileFilters;
