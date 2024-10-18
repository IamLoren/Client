import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectTheme, selectUserIMG } from "../../redux/selectors";
import Driver from "../../assets/img/driver-avatar.avif";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { openLogoutForm, openModal } from "../../redux/modalSlice/modalSlice";
import { changeTheme } from "../../redux/authSlice/authSlice";

const UserPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedMode = useAppSelector(selectTheme);
  const [isChecked, setIsChecked] = useState(
    selectedMode === "light" ? false : true
  );

  let userPhoto = useAppSelector(selectUserIMG);
  if (!userPhoto) {
    userPhoto = Driver;
  }

  const handleClickLogout = () => {
    dispatch(openModal());
    dispatch(openLogoutForm());
  };

  const toggleDarkMode = (checked: boolean) => {
    console.log(checked);
    if (checked) {
      dispatch(changeTheme("dark"));
      document.body.classList.add("dark-mode");
    } else {
      dispatch(changeTheme("light"));
      document.body.classList.remove("dark-mode");
    }
    setIsChecked(checked);
  };

  const commonStyles =
    "flex justify-center self-center w-[20px] md:w-[30px] lg:w-[40px] xl:w-[50px] h-[20px] md:h-[30px] lg:h-[40px] xl:h-[50px] border-[2px] border-color rounded-[50%]";
  return (
    <div className="flex gap-[20px]">
      <div className={` relative ${commonStyles} content-center lg:pt-[8px]`}>
        <DarkModeSwitch
          style={{ marginBottom: "2rem" }}
          checked={isChecked}
          onChange={toggleDarkMode}
          size={25}
          className="w-[15px] md:w-[25px] absolute top-[-5px] md:top-0 lg:top-[11px]"
        />
      </div>
      <Link to="/client/notifications" className={`${commonStyles}`}>
        <IoIosNotifications style={{ fontSize: "30px", alignSelf: "center" }} />
      </Link>
      <Link to="/client" className={`${commonStyles}`}>
        <IoSettingsSharp style={{ fontSize: "30px", alignSelf: "center" }} />
      </Link>

      <div className={`${commonStyles} overflow-hidden`}>
        <img
          src={userPhoto}
          alt="personal user photo"
          className="w-[30px] md:w-[50px] object-cover"
        />
      </div>
      <button
        onClick={handleClickLogout}
        className="flex justify-center content-center "
      >
        <IoExitOutline
          style={{ fontSize: "40px" }}
          className="w-[20px] md:w-[30px] lg:h-[40px] self-center"
        />
      </button>
    </div>
  );
};

export default UserPanel;
