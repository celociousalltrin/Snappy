import React, { useEffect, useState } from "react";
import UserInfoForm from "./user-info";
import AppVerificationCode from "../../components/app-verification-code";
import CreatePassword from "./create-password";
import UploadProfilePicture from "./upload-profile-picture";
import InterestedFields from "./interested-fields";
import SignupAddFriends from "./signup-add-friends";
import useMultiStepForm from "../../custom-hooks/useMultiStepForm";
import "./style.css";
import MultiStepFormSteps from "./multi-step-form-steps";
import { signupComponentHeader } from "../../utils/common-data";
import UserBio from "./user-bio";
import Framer from "../../custom-sandbox/framer";
import { AnimatePresence, motion } from "framer-motion";
import MyComponent from "../../custom-sandbox/framer";
import { signupFormVariants } from "../../utils/framer-variants";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "../../components/multi-step-form";

const SignUp = () => {
  return (
    <MultiStepForm
      componentsList={
        <div>
          <UserInfoForm />
          <AppVerificationCode />
          <CreatePassword />
          <UploadProfilePicture />
          <UserBio />
          <InterestedFields />
          <SignupAddFriends />
        </div>
      }
      formHeading="Create Snappy Account"
      headerData={signupComponentHeader}
      onFinishRoute="signup-success"
    />
  );
};

export default SignUp;
