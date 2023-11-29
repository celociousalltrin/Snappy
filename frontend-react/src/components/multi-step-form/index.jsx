import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import useMultiStepForm from "../../custom-hooks/useMultiStepForm";
import { signupFormVariants } from "../../utils/framer-variants";
import { responseMessage } from "../../utils/response-message";
import { staticResponseMessage } from "../../utils/static-response-message";

import FormSteps from "./form-step";
import AppFramerButton from "../app-framer-button";

import "./style.css";

import {
  createUser,
  externalAuthenticatedUserProfileCompletion,
} from "../../services/method";

const MultiStepForm = ({
  componentsList,
  formHeading,
  headerData,
  onFinishRoute,
  errors,
  touched,
  isSignupForm = false,
  data,
  validationFunctionArray,
  isProfCompletion,
}) => {
  const [isFinish, setIsFinsish] = useState(false);
  const location = useLocation();
  const {
    currentIndex,
    components,
    currentComponent,
    next,
    previous,
    isFirstStep,
    isLastStep,
    direction,
    validationFunction,
  } = useMultiStepForm(componentsList, validationFunctionArray);

  const navigate = useNavigate();

  const signupFinish = async (signupData) => {
    try {
      const result = (await isProfCompletion)
        ? externalAuthenticatedUserProfileCompletion(signupData)
        : createUser(signupData);
      next();
      setIsFinsish(true);
      setTimeout(() => {
        navigate(`/${onFinishRoute}`, {
          state: { previous_url: location.pathname },
        });
      }, 1000);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:42 ~ signupFinish ~ err:", err);
    }
  };

  const formFinish = () => {
    next();
    setIsFinsish(true);
    staticResponseMessage("SUCC002", 1000);
    setTimeout(() => {
      navigate(`/${onFinishRoute}`);
    }, 1000);
  };

  return (
    <div>
      {" "}
      <motion.div
        className="multi-step-form-container"
        initial={{ opacity: 0 }}
        animate={{
          transition: { duration: 1 },
          opacity: isFinish ? 0 : 1,
        }}
      >
        <div className="shadow p-3 mt-4 bg-white rounded multi-step-form-parent-container text-center">
          <h3 className="mb-4 mt-0 pt-0">{formHeading}</h3>
          <FormSteps
            currentIndex={currentIndex}
            componentLength={components.length}
          />
          {!(currentIndex === components.length) && (
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                className="shadow-none pt-4 ps-1 pe-3 p-md-4 pb-5 mb-5 mt-4 rounded multi-step-form-content-container"
                key={currentIndex}
                variants={signupFormVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
                transition={{ duration: 0.7 }}
              >
                <h4 className="mb-3 ms-1">
                  {headerData.find((obj) => obj.index === currentIndex).header}
                </h4>
                {currentComponent}
              </motion.div>
            </AnimatePresence>
          )}
          <div className="multi-step-form-button-container d-flex">
            {!isLastStep ? (
              <AppFramerButton hover={1.1} tap={0.9}>
                <button
                  type="button"
                  onClick={() =>
                    validationFunction(
                      next,
                      data,
                      errors,
                      touched,
                      currentComponent.props
                    )
                  }
                  className="btn btn-primary ms-3 ps-3 pe-3"
                >
                  Next
                </button>
              </AppFramerButton>
            ) : (
              <AppFramerButton hover={1.1} tap={0.9}>
                <button
                  type="button"
                  onClick={() =>
                    validationFunction(
                      isSignupForm ? signupFinish : formFinish,
                      data,
                      errors,
                      touched,
                      currentComponent.props
                    )
                  }
                  className="btn btn-success ms-3"
                >
                  Finish
                </button>
              </AppFramerButton>
            )}
            {!isFirstStep &&
              !(
                componentsList.props.children[1].props.isValid &&
                (currentIndex === 1 || currentIndex === 2)
              ) && (
                <AppFramerButton hover={1.1} tap={0.9}>
                  <button
                    type="button"
                    onClick={previous}
                    className="btn btn-outline-dark ms-4 ps-3 pe-3"
                  >
                    Previous
                  </button>
                </AppFramerButton>
              )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MultiStepForm;
