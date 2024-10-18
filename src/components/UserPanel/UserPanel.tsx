import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectTheme, selectUserIMG } from "../../redux/selectors";
import Driver from "../../img/driver-avatar.avif";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { openLogoutForm, openModal } from "../../redux/modalSlice/modalSlice";
import { changeTheme } from "../../redux/authSlice/authSlice";

const UserPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedMode = useAppSelector(selectTheme)
  const [isChecked, setIsChecked] = useState(selectedMode==="light" ? false : true)

  let userPhoto = useAppSelector(selectUserIMG);
  if (!userPhoto) {
    userPhoto = Driver;
  }

  const handleClickLogout = () => {
    dispatch(openModal());
    dispatch(openLogoutForm());
  };

  const toggleDarkMode = (checked: boolean) => {
    console.log(checked)
    if(checked) {
        dispatch(changeTheme("dark"))
        document.body.classList.add('dark-mode')
    } else {
        dispatch(changeTheme("light"))
        document.body.classList.remove('dark-mode')
    }
    setIsChecked(checked)
  };
  return (
    <div className="flex gap-[20px] ">
        <div className="pt-[8px] flex justify-center self-center w-[50px] h-[50px] border-[2px] border-color rounded-[50%]">
            <DarkModeSwitch
      style={{ marginBottom: '2rem'}}
      checked={isChecked} 
      onChange={toggleDarkMode}
      size={30} />
        </div>
      <Link
        to="/client/notifications"
        className="flex justify-center w-[50px] h-[50px] self-center border-[2px] border-color rounded-[50%]"
      >
        <IoIosNotifications style={{ fontSize: "30px", alignSelf: "center" }} />
      </Link>
      <Link
        to="/client"
        className=" flex justify-center w-[50px] h-[50px] self-center border-[2px] border-color rounded-[50%]"
      >
        <IoSettingsSharp style={{ fontSize: "30px", alignSelf: "center" }} />
      </Link>

      <div className="m-0 z-1 w-[50px] h-[50px] self-center overflow-hidden border-[2px] border-color rounded-[50%]">
        <img src={userPhoto} alt="personal user photo" width={50} height={30} />
      </div>
      <button
          onClick={handleClickLogout}
        >
          <IoExitOutline style={{ fontSize: "30px" }} />
        </button>
    </div>
  );
};

export default UserPanel;
