import React from "react";
import CardsList from "../CardList/CardsList";
import DateTime from "../DateTime/DateTime";
import Button from "../Button/Button";
import { HiArrowsUpDown } from "react-icons/hi2";
import useResponsive from "../../hooks";

const Catalog: React.FC = () => {
  const { isSM, isWideTablet} = useResponsive();
  return (
    <div className="flex-grow relative">
      <div className="flex w-[100%] md:mb-[20px] sm:gap-[10px] flex-col sm:flex-row sm:justify-between">
        <DateTime name="Pick-Up" />
        {isSM && (
          <Button type="button" buttonName="" style="h-[55px] self-center">
            <HiArrowsUpDown color="white" />
          </Button>
        )}
        {isWideTablet && <Button type="button" buttonName="" style="h-[55px] self-center">
            <HiArrowsUpDown color="white" />
          </Button>}
        <DateTime name="Drop-Off" />
      </div>
      <CardsList />
    </div>
  );
};

export default Catalog;
