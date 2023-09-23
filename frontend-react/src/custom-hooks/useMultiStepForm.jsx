import React, { useState } from "react";
import toast from "react-hot-toast";
import { validateUserName } from "../services/method";

const useMultiStepForm = ({ props: { children } }, errors, touched) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [direction, setDirection] = useState("next");

  const userNameValidate = async (input) => {
    try {
      const { data } = await validateUserName(input);
      return data.data;
    } catch (err) {
      console.log(
        "🚀 ~ file: useMultiStepForm.jsx:13 ~ userNameValidate ~ err:",
        err
      );
    }
  };

  const dataValidate = (data) => {
    return Object.keys(data).every((key) => {
      if (Object.keys(data[key]).includes("0")) {
        return true;
      } else if (
        currentIndex === 0 &&
        Object.keys(data[key]).every(
          (o) => Object.keys(data[key][o]).length > 0
        )
      ) {
        return true;
      } else {
        return false;
      }
    });
  };

  const multiStepFormValidate = ({ data, isValid }) => {
    if (currentIndex === 1 && isValid) {
      return true;
    } else if (currentIndex === 5 && data.length >= 2) {
      return true;
    } else {
      if (!data) {
        return false;
      } else {
        return dataValidate(data);
      }
    }
  };

  const multiStepFormData = (index) => {
    return children[index].props;
  };

  const next = async () => {
    if (
      !!children[currentIndex].props.data.user_name &&
      currentIndex === 0 &&
      (await userNameValidate({
        user_name: multiStepFormData(0).data.user_name,
      }))
    ) {
      toast.error("UserName Already Exists");
    } else if (
      currentIndex === 5 &&
      multiStepFormData(currentIndex).data.length <= 2
    ) {
      toast.error("Select at least 3 interests to get a personalized feed");
    } else if (
      !Object.keys(touched).filter((obj) => errors[obj] !== undefined).length &&
      multiStepFormValidate(multiStepFormData(currentIndex))
    ) {
      setCurrentIndex(currentIndex + 1);
      setDirection("next");
    } else {
      toast.error(
        "To proceed, please complete the required fields in the form.",
        {
          duration: 3000,
        }
      );
    }
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
  };
};

export default useMultiStepForm;
