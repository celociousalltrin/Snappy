import React, { useState } from "react";
import LoginImageCarousel from "./login-image-carousel";

import "./style.css";
import LoginForm from "./login-form";

const Login = () => {
  const [loadstate, setLoadState] = useState(false);

  return (
    <div className="login-container">
      <div className="center-login-content">
        <div className="shadow-sm bg-white rounded row">
          <div className="col-6 bg-primary rounded-start d-none d-lg-block">
            <LoginImageCarousel />
          </div>
          <div
            className="col-12 col-lg-6"
            style={{ backgroundColor: "rgb(248, 248, 247)" }}
          >
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
