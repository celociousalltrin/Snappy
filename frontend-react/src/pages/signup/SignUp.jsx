import React, { useState } from "react";
import UserBio from "./user-bio";
import UserInfoForm from "./user-info";
import AppVerificationCode from "../../components/app-verification-code";
import CreatePassword from "./create-password";
import UploadProfilePicture from "./upload-profile-picture";
import InterestedFields from "./interested-fields";
import SignupAddFriends from "./signup-add-friends";
import { signupComponentHeader } from "../../utils/common-data";
import { useFormik } from "formik";
import MultiStepForm from "../../components/multi-step-form";
import { signupSchema } from "../../utils/form-validation-schema";

export const SignUp = () => {
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
    investor_image: {},
    about: "",
    interest: [],
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: signupSchema,
  });

  const {
    new_password,
    confirm_password,
    investor_image,
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
            email={rest}
            isValid={isVerified}
            setIsValid={setIsVerified}
          />
          <CreatePassword
            data={{ new_password, confirm_password }}
            handleChange={formik.handleChange}
            formik={formik}
          />
          <UploadProfilePicture
            data={investor_image}
            handleChange={formik.handleChange}
            formik={formik}
          />
          <UserBio data={about} handleChange={formik.handleChange} />
          <InterestedFields
            data={interest}
            handleChange={formik.handleChange}
          />
          <SignupAddFriends handleChange={formik.handleChange} />
        </div>
      }
      formHeading="Create Snappy Account"
      headerData={signupComponentHeader}
      onFinishRoute="signup-success"
      errors={formik.errors}
      touched={formik.touched}
    />
  );
};
