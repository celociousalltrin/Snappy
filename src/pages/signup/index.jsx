import React, { useState } from "react";
import UserInfoForm from "./user-info";
import AppVerificationCode from "../../components/app-verification-code";
import CreatePassword from "./create-password";
import UpdateUserInfoForm from "./update-user-info";
import FavouriteTopics from "./favourite-topics";
import SignupAddFriends from "./signup-add-friends";
import useMultiStepForm from "../../custom-hooks/useMultiStepForm";
import "./style.css";
import MultiStepFormSteps from "./multi-step-form-steps";

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
      <UserInfoForm />
      <AppVerificationCode />
      <CreatePassword />
      <UpdateUserInfoForm />
      <FavouriteTopics />
      <SignupAddFriends />
    </div>
  );

  return (
    <div className="signup-container">
      <div className="shadow p-3 mb-5 bg-white rounded signup-parent-container text-center">
        <MultiStepFormSteps currentIndex={currentIndex} />
        {!(currentIndex === components.length) && (
          <div className="shadow-none p-4 mb-5 mt-4 rounded signup-content-container">
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
