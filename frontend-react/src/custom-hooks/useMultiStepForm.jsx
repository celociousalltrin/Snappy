import React, { useState } from "react";

const useMultiStepForm = (
  { props: { children } },
  validationFunctionArray = []
) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [direction, setDirection] = useState("next");

  const next = () => {
    setCurrentIndex(currentIndex + 1);
    setDirection("next");
  };

  const previous = () => {
    setCurrentIndex(currentIndex - 1);
    setDirection("back");
  };
  return {
    currentIndex,
    components: children,
    currentComponent: children[currentIndex],
    next,
    previous,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === children.length - 1,
    direction,
    validationFunction: validationFunctionArray[currentIndex],
  };
};

export default useMultiStepForm;
