import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Link, Outlet } from "react-router-dom";

const ClientPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-1 secondary-background secondary-text p-4">
          <nav className="flex flex-wrap px-[20px] py-[10px] mb-[10px]">
            <Link to="/client" className="w-[124px] flex justify-center border border-blue-200 p-[10px]">
            Settings
          </Link>
          <Link to="history" className="w-[124px] flex justify-center border border-blue-200 p-[10px]">
            Orders History
          </Link>
          <Link to="favorites" className="w-[124px] flex justify-center border border-blue-200 p-[10px]">
            Favorites
          </Link>
          <Link to="notifications" className="w-[124px] flex justify-center border border-blue-200 p-[10px]">
            Notifications
          </Link>
          </nav> 
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ClientPage;
