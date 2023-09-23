import React, { useEffect, useState } from "react";
import UserBio from "./user-bio";
import UserInfoForm from "./user-info";
import AppVerificationCode from "../../components/app-verification-code";
import CreatePassword from "./create-password";
import UploadProfilePicture from "./upload-profile-picture";
import InterestedFields from "./interested-fields";
import SignupAddFriends from "./signup-add-friends";
import { signupComponentHeader } from "../../utils/common-data";
import { useFormik } from "formik";

import "./style.css";
import MultiStepForm from "../../components/multi-step-form";
import { signupSchema } from "../../utils/form-validation-schema";

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
    investor_data_url: "",
    about: "",
    interest: [],
    friends: [],
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: signupSchema,
  });

  const {
    friends,
    new_password,
    confirm_password,
    investor_data_url,
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
            email={rest.email}
            isValid={isVerified}
            setIsValid={setIsVerified}
            formik={formik}
          />
          <CreatePassword
            data={{ new_password, confirm_password }}
            handleChange={formik.handleChange}
            formik={formik}
          />
          <UploadProfilePicture
            data={investor_data_url}
            handleChange={formik.handleChange}
            formik={formik}
          />
          <UserBio
            data={about}
            handleChange={formik.handleChange}
            formik={formik}
          />
          <InterestedFields data={interest} formik={formik} />
          <SignupAddFriends data={friends} formik={formik} />
        </div>
      }
      formHeading="Create Snappy Account"
      headerData={signupComponentHeader}
      onFinishRoute="signup-success"
      errors={formik.errors}
      touched={formik.touched}
      signupLastFormData={formik.values.friends}
      isSignupForm
      data={formik.values}
    />
  );
};

export default SignUp;
