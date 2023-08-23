import React, { useState } from "react";

const useMultiStepForm = ({ props }) => {
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
    components: props.children,
    currentComponent: props.children[currentIndex],
    next,
    previous,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === props.children.length - 1,
    direction,
  };
};

export default useMultiStepForm;
