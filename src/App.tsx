import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import { lazy, Suspense } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector } from "./hooks";
import { isModalOpen } from "./redux/selectors";
import Modal from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";


const LazyHome = lazy(() => import("./pages/HomePage"));
const LazyClient = lazy(() => import("./pages/ClientPage"));
const LazyAdmin = lazy(() => import("./pages/AdminPage"));
const LazyError = lazy(() => import("./pages/ErrorPage"));

const App: React.FC = () => {
  const isModal = useAppSelector(isModalOpen);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LazyHome />} />
        <Route path="/client" element={<LazyClient />} />
        <Route path="/admin" element={<LazyAdmin />} />
        <Route path="*" element={<LazyError />} />
      </Routes>
      {isModal && <Modal/>}
      <ToastContainer/>
    </Suspense>
  );
};

export default App;
