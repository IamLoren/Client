import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";

const LazyHome = lazy(() => import("./pages/HomePage"));
const LazyHistory = lazy(() => import("./pages/HistoryPage"));
const LazyAdmin = lazy(() => import("./pages/AdminPage"));
const LazyFavourites = lazy(() => import("./pages/FavouritesPage"));
const LazyError = lazy(() => import("./pages/ErrorPage"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LazyHome />} />
        <Route path="/history" element={<LazyHistory />} />
        <Route path="/favourites" element={<LazyFavourites />} />
        <Route path="/admin" element={<LazyAdmin />} />
        <Route path="*" element={<LazyError />} />
      </Routes>
    </Suspense>
  );
};

export default App;
