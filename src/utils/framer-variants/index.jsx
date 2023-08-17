import "./style.css";

export const signupFormVariants = {
  initial: (direction) => ({
    x: direction === "next" ? "-100%" : "100%",
  }),
  animate: {
    x: 0,
  },
  exit: (direction) => ({
    x: direction === "next" ? "100%" : "-100%",
    opacity: 0,
  }),
};

export const SignupStepContainervariants = {
  initial: {
    opacity: 0,
    backgroundColor: "rgb(13, 110, 253)",
  },
  animate: (active) => {
    return {
      opacity: 1,
      transition: { duration: 0.7 },
      backgroundColor: active ? "rgb(13, 110, 253)" : "rgb(255, 255, 255)",
      border: "1px solid black",
    };
  },
};

export const signupStepIconVariants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: (active) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: active ? 1 : 0.8,
      delay: active ? 0.7 : 0,
    },
  }),
};

export const ListExpandVariants = {
  hidden: {
    height: "var(--content-height-hidden)",
  },
  visible: {
    height: "auto",
    overflow: "hidden",
    transition: { duration: 0.7 },
  },
  exit: (isExpand) => ({
    height: "var(--content-height-hidden)",
    overflow: "hidden",
    transition: { duration: isExpand ? 0.1 : 0.7 },
  }),
};

export const ExpandVariants = {
  visible: (isVisible) => ({
    height: isVisible ? "auto" : "3.4rem",
    overflow: "hidden",
    transition: { duration: 0.5 },
  }),
};
