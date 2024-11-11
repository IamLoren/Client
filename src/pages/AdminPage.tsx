import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import {  Outlet } from "react-router-dom";
import { getAllOrdersThunk, searchNotificationThunk } from "../redux/ordersSlice/operations";
import { useAppDispatch } from "../hooks";
import AdminNavigation from "../components/AdminNavigation/AdminNavigation";
import { getAllUsers } from "../redux/adminSlice/operations";
import { getAllCarsThunk } from "../redux/carRentalSlice/operations";

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllOrdersThunk());
    dispatch(getAllUsers());
    dispatch(getAllCarsThunk());
    dispatch(searchNotificationThunk());
    const id = setInterval(() => {
      dispatch(searchNotificationThunk());
    }, 300000);
    return () => {
      clearInterval(id);
    };
  }, [dispatch]);

  return (
    <>
      <main className="flex-1 flex flex-col sm:flex-row primary-background secondary-text">
        <AdminNavigation />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
