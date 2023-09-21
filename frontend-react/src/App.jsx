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
import Login from "./pages/login";
import SignUp from "./pages/signup";
import SignupSuccess from "./pages/signup-success";
import ForgotPassword from "./pages/forgot-password";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
          }}
        />
      </div>
    </>
  );
}

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/:page_id" element={<Home />} />
        <Route path="/:page_id/:id" element={<Home />} />
        <Route path="/:page_id/:id/:sec_id" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
