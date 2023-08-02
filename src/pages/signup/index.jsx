import React, { useState } from "react";
import UserInfoForm from "./user-info";
import AppVerificationCode from "../../components/app-verification-code";
import CreatePassword from "./create-password";
import UploadProfilePicture from "./upload-profile-picture";
import InterestedFields from "./interested-fields";
import SignupAddFriends from "./signup-add-friends";
import useMultiStepForm from "../../custom-hooks/useMultiStepForm";
import "./style.css";
import MultiStepFormSteps from "./multi-step-form-steps";
import { signupComponentHeader } from "../../utils/common";
import UserBio from "./user-bio";
import Framer from "../../framer";


const SignUp = () => {
  const [isFinish, setIsFinsish] = useState(false);
  const {
    currentIndex,
    components,
    currentComponent,
    next,
    back,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm(
    <div>
      <Framer />
      <UserInfoForm />
      <AppVerificationCode />
      <CreatePassword />
      <UploadProfilePicture />
      <UserBio />
      <InterestedFields />
      <SignupAddFriends />
    </div>
  );

  return (
    <div className="signup-container">
      <div className="shadow p-3 bg-white rounded signup-parent-container text-center">
        <h3 className="mb-4 mt-0 pt-0">Create Your Snappy Account</h3>
        <MultiStepFormSteps currentIndex={currentIndex} />
        {!(currentIndex === components.length) && (
          <div className="shadow-none p-4 pb-5 mb-5 mt-4 rounded signup-content-container">
            <h4 className="mb-3">
              {
                signupComponentHeader.find((obj) => obj.index === currentIndex)
                  .header
              }
            </h4>
            {currentComponent}
          </div>
        )}

        <div className="signup-button-container">
          {!isLastStep ? (
            <button
              type="button"
              onClick={next}
              className="btn btn-outline-primary ms-3 ps-3 pe-3"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                next();
                setIsFinsish(true);
              }}
              className="btn btn-primary ms-3"
            >
              Finish
            </button>
          )}
          {!isFirstStep && (
            <button
              type="button"
              onClick={back}
              className="btn btn-outline-dark ms-4 ps-3 pe-3"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
