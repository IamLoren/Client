import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectUserIMG } from "../../redux/selectors";
import Driver from "../../img/driver-avatar.avif";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { openLogoutForm, openModal } from "../../redux/modalSlice/modalSlice";

const UserPanel: React.FC = () => {
  const dispatch = useAppDispatch();

  let userPhoto = useAppSelector(selectUserIMG);
  if (!userPhoto) {
    userPhoto = Driver;
  }

  const handleClickLogout = () => {
    dispatch(openModal());
    dispatch(openLogoutForm());
  };
  return (
    <div className="flex gap-[40px] ">
      {/* <ThemeToggler/> */}
      <Link to="/client/notifications" className="flex justify-center w-[50px] h-[50px] self-center border-[2px] border-color rounded-[50%]">
        <IoIosNotifications style={{ fontSize: "30px", alignSelf:"center" }} />
      </Link>
      <Link to="/client" className=" flex justify-center w-[50px] h-[50px] self-center border-[2px] border-color rounded-[50%]">
        <IoSettingsSharp style={{ fontSize: "30px", alignSelf:"center" }} />
      </Link>
      <div className="relative">
        <div className=" relative z-1 w-[50px] h-[50px] overflow-hidden border-[2px] border-color rounded-[50%]">
          <img
            src={userPhoto}
            alt="personal user photo"
            width={50}
            height={30}
          />
        </div>
        <button
          onClick={handleClickLogout}
          className="absolute bottom-0 right-0 opacity-0 hidden"
        >
          <IoExitOutline style={{ fontSize: "30px" }} />
        </button>
      </div>
    </div>
  );
};

export default UserPanel;
