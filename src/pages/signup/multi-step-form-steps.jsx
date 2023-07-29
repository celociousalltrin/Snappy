import React from "react";
import { FaCheck } from "react-icons/fa";

const MultiStepFormSteps = ({ currentIndex }) => {
  const activeSteps = (input) => {
    return currentIndex >= input;
  };

  return (
    <div className="d-flex justify-content-around">
      {[1, 2, 3, 4, 5, 6].map((obj) => (
        <p
          className={`${
            activeSteps(obj) ? "signup-check-icon" : "pt-2 pb-2 ps-3 pe-3"
          } rounded-circle border border-dark `}
        >
          <span className={!activeSteps(obj) ? "fs-5" : ""}>
            {activeSteps(obj) ? <FaCheck color="white" size={20} /> : obj}
          </span>
        </p>
      ))}
    </div>
  );
};

export default MultiStepFormSteps;
