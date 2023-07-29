import React, { useState } from "react";

const useMultiStepForm = ({ props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const back = () => {
    setCurrentIndex(currentIndex - 1);
  };
  return {
    currentIndex,
    components: props.children,
    currentComponent: props.children[currentIndex],
    next,
    back,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === props.children.length - 1,
  };
};

export default useMultiStepForm;
