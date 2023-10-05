import React, { useState } from "react";
import MultiStepForm from "../../components/multi-step-form";
import AppVerificationCode from "../../components/app-verification-code";
import CreatePassword from "../signup/create-password";
import { ForgotPasswordHeader } from "../../utils/common-data";
import { Form } from "react-bootstrap";

import "./style.css";
import AppEmail from "../../components/app-email";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "../../utils/form-validation-schema";
import { multiStepFormValidationFunction } from "../../utils/common-function";

const ForgotPassword = () => {
  const init = {
    email: "",
    new_password: "",
    confirm_password: "",
  };
  const [isVerified, setIsVerified] = useState(false);

  const formik = useFormik({
    initialValues: init,
    validationSchema: ForgotPasswordSchema,
  });

  const validationFunctionArray = multiStepFormValidationFunction({
    name: "forgotPassword",
    length: 3,
  });

  return (
    <MultiStepForm
      componentsList={
        <div>
          <AppEmail
            data={formik.values.email}
            handleChange={formik.handleChange}
            formik={formik}
          />
          <AppVerificationCode
            email={formik.values.email}
            isValid={isVerified}
            setIsValid={setIsVerified}
            formik={formik}
          />
          <CreatePassword
            data={{
              new_password: formik.values.new_password,
              confirm_password: formik.values.confirm_password,
            }}
            handleChange={formik.handleChange}
            formik={formik}
          />
        </div>
      }
      formHeading="Forgot Password"
      headerData={ForgotPasswordHeader}
      onFinishRoute="login"
      errors={formik.errors}
      touched={formik.touched}
      data={formik.values}
      validationFunctionArray={validationFunctionArray}
    />
  );
};

export default ForgotPassword;
