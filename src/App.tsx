import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import { lazy, LazyExoticComponent, Suspense, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { isModalOpen, selectLoading } from "./redux/selectors";
import Modal from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import PrivateAdminRoute from "./routesConfig/PrivateAdminRoute";
import PrivateUserRoute from "./routesConfig/PrivatUserRoute";
import { refreshThunk } from "./redux/authSlice/operations";
import Loader from "./components/Loader/Loader";
import ClientsHistory from "./components/ClientsHistory/ClientsHistory";
import Favorites from "./components/Favorites/Favorites";
import Notifications from "./components/Notifications/Notifications";
import UserSettings from "./components/UserSettings/UserSettings";
import ActiveOrders from "./components/ActiveOrders/ActiveOrders";
import OrdersList from "./components/OrdersList/OrdersList";

const LazyHome: LazyExoticComponent<React.FC> = lazy(() => import("./pages/HomePage"));
const LazyClient: LazyExoticComponent<React.FC> = lazy(() => import("./pages/ClientPage"));
const LazyAdmin: LazyExoticComponent<React.FC> = lazy(() => import("./pages/AdminPage"));
const LazyError: LazyExoticComponent<React.FC> = lazy(() => import("./pages/ErrorPage"));

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
        > 
        <Route path="settings" element={<UserSettings/>}/>
        <Route path="history" element={<ClientsHistory/>}/>
        <Route path="favorites" element={<Favorites/>}/>
        <Route path="notifications" element={<Notifications/>}/>
        </Route>
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <LazyAdmin />
            </PrivateAdminRoute>
          }
        >
          <Route path="settings" element={<UserSettings/>}/>
        <Route path="history" element={<OrdersList/>}/>
        <Route path="active" element={<ActiveOrders/>}/>
        <Route path="notifications" element={<Notifications/>}/>
        </Route>
        <Route path="*" element={<LazyError />} />
      </Routes>
      {isModal && <Modal />}
      <ToastContainer  style={{ top: '60px' }}/>
      {isLoader && <Loader/>}
    </Suspense>
  );
};

export default App;
