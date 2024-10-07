import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import { lazy, Suspense } from "react";

const LazyHome = lazy(() => import("./pages/HomePage"));
const LazyClient = lazy(() => import("./pages/ClientPage"));
const LazyAdmin = lazy(() => import("./pages/AdminPage"));
const LazyError = lazy(() => import("./pages/ErrorPage"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LazyHome />} />
        <Route path="/client" element={<LazyClient />} />
        <Route path="/admin" element={<LazyAdmin />} />
        <Route path="*" element={<LazyError />} />
      </Routes>
    </Suspense>
  );
};

export default App;
