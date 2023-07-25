import React from "react";
import snappyLogo from "../../assets/logo.png";
import "./style.css";
import Form from "react-bootstrap/Form";
import { FaGoogle } from "react-icons/fa";

const LoginForm = () => {
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
        <h4 className="fs-2">Welcome Back</h4>
      </div>
      <div className="mt-4 login-button">
        <button
          type="button"
          className="btn btn-lg btn-outline-primary"
          style={{ width: "77%" }}
        >
          <FaGoogle className="me-3" /> Login with Google
        </button>
      </div>
      <div className="text-center mt-3">
        <p className="text-muted">---------- Or Login with Email --------- </p>
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
        <p className="text-muted mt-0" style={{ marginLeft: "55%" }}>
          Forgot Your Password ?
        </p>
        <button
          className="btn btn-lg btn-dark"
          type="button"
          style={{ width: "62%", marginLeft: "21%" }}
        >
          Log in
        </button>
      </div>
      <div className="mt-3 text-center mb-5">
        <p className="text-muted">
          Haven't sign up yet? <span className="fw-bold">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
