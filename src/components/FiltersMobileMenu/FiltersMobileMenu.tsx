import React from "react";
import { IoFilterSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { openMobailMenu } from "../../redux/modalSlice/modalSlice";
import { selectMobileMenu } from "../../redux/selectors";

const FiltersMobileMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMobileMenu = useAppSelector(selectMobileMenu);

  const handleClick = () => {
    dispatch(openMobailMenu(!isMobileMenu));
  };
  return (
    <div className="self-center mr-[10px]">
      <IoFilterSharp onClick={handleClick} size={20} />
    </div>
  );
};

export default FiltersMobileMenu;
