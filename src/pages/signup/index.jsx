import React, { useEffect, useState } from "react";
import UserBio from "./user-bio";
import UserInfoForm from "./user-info";
import AppVerificationCode from "../../components/app-verification-code";
import CreatePassword from "./create-password";
import UploadProfilePicture from "./upload-profile-picture";
import InterestedFields from "./interested-fields";
import SignupAddFriends from "./signup-add-friends";
import { signupComponentHeader } from "../../utils/common-data";

import "./style.css";
import MultiStepForm from "../../components/multi-step-form";

const SignUp = () => {
  return (
    <MultiStepForm
      componentsList={
        <div>
          <SignupAddFriends />
          <UserInfoForm />
          <AppVerificationCode />
          <CreatePassword />
          <UploadProfilePicture />
          <UserBio />
          <InterestedFields />
        </div>
      }
      formHeading="Create Snappy Account"
      headerData={signupComponentHeader}
      onFinishRoute="signup-success"
    />
  );
};

export default SignUp;
