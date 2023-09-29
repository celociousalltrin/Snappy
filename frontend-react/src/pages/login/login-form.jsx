import React from "react";
import snappyLogo from "../../assets/logo.png";
import "./style.css";
import Form from "react-bootstrap/Form";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AppFramerButton from "../../components/app-framer-button";
import { useFormik } from "formik";
import AppPasswordInput from "../../components/app-password-input";
import { loginSchema } from "../../utils/form-validation-schema";
import { login, testRoute } from "../../services/method";
import { responseMessage } from "../../utils/response-message";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../redux/slices/userSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const init = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await login(values);
      dispatch(userData(response.data.response_data));
      responseMessage(response.data.code);
      navigate("/home");
    } catch (err) {
      console.log("🚀 ~ file: login-form.jsx:24 ~ handleSubmit ~ err:", err);
      responseMessage(err.data.code);
    }
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

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
        <AppFramerButton>
          <button type="button" className="btn btn-primary p-2 login-button">
            <FaGoogle className="me-2 mb-1" size={20} />{" "}
            <span className="fs-5">Login with Google</span>
          </button>
        </AppFramerButton>
      </div>
      <div className="text-center mt-3">
        <p className="text-muted text-primary">
          -------- Or Login with Email -------{" "}
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="login-input-container">
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-danger mt-1">{formik.errors.email}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Password</Form.Label>
              <AppPasswordInput
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-danger mt-1">{formik.errors.password}</p>
              )}
            </Form.Group>
          </div>

          <p
            className="text-primary mt-0 login-forgot-password"
            onClick={() => navigate("/forgot-password")}
            type="button"
          >
            Forgot Your Password ?
          </p>
          <AppFramerButton>
            <button
              className="btn btn-dark p-2 pt-1 login-button"
              type="submit"
            >
              <span className="fs-5">Log in</span>
            </button>
          </AppFramerButton>
        </div>
      </form>
      <div className="mt-3 mb-5 login-signup-content">
        <p className="text-muted">
          Haven't sign up yet?{" "}
          <span
            className="fw-bold text-primary cursor-pointer"
            onClick={() => navigate("/signup")}
            type="button"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
