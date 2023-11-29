import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

import { appRouter } from "./utils/common-data";

import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import SignupSuccess from "./pages/signup-success";
import ForgotPassword from "./pages/forgot-password";
import ExternalAuthenticate from "./pages/external-authenticate";
import ProfileCompletion from "./pages/profile-completion";

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
  const navigate = useNavigate();
  appRouter.navigate = navigate;
  const { access_token } = useSelector((state) => state.user.data);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={access_token ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile-completion" element={<ProfileCompletion />} />
        <Route
          path="/external-authenticate"
          element={<ExternalAuthenticate />}
        />
        <Route path="/:page_id" element={<Home />} />
        <Route path="/:page_id/:id" element={<Home />} />
        <Route path="/:page_id/:id/:sec_id" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
