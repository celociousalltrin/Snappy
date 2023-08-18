import React, { useEffect, useState } from "react";

import useMultiStepForm from "../../custom-hooks/useMultiStepForm";
import { AnimatePresence, motion } from "framer-motion";
import { signupFormVariants } from "../../utils/framer-variants";
import { useNavigate } from "react-router-dom";

import "./style.css";
import FormSteps from "./form-step";

const MultiStepForm = ({
  componentsList,
  formHeading,
  headerData,
  onFinishRoute,
}) => {
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
  } = useMultiStepForm(componentsList);
  const navigate = useNavigate();
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
          <div className="multi-step-form-button-container">
            {!isLastStep ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={next}
                className="btn btn-primary ms-3 ps-3 pe-3"
              >
                Next
              </motion.button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  next();
                  setIsFinsish(true);
                  setTimeout(() => {
                    navigate(`/${onFinishRoute}`);
                  }, 1000);
                }}
                className="btn btn-success ms-3"
              >
                Finish
              </button>
            )}
            {!isFirstStep && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={previous}
                className="btn btn-outline-dark ms-4 ps-3 pe-3"
              >
                Previous
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MultiStepForm;