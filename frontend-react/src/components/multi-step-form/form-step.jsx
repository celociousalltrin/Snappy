import { motion } from "framer-motion";

import {
  SignupStepContainervariants,
  signupStepIconVariants,
} from "../../utils/framer-variants";
import useCustomArray from "../../custom-hooks/useCustomArray";
import { FramerCheckIcon } from "../../utils/framer-svgs";

import "./style.css";

const FormSteps = ({ currentIndex, componentLength }) => {
  const activeSteps = (input) => {
    return currentIndex >= input;
  };

  const customArray = useCustomArray(componentLength);

  return (
    <div className="d-flex justify-content-between justify-content-md-around">
      {customArray.map((obj) => (
        <motion.p
          key={`custom_${obj}`}
          className={`${
            activeSteps(obj)
              ? "form-step-check-icon"
              : "form-step-un-check-icon"
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

export default FormSteps;
