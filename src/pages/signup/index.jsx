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
import { signupComponentHeader } from "../../utils/common";
import UserBio from "./user-bio";
import Framer from "../../custom-sandbox/framer";
import { AnimatePresence, motion } from "framer-motion";
import MyComponent from "../../custom-sandbox/framer";
import { signupFormVariants } from "../../utils/framer-variants";

const SignUp = () => {
  const [isFinish, setIsFinsish] = useState(false);
  const {
    currentIndex,
    components,
    currentComponent,
    next,
    previous,
    isFirstStep,
    isLastStep,
    direction,
  } = useMultiStepForm(
    <div>
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
    <motion.div
      className="signup-container"
      initial={{ opacity: 0 }}
      animate={{
        transition: { duration: 1 },
        opacity: 1,
      }}
    >
      <div className="shadow p-3 bg-white rounded signup-parent-container text-center">
        <h3 className="mb-4 mt-0 pt-0">Create Your Snappy Account</h3>
        <MultiStepFormSteps currentIndex={currentIndex} />
        {!(currentIndex === components.length) && (
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              className="shadow-none p-4 pb-5 mb-5 mt-4 rounded signup-content-container"
              key={currentIndex}
              variants={signupFormVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.7 }}
            >
              <h4 className="mb-3">
                {
                  signupComponentHeader.find(
                    (obj) => obj.index === currentIndex
                  ).header
                }
              </h4>
              {currentComponent}
            </motion.div>
          </AnimatePresence>
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
              onClick={previous}
              className="btn btn-outline-dark ms-4 ps-3 pe-3"
            >
              Previous
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
