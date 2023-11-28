import React, { useEffect, useState } from "react";
import UserBio from "./user-bio";
import UserInfoForm from "./user-info";
import AppVerificationCode from "../../components/app-verification-code";
import CreatePassword from "./create-password";
import UploadProfilePicture from "./upload-profile-picture";
import InterestedFields from "./interested-fields";
import SignupAddAlliances from "./signup-add-alliances";
import { signupComponentHeader } from "../../utils/common-data";
import { useFormik } from "formik";

import "./style.css";
import MultiStepForm from "../../components/multi-step-form";
import { signupSchema } from "../../utils/form-validation-schema";
import { multiStepFormValidationFunction } from "../../utils/common-function";
import { editorInitialValue } from "../../components/app-rich-text-box/utils/editorData";

const SignUp = () => {
  const [isVerified, setIsVerified] = useState(false);

  const init = {
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    phone_number: "",
    dob: "",
    personal_address: {
      state: "",
      country: "",
    },
    new_password: "",
    confirm_password: "",
    user_data_url: "",
    about: editorInitialValue,
    interest: [],
    alliances: [],
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: signupSchema,
  });

  const {
    alliances,
    new_password,
    confirm_password,
    user_data_url,
    about,
    interest,
    ...rest
  } = formik.values;

  const handleSelectChange = ({ value, name }) => {
    formik.setValues({
      ...formik.values,
      personal_address: {
        ...formik.values.personal_address,
        [name]: value,
        ...(name === "country" && { state: "" }),
      },
    });
  };

  const validationFunctionArray = multiStepFormValidationFunction({
    name: "signup",
    length: 7,
  });

  return (
    <MultiStepForm
      componentsList={
        <div>
          <UserInfoForm
            data={rest}
            handleChange={formik.handleChange}
            handleSelectChange={handleSelectChange}
            formik={formik}
          />
          <AppVerificationCode
            data={formik.values}
            isValid={isVerified}
            setIsValid={setIsVerified}
            formik={formik}
            issued_for={"signup"}
          />
          <CreatePassword
            data={{ new_password, confirm_password }}
            handleChange={formik.handleChange}
            formik={formik}
          />
          <UploadProfilePicture
            data={{ user_data_url }}
            handleChange={formik.handleChange}
            formik={formik}
          />
          <UserBio data={{ about }} setFieldValue={formik.setFieldValue} />
          <InterestedFields data={interest} formik={formik} />
          <SignupAddAlliances data={alliances} formik={formik} />
        </div>
      }
      formHeading="Create Snappy Account"
      headerData={signupComponentHeader}
      onFinishRoute="signup-success"
      errors={formik.errors}
      touched={formik.touched}
      isSignupForm
      data={formik.values}
      validationFunctionArray={validationFunctionArray}
    />
  );
};

export default SignUp;
