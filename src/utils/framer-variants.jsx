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
