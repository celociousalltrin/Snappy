import React from "react";
import useCustomArray from "../../custom-hooks/useCustomArray";
import { motion } from "framer-motion";
import { SignupStepContainervariants } from "../../utils/framer-variants";
import { FramerCheckIcon } from "../../utils/framer-svgs";
import { signupStepIconVariants } from "../../utils/framer-variants";

const MultiStepFormSteps = ({ currentIndex }) => {
  const activeSteps = (input) => {
    return currentIndex >= input;
  };

  const customArray = useCustomArray(7);

  return (
    <div className="d-flex justify-content-around">
      {customArray.map((obj) => (
        <motion.p
          className={`${
            activeSteps(obj) ? "signup-check-icon" : "pt-2 pb-2 ps-3 pe-3"
          } rounded-circle`}
          custom={activeSteps(obj)}
          variants={SignupStepContainervariants}
          initial="initial"
          animate="animate"
        >
          <span className={!activeSteps(obj) ? "fs-5" : ""}>
            {activeSteps(obj) ? (
              <FramerCheckIcon
                variants={signupStepIconVariants}
                color="rgb(255, 255, 255)"
                width="30"
                height="30"
                iconwidth="3.5"
              />
            ) : (
              obj
            )}
          </span>
        </motion.p>
      ))}
    </div>
  );
};

export default MultiStepFormSteps;
