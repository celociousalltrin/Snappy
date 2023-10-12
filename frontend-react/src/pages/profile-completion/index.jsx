import { useFormik } from "formik";
import React from "react";
import { signupSchema } from "../../utils/form-validation-schema";
import { multiStepFormValidationFunction } from "../../utils/common-function";
import MultiStepForm from "../../components/multi-step-form";
import UserInfoForm from "../signup/user-info";
import { profileCompletionHeader } from "../../utils/common-data";
import UserBio from "../signup/user-bio";
import InterestedFields from "../signup/interested-fields";
import SignupAddFriends from "../signup/signup-add-friends";

const ProfileCompletion = () => {
  const init = {
    first_name: "",
    last_name: "",
    user_name: "",
    phone_number: "",
    dob: "",
    personal_address: {
      state: "",
      country: "",
    },
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
    name: "profileCompletion",
    length: 4,
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
            isProfileCompletion
          />
          <UserBio
            data={{ about }}
            handleChange={formik.handleChange}
            formik={formik}
          />
          <InterestedFields data={interest} formik={formik} />
          <SignupAddFriends data={friends} formik={formik} />
        </div>
      }
      formHeading="Snappy Profile Completion"
      headerData={profileCompletionHeader}
      onFinishRoute="signup-success"
      errors={formik.errors}
      touched={formik.touched}
      data={formik.values}
      validationFunctionArray={validationFunctionArray}
      isSignupForm
      isProfCompletion
    />
  );
};

export default ProfileCompletion;
