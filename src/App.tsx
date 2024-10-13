import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import { lazy, Suspense, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { isModalOpen, selectLoading } from "./redux/selectors";
import Modal from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import PrivateAdminRoute from "./routesConfig/PrivateAdminRoute";
import PrivateUserRoute from "./routesConfig/PrivatUserRoute";
import { refreshThunk } from "./redux/authSlice/operations";
import Loader from "./components/Loader/Loader";

const LazyHome = lazy(() => import("./pages/HomePage"));
const LazyClient = lazy(() => import("./pages/ClientPage"));
const LazyAdmin = lazy(() => import("./pages/AdminPage"));
const LazyError = lazy(() => import("./pages/ErrorPage"));

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isModal = useAppSelector(isModalOpen);
  const isLoader = useAppSelector(selectLoading);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(refreshThunk());
    }
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LazyHome />} />
        <Route
          path="/client"
          element={
            <PrivateUserRoute>
              <LazyClient />
            </PrivateUserRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <LazyAdmin />
            </PrivateAdminRoute>
          }
        />
        <Route path="*" element={<LazyError />} />
      </Routes>
      {isModal && <Modal />}
      <ToastContainer />
      {isLoader && <Loader/>}
    </Suspense>
  );
};

export default App;
