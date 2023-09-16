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
    investor_image: {},
    about: "",
    interest: [],
  };

  const [userData, setUserData] = useState(init);
  console.log("🚀 ~ file: index.jsx:32 ~ SignUp ~ userData:", userData);

  const handleChange = ({ target: { name, value } }) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleSelectChange = ({ value, name }) => {
    setUserData({
      ...userData,
      personal_address: { ...userData.personal_address, [name]: value },
    });
  };

  const handleCustomChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  return (
    <MultiStepForm
      componentsList={
        <div>
          <UserInfoForm
            data={userData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleCustomChange={handleCustomChange}
          />
          <AppVerificationCode data={userData} handleChange={handleChange} />
          <CreatePassword data={userData} handleChange={handleChange} />
          <UploadProfilePicture data={userData} handleChange={handleChange} />
          <UserBio data={userData} handleChange={handleChange} />
          <InterestedFields data={userData} handleChange={handleChange} />
          <SignupAddFriends data={userData} handleChange={handleChange} />
        </div>
      }
      formHeading="Create Snappy Account"
      headerData={signupComponentHeader}
      onFinishRoute="signup-success"
    />
  );
};

export default SignUp;
