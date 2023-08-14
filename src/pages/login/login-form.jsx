import React from "react";
import snappyLogo from "../../assets/logo.png";
import "./style.css";
import Form from "react-bootstrap/Form";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-center">
        <img
          src={snappyLogo}
          alt="logo"
          width="50px"
          height="50px"
          className="snappy-login-logo"
        />
        <h5 className="align-self-center ms-3 text-primary fw-bold">SNAPPY</h5>
      </div>
      <div className="mt-3 text-center">
        <h4 className="fs-2">Welcome Back!</h4>
      </div>
      <div className="mt-4">
        <button type="button" className="btn btn-primary p-2 login-button">
          <FaGoogle className="me-2 mb-1" size={20} />{" "}
          <span className="fs-5">Login with Google</span>
        </button>
      </div>
      <div className="text-center mt-3">
        <p className="text-muted text-primary">
          -------- Or Login with Email -------{" "}
        </p>
      </div>
      <div>
        <div className="login-input-container">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Name" />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </div>
        <p
          className="text-primary mt-0 login-forgot-password"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Your Password ?
        </p>
        <button
          className="btn btn-dark p-2 pt-1 login-button"
          type="button"
          onClick={() => navigate("/home")}
        >
          <span className="fs-5">Log in</span>
        </button>
      </div>
      <div className="mt-3 mb-5 login-signup-content">
        <p className="text-muted">
          Haven't sign up yet?{" "}
          <span
            className="fw-bold text-primary cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
