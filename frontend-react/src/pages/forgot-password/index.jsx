import React from "react";
import MultiStepForm from "../../components/multi-step-form";
import AppVerificationCode from "../../components/app-verification-code";
import CreatePassword from "../signup/create-password";
import { ForgotPasswordHeader } from "../../utils/common-data";
import { Form } from "react-bootstrap";

import "./style.css";
import AppEmail from "../../components/app-email";

const ForgotPassword = () => {
  return (
    <MultiStepForm
      componentsList={
        <div>
          <AppEmail />
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

export default ForgotPassword;
