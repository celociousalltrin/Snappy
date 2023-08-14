import React from "react";
import MultiStepForm from "../../components/multi-step-form";
import AppVerificationCode from "../../components/app-verification-code";
import CreatePassword from "../signup/create-password";
import { ForgotPasswordHeader } from "../../utils/common-data";
import { Form } from "react-bootstrap";

import "./style.css";

const ForgotPassword = () => {
  return (
    <MultiStepForm
      componentsList={
        <div>
          <EmailComponent />
          <AppVerificationCode />
          <CreatePassword />
        </div>
      }
      formHeading="Forgot Password"
      headerData={ForgotPasswordHeader}
      onFinishRoute="login"
    />
  );
};

const EmailComponent = () => {
  return (
    <div className="ps-3 p-md-0 mb-0 mb-md-3 forgot-password-email-container">
      <p className="text-muted mb-3">
        Enter your email and we'll send you a Verification Code for reset your
        password.
      </p>
      <Form.Label>Enter a Email</Form.Label>
      <Form.Control type="text" placeholder="Email Address" />
    </div>
  );
};

export default ForgotPassword;
