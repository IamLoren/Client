import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Link, Outlet } from "react-router-dom";

const ClientPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="h-96 flex-1 secondary-background secondary-text p-4">
        <div className="flex px-[20px] py-[10px] pb-0 border-b border-b-blue-300">
        <Link to="/client" className="border border-blue-200 p-[10px]">
            Settings
          </Link>
          <Link to="history" className="border border-blue-200 p-[10px]">
            Orders History
          </Link>
          <Link to="favorites" className="border border-blue-200 p-[10px]">
            Favorites
          </Link>
          <Link to="notifications" className="border border-blue-200 p-[10px]">
            Notifications
          </Link>
        </div>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ClientPage;
