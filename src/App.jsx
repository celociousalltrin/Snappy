import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Explore from "./pages/explore";
import Home from "./pages/home";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<AppRoutes />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Explore />}></Route>
        <Route path="/:page_id" element={<Home />}></Route>
        <Route path="/:page_id/:id" element={<Home />}></Route>
      </Routes>
    </>
  );
};

export default App;
